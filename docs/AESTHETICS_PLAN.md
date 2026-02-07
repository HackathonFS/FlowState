# Flow State — Aesthetics Plan

This document describes the app’s visual design: **user palette** (Pink Orchid, Lilac, Vintage Lavender, Dusty Grape) and **pixel-style** typography and graphics.

---

## 1. Color Palette (in use)

| Name | Hex | Usage |
|------|-----|--------|
| **Pink Orchid** | `#EFC6E8` | Text, highlights, light accents |
| **Pink Orchid 2** | `#E3A9C9` | Accent, active states |
| **Pink Orchid 3** | `#E5B5D2` | Buttons, active tab, soft highlight |
| **Lilac** | `#D19DC2` | Borders, secondary accent |
| **Vintage Lavender** | `#9265A3` | Elevated surfaces |
| **Vintage Lavender 2** | `#875A9A` | Cards, nav background |
| **Dusty Grape** | `#62488A` | Deep background, pixel shadows |

**Gradient (main):** `linear-gradient(135deg, #FF47DA 0%, #FF90FF 40%, #D088FF 70%, #B065FF 100%)`

---

## 2. Typography

- **Logo / “Flow State”:** Use the **logo image** in the header (pixel script). No need to replicate script in code; image preserves pixel + glow.
- **Headings:** Slightly rounded, friendly sans (e.g. Outfit, Nunito, or a geometric sans) so it doesn’t fight the logo.
- **Body / UI:** Same sans for readability; avoid sharp corners to keep the dreamy, soft feel.
- **Monospace (timer, points):** Keep for numbers; can tint to lavender or light pink so it fits the palette.

---

## 3. Effects & Atmosphere

| Element | Implementation |
|--------|----------------|
| **Neon glow** | `box-shadow: 0 0 20px var(--glow), 0 0 40px var(--glow-subtle)` on primary buttons, progress ring, active nav, points badge |
| **Background orbs** | Replace teal/gold orbs with **fuchsia** and **lavender** blurs; opacity ~0.3–0.4 |
| **Stars / sparkle** | Optional: small CSS or inline-SVG 4-point stars + dots as decorative elements (e.g. header, empty states, reward toasts) |
| **Heart** | Optional: small pixel-style heart (emoji or asset) near logo or as a “favorite” / reward accent |
| **Depth** | Slight darker outline or soft shadow behind cards/header so content “pops” off the deep purple |

---

## 4. Component-Level Changes

- **Header:** Deep purple bg; **use logo image** for “Flow State”; tagline in muted lavender; points badge with pink/lavender gradient border + soft glow.
- **Nav:** Same purple family; active tab = gradient text or gradient border + glow (pink → lavender).
- **Cards (Pomodoro, Checklist, Leaderboard, Character):** Purple-tinted bg, lavender border; optional very subtle inner glow on focus/hover.
- **Buttons (primary):** Gradient fill (fuchsia → lavender), white or dark text, glow on hover.
- **Pomodoro ring:** Gradient stroke (pink → purple), glow; time in light lavender or white.
- **Checklist:** Checkmark / done state in pink or gradient; task row hover with subtle lavender.
- **Leaderboard:** Gold/crown nameplate can stay warm or use a pink–purple variant; “you” row with gradient border + glow.
- **Character:** Preview area with gradient border; nametags/accessories use same gradient accents.

---

## 5. Decorative Accents (Optional)

- **Stars:** Small 4-point pixel-style stars (CSS or SVG) in header corners or next to “Study & Productivity”.
- **Shimmer dots:** Tiny `box-shadow` dots or 1–2px divs in corners for a subtle sparkle.
- **Heart:** Small heart under or next to logo (or in Character/rewards) to mirror logo.

---

## 6. Accessibility

- Keep contrast ratios for body text and buttons (WCAG AA); gradient text on dark purple may need a stronger tint or a thin stroke/glow so it stays readable.
- Ensure focus rings use the same pink/lavender glow so they’re visible and on-brand.

---

## 7. Implementation Order

1. **CSS variables** — Update `index.css` with new palette and gradients.
2. **Background & orbs** — Deep purple bg; fuchsia + lavender orbs.
3. **Header** — Logo image + tagline + points styling.
4. **Nav** — Active state gradient + glow.
5. **Cards & buttons** — Gradient primary buttons; card borders and glows.
6. **Pomodoro** — Ring gradient and glow.
7. **Checklist, Leaderboard, Character** — Accent and border updates.
8. **Optional** — Stars, heart, shimmer in header or empty states.

This plan keeps the logo as the single source of truth for the pixel/script look while the rest of the UI uses the same colors and glow for a cohesive, dreamy, retro-futuristic feel.
