import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from './radio';

const meta = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    name: 'radio-group',
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithDescriptions: Story = {
  args: {
    name: 'plan-selection',
    options: [
      { 
        value: 'free', 
        label: 'Free Plan', 
        description: 'Basic features for individuals' 
      },
      { 
        value: 'pro', 
        label: 'Pro Plan', 
        description: 'Advanced features for professionals' 
      },
      { 
        value: 'enterprise', 
        label: 'Enterprise Plan', 
        description: 'Complete solution for organizations' 
      },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState('free');
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Horizontal: Story = {
  args: {
    name: 'horizontal-radio',
    options: defaultOptions,
    orientation: 'horizontal',
  },
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  args: {
    name: 'disabled-options',
    options: [
      { value: 'option1', label: 'Available Option' },
      { value: 'option2', label: 'Disabled Option', disabled: true },
      { value: 'option3', label: 'Another Option' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    name: 'error-radio',
    options: defaultOptions,
    error: true,
    errorMessage: 'Please select an option',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <RadioGroup
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};