import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const Header = async () => {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 left-0 right-0 z-[2] bg-white">
      <div className="w-full max-w-[600px] h-[60px] flex justify-between items-center px-4">
        <h1 className="text-xl font-black uppercase">Chellem</h1>
        <Avatar>
          <AvatarImage src={user ? user.user_metadata.avatar_url : 'https://github.com/shadcn.png'} />
          <AvatarFallback>{user ? user.user_metadata.preferred_username : 'cn'}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

export default Header;
