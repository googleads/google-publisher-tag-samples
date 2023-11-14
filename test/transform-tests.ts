import 'jasmine';

import {formatCode} from '../src/transform/format-code';
import {removeContentMarkers} from '../src/transform/remove-content-markers';
import {removeHeaders} from '../src/transform/remove-headers';
import {JS_BODY_MARKER} from '../src/util/js-utils';

describe('Eleventy transform', () => {
  describe('format-code', () => {
    async function testFormatting(input: string, ext: string) {
      const formattedInput = await formatCode(input, `out.${ext}`);

      // Ensure the formatter did something (not validating specific rules).
      expect(input).not.toEqual(formattedInput);

      // Ensure that character content hasn't changed.
      expect(unformat(input)).toEqual(unformat(formattedInput));
    }

    function unformat(input: string) {
      return input.replace(/[\n|\s]/g, '');
    }

    it('formats HTML', async () => {
      await testFormatting(
          '<html><head><title>test</title></head><body></body></html>', 'html');
    });

    it('formats JS', async () => {
      await testFormatting('function foo() { return bar; }', 'js');
    });

    it('formats JS in HTML', async () => {
      await testFormatting('function foo() { return bar; }', 'html');
    });

    it('formats TS', async () => {
      await testFormatting(
          'function foo(bar: string): boolean { return false; }', 'ts');
    });
  });

  describe('remove-content-markers', () => {
    const content = `return true;`;
    const knownMarker =
        `// [START ${JS_BODY_MARKER}]\n${content}\n// [END ${JS_BODY_MARKER}]`;
    const unknownMarker =
        `// [START other_marker]\n${content}\n// [END other_marker]`;

    function testMarkerRemoval(
        input: string, expectedOutput: string, ext: string) {
      const output = removeContentMarkers(input, `out.${ext}`);
      expect(output.trim()).toEqual(expectedOutput.trim());
    }

    it('leaves request_ads makers in JS', () => {
      testMarkerRemoval(knownMarker, knownMarker, 'js');
    });

    it('removes request_ads marker from TS', () => {
      testMarkerRemoval(knownMarker, content, 'ts');
    });

    it('ignores unrecognized markers in JS', () => {
      const input = `${unknownMarker}\n${knownMarker}`;
      testMarkerRemoval(input, input, 'js');
    });

    it('ignores unrecognized markers in TS', () => {
      const input = `${unknownMarker}\n${knownMarker}`;
      const expectedOutput = `${unknownMarker}\n${content}`;
      testMarkerRemoval(input, expectedOutput, 'ts');
    });

    it('ignores indentation', () => {
      const input = `${knownMarker.replace(/^(.*)$/gm, '    $1')}`;
      testMarkerRemoval(input, content, 'ts');
    });
  });

  describe('remove-headers', () => {
    const licenseHeader = `
/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */`;

    const tsStanza = `
// Using @types/google-publisher-tag
// https://www.npmjs.com/package/@types/google-publisher-tag`;

    it('removes license header from JS files', () => {
      const output = removeHeaders(licenseHeader, 'out.js');
      expect(output.trim()).toEqual('');
    });

    it('removes TS stanza from JS files', () => {
      const output = removeHeaders(tsStanza, 'out.js');
      expect(output.trim()).toEqual('');
    });

    it('leaves headers in TS files', () => {
      const input = `${licenseHeader}\n${tsStanza}`;
      const output = removeHeaders(input, 'out.ts');
      expect(output.trim()).toEqual(input.trim());
    });

    it('correctly handles non-header block comments', () => {
      const blockComment = '/* test comment */';
      const input = `${licenseHeader}\n${tsStanza}\n${blockComment}`;
      const output = removeHeaders(input, 'out.js');
      expect(output.trim()).toEqual(blockComment);
    });
  });
});