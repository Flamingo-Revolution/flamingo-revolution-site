---
version: alpha
name: Revolucioni Flamingo
description: Neo-brutalist civic campaign site for Revolucioni Flamingo
omitted:
  - section: spacing
    reason: No named spacing scale in shared CSS tokens
  - section: rounded
    reason: No named radius token; neo-brutalist chrome uses sharp corners
colors:
  bg: "#202326"
  paper: "#f1ece6"
  paper-warm: "#dcb78d"
  paper-cool: "#dff4fb"
  surface: "#fff8ef"
  surface-strong: "#ffffff"
  text: "#141414"
  muted: "#5a514b"
  line: "rgba(20, 20, 20, 0.18)"
  ink: "#050505"
  primary: "{colors.ink}"
  ink-reverse: "#fff3df"
  accent: "#ff69b8"
  accent-strong: "#ef537d"
  accent-blue: "#71b7da"
  accent-soft: "#ffd7e3"
typography:
  body:
    fontFamily: Space Grotesk
  display:
    fontFamily: Cormorant Garamond
components:
  button:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    height: 3rem
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ink-reverse}"
  button-ghost:
    backgroundColor: "{colors.paper-cool}"
    textColor: "{colors.text}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    height: 3.15rem
---

## Overview

Revolucioni Flamingo is a civic campaign website. Its governing look is neo-brutalist: high-contrast paper and ink, hard borders, solid offset shadows, sharp corners, heavy UI weight, and italic display accents for editorial moments.

## Colors

Use the shared semantic roles from the site tokens. `ink` is the neo-brutalist structural color; `primary` aliases it for agents that expect a primary token. `bg` is the outer page field behind the shell. `paper`, `paper-warm`, and `paper-cool` paint major bands and section grounds. `surface` and `surface-strong` are raised panels and chips. `text` and `muted` carry body and secondary copy. `ink-reverse` pairs with `ink` for inverted chrome. `line` separates sticky chrome and section bands. `accent`, `accent-strong`, `accent-blue`, and `accent-soft` mark brand emphasis, active states, and soft panel tints—never as a soft gradient theme in place of ink structure.

## Themes

Default theme is light (`data-theme="light"`). Dark mode remaps the same token names:

| Token | Light | Dark |
| --- | --- | --- |
| bg | `#202326` | `#090d12` |
| paper | `#f1ece6` | `#121b22` |
| paper-warm | `#dcb78d` | `#2a3944` |
| paper-cool | `#dff4fb` | `#0d2732` |
| surface | `#fff8ef` | `#10171d` |
| surface-strong | `#ffffff` | `#18232c` |
| text | `#141414` | `#fff0dc` |
| muted | `#5a514b` | `#cbbfb1` |
| line | `rgba(20, 20, 20, 0.18)` | `rgba(255, 240, 220, 0.18)` |
| ink | `#050505` | `#fff0dc` |
| ink-reverse | `#fff3df` | `#06080b` |
| accent | `#ff69b8` | `#ff72bd` |
| accent-strong | `#ef537d` | `#ff8aa0` |
| accent-blue | `#71b7da` | `#78c6e8` |
| accent-soft | `#ffd7e3` | `rgba(255, 114, 189, 0.2)` |

Keep token names stable across themes; only values change.

## Typography

`body` (Space Grotesk) is the default UI and reading face for chrome, buttons, leads, and dense controls—typically heavy weight. `display` (Cormorant Garamond) is reserved for italic eyebrows, brand sublines, closing quotes, and editorial masthead moments. Do not swap the roles.

## Layout

Primary product pages sit in a centered page shell on a gridded outer field. Horizontal section padding scales with viewport and collapses toward full-bleed on small screens. Sticky topbar, heavy bottom rules between bands, and responsive grids that drop to a single column below the mid breakpoint are the default rhythm.

## Elevation & Depth

Interactive and card surfaces use hard, solid offset shadows in `ink`, not soft blur stacks. Soft ambient shadow is only for the page shell sitting on `bg`. Desktop collage tilt on select panels is optional ornament; disable tilt on small screens so layout stays square and readable.

## Shapes

Neo-brutalist chrome is rectangular and sharp: buttons, filters, cards, dialogs, and text inputs keep square corners. Circular geometry is limited to discrete indicators (for example theme glyphs or spinners), not primary controls.

## Components

**Buttons** share a hard `ink` border, solid offset shadow, and heavy weight. Default uses `surface`; primary inverts to `ink` / `ink-reverse`; ghost uses `paper-cool`. Hover and focus shift one step toward the shadow and fill with `ink` when emphasized.

**Inputs** match the same border and offset-shadow language as buttons, with `surface` fill and `muted` placeholders. Labels and filter captions use tight uppercase tracking in `accent-strong`.
