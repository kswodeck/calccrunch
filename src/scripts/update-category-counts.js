import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Update paths - now going UP from src/scripts to src/data
const calculatorsPath = join(__dirname, '../data/calculators.json');
const categoriesPath = join(__dirname, '../data/categories.json');

const calculatorsData = JSON.parse(readFileSync(calculatorsPath, 'utf-8'));
const categoriesData = JSON.parse(readFileSync(categoriesPath, 'utf-8'));

// Count calculators per category
const categoryCounts = {};
calculatorsData.calculators.forEach(calc => {
  if (!categoryCounts[calc.category]) {
    categoryCounts[calc.category] = 0;
  }
  categoryCounts[calc.category]++;
});

// Update categories with actual counts
categoriesData.categories.forEach(cat => {
  cat.calculatorCount = categoryCounts[cat.id] || 0;
});

// Write updated categories back to file
writeFileSync(categoriesPath, JSON.stringify(categoriesData, null, 2));

console.log('✅ Category counts updated successfully!');
console.log('\nCategory Calculator Counts:');
categoriesData.categories.forEach(cat => {
  console.log(`  ${cat.name}: ${cat.calculatorCount} calculators`);
});