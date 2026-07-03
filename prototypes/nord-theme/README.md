# CBMP Nord shadcn Theme Prototype

Prototype only. Delete or absorb the chosen direction before implementation.

Question: does a more realistic shadcn-style React surface make the Nord direction feel credible for CBMP's dense operational UI when Polar Night is used for chrome and selected operational sections?

Run:

```sh
cd prototypes/nord-theme && npm install && npm run dev
```

Open:

```text
http://localhost:4175/
```

Prototype state:

- Throwaway Vite + React + Tailwind prototype.
- shadcn-style component source lives under `src/components/ui`.
- Variants are switchable with `?variant=A`, `?variant=B`, `?variant=C`, the floating prototype switcher, or left/right arrow keys.
- Light product base with a frosted transparent Polar Night nav bar, rounded panels, and dark operational sections.
- Radius is intentionally larger than the prior pass to test the user's attached rounded shadcn reference.

Dark mode can be reintroduced later if the direction holds.

Source palette:

- https://www.nordtheme.com/docs/colors-and-palettes/
