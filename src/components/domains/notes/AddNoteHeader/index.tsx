'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn, getNoteName } from "@/lib/utils";
import { Enums } from "@/types/database.types";
import { ChevronLeftIcon, SquaresPlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type AddNoteHeaderProps = {
  type: string
  setType: Dispatch<SetStateAction<string>>
  className?: React.ComponentProps<'div'>['className']
}

const AddNoteHeader = ({ type, setType, className }: AddNoteHeaderProps) => {
  const router = useRouter()

  return (
    <div className={cn('flex justify-between items-center py-2 px-[14px] bg-white border-b', className)}>
      <div className="flex items-center">
        <ChevronLeftIcon className='h-5 w-5 mr-2 cursor-pointer' onClick={() => router.back()}/>
        <span className='text-sm'>작성취소</span>
      </div>
      <div className="flex items-center">
        <span className='text-sm'>{getNoteName(type)}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              size="sm"
            >
              <SquaresPlusIcon className='h-5 w-5 mr-2 cursor-pointer' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuRadioGroup value={type} onValueChange={setType}>
              <DropdownMenuRadioItem value={"QT"}>큐티노트</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="SERMON">설교노트</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="THANKS">감사노트</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="DIARY">영성일기</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="CONTEMPLATION">묵상노트</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AddNoteHeader;
