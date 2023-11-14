import {SampleCollectionData} from '../src/model/sample-data';

/**
 * Base data object used for generating language-specific samples.
 *
 * These values may be overridden and/or supplimented by sample-specific
 * data objects (`samples/<sample>/<sample>.json`).
 */
const data: SampleCollectionData = {
  // Default authors.
  authors: ['Google Publisher Tag Team'],

  // Default package.json values for TS sample projects.
  dependencies: [],
  devDependencies: ['@types/google-publisher-tag', 'typescript', 'vite'],
  scripts: {
    dev: 'vite',
    build: 'tsc && vite build',
    preview: 'vite preview',
  },

  // Common pagination values.
  // This controls which output formats will be generated for each sample.
  mode: ['js', 'legacyjs', 'ts'],
  pagination: {data: 'mode', size: 1, alias: 'mode'},
  permalink:
      '{{ page.fileSlug }}/{{mode}}/{% if mode != \'ts\' %}demo{% else %}index{% endif %}.{{ page.outputFileExtension }}'
};

export = data;