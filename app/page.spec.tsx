import { render, screen } from '@testing-library/react';

import { getCharacters } from '@/services';
import Home from './page';

// Mock the services
jest.mock('@/services', () => ({
  getCharacters: jest.fn(),
}));

// Mock the components
jest.mock('@/components/character-list', () => ({
  CharacterList: jest.fn(({ data }) => (
    <div data-testid="character-list">
      {data?.map((character: any) => (
        <div key={character.id}>{character.name}</div>
      ))}
    </div>
  )),
}));

jest.mock('@/components/primitives', () => ({
  title: jest.fn(() => 'title-class'),
}));

describe('Home Page', () => {
  const mockCharactersData = {
    results: [
      { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
      { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' },
    ],
    info: {
      count: 2,
      pages: 1,
      next: null,
      prev: null,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (getCharacters as jest.Mock).mockResolvedValue(mockCharactersData);
  });

  it('renders the page with default values', async () => {
    const props = {
      searchParams: Promise.resolve({})
    };

    const page = await Home(props);
    render(page);
    
    expect(screen.getByText('Rick')).toBeInTheDocument();
    expect(screen.getByText('&')).toBeInTheDocument();
    expect(screen.getByText('Morty')).toBeInTheDocument();
  });

  it('calls getCharacters with correct page number', async () => {
    const props = {
      searchParams: Promise.resolve({ page: '2' })
    };

    const page = await Home(props);
    render(page);

    expect(getCharacters).toHaveBeenCalledWith(2, '');
  });

  it('calls getCharacters with search parameter', async () => {
    const props = {
      searchParams: Promise.resolve({ search: 'Rick' })
    };

    const page = await Home(props);
    render(page);

    expect(getCharacters).toHaveBeenCalledWith(1, 'Rick');
  });

  it('calls getCharacters with both page and search parameters', async () => {
    const props = {
      searchParams: Promise.resolve({ page: '2', search: 'Rick' })
    };

    const page = await Home(props);
    render(page);

    expect(getCharacters).toHaveBeenCalledWith(2, 'Rick');
  });

  it('handles empty results', async () => {
    (getCharacters as jest.Mock).mockResolvedValue({
      results: [],
      info: { count: 0, pages: 0, next: null, prev: null }
    });

    const props = {
      searchParams: Promise.resolve({})
    };

    const page = await Home(props);
    render(page);

    const characterList = screen.getByTestId('character-list');
    expect(characterList).toBeEmptyDOMElement();
  });

  it('passes correct props to CharacterList', async () => {
    const props = {
      searchParams: Promise.resolve({})
    };

    const page = await Home(props);
    render(page);

    const characterList = screen.getByTestId('character-list');
    expect(characterList).toBeInTheDocument();
    expect(characterList).toHaveTextContent('Rick Sanchez');
    expect(characterList).toHaveTextContent('Morty Smith');
  });
});