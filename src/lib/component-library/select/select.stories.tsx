import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './select';

const meta = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
];

export const Default: Story = {
  args: {
    options: countries,
    placeholder: 'Select a country',
    className: 'w-[300px]',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select a country',
    className: 'w-[300px]',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithHelperText: Story = {
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select a country',
    helperText: 'Please select your country of residence',
    className: 'w-[300px]',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select a country',
    error: true,
    helperText: 'This field is required',
    className: 'w-[300px]',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    options: countries,
    label: 'Country',
    placeholder: 'Select a country',
    disabled: true,
    className: 'w-[300px]',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico (Currently Unavailable)', disabled: true },
      { value: 'uk', label: 'United Kingdom' },
    ],
    label: 'Country',
    placeholder: 'Select a country',
    className: 'w-[300px]',
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Select
        {...args}
        value={value}
        onChange={setValue}
      />
    );
  },
};