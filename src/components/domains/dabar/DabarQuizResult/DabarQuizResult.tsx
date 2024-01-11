'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createDabarRecord } from "@/supabase/dabar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction, useState } from "react";

type DabarQuizResultProps = {
  router: AppRouterInstance;
  dabarId: string;
  displayWords: string[][] | null
  checkAnswer: {
    isCorrect: boolean;
    message: string;
  }
  setIsChecking: Dispatch<SetStateAction<boolean>>
}

const DabarQuizResult = ({ dabarId, router, displayWords, checkAnswer, setIsChecking }: DabarQuizResultProps) => {
  const queryClient = useQueryClient()
  const [ isAnswerOpen, setIsAnswerOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: createDabarRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getDabarRecords'] })
    },
  })

  const onSaveHandler = async () => {
    setIsAnswerOpen(true)
    await mutation.mutateAsync({
      dabar_id: Number(dabarId),
      isMemorized: true
    })
  }

  return (
    <>
      {checkAnswer.isCorrect ? (
        <>
          {isAnswerOpen ? (
            <div>
              <div className="w-full space-y-2">
                {displayWords && displayWords.map((line, lineIndex) => (
                  <div key={lineIndex} className="flex justify-center space-x-1">
                    {line.map((word, wordIndex) => (
                      <div key={wordIndex} className={cn(
                        'w-[30px] h-[30px] border rounded-md',
                        word === ' ' ? 'hidden' : 'flex justify-center items-center',
                        `fade-in-0 delay-[${(lineIndex + 1) * wordIndex * 500}ms]`
                      )}>
                        <span className={`${word === 'x' && 'text-white'}`}>{displayWords[lineIndex][wordIndex]}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button onClick={() => router.back()}>다른 말씀도 풀어보기</Button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="animate-bounce-once text-3xl font-bold text-teal-600">정답</h1>
              <div className="mt-4">
                <Button onClick={onSaveHandler}>정답보기</Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-red-600">실패</h1>
          <h3 className="mt-2">{checkAnswer.message}</h3>
          <div className="mt-4">
            <Button onClick={() => setIsChecking(false)}>다시풀기</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DabarQuizResult;
