/**
 * Eleventy transform for removing unnecessary source file headers.
 *
 * @param inputContent Source code to be transformed.
 * @param outputPath The path the code is being written to.
 * @return
 */
export function removeHeaders(inputContent: string, outputPath: string) {
  if (outputPath.endsWith('.js')) {
    return inputContent.replace(/\/\*\*.*?@license.*?\*\/(\n)*/gs, '')
        .replace(/\/\/ Using.*?\/@types\/google-publisher-tag(\n)*/gs, '');
  }

  return inputContent;
}