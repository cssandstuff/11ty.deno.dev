// Eleventy 3!
import pluginWebc from "npm:@11ty/eleventy-plugin-webc";
import { EleventyRenderPlugin } from "npm:@11ty/eleventy@canary";

export default function(eleventyConfig) {
  eleventyConfig.addPairedShortcode("boxCallout", function(content) {

  });

  eleventyConfig.addPassthroughCopy("./src/css/*.css");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
	eleventyConfig.addPlugin(EleventyRenderPlugin);
	eleventyConfig.addPlugin(pluginWebc,{
		components: "src/_includes/webc/**/*.webc",
	});

	return {
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site"
    }
  }
};