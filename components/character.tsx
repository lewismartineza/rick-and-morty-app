"use client"

import { Character } from "@/types"
import { Card, Image, CardFooter, Button } from "@nextui-org/react"
import { useRouter } from "next/navigation";


type CharacterCardProps = Pick<Character, 'id' | 'image' | 'name' | 'species' | 'status'>

export function CharacterCard(character: CharacterCardProps) {
    const router = useRouter()

    return (
        <Card isFooterBlurred className="w-full h-[300px]">
            <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                src={character.image}
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                <div>
                    <p className="text-[purple] font-bold text-md">{character.name}</p>
                    <p className="text-black text-tiny">{character.species}</p>
                    <p className="text-black text-tiny">{character.status === 'Alive' ? '🟢 Alive' : character.status === 'Dead' ? '🔴 Dead' : '❓ Unknown'}</p>
                </div>
                <Button className="text-tiny" color="primary" radius="full" size="sm" onClick={() => router.push(`${character.id}`)}>
                    More
                </Button>
            </CardFooter>
        </Card>
    )
}