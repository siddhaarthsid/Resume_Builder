const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '../templates');
const registry = {};

// Auto-discover template files
function initializeRegistry() {
  try {
    const files = fs.readdirSync(templatesDir);
    
    for (const file of files) {
      // Exclude base builder, index, and non-JS files
      if (file === 'builder.js' || file === 'index.js' || !file.endsWith('.js')) {
        continue;
      }
      
      const filePath = path.join(templatesDir, file);
      const template = require(filePath);
      
      if (template.metadata && typeof template.render === 'function') {
        const id = template.metadata.id || path.basename(file, '.js');
        registry[id] = template;
      }
    }
    console.log(`Auto-discovered templates: ${Object.keys(registry).join(', ')}`);
  } catch (error) {
    console.error('Error during template auto-discovery:', error);
  }
}

// Initialize registry immediately
initializeRegistry();

/**
 * Returns list of metadata for all templates
 */
function getTemplatesList() {
  return Object.values(registry).map(t => t.metadata);
}

/**
 * Returns template render function by template ID
 */
function getTemplate(id) {
  return registry[id];
}

module.exports = {
  getTemplatesList,
  getTemplate,
  // Expose registry for tests
  registry
};
