"use client"
import { CharacterCard } from "@/components/character";
import { title } from "@/components/primitives";

export default function Home() {

  const character = {
    id: 1,
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human'
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Rick&nbsp;</span>
        <span className={title({ color: "violet" })}>&&nbsp;</span>
        <span className={title()}>Morty&nbsp;</span>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(10).fill(0).map((_, i) => <CharacterCard key={character.name + i}  {...character} />)}
      </div>
    </section>
  );
}
