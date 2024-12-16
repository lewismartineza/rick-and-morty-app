import { CharacterList } from "@/components/character-list";
import { title } from "@/components/primitives";
import { getCharacters } from "@/services";

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  const params = await searchParams
  const page = params?.page ?? 1
  const search = params?.search ?? ""
  const characters = await getCharacters(page as number, search)

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Rick&nbsp;</span>
        <span className={title({ color: "violet" })}>&&nbsp;</span>
        <span className={title()}>Morty&nbsp;</span>
      </div>

      <CharacterList activePage={+page} data={characters?.results} totalPages={characters?.info?.pages} />
    </section>
  );
}