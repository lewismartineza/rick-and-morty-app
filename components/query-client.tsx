"use client";

import { QueryClient, QueryClientProvider as TSQueryClientProvider } from "@tanstack/react-query";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

type CustomQueryClientProviderProps = {
    readonly children: React.ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 30,
            retry: false,
        },
    },
});

function QueryClientProvider({ children }: CustomQueryClientProviderProps) {
    return (
        <TSQueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </TSQueryClientProvider>
    );
}

export * from "@tanstack/react-query";
export { QueryClientProvider };
