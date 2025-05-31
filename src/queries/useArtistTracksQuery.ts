import { useQuery } from "@tanstack/react-query";
import { getTopTracks } from "../services/deezerService";

export function useArtistTracksQuery(artistId?: number) {
  return useQuery({
    queryKey: ["tracks", artistId],
    queryFn: async () => {
      const res = await getTopTracks(artistId!);
      if (Array.isArray(res)) return res;
      if (res && typeof res === 'object' && 'data' in res && Array.isArray((res as any).data)) return (res as any).data;
      return [];
    },
    enabled: !!artistId,
  });
}