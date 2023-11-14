import path from 'path';

import {JS_BODY_MARKER} from '../util/js-utils';

const jsMarkersToRemove: string[] = [];
const tsMarkersToRemove: string[] = [JS_BODY_MARKER];

/**
 * Eleventy transform for removing content markers used by the sample
 * generation workflow.
 *
 * @param inputContent Source code to be transformed.
 * @param outputPath The path the code is being written to.
 * @return
 */
export function removeContentMarkers(inputContent: string, outputPath: string) {
  const ext = path.extname(outputPath);

  return inputContent.replace(
      /^[ ]*?\/\/[ ]+\[(?:START|END)[ ]+(.*?)\]\n?/gm, (match, $1) => {
        switch (ext) {
          case '.js':
            return jsMarkersToRemove.includes($1) ? '' : match;
          case '.ts':
            return tsMarkersToRemove.includes($1) ? '' : match;
          default:
            return match;
        }
      });
}