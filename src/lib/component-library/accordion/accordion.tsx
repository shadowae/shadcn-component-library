import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export const AccordionItem = ({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  className,
  titleClassName,
  contentClassName,
}: AccordionItemProps) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = React.useState<number | undefined>(
    defaultOpen ? undefined : 0
  );

  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={cn(
        "border-b",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        onClick={toggleAccordion}
        className={cn(
          "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline",
          disabled && "cursor-not-allowed",
          titleClassName
        )}
        disabled={disabled}
        aria-expanded={isOpen}
      >
        {title}
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        ref={contentRef}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          contentClassName
        )}
        style={{ height: contentHeight }}
        aria-hidden={!isOpen}
      >
        <div className="pb-4 pt-0">{children}</div>
      </div>
    </div>
  );
};

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("divide-y divide-border", className)} {...props}>
        {children}
      </div>
    );
  }
);
Accordion.displayName = "Accordion";