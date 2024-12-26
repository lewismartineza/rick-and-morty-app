import { getCharacterDetail } from "@/services";
import { Character } from "@/types";
import { useQuery } from "@/utils/query-client";
import { useParams } from "next/navigation";
export function useGetCharacterDetail(initialData?: Character) {
  const {id} = useParams<{id: string}>();
  return useQuery({
    queryKey: ["character", id],
    queryFn: async () => await getCharacterDetail(id),
    initialData,
    enabled: !!id,
  });
}