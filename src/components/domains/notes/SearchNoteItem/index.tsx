import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Enums } from "@/types/database.types"

type SearchNoteItemProps = {
  title: string | null
  content: string
  type: Enums<'NOTE_TYPE'>
  date: string
}

const SearchNoteItem = ({title, content, type, date}: SearchNoteItemProps) => {
  return (
    <Card className="px-4 py-3">
      {title && <span className="block text-base font-bold">{title}</span>}
      <div className={cn('h-[66px] overflow-hidden text-ellipsis line-clamp-3', title && 'mt-3')}>
        <span className="text-sm">{content}</span>
      </div>
      <div className="mt-3">
        <span className="inline-block text-sm mr-3 text-[#707884]">{type}</span>
        <span className="text-sm text-[#707884]">{date}</span>
      </div>
    </Card>
  );
};

export default SearchNoteItem;
