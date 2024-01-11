'use client'

import { cn, compareArrays, findDifferentIndexes, generateCorrectAnswer } from "@/lib/utils";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction, useImperativeHandle, useRef } from "react";
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, useForm } from "react-hook-form";

type TSubmitAnswer = {
  userAnswer: string;
}

type DabarQuizTextAreaProps = {
  numOfWords: number
  numOfLine: number
  numOfWordsInLines: number[]
  correctAnswer: { [key: number]: string } | null
  isChecking: boolean
  errors: FieldErrors<TSubmitAnswer>
  handleSubmit: UseFormHandleSubmit<TSubmitAnswer, undefined>
  register: UseFormRegister<TSubmitAnswer>
  setIsChecking: Dispatch<SetStateAction<boolean>>
  setCheckAnswer: Dispatch<SetStateAction<{
    isCorrect: boolean;
    message: string;
  }>>
}


const DabarQuizTextArea = ({ numOfLine, numOfWords, numOfWordsInLines, correctAnswer, isChecking, errors, handleSubmit, register, setIsChecking, setCheckAnswer }: DabarQuizTextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const { ref, ...rest } = register("userAnswer", {
    required: {
      value: true,
      message: '정답을 입력해주세요'
    },
    validate: {
      checkNumOfLine: v => v.split('\n').length === numOfLine || `입력하신 답변의 수(${v.split('\n').length}줄)가 정답의 수(${numOfLine}줄)보다 ${v.split('\n').length > numOfLine ? '많습니다' : '적습니다'}`,
      checkNumOfWords: v => v.replaceAll(/\s/g, '').replaceAll(/\n/g, '').length === numOfWords || `입력하신 답변의 글자수(${v.replaceAll(/\s/g, '').replaceAll(/\n/g, '').length}자)와 정답의 글자수(${numOfWords}자)가 일치하지 않습니다`,
      checkNumOfWordsPerLine: v => {
        const numOfWordsInLine = v.split('\n').map(line => {
          return line.replaceAll(/\s/g, '').replaceAll(/\n/g, '').length
        })
        return compareArrays(numOfWordsInLines, numOfWordsInLine) || findDifferentIndexes(numOfWordsInLines, numOfWordsInLine)
      }
    }
  })

  useImperativeHandle(ref, () => textareaRef.current)

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  };

  const onSumbmitHandler = ({ userAnswer }: TSubmitAnswer) => {
    setIsChecking(true)
    const userAnswerLine = userAnswer.split('\n');
    const userAnswerLines: string[][] = userAnswerLine.map(line => line.replace(/\s/g, '').split(''));

    const submitUserAnswer = generateCorrectAnswer(userAnswerLines)

    let wrongCount: number = 0;

    if (correctAnswer) {
      for (let wordIndex = 0; wordIndex < Object.keys(submitUserAnswer).length + 1; wordIndex++) {
        if (submitUserAnswer[wordIndex] !== correctAnswer[wordIndex]) {
          console.log('답안: ', submitUserAnswer[wordIndex], '답: ', correctAnswer[wordIndex])
          wrongCount++;
        }
      }
    }

    if (wrongCount === 0) {
      setCheckAnswer({
        isCorrect: true,
        message: '정답입니다'
      })
    } else {
      setCheckAnswer({
        isCorrect: false,
        message: `${wrongCount}글자 틀리셨습니다`
      })
    }
  }


  return (
    <div className="w-full max-w-[600px] fixed bottom-0 left-0 right-0 px-4 mx-auto pb-4">
      <form onSubmit={handleSubmit(onSumbmitHandler)} className="realtive">
        {errors.userAnswer && <span className="text-sm text-red-600 mb-1">{errors.userAnswer.message}</span>}
        <textarea
          ref={textareaRef}
          onInput={handleResizeHeight}
          {...rest}
          rows={1}                  
          placeholder="정답을 입력해주세요"
          className={cn(
            'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            `max-h-[116px]`
          )}
        />
        <div className="absolute bottom-3 right-4">
          <button type='submit' disabled={isChecking}>
            <ArrowUpCircleIcon className="text-blue-600 h-8 w-8"/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DabarQuizTextArea;
