import { CharacterCard } from "@/components/character";
import { title } from "@/components/primitives";
import type { Character, Info } from "@/types";

export default async function Home() {
  const characters = await getCharacters()

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Rick&nbsp;</span>
        <span className={title({ color: "violet" })}>&&nbsp;</span>
        <span className={title()}>Morty&nbsp;</span>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters?.results?.map((character) => (
          <CharacterCard key={character.name} {...character} />
        ))}
      </div>
    </section>
  );
}

type CharacterResult = {
  info: Info,
  results: Character[]
}

async function getCharacters(): Promise<CharacterResult> {
  const response = await fetch(`${process.env.API_URL}/character`)
  const data = await response.json();
  return data
}
