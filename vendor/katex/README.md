# KaTeX 0.16.9

Source: https://www.npmjs.com/package/katex/v/0.16.9 (upstream https://github.com/KaTeX/KaTeX/tree/v0.16.9).
MIT license: see LICENSE in this directory. Files are unmodified.

Reproduce from the repository root (requires npm and internet):

```sh
npm pack katex@0.16.9
mkdir -p /tmp/textbook-katex
 tar -xzf katex-0.16.9.tgz -C /tmp/textbook-katex
cp /tmp/textbook-katex/package/dist/katex.min.js vendor/katex/
cp /tmp/textbook-katex/package/dist/katex.min.css vendor/katex/
cp /tmp/textbook-katex/package/LICENSE vendor/katex/
cp -R /tmp/textbook-katex/package/dist/fonts vendor/katex/
rm katex-0.16.9.tgz
```

The distribution CSS uses relative `fonts/` URLs; keep the directory together.
Runtime requires no npm installation. SHA-256 checksums are in SHA256SUMS.
