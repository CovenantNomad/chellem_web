import Link from "next/link";
import { ChatBubbleIcon, FileTextIcon, HandIcon, HeartIcon, HomeIcon } from "@radix-ui/react-icons";

type BottomTabProps = {}

const BottomTab = ({}: BottomTabProps) => {
  return (
    <div className="w-full max-w-[600px] h-[60px] fixed bottom-0 left-0 right-0 mx-auto z-10">
      <ul className="w-full h-full flex justify-between items-center text-center rounded-tl-2xl rounded-tr-2xl bg-white border-t">
        <Link href={'/'} className="w-full cursor-pointer">
          <li className="flex flex-col items-center space-y-1">
            <HomeIcon className="h-5 w-5"/>
            <span className="text-caption">홈</span>
          </li>
        </Link>
        <Link href={'/bible'} className="w-full cursor-pointer">
          <li className="flex flex-col items-center space-y-1">
            <HeartIcon className="h-5 w-5"/>
            <span className="text-caption">말씀</span>
          </li>
        </Link>
        <Link href={'/pray'} className="w-full cursor-pointer">
          <li className="flex flex-col items-center space-y-1">
            <HandIcon className="h-5 w-5"/>
            <span className="text-caption">기도</span>
          </li>
        </Link>
        <Link href={'/dabar'} className="w-full cursor-pointer">
          <li className="flex flex-col items-center space-y-1">
            <ChatBubbleIcon className="h-5 w-5"/>
            <span className="text-caption">암송</span>
          </li>
        </Link>
        <Link href={'/notes'} className="w-full cursor-pointer">
          <li className="flex flex-col items-center space-y-1">
            <FileTextIcon className="h-5 w-5"/>
            <span className="text-caption">노트</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default BottomTab;
