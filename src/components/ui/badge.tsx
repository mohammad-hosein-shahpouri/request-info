import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium leading-normal transition-colors focus:outline-none focus:ring-1 focus:ring-ring [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border-border bg-muted/60 text-foreground",
        primary:
          "border-primary/25 bg-primary/10 text-primary dark:border-primary/30 font-mono",
        secondary:
          "border-secondary/25 bg-secondary/10 text-secondary dark:border-secondary/30 font-mono",
        tertiary:
          "border-tertiary/25 bg-tertiary/10 text-tertiary dark:border-tertiary/30 font-mono",
        outline: "border-border text-foreground",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
