
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      {children}
    </div>
  );
};

export default Container;
