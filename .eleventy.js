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

  function normalizeGroupName(group) {
    if (!group) return "";
    if (typeof group === "string") return group;
    return group.title || group.name || "";
  }

  // Return all items in a category group.
  eleventyConfig.addFilter("groupItems", function(items, group) {
    if (!Array.isArray(items)) {
      return [];
    }

    const groupName = normalizeGroupName(group);

    return items.filter(function(item) {
      return item.group === groupName;
    });
  });

  // Count how many items are in a category group.
  eleventyConfig.addFilter("groupCount", function(items, group) {
    if (!Array.isArray(items)) {
      return 0;
    }

    const groupName = normalizeGroupName(group);

    return items.filter(function(item) {
      return item.group === groupName;
    }).length;
  });

  // Return only categories marked as featured.
  eleventyConfig.addFilter("featuredItems", function(items) {
    if (!Array.isArray(items)) {
      return [];
    }

    return items.filter(function(item) {
      return item.featured === true;
    });
  });

  // Return the newest items based on their order in categories.js.
  eleventyConfig.addFilter("latestItems", function(items, count) {
    if (!Array.isArray(items)) {
      return [];
    }

    const limit = Number(count) || 6;
    return items.slice().reverse().slice(0, limit);
  });

  // Return the first N items from a list.
  eleventyConfig.addFilter("limitItems", function(items, count) {
    if (!Array.isArray(items)) {
      return [];
    }

    const limit = Number(count) || items.length;
    return items.slice(0, limit);
  });

  // Return the full group object for an item.group value.
  eleventyConfig.addFilter("groupMeta", function(categoryGroups, groupName) {
    if (!Array.isArray(categoryGroups)) {
      return null;
    }

    return categoryGroups.find(function(group) {
      return group.title === groupName;
    }) || null;
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
