import classNames from 'classnames';
import React, {
  MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { PresetColors, c } from './variables';

import './annotation.less';
import { Dialog } from './components/Dialog';
import { Flex } from './components/Flex';
import { Tag } from './components/Tag';
import { getAnnoContents } from './helpers/helper';
import { TAnnoDetail, TTag } from './interface';

export interface PAnnotation {
  /** content to be showed */
  sentence?: string;
  tags?: TTag[];
  /**the annotations that already exist */
  annoations?: TAnnoDetail[];
  /**the fontSize of main content,now only support number, will use px unit */
  fontSize?: number;
  /** Ensure that there is enough space between the rows to fit a tag */
  lineHeight?: string;
  /** the color of marked text by annotation */
  hightlightColor?: string;
  hightlightBgColor?: string;
  /** can not mark */
  readonly?: boolean;
  /** notify when annotations add or remove */
  onChange?: (annoations: TAnnoDetail[]) => void;
}

/** remember the last selection for content before selecting tag */
let lastSelection = [0, 0];
/**
 *
 * @returns
 */
export const Annotation = (props: PAnnotation) => {
  const {
    sentence = '',
    tags = [],
    annoations = [],
    fontSize = 16,
    lineHeight = '48px',
    hightlightColor = 'white',
    hightlightBgColor = '#f50',
    readonly,
    onChange,
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const contentLayerRef = useRef<HTMLDivElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogPos, setDialogPos] = useState([0, 0]);
  const [dialogHeight, setDialogHeight] = useState(0);
  const [tagColors, setTagColors] = useState<Map<TTag, string>>(new Map());
  const [annoContents, setAnnoContents] = useState<TAnnoDetail[]>([]);

  useEffect(() => {
    //when change annos ,notify parent with all usefull annotations
    const useFullAnnoations = annoContents.filter((anno) => anno.tag);
    if (onChange) {
      onChange(useFullAnnoations);
    }
  }, [annoContents]);

  const dialogRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      const dialogPadding = parseInt(getComputedStyle(node).padding);
      // console.log({dialogPadding,lineHeight})
      const heightTotal = dialogPadding * 2 + parseInt(lineHeight) * tags.length;
      // console.log({ heightTotal });
      // return heightTotal;
      setDialogHeight(heightTotal);
    }
  }, []);

  function closeDialog() {
    setDialogOpen(false);
  }

  useLayoutEffect(() => {
    //init the anno color
    tags.forEach((tag, index) => {
      tagColors.set(tag, tag.color ? tag.color : PresetColors[index % PresetColors.length]);
      setTagColors(tagColors);
    });
    //init the annotations already exist
    if (annoations && annoations.length) {
      setAnnoContents(getAnnoContents(annoations, sentence));
    }

    document.body.addEventListener('mouseup', closeDialog);
    return () => {
      document.body.removeEventListener('mouseup', closeDialog);
    };
  }, []);

  function adjustModalPosition(mouseX: number, mouseY: number) {
    if (ref && ref.current) {
      // console.log(window.getSelection())
      const containerRect = ref.current.getBoundingClientRect();
      const relativePos = [mouseX - containerRect.left, mouseY - containerRect.top];
      const lh = parseInt(lineHeight);
      const usedX = relativePos[0];
      const line = Math.ceil(relativePos[1] / lh);
      let usedY = line * lh; //relativePos[1] + lineHeight / 2 + 10;

      // console.log(line, mousePos[1], containerRect.top, window.innerHeight - dialogHeight);
      //detect if the mouse is on the bottom of the screen, move the modal up
      if (usedY > window.innerHeight - dialogHeight) {
        usedY -= dialogHeight - lh / 2;
      }

      setDialogPos([usedX, usedY]);
    }
  }

  function openModal(e: MouseEvent) {
    // setMousePos([e.clientX, e.clientY]);
    adjustModalPosition(e.clientX, e.clientY);
    setDialogOpen(true);

    e.preventDefault();
    e.stopPropagation();
  }

  function onMouseUp(e: MouseEvent) {
    if (readonly) return;

    const selecter = window.getSelection();
    if (selecter && selecter.rangeCount > 0) {
      const range = selecter.getRangeAt(0);
      // console.log({ range });

      if (range.startOffset == range.endOffset) {
        //#TODO just click character or empty position;
        // const newRange = document.createRange();
        // const textNode = contentLayerRef.current!.firstChild!;
        // newRange.setStart(textNode, range.startOffset);
        // newRange.setEnd(textNode, range.startOffset+1);
        // const selection = window.getSelection();
        // if (selection) {
        //   selection.removeAllRanges();
        //   selection.addRange(newRange);
        // }
        setDialogOpen(false);
      } else {
        lastSelection = [range.startOffset, range.endOffset];
        openModal(e);
      }
    }
  }

  function addAnno(selection: number[], tag: TTag) {
    //build the new anno from tag
    const start = selection[0];
    const end = selection[0] == selection[1] ? selection[0] + 1 : selection[1];
    //check the same annotation,remove old one
    const index = annoContents.findIndex((t) => t.start == start && t.end == end);
    if (index >= 0) {
      annoContents.splice(index, 1);
    }
    const anno: TAnnoDetail = {
      text: sentence.substring(start, end),
      start,
      end,
      tag,
    };

    annoContents.push(anno);
    console.log('add', anno);
    let _annoContents = getAnnoContents(annoContents, sentence);
    setAnnoContents(_annoContents);
    setDialogOpen(false);
  }

  function deleteAnno(anno: TAnnoDetail) {
    const index = annoContents.findIndex((t) => t.start == anno.start && t.end == anno.end);
    if (index >= 0) {
      annoContents.splice(index, 1);
      let _annoContents = getAnnoContents(annoContents, sentence);
      setAnnoContents(_annoContents);
    } else {
      console.warn('not find annotation when delete', { anno });
    }
  }

  function onTagClick(tag: TTag) {
    // console.log(tag);
    addAnno(lastSelection, tag);
  }

  /**
   * click the exist annotation,than update it
   */
  function onAnnoClick(e: MouseEvent, mark: TAnnoDetail) {
    if (readonly) return;
    lastSelection = [mark.start, mark.end];
    openModal(e);
  }

  function onDeleteAnno(e: MouseEvent, anno: TAnnoDetail) {
    e.preventDefault();
    e.stopPropagation();
    deleteAnno(anno);
  }

  return (
    <React.Fragment>
      <div
        ref={ref}
        role="annotation"
        className={classNames(c('annotation'), c('css_var_rika'))}
        style={{
          lineHeight,
        }}
      >
        <div className={c('layers')}>
          <div
            ref={contentLayerRef}
            role="sentence_layer"
            className={classNames(c(`sentence_layer`))}
          >
            {sentence}
          </div>
          <div
            ref={contentLayerRef}
            role="operation_layer"
            className={classNames(c(`operation_layer`))}
            onMouseUp={(e) => onMouseUp(e)}
          >
            {sentence}
          </div>
          <div role="anno_layer" className={classNames(c(`anno_layer`))}>
            {/* <span>{sentence}</span> */}
            {annoContents?.map((anno, index) => {
              if (!anno.tag) {
                //this is the normal text
                return (
                  <span className="normal" key={index}>
                    {anno.text}
                  </span>
                );
              } else {
                return (
                  <span
                    key={anno.start + '_' + anno.end + '_' + anno.tag.content}
                    className="anno"
                    style={{
                      backgroundColor: hightlightBgColor,
                      color: hightlightColor,
                      // textDecorationColor: tagColors.get(anno.tag),
                    }}
                    title={anno.tag.content}
                  >
                    {readonly ? (
                      <span>
                        {anno.text ? anno.text : sentence.substring(anno.start, anno.end)}
                      </span>
                    ) : (
                      <span>{anno.text}</span>
                    )}

                    <div
                      className="motion"
                      style={{
                        lineHeight: fontSize + 'px',
                        top: fontSize * 1.5 + 'px',
                      }}
                    >
                      <Tag
                        role={'anno_tag'}
                        closable={readonly ? false : true}
                        onClick={(e) => onAnnoClick(e, anno)}
                        onClose={(e) => {
                          onDeleteAnno(e, anno);
                        }}
                        color={tagColors.get(anno.tag)}
                      >
                        {anno.tag.content}
                      </Tag>
                    </div>
                  </span>
                );
              }
            })}
          </div>
        </div>

        <Dialog
          ref={dialogRef}
          style={{
            display: dialogOpen ? 'block' : 'none',
            position: 'absolute',
            left: dialogPos[0],
            top: dialogPos[1],
          }}
          open={dialogOpen}
        >
          <Flex vertical gap="small">
            {tags &&
              tags.map((tag, index) => {
                return (
                  <Tag
                    color={tag.color ? tag.color : PresetColors[index]}
                    key={tag.content}
                    onClick={() => onTagClick(tag)}
                  >
                    {tag.content}
                  </Tag>
                );
              })}
          </Flex>
        </Dialog>
      </div>
    </React.Fragment>
  );
};
