
const SectionHeader = ({ title }: { title: string }) => {
  return (
    <div className='flex pt-4 pb-3 my-2'>
      <h2 className='text-xl'>{title}</h2>
    </div>
  );
};

export default SectionHeader;
