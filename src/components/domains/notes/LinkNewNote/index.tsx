import Link from "next/link";

const LinkNewNote = () => {
  return (
    <Link href={'add-note'}>
      <div className="flex h-12 w-full items-center bg-background px-5 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 lg:rounded-md lg:border lg:border-input">
        <span className="text-muted-foreground">노트를 작성하세요</span>
      </div>
    </Link>
  );
};

export default LinkNewNote;
