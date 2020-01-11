import {buildJsonProcessed} from '../../src/lib/json_structure';

const JSON_INPUT = JSON.parse('{"a": 1, "b": {"c": 1, "d": 3}}');

describe('json_structure', () => {
  it('buildJsonProcessed', () => {
    const tree = buildJsonProcessed(JSON_INPUT);
    expect(Object.keys(tree).length).toBe(2);
    expect(Object.keys(tree)).toStrictEqual(['a', 'b']);

    expect(Object.keys(tree.b.children).length).toBe(2);
    expect(Object.keys(tree.b.children)).toStrictEqual(['c', 'd']);
  })
});
