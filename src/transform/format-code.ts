import path from 'path';
import prettier from 'prettier';

const PRETTIER_OPTIONS = {
  tabWidth: 2,
  useTabs: false,
  printWidth: 100
};

async function format(source: string, parser: string) {
  return await prettier.format(source, {...PRETTIER_OPTIONS, parser});
}

/**
 * Eleventy transform for formatting source code with Prettier.
 *
 * @param inputContent Source code to be formatted.
 * @param outputPath The path the code is being written to.
 * @return
 */
export async function formatCode(inputContent: string, outputPath: string) {
  const ext = path.extname(outputPath);

  switch (ext) {
    case '.html':
      return await format(inputContent, 'html');
    case '.js':
      return await format(inputContent, 'babel');
    case '.ts':
      return await format(inputContent, 'typescript');
    default:
      return inputContent;
  }
}