import { cn } from "./cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-colors duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border bg-card text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  inverse: "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-11 w-11"
};

export function buttonVariants(
options: {variant?: ButtonVariant;size?: ButtonSize;className?: string;} = {})
: string {
  const { variant = "primary", size = "md", className } = options;
  return cn(base, variants[variant], sizes[size], className);
}