import { cn } from "@/lib/utils";

type MainContainerProps = {}

const MainContainer = ({ children, className }: {children: React.ReactNode, className?: React.ComponentProps<'div'>['className']}) => {
  return (
    <div className={cn('pb-[78px]', className)}>
      {children}
    </div>
  );
};

export default MainContainer;
