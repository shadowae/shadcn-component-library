import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  fullWidth?: boolean;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    title, 
    description, 
    headerClassName, 
    contentClassName, 
    titleClassName, 
    descriptionClassName, 
    fullWidth = false,
    children, 
    ...props 
  }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("py-8 md:py-12", className)}
        {...props}
      >
        <div className={cn(!fullWidth && "container mx-auto px-4")}>
          {(title || description) && (
            <div className={cn("mb-8 text-center", headerClassName)}>
              {title && (
                <h2 className={cn("text-3xl font-bold tracking-tight", titleClassName)}>
                  {title}
                </h2>
              )}
              {description && (
                <p className={cn("mt-4 text-lg text-muted-foreground", descriptionClassName)}>
                  {description}
                </p>
              )}
            </div>
          )}
          <div className={contentClassName}>{children}</div>
        </div>
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section };