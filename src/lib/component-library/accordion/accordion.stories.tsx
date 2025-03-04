import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem } from './accordion';

const meta = {
  title: 'Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[500px]">
      <Accordion>
        <AccordionItem title="What is this component library?">
          <p>
            This is a lightweight, composable UI component library built with React, 
            TypeScript, and Tailwind CSS. It provides a set of reusable components 
            that are easy to customize and integrate into your projects.
          </p>
        </AccordionItem>
        <AccordionItem title="How do I install it?">
          <p>
            You can install the component library using npm or yarn:
          </p>
          <pre className="bg-gray-100 p-2 rounded mt-2 text-sm">
            npm install my-component-library
          </pre>
        </AccordionItem>
        <AccordionItem title="Is it customizable?">
          <p>
            Yes, all components are built with Tailwind CSS and use CSS variables 
            for theming. You can customize the appearance by:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Modifying the Tailwind configuration</li>
            <li>Overriding CSS variables</li>
            <li>Using the className prop to add custom styles</li>
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <div className="w-[500px]">
      <Accordion>
        <AccordionItem title="First item (closed by default)">
          <p>This accordion item is closed by default.</p>
        </AccordionItem>
        <AccordionItem title="Second item (open by default)" defaultOpen>
          <p>This accordion item is open by default.</p>
          <p className="mt-2">It contains multiple paragraphs of content.</p>
        </AccordionItem>
        <AccordionItem title="Third item (closed by default)">
          <p>This accordion item is closed by default.</p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithDisabledItem: Story = {
  render: () => (
    <div className="w-[500px]">
      <Accordion>
        <AccordionItem title="Available item">
          <p>This accordion item can be toggled.</p>
        </AccordionItem>
        <AccordionItem title="Disabled item" disabled>
          <p>This accordion item is disabled and cannot be toggled.</p>
        </AccordionItem>
        <AccordionItem title="Another available item">
          <p>This accordion item can also be toggled.</p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithCustomStyling: Story = {
  render: () => (
    <div className="w-[500px]">
      <Accordion className="rounded-lg border">
        <AccordionItem 
          title={<span className="text-primary font-bold">Custom Title Styling</span>}
          titleClassName="bg-gray-50 px-4"
          contentClassName="px-4"
        >
          <p>This accordion item has custom styling applied to the title and content.</p>
        </AccordionItem>
        <AccordionItem 
          title={<span className="text-green-600 font-bold">Another Custom Title</span>}
          titleClassName="bg-gray-50 px-4"
          contentClassName="px-4"
        >
          <p>This accordion item also has custom styling.</p>
        </AccordionItem>
        <AccordionItem 
          title={<span className="text-blue-600 font-bold">Third Custom Title</span>}
          titleClassName="bg-gray-50 px-4"
          contentClassName="px-4"
        >
          <p>This is the third accordion item with custom styling.</p>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithComplexContent: Story = {
  render: () => (
    <div className="w-[500px]">
      <Accordion>
        <AccordionItem title="Accordion with form elements">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input 
                id="name" 
                type="text" 
                className="w-full rounded-md border border-gray-300 p-2 text-sm" 
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input 
                id="email" 
                type="email" 
                className="w-full rounded-md border border-gray-300 p-2 text-sm" 
                placeholder="Enter your email"
              />
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-md text-sm">
              Submit
            </button>
          </div>
        </AccordionItem>
        <AccordionItem title="Accordion with a list">
          <ul className="space-y-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <li key={item} className="flex items-center space-x-2">
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span>List item {item}</span>
              </li>
            ))}
          </ul>
        </AccordionItem>
        <AccordionItem title="Accordion with a table">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">Role</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">John Doe</td>
                  <td className="py-2">Developer</td>
                  <td className="py-2">Active</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Jane Smith</td>
                  <td className="py-2">Designer</td>
                  <td className="py-2">Active</td>
                </tr>
                <tr>
                  <td className="py-2">Bob Johnson</td>
                  <td className="py-2">Manager</td>
                  <td className="py-2">Inactive</td>
                </tr>
              </tbody>
            </table>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};