import type { Meta, StoryObj } from '@storybook/react';
import { Section } from './section';
import { Card, CardContent } from '../card/card';

const meta = {
  title: 'Layout/Section',
  component: Section,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Section Title',
    description: 'This is a description for the section that provides more context about the content.',
  },
  render: (args) => (
    <Section {...args}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Card {i}</h3>
              <p>This is some sample content for card {i}.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  ),
};

export const WithCustomStyles: Story = {
  args: {
    title: 'Custom Styled Section',
    description: 'This section has custom styling applied to various elements.',
    headerClassName: "mb-12",
    titleClassName: "text-4xl text-primary",
    descriptionClassName: "text-xl italic",
    contentClassName: "bg-gray-50 p-8 rounded-lg",
  },
  render: (args) => (
    <Section {...args}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Feature {i}</h3>
              <p>This is a description of feature {i}.</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  ),
};

export const FullWidth: Story = {
  args: {
    title: 'Full Width Section',
    description: 'This section spans the full width of the viewport without container constraints.',
    fullWidth: true,
  },
  render: (args) => (
    <Section {...args}>
      <div className="bg-primary/10 p-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Full Width Content</h3>
        <p>This content spans the full width of the section without container constraints.</p>
      </div>
    </Section>
  ),
};

export const WithoutHeader: Story = {
  render: () => (
    <Section>
      <div className="bg-gray-100 p-8 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">Section Without Header</h3>
        <p>This section doesn't have a title or description.</p>
      </div>
    </Section>
  ),
};

export const NestedSections: Story = {
  render: () => (
    <Section 
      title="Parent Section" 
      description="This section contains nested sections"
    >
      <div className="space-y-8">
        <Section 
          title="Nested Section 1" 
          description="First nested section"
          className="bg-gray-50 rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p>Nested content {i}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
        
        <Section 
          title="Nested Section 2" 
          description="Second nested section"
          className="bg-gray-50 rounded-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <p>More nested content {i}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </div>
    </Section>
  ),
};