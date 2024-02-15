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
import { createQtNote, getExistingNote } from "@/lib/supabase/worships";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import CustomLoading from "@/components/commons/CustomLoading";
import { CalendarCheck2, ClipboardEdit, Pencil } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";

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
        <CustomLoading text={'작성된 노트를 불러오는 중..'} />
      ) : (
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onHandleSubmit)} className="h-full flex flex-col space-y-2 py-3">
              <FormField
                control={form.control}
                name="content"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <textarea 
                        {...field}
                        rows={20}
                        placeholder="내용을 입력해주세요"
                        className="w-full bg-background resize-none overflow-hidden placeholder:text-muted-foreground text-sm outline-none appearance-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="absolute left-0 bottom-0 right-0 flex justify-between px-5 py-2 border-t z-50">
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
                              variant={'ghost'} 
                              size={'sm'} 
                              className={cn(
                                !field.value && "bg-muted"
                              )}
                            >
                              <CalendarCheck2 className="h-5 w-5" />
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
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant={'ghost'} size={'sm'}>
                      <ClipboardEdit className="h-5 w-5"/>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
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
                    </DrawerHeader>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button>저장</Button>
                      </DrawerClose>
                      <DrawerClose asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            form.resetField('title')
                            form.resetField('script')
                          }}
                        >
                          취소
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
                <Button variant={'ghost'} size={'sm'} type='submit' disabled={form.formState.isSubmitting} className={'group disabled:bg-muted'}>
                  <Pencil className="text-sky-600" size={20}/>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default QTNoteForm;
