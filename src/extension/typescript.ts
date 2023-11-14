import {randomUUID} from 'crypto';
import ts from 'typescript';

import {SampleCollection} from '../model/sample-data';
import {getSampleDirFromPageData} from '../util/template-utils';

const PLACEHOLDER_COMMENT = `/* ${randomUUID()} */`;

const JS_TARGETS = {
  js: ts.ScriptTarget.ES2020,
  legacyjs: ts.ScriptTarget.ES5
};

const TSC_OPTIONS = {
  newLine: ts.NewLineKind.LineFeed,
  removeComments: false,
  pretty: true
};

function tsToJs(source: string, legacy: boolean) {
  const js = ts.transpileModule(toggleBlankLines(source), {
                 reportDiagnostics: true,
                 compilerOptions: {
                   ...TSC_OPTIONS,
                   target: legacy ? JS_TARGETS.legacyjs : JS_TARGETS.js
                 }
               }).outputText;

  return toggleBlankLines(js);
}

function toggleBlankLines(source: string) {
  return source.includes(PLACEHOLDER_COMMENT) ?
      source.replaceAll(PLACEHOLDER_COMMENT, '\n') :
      source.replaceAll('\n\n', `\n${PLACEHOLDER_COMMENT}`);
}

/**
 * Eleventy extension that converts TS source code to JS.
 */
export const TypeScriptExension = {
  outputFileExtension: 'js',

  compileOptions: {
    permalink: () => {
      return (data: SampleCollection) => {
        // This returns the full output path for the current source file.
        return `${getSampleDirFromPageData(data.page)}/${data.file}`;
      };
    }
  },

  compile(inputContent: string) {
    return async (data: SampleCollection) => {
      if (data.file?.endsWith('.js')) {
        return tsToJs(inputContent, data.file.includes('legacyjs'));
      }

      return inputContent;
    };
  },

  getData() {
    return {
      // This controls the source files output for each TS file.
      file: ['js/demo.js', 'legacyjs/demo.js', 'ts/sample.ts'],
      pagination: {data: 'file', alias: 'file', size: 1}
    };
  }
};

export const TEST_ONLY = {tsToJs};