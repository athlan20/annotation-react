import { sleep } from '../packages/annotation/helpers/helper';
import { TTag } from '../packages/annotation/interface';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';
import { Annotation } from '../packages';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Annotation',
  component: Annotation,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  // args: { onClick: fn() },
} satisfies Meta<typeof Annotation>;

export default meta;
type Story = StoryObj<typeof meta>;

const tags: TTag[] = [
  { content: 'Error', shortcut: '1', color: 'red' },
  { content: 'Correct', shortcut: '2', color: 'green' },
  { content: 'Warning', shortcut: '3', color: 'gold' },
];
const sentence = `A story is a component with a set of arguments that define how the component should render. “Args” are Storybook’s mechanism for defining those arguments in a single JavaScript object. Args can be used to dynamically change props, slots, styles, inputs, etc. It allows Storybook and its addons to live edit components. You do not need to modify your underlying component code to use args.

When an arg’s value changes, the component re-renders, allowing you to interact with components in Storybook’s UI via addons that affect args.

Learn how and why to write stories in the introduction. For details on how args work, read on.`;
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    sentence,
    tags,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 👇 Simulate interactions with the component
    const sentenceLayer = canvas.getByRole('sentence_layer');
    await expect(sentenceLayer.textContent).toBe(sentence);
  },
};

export const AddAnno: Story = {
  args: {
    sentence,
    tags,
    onChange: (annos) => {
      console.log(annos);
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 👇 Simulate interactions with the component
    const operationLayer = canvas.getByRole('operation_layer');
    const bounding = canvas.getByRole('annotation').getBoundingClientRect();
    // select the range of 2-5 of the text in the content layer
    await userEvent.pointer([
      { target: operationLayer, offset: 2, keys: '[MouseLeft>]' },
      { offset: 7 },
      { coords: { clientX: bounding.left + 55, clientY: bounding.top + 10 }, keys: '[/MouseLeft]' },
    ]);

    await sleep(1000);

    await waitFor(() => canvas.getByRole('anno_dialog'));
    await sleep(1000);
    //click the tag in the dialog
    await userEvent.click(canvas.getByRole('anno_dialog').querySelector('span')!);
  },
};

export const DeleteAnno: Story = {
  args: {
    sentence,
    tags,
    annoations: [
      {
        start: 13,
        end: 22,
        tag: tags[0],
        text: 'component',
      },
    ],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 👇 Simulate interactions with the component

    await waitFor(() => canvas.getByRole('anno_tag'));
    await sleep(1000);
    await userEvent.click(canvas.getByRole('anno_tag').querySelector('.anno_icon_close')!);
    expect(canvas.queryByRole('anno_tag')).not.toBeInTheDocument();
  },
};

export const Readonly: Story = {
  args: {
    sentence,
    tags,
    annoations: [
      {
        start: 13,
        end: 22,
        tag: tags[0],
        text: 'component',
      },
    ],
    readonly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 👇 Simulate interactions with the component

    await waitFor(() => canvas.getByRole('anno_tag'));
    await sleep(1000);
    expect(canvas.getByRole('anno_tag').querySelector('.anno_icon_close')).not.toBeInTheDocument();

    const operationLayer = canvas.getByRole('operation_layer');
    const bounding = canvas.getByRole('annotation').getBoundingClientRect();
    await userEvent.pointer([
      { target: operationLayer, offset: 2, keys: '[MouseLeft>]' },
      { offset: 7 },
      { coords: { clientX: bounding.left + 55, clientY: bounding.top + 10 }, keys: '[/MouseLeft]' },
    ]);

    //nothing will happen
    await sleep(500);
    expect(canvas.queryByRole('anno_dialog')).not.toBeInTheDocument();
  },
};
