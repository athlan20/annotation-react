# Annotation-React

This Component provides a React component that allows users to annotate article , like below:

![PixPin_2024-07-11_10-31-26](https://github.com/athlan20/annotation-react/assets/2987056/2cd02c10-ef7c-47f3-b61d-173e22cee41b)

## Install

```
npm i annotation-react
```

## Basic Usage

```typescript
import React from "react";
import { Annotation } from "annotation-react";
import { createRoot } from "react-dom/client";
import "annotation-react/dist/style.css";

createRoot(document.getElementById("app")!).render(
  <Annotation
    onChange={(annos) => {
      console.log({ annos });
    }}
    tags={[{ content: "error" }, { content: "success" }]}
    sentence="A story is a component with a set of arguments that define how the component should render."
  />
);
```

## The definition of Prop:

```typescript
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
```
