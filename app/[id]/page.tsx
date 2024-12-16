import { CharacterDetail } from "@/components/character-detail";
import type { Character } from "@/types";

const character = {
	"id": 6,
	"name": "Abadango Cluster Princess",
	"status": "Alive",
	"species": "Alien",
	"type": "",
	"gender": "Female",
	"origin": {
		"name": "Abadango",
		"url": "https://rickandmortyapi.com/api/location/2"
	},
	"location": {
		"name": "Abadango",
		"url": "https://rickandmortyapi.com/api/location/2"
	},
	"image": "https://rickandmortyapi.com/api/character/avatar/6.jpeg",
	"episode": [
		"https://rickandmortyapi.com/api/episode/27"
	],
	"url": "https://rickandmortyapi.com/api/character/6",
	"created": "2017-11-04T19:50:28.250Z"
}


export default async function DetailPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const character = await getCharacterDetail(id)

	return (
		<div className="min-h-screen text-white">
			<CharacterDetail character={character} />
		</div>
	);
}

async function getCharacterDetail(id: string): Promise<Character> {
	const response = await fetch(`${process.env.API_URL}/character/${id}`);
	const data = await response.json();
	return data;
}
