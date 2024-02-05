'use client'

import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import React from "react";

const DetailPageHeader = ({ title, className } : { title: string, className?: React.ComponentProps<'span'>['className'] }) => {
  const router = useRouter()
  
  return (
    <div className={cn('flex items-center py-4 px-5', className)}>
      <ChevronLeftIcon className='h-5 w-5 mr-2 cursor-pointer' onClick={() => router.back()}/>
      <span className='text-base'>{title}</span>
    </div>
  );
};

export default DetailPageHeader;
