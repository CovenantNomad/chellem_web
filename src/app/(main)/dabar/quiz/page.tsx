import DabarCollectionCards from "@/components/domains/dabar/DabarCollectionCards";

type QuizMainPageProps = {}

const QuizMainPage = ({}: QuizMainPageProps) => {

  return (
    <div>
      <div className='pt-4 pb-2 my-2'>
        <h2 className='text-xl'>퀴즈</h2>
      </div>
      <DabarCollectionCards baseUrl={'/dabar/quiz/collections/'} />
    </div>
  );
};

export default QuizMainPage;
