import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

const DabarAlert = () => {
  return (
    <Accordion type='single' collapsible className="mb-[1px]">
      <AccordionItem value="item-1" className="border-b-0">
        <AccordionTrigger>
          <div className="flex space-x-2">
            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            <h3 className="text-sm font-medium text-blue-800">정답 입력 시, 주의사항</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul role="list" className="list-disc space-y-1 pl-10">
            <li>각 줄마다 할당 된 글자 수에 맞춰주세요</li>
            <li>빈칸을 보고 읽어본 후 입력하면 덜 힘듭니다</li>
            <li>모든 줄 수도 맞춰서 입력해주세요</li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default DabarAlert;
