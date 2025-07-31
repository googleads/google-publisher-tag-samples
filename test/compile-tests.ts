import 'jasmine';

import fs from 'fs';
import path from 'path';
import {create} from 'ts-node';

const SAMPLES_DIR = path.resolve(__dirname, '../samples');

describe('Sample compilation tests', () => {
  const samples = fs.readdirSync(SAMPLES_DIR, {withFileTypes: true})
                      .filter(dirent => dirent.isDirectory())
                      .map(dirent => dirent.name);

  const compiler = create();

  for (const sample of samples) {
    const tsFile = path.join(SAMPLES_DIR, sample, 'sample.ts');
    if (fs.existsSync(tsFile)) {
      const code = fs.readFileSync(tsFile, 'utf-8');
      it(`${sample}/sample.ts compiles`, () => {
        // Compiler will throw an error if the code is invalid.
        const output = compiler.compile(code, 'test.ts');
        expect(output.length).not.toBe(0);
      });
    }
  }
});
