# Lightweight UI Component Library

A lightweight, composable UI component library built with React, TypeScript, and Tailwind CSS. This library provides a set of reusable components that are easy to customize and integrate into your projects.

## Features

- 🎨 Built with Tailwind CSS for easy styling
- 📦 Lightweight and tree-shakable
- 🧩 Composable components
- 📚 Storybook integration for component documentation
- 🔍 TypeScript support for type safety
- 🌙 Dark mode support
- 🧰 Based on shadcn/ui principles

## Components

The library includes the following components:

- Button
- Card
- Input
- Alert
- Badge
- Avatar
- Dropdown
- Modal
- Tooltip

## Getting Started

### Installation

```bash
npm install
```

### Running Storybook

```bash
npm run storybook
```

### Development

```bash
npm run dev
```

### Build the library

```bash
npm run build
```

### Run linting

```bash
npm run lint
```

## Usage

```jsx
import { Button } from './lib/component-library/button';

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
```

## Customization

All components are built with Tailwind CSS and use CSS variables for theming. You can customize the appearance by:

1. Modifying the Tailwind configuration
2. Overriding CSS variables
3. Using the className prop to add custom styles

## ⚙️ Technologies

- React 18.3.1
- TypeScript 5.5.3
- Radix UI Components
- Tailwind CSS
- Storybook 7.6
- Vite
- ESLint
- Lucide Icons
- date-fns
- Zod
- React Hook Form

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) for accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for inspiration and patterns
