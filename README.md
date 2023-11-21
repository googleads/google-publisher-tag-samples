# Google Publisher Tag Samples

Samples for the Google Publisher Tag (GPT) library.

You can try these samples on our
[developer site](//developers.google.com/publisher-tag/samples/).

## Project structure

[`dist/`](/dist) contains complete GPT samples, built from the templates in
[`samples/`](/samples). Each directory represents a single GPT sample, and each
sample has multiple output formats:

* `<sample>/js/` - JavaScript (ES2020)
* `<sample>/legacyjs/` - JavaScript (ES5)
* `<sample>/ts/` - TypeScript

[`samples/`](/samples) contains templates used to generate complete GPT samples.
Each template is stored in its own directory and consists of:

* `index.njk` - A [Nunjucks](//mozilla.github.io/nunjucks/) template
    containing sample-specific CSS and HTML content.
* `sample.ts` - Sample-specific GPT code, written in TypeScript.
* `README.md` - Sample-specific usage instructions.
* `<sample>.json` - Sample-specific metadata (title, description, etc.)

[`src/`](/src) contains the code necessary to transform templates into complete
samples.

[`test/`](/test) contains tests for [`src/`](/src).

## Development

### Build
1. `npm i` - Install dependencies.
2. `npm run build` - Build all targets and update `dist/` folder.

### Test
1. `npm run test` - Run all tests.

## Contributing
Pull requests are welcome! Please sign
[this Google Code contributor agreement](CONTRIBUTING.md) before submitting.
