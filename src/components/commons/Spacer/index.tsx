import { cn } from "@/lib/utils";

type SpacerProps = {
  className: string
}

const Spacer = ({className}: SpacerProps) => {
  return <div className={cn(className)}/>
      
};

export default Spacer;
