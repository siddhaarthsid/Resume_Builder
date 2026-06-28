/**
 * Resume Builder Base Shell template
 * Wraps individual resume templates inside a standard HTML5 shell
 * and applies print-specific stylesheets and Google Fonts.
 */
function buildHtmlShell({ title, style, content }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title || 'Resume'}</title>
  <!-- Modern clean typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    /* CSS Reset */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10.5pt;
      line-height: 1.45;
      color: #1a202c;
      background: #ffffff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1, h2, h3, h4 {
      font-family: 'Outfit', sans-serif;
      color: #0f172a;
      line-height: 1.2;
    }

    /* Print styles */
    @page {
      size: A4;
      margin: 15mm;
    }
    
    @media print {
      body {
        background: none;
        color: #000000;
      }
      .page-break {
        page-break-before: always;
      }
    }

    /* Common utility layouts */
    .section-title {
      font-size: 12pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 12px;
      margin-top: 18px;
    }

    .section-title:first-of-type {
      margin-top: 0;
    }

    /* Add template specific CSS here */
    ${style || ''}
  </style>
</head>
<body>
  ${content}
</body>
</html>
  `;
}

module.exports = buildHtmlShell;
