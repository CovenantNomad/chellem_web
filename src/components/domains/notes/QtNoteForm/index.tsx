'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, convertBookType, parseScriptureInput } from "@/lib/utils";
import { CalendarIcon } from "@heroicons/react/20/solid";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createQtNote, getExistingNote } from "@/supabase/worships";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

type QTNoteFormProps = {
  viewOptions: {
    id: number;
    name: string;
    isVisible: boolean;
  }[]
  script: string | null
  book: Database["public"]["Enums"]["BOOK_TYPE"] | null
  chapters: string[] | null
  serviceType: Database["public"]["Enums"]["SERVICE_TYPE"]
  title: string | null
  date: string
}

const formSchema = z.object({
  content: z.string().min(1, { message: '내용을 입력해주세요' }),
  date: z.date({
    required_error: "날짜를 선택해주세요",
  }),
  script: z.string().min(1, { message: '본문을 입력해주세요' }),
  title: z.string().min(1, { message: '제목을 입력해주세요' }),
})

const QTNoteForm = ({ viewOptions, script, book, chapters, serviceType, title, date }: QTNoteFormProps) => {
  const { toast } = useToast()  
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      date: new Date(),
      script: script || '',
      title: title || '',
    }
  })

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getExistingNote', date, 'QT'],
    queryFn: () => getExistingNote({date, type: 'QT'}),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })


  const mutation = useMutation({
    mutationFn: createQtNote,
    onSettled(data, error) {
      toast({
        title: error ? '큐티 저장 실패' : '큐티 저장 성공',
        description: error ? error.message : '큐티가 저장되었습니다',
      })
      queryClient.invalidateQueries({ queryKey: ['getExistingNote', date, 'QT'] })
    },
  })

  const onHandleSubmit = async (inputValue: z.infer<typeof formSchema>) => {
    mutation.mutateAsync({
      type: 'QT',
      content: inputValue.content,
      date: format(inputValue.date, 'yyyy-MM-dd'),
      is_deleted: false,
      updated_at: format(new Date(), 'yyyy-MM-dd'),
      script: script === null ? inputValue.script : script,
      book: script === null && book === null ? convertBookType(parseScriptureInput(inputValue.script).book) : book,
      chapters: chapters,
      serviceType,
      title: title === null ? inputValue.title : title,
    })
  }

  useEffect(() => {
    if (!isLoading || !isFetching) {
      if (data && data.data) {
        form.setValue('content', data.data.content)
        form.setValue('title', data.data.title || '')
        form.setValue('script', data.data.script || '')
      }
    }
  }, [isLoading, isFetching, data])

  return (
    <div>
      {isLoading || isFetching ? (
        <div>
          <div className="animate-pulse h-10 py-2 bg-gray-100" />
          <div className="h-80 flex flex-col justify-center items-center border rounded-md mt-2">
            <div className="flex">
              <span className="animate-bounce text-3xl text-red-600">.</span>
              <span className="animate-bounce delay-150 ml-2 text-3xl text-blue-600">.</span>
              <span className="animate-bounce delay-300 ml-2 text-3xl text-green-600">.</span>
            </div>
            <p className="mt-2 text-sm text-gray-500">작성된 노트를 불러오는 중..</p>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onHandleSubmit)} className="space-y-2">
            {viewOptions[0].isVisible && (
              <FormField
                control={form.control}
                name="date"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className={`${form.formState.errors.date && 'placeholder:text-red-600'}`}>날짜를 지정해주세요</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {viewOptions[1].isVisible && (
              <FormField
                control={form.control}
                name="title"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Input placeholder="설교제목을 입력해주세요" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {viewOptions[2].isVisible && (
              <FormField
                control={form.control}
                name="script"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Input placeholder="본문을 입력해주세요 (대표본문 1개만 입력해주세요)" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="content"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <textarea 
                      {...field}
                      rows={20}
                      placeholder="내용을 입력해주세요"
                      className="flex min-h-[80px] w-full border-input bg-background ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border rounded-md py-4 px-3 text-sm outline-none appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button size={'lg'} type='submit' disabled={form.formState.isSubmitting}>등록</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default QTNoteForm;
