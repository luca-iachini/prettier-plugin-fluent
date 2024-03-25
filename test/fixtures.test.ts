import * as path from 'path';
import * as prettier from 'prettier';
import { readFileSync } from 'fs';
import { describe, expect, test } from '@jest/globals';

const fixtures = path.resolve(__dirname, 'fixtures');

async function test_fixture(name: string) {
  const inputContent = readFileSync(path.join(fixtures, `${name}_input.ftl`), 'utf-8');
  const outputContent = readFileSync(path.join(fixtures, `${name}_output.ftl`), 'utf-8');
  const formatted = await prettier.format(inputContent, {
    parser: "fluent",
    plugins: ['@luca-iachini/prettier-plugin-fluent'],
  });
  expect(formatted).toBe(outputContent);
}

describe('it format', () => {
  describe('message', () => {
    test('one message', async () => {
      await test_fixture('message');
    });
    test('multiple lines', async () => {
      await test_fixture('message_multiple_lines');
    });
    test('multiple lines with spaces', async () => {
      await test_fixture('message_multiple_lines_spaces');
    });
  });
  describe('attributes', () => {
    test('message with attributes', async () => {
      await test_fixture('attributes')
    });
  })
  describe('placeable', () => {
    test('variable', async () => {
      await test_fixture('placeable');
    });
    test('term', async () => {
      await test_fixture('placeable_term');
    });
    test('curly brace', async () => {
      await test_fixture('placeable_curly_brace');
    });
    test('message referenece', async () => {
      await test_fixture('placeable_message_reference');
    });
  });
  describe('builtins', () => {
    test('functions', async () => {
      await test_fixture('builtins');
    });
  });
  describe('selectors', () => {
    test('selectors', async () => {
      await test_fixture('selector');
    });
  });
  describe('comments', () => {
    test('comments', async () => {
      await test_fixture('comment');
    });
  });
});
