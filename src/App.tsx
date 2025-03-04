import { useState } from 'react';
import './App.css';
import { Button } from './lib/component-library/button/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './lib/component-library/card/card';
import { Input } from './lib/component-library/input/input';
import { Alert, AlertTitle, AlertDescription } from './lib/component-library/alert/alert';
import { Badge } from './lib/component-library/badge/badge';
import { Avatar, AvatarImage, AvatarFallback } from './lib/component-library/avatar/avatar';
import { Dropdown, DropdownItem } from './lib/component-library/dropdown/dropdown';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './lib/component-library/modal/modal';
import { Tooltip } from './lib/component-library/tooltip/tooltip';
import { CheckCircleIcon, InfoIcon, ChevronDownIcon } from 'lucide-react';

// New components
import { Navbar } from './lib/component-library/navbar/navbar';
import { Section } from './lib/component-library/section/section';
import { Tabs } from './lib/component-library/tabs/tabs';
import { Accordion, AccordionItem } from './lib/component-library/accordion/accordion';
import { Form, FormField, FormSubmit } from './lib/component-library/form/form';
import { Checkbox } from './lib/component-library/checkbox/checkbox';
import { RadioGroup } from './lib/component-library/radio/radio';
import { Select } from './lib/component-library/select/select';
import { FileUpload } from './lib/component-library/file-upload/file-upload';
import { z } from 'zod';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('buttons');
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const formSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
  });

  const handleFormSubmit = (data: any) => {
    alert(`Form submitted with: ${JSON.stringify(data)}`);
  };

  return (
    <>
      <Navbar
        logo={
          <div className="flex items-center space-x-2">
            <InfoIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">UI Library</span>
          </div>
        }
        items={[
          { label: 'Home', href: '#', active: true },
          { label: 'Components', href: '#' },
          { label: 'Documentation', href: '#' },
          { label: 'About', href: '#' },
        ]}
        rightSection={
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">Log in</Button>
            <Button size="sm">Sign up</Button>
          </div>
        }
        sticky
      />

      <Section
        title="UI Component Library Demo"
        description="A lightweight, composable UI component library built with React, TypeScript, and Tailwind CSS."
        className="pt-16"
      >
        <Tabs
          items={[
            {
              id: 'buttons',
              label: 'Basic Components',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Buttons</CardTitle>
                      <CardDescription>Various button styles and variants</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Inputs</CardTitle>
                      <CardDescription>Form input elements</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Input placeholder="Default input" />
                      <Input placeholder="Disabled input" disabled />
                      <Input placeholder="With error" error helperText="This field is required" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Alerts</CardTitle>
                      <CardDescription>Notification components</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Alert>
                        <AlertTitle>Information</AlertTitle>
                        <AlertDescription>This is a default alert.</AlertDescription>
                      </Alert>
                      <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>Something went wrong.</AlertDescription>
                      </Alert>
                      <Alert variant="success">
                        <CheckCircleIcon className="h-4 w-4" />
                        <AlertTitle>Success</AlertTitle>
                        <AlertDescription>Your changes have been saved.</AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Badges</CardTitle>
                      <CardDescription>Status indicators</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="info">Info</Badge>
                    </CardContent>
                  </Card>
                </div>
              ),
            },
            {
              id: 'advanced',
              label: 'Advanced Components',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Avatars</CardTitle>
                      <CardDescription>User profile pictures</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                      <Avatar size="sm">
                        <AvatarImage src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80" alt="Avatar" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?&w=128&h=128&dpr=2&q=80" alt="Avatar" />
                        <AvatarFallback>SR</AvatarFallback>
                      </Avatar>
                      <Avatar size="lg">
                        <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=128&h=128&dpr=2&q=80" alt="Avatar" />
                        <AvatarFallback>MK</AvatarFallback>
                      </Avatar>
                      <Avatar size="xl">
                        <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
                      </Avatar>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Interactive Components</CardTitle>
                      <CardDescription>Dropdowns, modals, and tooltips</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                      <Dropdown
                        trigger={
                          <Button variant="outline">
                            Menu <ChevronDownIcon className="ml-2 h-4 w-4" />
                          </Button>
                        }
                      >
                        <DropdownItem>Profile</DropdownItem>
                        <DropdownItem>Settings</DropdownItem>
                        <div className="my-1 h-px bg-gray-200"></div>
                        <DropdownItem className="text-destructive">Logout</DropdownItem>
                      </Dropdown>

                      <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <ModalHeader>Example Modal</ModalHeader>
                        <ModalBody>
                          <p>This is an example modal dialog. You can put any content here.</p>
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={() => setIsModalOpen(false)}>Continue</Button>
                        </ModalFooter>
                      </Modal>

                      <Tooltip content="This is a helpful tooltip">
                        <Button variant="ghost" className="p-2">
                          <InfoIcon className="h-5 w-5" />
                        </Button>
                      </Tooltip>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Accordion</CardTitle>
                      <CardDescription>Collapsible content sections</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion>
                        <AccordionItem title="What is this component library?">
                          <p>A lightweight, composable UI component library built with React, TypeScript, and Tailwind CSS.</p>
                        </AccordionItem>
                        <AccordionItem title="Is it customizable?">
                          <p>Yes, all components are built with Tailwind CSS and can be easily customized.</p>
                        </AccordionItem>
                        <AccordionItem title="How do I get started?">
                          <p>Import the components you need and start building your UI.</p>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Tabs</CardTitle>
                      <CardDescription>Tabbed interface for organizing content</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Tabs
                        items={[
                          {
                            id: 'tab1',
                            label: 'First Tab',
                            content: <p className="p-4">This is the content for the first tab.</p>,
                          },
                          {
                            id: 'tab2',
                            label: 'Second Tab',
                            content: <p className="p-4">This is the content for the second tab.</p>,
                          },
                          {
                            id: 'tab3',
                            label: 'Third Tab',
                            content: <p className="p-4">This is the content for the third tab.</p>,
                          },
                        ]}
                      />
                    </CardContent>
                  </Card>
                </div>
              ),
            },
            {
              id: 'forms',
              label: 'Form Components',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Form with Validation</CardTitle>
                      <CardDescription>Form with Zod validation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form
                        schema={formSchema}
                        onSubmit={handleFormSubmit}
                        defaultValues={{ name: '', email: '' }}
                      >
                        {({ register, formState }) => (
                          <>
                            <FormField
                              name="name"
                              label="Name"
                              error={formState.errors.name?.message}
                            >
                              <Input
                                {...register('name')}
                                placeholder="Enter your name"
                                error={!!formState.errors.name}
                              />
                            </FormField>
                            <FormField
                              name="email"
                              label="Email"
                              error={formState.errors.email?.message}
                            >
                              <Input
                                {...register('email')}
                                type="email"
                                placeholder="Enter your email"
                                error={!!formState.errors.email}
                              />
                            </FormField>
                            <FormSubmit>Submit</FormSubmit>
                          </>
                        )}
                      </Form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Form Controls</CardTitle>
                      <CardDescription>Various form control components</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Checkbox</label>
                        <Checkbox
                          label="Accept terms and conditions"
                          checked={checkboxValue}
                          onChange={(e) => setCheckboxValue(e.target.checked)}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Radio Group</label>
                        <RadioGroup
                          name="options"
                          options={[
                            { value: 'option1', label: 'Option 1' },
                            { value: 'option2', label: 'Option 2' },
                            { value: 'option3', label: 'Option 3' },
                          ]}
                          value={radioValue}
                          onChange={setRadioValue}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select</label>
                        <Select
                          options={[
                            { value: 'us', label: 'United States' },
                            { value: 'ca', label: 'Canada' },
                            { value: 'mx', label: 'Mexico' },
                            { value: 'uk', label: 'United Kingdom' },
                          ]}
                          placeholder="Select a country"
                          value={selectValue}
                          onChange={setSelectValue}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>File Upload</CardTitle>
                      <CardDescription>Upload files with drag and drop support</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FileUpload
                        label="Upload Files"
                        accept=".jpg,.png,.pdf"
                        multiple
                        helperText="Accepted formats: JPG, PNG, PDF"
                        maxSize={5 * 1024 * 1024} // 5MB
                        onChange={setFiles}
                        onClear={() => setFiles([])}
                      />
                    </CardContent>
                    {files.length > 0 && (
                      <CardFooter className="flex-col items-start">
                        <div className="text-sm font-medium">Selected Files:</div>
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
                </div>
              ),
            },
          ]}
          defaultValue={activeTab}
          onChange={setActiveTab}
        />
      </Section>
    </>
  );
}

export default App;