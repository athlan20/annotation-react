import { describe, expect, it } from 'vitest';
import { TAnnoDetail } from '../interface';
import { getAnnoContents } from './helper';

// const NormalAnnotation = composeStory(NormalStory, Meta);

describe('getAnnoContents', () => {
  // render(<NormalAnnotation />);
  it('work right', () => {
    const sentence = 'hello world';
    const annos: TAnnoDetail[] = [
      {
        text: 'el',
        start: 1,
        end: 3,
      },
      {
        text: 'wo',
        start: 6,
        end: 9,
      },
    ];
    const result = getAnnoContents(annos, sentence);
    console.log(result)
    expect(result.length).toEqual(4);
    expect(result[0].text).toEqual('h');
    expect(result[2].text).toEqual('lo ');
  });

  // it('false to be false', () => {
  //   expect(false).toBe(false);
  // });
});
