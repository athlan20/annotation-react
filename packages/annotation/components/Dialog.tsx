import classNames from 'classnames';
import React from 'react';

import './dialog.less';

export interface DialogProps extends React.HTMLAttributes<HTMLElement> {
  /**是否打开 */
  open?: boolean;
  children?: React.ReactNode;
}

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  const { className, style, children, open, ...otherProps } = props;

  const prefixCls = 'anno_dialog';

  const mergedCls = classNames(className, prefixCls, {
    [`${prefixCls}_show`]: open,
  });

  const mergedStyle: React.CSSProperties = {
    ...style,
  };

  return (
    <div ref={ref} className={mergedCls} style={mergedStyle} {...otherProps}>
      {children}
    </div>
  );
});
