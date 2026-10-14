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

// function to check if upgrade button should be enabled/disabled
function canUpgrade() {
  if (resourceCounter < 10) {
    upgradeButton.disabled = true;
  } else {
    upgradeButton.disabled = false;
  }
  if (resourceCounter < 100) {
    upgradeButton2.disabled = true;
  } else {
    upgradeButton2.disabled = false;
  }
  if (resourceCounter < 1000) {
    upgradeButton3.disabled = true;
  } else {
    upgradeButton3.disabled = false;
  }
}

let resourceCounter = 0;

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
upgradeButton.innerText = "+0.1/sec \n Cost: 10";
upgradeButton.disabled = true;
upgradeButton.addEventListener("click", () => {
  // cost 10 clicks to upgrade
  if (resourceCounter >= 10) {
    resourceCounter -= 10;
    counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
    // new timer started with each upgrade, adding 0.1 clicks per second
    setInterval(() => {
      resourceCounter += 0.1;
    }, 1000);
    canUpgrade();
  }
});

// upgrade button 2
const upgradeButton2 = document.createElement("button") as HTMLButtonElement;
upgradeButton2.innerText = "+0.5/sec \n Cost: 100 ";
upgradeButton2.disabled = true;
upgradeButton2.addEventListener("click", () => {
  // cost 100 clicks to upgrade
  if (resourceCounter >= 100) {
    resourceCounter -= 100;
    counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
    // new timer started with each upgrade, adding 0.5 clicks per second
    setInterval(() => {
      resourceCounter += 0.5;
    }, 1000);
    canUpgrade();
  }
});

// upgrade button 3
const upgradeButton3 = document.createElement("button") as HTMLButtonElement;
upgradeButton3.innerText = "+1/sec \n Cost: 1000 ";
upgradeButton3.disabled = true;
upgradeButton3.addEventListener("click", () => {
  // cost 1000 clicks to upgrade
  if (resourceCounter >= 1000) {
    resourceCounter -= 1000;
    counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
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
