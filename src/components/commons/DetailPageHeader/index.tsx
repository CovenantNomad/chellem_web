'use client'

import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const DetailPageHeader = ({ title }: { title: string }) => {
  const router = useRouter()
  return (
    <div className='flex items-center pt-4 pb-3 my-2'>
      <ChevronLeftIcon className='h-5 w-5 mr-2 cursor-pointer' onClick={() => router.back()}/>
      <h2 className='text-base'>{title}</h2>
    </div>
  );
};

export default DetailPageHeader;
