import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  label: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
  tabListClassName?: string;
  tabClassName?: string;
  tabActiveClassName?: string;
  tabDisabledClassName?: string;
  tabPanelClassName?: string;
  onChange?: (value: string) => void;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    className, 
    items, 
    defaultValue, 
    orientation = "horizontal", 
    tabListClassName, 
    tabClassName, 
    tabActiveClassName, 
    tabDisabledClassName, 
    tabPanelClassName, 
    onChange, 
    ...props 
  }, ref) => {
    const [activeTab, setActiveTab] = React.useState<string>(
      defaultValue || (items.length > 0 ? items[0].id : "")
    );

    const handleTabChange = (tabId: string) => {
      setActiveTab(tabId);
      onChange?.(tabId);
    };

    return (
      <div
        ref={ref}
        className={cn(
          orientation === "vertical" ? "flex flex-row" : "flex flex-col",
          className
        )}
        {...props}
      >
        <div
          role="tablist"
          aria-orientation={orientation}
          className={cn(
            orientation === "vertical"
              ? "flex flex-col border-r"
              : "flex border-b",
            tabListClassName
          )}
        >
          {items.map((item) => (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={activeTab === item.id}
              aria-controls={`panel-${item.id}`}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleTabChange(item.id)}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                orientation === "vertical"
                  ? "border-r-2 border-r-transparent pr-6 text-left"
                  : "border-b-2 border-b-transparent",
                activeTab === item.id && [
                  "border-primary",
                  orientation === "vertical"
                    ? "-mr-px border-r-primary"
                    : "border-b-primary",
                  tabActiveClassName,
                ],
                item.disabled && tabDisabledClassName,
                tabClassName
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className={cn("flex-1", orientation === "vertical" && "pl-4")}>
          {items.map((item) => (
            <div
              key={item.id}
              role="tabpanel"
              id={`panel-${item.id}`}
              aria-labelledby={item.id}
              hidden={activeTab !== item.id}
              className={cn(
                "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                tabPanelClassName
              )}
            >
              {activeTab === item.id && item.content}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
Tabs.displayName = "Tabs";