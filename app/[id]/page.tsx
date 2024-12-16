import { CharacterDetail } from "@/components/character-detail";
import { getCharacterDetail } from "@/services";

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

