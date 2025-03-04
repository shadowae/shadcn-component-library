import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './navbar';
import { Button } from '../button/button';

const meta = {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    sticky: {
      control: 'boolean',
    },
    transparent: {
      control: 'boolean',
    },
    mobileBreakpoint: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logo: <div className="text-xl font-bold">Logo</div>,
    items: [
      { label: 'Home', href: '#', active: true },
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    rightSection: (
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">Log in</Button>
        <Button size="sm">Sign up</Button>
      </div>
    ),
  },
};

export const WithDropdowns: Story = {
  args: {
    logo: <div className="text-xl font-bold">Logo</div>,
    items: [
      { label: 'Home', href: '#', active: true },
      { 
        label: 'Products', 
        children: [
          { label: 'Product 1', href: '#' },
          { label: 'Product 2', href: '#' },
          { label: 'Product 3', href: '#' },
        ]
      },
      { 
        label: 'Services', 
        children: [
          { label: 'Consulting', href: '#' },
          { label: 'Development', href: '#' },
          { label: 'Support', href: '#' },
        ]
      },
      { label: 'Pricing', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    rightSection: (
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">Log in</Button>
        <Button size="sm">Sign up</Button>
      </div>
    ),
  },
};

export const WithDisabledItems: Story = {
  args: {
    logo: <div className="text-xl font-bold">Logo</div>,
    items: [
      { label: 'Home', href: '#', active: true },
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'About', href: '#', disabled: true },
      { 
        label: 'Resources', 
        children: [
          { label: 'Documentation', href: '#' },
          { label: 'API Reference', href: '#', disabled: true },
          { label: 'Tutorials', href: '#' },
        ]
      },
    ],
    rightSection: (
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">Log in</Button>
        <Button size="sm">Sign up</Button>
      </div>
    ),
  },
};

export const Transparent: Story = {
  args: {
    logo: <div className="text-xl font-bold">Logo</div>,
    items: [
      { label: 'Home', href: '#', active: true },
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    rightSection: (
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">Log in</Button>
        <Button size="sm">Sign up</Button>
      </div>
    ),
    transparent: true,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const WithCustomLogo: Story = {
  args: {
    logo: (
      <div className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        <span className="text-xl font-bold">CompanyName</span>
      </div>
    ),
    items: [
      { label: 'Home', href: '#', active: true },
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    rightSection: (
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">Log in</Button>
        <Button size="sm">Sign up</Button>
      </div>
    ),
  },
};

export const WithOnClickHandlers: Story = {
  render: (args) => {
    const handleItemClick = (itemName: string) => {
      alert(`Clicked on ${itemName}`);
    };
    
    return (
      <Navbar
        {...args}
        logo={<div className="text-xl font-bold">Logo</div>}
        items={[
          { 
            label: 'Home', 
            onClick: () => handleItemClick('Home'),
            active: true 
          },
          { 
            label: 'Features', 
            onClick: () => handleItemClick('Features')
          },
          { 
            label: 'Dropdown', 
            children: [
              { 
                label: 'Option 1', 
                onClick: () => handleItemClick('Option 1')
              },
              { 
                label: 'Option 2', 
                onClick: () => handleItemClick('Option 2')
              },
            ]
          },
          { 
            label: 'Contact', 
            onClick: () => handleItemClick('Contact')
          },
        ]}
        rightSection={
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleItemClick('Log in')}
            >
              Log in
            </Button>
            <Button 
              size="sm"
              onClick={() => handleItemClick('Sign up')}
            >
              Sign up
            </Button>
          </div>
        }
      />
    );
  },
};