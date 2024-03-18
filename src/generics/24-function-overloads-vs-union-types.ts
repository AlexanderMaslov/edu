function runGenerator(generator: () => string): string;
function runGenerator(generator: { run: () => string }): string;
function runGenerator(generator: { run: () => string } | (() => void)) {
  if (typeof generator === 'function') {
    return generator();
  }
  return generator.run();
}

const result = runGenerator({
  run: () => 'hello',
});

const result2 = runGenerator(() => 'hello');
