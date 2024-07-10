import { useEffect } from 'react';
import { TAnnoDetail } from '../interface';

export function nextTick(fn: Function) {
  setTimeout(fn, 10);
}

/**
 * @param callback
 */
export const useKeyPress = (
  callback: (T?: any) => void,
  // keys: EKeyboardKey[]
) => {
  const onKeyPress = (event: KeyboardEvent) => {
    if (true) {
      callback(event.key);
    }
  };

  useEffect(() => {
    document.addEventListener('keypress', onKeyPress);

    return () => {
      document.removeEventListener('keypress', onKeyPress);
    };
  }, [onKeyPress]);
};

/**
 * set the annos format to [normalText,anno,normalText,anno,...]
 * @param annos
 */
export function getAnnoContents(annos: TAnnoDetail[], sentence: string) {
  annos.sort((a, b) => a.start - b.start);
  let totalLeft = 0; //remember the last left pos
  const annosAll: TAnnoDetail[] = [];

  annos.forEach((anno) => {
    if (!anno.tag) {
      //is normal text
      return;
    }
    let _end = anno.end;
    if (anno.start > totalLeft) {
      //最开始内容
      const start = totalLeft;
      const end = anno.start;
      annosAll.push({
        start,
        end,
        text: sentence.substring(start, end),
      });
    }
    annosAll.push(anno);
    totalLeft = _end;
  });
  console.log({ annosAll });
  return annosAll;
}
