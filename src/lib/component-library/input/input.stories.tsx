import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    helperText: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
    className: 'w-[300px]',
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="Enter your email" className="w-[300px]" {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    className: 'w-[300px]',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter text here',
    error: true,
    helperText: 'This field is required',
    className: 'w-[300px]',
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: 'Enter your password',
    type: 'password',
    helperText: 'Password must be at least 8 characters',
    className: 'w-[300px]',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    className: 'w-[300px]',
  },
};