
const CustomLoading = ({ text }: { text: string }) => {
  return (
    <div>
      <div className="h-80 flex flex-col justify-center items-center border rounded-md mt-2">
        <div className="flex">
          <span className="animate-bounce text-3xl text-red-600">.</span>
          <span className="animate-bounce delay-150 ml-2 text-3xl text-blue-600">.</span>
          <span className="animate-bounce delay-300 ml-2 text-3xl text-green-600">.</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{text}</p>
      </div>
    </div>
  );
};

export default CustomLoading;
