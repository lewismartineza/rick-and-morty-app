import { CharacterList } from "@/components/character-list";
import { title } from "@/components/primitives";
import { getCharacters } from "@/services";
import { Suspense } from "react";

type Request = {
  searchParams: Promise<{ [key: string]: string }>;
};

export default async function Home({ searchParams }: Readonly<Request>) {
  const params = await searchParams;
  const page = params?.page ?? 1;
  const search = params?.search ?? "";
  const characters = await getCharacters(+page, search);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Rick&nbsp;</span>
        <span className={title({ color: "violet" })}>&&nbsp;</span>
        <span className={title()}>Morty&nbsp;</span>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <CharacterList characters={characters} />
      </Suspense>
    </section>
  );
}