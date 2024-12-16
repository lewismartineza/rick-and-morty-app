import { Character, Info } from "@/types";

type CharacterResult = {
  info: Info,
  results: Character[]
}

export async function getCharacters(page = 1, search = ""): Promise<CharacterResult> {
  const response = await fetch(`${process.env.API_URL}/character/?page=${page}&name=${search}`)
  const data = await response.json();
  return data
}

export async function getCharacterDetail(id: string): Promise<Character> {
	const response = await fetch(`${process.env.API_URL}/character/${id}`);
	const data = await response.json();
	return data;
}
