export default function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/assets");

  // Date filters for templates
  eleventyConfig.addFilter("postDate", (dateObj) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateObj));
  });
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toISOString().slice(0, 10);
  });
  eleventyConfig.addFilter("currentYear", () => new Date().getFullYear());

  // Blog posts collection (newest first)
  eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/blog/posts/*.md")
      .reverse();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
