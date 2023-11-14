import YAML from 'yaml';

import {EleventyPageData} from '../model/eleventy-data';
import {SampleDetails} from '../model/sample-data';

/**
 * Generates YAML details for a single sample.
 *
 * @param sample
 * @return Sample details in YAML format.
 */
export function generateSampleDetails(sample: SampleDetails): string {
  return YAML.stringify({
    name: sample.title,
    description: sample.description,
    authors: sample.authors,
    embed: sample.embed,
    skill: sample.skill,
    keywords: sample.keywords
  });
}

/**
 * Retrieves the base directory of the current sample from Eleventy page data.
 *
 * @param page
 * @return The base directory of the current sample.
 */
export function getSampleDirFromPageData(page: EleventyPageData) {
  // Extract sample name from the file path of the current page.
  // filePathStem follows the format "/<sample-name>/.../sample"
  return page.filePathStem.split('/').splice(0, 2).join('/');
}