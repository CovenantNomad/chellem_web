'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"

const DabarTabs = () => {
  const router = useRouter()
  return (
    <Tabs defaultValue="card" className="w-full max-w-[600px]">
      <TabsList className="w-full">
        <TabsTrigger value="card" className="flex-1" onClick={() => router.push('/dabar')}>암송카드</TabsTrigger>
        <TabsTrigger value="quiz" className="flex-1" onClick={() => router.push('/dabar/quiz')}>퀴즈</TabsTrigger>
        <TabsTrigger value="memorized" className="flex-1" onClick={() => router.push('/dabar/memorized')}>내가 외운 말씀</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default DabarTabs;
