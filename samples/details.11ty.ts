import {SampleCollectionData, SampleData} from '../src/model/sample-data.js';
import {SampleTemplate} from '../src/model/sample-template.js';
import {generateSampleDetails, getSampleDirFromPageData} from '../src/util/template-utils.js';

/**
 * Template for generating `<sample>/sample.yaml` files.
 */
class Details implements SampleTemplate {
  data(): SampleCollectionData{
    return {
      eleventyExcludeFromCollections: true,
      permalink: ({sample}: SampleData) =>
          `${getSampleDirFromPageData(sample.page)}/sample.yaml`,
      pagination: {
        data: 'collections.samples',
        alias: 'sample',
        size: 1,
      }
    };
  }

  render({sample}: SampleData) {
    return generateSampleDetails(sample.data);
  }
}

export default Details;