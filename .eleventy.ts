import {UserConfig} from '@11ty/eleventy';
import fs from 'fs';
import path from 'path';

import {TypeScriptExension} from './src/extension/typescript';
import {formatCode} from './src/transform/format-code';
import {removeContentMarkers} from './src/transform/remove-content-markers';
import {removeHeaders} from './src/transform/remove-headers';
import {parseHeadAndBodyJS} from './src/util/js-utils';

// Defines the output formats 11ty will perform post-processing on.
const POST_PROCESS_OUTPUT_FORMATS = ['js', 'legacyjs'];

module.exports = (eleventyConfig: UserConfig) => {
  // Ignore TS templates, they're compiled to JS as part of the build process.
  eleventyConfig.ignores!.add('samples/*.11ty*.ts');

  // Skip processing README files and copy them to the output directory as-is.
  eleventyConfig.ignores!.add('samples/*/README.md');
  eleventyConfig.addPassthroughCopy('samples/*/README.md');

  // Register custom extensions.
  eleventyConfig.addTemplateFormats('ts');
  eleventyConfig.addExtension('ts', TypeScriptExension);

  // Register custom transforms (these are run in order).
  eleventyConfig.addTransform('removeHeaders', removeHeaders);
  eleventyConfig.addTransform('removeContentMarkers', removeContentMarkers);
  eleventyConfig.addTransform('formatCode', formatCode);

  // Define "samples" collection based on presence of sample.ts files.
  eleventyConfig.addCollection(
      'samples', (collectionApi: {getFilteredByGlob: (s: string) => [];}) => {
        const samples = collectionApi.getFilteredByGlob('samples/*/sample.ts');

        if (samples.length === 0) {
          throw new Error('No samples found.');
        }

        return samples;
      });

  // Merge JS sample HTML and JS into a single file.
  eleventyConfig.on('eleventy.after', async () => {
    const distPath = path.join(__dirname, 'dist');

    fs.readdirSync(distPath, {withFileTypes: true})
        .filter((f) => f.isDirectory())
        .map(({name: sample}: fs.Dirent) => {
          POST_PROCESS_OUTPUT_FORMATS.forEach(async (format) => {
            const jsPath = path.join(distPath, sample, format, 'demo.js');
            const parsedJs =
                await parseHeadAndBodyJS(fs.createReadStream(jsPath));

            const htmlPath = path.join(distPath, sample, format, 'demo.html');
            const htmlContent =
                fs.readFileSync(htmlPath)
                    .toString()
                    // Replace <script> tag with the parsed head JS.
                    .replace(
                        /<script.*?src="\/sample.ts"><\/script>/gm,
                        `${parsedJs.head}`)
                    // Append parsed body JS to the <body> tag.
                    .replace(/<\/body>/gm, `${parsedJs.body}</body>`)
                    // If there are now 2 consecutive script tags in the body,
                    // combine them into one.
                    .replace(/(<body>.*)<\/script>\s+<script>(.*)/s, '$1\n$2');

            fs.writeFileSync(htmlPath, await formatCode(htmlContent, htmlPath));
            fs.unlinkSync(jsPath);
          });
        });
  });

  return {
    dir: {
      input: 'samples',
      output: 'dist',
      includes: 'src/_includes',
    },
  };
};