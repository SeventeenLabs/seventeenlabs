# SeventeenLabs design system

## Direction
BFL-inspired cinematic company website. A filmmaker exploring new creative tools on a laptop should feel like they are looking into an expansive world framed by quiet software design. Use a dark forest-charcoal canvas, pale lavender actions, and large warm-white Manrope typography. Brand words: cinematic, tactile, curious.

## Typography
Use the existing Manrope variable family for a consistent company voice. Headlines use weight 450 and tight tracking (-0.055em to -0.065em). Desktop display 80–102px; mobile 44–64px. Section headings 34–64px. Body 14–17px with generous 1.8 line height and limited line length. Small uppercase labels identify sections; monospace is unnecessary.

## Color
Tokens are scoped to `.sl-site`, `.sl-header`, and `.sl-footer` in `src/app/company.css`.
- Canvas: oklch(.145 .007 130)
- Surface: oklch(.2 .008 130)
- Ink: oklch(.965 .006 90)
- Secondary ink: oklch(.7 .008 100)
- Hairline: oklch(.33 .008 130)
- Lavender: oklch(.87 .065 295)
The UI is restrained; color comes from film imagery. A lavender closing section is the deliberate exception.

## Layout
1536px maximum container, fluid 24–80px gutters. Full-bleed image hero. Split company statements, an interactive timeline concept, numbered principles, a manual image gallery, a company introduction, and a lavender call to action. Avoid repetitive feature cards. Keep corner radii at 3–7px.

## Components and interaction
The custom 17 mark and lowercase wordmark form the identity. Header is transparent over the homepage image and solid on inner pages or after scrolling. Mobile menu supports Escape and returns focus to the toggle. Editor scene and timeline buttons update the monitor, timecode, and direction. Gallery controls advance manually. Native details elements handle product FAQs. Early-access form requires valid email and explicit opt-in, with success only after a successful server response.

## Assets
`public/images/company-hero.png` is the generated wide cinematic landscape, created with the built-in imagegen tool. Prompt: a lone traveler on rust-orange dunes, immense teal mountain valley, hazy apricot sun, dark left-side negative space for white type, tactile photographic film atmosphere, no text or logos. Existing landscape assets support the concept gallery. These are visual explorations, not claimed product outputs.

## Responsive and accessibility
Breakpoints: 1100, 800, 540px. Hide editor inspector on tablet and secondary sidebars on mobile, preserving shot selection in the timeline. Collapse navigation into a button at 800px. Use minimum 44px interactive mobile targets, clear focus indicators, meaningful alt text, and reduced-motion overrides. No automatic gallery rotation.
