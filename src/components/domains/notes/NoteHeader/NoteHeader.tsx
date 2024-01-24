'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MixerHorizontalIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type NoteHeaderProps = {}

const NoteHeader = ({}: NoteHeaderProps) => {
  return (
    <div className="flex justify-end pt-4 pb-4">
      {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='default'
            size="sm"
            className="h-10"
          >
            <PlusCircledIcon className="mr-2 h-4 w-4" />
            Add Note
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>큐티노트</DropdownMenuItem>
          <DropdownMenuItem>설교노트</DropdownMenuItem>
          <DropdownMenuItem>감사노트</DropdownMenuItem>
          <DropdownMenuItem>영성일기</DropdownMenuItem>
          <DropdownMenuItem>묵상노트</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
      <Link href={'/notes/add-note'}>
        <Button
          variant='default'
          size="sm"
          className="h-10"
        >
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add Note
        </Button>
      </Link>
    </div>
  );
};

export default NoteHeader;
