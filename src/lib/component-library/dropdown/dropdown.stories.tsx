import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownItem } from './dropdown';
import { Button } from '../button/button';
import { ChevronDownIcon, UserIcon, SettingsIcon, LogOutIcon } from 'lucide-react';

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Dropdown
      trigger={
        <Button variant="outline">
          Options <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      }
      {...args}
    >
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </Dropdown>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <Dropdown
      trigger={
        <Button variant="outline">
          Account <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      }
      {...args}
    >
      <DropdownItem className="flex items-center">
        <UserIcon className="mr-2 h-4 w-4" /> Profile
      </DropdownItem>
      <DropdownItem className="flex items-center">
        <SettingsIcon className="mr-2 h-4 w-4" /> Settings
      </DropdownItem>
      <DropdownItem className="flex items-center text-destructive hover:text-destructive">
        <LogOutIcon className="mr-2 h-4 w-4" /> Logout
      </DropdownItem>
    </Dropdown>
  ),
};

export const RightAligned: Story = {
  args: {
    align: 'right',
  },
  render: (args) => (
    <Dropdown
      trigger={
        <Button variant="outline">
          Options <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      }
      {...args}
    >
      <DropdownItem>Profile</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Logout</DropdownItem>
    </Dropdown>
  ),
};

export const WithDividers: Story = {
  render: (args) => (
    <Dropdown
      trigger={
        <Button variant="outline">
          Menu <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
      }
      {...args}
    >
      <DropdownItem>Edit</DropdownItem>
      <DropdownItem>Duplicate</DropdownItem>
      <div className="my-1 h-px bg-gray-200"></div>
      <DropdownItem>Archive</DropdownItem>
      <div className="my-1 h-px bg-gray-200"></div>
      <DropdownItem className="text-destructive hover:text-destructive">Delete</DropdownItem>
    </Dropdown>
  ),
};