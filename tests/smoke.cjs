// Fresh browser contexts, local HTTP only; no cache or internet required by the app.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.json':'application/json', '.txt':'text/plain', '.woff2':'font/woff2'};
const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (pathname.endsWith('/') ? pathname + 'index.html' : pathname));
    if (!file.startsWith(root + path.sep)) throw Error('outside root');
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.end(await fs.readFile(file));
  } catch { res.writeHead(404); res.end('Not found'); }
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH, args:['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader']} : {})});
  try {
    const context = await browser.newContext({serviceWorkers:'block'});
    const external = [], errors = [], failures = [];
    await context.route('**/*', route => {
      if (new URL(route.request().url()).origin !== origin) { external.push(route.request().url()); return route.abort(); }
      return route.continue();
    });
    const page = await context.newPage();
    page.on('pageerror', e => errors.push(e.message));
    page.on('response', r => { if (r.status() >= 400 && !/chapter_\d+\.txt$/.test(r.url())) failures.push(r.url()); });
    await page.goto(origin + '/');
    await page.waitForFunction(() => document.querySelectorAll('.toc-chapter-group').length === 2);
    assert.equal(await page.locator('#chapterSelect option').count(), 2);
    assert.ok(await page.locator('#contentWrapper .katex').count() > 10);
    assert.ok(await page.locator('#contentWrapper .katex-display').count() >= 2);
    assert.equal(await page.locator('.katex-error,.latex-error,.block-error').count(), 0);
    assert.ok(!(await page.locator('.latex-content').allTextContents()).join(' ').includes('Circle identity'));
    assert.ok(!(await page.locator('pre').allTextContents()).join(' ').includes('Evaluate the exact solution'));
    const proof = page.locator('details').filter({hasText:'Proof by differentiation'});
    await proof.locator('summary').click();
    assert.equal(await proof.getAttribute('open'), '');
    assert.ok((await page.locator('pre').allTextContents()).join(' ').includes('// 📘 Inside this fence'));
    assert.ok(!(await page.locator('#contentWrapper').innerText()).includes('Original demo answer'));
    await page.selectOption('#viewSelect', 'instructor');
    assert.ok((await page.locator('#contentWrapper').textContent()).includes('Original demo answer'));
    await page.locator('.toc-chapter-header').nth(1).click();
    await page.waitForFunction(() => document.querySelector('#chapterSelect').value === '2' && document.querySelector('#contentWrapper').textContent.includes('Measuring a harmonic'));
    assert.ok(await page.locator('#contentWrapper .katex').count() > 0);
    await page.evaluate(() => document.fonts.ready);
    assert.deepEqual(await page.evaluate(() => [...document.fonts].filter(f => f.status === 'error').map(f=>f.family)), []);
    await page.screenshot({path:'/tmp/textbook-viewer.png', fullPage:true});
    assert.deepEqual(failures, []);
    // A discovered file disappears before the reader refreshes it.
    await context.route('**/chapter_2.txt', route => route.fulfill({status:404, body:'missing'}));
    await page.click('#refreshBtn');
    await page.waitForSelector('.block-error');
    assert.match(await page.locator('.block-error').innerText(), /Missing file: chapter_2.txt/);
    // Missing chapters at startup: all 200 probes must terminate gracefully.
    await context.route('**/chapter_*.txt', route => route.fulfill({status:404, body:'missing'}));
    await page.reload();
    await page.waitForFunction(() => document.querySelector('#status').textContent === 'No chapters found.');
    assert.equal(await page.locator('#chapterSelect').isDisabled(), true);
    assert.match(await page.locator('.block-error').innerText(), /No chapter files found/);
    // Missing spec: show initialization guidance rather than a blank page.
    await context.route('**/*emoji*.json', route => route.fulfill({status:404, body:'missing'}));
    await page.reload();
    await page.waitForFunction(() => document.querySelector('#status').textContent === 'Initialization failed.');
    assert.match(await page.locator('.block-error').innerText(), /Failed to initialize/);
    assert.deepEqual(external, [], 'Application attempted an external request');
    assert.deepEqual(errors, []);
    console.log('PASS: cold offline load, chapter discovery, local math/fonts, proofs, fences, visibility, navigation, missing chapters and spec');
    await context.close();
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode=1; }).finally(() => server.close());
