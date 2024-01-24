
type MainContainerProps = {}

const MainContainer = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="pb-[78px]">
      {children}
    </div>
  );
};

export default MainContainer;
