# 📘 Textbook Engine

A lightweight, offline HTML textbook viewer that uses emoji markers for semantic structure. Write chapters in plain text, get a beautiful rendered textbook with LaTeX math, images, and hierarchical navigation.

## ✨ Features

- **Emoji-based markup** — Simple, readable plain-text format
- **LaTeX rendering** — Full math support via KaTeX (`$inline$` and `$$display$$`)
- **Local images** — Embed images from an `assets/` folder
- **Multi-chapter TOC** — Navigate all chapters from a collapsible sidebar
- **Independent scrolling** — Sidebar and content scroll separately
- **Student/Instructor views** — Toggle visibility of instructor-only content
- **Live reload** — Auto-refresh while editing
- **Dark mode** — Automatic theme based on system preference
- **Offline runtime** — Bundled KaTeX JavaScript, CSS, and fonts; no CDN or internet required when served locally

## 🚀 Quick Start

1. Download or clone this repo
2. Keep the whole folder, including `vendor/`, `emoji_index.json`, and the two original sample chapters
3. Serve locally:
   ```bash
   python3 -m http.server 8000 --bind 127.0.0.1
   ```
4. Open `http://127.0.0.1:8000/` (the lowercase `index.html` opens automatically).

The included chapters introduce circle projections, oscillator energy, and harmonic coefficients. They exercise equations, proofs, examples, fenced code, exercises, instructor notes, and cross-chapter navigation. No scans or private research are included.

### Offline behavior

Download the complete repository while connected, then start the local server above. You can disconnect from the internet before the first visit: the reader, chapters, marker specification, and math fonts are all local. A local HTTP server is required because browsers restrict `fetch()` on `file://`; double-clicking the HTML is not supported. This is not a service-worker cache: a remote hosted copy will not remain available after disconnecting unless you download and serve it locally. Custom chapters must also use local media to remain offline.

### Authoring and discovery

Replace or extend `chapter_1.txt`, `chapter_2.txt`, etc., following [AUTHORING_GUIDE.md](AUTHORING_GUIDE.md). The emoji specification and scope rules are unchanged. Discovery probes numbers 1–200, stopping after 12 consecutive missing files once any chapter has been found. Prefer consecutive numbering. Missing probes are normal HTTP 404s; missing selected files produce an explanatory message. Instructor view is a presentation toggle, not protection for confidential material.

## 📁 Project Structure

```
textbook-engine/
├── index.html           # The engine (single file, no build step)
├── emoji_index.json     # Marker definitions and behaviors
├── chapter_1.txt        # Your chapter files
├── chapter_2.txt
├── AUTHORING_GUIDE.md   # Instructions for writing chapters
├── changelogs/          # Version history
├── vendor/katex/        # KaTeX 0.16.9, fonts, license and provenance
├── tests/smoke.cjs      # Reproducible browser checks
├── package.json         # Test tools only; no runtime build step
└── assets/              # Images folder
    └── diagrams/
        └── example.png
```

## 📝 Writing Chapters

Chapters use emoji markers at the start of lines to denote structure:

```
📘 Introduction to Calculus

The derivative measures instantaneous rate of change.

📚 Limits

🚩 Learning Objectives
Understand the definition of a limit
Evaluate limits algebraically

📖 Limit
The limit $\lim_{x \to a} f(x) = L$ means $f(x)$ approaches $L$ as $x$ approaches $a$.

🖋️ Formal Definition
{{{
\forall \varepsilon > 0, \exists \delta > 0 : 0 < |x-a| < \delta \Rightarrow |f(x) - L| < \varepsilon
}}}

🖼️ diagrams/limit_visualization.png Geometric interpretation of the limit

⚠️ Don't confuse the limit with the function value—they can differ!
```

## 🤖 For LLMs/AI Agents

The `AUTHORING_GUIDE.md` file is designed to be fed directly to an LLM or AI agent as instructions for generating textbook content. It contains:

- Complete marker reference with scope rules
- Structural templates and patterns
- DO/DON'T guidelines for consistent output
- LaTeX and image usage instructions

Simply include the authoring guide in your prompt context and ask the LLM to write chapters following the format.

## 🔧 Key Markers

| Marker | Purpose | Scope |
|--------|---------|-------|
| 📘 | Chapter title | line |
| 📚 | Section header | line |
| 📖 | Definition | block |
| 🔬 | Theorem | block |
| 🔏 | Proof | block |
| ❓ | Example | block |
| 🖋️ | LaTeX equation | fenced |
| 💻 | Code block | fenced |
| 🖼️ | Image | line |
| ⚠️ | Warning | block |
| 💡 | Tip | block |

See `AUTHORING_GUIDE.md` for the complete reference.

## Smoke checks

Install test tools once while connected (Node.js 20+):

```bash
npm ci
npx playwright install --with-deps chromium
npm test
```

The test starts and stops its own local HTTP server and fresh browser context. It blocks every non-local request and asserts that none were attempted. It checks cold startup, two-chapter discovery, inline/display KaTeX, font loading, sidebar navigation, collapsible proofs, literal fenced markers, instructor visibility, a chapter removed after discovery, no chapters at startup, and missing marker specifications. No internet is needed to run after the tools and browser have been installed. To use an existing compatible Chromium binary, set `CHROMIUM_PATH=/path/to/chromium` when running `npm test`.

## Third-party assets

KaTeX 0.16.9 is vendored unchanged from its npm distribution, including every font referenced by its CSS and its MIT license. See [vendor/katex/README.md](vendor/katex/README.md) for provenance and reproducible refresh instructions.

## 📄 License

MIT

---

*Built for authors who want simplicity without sacrificing power.*
