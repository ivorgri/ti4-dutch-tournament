import { parse } from "https://deno.land/std@0.224.0/path/mod.ts";

export default async function () {
  const dir = "./assets/img/gallery";

  const files = [];
  for await (const entry of Deno.readDir(dir)) {
    if (entry.isFile && /\.(jpg|jpeg|png|gif)$/i.test(entry.name)) {
      files.push(entry.name);
    }
  }

  const galleryImages = files.map((file) => ({
    src: `/assets/img/gallery/${file}`,
    alt: parse(file).name.replace(/-/g, " "),
    caption: "",
    year: parse(file).name.match(/^(\d{4})/)[1]
  }));

  galleryImages.sort((a, b) => parse(b.src).name.localeCompare(parse(a.src).name));

  // Group images by year
  const imagesByYear = galleryImages.reduce((acc, img) => {
    if (!acc[img.year]) {
      acc[img.year] = [];
    }
    acc[img.year].push(img);
    return acc;
  }, {});

  const sortedYears = Array.from(
    new Set(galleryImages.map((img) => img.year))
  ).sort((a, b) => b.localeCompare(a));

  const yearMetadata = {
    "2025": {
      "date": "8th and 9th of November" 
    },
    "2024": {
      "date": "2nd and 3rd of November"
    }
  }

  return {
    all: galleryImages,
    shortlist: galleryImages.slice(0, 6),
    byYear: imagesByYear,
    sortedYears,
    yearMetadata
  };
}
