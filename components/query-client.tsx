"use client";

import { QueryClientProvider as TSQueryClientProvider, queryClient } from "@/utils/query-client";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type CustomQueryClientProviderProps = {
    readonly children: React.ReactNode;
}

export function QueryClientProvider({ children }: CustomQueryClientProviderProps) {
    return (
        <TSQueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </TSQueryClientProvider>
    );
}


