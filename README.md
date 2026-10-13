# Aditya Ganeshgudi — Portfolio

Single-page static portfolio. No build step, no framework, no dependencies —
open `index.html` in a browser or drag the folder onto a host.

## Structure

```
index.html          Markup + inline SVG art + pre-paint theme script (only)
css/styles.css      All styles. Tokens (:root) first, sections commented.
js/config.js        Data layer: every outbound URL in one place.
js/app.js           Behavior: configLinks, theme, menu, reveal, year.
DESIGN.md           Design-system reference (source of the visual language).
portfolio content.md  Raw content source (copy, projects, links).
tokens.json / variables.css / theme.css   Generated token exports (reference).
```

## Where to edit what

| Want to change…      | Edit…                                  |
|----------------------|----------------------------------------|
| Wording / copy       | `index.html` (plain text nodes)        |
| Any URL or email     | `js/config.js` only — markup binds via `data-config="key"` |
| Colors / theme       | `css/styles.css` → `:root` + `html[data-theme="dark"]` |
| Layout / components  | `css/styles.css` (section headers)     |
| Behavior             | `js/app.js` (one `init*` function per feature) |

## Conventions

- **CSS classes:** kebab-case; modifiers use `block--mod` (e.g. `btn--primary`).
- **JS DOM hooks:** `data-*` attributes only (`data-menu-toggle`, `data-config`,
  `data-reveal`). Element `id`s are reserved for anchors and ARIA references.
- **Config keys:** lowercase (`github`, `tinytinylm`).
- **State:** exactly one piece of persistent state — theme, in
  `localStorage["theme"]` (`"light"` / `"dark"`). Menu open state is transient
  (DOM class + `aria-expanded`). No global store is needed for a page this size.


## Deliberately not here

No API layer, `.env`, bundler, framework, or state library: the site is static,
has zero secrets, and has no runtime data sources. If a real API ever appears,
add `js/api.js` and an env file then — not before.
