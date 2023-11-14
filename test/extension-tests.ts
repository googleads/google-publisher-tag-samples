import 'jasmine';

import fs from 'fs';
import path from 'path';

import {TEST_ONLY as TSExtension} from '../src/extension/typescript';

/**
 * Eleventy extension tests.
 */
describe('Eleventy extension', () => {
  /**
   * Tests for the TS -> JS extension.
   */
  describe('TS -> JS', () => {
    const {tsToJs} = TSExtension;

    const DATA_DIR =
        path.resolve(__dirname, './extension-tests-data/typescript');

    function unformat(input: string) {
      return input.replace(/[\n|\s]/g, '');
    }

    const testFiles = fs.readdirSync(DATA_DIR);
    for (const file of testFiles) {
      if (!path.basename(file).endsWith('-ts')) continue;

      const input = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');

      it(`${file} to ES2020 passes`, () => {
        const convertedOutput = tsToJs(input, false);
        if (!convertedOutput) {
          fail(`${file} JS conversion failed`);
        } else {
          const fileName = path.basename(file).replace('-ts', '-js');
          const output = fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8');
          expect(unformat(convertedOutput)).toBe(unformat(output));
        }
      });

      it(`${file} to ES5 passes`, () => {
        const convertedOutput = tsToJs(input, true);
        if (!convertedOutput) {
          fail(`${file} legacy JS conversion failed`);
        } else {
          const fileName = path.basename(file).replace('-ts', '-legacyjs');
          const output = fs.readFileSync(path.join(DATA_DIR, fileName), 'utf8');
          expect(unformat(convertedOutput)).toBe(unformat(output));
        }
      });
    }
  });
});