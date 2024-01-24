'use client'

import Container from "@/components/commons/Container/Container";
import Spacer from "@/components/commons/Spacer";
import DabarAlert from "@/components/domains/dabar/DabarAlert";
import DabarQuizQuestion from "@/components/domains/dabar/DabarQuizQuestion/DabarQuizQuestion";
import DabarQuizResult from "@/components/domains/dabar/DabarQuizResult/DabarQuizResult";
import DabarQuizTextArea from "@/components/domains/dabar/DabarQuizTextArea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateCorrectAnswer } from "@/lib/utils";
import { getDabarById } from "@/supabase/dabar";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type TSubmitAnswer = {
  userAnswer: string;
}

const QuizDetailPage = ({ params }: { params: { id: string }}) => {
  const router = useRouter()
  
  const { data } = useQuery({
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
  
  const [count, setCount] = useState(3);
  const [ isChecking, setIsChecking ] = useState(false)

  const [ checkAnswer, setCheckAnswer ] = useState({
    isCorrect: false,
    message: ''
  });

  const { handleSubmit, register, formState: { errors } } = useForm<TSubmitAnswer>();



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



  return (
    <Container>
      <section className="relative">
        <div className='flex items-center pt-4 pb-3 my-2'>
          <ChevronLeftIcon className='h-6 w-6 mr-2' onClick={() => router.back()}/>
          <h2 className='text-xl'>퀴즈</h2>
        </div>
        <div className="h-[calc(100vh-72px)] overflow-hidden">
          {!isChecking ? (
            <>
              {data && data.data && displayWords ? (
                <div className="h-full">
                  <ScrollArea className="bg-red-50 h-full">
                    <DabarQuizQuestion 
                      bible_reference={data.data?.bible_reference}
                      displayWords={displayWords}
                    />
                    <Spacer className="h-2" />
                    <DabarAlert />
                  </ScrollArea>
                  <DabarQuizTextArea 
                    numOfWords={numOfWords}
                    numOfLine={numOfLine}
                    numOfWordsInLines={numOfWordsInLines}
                    correctAnswer={correctAnswer}
                    isChecking={isChecking}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    register={register}
                    setIsChecking={setIsChecking}
                    setCheckAnswer={setCheckAnswer}
                  />
                </div>
              ) : (
                <div>데이터 없어요</div>
              )}
            </>
          ) : (
            <div>
              <div className="min-h-[300px] w-full flex flex-col justify-center items-center">
                {count !== 0 ? (
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="animate-bounce text-2xl font-bold">{count}</h1>
                  </div>
                ) : (
                  <>
                    <DabarQuizResult 
                      router={router}
                      dabarId={params.id}
                      displayWords={displayWords}
                      checkAnswer={checkAnswer}
                      setIsChecking={setIsChecking}
                    />
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
