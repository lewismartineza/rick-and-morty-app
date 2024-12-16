import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useCallback } from "react";

export function useQueryString() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
    
            return `${pathname}?${params.toString()}`
        },
        [searchParams]
    )
    
    return {router, pathname, searchParams, createQueryString}
}