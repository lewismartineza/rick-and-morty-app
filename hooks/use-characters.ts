import { CharacterResult, getCharacters } from "@/services";
import { useQuery } from "@/utils/query-client";
import { useSearchParams } from "next/navigation";

export function useGetCharacters(initialData?: CharacterResult) {
  const params =  useSearchParams();
  const search = params.get("search") ?? "";
  const page = params.get("page") ?? 1;
  return useQuery({
    queryKey: ["characters", page, search],
    queryFn: async () => getCharacters(Number(page), search),
    initialData,
  });
}