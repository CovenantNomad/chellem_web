'use client'

import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon, ViewHorizontalIcon, ViewVerticalIcon } from "@radix-ui/react-icons";

type DabarViewControllerProps = {
  setIsHorizontalView: Dispatch<SetStateAction<boolean>>
}

const DabarViewController = ({ setIsHorizontalView }: DabarViewControllerProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsHorizontalView(true)}
          className="w-full h-8 flex justify-start"
        >
          <ViewVerticalIcon className="h-4 w-4 mr-2"/>
          <span>카드형</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsHorizontalView(false)}
          className="w-full h-8 flex justify-start"
        >
          <ViewHorizontalIcon className="h-4 w-4 mr-2"/>
          <span>리스트형</span>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DabarViewController;
