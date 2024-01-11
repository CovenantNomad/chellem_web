'use client'

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  })

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default Providers;
