import { cn } from "@/lib/utils";

const InnerContainer = ({ children, className }: { children: React.ReactNode, className?: React.ComponentProps<'div'>['className'] }) => {
  return (
    <div className={cn("px-5", className)}>
      {children}
    </div>
  );
};

export default InnerContainer;
