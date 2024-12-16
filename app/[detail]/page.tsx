"use client"

import { TimelineItem } from "@/components/time-line-item";
import { Image, } from "@nextui-org/react";


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


export default function DetailPage() {
	return (
		<div className="min-h-screen text-white">
			<div className="bg-purple-900/60 rounded-lg overflow-hidden shadow-xl">
				<div className="md:flex">
					<div className="md:flex-shrink-0 flex justify-center">
						<Image
							src={character.image}
							alt={character.name}
							width={300}
							height={300}
							className="h-full w-full object-cover "
						/>
					</div>
					<div className="p-8 text-center lg:w-full md:w-96">
						<div className="uppercase tracking-wide text-sm text-green-400 font-semibold mb-1">
							{character.species} - {character.status}
						</div>
						<h1 className="text-4xl font-bold text-white leading-tight mb-2">
							{character.name}
						</h1>
						<p className="text-gray-300 mb-4">
							{character.type ? `Type : ${character.type}` : 'No specific type'}
						</p>
						<div className="grid grid-cols-2 gap-4 text-sm">
							<div>
								<span className="text-green-400">Gender:</span> {character.gender}
							</div>
							<div>
								<span className="text-green-400">Origin:</span> {character.origin.name}
							</div>
							<div>
								<span className="text-green-400">Location:</span> {character.location.name}
							</div>
							<div>
								<span className="text-green-400">Episodes:</span> {character.episode.length}
							</div>
						</div>
					</div>
				</div>

				<div className="px-8 py-6 bg-purple-950/50">
					<h2 className="text-2xl font-bold mb-4">Episode Appearances</h2>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{character.episode.map((ep, index) => (
							<div key={index} className="bg-purple-800/50 p-2 rounded text-center text-sm">
								Episode {ep.split('/').pop()}
							</div>
						))}
					</div>
				</div>

				<div className="px-8 py-6 bg-purple-900/40">
					<h2 className="text-2xl font-bold mb-4">Character Timeline</h2>
					<div className="relative">
						<div className="absolute h-full w-1 bg-green-500 left-1/2 transform -translate-x-1/2" />
						<div className="flex flex-col space-y-8">
							<TimelineItem title="First Appearance" content={`Episode ${character.episode[0].split('/').pop()}`} />
							<TimelineItem title="Origin" content={character.origin.name} />
							<TimelineItem title="Current Location" content={character.location.name} />
							<TimelineItem title="Last Known Appearance" content={`Episode ${character.episode[character.episode.length - 1].split('/').pop()}`} />
						</div>
					</div>
				</div>

				<div className="px-8 py-6 bg-purple-950/50 text-center">
					<p className="text-sm text-gray-400">
						Character added to database on: {new Date(character.created).toLocaleDateString()}
					</p>
				</div>
			</div>
		</div>
	);
}

