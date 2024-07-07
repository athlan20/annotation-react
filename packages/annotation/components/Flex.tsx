import classNames from 'classnames';
import React from 'react';

import './flex.less';

export interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  vertical?: boolean;
  wrap?: boolean | React.CSSProperties['flexWrap'];
  justify?: React.CSSProperties['justifyContent'];
  align?: React.CSSProperties['alignItems'];
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'] | 'small' | 'middle' | 'large' | undefined;
  children: React.ReactNode;
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>((props, ref) => {
  const {
    className,
    style,
    flex,
    gap,
    children,
    justify = 'normal',
    align = 'normal',
    vertical = false,
    ...otherProps
  } = props;

  const prefixCls = 'anno_flex';

  const mergedCls = classNames(className, prefixCls, {
    [`${prefixCls}_gap_${gap}`]: gap,
    [`${prefixCls}_vertical`]: vertical ? true : false,
  });

  const mergedStyle: React.CSSProperties = { ...style };

  if (flex) {
    mergedStyle.flex = flex;
  }

  if (gap) {
    mergedStyle.gap = gap;
  }

  mergedStyle.justifyContent = justify;
  mergedStyle.alignItems = align;

  console.log({ mergedStyle });

  return (
    <div ref={ref} className={mergedCls} style={mergedStyle} {...otherProps}>
      {children}
    </div>
  );
});
