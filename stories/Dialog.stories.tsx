import { Dialog } from '@/annotation/components/Dialog';
import { Flex } from '@/annotation/components/Flex';
import { Tag } from '@/annotation/components/tag';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Dialog',
  component: Dialog,
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
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Function to emulate pausing between interactions
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const NormalStory: Story = {
  args: {
    open: false,
    children: (
      <Flex vertical gap="small">
        <Tag>tag1</Tag>
        <Tag color='purple'>tag2</Tag>
        <Tag color='blue'>tag3</Tag>
        <Tag>tag4</Tag>
        <Tag>tag5</Tag>
      </Flex>
    ),
    // content: 'This is an annotation',
  },
  render: (_args) =>
    (function () {
      const [args, setArgs] = useState(_args);

      return (
        <Flex vertical justify="center" align="center" gap="large">
          <Dialog {...args} />
          <Button label="open" onClick={() => setArgs({ ...args, open: true })} />
        </Flex>
      );
    })(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 👇 Simulate interactions with the component

    //default is display:none;
    await expect(canvas.getByText('tag1')).not.toBeVisible();

    //then open it
    await userEvent.click(canvas.getByText('open'));
    await expect(canvas.getByText('tag1')).toBeVisible();
  },
};
