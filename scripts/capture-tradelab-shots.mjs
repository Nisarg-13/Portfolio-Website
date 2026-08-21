import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";

const outDir = "/Users/nisarg/Development/Portfolio-Website/public/images/tradelab-shots";
const url = "https://nisarg-trade-lab-frontend.vercel.app/";

async function shotElement(page, locator, name, pad = 4) {
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const box = await locator.boundingBox();
  if (!box) throw new Error(`Missing element: ${name}`);
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    clip: {
      x: Math.max(0, box.x - pad),
      y: Math.max(0, box.y - pad),
      width: box.width + pad * 2,
      height: box.height + pad * 2,
    },
  });
  console.log(`Saved ${name}.png (${Math.round(box.width)}x${Math.round(box.height)})`);
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1200 },
  deviceScaleFactor: 2,
});

await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1500);
await mkdir(outDir, { recursive: true });

const preview = page.locator('[aria-label="Product preview"]');
await preview.scrollIntoViewIfNeeded();

for (const tab of ["ai-coach", "dashboard", "analytics"]) {
  await preview.locator(`#preview-tab-${tab}`).click();
  await page.waitForTimeout(450);
  await shotElement(page, preview.locator(`#preview-panel-${tab}`), tab);
}

await page.locator("#ai-coach").scrollIntoViewIfNeeded();
await shotElement(page, page.locator("#ai-coach .border-ai\\/30").first(), "ai-coach-hero", 6);

await browser.close();
