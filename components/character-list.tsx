"use client"

import { Pagination } from "@nextui-org/pagination";
import { Character } from "@/types";
import { CharacterCard } from "@/components/character";
import { useQueryString } from "@/hooks/use-query-string";

type CharacterListProps = {
    data: Character[]
    totalPages: number
    activePage: number
}

const DEFAULT_INITIAL_PAGE = 1

export function CharacterList({ data, totalPages, activePage }: CharacterListProps) {
    const { router, pathname, createQueryString } = useQueryString();

    return (
        <>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.map((character) => (
                    <CharacterCard key={character.id} {...character} />
                ))}
            </div>

            <Pagination showControls initialPage={activePage ?? DEFAULT_INITIAL_PAGE} total={totalPages} onChange={(page) => {
                const query = createQueryString('page', `${page ?? DEFAULT_INITIAL_PAGE}`)
                const url = `${pathname}?${query}`
                router.push(url)
            }} />
        </>
    )
}