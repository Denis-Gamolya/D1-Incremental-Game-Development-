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
upgradeButton.innerText = "+0.1/sec";
upgradeButton.disabled = true;
upgradeButton.addEventListener("click", () => {
  // Upgrade logic
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

setInterval(() => {
  resourceCounter += 0.1;
  counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
  canUpgrade();
}, 1000);

const message = document.createElement("p");
message.textContent = "Your project starts here.";

app.append(heading, image, message, counterDisplay, button, upgradeButton);
