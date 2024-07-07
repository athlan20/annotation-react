import classNames from 'classnames';
import React from 'react';

import { PresetColorKey } from '../variables';
import './tag.less';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  /** backgroudn color */
  color?: PresetColorKey | string;
  closable?: boolean | ({ closeIcon?: React.ReactNode } & React.AriaAttributes);
  /** Advised to use closeIcon instead. */
  closeIcon?: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>((tagProps, ref) => {
  const { className, style, children, color = 'cyan', onClose, ...otherProps } = tagProps;

  const prefixCls = 'anno_tag';

  const mergedCls = classNames(className, prefixCls, {});

  const mergedStyle: React.CSSProperties = {
    backgroundColor: color,
    ...style,
  };

  return (
    <span ref={ref} className={mergedCls} style={mergedStyle} {...otherProps}>
      {children}
    </span>
  );
});
