import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthServer from "../AuthServer";

type indexProps = {}

const Header = ({}: indexProps) => {
  return (
    <header className="sticky top-0 left-0 right-0 z-[2] bg-white">
      <div className="w-full max-w-[600px] h-[60px] flex justify-between items-center px-4">
        <h1 className="text-xl font-black uppercase">Chellem</h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
