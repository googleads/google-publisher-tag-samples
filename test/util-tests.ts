import 'jasmine';

import YAML from 'yaml';

import {EleventyPageData} from '../src/model/eleventy-data';
import {SampleDetails} from '../src/model/sample-data';
import {generateSampleDetails, getSampleDirFromPageData} from '../src/util/template-utils';

describe('Utility', () => {
  describe('template utils', () => {
    const SAMPLE_DIR = '/test-sample';
    const SAMPLE_DETAILS: SampleDetails = {
      title: 'test',
      description: 'A test sample.',
      skill: 'Beginner',
      keywords: ['kw1', 'kw2'],
      authors: ['author1', 'author2', 'author3'],
    };

    function createPageData(
        baseDir: string, pathToFile: string): EleventyPageData {
      return {filePathStem: `${baseDir}${pathToFile}`, fileSlug: ''};
    }

    function compareSampleDetails(input: SampleDetails, generated: object) {
      Object.entries(input).forEach(([k, v]) => {
        // Page title should be mapped to "name" in sample details.
        const key = k === 'title' ? 'name' : k;
        expect(generated.hasOwnProperty(key));
        expect(generated).toEqual(jasmine.objectContaining({[key]: v}));
      });
    }

    it('gets sample dir', () => {
      const collection = createPageData(SAMPLE_DIR, '/sample');
      const sampleName = getSampleDirFromPageData(collection);
      expect(sampleName).toEqual(SAMPLE_DIR);
    });

    it('gets sample dir from nested file', () => {
      const collection = createPageData(SAMPLE_DIR, '/x/y/z/sample');
      const sampleName = getSampleDirFromPageData(collection);
      expect(sampleName).toEqual(SAMPLE_DIR);
    });

    it('translates title to name in sample details', () => {
      const input = {title: 'Test'};
      const details = YAML.parse(generateSampleDetails(input));
      compareSampleDetails(input, details);
    });

    it('generates complete sample details', () => {
      const details = YAML.parse(generateSampleDetails(SAMPLE_DETAILS));
      compareSampleDetails(SAMPLE_DETAILS, details);
    });

    it('generates incomplete sample details', () => {
      Object.entries(SAMPLE_DETAILS).forEach(([k, v]) => {
        const partialInput = {[k]: v};
        const details = YAML.parse(generateSampleDetails(partialInput));
        compareSampleDetails(partialInput, details);
      });
    });
  });
});