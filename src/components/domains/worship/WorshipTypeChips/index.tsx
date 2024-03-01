import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dispatch, SetStateAction } from "react";

type WorshipTypeChipsProps = {
  selectedService: string
  setSelectedService: Dispatch<SetStateAction<string>>
}

const WorshipTypeChips = ({ selectedService, setSelectedService }: WorshipTypeChipsProps) => {

  const serviceTypes = [
    { id: 0, name: '주일예배', value: 'SUNDAY SERVICE'},
    { id: 1, name: '수요예배', value: 'WEDNESDAY SERVICE'},
    { id: 2, name: '금요성령집회', value: 'FRIDAY SERVICE'},
    { id: 3, name: '새벽예배', value: 'DAYBREAK SERVICE'},
    { id: 4, name: '월삭예배', value: 'NEW MOON SERVICE'},
    { id: 5, name: '특새', value: 'SPECIAL DAYBREAK SERVICE'},
    { id: 6, name: '집회', value: 'SPECIAL SERVICE'}
  ]

  return (
    <ScrollArea className="w-full whitespace-nowrap scrollbar-hide">
      <div className="flex w-max space-x-4 p-4">
        {serviceTypes.map((service) => (
          <Badge 
            key={service.id} 
            variant={service.value === selectedService ? 'default' : 'secondary'} 
            className="px-[14px] leading-[34px]"
            onClick={() => setSelectedService(service.value)}
          >
            {service.name}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="scrollbar-hide" />
    </ScrollArea>
  );
};

export default WorshipTypeChips;
