'use client'

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQtNote } from "@/lib/supabase/worships";
import { CalendarCheck2, Pencil } from "lucide-react";

const formSchema = z.object({
  content: z.string().min(1, { message: '내용을 입력해주세요' }),
  date: z.date({
    required_error: "날짜를 선택해주세요",
  }),
})

const PlainDiaryNoteForm = () => {
  const { toast } = useToast()  
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: '',
      date: new Date(),
    }
  })

  const mutation = useMutation({
    mutationFn: createQtNote,
    onSettled(data, error) {
      toast({
        title: error ? '영성일기 저장 실패' : '영성일기 저장 성공',
        description: error ? error.message : '영성일기가 저장되었습니다',
      })
      form.resetField('content')
    },
  })

  const onHandleSubmit = async (inputValue: z.infer<typeof formSchema>) => {
    mutation.mutateAsync({
      type: 'DIARY',
      content: inputValue.content,
      date: format(inputValue.date, 'yyyy-MM-dd'),
      is_deleted: false,
      updated_at: format(new Date(), 'yyyy-MM-dd'),
      script: null,
      book: null,
      chapters: null,
      serviceType: null,
      title: null,
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
          <Button variant={'ghost'} size={'sm'} type='submit' disabled={form.formState.isSubmitting} className={'group disabled:bg-muted'}>
            <Pencil className="text-sky-600" size={20}/>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PlainDiaryNoteForm;
