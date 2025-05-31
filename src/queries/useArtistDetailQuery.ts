import { useQuery } from "@tanstack/react-query";
import { getArtist } from "../services/deezerService";

export function useArtistDetailQuery(artistId?: number) {
  return useQuery({
    queryKey: ["artist", artistId],
    queryFn: async () => {
      if (!artistId) return null;
      return await getArtist(artistId);
    },
    enabled: !!artistId,
  });
} 