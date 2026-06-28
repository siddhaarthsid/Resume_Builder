const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

/**
 * Finds a local Chromium-based browser if Puppeteer's internal Chrome is missing.
 */
function getChromiumPath() {
  const paths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];
  
  // Also try appdata local for user-level chrome installs
  if (process.env.USERPROFILE) {
    paths.push(path.join(process.env.USERPROFILE, 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'));
  }

  for (const p of paths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }
  return null;
}

/**
 * Service to generate PDF from HTML content using headless Puppeteer.
 * @param {string} htmlContent - The HTML string representing the resume
 * @returns {Promise<Buffer>} - A promise that resolves to the PDF buffer
 */
async function generatePdf(htmlContent) {
  console.log('[PDF Service] Starting PDF generation...');
  let browser = null;
  
  try {
    const startTime = Date.now();
    
    const launchOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    };

    const edgeOrChromePath = getChromiumPath();
    if (edgeOrChromePath) {
      console.log(`[PDF Service] Using local Chromium executable: ${edgeOrChromePath}`);
      launchOptions.executablePath = edgeOrChromePath;
    } else {
      console.log('[PDF Service] No local browser path resolved. Relying on Puppeteer default cache.');
    }
    
    // Launch headless browser
    browser = await puppeteer.launch(launchOptions);
    
    const page = await browser.newPage();
    
    // Set page HTML content
    console.log('[PDF Service] Setting page HTML content...');
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF buffer
    console.log('[PDF Service] Emitting PDF buffer...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '15mm',
        bottom: '15mm',
        left: '15mm',
        right: '15mm'
      }
    });
    
    const duration = Date.now() - startTime;
    console.log(`[PDF Service] PDF generation completed successfully in ${duration}ms.`);
    
    return pdfBuffer;
  } catch (error) {
    console.error('[PDF Service] CRITICAL ERROR during PDF generation:', error);
    throw error;
  } finally {
    if (browser) {
      console.log('[PDF Service] Closing Puppeteer browser instance...');
      await browser.close();
    }
  }
}

module.exports = {
  generatePdf
};
