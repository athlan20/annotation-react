import classNames from 'classnames';
import React, { useState } from 'react';

import { PREFIX, PresetColorKey, c } from '../variables';

import { IconClose } from './Icon';
import './tag.less';
import './theme.less';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  /** backgroudn color */
  color?: PresetColorKey | string;
  closable?: boolean | ({ closeIcon?: React.ReactNode } & React.AriaAttributes);
  closeIcon?: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>((tagProps, ref) => {
  const { className, style, children, closable, color = 'cyan', onClose, ...otherProps } = tagProps;
  const [visible, setVisible] = useState(true);

  const prefixCls = 'anno_tag';

  const mergedCls = classNames(className, prefixCls, c('css_var_rika'), {
    [`${prefixCls}_${color}`]: color,
    [`${PREFIX}_hide`]: !visible,
  });

  const mergedStyle: React.CSSProperties = {
    ...style,
  };

  return (
    <span ref={ref} 
    className={mergedCls} 
    style={mergedStyle} 
    {...otherProps}>
      {children}
      {closable ? (
        <IconClose
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            if (onClose) {
              onClose(e);
            }
            setVisible(false);
          }}
        />
      ) : null}
    </span>
  );
});
