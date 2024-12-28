"use client"

import "./character-list.scss";

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
            <div className="character-list">
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