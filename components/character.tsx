import { Character } from "@/types"
import Link from "next/link";
import { Card, Image, CardFooter } from "@nextui-org/react"

type CharacterCardProps = Pick<Character, 'id' | 'image' | 'name' | 'species' | 'status'>

const STATUS: Record<Character['status'], string> = {
    'Alive': '🟢 Alive',
    'Dead': '🔴 Dead',
    'unknown': '❓ Unknown'
}

export function CharacterCard(character: CharacterCardProps) {
    return (
        <Link href={`/${character.id}`}>
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
                        <p className="text-black text-tiny">{STATUS[character.status]}</p>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}