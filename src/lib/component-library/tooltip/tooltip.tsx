import * as React from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  className?: string;
  delay?: number;
}

const Tooltip = ({
  content,
  children,
  position = "top",
  className,
  delay = 300,
}: TooltipProps) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 -translate-y-2 mb-2",
    right: "left-full top-1/2 -translate-y-1/2 translate-x-2 ml-2",
    bottom: "top-full left-1/2 -translate-x-1/2 translate-y-2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 -translate-x-2 mr-2",
  };

  const arrowPositionClasses = {
    top: "bottom-[-6px] left-1/2 -translate-x-1/2 border-t-black border-l-transparent border-r-transparent border-b-transparent",
    right: "left-[-6px] top-1/2 -translate-y-1/2 border-r-black border-t-transparent border-b-transparent border-l-transparent",
    bottom: "top-[-6px] left-1/2 -translate-x-1/2 border-b-black border-l-transparent border-r-transparent border-t-transparent",
    left: "right-[-6px] top-1/2 -translate-y-1/2 border-l-black border-t-transparent border-b-transparent border-r-transparent",
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsMounted(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsVisible(false);
    setTimeout(() => {
      setIsMounted(false);
    }, 200);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isMounted && (
        <div
          className={cn(
            "absolute z-50 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity duration-200",
            positionClasses[position],
            isVisible && "opacity-90",
            className
          )}
        >
          {content}
          <span
            className={cn(
              "absolute h-0 w-0 border-4",
              arrowPositionClasses[position]
            )}
          />
        </div>
      )}
    </div>
  );
};

export { Tooltip };