'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Dispatch, SetStateAction } from "react";

type NoteInputOptionsProps = {
  viewOptions: {
    id: number;
    name: string;
    isVisible: boolean;
  }[]
  setViewOptions: Dispatch<SetStateAction<{
    id: number;
    name: string;
    isVisible: boolean;
  }[]>>
}

const NoteInputOptions = ({ viewOptions, setViewOptions }: NoteInputOptionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        {viewOptions
          .map((option) => {
            return (
              <DropdownMenuCheckboxItem
                key={option.id}
                className="capitalize"
                checked={option.isVisible}
                onCheckedChange={(value) => {
                  setViewOptions(currentOptions => 
                    currentOptions.map(current => 
                      current.id === option.id ? { ...current, isVisible: value } : current
                    )
                  );
                }}
              >
                {option.name}
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NoteInputOptions;
