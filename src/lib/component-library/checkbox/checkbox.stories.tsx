import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './checkbox';

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Marketing emails',
    description: 'Receive emails about new products, features, and more.',
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Required field',
    error: true,
    errorMessage: 'This field is required',
  },
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);

    const handleChange = (value: string) => {
      setSelected((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    };

    return (
      <div className="space-y-2">
        <div className="text-sm font-medium mb-2">Select your interests:</div>
        <Checkbox
          label="Technology"
          checked={selected.includes('technology')}
          onChange={() => handleChange('technology')}
        />
        <Checkbox
          label="Design"
          checked={selected.includes('design')}
          onChange={() => handleChange('design')}
        />
        <Checkbox
          label="Business"
          checked={selected.includes('business')}
          onChange={() => handleChange('business')}
        />
        <Checkbox
          label="Marketing"
          checked={selected.includes('marketing')}
          onChange={() => handleChange('marketing')}
        />
        
        {selected.length > 0 && (
          <div className="mt-4 text-sm">
            Selected: {selected.join(', ')}
          </div>
        )}
      </div>
    );
  },
};