# 📘 Textbook Engine Changelog

## Version 2.0.0 (Major Release)

### New Features

#### 🖋️ LaTeX Rendering
- Added full LaTeX support using KaTeX rendering engine
- New `🖋️` marker for dedicated LaTeX blocks (fenced scope)
- Inline LaTeX support in body text using `$...$` for inline and `$$...$$` for display math
- All text content now processes inline LaTeX automatically

**Usage:**
```
🖋️ Quadratic Formula
{{{
x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}
}}}
```

Or inline: `The energy equation is $E = mc^2$ which shows mass-energy equivalence.`

#### 🖼️ Image Support
- New `🖼️` marker for embedding images from local `/assets/` folder
- Line-scope for clean, simple syntax
- Optional caption support
- Graceful error handling for missing images
- Lazy loading for performance

**Usage:**
```
🖼️ diagrams/signal_flow.png This is the caption for the image
```

Images are loaded from `assets/` directory relative to index.html.

#### 📋 Full Table of Contents
- TOC now shows ALL chapters from the textbook, not just current chapter
- Chapters are collapsible in the sidebar
- Click chapter headers to navigate between chapters
- Sections within each chapter are expandable/collapsible
- Current chapter is expanded by default, others collapsed

#### 🖱️ Independent Scrolling
- Sidebar (TOC) and main content area now scroll independently
- No more scrolling back to top to access navigation
- Fixed layout that fills the viewport
- Better reading experience for long chapters

### Technical Changes

#### emoji_index.json
- Bumped version to 2.0.0
- Added new `media` category for rich content markers
- New markers:
  - `🖋️` (LaTeX) - fenced scope, latex behavior
  - `🖼️` (Image) - line scope, image behavior
- Added `box-latex` styling variant

#### index.html Engine
- Integrated KaTeX library from CDN
- Added `renderLatex()` function for block LaTeX
- Added `processInlineLatex()` for inline math in text
- New `ALL_CHAPTERS` and `ALL_CHAPTERS_DATA` state for multi-chapter TOC
- Added `loadAllChaptersData()` for background chapter loading
- Updated `buildFullTOC()` for hierarchical chapter/section display
- CSS changes:
  - Flexbox-based layout for fixed-height scrolling regions
  - `min-height: 0` trick for proper flex child scrolling
  - New `.toc-chapter-group`, `.toc-chapter-header`, `.toc-chapter-sections` styles
  - `.latex-content` and `.image-block` styling
  - Dark mode support for new elements

### Migration Notes

- Existing chapter files work without modification
- New markers are additive; no breaking changes
- Images require creating an `assets/` folder
- LaTeX requires internet connection (KaTeX CDN) or local hosting of KaTeX

---

## Version 1.3.0 (Previous Release)

- Initial public release
- Emoji-based semantic markers
- Stack-based tree parser
- Student/Instructor view modes
- Chapter discovery and switching
- Auto-refresh for live editing
- Search highlighting
