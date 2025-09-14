import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        victionButton:
          "bg-[#5E5424] border border-[#857C51] text-[#E9DC9B] text-sm",
        sophonButton:
          "bg-[#244058] border border-[#506A7F] text-[#A1C7E7] text-sm",
        soneiumButton:
          "bg-[#233153] border border-[#4E6B7C] text-[#97C2DD] text-sm",
        scrollButton:
          "bg-[#4F3B24] border border-[#79644D] text-[#D7BB9B] text-sm",
        monadButton:
          "bg-[#231F3B] border border-[#352C68] text-[#836EF9] text-sm",
        mantleButton:
          "bg-[#202020] border border-[#4E4E4E] text-[#F2F2F2] text-sm",
        blastButton:
          "bg-[#2C2C07] border border-[#67682E] text-[#CFD05D] text-sm",
        berachainButton:
          "bg-[#3B1702] border border-[#60402D] text-[#E09569] text-sm",
        abstractButton:
          "bg-[#022B23] border border-[#275645] text-[#6FD493] text-sm",
        zkSyncButton:
          "bg-[#161616] border border-[#383860] text-[#8C8DFC] text-sm",
        baseButton:
          "bg-[#0E2A47] border border-[#3FA7FF] text-[#3FA7FF] text-sm",
        fantomButton:
          "bg-[#31175E] border border-[#7C3AED] text-[#8B5CF6] text-sm",
        optimismButton:
          "bg-[#4F1017] border border-[#791621] text-[#EB2F44] text-sm",
        arbitrumButton:
          "bg-[#0C1E3E] border border-[#1A3B6D] text-[#28A0F0] text-sm",
        polygonButton:
          "bg-[#3E093D] border border-[#600C5F] text-[#8537DA] text-sm",
        bscButton:
          "bg-[#5E300B] border border-[#7C4C12] text-[#F3BA2F] text-sm",
        orangeButton:
          "bg-[#4B1702] border border-[#543424] text-[#F79B58] text-sm",
        redButton:
          "bg-[#540119] border border-[#561923] text-[#F77C7F] text-sm",
        blueButton:
          "bg-[#2E1267] border border-[#3A295F] text-[#C896FF] text-sm",
        mainButton:
          "bg-[#19191B] border border-[#202020] text-[#A6A5AB] text-sm",
        github:
          "bg-none text-sm font-extralight text-primary-foreground border border-[#202020] hover:bg-[#232323] cursor-pointer rounded-md",
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-7 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
