import classNames from 'classnames';
import React, { MouseEvent, useRef, useState } from 'react';
import { c } from './variables';

import { Flex, Modal, Tag } from 'antd';
import './annotation.less';
import { nextTick } from './helpers/helper';
import { TTag } from './interface';

export interface PAnnotation {
  /** content to be showed */
  content?: string;
  tags?: TTag[];
}

/**
 *
 * @param param0
 * @returns
 */
export function Annotation({ content, tags }: PAnnotation) {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPos, setModalPos] = useState([0, 0]);

  function adjustModalPosition(e: MouseEvent) {
    //detect if the mouse is on the bottom of the screen, move the modal up
    let modalPos = [e.clientX, e.clientY];

    //because the first time the modal pops up, it can't get the actual height of the modal at the first time, so we need to adjust it again after nexttick
    nextTick(() => {
      console.log({ modalPos });
      if (modalBodyRef.current) {
        const modalHeight = modalBodyRef.current.offsetHeight + 20 * 2;
        if (modalPos[1] > window.innerHeight - modalHeight) {
          modalPos[1] -= modalHeight;
        } else {
          modalPos[1] += 20;
        }
        setModalPos(modalPos);
      }
    });
    return modalPos;
  }

  function onMouseUp(e: MouseEvent) {
    console.log({e})
    // console.log('onMouseUp');
    setModalOpen(true);
    adjustModalPosition(e);
  }

  return (
    <React.Fragment>
      <div role="annotation" className={classNames(c('annotation'))}>
        <div className={c('layers')}>
          <div
            role="content_layer"
            className={classNames(c(`content_layer`))}
            onMouseUp={(e) => onMouseUp(e)}
          >
            {content}
          </div>
          <div role="tag_layer" className={classNames(c(`tag_layer`))}>
            <span>{content}</span>
          </div>
        </div>
        <Modal
          style={{ left: modalPos[0], top: modalPos[1], margin: 0 }}
          width={'fit-content'}
          open={modalOpen}
          mask={false}
          keyboard={true}
          maskClosable={true}
          closable={false}
          footer={null}
          onCancel={() => setModalOpen(false)}
        >
          <Flex ref={modalBodyRef} vertical gap="small">
            {tags && tags.length
              ? tags.map((tag, index) => {
                  return (
                    <Tag key={index} color={tag.color}>
                      {tag.content}
                    </Tag>
                  );
                })
              : null}
          </Flex>
        </Modal>
      </div>
    </React.Fragment>
  );
}
