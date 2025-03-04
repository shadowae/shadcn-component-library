import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { z } from 'zod';
import { Form, FormField, FormSubmit, useForm } from './form';
import { Input } from '../input/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../card/card';

const meta = {
  title: 'Form/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// Define a schema for form validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: Story = {
  render: () => {
    const [formData, setFormData] = useState<LoginFormValues | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (data: LoginFormValues) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setFormData(data);
        setLoading(false);
      }, 1500);
    };

    return (
      <div className="w-[400px]">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Form<LoginFormValues>
              onSubmit={handleSubmit}
              schema={loginSchema}
              defaultValues={{ email: "", password: "" }}
            >
              {({ register, formState }) => (
                <>
                  <FormField
                    name="email"
                    label="Email"
                    error={formState.errors.email?.message}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      error={!!formState.errors.email}
                    />
                  </FormField>

                  <FormField
                    name="password"
                    label="Password"
                    error={formState.errors.password?.message}
                  >
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      {...register("password")}
                      error={!!formState.errors.password}
                    />
                  </FormField>

                  <FormSubmit loading={loading}>Login</FormSubmit>
                </>
              )}
            </Form>
          </CardContent>
          {formData && (
            <CardFooter className="flex-col items-start">
              <div className="text-sm font-medium">Submitted Data:</div>
              <pre className="text-xs bg-gray-100 p-2 rounded w-full mt-2">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </CardFooter>
          )}
        </Card>
      </div>
    );
  },
};

// Define a schema for a more complex form
const registrationSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

export const RegistrationForm: Story = {
  render: () => {
    const [formData, setFormData] = useState<RegistrationFormValues | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (data: RegistrationFormValues) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setFormData(data);
        setLoading(false);
      }, 1500);
    };

    return (
      <div className="w-[500px]">
        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form<RegistrationFormValues>
              onSubmit={handleSubmit}
              schema={registrationSchema}
              defaultValues={{ 
                firstName: "", 
                lastName: "", 
                email: "", 
                password: "", 
                confirmPassword: "" 
              }}
            >
              {({ register, formState }) => (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      name="firstName"
                      label="First Name"
                      error={formState.errors.firstName?.message}
                    >
                      <Input
                        id="firstName"
                        placeholder="First name"
                        {...register("firstName")}
                        error={!!formState.errors.firstName}
                      />
                    </FormField>

                    <FormField
                      name="lastName"
                      label="Last Name"
                      error={formState.errors.lastName?.message}
                    >
                      <Input
                        id="lastName"
                        placeholder="Last name"
                        {...register("lastName")}
                        error={!!formState.errors.lastName}
                      />
                    </FormField>
                  </div>

                  <FormField
                    name="email"
                    label="Email"
                    error={formState.errors.email?.message}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      error={!!formState.errors.email}
                    />
                  </FormField>

                  <FormField
                    name="password"
                    label="Password"
                    error={formState.errors.password?.message}
                  >
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      {...register("password")}
                      error={!!formState.errors.password}
                    />
                  </FormField>

                  <FormField
                    name="confirmPassword"
                    label="Confirm Password"
                    error={formState.errors.confirmPassword?.message}
                  >
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      {...register("confirmPassword")}
                      error={!!formState.errors.confirmPassword}
                    />
                  </FormField>

                  <FormSubmit loading={loading}>Register</FormSubmit>
                </>
              )}
            </Form>
          </CardContent>
          {formData && (
            <CardFooter className="flex-col items-start">
              <div className="text-sm font-medium">Submitted Data:</div>
              <pre className="text-xs bg-gray-100 p-2 rounded w-full mt-2">
                {JSON.stringify(formData, null, 2)}
              </pre>
            </CardFooter>
          )}
        </Card>
      </div>
    );
  },
};