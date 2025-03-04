import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const meta: Meta<typeof Tabs> = {
	title: 'Components/Tabs',
	component: Tabs,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render: () => (
		<Tabs defaultValue="account" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="account">Account</TabsTrigger>
				<TabsTrigger value="password">Password</TabsTrigger>
				<TabsTrigger value="settings">Settings</TabsTrigger>
			</TabsList>
			<TabsContent value="account">
				<div className="p-4">
					<h3 className="text-lg font-semibold">Account Settings</h3>
					<p className="text-sm text-gray-500">Manage your account preferences here.</p>
				</div>
			</TabsContent>
			<TabsContent value="password">
				<div className="p-4">
					<h3 className="text-lg font-semibold">Password Settings</h3>
					<p className="text-sm text-gray-500">Change your password and security settings.</p>
				</div>
			</TabsContent>
			<TabsContent value="settings">
				<div className="p-4">
					<h3 className="text-lg font-semibold">General Settings</h3>
					<p className="text-sm text-gray-500">Configure your general preferences.</p>
				</div>
			</TabsContent>
		</Tabs>
	),
};

export const Disabled: Story = {
	render: () => (
		<Tabs defaultValue="active" className="w-[400px]">
			<TabsList>
				<TabsTrigger value="active">Active</TabsTrigger>
				<TabsTrigger value="disabled" disabled>
					Disabled
				</TabsTrigger>
				<TabsTrigger value="other">Other</TabsTrigger>
			</TabsList>
			<TabsContent value="active">
				<div className="p-4">
					<h3 className="text-lg font-semibold">Active Tab</h3>
					<p className="text-sm text-gray-500">This is an active tab content.</p>
				</div>
			</TabsContent>
			<TabsContent value="disabled">
				<div className="p-4">
					<p className="text-sm text-gray-500">This content won't be accessible.</p>
				</div>
			</TabsContent>
			<TabsContent value="other">
				<div className="p-4">
					<h3 className="text-lg font-semibold">Other Tab</h3>
					<p className="text-sm text-gray-500">This is another tab content.</p>
				</div>
			</TabsContent>
		</Tabs>
	),
};

export const CustomStyling: Story = {
	render: () => (
		<Tabs defaultValue="tab1" className="w-[400px]">
			<TabsList className="bg-blue-100">
				<TabsTrigger
					value="tab1"
					className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
				>
					Custom Tab 1
				</TabsTrigger>
				<TabsTrigger
					value="tab2"
					className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
				>
					Custom Tab 2
				</TabsTrigger>
			</TabsList>
			<TabsContent value="tab1">
				<div className="p-4 border rounded-lg mt-2">
					<p className="text-sm">Content for custom styled tab 1</p>
				</div>
			</TabsContent>
			<TabsContent value="tab2">
				<div className="p-4 border rounded-lg mt-2">
					<p className="text-sm">Content for custom styled tab 2</p>
				</div>
			</TabsContent>
		</Tabs>
	),
};
