const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("src/images");

  // ✅ Add a Nunjucks-compatible date filter
  eleventyConfig.addNunjucksFilter("date", (value, format = "yyyy") => {
    try {
      const dateObj = value === "now" ? new Date() : new Date(value);
      return DateTime.fromJSDate(dateObj).toFormat(format);
    } catch (e) {
      return "Invalid Date";
    }
  });

  eleventyConfig.addCollection("recipes", function(collection) {
    return collection.getFilteredByTag("recipes");
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};

  