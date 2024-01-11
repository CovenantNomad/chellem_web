'use client'

import Container from "@/components/commons/Container/Container";
import Spacer from "@/components/commons/Spacer";
import DabarAlert from "@/components/domains/dabar/DabarAlert";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn, compareArrays, findDifferentIndexes, generateCorrectAnswer } from "@/lib/utils";
import { createDabarRecord, getDabarById } from "@/supabase/dabar";
import { ArrowUpCircleIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type TSubmitAnswer = {
  userAnswer: string;
}


const QuizDetailPage = ({ params }: { params: { id: string }}) => {
  let accIndex = 0
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()
  const queryClient = useQueryClient()
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getDabarsByCollectionId', params.id],
    queryFn: () => getDabarById(params.id),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

  const [ numOfWords, setNumOfWords ] = useState<number>(0)
  const [ numOfWordsInLines, setNumOfWordsInLines ] = useState<number[]>([])
  const [ numOfLine, setNumOfLine ] = useState<number>(0)
  const [ displayWords, setDisplayWords] = useState<string[][] | null>(null)
  const [ displayWordsForSpacesChance, setDisplayWordsForSpacesChance ] = useState<string[][] | null>(null)
  const [ correctAnswer, setCorrectAnswer ] = useState<{ [key: number]: string } | null>(null)
  const [ userAnswerBlank, setUserAnswerBlank ] = useState<string[][] | null>()
  
  const [ isChecking, setIsChecking ] = useState(false)
  const [count, setCount] = useState(3);

  const [ isCorrect, setIsCorrect ] = useState(false);
  const [ message, setMessage ] = useState('');

  const [ isAnswerOpen, setIsAnswerOpen] = useState(false)

  const { handleSubmit, register, formState: {errors, isSubmitting} } = useForm<TSubmitAnswer>();
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

  // 이게 필수임
  useImperativeHandle(ref, () => textareaRef.current)

  const mutation = useMutation({
    mutationFn: createDabarRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getDabarRecords'] })
    },
  })

  const onSumbmitHandler = ({ userAnswer }: TSubmitAnswer) => {
    setIsChecking(true)
    const userAnswerLine = userAnswer.split('\n');
    const userAnswerLines: string[][] = userAnswerLine.map(line => line.replace(/\s/g, '').split(''));

    setUserAnswerBlank(userAnswerLines)

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
      setIsCorrect(true);
      setMessage('정답입니다')
    } else {
      setIsCorrect(false);
      setMessage(`${wrongCount}글자 틀리셨습니다`)
    }
  }

  const onSaveHandler = async () => {
    setIsAnswerOpen(true)
    await mutation.mutateAsync({
      dabar_id: Number(params.id),
      isMemorized: true
    })
  }

  useEffect(() => {
    if (data && data.data) {
      const lines = data.data.scripture_passage.split('\n')
      setNumOfLine(lines.length)
      const numOfWordsInLine = lines.map(line => {
        return line.replaceAll(/\s/g, '').replaceAll(/\n/g, '').length
      })

      setNumOfWordsInLines(numOfWordsInLine)

      const words = data.data.scripture_passage.replaceAll(/\s/g, '').replaceAll(/\n/g, '')
      setNumOfWords(words.length)

      setDisplayWordsForSpacesChance(lines.map(line => line.split('')))

      const createDisplayWords = lines.map(line => line.replace(/\s/g, '').split(''))
      setDisplayWords(createDisplayWords)
      setCorrectAnswer(generateCorrectAnswer(createDisplayWords)) 

      const initialBlank: string[][] = Array(lines.length).fill([]).map((_, index) => Array(createDisplayWords[index].length).fill(''));
      setUserAnswerBlank(initialBlank)
    }
    
  }, [data])

  useEffect(() => {
    if (isChecking) {
      const countdown = setInterval(() => {
        setCount((prevCount) => (prevCount === 0 ? prevCount : prevCount - 1));
      }, 1000);

      return () => clearInterval(countdown);
    }    
  }, [isChecking])

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  };

  return (
    <Container>
      <section className="relative h-screen">
        <div className='flex items-center pt-4 pb-3 my-2'>
          <ChevronLeftIcon className='h-6 w-6 mr-2' onClick={() => router.back()}/>
          <h2 className='text-xl'>퀴즈</h2>
        </div>
        <div>
          {!isChecking ? (
            <div>
              <div className="">
                <div className="text-center mb-3">
                  <span className="border-b border-black">{data?.data?.bible_reference}</span>
                </div>
                <div className="space-y-3">
                  {displayWords && (
                    displayWords.map((line, lineIndex) => {
                      return (
                        <div key={lineIndex} className="flex justify-center">
                          {line.map((word, wordIndex) => {
                            const currentIndex = accIndex + 1
                            accIndex += 1
                            return (
                              <button 
                                key={wordIndex} 
                                className={cn(
                                  'w-[30px] h-[30px] border',
                                  word === ' ' ? 'hidden' : 'flex justify-center items-center', 
                                  wordIndex !== 0 ? 'border-l-0': '',
                                  'hover:scale-95 hover:transition-transform'
                                )}
                                onClick={() => alert(correctAnswer && correctAnswer[currentIndex])}
                              >
                                <span className="text-sm text-gray-500">{currentIndex}</span>
                              </button>
                            )
                          })}
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
              <Spacer className="h-2" />
              <DabarAlert />
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
            </div>
          ) : (
            <div>
              {/* <div>정답확인</div> */}
              <div className="min-h-[300px] w-full flex flex-col justify-center items-center">
                {count !== 0 ? (
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="animate-bounce text-2xl font-bold">{count}</h1>
                  </div>
                ) : (
                  <>
                    {isCorrect ? (
                      <>
                        {isAnswerOpen ? (
                          <>
                            <div className="w-full space-y-2">
                              {userAnswerBlank && userAnswerBlank.map((line, lineIndex) => (
                                <div key={lineIndex} className="flex justify-center space-x-1">
                                  {line.map((word, wordIndex) => (
                                    <div key={wordIndex} className={cn(
                                      'w-[30px] h-[30px] border rounded-md',
                                      word === ' ' ? 'hidden' : 'flex justify-center items-center',
                                      `fade-in-0 delay-[${(lineIndex + 1) * wordIndex * 500}ms]`
                                    )}>
                                      <span className={`${word === 'x' && 'text-white'}`}>{userAnswerBlank[lineIndex][wordIndex]}</span>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                            <div className="mt-8">
                              <Button onClick={() => router.back()}>다른 말씀도 풀어보기</Button>
                            </div>
                          </>
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
                        <h3 className="mt-2">{message}</h3>
                        <div className="mt-4">
                          <Button onClick={() => setIsChecking(false)}>다시풀기</Button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
};

export default QuizDetailPage;
