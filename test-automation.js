#!/usr/bin/env node

/**
 * Test script to verify the automation setup
 * Run: node test-automation.js
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing WebPorfolio Automation Setup\n');

let errors = 0;
let warnings = 0;

// Test 1: Check if reports folder exists
console.log('📁 Checking reports folder...');
if (fs.existsSync('./reports')) {
  console.log('   ✅ reports/ folder exists');
} else {
  console.log('   ❌ reports/ folder not found');
  errors++;
}

// Test 2: Check for report files
console.log('\n📄 Checking for report files...');
if (fs.existsSync('./reports')) {
  const files = fs.readdirSync('./reports')
    .filter(file => file.endsWith('.json') && 
            file !== 'reports-index.json' && 
            file !== 'template.json');
  
  if (files.length > 0) {
    console.log(`   ✅ Found ${files.length} report file(s)`);
    files.forEach(file => console.log(`      - ${file}`));
  } else {
    console.log('   ⚠️  No report files found (only template)');
    warnings++;
  }
}

// Test 3: Check if reports-index.json exists
console.log('\n📊 Checking reports index...');
if (fs.existsSync('./reports/reports-index.json')) {
  console.log('   ✅ reports-index.json exists');
  
  // Validate index structure
  try {
    const indexContent = JSON.parse(fs.readFileSync('./reports/reports-index.json', 'utf8'));
    if (indexContent.reports && Array.isArray(indexContent.reports)) {
      console.log(`   ✅ Index contains ${indexContent.reports.length} report(s)`);
      if (indexContent.lastUpdated) {
        console.log(`   ℹ️  Last updated: ${indexContent.lastUpdated}`);
      }
    } else {
      console.log('   ❌ Index structure is invalid');
      errors++;
    }
  } catch (e) {
    console.log('   ❌ Index file is malformed JSON');
    errors++;
  }
} else {
  console.log('   ⚠️  reports-index.json not found (run generation script)');
  warnings++;
}

// Test 4: Check if generation scripts exist
console.log('\n🤖 Checking generation scripts...');
const scripts = [
  { file: 'generate-index.js', name: 'Node.js script' },
  { file: 'generate-index.ps1', name: 'PowerShell script' },
  { file: '.github/workflows/generate-index.yml', name: 'GitHub Actions workflow' }
];

scripts.forEach(script => {
  if (fs.existsSync(script.file)) {
    console.log(`   ✅ ${script.name} found`);
  } else {
    console.log(`   ❌ ${script.name} not found`);
    errors++;
  }
});

// Test 5: Validate all report JSON files
console.log('\n✅ Validating report JSON files...');
if (fs.existsSync('./reports')) {
  const reportFiles = fs.readdirSync('./reports')
    .filter(file => file.endsWith('.json') && 
            file !== 'reports-index.json');
  
  reportFiles.forEach(file => {
    try {
      const content = JSON.parse(fs.readFileSync(path.join('./reports', file), 'utf8'));
      
      // Check required fields
      const required = ['title', 'source', 'description', 'categories', 'date'];
      const missing = required.filter(field => !content[field]);
      
      if (missing.length > 0) {
        console.log(`   ⚠️  ${file}: Missing fields: ${missing.join(', ')}`);
        warnings++;
      } else {
        console.log(`   ✅ ${file}: Valid structure`);
      }
      
      // Check date format
      if (content.date && !/^\d{2}-\d{2}-\d{4}$/.test(content.date)) {
        console.log(`   ⚠️  ${file}: Date format should be dd-mm-yyyy`);
        warnings++;
      }
      
    } catch (e) {
      console.log(`   ❌ ${file}: Invalid JSON - ${e.message}`);
      errors++;
    }
  });
}

// Test 6: Check main application files
console.log('\n🌐 Checking main application files...');
const appFiles = [
  'index.html',
  'styles.css',
  'script.js',
  'translations.js'
];

appFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file} found`);
  } else {
    console.log(`   ❌ ${file} not found`);
    errors++;
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('📋 Test Summary:');
console.log('='.repeat(50));

if (errors === 0 && warnings === 0) {
  console.log('🎉 All tests passed! Your setup is ready.');
  console.log('\n✨ Next steps:');
  console.log('   1. Open index.html in a browser to test locally');
  console.log('   2. Run "npm run generate-index" to update the index');
  console.log('   3. Deploy to GitHub Pages for automatic index generation');
  process.exit(0);
} else {
  if (errors > 0) {
    console.log(`❌ ${errors} error(s) found - please fix them`);
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} warning(s) - your setup might work but check them`);
  }
  console.log('\n📚 See README.md or QUICKSTART.md for help');
  process.exit(errors > 0 ? 1 : 0);
}
