# Ordio — 60-second vertical promo

A production-ready Remotion composition for Ordio, a POS and inventory
management platform for Moroccan auto-parts stores.

- Composition ID: `OrdioPromo`
- Format: 1080 × 1920 (9:16)
- Frame rate: 30 FPS
- Duration: 1800 frames / 60 seconds
- UI artwork: React and CSS only
- Narration: `public/voiceover.mp3`

## Commands

## Setup

```bash
npm install
```

Place the final 60-second narration at `public/voiceover.mp3`, then open the
Remotion Studio:

```bash
npm run dev
```

## Validate and render

```bash
npm run lint
npx remotion render OrdioPromo out/ordio-promo.mp4
```

The animation timeline is split into five scene components in `src/scenes.tsx`.
Brand colors and Arabic font fallbacks are centralized in `src/theme.ts`.

For best Arabic rendering, install **Noto Sans Arabic** or **Noto Kufi Arabic**
on the render machine. Tahoma and Arial are included as system fallbacks.
