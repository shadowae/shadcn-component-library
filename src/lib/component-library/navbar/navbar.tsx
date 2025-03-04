import * as React from "react";
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";

export interface NavItem {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  children?: NavItem[];
}

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  items?: NavItem[];
  rightSection?: React.ReactNode;
  sticky?: boolean;
  transparent?: boolean;
  mobileBreakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
}

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ 
    className, 
    logo, 
    items = [], 
    rightSection, 
    sticky = false, 
    transparent = false, 
    mobileBreakpoint = "md", 
    ...props 
  }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    const breakpointMap = {
      sm: "sm:flex",
      md: "md:flex",
      lg: "lg:flex",
      xl: "xl:flex",
      "2xl": "2xl:flex",
    };

    const hiddenBreakpointMap = {
      sm: "sm:hidden",
      md: "md:hidden",
      lg: "lg:hidden",
      xl: "xl:hidden",
      "2xl": "2xl:hidden",
    };

    return (
      <nav
        ref={ref}
        className={cn(
          "w-full py-4 px-4 md:px-6",
          sticky && "sticky top-0 z-40",
          transparent ? "bg-transparent" : "bg-background border-b",
          className
        )}
        {...props}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo */}
            {logo && <div className="flex-shrink-0">{logo}</div>}

            {/* Desktop Navigation */}
            <div className={cn("hidden space-x-6", breakpointMap[mobileBreakpoint])}>
              {items.map((item, index) => (
                <NavbarItem key={index} item={item} />
              ))}
            </div>

            {/* Right Section (e.g., buttons, user menu) */}
            {rightSection && (
              <div className={cn("hidden", breakpointMap[mobileBreakpoint])}>
                {rightSection}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className={cn("p-2 rounded-md", hiddenBreakpointMap[mobileBreakpoint])}
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className={cn("pt-4 pb-3 space-y-1", breakpointMap[mobileBreakpoint])}>
              {items.map((item, index) => (
                <MobileNavItem key={index} item={item} />
              ))}
              {rightSection && (
                <div className="pt-4 border-t mt-4">{rightSection}</div>
              )}
            </div>
          )}
        </div>
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";

interface NavbarItemProps {
  item: NavItem;
}

const NavbarItem = ({ item }: NavbarItemProps) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleDropdown = () => {
    if (hasChildren) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    }
    if (hasChildren) {
      toggleDropdown();
    }
  };

  return (
    <div className="relative inline-block">
      {item.href ? (
        <a
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active && "text-primary",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={item.disabled ? undefined : handleClick}
          aria-disabled={item.disabled}
        >
          {item.label}
          {hasChildren && (
            <span className="ml-1">▼</span>
          )}
        </a>
      ) : (
        <button
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            item.active && "text-primary",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={item.disabled ? undefined : handleClick}
          disabled={item.disabled}
        >
          {item.label}
          {hasChildren && (
            <span className="ml-1">▼</span>
          )}
        </button>
      )}

      {/* Dropdown Menu */}
      {hasChildren && dropdownOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {item.children?.map((child, index) => (
              <div key={index} className="block px-4 py-2 text-sm">
                {child.href ? (
                  <a
                    href={child.href}
                    className={cn(
                      "block text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      child.active && "bg-gray-100 text-gray-900",
                      child.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={child.disabled ? undefined : child.onClick}
                    aria-disabled={child.disabled}
                  >
                    {child.label}
                  </a>
                ) : (
                  <button
                    className={cn(
                      "block w-full text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      child.active && "bg-gray-100 text-gray-900",
                      child.disabled && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={child.disabled ? undefined : child.onClick}
                    disabled={child.disabled}
                  >
                    {child.label}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MobileNavItem = ({ item }: NavbarItemProps) => {
  const [subMenuOpen, setSubMenuOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const toggleSubMenu = () => {
    if (hasChildren) {
      setSubMenuOpen(!subMenuOpen);
    }
  };

  const handleClick = () => {
    if (item.onClick) {
      item.onClick();
    }
    if (hasChildren) {
      toggleSubMenu();
    }
  };

  return (
    <div>
      {item.href ? (
        <a
          href={item.href}
          className={cn(
            "block py-2 px-3 text-base font-medium rounded-md hover:bg-gray-100",
            item.active && "bg-gray-100",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={item.disabled ? undefined : handleClick}
          aria-disabled={item.disabled}
        >
          <div className="flex items-center justify-between">
            {item.label}
            {hasChildren && (
              <span className={cn("transition-transform", subMenuOpen && "rotate-180")}>▼</span>
            )}
          </div>
        </a>
      ) : (
        <button
          className={cn(
            "block w-full text-left py-2 px-3 text-base font-medium rounded-md hover:bg-gray-100",
            item.active && "bg-gray-100",
            item.disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={item.disabled ? undefined : handleClick}
          disabled={item.disabled}
        >
          <div className="flex items-center justify-between">
            {item.label}
            {hasChildren && (
              <span className={cn("transition-transform", subMenuOpen && "rotate-180")}>▼</span>
            )}
          </div>
        </button>
      )}

      {/* Sub Menu */}
      {hasChildren && subMenuOpen && (
        <div className="pl-4 mt-1 space-y-1">
          {item.children?.map((child, index) => (
            <div key={index}>
              {child.href ? (
                <a
                  href={child.href}
                  className={cn(
                    "block py-2 px-3 text-sm font-medium rounded-md hover:bg-gray-100",
                    child.active && "bg-gray-100",
                    child.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={child.disabled ? undefined : child.onClick}
                  aria-disabled={child.disabled}
                >
                  {child.label}
                </a>
              ) : (
                <button
                  className={cn(
                    "block w-full text-left py-2 px-3 text-sm font-medium rounded-md hover:bg-gray-100",
                    child.active && "bg-gray-100",
                    child.disabled && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={child.disabled ? undefined : child.onClick}
                  disabled={child.disabled}
                >
                  {child.label}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};