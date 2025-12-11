// International Size Converter Calculator
(() => {
  // ============================================
  // SIZE DATA - Comprehensive conversion tables
  // ============================================
  
  const sizeData = {
    // Women's Clothing Tops/Shirts
    womensClothingTops: {
      label: "Women's Tops & Shirts",
      systems: ['US', 'UK', 'EU', 'AU', 'JP'],
      sizes: [
        { US: 'XXS (0)', UK: '4', EU: '32', AU: '4', JP: '3', bust: { min: 30, max: 31 }, waist: { min: 22, max: 23 } },
        { US: 'XS (2)', UK: '6', EU: '34', AU: '6', JP: '5', bust: { min: 31, max: 32 }, waist: { min: 23, max: 24 } },
        { US: 'S (4)', UK: '8', EU: '36', AU: '8', JP: '7', bust: { min: 32, max: 33 }, waist: { min: 24, max: 25 } },
        { US: 'S (6)', UK: '10', EU: '38', AU: '10', JP: '9', bust: { min: 33, max: 35 }, waist: { min: 25, max: 27 } },
        { US: 'M (8)', UK: '12', EU: '40', AU: '12', JP: '11', bust: { min: 35, max: 37 }, waist: { min: 27, max: 29 } },
        { US: 'M (10)', UK: '14', EU: '42', AU: '14', JP: '13', bust: { min: 37, max: 39 }, waist: { min: 29, max: 31 } },
        { US: 'L (12)', UK: '16', EU: '44', AU: '16', JP: '15', bust: { min: 39, max: 41 }, waist: { min: 31, max: 33 } },
        { US: 'L (14)', UK: '18', EU: '46', AU: '18', JP: '17', bust: { min: 41, max: 43 }, waist: { min: 33, max: 35 } },
        { US: 'XL (16)', UK: '20', EU: '48', AU: '20', JP: '19', bust: { min: 43, max: 45 }, waist: { min: 35, max: 37 } },
        { US: 'XL (18)', UK: '22', EU: '50', AU: '22', JP: '21', bust: { min: 45, max: 47 }, waist: { min: 37, max: 39 } },
        { US: 'XXL (20)', UK: '24', EU: '52', AU: '24', JP: '23', bust: { min: 47, max: 49 }, waist: { min: 39, max: 41 } }
      ],
      measurements: ['bust', 'waist']
    },
    
    // Women's Dresses
    womensDresses: {
      label: "Women's Dresses",
      systems: ['US', 'UK', 'EU', 'AU', 'IT'],
      sizes: [
        { US: '0', UK: '4', EU: '32', AU: '4', IT: '36', bust: { min: 30, max: 31 }, waist: { min: 22, max: 23 }, hip: { min: 32, max: 33 } },
        { US: '2', UK: '6', EU: '34', AU: '6', IT: '38', bust: { min: 31, max: 32 }, waist: { min: 23, max: 24 }, hip: { min: 33, max: 34 } },
        { US: '4', UK: '8', EU: '36', AU: '8', IT: '40', bust: { min: 32, max: 34 }, waist: { min: 24, max: 26 }, hip: { min: 34, max: 36 } },
        { US: '6', UK: '10', EU: '38', AU: '10', IT: '42', bust: { min: 34, max: 36 }, waist: { min: 26, max: 28 }, hip: { min: 36, max: 38 } },
        { US: '8', UK: '12', EU: '40', AU: '12', IT: '44', bust: { min: 36, max: 38 }, waist: { min: 28, max: 30 }, hip: { min: 38, max: 40 } },
        { US: '10', UK: '14', EU: '42', AU: '14', IT: '46', bust: { min: 38, max: 40 }, waist: { min: 30, max: 32 }, hip: { min: 40, max: 42 } },
        { US: '12', UK: '16', EU: '44', AU: '16', IT: '48', bust: { min: 40, max: 42 }, waist: { min: 32, max: 34 }, hip: { min: 42, max: 44 } },
        { US: '14', UK: '18', EU: '46', AU: '18', IT: '50', bust: { min: 42, max: 44 }, waist: { min: 34, max: 36 }, hip: { min: 44, max: 46 } },
        { US: '16', UK: '20', EU: '48', AU: '20', IT: '52', bust: { min: 44, max: 46 }, waist: { min: 36, max: 38 }, hip: { min: 46, max: 48 } },
        { US: '18', UK: '22', EU: '50', AU: '22', IT: '54', bust: { min: 46, max: 48 }, waist: { min: 38, max: 40 }, hip: { min: 48, max: 50 } }
      ],
      measurements: ['bust', 'waist', 'hip']
    },
    
    // Women's Pants/Jeans
    womensPants: {
      label: "Women's Pants & Jeans",
      systems: ['US', 'UK', 'EU', 'AU', 'JP'],
      sizes: [
        { US: '0 (24)', UK: '4', EU: '32', AU: '4', JP: '3', waist: { min: 23, max: 24 }, hip: { min: 33, max: 34 } },
        { US: '2 (25)', UK: '6', EU: '34', AU: '6', JP: '5', waist: { min: 24, max: 25 }, hip: { min: 34, max: 35 } },
        { US: '4 (26)', UK: '8', EU: '36', AU: '8', JP: '7', waist: { min: 25, max: 26 }, hip: { min: 35, max: 36 } },
        { US: '6 (27)', UK: '10', EU: '38', AU: '10', JP: '9', waist: { min: 26, max: 27 }, hip: { min: 36, max: 38 } },
        { US: '8 (28)', UK: '12', EU: '40', AU: '12', JP: '11', waist: { min: 27, max: 29 }, hip: { min: 38, max: 40 } },
        { US: '10 (29)', UK: '14', EU: '42', AU: '14', JP: '13', waist: { min: 29, max: 31 }, hip: { min: 40, max: 42 } },
        { US: '12 (30)', UK: '16', EU: '44', AU: '16', JP: '15', waist: { min: 31, max: 33 }, hip: { min: 42, max: 44 } },
        { US: '14 (31)', UK: '18', EU: '46', AU: '18', JP: '17', waist: { min: 33, max: 35 }, hip: { min: 44, max: 46 } },
        { US: '16 (32)', UK: '20', EU: '48', AU: '20', JP: '19', waist: { min: 35, max: 37 }, hip: { min: 46, max: 48 } },
        { US: '18 (33)', UK: '22', EU: '50', AU: '22', JP: '21', waist: { min: 37, max: 39 }, hip: { min: 48, max: 50 } }
      ],
      measurements: ['waist', 'hip']
    },
    
    // Men's Shirts
    mensShirts: {
      label: "Men's Shirts",
      systems: ['US', 'UK', 'EU', 'JP'],
      sizes: [
        { US: 'XS (14)', UK: '14', EU: '36', JP: 'S', chest: { min: 34, max: 36 }, neck: { min: 13.5, max: 14 } },
        { US: 'S (14.5-15)', UK: '14.5-15', EU: '37-38', JP: 'M', chest: { min: 36, max: 38 }, neck: { min: 14, max: 15 } },
        { US: 'M (15.5-16)', UK: '15.5-16', EU: '39-40', JP: 'L', chest: { min: 38, max: 41 }, neck: { min: 15, max: 16 } },
        { US: 'L (16.5-17)', UK: '16.5-17', EU: '41-42', JP: 'XL', chest: { min: 41, max: 44 }, neck: { min: 16, max: 17 } },
        { US: 'XL (17.5-18)', UK: '17.5-18', EU: '43-44', JP: 'XXL', chest: { min: 44, max: 47 }, neck: { min: 17, max: 18 } },
        { US: 'XXL (18.5-19)', UK: '18.5-19', EU: '45-46', JP: 'XXXL', chest: { min: 47, max: 50 }, neck: { min: 18, max: 19 } }
      ],
      measurements: ['chest', 'neck']
    },
    
    // Men's Pants/Jeans
    mensPants: {
      label: "Men's Pants & Jeans",
      systems: ['US/UK', 'EU', 'JP'],
      sizes: [
        { 'US/UK': '28', EU: '44', JP: 'XS', waist: { min: 28, max: 29 } },
        { 'US/UK': '29', EU: '44-46', JP: 'XS', waist: { min: 29, max: 30 } },
        { 'US/UK': '30', EU: '46', JP: 'S', waist: { min: 30, max: 31 } },
        { 'US/UK': '31', EU: '46-48', JP: 'S', waist: { min: 31, max: 32 } },
        { 'US/UK': '32', EU: '48', JP: 'M', waist: { min: 32, max: 33 } },
        { 'US/UK': '33', EU: '48-50', JP: 'M', waist: { min: 33, max: 34 } },
        { 'US/UK': '34', EU: '50', JP: 'L', waist: { min: 34, max: 35 } },
        { 'US/UK': '36', EU: '52', JP: 'L', waist: { min: 36, max: 37 } },
        { 'US/UK': '38', EU: '54', JP: 'XL', waist: { min: 38, max: 39 } },
        { 'US/UK': '40', EU: '56', JP: 'XL', waist: { min: 40, max: 41 } },
        { 'US/UK': '42', EU: '58', JP: 'XXL', waist: { min: 42, max: 43 } }
      ],
      measurements: ['waist']
    },
    
    // Men's Suits/Jackets
    mensSuits: {
      label: "Men's Suits & Jackets",
      systems: ['US/UK', 'EU', 'IT', 'JP'],
      sizes: [
        { 'US/UK': '34', EU: '44', IT: '44', JP: 'XS', chest: { min: 34, max: 35 } },
        { 'US/UK': '36', EU: '46', IT: '46', JP: 'S', chest: { min: 36, max: 37 } },
        { 'US/UK': '38', EU: '48', IT: '48', JP: 'M', chest: { min: 38, max: 39 } },
        { 'US/UK': '40', EU: '50', IT: '50', JP: 'L', chest: { min: 40, max: 41 } },
        { 'US/UK': '42', EU: '52', IT: '52', JP: 'XL', chest: { min: 42, max: 43 } },
        { 'US/UK': '44', EU: '54', IT: '54', JP: 'XXL', chest: { min: 44, max: 45 } },
        { 'US/UK': '46', EU: '56', IT: '56', JP: 'XXXL', chest: { min: 46, max: 47 } },
        { 'US/UK': '48', EU: '58', IT: '58', JP: '4XL', chest: { min: 48, max: 49 } },
        { 'US/UK': '50', EU: '60', IT: '60', JP: '5XL', chest: { min: 50, max: 51 } }
      ],
      measurements: ['chest']
    },
    
    // Women's Shoes
    womensShoes: {
      label: "Women's Shoes",
      systems: ['US', 'UK', 'EU', 'AU', 'JP', 'CN'],
      sizes: [
        { US: '5', UK: '2.5', EU: '35', AU: '3.5', JP: '21.5', CN: '35', footLength: { min: 21.6, max: 22.0 } },
        { US: '5.5', UK: '3', EU: '35.5', AU: '4', JP: '22', CN: '36', footLength: { min: 22.0, max: 22.4 } },
        { US: '6', UK: '3.5', EU: '36', AU: '4.5', JP: '22.5', CN: '36', footLength: { min: 22.4, max: 22.9 } },
        { US: '6.5', UK: '4', EU: '37', AU: '5', JP: '23', CN: '37', footLength: { min: 22.9, max: 23.3 } },
        { US: '7', UK: '4.5', EU: '37.5', AU: '5.5', JP: '23.5', CN: '37.5', footLength: { min: 23.3, max: 23.7 } },
        { US: '7.5', UK: '5', EU: '38', AU: '6', JP: '24', CN: '38', footLength: { min: 23.7, max: 24.1 } },
        { US: '8', UK: '5.5', EU: '38.5', AU: '6.5', JP: '24.5', CN: '39', footLength: { min: 24.1, max: 24.6 } },
        { US: '8.5', UK: '6', EU: '39', AU: '7', JP: '25', CN: '39', footLength: { min: 24.6, max: 25.0 } },
        { US: '9', UK: '6.5', EU: '40', AU: '7.5', JP: '25.5', CN: '40', footLength: { min: 25.0, max: 25.4 } },
        { US: '9.5', UK: '7', EU: '40.5', AU: '8', JP: '26', CN: '40.5', footLength: { min: 25.4, max: 25.8 } },
        { US: '10', UK: '7.5', EU: '41', AU: '8.5', JP: '26.5', CN: '41', footLength: { min: 25.8, max: 26.2 } },
        { US: '10.5', UK: '8', EU: '42', AU: '9', JP: '27', CN: '42', footLength: { min: 26.2, max: 26.7 } },
        { US: '11', UK: '8.5', EU: '42.5', AU: '9.5', JP: '27.5', CN: '42.5', footLength: { min: 26.7, max: 27.1 } }
      ],
      measurements: ['footLength']
    },
    
    // Men's Shoes
    mensShoes: {
      label: "Men's Shoes",
      systems: ['US', 'UK', 'EU', 'AU', 'JP', 'CN'],
      sizes: [
        { US: '6', UK: '5.5', EU: '39', AU: '5.5', JP: '24', CN: '39', footLength: { min: 23.8, max: 24.2 } },
        { US: '6.5', UK: '6', EU: '39.5', AU: '6', JP: '24.5', CN: '39.5', footLength: { min: 24.2, max: 24.6 } },
        { US: '7', UK: '6.5', EU: '40', AU: '6.5', JP: '25', CN: '40', footLength: { min: 24.6, max: 25.0 } },
        { US: '7.5', UK: '7', EU: '40.5', AU: '7', JP: '25.5', CN: '40.5', footLength: { min: 25.0, max: 25.4 } },
        { US: '8', UK: '7.5', EU: '41', AU: '7.5', JP: '26', CN: '41', footLength: { min: 25.4, max: 25.8 } },
        { US: '8.5', UK: '8', EU: '42', AU: '8', JP: '26.5', CN: '42', footLength: { min: 25.8, max: 26.2 } },
        { US: '9', UK: '8.5', EU: '42.5', AU: '8.5', JP: '27', CN: '42.5', footLength: { min: 26.2, max: 26.7 } },
        { US: '9.5', UK: '9', EU: '43', AU: '9', JP: '27.5', CN: '43', footLength: { min: 26.7, max: 27.1 } },
        { US: '10', UK: '9.5', EU: '44', AU: '9.5', JP: '28', CN: '44', footLength: { min: 27.1, max: 27.5 } },
        { US: '10.5', UK: '10', EU: '44.5', AU: '10', JP: '28.5', CN: '44.5', footLength: { min: 27.5, max: 27.9 } },
        { US: '11', UK: '10.5', EU: '45', AU: '10.5', JP: '29', CN: '45', footLength: { min: 27.9, max: 28.3 } },
        { US: '11.5', UK: '11', EU: '45.5', AU: '11', JP: '29.5', CN: '45.5', footLength: { min: 28.3, max: 28.8 } },
        { US: '12', UK: '11.5', EU: '46', AU: '11.5', JP: '30', CN: '46', footLength: { min: 28.8, max: 29.2 } },
        { US: '13', UK: '12.5', EU: '47', AU: '12.5', JP: '31', CN: '47', footLength: { min: 29.6, max: 30.0 } }
      ],
      measurements: ['footLength']
    },
    
    // Kids' Clothing
    kidsClothing: {
      label: "Kids' Clothing",
      systems: ['US', 'UK', 'EU', 'Age'],
      sizes: [
        { US: '2T', UK: '2-3', EU: '92', Age: '2 years', height: { min: 33, max: 36 }, weight: { min: 26, max: 30 } },
        { US: '3T', UK: '3-4', EU: '98', Age: '3 years', height: { min: 36, max: 39 }, weight: { min: 30, max: 34 } },
        { US: '4T', UK: '4-5', EU: '104', Age: '4 years', height: { min: 39, max: 42 }, weight: { min: 34, max: 38 } },
        { US: '5', UK: '5-6', EU: '110', Age: '5 years', height: { min: 42, max: 45 }, weight: { min: 38, max: 45 } },
        { US: '6', UK: '6-7', EU: '116', Age: '6 years', height: { min: 45, max: 48 }, weight: { min: 45, max: 50 } },
        { US: '7', UK: '7-8', EU: '122', Age: '7 years', height: { min: 48, max: 50 }, weight: { min: 50, max: 56 } },
        { US: '8', UK: '8-9', EU: '128', Age: '8 years', height: { min: 50, max: 52 }, weight: { min: 56, max: 63 } },
        { US: '10', UK: '9-10', EU: '140', Age: '10 years', height: { min: 52, max: 56 }, weight: { min: 63, max: 72 } },
        { US: '12', UK: '11-12', EU: '152', Age: '12 years', height: { min: 56, max: 60 }, weight: { min: 72, max: 90 } },
        { US: '14', UK: '13-14', EU: '164', Age: '14 years', height: { min: 60, max: 64 }, weight: { min: 90, max: 110 } }
      ],
      measurements: ['height', 'weight']
    },
    
    // Kids' Shoes
    kidsShoes: {
      label: "Kids' Shoes",
      systems: ['US', 'UK', 'EU', 'JP'],
      sizes: [
        { US: '8C', UK: '7', EU: '24', JP: '14', footLength: { min: 14.0, max: 14.5 } },
        { US: '9C', UK: '8', EU: '25', JP: '15', footLength: { min: 15.0, max: 15.5 } },
        { US: '10C', UK: '9', EU: '27', JP: '16', footLength: { min: 16.0, max: 16.5 } },
        { US: '11C', UK: '10', EU: '28', JP: '17', footLength: { min: 17.0, max: 17.5 } },
        { US: '12C', UK: '11', EU: '30', JP: '18', footLength: { min: 18.0, max: 18.5 } },
        { US: '13C', UK: '12', EU: '31', JP: '19', footLength: { min: 19.0, max: 19.5 } },
        { US: '1Y', UK: '13', EU: '32', JP: '20', footLength: { min: 20.0, max: 20.5 } },
        { US: '2Y', UK: '1', EU: '33', JP: '21', footLength: { min: 21.0, max: 21.5 } },
        { US: '3Y', UK: '2', EU: '34', JP: '22', footLength: { min: 22.0, max: 22.5 } },
        { US: '4Y', UK: '3', EU: '35', JP: '23', footLength: { min: 23.0, max: 23.5 } },
        { US: '5Y', UK: '4', EU: '36', JP: '24', footLength: { min: 24.0, max: 24.5 } }
      ],
      measurements: ['footLength']
    },
    
    // Ring Sizes
    rings: {
      label: "Ring Sizes",
      systems: ['US', 'UK', 'EU', 'JP'],
      sizes: [
        { US: '4', UK: 'H', EU: '46.5', JP: '7', circumference: 46.5, diameter: 14.8 },
        { US: '4.5', UK: 'I', EU: '47.8', JP: '8', circumference: 47.8, diameter: 15.2 },
        { US: '5', UK: 'J', EU: '49.0', JP: '9', circumference: 49.0, diameter: 15.6 },
        { US: '5.5', UK: 'K', EU: '50.3', JP: '10', circumference: 50.3, diameter: 16.0 },
        { US: '6', UK: 'L', EU: '51.5', JP: '11', circumference: 51.5, diameter: 16.4 },
        { US: '6.5', UK: 'M', EU: '52.8', JP: '13', circumference: 52.8, diameter: 16.8 },
        { US: '7', UK: 'N', EU: '54.0', JP: '14', circumference: 54.0, diameter: 17.2 },
        { US: '7.5', UK: 'O', EU: '55.3', JP: '15', circumference: 55.3, diameter: 17.6 },
        { US: '8', UK: 'P', EU: '56.5', JP: '16', circumference: 56.5, diameter: 18.0 },
        { US: '8.5', UK: 'Q', EU: '57.8', JP: '17', circumference: 57.8, diameter: 18.4 },
        { US: '9', UK: 'R', EU: '59.0', JP: '18', circumference: 59.0, diameter: 18.8 },
        { US: '9.5', UK: 'S', EU: '60.3', JP: '19', circumference: 60.3, diameter: 19.2 },
        { US: '10', UK: 'T', EU: '61.5', JP: '20', circumference: 61.5, diameter: 19.6 },
        { US: '10.5', UK: 'U', EU: '62.8', JP: '22', circumference: 62.8, diameter: 20.0 },
        { US: '11', UK: 'V', EU: '64.0', JP: '23', circumference: 64.0, diameter: 20.4 },
        { US: '11.5', UK: 'W', EU: '65.3', JP: '24', circumference: 65.3, diameter: 20.8 },
        { US: '12', UK: 'X', EU: '66.5', JP: '25', circumference: 66.5, diameter: 21.2 }
      ],
      measurements: ['circumference', 'diameter']
    },
    
    // Bra Sizes
    bras: {
      label: "Bra Sizes",
      systems: ['US', 'UK', 'EU', 'AU', 'FR'],
      bandSizes: [
        { US: '30', UK: '30', EU: '65', AU: '8', FR: '80', band: { min: 25, max: 27 } },
        { US: '32', UK: '32', EU: '70', AU: '10', FR: '85', band: { min: 27, max: 29 } },
        { US: '34', UK: '34', EU: '75', AU: '12', FR: '90', band: { min: 29, max: 31 } },
        { US: '36', UK: '36', EU: '80', AU: '14', FR: '95', band: { min: 31, max: 33 } },
        { US: '38', UK: '38', EU: '85', AU: '16', FR: '100', band: { min: 33, max: 35 } },
        { US: '40', UK: '40', EU: '90', AU: '18', FR: '105', band: { min: 35, max: 37 } },
        { US: '42', UK: '42', EU: '95', AU: '20', FR: '110', band: { min: 37, max: 39 } },
        { US: '44', UK: '44', EU: '100', AU: '22', FR: '115', band: { min: 39, max: 41 } }
      ],
      cupSizes: [
        { diff: 1, US: 'A', UK: 'A', EU: 'A', AU: 'A', FR: 'A' },
        { diff: 2, US: 'B', UK: 'B', EU: 'B', AU: 'B', FR: 'B' },
        { diff: 3, US: 'C', UK: 'C', EU: 'C', AU: 'C', FR: 'C' },
        { diff: 4, US: 'D', UK: 'D', EU: 'D', AU: 'D', FR: 'D' },
        { diff: 5, US: 'DD/E', UK: 'DD', EU: 'E', AU: 'DD', FR: 'E' },
        { diff: 6, US: 'DDD/F', UK: 'E', EU: 'F', AU: 'E', FR: 'F' },
        { diff: 7, US: 'G', UK: 'F', EU: 'G', AU: 'F', FR: 'G' },
        { diff: 8, US: 'H', UK: 'FF', EU: 'H', AU: 'FF', FR: 'H' },
        { diff: 9, US: 'I', UK: 'G', EU: 'I', AU: 'G', FR: 'I' },
        { diff: 10, US: 'J', UK: 'GG', EU: 'J', AU: 'GG', FR: 'J' }
      ],
      measurements: ['band', 'bust']
    }
  };

  // Measurement labels and units
  const measurementInfo = {
    bust: { label: 'Bust', unit: 'in', description: 'Measure around the fullest part of your bust' },
    waist: { label: 'Waist', unit: 'in', description: 'Measure around your natural waistline' },
    hip: { label: 'Hips', unit: 'in', description: 'Measure around the fullest part of your hips' },
    chest: { label: 'Chest', unit: 'in', description: 'Measure around the fullest part of your chest' },
    neck: { label: 'Neck', unit: 'in', description: 'Measure around the base of your neck' },
    footLength: { label: 'Foot Length', unit: 'cm', description: 'Measure from heel to longest toe' },
    height: { label: 'Height', unit: 'in', description: 'Child\'s height in inches' },
    weight: { label: 'Weight', unit: 'lbs', description: 'Child\'s weight in pounds' },
    circumference: { label: 'Circumference', unit: 'mm', description: 'Wrap string around finger, measure in mm' },
    diameter: { label: 'Inner Diameter', unit: 'mm', description: 'Measure across inside of ring' },
    band: { label: 'Band (Underbust)', unit: 'in', description: 'Measure snugly around ribcage, under bust' }
  };

  // ============================================
  // STATE MANAGEMENT
  // ============================================
  
  let state = {
    mode: 'convert', // 'convert' or 'measure'
    category: 'womensClothingTops',
    sourceSystem: 'US',
    sourceSize: '',
    // Measurements (in appropriate units)
    bust: '',
    waist: '',
    hip: '',
    chest: '',
    neck: '',
    footLength: '',
    height: '',
    weight: '',
    circumference: '',
    diameter: '',
    band: ''
  };

  // ============================================
  // INITIALIZATION
  // ============================================
  
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    loadStateFromURL();
    setupEventListeners();
    updateCategoryOptions();
    updateSourceSystemOptions();
    updateSourceSizeOptions();
    updateMeasurementInputs();
    updateVisibility();
    
    if (hasValidInput()) {
      calculateResults();
    }
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================
  
  function setupEventListeners() {
    // Mode toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.mode = e.target.dataset.mode;
        updateVisibility();
        saveStateToURL();
        if (hasValidInput()) calculateResults();
      });
    });

    // Category selection
    const categorySelect = document.getElementById('category');
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        state.category = e.target.value;
        state.sourceSize = '';
        state.sourceSystem = sizeData[state.category]?.systems[0] || 'US';
        updateSourceSystemOptions();
        updateSourceSizeOptions();
        updateMeasurementInputs();
        clearResults();
        saveStateToURL();
      });
    }

    // Source system selection
    const sourceSystemSelect = document.getElementById('source-system');
    if (sourceSystemSelect) {
      sourceSystemSelect.addEventListener('change', (e) => {
        state.sourceSystem = e.target.value;
        state.sourceSize = '';
        updateSourceSizeOptions();
        clearResults();
        saveStateToURL();
      });
    }

    // Source size selection
    const sourceSizeSelect = document.getElementById('source-size');
    if (sourceSizeSelect) {
      sourceSizeSelect.addEventListener('change', (e) => {
        state.sourceSize = e.target.value;
        saveStateToURL();
        if (state.sourceSize) calculateResults();
      });
    }

    // Measurement inputs
    const measurementInputs = document.querySelectorAll('.measurement-input');
    measurementInputs.forEach(input => {
      input.addEventListener('input', debounce((e) => {
        const field = e.target.dataset.field;
        state[field] = parseFloat(e.target.value) || '';
        saveStateToURL();
        if (hasValidMeasurements()) calculateResults();
      }, 300));
    });

    // Calculate button
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
      calculateBtn.addEventListener('click', () => {
        if (hasValidInput()) {
          calculateResults();
          document.querySelector('.calculator-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }

    // Share button
    const shareBtn = document.getElementById('share-calculation');
    if (shareBtn) {
      shareBtn.addEventListener('click', shareCalculation);
    }

    // Clear button
    const clearBtn = document.getElementById('clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', clearAll);
    }
  }

  // ============================================
  // UI UPDATE FUNCTIONS
  // ============================================
  
  function updateVisibility() {
    const convertSection = document.getElementById('convert-section');
    const measureSection = document.getElementById('measure-section');
    
    if (convertSection && measureSection) {
      convertSection.classList.toggle('hidden', state.mode !== 'convert');
      measureSection.classList.toggle('hidden', state.mode !== 'measure');
    }

    // Update mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === state.mode);
    });

    // Show/hide bra-specific section
    const braSection = document.getElementById('bra-measure-section');
    if (braSection) {
      braSection.classList.toggle('hidden', state.category !== 'bras');
    }

    // Update measurement guide
    updateMeasurementGuide();
  }

  function updateCategoryOptions() {
    const categorySelect = document.getElementById('category');
    if (!categorySelect) return;

    const categories = [
      { group: "Women's Clothing", items: ['womensClothingTops', 'womensDresses', 'womensPants'] },
      { group: "Men's Clothing", items: ['mensShirts', 'mensPants', 'mensSuits'] },
      { group: "Women's Shoes", items: ['womensShoes'] },
      { group: "Men's Shoes", items: ['mensShoes'] },
      { group: "Kids", items: ['kidsClothing', 'kidsShoes'] },
      { group: "Accessories", items: ['rings', 'bras'] }
    ];

    categorySelect.innerHTML = categories.map(group => `
      <optgroup label="${group.group}">
        ${group.items.map(key => `
          <option value="${key}" ${state.category === key ? 'selected' : ''}>
            ${sizeData[key].label}
          </option>
        `).join('')}
      </optgroup>
    `).join('');
  }

  function updateSourceSystemOptions() {
    const sourceSystemSelect = document.getElementById('source-system');
    if (!sourceSystemSelect) return;

    const categoryData = sizeData[state.category];
    if (!categoryData) return;

    sourceSystemSelect.innerHTML = categoryData.systems.map(system => `
      <option value="${system}" ${state.sourceSystem === system ? 'selected' : ''}>
        ${system}
      </option>
    `).join('');
  }

  function updateSourceSizeOptions() {
    const sourceSizeSelect = document.getElementById('source-size');
    if (!sourceSizeSelect) return;

    const categoryData = sizeData[state.category];
    if (!categoryData) return;

    // Special handling for bras
    if (state.category === 'bras') {
      const bandSizes = categoryData.bandSizes.map(b => b[state.sourceSystem]);
      const cupSizes = categoryData.cupSizes.map(c => c[state.sourceSystem]);
      
      let options = '<option value="">Select Size</option>';
      bandSizes.forEach(band => {
        cupSizes.forEach(cup => {
          const size = `${band}${cup}`;
          options += `<option value="${size}" ${state.sourceSize === size ? 'selected' : ''}>${size}</option>`;
        });
      });
      sourceSizeSelect.innerHTML = options;
      return;
    }

    const sizes = categoryData.sizes;
    sourceSizeSelect.innerHTML = `
      <option value="">Select Size</option>
      ${sizes.map(size => `
        <option value="${size[state.sourceSystem]}" ${state.sourceSize === size[state.sourceSystem] ? 'selected' : ''}>
          ${size[state.sourceSystem]}
        </option>
      `).join('')}
    `;
  }

  function updateMeasurementInputs() {
    const measureInputsContainer = document.getElementById('measurement-inputs');
    if (!measureInputsContainer) return;

    const categoryData = sizeData[state.category];
    if (!categoryData) return;

    // Special handling for bras
    if (state.category === 'bras') {
      measureInputsContainer.innerHTML = `
        <div class="form-row">
          <div class="form-group">
            <label for="measure-band">
              Band (Underbust) <span class="required">*</span>
              <span class="tooltip" title="Measure snugly around ribcage, under bust">?</span>
            </label>
            <div class="input-group">
              <input type="number" 
                     id="measure-band" 
                     class="form-input measurement-input" 
                     data-field="band"
                     step="0.5" 
                     min="20" 
                     max="50"
                     value="${state.band || ''}"
                     placeholder="e.g., 32">
              <span class="input-addon">in</span>
            </div>
          </div>
          <div class="form-group">
            <label for="measure-bust">
              Bust <span class="required">*</span>
              <span class="tooltip" title="Measure around the fullest part">?</span>
            </label>
            <div class="input-group">
              <input type="number" 
                     id="measure-bust" 
                     class="form-input measurement-input" 
                     data-field="bust"
                     step="0.5" 
                     min="25" 
                     max="60"
                     value="${state.bust || ''}"
                     placeholder="e.g., 36">
              <span class="input-addon">in</span>
            </div>
          </div>
        </div>
      `;
      attachMeasurementListeners();
      return;
    }

    // Special handling for rings
    if (state.category === 'rings') {
      measureInputsContainer.innerHTML = `
        <div class="form-row">
          <div class="form-group">
            <label for="measure-circumference">
              Finger Circumference
              <span class="tooltip" title="Wrap string around finger, measure in mm">?</span>
            </label>
            <div class="input-group">
              <input type="number" 
                     id="measure-circumference" 
                     class="form-input measurement-input" 
                     data-field="circumference"
                     step="0.5" 
                     min="40" 
                     max="75"
                     value="${state.circumference || ''}"
                     placeholder="e.g., 54">
              <span class="input-addon">mm</span>
            </div>
          </div>
          <div class="form-group">
            <label for="measure-diameter">
              Ring Inner Diameter
              <span class="tooltip" title="Measure across inside of existing ring">?</span>
            </label>
            <div class="input-group">
              <input type="number" 
                     id="measure-diameter" 
                     class="form-input measurement-input" 
                     data-field="diameter"
                     step="0.1" 
                     min="12" 
                     max="25"
                     value="${state.diameter || ''}"
                     placeholder="e.g., 17.2">
              <span class="input-addon">mm</span>
            </div>
          </div>
        </div>
        <p class="form-help">Enter either circumference OR diameter - both are not required</p>
      `;
      attachMeasurementListeners();
      return;
    }

    const measurements = categoryData.measurements || [];
    
    measureInputsContainer.innerHTML = `
      <div class="form-row">
        ${measurements.map(m => {
          const info = measurementInfo[m];
          return `
            <div class="form-group">
              <label for="measure-${m}">
                ${info.label} <span class="required">*</span>
                <span class="tooltip" title="${info.description}">?</span>
              </label>
              <div class="input-group">
                <input type="number" 
                       id="measure-${m}" 
                       class="form-input measurement-input" 
                       data-field="${m}"
                       step="0.5" 
                       min="0"
                       value="${state[m] || ''}"
                       placeholder="Enter ${info.label.toLowerCase()}">
                <span class="input-addon">${info.unit}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    
    attachMeasurementListeners();
  }

  function attachMeasurementListeners() {
    document.querySelectorAll('.measurement-input').forEach(input => {
      input.addEventListener('input', debounce((e) => {
        const field = e.target.dataset.field;
        state[field] = parseFloat(e.target.value) || '';
        saveStateToURL();
        if (hasValidMeasurements()) calculateResults();
      }, 300));
    });
  }

  function updateMeasurementGuide() {
    const guideContainer = document.getElementById('measurement-guide');
    if (!guideContainer) return;

    const categoryData = sizeData[state.category];
    if (!categoryData) return;

    let guideContent = '';
    
    if (state.category === 'bras') {
      guideContent = `
        <div class="guide-item">
          <div class="guide-icon">📏</div>
          <div class="guide-text">
            <strong>Band Size:</strong> Measure around your ribcage, directly under your bust. Keep the tape snug but not tight.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">📐</div>
          <div class="guide-text">
            <strong>Bust:</strong> Measure around the fullest part of your bust, keeping the tape parallel to the floor.
          </div>
        </div>
      `;
    } else if (state.category === 'rings') {
      guideContent = `
        <div class="guide-item">
          <div class="guide-icon">💍</div>
          <div class="guide-text">
            <strong>String Method:</strong> Wrap a piece of string or paper around your finger, mark where it overlaps, and measure the length in mm.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">📏</div>
          <div class="guide-text">
            <strong>Existing Ring:</strong> Measure the inner diameter of a ring that fits well.
          </div>
        </div>
      `;
    } else if (state.category.includes('Shoes')) {
      guideContent = `
        <div class="guide-item">
          <div class="guide-icon">👟</div>
          <div class="guide-text">
            <strong>Foot Length:</strong> Stand on paper, trace your foot, and measure from heel to longest toe in cm.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">⏰</div>
          <div class="guide-text">
            <strong>Tip:</strong> Measure feet at the end of the day when they're largest. Measure both feet and use the larger measurement.
          </div>
        </div>
      `;
    } else if (state.category === 'kidsClothing') {
      guideContent = `
        <div class="guide-item">
          <div class="guide-icon">📏</div>
          <div class="guide-text">
            <strong>Height:</strong> Have child stand against a wall, mark the top of their head, and measure from the floor.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">⚖️</div>
          <div class="guide-text">
            <strong>Weight:</strong> Use a reliable scale. Kids' sizes are often based on both height and weight.
          </div>
        </div>
      `;
    } else {
      guideContent = `
        <div class="guide-item">
          <div class="guide-icon">📐</div>
          <div class="guide-text">
            <strong>Bust/Chest:</strong> Measure around the fullest part, keeping tape parallel to floor.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">📏</div>
          <div class="guide-text">
            <strong>Waist:</strong> Measure at your natural waistline (narrowest point), typically just above the belly button.
          </div>
        </div>
        <div class="guide-item">
          <div class="guide-icon">🎯</div>
          <div class="guide-text">
            <strong>Hips:</strong> Measure around the fullest part of your hips, typically 7-9 inches below your waist.
          </div>
        </div>
      `;
    }

    guideContainer.innerHTML = guideContent;
  }

  // ============================================
  // CALCULATION FUNCTIONS
  // ============================================
  
  function hasValidInput() {
    if (state.mode === 'convert') {
      return state.sourceSize !== '';
    } else {
      return hasValidMeasurements();
    }
  }

  function hasValidMeasurements() {
    const categoryData = sizeData[state.category];
    if (!categoryData) return false;

    // Special cases
    if (state.category === 'bras') {
      return state.band > 0 && state.bust > 0;
    }
    
    if (state.category === 'rings') {
      return state.circumference > 0 || state.diameter > 0;
    }

    const measurements = categoryData.measurements || [];
    return measurements.some(m => state[m] > 0);
  }

  function calculateResults() {
    const categoryData = sizeData[state.category];
    if (!categoryData) return;

    let result;
    
    if (state.mode === 'convert') {
      result = convertSize(categoryData);
    } else {
      result = findSizeByMeasurement(categoryData);
    }

    displayResults(result);
  }

  function convertSize(categoryData) {
    // Special handling for bras
    if (state.category === 'bras') {
      return convertBraSize(categoryData);
    }

    const sizes = categoryData.sizes;
    const matchingSize = sizes.find(size => size[state.sourceSystem] === state.sourceSize);
    
    if (!matchingSize) {
      return { error: 'Size not found in conversion table' };
    }

    return {
      type: 'conversion',
      sourceSystem: state.sourceSystem,
      sourceSize: state.sourceSize,
      conversions: categoryData.systems.map(system => ({
        system,
        size: matchingSize[system],
        isSource: system === state.sourceSystem
      })),
      measurements: getMeasurementsFromSize(matchingSize, categoryData)
    };
  }

  function convertBraSize(categoryData) {
    // Parse the source size (e.g., "34C" -> band: "34", cup: "C")
    const match = state.sourceSize.match(/^(\d+)(.+)$/);
    if (!match) {
      return { error: 'Invalid bra size format' };
    }

    const sourceBand = match[1];
    const sourceCup = match[2];

    // Find band conversion
    const bandMatch = categoryData.bandSizes.find(b => b[state.sourceSystem] === sourceBand);
    if (!bandMatch) {
      return { error: 'Band size not found' };
    }

    // Find cup conversion
    const cupMatch = categoryData.cupSizes.find(c => c[state.sourceSystem] === sourceCup);
    if (!cupMatch) {
      return { error: 'Cup size not found' };
    }

    return {
      type: 'conversion',
      sourceSystem: state.sourceSystem,
      sourceSize: state.sourceSize,
      conversions: categoryData.systems.map(system => ({
        system,
        size: `${bandMatch[system]}${cupMatch[system]}`,
        band: bandMatch[system],
        cup: cupMatch[system],
        isSource: system === state.sourceSystem
      })),
      measurements: {
        band: bandMatch.band,
        cupDiff: cupMatch.diff
      }
    };
  }

  function findSizeByMeasurement(categoryData) {
    // Special handling for bras
    if (state.category === 'bras') {
      return findBraSizeByMeasurement(categoryData);
    }

    // Special handling for rings
    if (state.category === 'rings') {
      return findRingSizeByMeasurement(categoryData);
    }

    const sizes = categoryData.sizes;
    const measurements = categoryData.measurements || [];
    
    // Find best matching size
    let bestMatch = null;
    let bestScore = Infinity;

    sizes.forEach(size => {
      let score = 0;
      let validMeasurements = 0;

      measurements.forEach(m => {
        if (state[m] > 0 && size[m]) {
          const mid = (size[m].min + size[m].max) / 2;
          const diff = Math.abs(state[m] - mid);
          score += diff;
          validMeasurements++;
        }
      });

      if (validMeasurements > 0) {
        score /= validMeasurements;
        if (score < bestScore) {
          bestScore = score;
          bestMatch = size;
        }
      }
    });

    if (!bestMatch) {
      return { error: 'No matching size found for your measurements' };
    }

    // Find adjacent sizes for comparison
    const sizeIndex = sizes.indexOf(bestMatch);
    const sizeDown = sizeIndex > 0 ? sizes[sizeIndex - 1] : null;
    const sizeUp = sizeIndex < sizes.length - 1 ? sizes[sizeIndex + 1] : null;

    return {
      type: 'measurement',
      recommendedSize: bestMatch,
      systems: categoryData.systems,
      measurements: getMeasurementsFromSize(bestMatch, categoryData),
      alternatives: {
        sizeDown,
        sizeUp
      },
      inputMeasurements: measurements.reduce((acc, m) => {
        if (state[m] > 0) acc[m] = state[m];
        return acc;
      }, {}),
      fitAnalysis: analyzeFit(bestMatch, measurements)
    };
  }

  function findBraSizeByMeasurement(categoryData) {
    const band = state.band;
    const bust = state.bust;

    if (!band || !bust) {
      return { error: 'Please enter both band and bust measurements' };
    }

    // Find closest band size
    let closestBand = null;
    let minBandDiff = Infinity;

    categoryData.bandSizes.forEach(b => {
      const mid = (b.band.min + b.band.max) / 2;
      const diff = Math.abs(band - mid);
      if (diff < minBandDiff) {
        minBandDiff = diff;
        closestBand = b;
      }
    });

    // Calculate cup size from difference
    const cupDiff = Math.round(bust - band);
    let closestCup = categoryData.cupSizes[0];
    
    categoryData.cupSizes.forEach(c => {
      if (c.diff <= cupDiff) {
        closestCup = c;
      }
    });

    return {
      type: 'measurement',
      recommendedSize: {
        band: closestBand,
        cup: closestCup
      },
      systems: categoryData.systems,
      conversions: categoryData.systems.map(system => ({
        system,
        size: `${closestBand[system]}${closestCup[system]}`,
        band: closestBand[system],
        cup: closestCup[system]
      })),
      inputMeasurements: { band, bust },
      sisterSizes: calculateSisterSizes(closestBand, closestCup, categoryData)
    };
  }

  function findRingSizeByMeasurement(categoryData) {
    const sizes = categoryData.sizes;
    let targetValue;
    let measureType;

    if (state.circumference > 0) {
      targetValue = state.circumference;
      measureType = 'circumference';
    } else if (state.diameter > 0) {
      targetValue = state.diameter;
      measureType = 'diameter';
    } else {
      return { error: 'Please enter circumference or diameter' };
    }

    // Find closest size
    let closestSize = null;
    let minDiff = Infinity;

    sizes.forEach(size => {
      const diff = Math.abs(size[measureType] - targetValue);
      if (diff < minDiff) {
        minDiff = diff;
        closestSize = size;
      }
    });

    if (!closestSize) {
      return { error: 'No matching ring size found' };
    }

    const sizeIndex = sizes.indexOf(closestSize);

    return {
      type: 'measurement',
      recommendedSize: closestSize,
      systems: categoryData.systems,
      inputMeasurements: { [measureType]: targetValue },
      alternatives: {
        sizeDown: sizeIndex > 0 ? sizes[sizeIndex - 1] : null,
        sizeUp: sizeIndex < sizes.length - 1 ? sizes[sizeIndex + 1] : null
      }
    };
  }

  function calculateSisterSizes(band, cup, categoryData) {
    const bandIndex = categoryData.bandSizes.indexOf(band);
    const cupIndex = categoryData.cupSizes.indexOf(cup);
    
    const sisters = [];

    // Sister size up (larger band, smaller cup)
    if (bandIndex < categoryData.bandSizes.length - 1 && cupIndex > 0) {
      const sisterBand = categoryData.bandSizes[bandIndex + 1];
      const sisterCup = categoryData.cupSizes[cupIndex - 1];
      sisters.push({
        type: 'Band Up, Cup Down',
        band: sisterBand,
        cup: sisterCup
      });
    }

    // Sister size down (smaller band, larger cup)
    if (bandIndex > 0 && cupIndex < categoryData.cupSizes.length - 1) {
      const sisterBand = categoryData.bandSizes[bandIndex - 1];
      const sisterCup = categoryData.cupSizes[cupIndex + 1];
      sisters.push({
        type: 'Band Down, Cup Up',
        band: sisterBand,
        cup: sisterCup
      });
    }

    return sisters;
  }

  function getMeasurementsFromSize(size, categoryData) {
    const result = {};
    const measurements = categoryData.measurements || [];
    
    measurements.forEach(m => {
      if (size[m]) {
        result[m] = size[m];
      }
    });

    return result;
  }

  function analyzeFit(size, measurements) {
    const analysis = {};
    
    measurements.forEach(m => {
      if (state[m] > 0 && size[m]) {
        const userValue = state[m];
        const { min, max } = size[m];
        const mid = (min + max) / 2;
        
        if (userValue < min) {
          analysis[m] = { status: 'small', diff: min - userValue };
        } else if (userValue > max) {
          analysis[m] = { status: 'large', diff: userValue - max };
        } else if (userValue < mid) {
          analysis[m] = { status: 'snug', diff: 0 };
        } else {
          analysis[m] = { status: 'relaxed', diff: 0 };
        }
      }
    });

    return analysis;
  }

  // ============================================
  // DISPLAY RESULTS
  // ============================================
  
  function displayResults(result) {
    const resultDiv = document.getElementById('size-result');
    if (!resultDiv) return;

    if (result.error) {
      resultDiv.innerHTML = `
        <div class="error-message">
          <span>⚠️</span> ${result.error}
        </div>
      `;
      resultDiv.classList.remove('hidden');
      return;
    }

    const categoryData = sizeData[state.category];
    let html = '';

    if (result.type === 'conversion') {
      html = renderConversionResults(result, categoryData);
    } else {
      html = renderMeasurementResults(result, categoryData);
    }

    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
  }

  function renderConversionResults(result, categoryData) {
    return `
      <div class="result-card">
        <div class="result-header-actions">
          <h3>📐 Size Conversion Results</h3>
          <div class="result-actions">
            <button type="button" class="btn-action" id="share-calculation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share
            </button>
            <button type="button" class="btn-action" onclick="window.print()">
              🖨️ Print
            </button>
          </div>
        </div>

        <!-- Main Conversion Display -->
        <div class="conversion-hero">
          <div class="source-size-display">
            <span class="size-system">${result.sourceSystem}</span>
            <span class="size-value">${result.sourceSize}</span>
            <span class="size-label">${categoryData.label}</span>
          </div>
        </div>

        <!-- All Conversions Grid -->
        <div class="conversions-grid">
          ${result.conversions.map(conv => `
            <div class="conversion-card ${conv.isSource ? 'source' : ''}">
              <div class="conversion-system">${conv.system}</div>
              <div class="conversion-size">${conv.size}</div>
              ${conv.isSource ? '<span class="source-badge">Your Size</span>' : ''}
            </div>
          `).join('')}
        </div>

        <!-- Size Comparison Chart -->
        ${renderSizeComparisonChart(result, categoryData)}

        <!-- Full Size Table -->
        ${renderFullSizeTable(categoryData, result.sourceSize, result.sourceSystem)}

        <!-- Measurement Reference -->
        ${result.measurements && Object.keys(result.measurements).length > 0 ? `
          <div class="measurements-reference">
            <h4>📏 Typical Body Measurements for This Size</h4>
            <div class="measurements-grid">
              ${Object.entries(result.measurements).map(([key, range]) => `
                <div class="measurement-item">
                  <span class="measurement-label">${measurementInfo[key]?.label || key}</span>
                  <span class="measurement-value">${range.min}" - ${range.max}"</span>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Shopping Tips -->
        <div class="tips-section">
          <h4>💡 International Shopping Tips</h4>
          <div class="tips-grid">
            <div class="tip-card">
              <div class="tip-icon">🌍</div>
              <div class="tip-content">
                <strong>Check the Brand's Origin</strong>
                <p>European brands often use EU sizing, while American brands use US sizing, even when sold internationally.</p>
              </div>
            </div>
            <div class="tip-card">
              <div class="tip-icon">📏</div>
              <div class="tip-content">
                <strong>Always Check Size Charts</strong>
                <p>Sizes can vary by brand. Always refer to the specific brand's size chart when available.</p>
              </div>
            </div>
            <div class="tip-card">
              <div class="tip-icon">📦</div>
              <div class="tip-content">
                <strong>Return Policies</strong>
                <p>When shopping internationally, check return policies in case the size doesn't fit as expected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderMeasurementResults(result, categoryData) {
    // Special handling for bras
    if (state.category === 'bras') {
      return renderBraMeasurementResults(result, categoryData);
    }

    // Special handling for rings
    if (state.category === 'rings') {
      return renderRingMeasurementResults(result, categoryData);
    }

    const recSize = result.recommendedSize;

    return `
      <div class="result-card">
        <div class="result-header-actions">
          <h3>📐 Your Recommended Size</h3>
          <div class="result-actions">
            <button type="button" class="btn-action" id="share-calculation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share
            </button>
            <button type="button" class="btn-action" onclick="window.print()">
              🖨️ Print
            </button>
          </div>
        </div>

        <!-- Your Measurements Summary -->
        <div class="input-summary">
          <h4>Your Measurements</h4>
          <div class="input-measurements-grid">
            ${Object.entries(result.inputMeasurements).map(([key, value]) => `
              <div class="input-measurement-item">
                <span class="measurement-icon">${getMeasurementIcon(key)}</span>
                <span class="measurement-label">${measurementInfo[key]?.label || key}</span>
                <span class="measurement-value">${value} ${measurementInfo[key]?.unit || ''}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recommended Sizes -->
        <div class="recommended-sizes">
          <h4>✅ Recommended Sizes Across Systems</h4>
          <div class="conversions-grid">
            ${result.systems.map(system => `
              <div class="conversion-card recommended">
                <div class="conversion-system">${system}</div>
                <div class="conversion-size">${recSize[system]}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Fit Analysis -->
        ${renderFitAnalysis(result.fitAnalysis)}

        <!-- Alternative Sizes -->
        ${result.alternatives ? `
          <div class="alternative-sizes">
            <h4>🔄 Consider These Alternatives</h4>
            <div class="alternatives-grid">
              ${result.alternatives.sizeDown ? `
                <div class="alternative-card size-down">
                  <div class="alternative-label">Size Down (Tighter Fit)</div>
                  <div class="alternative-sizes-row">
                    ${result.systems.map(system => `
                      <span class="alt-size">${system}: ${result.alternatives.sizeDown[system]}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
              ${result.alternatives.sizeUp ? `
                <div class="alternative-card size-up">
                  <div class="alternative-label">Size Up (Looser Fit)</div>
                  <div class="alternative-sizes-row">
                    ${result.systems.map(system => `
                      <span class="alt-size">${system}: ${result.alternatives.sizeUp[system]}</span>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <!-- Visual Size Range Chart -->
        ${renderSizeRangeChart(result, categoryData)}

        <!-- Full Size Table -->
        ${renderFullSizeTable(categoryData, recSize[result.systems[0]], result.systems[0])}
      </div>
    `;
  }

  function renderBraMeasurementResults(result, categoryData) {
    const { band, cup } = result.recommendedSize;

    return `
      <div class="result-card">
        <div class="result-header-actions">
          <h3>👙 Your Bra Size</h3>
          <div class="result-actions">
            <button type="button" class="btn-action" id="share-calculation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share
            </button>
          </div>
        </div>

        <!-- Your Measurements -->
        <div class="input-summary">
          <h4>Your Measurements</h4>
          <div class="input-measurements-grid">
            <div class="input-measurement-item">
              <span class="measurement-icon">📏</span>
              <span class="measurement-label">Band (Underbust)</span>
              <span class="measurement-value">${result.inputMeasurements.band}"</span>
            </div>
            <div class="input-measurement-item">
              <span class="measurement-icon">📐</span>
              <span class="measurement-label">Bust</span>
              <span class="measurement-value">${result.inputMeasurements.bust}"</span>
            </div>
            <div class="input-measurement-item highlight">
              <span class="measurement-icon">🔢</span>
              <span class="measurement-label">Cup Difference</span>
              <span class="measurement-value">${Math.round(result.inputMeasurements.bust - result.inputMeasurements.band)}"</span>
            </div>
          </div>
        </div>

        <!-- Recommended Size -->
        <div class="bra-size-display">
          <div class="bra-size-hero">
            <span class="bra-band">${band.US}</span>
            <span class="bra-cup">${cup.US}</span>
          </div>
          <span class="bra-size-label">US Size</span>
        </div>

        <!-- International Conversions -->
        <div class="conversions-grid">
          ${result.conversions.map(conv => `
            <div class="conversion-card">
              <div class="conversion-system">${conv.system}</div>
              <div class="conversion-size">${conv.size}</div>
            </div>
          `).join('')}
        </div>

        <!-- Sister Sizes -->
        ${result.sisterSizes && result.sisterSizes.length > 0 ? `
          <div class="sister-sizes-section">
            <h4>👯 Sister Sizes (Same Cup Volume)</h4>
            <p class="sister-sizes-explanation">Sister sizes have the same cup volume but different band fit. Try these if your band is too tight or too loose.</p>
            <div class="sister-sizes-grid">
              ${result.sisterSizes.map(sister => `
                <div class="sister-size-card">
                  <div class="sister-type">${sister.type}</div>
                  <div class="sister-size">${sister.band.US}${sister.cup.US}</div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Bra Fitting Tips -->
        <div class="tips-section">
          <h4>💡 Bra Fitting Tips</h4>
          <div class="tips-grid">
            <div class="tip-card">
              <div class="tip-icon">✅</div>
              <div class="tip-content">
                <strong>Band Check</strong>
                <p>The band should be snug and parallel to the floor. You should be able to fit two fingers under it.</p>
              </div>
            </div>
            <div class="tip-card">
              <div class="tip-icon">🎯</div>
              <div class="tip-content">
                <strong>Cup Check</strong>
                <p>Cups should fully contain breast tissue with no spillage or gaping.</p>
              </div>
            </div>
            <div class="tip-card">
              <div class="tip-icon">📍</div>
              <div class="tip-content">
                <strong>Center Check</strong>
                <p>The center gore (front piece) should lie flat against your sternum.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderRingMeasurementResults(result, categoryData) {
    const recSize = result.recommendedSize;

    return `
      <div class="result-card">
        <div class="result-header-actions">
          <h3>💍 Your Ring Size</h3>
          <div class="result-actions">
            <button type="button" class="btn-action" id="share-calculation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share
            </button>
          </div>
        </div>

        <!-- Your Measurement -->
        <div class="input-summary">
          <h4>Your Measurement</h4>
          <div class="input-measurements-grid">
            ${Object.entries(result.inputMeasurements).map(([key, value]) => `
              <div class="input-measurement-item">
                <span class="measurement-icon">${key === 'circumference' ? '⭕' : '📏'}</span>
                <span class="measurement-label">${key === 'circumference' ? 'Circumference' : 'Inner Diameter'}</span>
                <span class="measurement-value">${value} mm</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Recommended Size -->
        <div class="ring-size-display">
          <div class="ring-size-hero">
            <span class="ring-size-value">${recSize.US}</span>
          </div>
          <span class="ring-size-label">US Size</span>
        </div>

        <!-- International Conversions -->
        <div class="conversions-grid">
          ${result.systems.map(system => `
            <div class="conversion-card ${system === 'US' ? 'recommended' : ''}">
              <div class="conversion-system">${system}</div>
              <div class="conversion-size">${recSize[system]}</div>
            </div>
          `).join('')}
        </div>

        <!-- Ring Size Details -->
        <div class="ring-details">
          <div class="ring-detail-item">
            <span class="detail-label">Circumference</span>
            <span class="detail-value">${recSize.circumference} mm</span>
          </div>
          <div class="ring-detail-item">
            <span class="detail-label">Inner Diameter</span>
            <span class="detail-value">${recSize.diameter} mm</span>
          </div>
        </div>

        <!-- Alternative Sizes -->
        ${result.alternatives ? `
          <div class="alternative-sizes">
            <h4>🔄 Consider These Alternatives</h4>
            <div class="alternatives-grid">
              ${result.alternatives.sizeDown ? `
                <div class="alternative-card size-down">
                  <div class="alternative-label">Half Size Down</div>
                  <div class="alt-size">US: ${result.alternatives.sizeDown.US}</div>
                </div>
              ` : ''}
              ${result.alternatives.sizeUp ? `
                <div class="alternative-card size-up">
                  <div class="alternative-label">Half Size Up</div>
                  <div class="alt-size">US: ${result.alternatives.sizeUp.US}</div>
                </div>
              ` : ''}
            </div>
          </div>
        ` : ''}

        <!-- Full Ring Size Table -->
        ${renderFullSizeTable(categoryData, recSize.US, 'US')}

        <!-- Ring Size Tips -->
        <div class="tips-section">
          <h4>💡 Ring Sizing Tips</h4>
          <div class="tips-grid">
            <div class="tip-card">
              <div class="tip-icon">🌡️</div>
              <div class="tip-content">
                <strong>Temperature Matters</strong>
                <p>Fingers swell in heat and shrink in cold. Measure at room temperature for best results.</p>
              </div>
            </div>
            <div class="tip-card">
              <div class="tip-icon">⏰</div>
              <div class="tip-content">
                <strong>Time of Day</strong>
                <p>Measure in the evening when fingers are typically slightly larger.</p>
              </div>
            </div>
            <div class="tip-card">
              <div class="tip-icon">💧</div>
              <div class="tip-content">
                <strong>Comfort Fit</strong>
                <p>For wide bands (6mm+), consider sizing up 1/4 to 1/2 size for comfort.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderFitAnalysis(fitAnalysis) {
    if (!fitAnalysis || Object.keys(fitAnalysis).length === 0) return '';

    return `
      <div class="fit-analysis">
        <h4>🎯 Fit Analysis</h4>
        <div class="fit-grid">
          ${Object.entries(fitAnalysis).map(([key, analysis]) => {
            const info = measurementInfo[key];
            let statusClass = '';
            let statusText = '';
            let icon = '';

            switch (analysis.status) {
              case 'small':
                statusClass = 'fit-tight';
                statusText = `${analysis.diff.toFixed(1)}" below range - may be tight`;
                icon = '⚠️';
                break;
              case 'large':
                statusClass = 'fit-loose';
                statusText = `${analysis.diff.toFixed(1)}" above range - may be loose`;
                icon = '⚠️';
                break;
              case 'snug':
                statusClass = 'fit-snug';
                statusText = 'Will fit snugly';
                icon = '✅';
                break;
              case 'relaxed':
                statusClass = 'fit-relaxed';
                statusText = 'Will fit relaxed';
                icon = '✅';
                break;
            }

            return `
              <div class="fit-item ${statusClass}">
                <span class="fit-icon">${icon}</span>
                <span class="fit-label">${info?.label || key}</span>
                <span class="fit-status">${statusText}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderSizeComparisonChart(result, categoryData) {
    const systems = result.conversions.map(c => c.system);
    const sizes = result.conversions.map(c => c.size);

    return `
      <div class="size-comparison-chart">
        <h4>📊 Size Comparison Visualization</h4>
        <div class="comparison-bars-container">
          ${result.conversions.map((conv, index) => {
            const barWidth = 60 + (index * 8);
            return `
              <div class="comparison-bar-row">
                <span class="bar-system">${conv.system}</span>
                <div class="bar-container">
                  <div class="bar-fill-comparison ${conv.isSource ? 'source' : ''}" style="width: ${barWidth}%">
                    <span class="bar-size">${conv.size}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <p class="chart-note">Note: Bar widths are for visual distinction only, not proportional to actual size differences.</p>
      </div>
    `;
  }

  function renderSizeRangeChart(result, categoryData) {
    const measurements = categoryData.measurements || [];
    if (measurements.length === 0) return '';

    return `
      <div class="size-range-chart">
        <h4>📊 Your Measurements vs. Size Range</h4>
        <div class="range-bars">
          ${measurements.map(m => {
            if (!state[m] || !result.recommendedSize[m]) return '';
            
            const range = result.recommendedSize[m];
            const userValue = state[m];
            const rangeSpan = range.max - range.min;
            const extendedMin = range.min - rangeSpan * 0.5;
            const extendedMax = range.max + rangeSpan * 0.5;
            const totalSpan = extendedMax - extendedMin;
            
            const rangeStartPercent = ((range.min - extendedMin) / totalSpan) * 100;
            const rangeWidthPercent = (rangeSpan / totalSpan) * 100;
            const userPercent = ((userValue - extendedMin) / totalSpan) * 100;

            return `
              <div class="range-bar-item">
                <div class="range-label">${measurementInfo[m]?.label || m}</div>
                <div class="range-bar-container">
                  <div class="range-bar-track">
                    <div class="range-bar-ideal" style="left: ${rangeStartPercent}%; width: ${rangeWidthPercent}%"></div>
                    <div class="range-bar-marker" style="left: ${Math.min(100, Math.max(0, userPercent))}%"></div>
                  </div>
                  <div class="range-bar-labels">
                    <span>${range.min}"</span>
                    <span>Your: ${userValue}"</span>
                    <span>${range.max}"</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        <div class="range-legend">
          <span class="legend-item"><span class="legend-color ideal"></span> Ideal Range</span>
          <span class="legend-item"><span class="legend-color marker"></span> Your Measurement</span>
        </div>
      </div>
    `;
  }

  function renderFullSizeTable(categoryData, highlightSize, highlightSystem) {
    const systems = categoryData.systems;
    const sizes = categoryData.sizes;

    // Special handling for bras
    if (state.category === 'bras') {
      return renderBraSizeTable(categoryData);
    }

    return `
      <div class="full-size-table-section">
        <h4>📋 Complete Size Chart</h4>
        <div class="table-wrapper">
          <table class="size-table">
            <thead>
              <tr>
                ${systems.map(sys => `<th>${sys}</th>`).join('')}
                ${categoryData.measurements?.map(m => `<th>${measurementInfo[m]?.label || m} (${measurementInfo[m]?.unit || ''})</th>`).join('') || ''}
              </tr>
            </thead>
            <tbody>
              ${sizes.map(size => {
                const isHighlighted = size[highlightSystem] === highlightSize;
                return `
                  <tr class="${isHighlighted ? 'highlighted' : ''}">
                    ${systems.map(sys => `<td>${size[sys]}</td>`).join('')}
                    ${categoryData.measurements?.map(m => {
                      if (size[m]) {
                        return `<td>${size[m].min} - ${size[m].max}</td>`;
                      }
                      return '<td>-</td>';
                    }).join('') || ''}
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderBraSizeTable(categoryData) {
    const bandSizes = categoryData.bandSizes;
    const cupSizes = categoryData.cupSizes;

    return `
      <div class="full-size-table-section">
        <h4>📋 Band Size Conversion</h4>
        <div class="table-wrapper">
          <table class="size-table">
            <thead>
              <tr>
                ${categoryData.systems.map(sys => `<th>${sys}</th>`).join('')}
                <th>Underbust (in)</th>
              </tr>
            </thead>
            <tbody>
              ${bandSizes.map(band => `
                <tr>
                  ${categoryData.systems.map(sys => `<td>${band[sys]}</td>`).join('')}
                  <td>${band.band.min}" - ${band.band.max}"</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <h4>📋 Cup Size Conversion</h4>
        <div class="table-wrapper">
          <table class="size-table">
            <thead>
              <tr>
                <th>Bust-Band Difference</th>
                ${categoryData.systems.map(sys => `<th>${sys}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${cupSizes.map(cup => `
                <tr>
                  <td>${cup.diff}"</td>
                  ${categoryData.systems.map(sys => `<td>${cup[sys]}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function getMeasurementIcon(key) {
    const icons = {
      bust: '👚',
      waist: '📏',
      hip: '🎯',
      chest: '👔',
      neck: '👔',
      footLength: '👟',
      height: '📐',
      weight: '⚖️',
      circumference: '⭕',
      diameter: '📏',
      band: '📏'
    };
    return icons[key] || '📏';
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  
  function clearResults() {
    const resultDiv = document.getElementById('size-result');
    if (resultDiv) {
      resultDiv.innerHTML = '';
      resultDiv.classList.add('hidden');
    }
  }

  function clearAll() {
    // Reset state
    state = {
      mode: 'convert',
      category: 'womensClothingTops',
      sourceSystem: 'US',
      sourceSize: '',
      bust: '',
      waist: '',
      hip: '',
      chest: '',
      neck: '',
      footLength: '',
      height: '',
      weight: '',
      circumference: '',
      diameter: '',
      band: ''
    };

    // Reset form
    document.getElementById('category').value = state.category;
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === 'convert');
    });
    
    updateSourceSystemOptions();
    updateSourceSizeOptions();
    updateMeasurementInputs();
    updateVisibility();
    clearResults();
    
    // Clear URL
    window.history.replaceState({}, '', window.location.pathname);
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ============================================
  // URL STATE MANAGEMENT
  // ============================================
  
  function saveStateToURL() {
    const params = new URLSearchParams();
    
    Object.keys(state).forEach(key => {
      if (state[key] !== '' && state[key] !== null) {
        params.set(key, state[key]);
      }
    });

    const newURL = window.location.pathname + '?' + params.toString();
    window.history.replaceState({}, '', newURL);
  }

  function loadStateFromURL() {
    const params = new URLSearchParams(window.location.search);
    
    params.forEach((value, key) => {
      if (key in state) {
        if (['bust', 'waist', 'hip', 'chest', 'neck', 'footLength', 'height', 'weight', 'circumference', 'diameter', 'band'].includes(key)) {
          state[key] = parseFloat(value) || '';
        } else {
          state[key] = value;
        }
      }
    });

    // Update form elements
    const categorySelect = document.getElementById('category');
    if (categorySelect) categorySelect.value = state.category;

    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === state.mode);
    });
  }

  // ============================================
  // SHARE FUNCTIONALITY
  // ============================================
  
  async function shareCalculation() {
    const categoryData = sizeData[state.category];
    const shareData = {
      title: 'Size Conversion - CalcCrunch',
      text: `${categoryData?.label || 'Size'} conversion: ${state.sourceSize} (${state.sourceSystem})`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        
        const button = document.getElementById('share-calculation');
        if (button) {
          const originalText = button.innerHTML;
          button.innerHTML = '✓ Link Copied!';
          button.style.background = '#10b981';
          button.style.color = 'white';
          
          setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
            button.style.color = '';
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }

  // Re-attach share listener after results render
  document.addEventListener('click', (e) => {
    if (e.target.closest('#share-calculation')) {
      shareCalculation();
    }
  });
})();