import puppeteer from 'puppeteer';
import { readFileSync, writeFileSync } from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to the exact size of the SVG
  await page.setViewport({ width: 320, height: 80, deviceScaleFactor: 4 }); // 4x for high-res PNG
  
  const svgContent = readFileSync('public/logo.svg', 'utf-8');
  
  // Set HTML content to just the SVG, removing any margins
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; overflow: hidden; background: transparent; }
          svg { display: block; }
        </style>
      </head>
      <body>
        ${svgContent}
      </body>
    </html>
  `);
  
  // Wait a bit for the Google Font to load
  await new Promise(r => setTimeout(r, 2000));
  
  // Take screenshot
  const element = await page.$('svg');
  await element.screenshot({ path: 'public/logo.png', omitBackground: true });
  
  await browser.close();
})();
