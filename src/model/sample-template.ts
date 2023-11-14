import {SampleCollectionData, SampleData} from '../model/sample-data';

/**
 *  Custom Eleventy JS template class interface.
 *
 * @see {@link https://www.11ty.dev/docs/languages/javascript/#classes}
 */
export interface SampleTemplate {
  data?: () => SampleCollectionData;
  render: (data: SampleData) => string;
}