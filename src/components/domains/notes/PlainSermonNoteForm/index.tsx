'use client'

import { useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQtNote } from "@/lib/supabase/worships";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer";
import { CalendarCheck2, ClipboardEdit, Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  content: z.string().min(1, { message: '내용을 입력해주세요' }),
  date: z.date({
    required_error: "날짜를 선택해주세요",
  }),
  serviceType: z.enum(["SUNDAY SERVICE", "WEDNESDAY SERVICE", "FRIDAY SERVICE", "DAYBREAK SERVICE", "SPECIAL DAYBREAK SERVICE", "SPECIAL SERVICE"]),
  script: z.string(),
  title: z.string(),
})

const PlainSermonNoteForm = () => {
  const { toast } = useToast()  
  const queryClient = useQueryClient()
  const [ viewOptions, setViewOptions ] = useState([
    {
      id: 0,
      name: '날짜',
      isVisible: true,
    },
    {
      id: 1,
      name: '예배',
      isVisible: true,
    },
    {
      id: 2,
      name: '제목',
      isVisible: true,
    },
    {
      id: 3,
      name: '본문',
      isVisible: true,
    },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      date: new Date(),
      serviceType: 'SUNDAY SERVICE',
      script:  '',
      title: '',
    }
  })

  const mutation = useMutation({
    mutationFn: createQtNote,
    onSettled(data, error) {
      toast({
        title: error ? '설교노트 저장 실패' : '설교노트 저장 성공',
        description: error ? error.message : '설교노트가 저장되었습니다',
      })
      form.resetField('content')
      form.resetField('title')
      form.resetField('script')
    },
  })

  const onHandleSubmit = async (inputValue: z.infer<typeof formSchema>) => {
    mutation.mutateAsync({
      type: 'SERMON',
      content: inputValue.content,
      date: format(inputValue.date, 'yyyy-MM-dd'),
      is_deleted: false,
      updated_at: format(new Date(), 'yyyy-MM-dd'),
      script: inputValue.script !== '' ? inputValue.script : null,
      book: inputValue.script !== '' ? convertBookType(parseScriptureInput(inputValue.script).book) : null,
      chapters: inputValue.script !== '' ? parseScriptureInput(inputValue.script).chapter : null,
      serviceType: inputValue.serviceType,
      title: inputValue.title !== '' ? inputValue.title : null,
    })
  }

  return (
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
                <FormField
                  control={form.control}
                  name="serviceType"
                  render={({ field }) => (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="예배를 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SUNDAY SERVICE">주일예배</SelectItem>
                          <SelectItem value="FRIDAY SERVICE">금요성령집회</SelectItem>
                          <SelectItem value="WEDNESDAY SERVICE">수요예배</SelectItem>
                          <SelectItem value="DAYBREAK SERVICE">새벽예배</SelectItem>
                          <SelectItem value="SPECIAL DAYBREAK SERVICE">특별새벽예배</SelectItem>
                          <SelectItem value="SPECIAL SERVICE">집회</SelectItem>
                        </SelectContent>
                      </Select>
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
  );
};

export default PlainSermonNoteForm;
