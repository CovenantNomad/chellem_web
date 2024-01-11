import { cn } from "@/lib/utils";

type DabarQuizQuestionProps = {
  bible_reference: string
  displayWords: string[][] | null
}

const DabarQuizQuestion = ({ displayWords, bible_reference }: DabarQuizQuestionProps) => {
  let accIndex = 0

  return (
    <>
      <div className="text-center mb-3">
        <span className="border-b border-black">{bible_reference}</span>
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
                      // onClick={() => alert(correctAnswer && correctAnswer[currentIndex])}
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
    </>
  );
};

export default DabarQuizQuestion;
