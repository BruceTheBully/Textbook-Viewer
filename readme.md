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
- **Fully offline** — No server required (except for initial KaTeX CDN load)

## 🚀 Quick Start

1. Download or clone this repo
2. Create your chapter files (`chapter_1.txt`, `chapter_2.txt`, etc.)
3. Serve locally:
   ```bash
   python -m http.server 8000
   ```
4. Open `http://localhost:8000`

## 📁 Project Structure

```
textbook-engine/
├── index.html           # The engine (single file, no build step)
├── emoji_index.json     # Marker definitions and behaviors
├── chapter_1.txt        # Your chapter files
├── chapter_2.txt
├── AUTHORING_GUIDE.md   # Instructions for writing chapters
├── CHANGELOG.md         # Version history
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

## 📄 License

MIT

---

*Built for authors who want simplicity without sacrificing power.*
