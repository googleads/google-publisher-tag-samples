import {UserConfig} from '@11ty/eleventy';

module.exports = (eleventyConfig: UserConfig) => {
  // Ignore TS templates, they're compiled to JS as part of the build process.
  eleventyConfig.ignores!.add('samples/*.11ty*.ts');

  // Skip processing README files and copy them to the output directory as-is.
  eleventyConfig.ignores!.add('samples/*/README.md');
  eleventyConfig.addPassthroughCopy('samples/*/README.md');

  // Define "samples" collection based on presence of sample.ts files.
  eleventyConfig.addCollection(
      'samples', (collectionApi: {getFilteredByGlob: (s: string) => [];}) => {
        const samples = collectionApi.getFilteredByGlob('samples/*/sample.ts');

        if (samples.length === 0) {
          throw new Error('No samples found.');
        }

        return samples;
      });

  return {
    dir: {
      input: 'samples',
      output: 'dist',
      includes: 'src/_includes',
    },
  };
};