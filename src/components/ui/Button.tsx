import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary"; // Example variants if needed
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  // Base styles
  const baseStyles = `
    px-4 py-2 rounded font-body cursor-pointer transition-all duration-150
    border border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-opacity-50
    hover:shadow-neon-glow hover:animate-buzz
  `;

  // Variant specific styles
  const primaryStyles = `bg-neon-green text-brand-black hover:bg-opacity-90`;
  const secondaryStyles = `bg-transparent text-neon-green hover:bg-neon-green hover:text-brand-black`; // Example

  const variantStyles = variant === "primary" ? primaryStyles : secondaryStyles;

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className || ""}`}
      {...props}
      data-oid="rv7gy6q"
    >
      {children}
    </button>
  );
};

export default Button;
