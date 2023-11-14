import readline from 'readline';
import {Readable} from 'stream';

/**
 * Content marker used to differentiate JS head and body content.
 */
export const JS_BODY_MARKER = 'request_ads';

interface ParsedJS {
  head: string;
  body: string;
}

/**
 * Parses a JS source file into head and body `<script>` blocks.
 *
 * The source file is expected to use {@link JS_BODY_MARKER} to differentiate
 * body content from head content. Ex:
 *
 * ```
 * const thisBelongsInHead = '...';
 *
 * // [START request_ads]
 * const thisBelongsInBody = '...';
 * // [END request_ads]
 * ```
 *
 * @param input A {@link Readable} containing source to parse.
 * @return
 */
export async function parseHeadAndBodyJS(input: Readable): Promise<ParsedJS> {
  const jsReader = readline.createInterface({input});

  let headerJs = '';
  let bodyJs = '';
  let requestAds = false;

  for await (const line of jsReader) {
    switch (line.trim()) {
      case `// [START ${JS_BODY_MARKER}]`:
      case `// [END ${JS_BODY_MARKER}]`:
        requestAds = line.includes('START');
        break;
      default:
        if (requestAds) {
          bodyJs += `${line}\n`;
        } else {
          headerJs += `${line}\n`;
        }
    }
  }

  if (headerJs.trim().length > 0) {
    headerJs = `<script>${headerJs}</script>`;
  }

  if (bodyJs.trim().length > 0) {
    // Output a function declaration matching the format used in head.
    const funcDec = headerJs.includes('function') ? `function() {${bodyJs}}` :
                                                    `() => {${bodyJs}}`;
    bodyJs = `<script>googletag.cmd.push(${funcDec});</script>`;
  }

  return {head: headerJs, body: bodyJs};
}