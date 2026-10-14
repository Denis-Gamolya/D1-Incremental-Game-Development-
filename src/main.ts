// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tobyUrl from "./assets/toby.png?no-inline";
import kitten from "./assets/kitten.wav";
import deepKitten from "./assets/deep-kitten.wav";

// formatting
const app = document.querySelector<HTMLElement>("#app")!;
app.style.display = "flex";
app.style.flexDirection = "column";
app.style.alignItems = "center";
app.style.justifyContent = "center";
app.style.gap = "0.75rem";
app.style.minHeight = "100vh";
app.style.padding = "2rem";
app.style.textAlign = "center";
app.style.fontFamily = "sans-serif";
app.style.background = "#f5f0ff";

// title
const heading = document.createElement("h1");
heading.textContent = "Kitty Clicker";

// shared interface for upgrades
interface Upgrade {
  kind: "click" | "passive";
  emoji: string;
  baseCost: number;
  cost: number;
  level: number;
  baseGain: number;
}

// resource counter and production values
let resourceCounter = 0;
let clickValue = 1;
let passiveProduction = 0;
const growthRate = 1.15;

// array of upgrades with their initial values
const upgrades: Upgrade[] = [
  {
    kind: "click",
    emoji: "👆",
    baseCost: 25,
    cost: 25,
    level: 0,
    baseGain: 1,
  },
  {
    kind: "passive",
    emoji: "🧶",
    baseCost: 10,
    cost: 10,
    level: 0,
    baseGain: 0.5,
  },
  {
    kind: "passive",
    emoji: "🪶",
    baseCost: 100,
    cost: 100,
    level: 0,
    baseGain: 6,
  },
  {
    kind: "passive",
    emoji: "🥛",
    baseCost: 1000,
    cost: 1000,
    level: 0,
    baseGain: 75,
  },
];

// calculates gain on next purchase based on upgrade level
function getUpgradeGain(upgrade: Upgrade): number {
  const levelMultiplier = upgrade.kind === "click" ? 0.75 : 0.9;
  return upgrade.baseGain * (1 + upgrade.level * levelMultiplier);
}

// initial display of resources
const counterDisplay = document.createElement("p");
counterDisplay.textContent = "Meows: 0";

// create main click button
const clickButton = document.createElement("button") as HTMLButtonElement;
clickButton.type = "button";
clickButton.style.border = "none";
clickButton.style.background = "transparent";
clickButton.style.padding = "0";
clickButton.style.cursor = "pointer";
clickButton.style.display = "flex";
clickButton.style.alignItems = "center";
clickButton.style.justifyContent = "center";
clickButton.style.transition = "transform 0.08s ease";

// create toby image and attach to click button
const tobyImage = document.createElement("img");
tobyImage.src = tobyUrl;
tobyImage.alt = "Toby character";
tobyImage.width = 220;
tobyImage.height = 220;
tobyImage.style.display = "block";
tobyImage.style.filter = "drop-shadow(0 12px 20px rgba(72, 50, 145, 0.25))";
clickButton.appendChild(tobyImage);

// handle clicks
clickButton.addEventListener("click", () => {
  resourceCounter += clickValue;
  counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
  playMeow();
  refreshUpgradeLabels();
});

// pulse effect on click
clickButton.addEventListener("pointerdown", () => {
  clickButton.style.transform = "scale(0.96)";
});

clickButton.addEventListener("pointerup", () => {
  clickButton.style.transform = "scale(1)";
});

// creates one button per upgrade, with its own purchase handler
const upgradeButtons = upgrades.map((upgrade) => {
  const button = document.createElement("button") as HTMLButtonElement;
  button.type = "button";

  button.addEventListener("click", () => {
    if (resourceCounter < upgrade.cost) {
      return;
    }

    const gain = getUpgradeGain(upgrade);
    resourceCounter -= upgrade.cost;

    if (upgrade.kind === "click") {
      clickValue += gain;
    } else {
      passiveProduction += gain;
    }

    // recalculate new cost from starting cost to avoid rounding errors
    upgrade.level += 1;
    upgrade.cost = Number(
      (upgrade.baseCost * growthRate ** upgrade.level).toFixed(2),
    );

    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    refreshUpgradeLabels();
  });

  return button;
});

// refreshes each upgrade label after resources change
function refreshUpgradeLabels(): void {
  upgrades.forEach((upgrade, index) => {
    const button = upgradeButtons[index];
    const gain = getUpgradeGain(upgrade).toFixed(2);
    const unit = upgrade.kind === "click" ? "per click" : "/sec";

    button.innerText =
      `${upgrade.emoji} +${gain} ${unit} \n Cost: ${upgrade.cost}`;
    button.disabled = resourceCounter < upgrade.cost;
  });
}

function playMeow() {
  const chance = Math.random() * 10;
  let meowSound: HTMLAudioElement = null as unknown as HTMLAudioElement;
  if (chance > 1) meowSound = new Audio(kitten);
  else meowSound = new Audio(deepKitten);
  meowSound.play();
}

setInterval(() => {
  resourceCounter += passiveProduction;
  counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
  refreshUpgradeLabels();
}, 1000);

refreshUpgradeLabels();
app.append(
  heading,
  counterDisplay,
  clickButton,
  ...upgradeButtons,
);
