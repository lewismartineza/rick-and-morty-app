"use client"

import { useGetCharacterDetail } from "@/hooks";
import { Character } from "@/types";
import { Image } from "@nextui-org/react";
import { TimelineItem } from "./time-line-item";

type CharacterDetailProps = {
    readonly character: Character
}

export function CharacterDetail({ character }: CharacterDetailProps) {
    const { data, isLoading, isError } = useGetCharacterDetail(character);

    if (isLoading) return <div>Loading...</div>

    if (isError) return <div>Error to load character.</div>

    return (
        <div className="bg-purple-900/60 rounded-lg overflow-hidden shadow-xl">
            <div className="md:flex">
                <div className="md:flex-shrink-0 flex justify-center">
                    <Image
                        src={data?.image}
                        alt={data?.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover "
                    />
                </div>
                <div className="p-8 text-center lg:w-full md:w-96">
                    <div className="uppercase tracking-wide text-sm text-green-400 font-semibold mb-1">
                        {data?.species} - {data?.status}
                    </div>
                    <h1 className="text-4xl font-bold text-white leading-tight mb-2">
                        {data?.name}
                    </h1>
                    <p className="text-gray-300 mb-4">
                        {data?.type ? `Type : ${data?.type}` : 'No specific type'}
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-green-400">Gender:</span> {data?.gender}
                        </div>
                        <div>
                            <span className="text-green-400 origin">Origin:</span> {data?.origin.name}
                        </div>
                        <div>
                            <span className="text-green-400">Location:</span> {data?.location.name}
                        </div>
                        <div>
                            <span className="text-green-400">Episodes:</span> {data?.episode.length}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-8 py-6 bg-purple-950/50">
                <h2 className="text-2xl font-bold mb-4">Episode Appearances</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {data?.episode.map((ep, index) => (
                        <div key={index} className="bg-purple-800/50 p-2 rounded text-center text-sm episode" data-testid="episode">
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
                        <TimelineItem title="First Appearance" content={`Episode ${data?.episode[0].split('/').pop()}`} />
                        <TimelineItem title="Origin" content={data?.origin.name ?? ""} />
                        <TimelineItem title="Current Location" content={data?.location.name ?? ""} />
                        <TimelineItem title="Last Known Appearance" content={`Episode ${data?.episode[character.episode.length - 1].split('/').pop()}`} />
                    </div>
                </div>
            </div>

            <div className="px-8 py-6 bg-purple-950/50 text-center">
                <p className="text-sm text-gray-400">
                    Character added to database on: {new Date(data?.created ?? "").toLocaleDateString()}
                </p>
            </div>
        </div>
    )
}