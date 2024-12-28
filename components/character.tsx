import "./character.scss";

import { Card, CardFooter, Image } from "@nextui-org/react";

import { Character } from "@/types";
import Link from "next/link";

type CharacterCardProps = Pick<Character, 'id' | 'image' | 'name' | 'species' | 'status'>

const STATUS: Record<Character['status'], string> = {
    'Alive': '🟢 Alive',
    'Dead': '🔴 Dead',
    'unknown': '❓ Unknown'
}

export function CharacterCard(character: Readonly<CharacterCardProps>) {
    return (
        <Link href={`/${character.id}`} prefetch>
            <Card isFooterBlurred className="character-item">
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="character-item__image"
                    src={character.image}
                />
                <CardFooter className="character-item__footer">
                    <div>
                        <p className="text-purple character-item__footer__name">{character.name}</p>
                        <p className="text-black text-tiny">{character.species}</p>
                        <p className="text-black text-tiny">{STATUS[character.status]}</p>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}