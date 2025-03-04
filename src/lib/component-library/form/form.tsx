import * as React from "react";
import { useForm, UseFormReturn, SubmitHandler, FieldValues, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

interface FormProps<TFormValues extends FieldValues> {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  schema?: z.ZodType<any, any>;
  defaultValues?: UseFormProps<TFormValues>["defaultValues"];
  mode?: UseFormProps<TFormValues>["mode"];
}

/**
 * Form component that integrates with react-hook-form and zod for validation
 */
export function Form<TFormValues extends FieldValues>({
  className,
  onSubmit,
  children,
  schema,
  defaultValues,
  mode = "onSubmit",
}: FormProps<TFormValues>) {
  const methods = useForm<TFormValues>({
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues,
    mode,
  });

  return (
    <form
      className={cn("space-y-6", className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      noValidate
    >
      {children(methods)}
    </form>
  );
}

interface FormFieldProps {
  name: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
  description?: string;
  error?: string;
}

/**
 * FormField component for wrapping form inputs with labels and error messages
 */
export function FormField({
  name,
  label,
  className,
  children,
  description,
  error,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      {children}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

interface FormSubmitProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

/**
 * FormSubmit component for form submission buttons
 */
export function FormSubmit({
  children,
  className,
  loading,
  disabled,
  ...props
}: FormSubmitProps) {
  return (
    <button
      type="submit"
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export { useForm };