// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/tile.svg?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "D1 project";

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "A teal tile with a cream circle";
image.width = 96;
image.height = 96;

let resourceCounter = 0;
let firstUpgradeCost = 10;
let secondUpgradeCost = 100;
let thirdUpgradeCost = 1000;
const growthRate = 1.1;

// function to check if upgrade button should be enabled/disabled
function canUpgrade() {
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

const counterDisplay = document.createElement("p");
counterDisplay.textContent = "Clicks: 0";

// button
const button = document.createElement("button") as HTMLButtonElement;
button.innerText = "Click Me";
button.addEventListener("click", () => {
  resourceCounter++;
  counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
  canUpgrade();
});

// upgrade button
const upgradeButton = document.createElement("button") as HTMLButtonElement;
upgradeButton.innerText = `+0.1/sec \n Cost: ${firstUpgradeCost}`;
upgradeButton.disabled = true;
upgradeButton.addEventListener("click", () => {
  // cost 10 clicks to upgrade
  if (resourceCounter >= firstUpgradeCost) {
    resourceCounter -= firstUpgradeCost;
    firstUpgradeCost = firstUpgradeCost * growthRate;
    firstUpgradeCost = parseFloat(firstUpgradeCost.toFixed(2));
    counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
    upgradeButton.innerText = `+0.1/sec \n Cost: ${firstUpgradeCost}`;
    // new timer started with each upgrade, adding 0.1 clicks per second
    setInterval(() => {
      resourceCounter += 0.1;
    }, 1000);
    canUpgrade();
  }
});

// upgrade button 2
const upgradeButton2 = document.createElement("button") as HTMLButtonElement;
upgradeButton2.innerText = `+0.5/sec \n Cost: ${secondUpgradeCost}`;
upgradeButton2.disabled = true;
upgradeButton2.addEventListener("click", () => {
  // cost 100 clicks to upgrade
  if (resourceCounter >= secondUpgradeCost) {
    resourceCounter -= secondUpgradeCost;
    secondUpgradeCost = secondUpgradeCost * growthRate;
    secondUpgradeCost = parseFloat(secondUpgradeCost.toFixed(2));
    counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
    upgradeButton2.innerText = `+0.5/sec \n Cost: ${secondUpgradeCost}`;
    // new timer started with each upgrade, adding 0.5 clicks per second
    setInterval(() => {
      resourceCounter += 0.5;
    }, 1000);
    canUpgrade();
  }
});

// upgrade button 3
const upgradeButton3 = document.createElement("button") as HTMLButtonElement;
upgradeButton3.innerText = `+1/sec \n Cost: ${thirdUpgradeCost}`;
upgradeButton3.disabled = true;
upgradeButton3.addEventListener("click", () => {
  // cost 1000 clicks to upgrade
  if (resourceCounter >= thirdUpgradeCost) {
    resourceCounter -= thirdUpgradeCost;
    thirdUpgradeCost = thirdUpgradeCost * growthRate;
    thirdUpgradeCost = parseFloat(thirdUpgradeCost.toFixed(2));
    counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
    upgradeButton3.innerText = `+1/sec \n Cost: ${thirdUpgradeCost}`;
    // new timer started with each upgrade, adding 1 click per second
    setInterval(() => {
      resourceCounter += 1;
    }, 1000);
    canUpgrade();
  }
});

setInterval(() => {
  resourceCounter += 0.1;
  counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
  canUpgrade();
}, 1000);

const message = document.createElement("p");
message.textContent = "Your project starts here.";

app.append(
  heading,
  image,
  message,
  counterDisplay,
  button,
  upgradeButton,
  upgradeButton2,
  upgradeButton3,
);
