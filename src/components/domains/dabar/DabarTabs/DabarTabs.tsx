'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { settingState } from "@/stores/settingState";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";

const DabarTabs = () => {
  const router = useRouter()
  const [ selectedTabValue, setSelectedTabValue ] = useRecoilState(settingState)

  return (
    <Tabs
      value={selectedTabValue.dabarTabValue}
      onValueChange={(value) => {
        if (value === 'card') {
          setSelectedTabValue({
            ...selectedTabValue,
            dabarTabValue: value
          })
          router.push('/dabar')
        } else {
          setSelectedTabValue({
            ...selectedTabValue,
            dabarTabValue: value
          })
          router.push(`/dabar/${value}`)
        }
      }} 
      className="w-full max-w-[600px]"
    >
      <TabsList className="w-full">
        <TabsTrigger value="card" className="flex-1">암송카드</TabsTrigger>
        {/* <TabsTrigger value="quiz" className="flex-1">테스트</TabsTrigger> */}
        {/* <TabsTrigger value="memorized" className="flex-1">내가 외운 말씀</TabsTrigger> */}
      </TabsList>
    </Tabs>
  );
};

export default DabarTabs;
