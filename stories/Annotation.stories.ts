import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
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

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalStory: Story = {
  args: {
    content: 'This is an annotation',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 👇 Simulate interactions with the component
    const contentLayer = canvas.getByRole('content_layer');
    await expect(contentLayer.textContent).toBe('This is an annotation');

    // select the range of 2-5 of the text in the content layer
    await userEvent.pointer([
      { target: contentLayer, offset: 2, keys: '[MouseLeft>]' },
      { offset: 5 },
      '[/MouseLeft]',
    ]);
  },
};
