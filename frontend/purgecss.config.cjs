module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx,html}',
  ],
  css: [
    './src/**/*.css',
  ],
  safelist: {
    standard: [
      // Icon libraries and runtime-injected classes
      /^bx/,                 // Boxicons
      /^swiper/,             // Swiper core/components
      /^svg-inline--fa/,     // FontAwesome SVG helper
      // component-specific dynamic classes
      /pc-hero-image-part/,
      /pc-product-icon/,
      /pc-featuredcard-/,    // product cards
      /Product-details-/,    // product detail page
      /Related-product-/,    // related products
      /lp-section-/,         // landing page sections
    ],
  },
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/%.]+/g) || [],
};


