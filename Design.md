# Landio Aesthetic Design Specification

Inspired by the [Landio Framer Template](https://www.framer.com/marketplace/templates/landio/), this design system focuses on a premium, high-performance "AI Agency" aesthetic.

## Core Visual Identity

- **Mood**: High-tech, immersive, minimalist, premium SaaS.
- **Color Palette**:
  - **Background**: Deep Obsidian (`#0B0C10`) with pure black (`#000000`) for depth.
  - **Primary Accent**: Electric Indigo (`#7047EB`) or Aces Blue (`#0561FF`) with vibrant gradients.
  - **Surface**: Translucent glass (`rgba(255, 255, 255, 0.03)`) with subtle borders.
  - **Ink**: Pure white (`#FFFFFF`) for headers, muted gray (`rgba(255, 255, 255, 0.5)`) for secondary text.

## Typography (Precision Stack)

- **Display (Headings)**: "Space Grotesk" or "Inter" (Black/900 weight). Massive font sizes (24vw for hero, 64px+ for section titles) with tight letter spacing (`-0.05em`).
- **Body**: "Inter" (Light/300 weight) for readability.
- **Mono**: "JetBrains Mono" for technical labels.

## Layout & Components

- **The "Bento" Grid**: Content organized in rounded containers with subtle, glowing borders.
- **Hero Section**: Centered typography with a large background gradient orb (Aura).
- **Navigation**: Minimal, floating blurred bar.
- **Interactions**:
  - Elements float in with a "slam-in" or "fade-up" effect.
  - Subtle hover glows on cards.
  - Gradient borders that light up on interaction.

## UI Elements

- **Buttons**: Pill-shaped or large rectangles with rounded corners, high-contrast borders, and gradient fills on hover.
- **Dividers**: Extremely thin, low-opacity lines (`rgba(255, 255, 255, 0.05)`).
- **Shadows**: Deep, soft blurs rather than hard lines.

## Implementation Roadmap

1.  **Global Styles**: Update `index.css` with the Landio color matrix and gradients.
2.  **Navigation**: Refine the top bar into a floating glass-morphism element.
3.  **Hero**: Restructure the Honda hero to match the "Landio" massive centered display style.
4.  **Content Sectioning**: Move to a grid-based "Bento" layout for features.
