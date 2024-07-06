import classNames from 'classnames';
import React from 'react';
import { Flex } from './components/Flex';
import { PREFIX } from './variables';
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
  return (
    <React.Fragment>
      <Flex
        role="annotation"
        className={classNames(`${PREFIX}_annotation`)}
        flex={1}
        vertical
        gap="small"
      >
        <div role="content_layer" className={classNames(`${PREFIX}_content_layer`)}>
          {content}
        </div>
      </Flex>
    </React.Fragment>
  );
}
