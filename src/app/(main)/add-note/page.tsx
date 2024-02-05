'use client'

import Container from "@/components/commons/Container/Container";
import DetailPageHeader from "@/components/commons/DetailPageHeader";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "@/components/ui/use-toast";
import { createQtNote, createSimpleNote } from "@/supabase/worships";
import { Enums } from "@/types/database.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type AddNotePageProps = {}

const AddNotePage = ({}: AddNotePageProps) => {
  const queryClient = useQueryClient()
  const [type, setType] = useState<string>('QT');

  const mutation = useMutation({
    mutationFn: createSimpleNote,
    onSettled(data, error) {
      toast({
        title: error ? '노트 저장 실패' : '노트 저장 성공',
        description: error ? error.message : '노트를 생성하였습니다',
      })
      queryClient.invalidateQueries({ queryKey: ['getNoteCollections'] })
      queryClient.invalidateQueries({ queryKey: ['getNotes', type] })
    },
  })


  return (
    <Container>
      <DetailPageHeader title="폴더" />
      <ToggleGroup 
        variant="outline" 
        type="single"
        value={type}
        onValueChange={(value) => {
          if (value) setType(value);
        }}
      >
        <ToggleGroupItem value='QT' aria-label="Toggle QT">
          <span>큐티</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="SERMON" aria-label="Toggle SERMON">
          <span>설교</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="THANKS" aria-label="Toggle THANKS">
          <span>감사</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="DIARY" aria-label="Toggle DIARY">
          <span>일기</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="CONTEMPLATION" aria-label="Toggle CONTEMPLATION">
          <span>묵상</span>
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="mt-8">
        성은이가 노트 만들어 달라고 했는데ㅠㅠ<br/> 졸려서 다음에 계속 만들게요...<br/>사랑해~
      </div>
    </Container>
  );
};

export default AddNotePage;
