import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FileUpload } from './file-upload';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../card/card';
import { Button } from '../button/button';

const meta = {
  title: 'Form/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
    },
    preview: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Upload File',
    className: 'w-[400px]',
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        {...args}
        onChange={setFiles}
        onClear={() => setFiles([])}
      />
    );
  },
};

export const WithAcceptedFormats: Story = {
  args: {
    label: 'Upload Images',
    accept: 'image/*',
    helperText: 'Only image files are accepted',
    className: 'w-[400px]',
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        {...args}
        onChange={setFiles}
        onClear={() => setFiles([])}
      />
    );
  },
};

export const MultipleFiles: Story = {
  args: {
    label: 'Upload Documents',
    multiple: true,
    accept: '.pdf,.doc,.docx',
    helperText: 'Upload multiple PDF or Word documents',
    className: 'w-[400px]',
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        {...args}
        onChange={setFiles}
        onClear={() => setFiles([])}
      />
    );
  },
};

export const WithMaxSize: Story = {
  args: {
    label: 'Upload File (Max 5MB)',
    maxSize: 5 * 1024 * 1024, // 5MB in bytes
    helperText: 'Maximum file size: 5MB',
    className: 'w-[400px]',
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        {...args}
        onChange={setFiles}
        onClear={() => setFiles([])}
      />
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Upload File',
    error: true,
    errorMessage: 'Please upload a valid file',
    className: 'w-[400px]',
  },
  render: (args) => {
    const [files, setFiles] = useState<File[]>([]);
    return (
      <FileUpload
        {...args}
        onChange={setFiles}
        onClear={() => setFiles([])}
      />
    );
  },
};

export const WithFormSubmission: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
      // In a real app, you would handle file upload here
    };
    
    return (
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>File Upload Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FileUpload
              label="Upload Documents"
              multiple
              accept=".pdf,.jpg,.png"
              helperText="Upload PDF or image files"
              onChange={setFiles}
              onClear={() => setFiles([])}
            />
            
            <Button type="submit" disabled={files.length === 0}>
              Upload {files.length > 0 && `(${files.length} file${files.length > 1 ? 's' : ''})`}
            </Button>
          </form>
        </CardContent>
        {submitted && (
          <CardFooter className="flex-col items-start">
            <div className="text-sm font-medium">Files ready for upload:</div>
            <div className="w-full mt-2 space-y-1">
              {files.map((file, index) => (
                <div key={index} className="text-xs bg-gray-100 p-2 rounded flex justify-between">
                  <span>{file.name}</span>
                  <span>{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    );
  },
};