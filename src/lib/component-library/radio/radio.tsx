import * as React from "react";
import { cn } from "@/lib/utils";

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  orientation?: "horizontal" | "vertical";
  error?: boolean;
  errorMessage?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, options, value, onChange, name, orientation = "vertical", error, errorMessage, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    return (
      <div
        ref={ref}
        className={cn(
          "space-y-2",
          orientation === "horizontal" && "flex space-y-0 space-x-4",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-start space-x-2">
            <div className="flex items-center h-5">
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={handleChange}
                disabled={option.disabled}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
              />
            </div>
            <div className="ml-2 text-sm">
              <label
                htmlFor={`${name}-${option.value}`}
                className={cn(
                  "font-medium text-gray-900",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  error && "text-destructive"
                )}
              >
                {option.label}
              </label>
              {option.description && (
                <p className="text-gray-500 text-xs mt-0.5">{option.description}</p>
              )}
            </div>
          </div>
        ))}
        {error && errorMessage && (
          <p className="text-xs text-destructive mt-1">{errorMessage}</p>
        )}
      </div>
    );
  }
);
RadioGroup.displayName = "RadioGroup";

export { RadioGroup };