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
const growthRate = 1.15;

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
    clickValue += 1;
    upgradeClickCost = upgradeClickCost * growthRate;
    upgradeClickCost = parseFloat(upgradeClickCost.toFixed(2));
    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    upgradeClickValue.innerText = `+1 per click \n Cost: ${upgradeClickCost}`;
  }
});

// upgrade button
const upgradeButton = document.createElement("button") as HTMLButtonElement;
upgradeButton.innerText = `+0.5/sec \n Cost: ${firstUpgradeCost}`;
upgradeButton.disabled = true;
upgradeButton.addEventListener("click", () => {
  if (resourceCounter >= firstUpgradeCost) {
    resourceCounter -= firstUpgradeCost;
    firstUpgradeCost = firstUpgradeCost * growthRate;
    firstUpgradeCost = parseFloat(firstUpgradeCost.toFixed(2));
    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    upgradeButton.innerText = `+0.5/sec \n Cost: ${firstUpgradeCost}`;
    // new timer started with each upgrade, adding 0.5 clicks per second
    setInterval(() => {
      resourceCounter += 0.5;
    }, 1000);
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
    secondUpgradeCost = secondUpgradeCost * growthRate;
    secondUpgradeCost = parseFloat(secondUpgradeCost.toFixed(2));
    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    upgradeButton2.innerText = `+6/sec \n Cost: ${secondUpgradeCost}`;
    // new timer started with each upgrade, adding 6 clicks per second
    setInterval(() => {
      resourceCounter += 6;
    }, 1000);
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
    thirdUpgradeCost = thirdUpgradeCost * growthRate;
    thirdUpgradeCost = parseFloat(thirdUpgradeCost.toFixed(2));
    counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
    upgradeButton3.innerText = `+75/sec \n Cost: ${thirdUpgradeCost}`;
    // new timer started with each upgrade, adding 75 clicks per second
    setInterval(() => {
      resourceCounter += 75;
    }, 1000);
    canUpgrade();
  }
});

setInterval(() => {
  counterDisplay.textContent = `Meows: ${resourceCounter.toFixed(2)}`;
  canUpgrade();
}, 100);

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
