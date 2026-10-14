# Kitty Clicker

A minimal TypeScript/Vite browser project with Deno checks and GitHub Pages deployment.

[Play Kitty Clicker](https://Denis-Gamolya.github.io/D1-Incremental-Game-Development-/)

## Run and build

Requires Deno. Run from the project folder

- deno task dev - start the game at htpp://localhost:3000
- deno task build - create production build in dist/
- deno task preview- preview production build
- deno task ci - check formating, lint, types, and build

## Content and shared behavior

Most of the code lives in src/main.ts
Image asset lives in src/asssets/

- upgrades contain each upgrades emoji, starting cost, and gain
- upgradeButtons creates buttons and handles purchases
- getUpgradeGain() calculates gain on next purchase
- canUpgrade() updates labels and disabled unaffordable upgrade buttons

## Meaninful Revision

Initially each upgrade had its own cost and variables, as well as button creation code and purchase logic. This was [refactored](https://github.com/Denis-Gamolya/D1-Incremental-Game-Development-/commit/6c165281db98ddbfe3d89b01b556f2a1e70b4195) to use a shared Upgrade interace and an array of upgrade date, with a one purchase handler for all buttons. This substantially reduced duplicate code and improved readability.

## Credits

Tooling adapted from the [CMPM 121 Fall 2026 S01 starter](https://github.com/ucsc-cmpm-121-f26/s01-starter/tree/8974888efb6537be82e8eb069db139ea885039da), which has no explicit repository license. No new license is assigned to that material. The D1 scaffold and original SVG were authored with OpenAI GPT-6 Astra assistance. Dependencies retain their respective licenses.

Toby (cat) Asset created with [GPT-6](https://chatgpt.com/share/6acfd447-9528-83e8-9258-807383a63c57)
