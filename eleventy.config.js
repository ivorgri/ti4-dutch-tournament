import { eleventyImageTransformPlugin } from "npm:@11ty/eleventy-img";
import nunjucksMarkdown from "npm:nunjucks-markdown-filter"


export default function (eleventyConfig) {
	const widthSizes = [null, 320, 480, 640, 768, 1024, 1280, 1600, 1920]

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		// output image formats
		formats: ["webp", "jpg"],
		
		// output image widths
		widths: widthSizes,
		htmlOptions: {
			imgAttributes: {
				sizes: widthSizes,
				loading: "lazy",
				decoding: "async"
			}
		}
	});

	eleventyConfig.addNunjucksFilter("markdown", (markdownString) =>
		nunjucksMarkdown(markdownString),
	);
    
    eleventyConfig.addPassthroughCopy("assets");
};