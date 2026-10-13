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

const counterDisplay = document.createElement("p");
counterDisplay.textContent = "Clicks: 0";

// button
const button = document.createElement("button") as HTMLButtonElement;
button.innerText = "Click Me";
button.addEventListener("click", () => {
  resourceCounter++;
  counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
});

setInterval(() => {
  resourceCounter += 0.1;
  counterDisplay.textContent = `Clicks: ${resourceCounter.toFixed(2)}`;
}, 1000);

const message = document.createElement("p");
message.textContent = "Your project starts here.";

app.append(heading, image, message, counterDisplay, button);
