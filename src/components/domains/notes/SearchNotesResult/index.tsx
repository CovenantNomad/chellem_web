'use client'

import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getSearchNotesByKeyword } from "@/lib/supabase/notes";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchNoteItem from "../SearchNoteItem";

type TSearchNotes = {
  keyword: string
}

const SearchNotesResult = () => {
  const [ keyword, setKeyword ] = useState<string>('')
  const form = useForm<TSearchNotes>({
    defaultValues: {
      keyword: ''
    }
  })

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getSearchNotesByKeyword', keyword],
    queryFn: () => getSearchNotesByKeyword({ keyword }),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: keyword !== ''
  })


  const onSubmitHandler = debounce(({ keyword }: TSearchNotes) => {
    setKeyword(keyword)
  }, 300);

  console.log(data)

  return (
    <div>
      <div className="pt-2 pb-[14px] px-5 border-b">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                      <Input {...field}  placeholder="Search" className="pl-8" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <div className="px-5 pt-2">
        {isLoading || isFetching ? (
          <div>로딩중...</div>
        ) : (
          <>
            {data && data.length !== 0 ? (
              <div className="flex flex-col space-y-2">
                {data.map(note => (
                  <SearchNoteItem key={note.id} title={note.title} content={note.content} type={note.type} date={note.date}/>
                ))}
              </div>
            ) : (
              <div className="flex pt-32 justify-center items-center">
                <span className="text-muted-foreground">일치하는 노트가 없습니다</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchNotesResult;
