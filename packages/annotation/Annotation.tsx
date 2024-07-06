import classNames from 'classnames';
import React from 'react';
import { Flex } from './components/Flex';
import { c } from './variables';

import './annotation.less';
import { Dialog, DialogContent, DialogTitle } from './components/ui/dialog';
import './global.css';
export interface PAnnotation {
  /** content to be showed */
  content?: string;
  tags?: string[];
}

/**
 *
 * @param param0
 * @returns
 */
export function Annotation({ content }: PAnnotation) {
  function onMouseUp() {
    console.log('onMouseUp');
  }

  return (
    <React.Fragment>
      <Flex role="annotation" className={classNames(c('annotation'))} flex={1} vertical gap="small">
        <div role="content_layer" className={classNames(c(`content_layer`))} onMouseUp={onMouseUp}>
          {content}
        </div>
        <div role="tag_layer" className={classNames(c(`tag_layer`))}>
          <span>{content}</span>
        </div>
      </Flex>
      <Dialog modal={false}>
        <DialogContent className="DialogContent">
          <DialogTitle>123</DialogTitle>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
