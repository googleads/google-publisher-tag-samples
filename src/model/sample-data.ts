import {EleventyCollection, EleventyCollectionData, EleventyData} from './eleventy-data'

/**
 * EleventyData interface with custom extensions.
 */
export interface SampleData extends EleventyData<SampleCollectionData> {
  sample: SampleCollection;
}

/**
 * EleventyCollection interface with custom extensions.
 */
export interface SampleCollection extends
    EleventyCollection<SampleCollectionData> {
  file?: string;
}

/**
 * Custom sample metadata object.
 */
export interface SampleDetails {
  // Sample metadata
  name?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  skill?: string;
  authors?: string[];
  embed?: boolean;
}

/**
 * EleventyCollectionData interface with custom extensions.
 */
export interface SampleCollectionData extends
    EleventyCollectionData<SampleData>, SampleDetails {
  mode?: string[];

  // package.json values
  dependencies?: string[];
  devDependencies?: string[];
  scripts?: {[key: string]: string};
}