import {SampleCollectionData, SampleData} from '../src/model/sample-data.js';
import {SampleTemplate} from '../src/model/sample-template.js';
import {getSampleDirFromPageData} from '../src/util/template-utils.js';

/**
 * Template for generating `<sample>/ts/.gitignore` files.
 */
class GitIgnore implements SampleTemplate {
  data(): SampleCollectionData{
    return {
      eleventyExcludeFromCollections: true,
      permalink: ({sample}: SampleData) =>
          `${getSampleDirFromPageData(sample.page)}/ts/.gitignore`,
      pagination: {
        data: 'collections.samples',
        alias: 'sample',
        size: 1,
      }
    };
  }

  render() {
    const contents = `
node_modules
dist
dist-ssr
*.local
*.log

.vscode/
.DS_Store`;

    return `${contents}\n`.trimStart();
  }
}

export default GitIgnore;