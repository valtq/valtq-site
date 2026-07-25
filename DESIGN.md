---
name: ValtQ Engineering System
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf4'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dde9ff'
  surface-container-highest: '#d5e3fd'
  on-surface: '#0d1c2f'
  on-surface-variant: '#444656'
  inverse-surface: '#233144'
  inverse-on-surface: '#ebf1ff'
  outline: '#747688'
  outline-variant: '#c4c5d9'
  surface-tint: '#1e45f8'
  primary: '#0032de'
  on-primary: '#ffffff'
  primary-container: '#2b4eff'
  on-primary-container: '#e1e2ff'
  inverse-primary: '#bbc3ff'
  secondary: '#4e5f7a'
  on-secondary: '#ffffff'
  secondary-container: '#ccdefe'
  on-secondary-container: '#51627d'
  tertiary: '#005661'
  on-tertiary: '#ffffff'
  tertiary-container: '#00707e'
  on-tertiary-container: '#a2f0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#bbc3ff'
  on-primary-fixed: '#000f5d'
  on-primary-fixed-variant: '#002dcc'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#b6c7e7'
  on-secondary-fixed: '#091c34'
  on-secondary-fixed-variant: '#364762'
  tertiary-fixed: '#9defff'
  tertiary-fixed-dim: '#00daf4'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004f59'
  background: '#f8f9ff'
  on-background: '#0d1c2f'
  surface-variant: '#d5e3fd'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-md:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Geist
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is built on a foundation of **Restraint and Precision**, reflecting the technical excellence of a premium software development agency. The aesthetic is "Engineered"—prioritizing functional clarity and structural integrity over decorative elements. It draws from **Minimalism** for its whitespace and **Corporate Modern** for its reliability.

Visual interest is generated through "Schematic Graphics"—thin 1px intersecting lines and blueprint-inspired patterns that suggest architecture and logic. The emotional response is one of absolute trust, high-speed performance, and technical sophistication.

**Design Style:** Corporate / Modern with a focus on structural precision.
**Tone:** Authoritative, Professional, Precise, and Minimal.

## Colors

The palette is strictly controlled to maintain a premium feel. 
- **Ink Navy (#0B1E36):** Used for primary text, structural headers, and deep dark-mode surfaces. It provides the visual "weight" and foundation.
- **Cobalt Blue (#2B4EFF):** The core action color. Reserved for primary buttons, links, and active states.
- **Cyan (#22E5FF):** A functional accent used exclusively for high-precision feedback: completion icons, success states, and key data points.
- **Slate (#334155):** Used for body text and descriptive labels to ensure optimal readability against the light background without the harshness of pure black.
- **Backgrounds:** Off-white (#F6F8FB) serves as the canvas, while pure White (#FFFFFF) is reserved for elevation-based containers (cards, modals).

## Typography

This design system uses a weight-mapped dual-font strategy for bilingual excellence.
- **Latin:** **Geist** is used for headlines to provide a clean, technical, and developer-centric feel. **Inter** is used for body and interface text for its high legibility and neutrality.
- **Arabic:** **IBM Plex Sans Arabic** is mandated for its engineering-grade structure, mirroring the weight and optical density of Geist/Inter to maintain visual balance in RTL layouts.
- **Hierarchy:** Headings are always Ink Navy (#0B1E36). Body text is Slate (#334155). 
- **Bilingual Rule:** When English and Arabic appear together, font-sizes are kept identical, as IBM Plex Sans Arabic is specifically designed to sit harmoniously with Latin sans-serifs.

## Layout & Spacing

The layout follows a strict **8px base unit** to ensure mathematical precision across all components.
- **Grid:** A 12-column fluid grid system with a maximum width of 1280px. 
- **Gutters:** Fixed 24px gutters between columns.
- **Margins:** 24px side margins for desktop/tablet; reduced to 16px for mobile.
- **Bilingual (RTL):** The layout undergoes a full horizontal mirror for Arabic. Sidebars move to the right, and the 12-column grid flows right-to-left. All directional icons (arrows, chevrons) are flipped unless they signify universal playback/progress.

## Elevation & Depth

To maintain the "Engineered" aesthetic, the design system utilizes **Low-contrast outlines** and **Tonal layers** instead of traditional drop shadows.
- **Surfaces:** Use #FFFFFF (White) for cards against a #F6F8FB background to create depth through color contrast rather than shadow.
- **Borders:** All containers use a 1px hairline border (#E2E8F0).
- **Interactive State:** Hovering over an element does not significantly lift it. Instead, the hairline border shifts from #E2E8F0 to #2B4EFF (Cobalt Blue), and a very subtle, tight 4px blur shadow may be applied using the same Cobalt Blue at 10% opacity.
- **Z-Index:** Modals and dropdowns use a sharp 1px border with a slightly deeper tonal background to differentiate from the primary canvas.

## Shapes

The shape language is controlled to be friendly but professional.
- **Standard (8px):** Applied to buttons, inputs, and small UI widgets.
- **Cards (12px):** Applied to primary content containers and cards to give them a distinct presence.
- **Precision (0px):** Schematic lines and separators must have sharp caps and no rounding to emphasize the "blueprints" visual style.

## Components

### Buttons
- **Primary:** Solid Cobalt Blue (#2B4EFF) with White text. 8px radius. 
- **Secondary:** White background with 1px hairline border (#E2E8F0). Text in Ink Navy.
- **Tertiary:** Ink Navy text, no border.
- **Interactive:** On hover, primary buttons darken by 10%. Secondary buttons gain a Cobalt Blue border.

### Input Fields
- White background, 1px border (#E2E8F0), 8px radius. 
- Label in Slate (#334155), Label-sm typography.
- Focus state: Border color changes to Cobalt Blue.

### Cards
- White background (#FFFFFF), 1px border (#E2E8F0), 12px radius. 
- Padding: 24px (md) or 40px (xl) depending on content density.

### Chips/Tags
- Small 4px radius or pill-shape. Light Slate background with Slate text for neutral info.
- Use Cyan (#22E5FF) background at 10% opacity with Cyan text for "Complete" or "Success" states.

### Lists & Tables
- Clean hairlines (#E2E8F0) between rows.
- Alternating row tints are prohibited; use whitespace and clear alignment to define hierarchy.