"use client"

import { useGetCharacters, useQueryString } from "@/hooks";

import { CharacterCard } from "@/components/character";
import { CharacterResult } from "@/services";
import { Pagination } from "@nextui-org/pagination";

type CharacterListProps = {
    readonly characters: CharacterResult
}

const DEFAULT_INITIAL_PAGE = 1

export function CharacterList({ characters }: CharacterListProps) {
    const { router, createQueryString, searchParams } = useQueryString();
    const currentPage = Number(searchParams.get('page') ?? DEFAULT_INITIAL_PAGE);

    const { data, isLoading, isError } = useGetCharacters(characters);

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error to load characters.</div>

    return (
        <>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.results?.map((character) => (
                    <CharacterCard key={character?.id} {...character} />
                ))}
            </div>

            <Pagination
                key={currentPage}
                showControls
                initialPage={currentPage}
                total={data?.info?.pages ?? 0}
                onChange={(page: number) => {
                    const query = createQueryString('page', `${page ?? DEFAULT_INITIAL_PAGE}`)
                    router.replace(query)
                }
                }
            />
        </>
    )
}