/**
 * how to show the tag of annotation
 */
export interface TTag {
  content: string;
  color?: string;
  shortcut?: string;
  /**user define the type of annotation,each tag must be different */
  // type: any;
}

/**
 * the detail of the one annotation
 */
export interface TAnnoDetail {
  /**the selected text */
  text: string;
  /**start of the whole content */
  start: number;
  /**end of the whole content */
  end: number;

  tag?: TTag;
}
