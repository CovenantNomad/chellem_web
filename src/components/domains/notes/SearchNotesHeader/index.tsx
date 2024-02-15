'use client'

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type SearchNotesHeaderProps = {}

const SearchNotesHeader = ({}: SearchNotesHeaderProps) => {
  const router = useRouter()

  return (
    <div className={'h-[54px] flex justify-between items-center py-2 px-5 bg-white border-b'}>
      <div className="flex items-center">
        <ArrowLeft size={24} onClick={() => router.back()} />
      </div>
    </div>
  );
};

export default SearchNotesHeader;
