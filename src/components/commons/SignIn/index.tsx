'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const SignInClientComponent = () => {
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ 
      provider: 'kakao',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_REDIRECT_URL
      }
     })
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="min-h-[392px] w-full max-w-[480px] flex flex-col px-9 py-9 shadow-lg">
        <div className="flex-grow-0 flex-shrink">
          <h3 className="text-[1.625rem] leading-[2.25rem] font-bold">로그인</h3>
        </div>
        <div className="w-full flex-grow flex-shrink flex items-center">
          <button 
            className="w-full flex justify-center py-[15px] px-[14px] bg-[#FEE500]"
            onClick={handleSignIn}
          >
            <span className="w-5 h-5  mr-2">
              <svg viewBox="0 0 24 24" className="block w-full h-full">
                <path className="fill-[#1A1A1C]" fill-rule="evenodd" clip-rule="evenodd" d="M11.9997 2.5C6.24348 2.5 1 6.32322 1 11.0393c0 2.9316 1.90428 5.5179 4.80469 7.0555l-1.22042 4.4795c-.10756.3967.34284.7126.68935.4828l5.34918-3.5482c.4516.044.9106.0691 1.3769.0691C18.0755 19.578 23 15.7548 23 11.0393 23 6.32322 18.0755 2.5 11.9997 2.5Z"></path>
              </svg>
            </span>
            <span className="text-[#1A1A1C]">카카오로 3초 만에 시작하기</span>
          </button>
        </div>
        <div className="flex-grow-0 flex-shrink">
          <h6 className="text-center text-sm">아직 회원이 아니신가요? 회원가입</h6>
        </div>
      </div>
    </div>
  );
};

export default SignInClientComponent;
