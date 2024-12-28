import { render, screen } from "@testing-library/react";

import { Character } from "@/types";
import { CharacterDetail } from "../character-detail";
import { QueryClientProvider } from "../query-client";

// Mock del componente TimelineItem
jest.mock("../time-line-item", () => ({
  TimelineItem: ({ title, content }: { title: string; content: string }) => (
    <div data-testid="timeline-item">
      <strong>{title}:</strong> {content}
    </div>
  ),
}));

jest.mock("next/navigation", () => {
  return {
    useParams: jest.fn(() => ({ id: "1" })),
  }
})

// Mock de los datos del personaje
const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)" } as any,
  location: { name: "Citadel of Ricks" } as any,
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
  ],
  created: "2017-11-04T18:48:46.250Z",
  url: "https://rickandmortyapi.com",
};

function renderCharacterDetail(character: Character = mockCharacter) {
  return render(
    <QueryClientProvider>
      <CharacterDetail character={character} />
    </QueryClientProvider>
  );
}

describe("CharacterDetail Component", () => {
  it("renders character image with correct alt text", () => {
    window.history.pushState({}, "Character Detail", "/character/1");

    renderCharacterDetail();

    const image = screen.getByRole("img", { name: /rick sanchez/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
    );
  });

  it("displays character basic information", () => {
    renderCharacterDetail();

    expect(screen.getByText("Human - Alive")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rick Sanchez" })).toBeInTheDocument();
    expect(screen.getByText("No specific type")).toBeInTheDocument();
  });

  it("renders episode appearances correctly", () => {
    renderCharacterDetail();

    const episodes = screen.getAllByTestId("episode")

    expect(episodes).toHaveLength(2);

    episodes.forEach((episode, index) => {
      expect(episode).toHaveTextContent(`Episode ${index + 1}`);
    });
  });

  it("displays character timeline", () => {
    renderCharacterDetail();

    const timelineItems = screen.getAllByTestId("timeline-item");
    expect(timelineItems).toHaveLength(4);

    expect(timelineItems[0]).toHaveTextContent("First Appearance: Episode 1");
    expect(timelineItems[1]).toHaveTextContent("Origin: Earth (C-137)");
    expect(timelineItems[2]).toHaveTextContent("Current Location: Citadel of Ricks");
    expect(timelineItems[3]).toHaveTextContent("Last Known Appearance: Episode 2");
  });

  it("displays character creation date", () => {
    renderCharacterDetail();

    expect(
      screen.getByText("Character added to database on: 11/4/2017")
    ).toBeInTheDocument();
  });
});
