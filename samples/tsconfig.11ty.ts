import {SampleCollectionData, SampleData} from '../src/model/sample-data';
import {SampleTemplate} from '../src/model/sample-template';
import {getSampleDirFromPageData} from '../src/util/template-utils';

/**
 * Template for generating `<sample>/ts/tsconfig.json` files.
 */
class TsConfig implements SampleTemplate {
  data(): SampleCollectionData{
    return {
      eleventyExcludeFromCollections: true,
      permalink: ({sample}: SampleData) =>
          `${getSampleDirFromPageData(sample.page)}/ts/tsconfig.json`,
      pagination: {
        data: 'collections.samples',
        alias: 'sample',
        size: 1,
      }
    };
  }

  render() {
    return JSON.stringify(
        {
          compilerOptions: {
            target: 'ESNext',
            useDefineForClassFields: true,
            module: 'ESNext',
            lib: ['ESNext', 'DOM'],
            moduleResolution: 'Node',
            strict: true,
            sourceMap: true,
            resolveJsonModule: true,
            esModuleInterop: true,
            noEmit: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            noImplicitReturns: true,
            skipLibCheck: true
          },
        },
        null, 2);
  }
}

export = TsConfig;