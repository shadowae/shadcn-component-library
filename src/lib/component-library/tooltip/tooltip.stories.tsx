import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './tooltip';
import { Button } from '../button/button';
import { InfoIcon } from 'lucide-react';

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    delay: {
      control: 'number',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip content="This is a tooltip" {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: (args) => (
    <Tooltip content="More information" {...args}>
      <InfoIcon className="h-5 w-5 text-blue-500" />
    </Tooltip>
  ),
};

export const Top: Story = {
  args: {
    position: 'top',
  },
  render: (args) => (
    <Tooltip content="Tooltip on top" {...args}>
      <Button variant="outline">Top</Button>
    </Tooltip>
  ),
};

export const Right: Story = {
  args: {
    position: 'right',
  },
  render: (args) => (
    <Tooltip content="Tooltip on right" {...args}>
      <Button variant="outline">Right</Button>
    </Tooltip>
  ),
};

export const Bottom: Story = {
  args: {
    position: 'bottom',
  },
  render: (args) => (
    <Tooltip content="Tooltip on bottom" {...args}>
      <Button variant="outline">Bottom</Button>
    </Tooltip>
  ),
};

export const Left: Story = {
  args: {
    position: 'left',
  },
  render: (args) => (
    <Tooltip content="Tooltip on left" {...args}>
      <Button variant="outline">Left</Button>
    </Tooltip>
  ),
};

export const WithHTML: Story = {
  render: (args) => (
    <Tooltip
      content={
        <div>
          <strong>Rich content</strong>
          <p>You can use HTML in tooltips</p>
        </div>
      }
      {...args}
    >
      <Button>Complex Tooltip</Button>
    </Tooltip>
  ),
};