import * as React from "react"

import { cn } from "@/lib/utils"

const FeedCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-card text-card-foreground lg:shadow-sm lg:rounded-lg lg:border",
      className
    )}
    {...props}
  />
))
FeedCard.displayName = "FeedCard"

const FeedCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-5", className)}
    {...props}
  />
))
FeedCardHeader.displayName = "FeedCardHeader"

const FeedCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-[2px] pb-[4px] px-5", className)} {...props} />
))
FeedCardContent.displayName = "FeedCardContent"

// const CardFooter = React.forwardRef<
//   HTMLDivElement,
//   React.HTMLAttributes<HTMLDivElement>
// >(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex items-center p-6 pt-0", className)}
//     {...props}
//   />
// ))
// CardFooter.displayName = "CardFooter"

export { FeedCard, FeedCardHeader, FeedCardContent }
