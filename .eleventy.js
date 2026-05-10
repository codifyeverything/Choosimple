module.exports = function(eleventyConfig) {
  // Copy root assets into the finished _site folder
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("affiliate-links.js");
  eleventyConfig.addPassthroughCopy("affiliate-loader.js");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("tools");

  // Copy common image/icon file types from the repo root
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("*.jpg");
  eleventyConfig.addPassthroughCopy("*.jpeg");
  eleventyConfig.addPassthroughCopy("*.webp");
  eleventyConfig.addPassthroughCopy("*.ico");
  eleventyConfig.addPassthroughCopy("*.svg");

  // Return all items in a category group
  eleventyConfig.addFilter("groupItems", function(items, groupName) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.filter(function(item) {
      return item.group === groupName;
    });
  });

  // Count how many items are in a category group
  eleventyConfig.addFilter("groupCount", function(items, groupName) {
    if (!Array.isArray(items)) {
      return 0;
    }

    return items.filter(function(item) {
      return item.group === groupName;
    }).length;
  });

  // Return only categories marked as featured
  eleventyConfig.addFilter("featuredItems", function(items) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.filter(function(item) {
      return item.featured === true;
    });
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
