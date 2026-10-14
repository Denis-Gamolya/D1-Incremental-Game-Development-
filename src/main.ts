// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tobyUrl from "./assets/toby.png?no-inline";

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

const heading = document.createElement("h1");
heading.textContent = "D1 project";

let resourceCounter = 0;
let upgradeClickCost = 25;
let firstUpgradeCost = 10;
let secondUpgradeCost = 100;
let thirdUpgradeCost = 1000;
let clickValue = 1;
let passiveProduction = 0;
let clickUpgradeLevel = 0;
let firstUpgradeLevel = 0;
let secondUpgradeLevel = 0;
let thirdUpgradeLevel = 0;
const growthRate = 1.15;

// scales cost based on current cost and upgrade level
function scaleCost(baseCost: number, level: number) {
  return parseFloat((baseCost * Math.pow(growthRate, level + 1)).toFixed(2));
}

// calculates the gain from click upgrades
function getClickUpgradeGain() {
  return 1 + clickUpgradeLevel * 0.75;
}

function getPassiveUpgradeGain(baseGain: number, level: number) {
  return baseGain * (1 + level * 0.9);
}

const counterDisplay = document.createElement("p");
counterDisplay.textContent = "Meows: 0";

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

clickButton.addEventListener("click", () => {
  resourceCounter += clickValue;
  counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
  canUpgrade();
});

// pulse effect on click
clickButton.addEventListener("pointerdown", () => {
  clickButton.style.transform = "scale(0.96)";
});

clickButton.addEventListener("pointerup", () => {
  clickButton.style.transform = "scale(1)";
});

// function to check if upgrade button should be enabled/disabled
function canUpgrade() {
  if (resourceCounter < upgradeClickCost) {
    upgradeClickValue.disabled = true;
  } else {
    upgradeClickValue.disabled = false;
  }
  if (resourceCounter < firstUpgradeCost) {
    upgradeButton.disabled = true;
  } else {
    upgradeButton.disabled = false;
  }
  if (resourceCounter < secondUpgradeCost) {
    upgradeButton2.disabled = true;
  } else {
    upgradeButton2.disabled = false;
  }
  if (resourceCounter < thirdUpgradeCost) {
    upgradeButton3.disabled = true;
  } else {
    upgradeButton3.disabled = false;
  }
}

// upgrade click value button
const upgradeClickValue = document.createElement("button") as HTMLButtonElement;
upgradeClickValue.innerText = `+1 per click \n Cost: ${upgradeClickCost}`;
upgradeClickValue.disabled = true;
upgradeClickValue.addEventListener("click", () => {
  if (resourceCounter >= upgradeClickCost) {
    resourceCounter -= upgradeClickCost;
    clickUpgradeLevel += 1;
    clickValue += getClickUpgradeGain();
    upgradeClickCost = scaleCost(25, clickUpgradeLevel - 1);
    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    const nextClickGain = getClickUpgradeGain().toFixed(2);
    upgradeClickValue.innerText =
      `+${nextClickGain} per click \n Cost: ${upgradeClickCost}`;
  }
});

// upgrade button
const upgradeButton = document.createElement("button") as HTMLButtonElement;
upgradeButton.innerText = `+0.5/sec \n Cost: ${firstUpgradeCost}`;
upgradeButton.disabled = true;
upgradeButton.addEventListener("click", () => {
  if (resourceCounter >= firstUpgradeCost) {
    resourceCounter -= firstUpgradeCost;
    firstUpgradeLevel += 1;
    passiveProduction += getPassiveUpgradeGain(0.5, firstUpgradeLevel);
    firstUpgradeCost = scaleCost(10, firstUpgradeLevel - 1);
    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    const nextFirstGain = getPassiveUpgradeGain(0.5, firstUpgradeLevel)
      .toFixed(2);
    upgradeButton.innerText =
      `+${nextFirstGain}/sec \n Cost: ${firstUpgradeCost}`;
    canUpgrade();
  }
});

// upgrade button 2
const upgradeButton2 = document.createElement("button") as HTMLButtonElement;
upgradeButton2.innerText = `+6/sec \n Cost: ${secondUpgradeCost}`;
upgradeButton2.disabled = true;
upgradeButton2.addEventListener("click", () => {
  if (resourceCounter >= secondUpgradeCost) {
    resourceCounter -= secondUpgradeCost;
    secondUpgradeLevel += 1;
    passiveProduction += getPassiveUpgradeGain(6, secondUpgradeLevel);
    secondUpgradeCost = scaleCost(100, secondUpgradeLevel - 1);
    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    const nextSecondGain = getPassiveUpgradeGain(6, secondUpgradeLevel)
      .toFixed(2);
    upgradeButton2.innerText =
      `+${nextSecondGain}/sec \n Cost: ${secondUpgradeCost}`;
    canUpgrade();
  }
});

// upgrade button 3
const upgradeButton3 = document.createElement("button") as HTMLButtonElement;
upgradeButton3.innerText = `+75/sec \n Cost: ${thirdUpgradeCost}`;
upgradeButton3.disabled = true;
upgradeButton3.addEventListener("click", () => {
  if (resourceCounter >= thirdUpgradeCost) {
    resourceCounter -= thirdUpgradeCost;
    thirdUpgradeLevel += 1;
    passiveProduction += getPassiveUpgradeGain(75, thirdUpgradeLevel);
    thirdUpgradeCost = scaleCost(1000, thirdUpgradeLevel - 1);
    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    const nextThirdGain = getPassiveUpgradeGain(75, thirdUpgradeLevel)
      .toFixed(2);
    upgradeButton3.innerText =
      `+${nextThirdGain}/sec \n Cost: ${thirdUpgradeCost}`;
    canUpgrade();
  }
});

setInterval(() => {
  resourceCounter += passiveProduction;
  counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
  canUpgrade();
}, 1000);

const message = document.createElement("p");
message.textContent = "Your project starts here.";

app.append(
  heading,
  message,
  counterDisplay,
  clickButton,
  upgradeClickValue,
  upgradeButton,
  upgradeButton2,
  upgradeButton3,
);
