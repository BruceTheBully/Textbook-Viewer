# 📘 Textbook Authoring Guide

## For LLMs and Human Authors

**Version 2.0.0** | Compatible with Textbook Engine v2.0.0+

---

## Table of Contents

1. [Overview](#overview)
2. [Core Concepts](#core-concepts)
3. [Document Structure](#document-structure)
4. [Complete Marker Reference](#complete-marker-reference)
5. [Scope Modes Explained](#scope-modes-explained)
6. [LaTeX Support](#latex-support) ✨ NEW
7. [Image Support](#image-support) ✨ NEW
8. [Formatting Rules](#formatting-rules)
9. [Common Patterns](#common-patterns)
10. [LLM-Specific Instructions](#llm-specific-instructions)
11. [Troubleshooting](#troubleshooting)
12. [Quick Reference Card](#quick-reference-card)

---

## Overview

The Textbook Engine uses **emoji markers** at the beginning of lines to denote semantic structure. This plain-text format is:

- **Human-readable** — Authors can write and edit in any text editor
- **LLM-friendly** — Simple rules that language models can follow consistently
- **Semantically rich** — Each marker carries meaning, not just styling
- **Renderer-agnostic** — The same source can be styled differently by different renderers
- **Math-ready** — Full LaTeX support for equations and formulas ✨ NEW
- **Media-rich** — Embed images from local assets ✨ NEW

### The Golden Rule

> **The first emoji on a line determines what kind of block it is.**
> 
> Everything after the emoji (on that line and subsequent unmarked lines) becomes the block's content.

---

## Core Concepts

### What is a Marker?

A **marker** is an emoji that appears as the first non-whitespace character on a line. It signals to the renderer that a new semantic block is beginning.

```
📚 This line starts a Section because 📚 is the first character
```

### What is a Block?

A **block** is a unit of content with a specific type (determined by its marker), content (the text), and behaviors (how it renders).

### What is Scope?

**Scope** determines how much content belongs to a block. Different markers have different scope rules:

| Scope Mode | Content Includes | Ends When |
|------------|------------------|-----------|
| `line` | Only the marker line | Immediately |
| `block` | Multiple lines | Next marker appears |
| `fenced` | Content between `{{{` and `}}}` | Closing fence |

---

## Document Structure

### Hierarchy

Textbooks follow a strict hierarchy:

```
📘 Chapter (top level)
├── Body text (implicit, no marker needed)
├── 📚 Section
│   ├── Body text
│   ├── 🚩 Objectives
│   ├── 🖋️ LaTeX equation
│   ├── 🔏 Proof
│   │   └── (content)
│   └── ❓ Example
└── 📚 Another Section
    └── ...
```

### Minimal Valid Document

```
📘 Chapter Title

This is body text. No marker needed for regular paragraphs.

📚 First Section

More body text under this section.
```

### Complete Document Example with LaTeX

```
📘 Introduction to Calculus

Welcome to calculus! This chapter introduces the fundamental concepts.

📚 Limits

🚩 Learning Objectives
Understand the intuitive meaning of a limit
Evaluate simple limits algebraically
Identify when limits do not exist

The concept of a limit is foundational to all of calculus. We write $\lim_{x \to a} f(x) = L$ to denote that $f(x)$ approaches $L$ as $x$ approaches $a$.

📖 Limit
The limit of f(x) as x approaches a, written $\lim_{x \to a} f(x) = L$, means that f(x) gets arbitrarily close to L as x gets arbitrarily close to a.

🔬 Squeeze Theorem
If $g(x) \leq f(x) \leq h(x)$ for all x near a (except possibly at a), and $\lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L$, then $\lim_{x \to a} f(x) = L$.

🖋️ Formal Definition of Limit
{{{
\forall \varepsilon > 0, \exists \delta > 0 : 0 < |x - a| < \delta \Rightarrow |f(x) - L| < \varepsilon
}}}

🔏 Proof of Squeeze Theorem
Let $\varepsilon > 0$ be given. 

Since $\lim g(x) = L$, there exists $\delta_1 > 0$ such that $|g(x) - L| < \varepsilon$ when $0 < |x - a| < \delta_1$.

Similarly, there exists $\delta_2 > 0$ such that $|h(x) - L| < \varepsilon$ when $0 < |x - a| < \delta_2$.

Let $\delta = \min(\delta_1, \delta_2)$. Then for $0 < |x - a| < \delta$:

$$L - \varepsilon < g(x) \leq f(x) \leq h(x) < L + \varepsilon$$

Therefore $|f(x) - L| < \varepsilon$, which proves $\lim f(x) = L$.

🖼️ diagrams/squeeze_theorem.png Visual illustration of the Squeeze Theorem

❓ Example: Evaluating a Limit
Find $\lim_{x \to 2} \frac{x^2 - 4}{x - 2}$.

We cannot substitute directly (division by zero), so we factor:

$$\frac{x^2 - 4}{x - 2} = \frac{(x+2)(x-2)}{x-2} = x + 2$$

Therefore $\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = 4$.

⚠️ This technique only works because $(x-2)$ is a common factor. Always check for indeterminate forms first!

✏️ Practice Problems
Evaluate $\lim_{x \to 0} \frac{\sin(x)}{x}$
Find $\lim_{x \to \infty} \frac{3x^2 + 2x}{x^2 - 1}$
Prove that $\lim_{x \to 0} x \cdot \sin(1/x) = 0$ using the Squeeze Theorem

📚 Continuity

A function is continuous if you can draw it without lifting your pencil...
```

---

## Complete Marker Reference

### Structure Markers

| Marker | Name | Scope | Purpose |
|--------|------|-------|---------|
| 📘 | Chapter | line | Top-level document division |
| 📚 | Section | line | Major topic division within a chapter |
| 🚩 | Objectives | block | Learning goals (renders as bulleted list) |
| ⏮️ | Looking Back | block | Prerequisites or review material (collapsed) |
| 🧭 | Roadmap | block | Preview of upcoming content |

### Academic Markers

| Marker | Name | Scope | Purpose |
|--------|------|-------|---------|
| 🔏 | Proof | block | Mathematical proof (collapsed, shows ∎) |
| 🧮 | Statistics | block | Statistical formulas or data |
| 📜 | Citation | block | Reference to source material |
| ⚖️ | Law | block | Legal text or regulations |
| 🧲 | Physics | block | Physics equations or principles |
| 💳 | Debit/Credit | block | Accounting entries |
| 🗝️ | Key Vocabulary | block | Important terms (highlighted) |
| 📖 | Definition | block | Formal term definition |
| 🔬 | Theorem | block | Named theorem (auto-numbered) |

### Pedagogy Markers

| Marker | Name | Scope | Purpose |
|--------|------|-------|---------|
| ✏️ | In-Class Problem | block | Practice during lecture |
| 📝 | Homework | block | Take-home assignments |
| ❓ | Example | block | Worked example (auto-numbered) |
| 📊 | Visual Data | fenced | Charts, diagrams, ASCII art |
| 🧪 | Experiment | block | Lab activities (collapsed) |
| 🧠 | Mental Model | block | Intuition-building insight |
| 💻 | Code | fenced | Programming code blocks |

### Voice Markers

| Marker | Name | Scope | Purpose |
|--------|------|-------|---------|
| 🧾 | Author Note | block | Personal aside from author |
| 📌 | Quick Insert | block | Brief important note |
| ⚠️ | Warning | block | Caution or common mistake |
| 💡 | Tip | block | Helpful suggestion |

### Media Markers ✨ NEW

| Marker | Name | Scope | Purpose |
|--------|------|-------|---------|
| 🖋️ | LaTeX | fenced | Display math equations (KaTeX) |
| 🖼️ | Image | line | Embed image from assets folder |

### Metadata Markers

| Marker | Name | Scope | Visibility |
|--------|------|-------|------------|
| 🔐 | Metadata | fenced | Instructor only |

---

## Scope Modes Explained

### Line Scope

**Used by:** 📘 Chapter, 📚 Section, 🖼️ Image

Content is only the text on the same line as the marker. Subsequent lines belong to the parent container.

```
📘 This Entire Line is the Chapter Title
This line is body text UNDER the chapter, not part of the title.

📚 Section Title
This is body text under the section.

🖼️ path/to/image.png This is the caption
This is body text, not part of the image block.
```

**Correct ✔**
```
📘 Introduction to Biology
```

**Incorrect ✗**
```
📘 Introduction to Biology
    The Study of Life        ← This becomes body text, not part of title!
```

### Block Scope

**Used by:** Most markers (🚩, 🔏, ❓, 📖, etc.)

Content continues until the next marker appears. Blank lines are allowed within the block.

```
🔏 Proof of the Pythagorean Theorem
Let ABC be a right triangle with the right angle at C.

Construct squares on each side of the triangle.

[Multiple paragraphs continue to be part of this proof...]

The areas satisfy $a^2 + b^2 = c^2$. ∎

📚 Next Section
← The proof block ended because a new marker appeared
```

**Key Rule:** Blank lines do NOT end block-scoped content. Only a new marker does.

```
🧠 Here's the key insight about recursion.

Think about it like Russian nesting dolls.

Each doll contains a smaller version of itself.

← All three paragraphs belong to the Mental Model block
```

### Fenced Scope

**Used by:** 📊 Visual Data, 💻 Code, 🔐 Metadata, 🖋️ LaTeX

Content must be wrapped in fence tokens: `{{{` to open, `}}}` to close.

```
💻 Python Example
{{{
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# This is all preserved exactly as written
print(fibonacci(10))
}}}
```

**Critical Rules:**
1. The `{{{` must appear on its own line after the marker
2. The `}}}` must appear on its own line
3. Everything between fences is captured verbatim (including blank lines)
4. Markers inside fences are NOT processed

```
🖋️ Maxwell's Equations
{{{
\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}

\nabla \cdot \mathbf{B} = 0

\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t}

\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
}}}
```

---

## LaTeX Support ✨ NEW

Version 2.0 introduces full LaTeX support powered by KaTeX.

### Dedicated LaTeX Blocks

Use the 🖋️ marker with fenced content for display equations:

```
🖋️ The Fourier Transform
{{{
F(\omega) = \int_{-\infty}^{\infty} f(t) e^{-j\omega t} \, dt
}}}
```

This renders as a centered, display-mode equation with proper formatting.

### Inline LaTeX

You can embed LaTeX directly in body text using dollar signs:

- **Inline math:** `$E = mc^2$` renders inline with text
- **Display math:** `$$\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$$` renders centered

**Example body text:**
```
The quadratic formula $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$ gives us the roots of any quadratic equation $ax^2 + bx + c = 0$.
```

### When to Use Each Style

| Style | Syntax | Use Case |
|-------|--------|----------|
| Inline | `$...$` | Short expressions within sentences |
| Display (inline) | `$$...$$` | Important equations in body text |
| Block | `🖋️` + `{{{...}}}` | Major equations deserving their own block |

### LaTeX Tips

1. **Use `\,` for thin spaces** in integrals: `\int f(x) \, dx`
2. **Use `\text{}` for words** in equations: `\text{if } x > 0`
3. **Use `\mathbf{}` for vectors**: `\mathbf{F} = m\mathbf{a}`
4. **Escape special characters**: `\$`, `\%`, `\_`

### Common LaTeX Commands

```
Fractions:     \frac{a}{b}
Square root:   \sqrt{x}  or  \sqrt[n]{x}
Subscript:     x_1  or  x_{n+1}
Superscript:   x^2  or  x^{n+1}
Greek:         \alpha, \beta, \gamma, \omega, \Omega
Operators:     \sin, \cos, \log, \lim, \sum, \int
Arrows:        \to, \rightarrow, \Rightarrow, \leftrightarrow
Relations:     \leq, \geq, \neq, \approx, \equiv
Sets:          \in, \subset, \cup, \cap, \emptyset
Calculus:      \partial, \nabla, \infty
Matrices:      \begin{pmatrix} a & b \\ c & d \end{pmatrix}
```

---

## Image Support ✨ NEW

Version 2.0 adds support for embedding images from a local `assets/` folder.

### Basic Syntax

```
🖼️ path/to/image.png Optional caption text here
```

The image path is relative to the `assets/` folder. So `🖼️ diagrams/flow.png` loads from `assets/diagrams/flow.png`.

### Examples

**Simple image:**
```
🖼️ photo.jpg
```

**Image with caption:**
```
🖼️ circuits/rc_filter.png Low-pass RC filter frequency response
```

**Organized by topic:**
```
🖼️ chapter1/figure1.png Figure 1: System overview
🖼️ chapter1/figure2.png Figure 2: Detailed block diagram
```

### File Organization

Create an `assets/` folder in the same directory as your `index.html`:

```
textbook/
├── index.html
├── emoji_index.json
├── chapter_1.txt
├── chapter_2.txt
└── assets/
    ├── diagrams/
    │   ├── flow_chart.png
    │   └── architecture.png
    ├── photos/
    │   └── lab_setup.jpg
    └── equations/
        └── derivation.png
```

### Supported Formats

- PNG (recommended for diagrams)
- JPG/JPEG (recommended for photos)
- GIF (for animations)
- SVG (for scalable graphics)
- WebP (for modern browsers)

### Image Best Practices

1. **Use descriptive filenames:** `rc_lowpass_response.png` not `img1.png`
2. **Organize by chapter or topic:** Keep related images together
3. **Optimize file sizes:** Large images slow down loading
4. **Always provide captions:** They appear below the image and aid accessibility
5. **Use PNG for diagrams:** Better quality for sharp lines
6. **Use JPG for photos:** Better compression for photographs

### Error Handling

If an image file is missing, the engine displays a helpful error message instead of a broken image icon.

---

## Formatting Rules

### Rule 1: One Marker Per Line

Each line can have at most one primary marker at the start.

**Correct ✔**
```
📚 Section on Thermodynamics

🔬 First Law of Thermodynamics
Energy cannot be created or destroyed.
```

**Incorrect ✗**
```
📚 Section 🔬 First Law    ← Don't combine structural markers!
```

### Rule 2: Marker Must Be First

The marker emoji must be the very first non-whitespace character.

**Correct ✔**
```
🔏 Proof of Theorem 3.2
```

**Incorrect ✗**
```
Proof: 🔏 of Theorem 3.2    ← Marker not at start, ignored!
```

### Rule 3: Space After Marker is Optional But Recommended

```
📘 With Space (recommended)
📘Without Space (also valid)
```

### Rule 4: Indentation Creates Nesting

Indented markers become children of the previous less-indented block.

```
📚 Main Section

🔬 Outer Theorem
This theorem has a nested proof.

  🔏 Nested Proof
  This proof is visually nested under the theorem.
  
  It can have multiple paragraphs.

🔬 Another Theorem
← Back to top level because no indentation
```

**Indentation Rule:** 2 spaces = 1 nesting level

### Rule 5: Lists in Block Content

For markers that render as lists (🚩, ✏️, 📝, 🗝️), write each item on its own line.

**Correct ✔**
```
🚩 Learning Objectives
Define the term "algorithm"
Analyze time complexity
Implement basic sorting algorithms
```

**Also Correct ✔** (with bullet characters, which get stripped)
```
🚩 Learning Objectives
- Define the term "algorithm"
- Analyze time complexity
- Implement basic sorting algorithms
```

**Incorrect ✗**
```
🚩 Learning Objectives: Define algorithms, analyze complexity, implement sorting
← This renders as one long bullet point!
```

### Rule 6: Tags via Additional Emojis

Secondary emojis after the primary marker become tags (displayed as badges).

```
📝🔥 Hot New Proof
← "🔥" becomes a tag badge

✏️⭐ Starred Problem
← "⭐" becomes a tag badge
```

### Rule 7: Body Text Needs No Marker

Regular paragraphs don't need any marker. Just write text. You can include inline LaTeX.

```
📚 Section Title

This is a regular paragraph. No marker needed. We can write $f(x) = x^2$ inline.

This is another paragraph. Still no marker.

📖 Definition
Now this is a definition block because it has a marker.
```

---

## Common Patterns

### Pattern: Definition → Theorem → Proof → Example (with LaTeX)

```
📖 Continuous Function
A function $f$ is continuous at point $a$ if $\lim_{x \to a} f(x) = f(a)$.

🔬 Intermediate Value Theorem
If $f$ is continuous on $[a,b]$ and $k$ is between $f(a)$ and $f(b)$, then there exists $c \in (a,b)$ such that $f(c) = k$.

🔏 Proof
Without loss of generality, assume $f(a) < k < f(b)$.

Define $S = \{x \in [a,b] : f(x) < k\}$. This set is non-empty ($a \in S$) and bounded above by $b$.

Let $c = \sup(S)$. We claim $f(c) = k$.

[... proof continues ...]

❓ Example: Finding Roots
Show that $x^3 - x - 1 = 0$ has a solution in $(1, 2)$.

Let $f(x) = x^3 - x - 1$. Then:

$$f(1) = 1 - 1 - 1 = -1 < 0$$
$$f(2) = 8 - 2 - 1 = 5 > 0$$

Since $f$ is continuous and $f(1) < 0 < f(2)$, by IVT there exists $c \in (1,2)$ with $f(c) = 0$.
```

### Pattern: Equation Block with Explanation

```
📚 The Wave Equation

The one-dimensional wave equation describes how waves propagate through a medium:

🖋️ Wave Equation
{{{
\frac{\partial^2 u}{\partial t^2} = c^2 \frac{\partial^2 u}{\partial x^2}
}}}

Here $u(x,t)$ represents the displacement at position $x$ and time $t$, while $c$ is the wave speed.

🧠 Think of dropping a stone in a pond. The ripples spreading outward follow this equation—the shape of the wave at any moment depends on how the surface curves (the spatial derivative) and how fast it's accelerating (the time derivative).
```

### Pattern: Image with Context

```
📚 Circuit Analysis

🖼️ circuits/rc_lowpass.png RC low-pass filter circuit diagram

The RC low-pass filter consists of a resistor $R$ and capacitor $C$ in series. The transfer function is:

🖋️ RC Transfer Function
{{{
H(j\omega) = \frac{1}{1 + j\omega RC}
}}}

The cutoff frequency is $f_c = \frac{1}{2\pi RC}$.

🖼️ circuits/rc_bode.png Bode plot showing magnitude and phase response
```

### Pattern: Code with Math Explanation

```
💻 FFT Implementation
{{{
import numpy as np

def fft(x):
    N = len(x)
    if N <= 1:
        return x
    even = fft(x[0::2])
    odd = fft(x[1::2])
    T = [np.exp(-2j * np.pi * k / N) * odd[k] for k in range(N // 2)]
    return [even[k] + T[k] for k in range(N // 2)] + \
           [even[k] - T[k] for k in range(N // 2)]
}}}

💡 The twiddle factor $W_N^k = e^{-2\pi j k / N}$ is what makes the FFT work—it's a root of unity that lets us combine smaller DFTs efficiently.
```

---

## LLM-Specific Instructions

When an LLM is generating textbook content, follow these guidelines:

### DO ✔

1. **Start every chapter with 📘**
   ```
   📘 Chapter Title Here
   ```

2. **Use 📚 for major sections** (2-5 per chapter typically)
   ```
   📚 Major Topic Name
   ```

3. **Begin sections with 🚩 Objectives when pedagogically appropriate**
   ```
   🚩 Learning Objectives
   First objective
   Second objective
   Third objective
   ```

4. **Use 📖 for formal definitions and 🔬 for named theorems**
   ```
   📖 Technical Term
   The formal definition goes here.
   
   🔬 Famous Theorem Name
   The theorem statement goes here.
   ```

5. **Pair theorems with proofs when proving**
   ```
   🔬 Theorem Statement
   ...
   
   🔏 Proof
   ...
   ```

6. **Use ❓ for worked examples** (these get auto-numbered)
   ```
   ❓ Descriptive Example Title
   Problem setup...
   Solution steps...
   ```

7. **Use ⚠️ for common mistakes and 💡 for tips**
   ```
   ⚠️ Don't confuse correlation with causation!
   
   💡 A quick sanity check: does your answer have the right units?
   ```

8. **Use fenced blocks for code, diagrams, and LaTeX**
   ```
   💻 Code Example
   {{{
   actual code here
   }}}
   
   🖋️ Important Equation
   {{{
   E = mc^2
   }}}
   ```

9. **Use inline LaTeX for math in body text**
   ```
   The derivative of $f(x) = x^2$ is $f'(x) = 2x$.
   ```

10. **Use 🖼️ for images with descriptive captions**
    ```
    🖼️ diagrams/concept.png Clear caption describing the figure
    ```

11. **Write body text without markers for regular exposition**
    ```
    📚 Section Title
    
    This paragraph needs no marker. Just write naturally with $\LaTeX$ inline.
    
    This is another paragraph of explanation.
    ```

12. **End chapters with practice problems**
    ```
    ✏️ Practice Problems
    Problem 1
    Problem 2
    Problem 3
    
    📝 Homework
    More challenging problem 1
    More challenging problem 2
    ```

### DON'T ✗

1. **Don't put multiple markers on one line**
   ```
   ✗ 📚 🔏 Section with Proof    ← Wrong!
   ✔ 📚 Section Title
     🔏 Proof within section
   ```

2. **Don't forget fences for code/visual/LaTeX blocks**
   ```
   ✗ 💻 Code Example
     def foo():              ← Missing {{{ }}}
       pass
   
   ✔ 💻 Code Example
     {{{
     def foo():
       pass
     }}}
   ```

3. **Don't use markers mid-sentence**
   ```
   ✗ The proof 🔏 uses induction...    ← Marker ignored!
   ✔ 🔏 Proof by Induction
     The proof uses induction...
   ```

4. **Don't create deeply nested structures (3+ levels)**
   ```
   ✗ Deep nesting is hard to read
       🔏 Level 1
         🔏 Level 2
           🔏 Level 3
             🔏 Level 4    ← Too deep!
   ```

5. **Don't mix unrelated content in one block**
   ```
   ✗ 🔏 Proof and Also Some History
     Here's the proof...
     By the way, Euler was born in 1707...    ← Use separate blocks!
   
   ✔ 🔏 Proof
     Here's the proof...
   
   🧾 Historical Note
     Euler was born in 1707...
   ```

6. **Don't use chapter markers (📘) for sections or subsections**
   ```
   ✗ 📘 Introduction
     📘 Background        ← Should be 📚!
     📘 Methods           ← Should be 📚!
   
   ✔ 📘 Introduction
     📚 Background
     📚 Methods
   ```

7. **Don't write objectives as a single run-on line**
   ```
   ✗ 🚩 Objectives: Learn X, understand Y, and apply Z
   
   ✔ 🚩 Objectives
     Learn X
     Understand Y
     Apply Z
   ```

8. **Don't use raw LaTeX without delimiters in body text**
   ```
   ✗ The equation E = mc^2 shows...    ← Won't render as math!
   ✔ The equation $E = mc^2$ shows...
   ```

9. **Don't use absolute paths for images**
   ```
   ✗ 🖼️ /home/user/images/photo.png
   ✔ 🖼️ photos/photo.png    ← Relative to assets/
   ```

### Structural Template for LLMs

When generating a full chapter, follow this template:

```
📘 [Chapter Title]

[1-2 paragraphs introducing the chapter topic]

📚 [First Major Section]

🚩 Learning Objectives
[Objective 1]
[Objective 2]
[Objective 3]

[Introductory paragraphs with inline math like $f(x)$]

📖 [Key Term]
[Formal definition with $math$ as needed]

🔬 [Important Theorem] (if applicable)
[Theorem statement]

🖋️ [Key Equation Name]
{{{
\text{LaTeX equation here}
}}}

🔏 [Proof] (if proving the theorem)
[Proof content with inline $math$]

🖼️ diagrams/relevant_figure.png Caption describing the figure

❓ [Worked Example]
[Problem and solution]

⚠️ [Common mistake or misconception]

💡 [Helpful tip]

📚 [Second Major Section]

[Continue with similar structure...]

📚 Summary

[Brief recap of key points]

🧭 What's Next
[Preview of upcoming chapter]

✏️ Practice Problems
[Problem 1]
[Problem 2]
[Problem 3]

📝 Homework
[Assignment 1]
[Assignment 2]
```

---

## Troubleshooting

### Problem: Block content bleeding into next block

**Symptom:** Content from one block appears in the following block.

**Cause:** Missing marker on the new block.

**Fix:** Ensure each new semantic unit starts with its marker.

```
✗ Problem:
🔏 First Proof
Content of first proof...

This should be a new proof but has no marker!

✔ Fixed:
🔏 First Proof
Content of first proof...

🔏 Second Proof
This is correctly a new proof.
```

### Problem: Code/LaTeX block not rendering correctly

**Symptom:** Code or LaTeX appears as regular text, or formatting is lost.

**Cause:** Missing or mismatched fence tokens.

**Fix:** Ensure `{{{` and `}}}` are on their own lines.

```
✗ Problem:
💻 Example {{{ print("hello") }}}

✔ Fixed:
💻 Example
{{{
print("hello")
}}}
```

### Problem: LaTeX not rendering

**Symptom:** Dollar signs and LaTeX commands appear as plain text.

**Cause:** Missing dollar sign delimiters, or KaTeX not loaded.

**Fix:** Ensure inline math uses `$...$` and display math uses `$$...$$` or `🖋️` blocks.

```
✗ Problem:
The equation x^2 + y^2 = r^2 describes a circle.

✔ Fixed:
The equation $x^2 + y^2 = r^2$ describes a circle.
```

### Problem: Image not displaying

**Symptom:** Error message or broken image.

**Cause:** Wrong path or missing file.

**Fix:** Ensure the file exists in `assets/` folder with correct path.

```
✗ Problem:
🖼️ /absolute/path/image.png    ← Wrong!
🖼️ image.png                   ← Missing from assets/

✔ Fixed:
🖼️ diagrams/image.png          ← File exists at assets/diagrams/image.png
```

### Problem: List rendering as single paragraph

**Symptom:** Objectives or problems appear as one long line.

**Cause:** Items not on separate lines.

**Fix:** Put each item on its own line.

```
✗ Problem:
🚩 Objectives: Learn X, Learn Y, Learn Z

✔ Fixed:
🚩 Objectives
Learn X
Learn Y
Learn Z
```

### Problem: Nested content not indenting

**Symptom:** Nested blocks appear at the same level as parents.

**Cause:** Not using spaces to indent.

**Fix:** Use 2 spaces per nesting level.

```
✗ Problem:
🔬 Theorem
🔏 Proof

✔ Fixed:
🔬 Theorem
Statement here.

  🔏 Proof
  Proof is indented 2 spaces.
```

### Problem: Marker not recognized

**Symptom:** Emoji appears as regular text.

**Cause:** Emoji not in the spec, or not at line start.

**Fix:** Check the marker reference; ensure it's first character.

```
✗ Problem:
Note: 📌 This is important    ← 📌 not at start

✔ Fixed:
📌 This is important
```

---

## Quick Reference Card

```
╔═══════════════════════════════════════════════════════════════╗
║               TEXTBOOK EMOJI QUICK REFERENCE v2.0             ║
╠═══════════════════════════════════════════════════════════════╣
║ STRUCTURE                                                      ║
║   📘 Chapter        📚 Section        🚩 Objectives            ║
║   ⏮️ Looking Back   🧭 Roadmap                                 ║
╠═══════════════════════════════════════════════════════════════╣
║ ACADEMIC                                                       ║
║   📖 Definition     🔬 Theorem        🔏 Proof                 ║
║   📜 Citation       🗝️ Vocabulary     🧲 Physics               ║
║   🧮 Statistics     ⚖️ Law            💳 Debit/Credit          ║
╠═══════════════════════════════════════════════════════════════╣
║ PEDAGOGY                                                       ║
║   ❓ Example        ✏️ In-Class       📝 Homework              ║
║   🧠 Mental Model   🧪 Experiment     💻 Code [fenced]         ║
║   📊 Visual [fenced]                                           ║
╠═══════════════════════════════════════════════════════════════╣
║ VOICE                                                          ║
║   💡 Tip            ⚠️ Warning        📌 Quick Note            ║
║   🧾 Author Note                                               ║
╠═══════════════════════════════════════════════════════════════╣
║ MEDIA ✨ NEW                                                   ║
║   🖋️ LaTeX [fenced]     🖼️ Image [line]                       ║
╠═══════════════════════════════════════════════════════════════╣
║ META                                                           ║
║   🔐 Metadata [fenced, instructor-only]                        ║
╠═══════════════════════════════════════════════════════════════╣
║ SCOPE MODES                                                    ║
║   line   → Content is only the marker line (📘, 📚, 🖼️)       ║
║   block  → Content until next marker (most blocks)             ║
║   fenced → Content between {{{ and }}} (💻, 📊, 🔐, 🖋️)       ║
╠═══════════════════════════════════════════════════════════════╣
║ LATEX                                                          ║
║   Inline:  $E = mc^2$                                          ║
║   Display: $$\sum_{n=1}^{\infty} \frac{1}{n^2}$$              ║
║   Block:   🖋️ Title + {{{ LaTeX }}}                           ║
╠═══════════════════════════════════════════════════════════════╣
║ IMAGES                                                         ║
║   🖼️ path/from/assets/image.png Optional caption              ║
╠═══════════════════════════════════════════════════════════════╣
║ RULES                                                          ║
║   • Marker must be first character on line                     ║
║   • 2 spaces = 1 nesting level                                 ║
║   • Blank lines OK in block scope                              ║
║   • No marker needed for body paragraphs                       ║
║   • Additional emojis become tags                              ║
║   • Use $...$ for inline math, $$...$$ for display            ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Appendix: Emoji Copy-Paste Reference

For easy copying:

**Structure:** 📘 📚 🚩 ⏮️ 🧭

**Academic:** 🔏 🧮 📜 ⚖️ 🧲 💳 🗝️ 📖 🔬

**Pedagogy:** ✏️ 📝 ❓ 📊 🧪 🧠 💻

**Voice:** 🧾 📌 ⚠️ 💡

**Media:** 🖋️ 🖼️

**Metadata:** 🔐

**Fences:** `{{{` and `}}}`

**LaTeX Delimiters:** `$...$` (inline) and `$$...$$` (display)

---

## Appendix: Project File Structure

```
your-textbook/
├── index.html              # The V2 engine
├── emoji_index.json        # Marker specification
├── chapter_1.txt           # Chapter files
├── chapter_2.txt
├── chapter_3.txt
├── ...
├── AUTHORING_GUIDE.md      # This document
├── CHANGELOG.md            # Version history
└── assets/                 # Image assets folder
    ├── diagrams/
    │   ├── figure1.png
    │   └── figure2.png
    ├── photos/
    │   └── experiment.jpg
    └── equations/
        └── derivation.png
```

---

*This guide is part of the Textbook Engine documentation. For renderer implementation details, see the source code comments.*
