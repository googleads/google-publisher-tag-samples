import {SampleCollectionData, SampleData} from '../src/model/sample-data';
import {SampleTemplate} from '../src/model/sample-template';
import {getSampleDirFromPageData} from '../src/util/template-utils';

/**
 * Template for generating `<sample>/ts/package.json` files.
 */
class Package implements SampleTemplate {
  data(): SampleCollectionData{
    return {
      eleventyExcludeFromCollections: true,
      permalink: ({sample}: SampleData) =>
          `${getSampleDirFromPageData(sample.page)}/ts/package.json`,
      pagination: {
        data: 'collections.samples',
        alias: 'sample',
        size: 1,
      }
    };
  }

  render({pkg, sample}: SampleData) {
    return JSON.stringify(
        {
          ...pkg,
          name: sample.data.name,
          description: sample.data.description,
          dependencies: Object.fromEntries(sample.data.dependencies!.map(
              (dep) => [dep, pkg.dependencies[dep]])),
          devDependencies: Object.fromEntries(sample.data.devDependencies!.map(
              (dep) => [dep, pkg.devDependencies[dep]])),
          scripts: sample.data.scripts,
        },
        null, 2);
  }
}

export = Package;