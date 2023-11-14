import {SampleCollectionData, SampleData} from '../src/model/sample-data';
import {SampleTemplate} from '../src/model/sample-template';
import {generateSampleDetails, getSampleDirFromPageData} from '../src/util/template-utils';

/**
 * Template for generating `<sample>/legacyjs/demo.details` files.
 */
class Details implements SampleTemplate {
  data(): SampleCollectionData{
    return {
      eleventyExcludeFromCollections: true,
      permalink: ({sample}: SampleData) =>
          `${getSampleDirFromPageData(sample.page)}/legacyjs/demo.details`,
      pagination: {
        data: 'collections.samples',
        alias: 'sample',
        size: 1,
      }
    };
  }

  render({sample}: SampleData) {
    // Remove unnecessary details.
    const {embed: _, skill: __, keywords: ___, ...details} = sample.data;
    return generateSampleDetails(details);
  }
}

export = Details;