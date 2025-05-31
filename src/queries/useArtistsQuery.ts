import { useQuery } from "@tanstack/react-query";
import { getTopArtists } from "../services/deezerService";

import { searchArtists } from "../services/deezerService";

export function useArtistsQuery(search: string) {
  return useQuery({
    queryKey: ["artists", search],
    queryFn: async () => {
      if (search.length < 2) {
        const top = await getTopArtists();
        return top.map((a) => ({
          id: a.id,
          name: a.name,
          picture: a.picture || a.picture_medium || "",
          picture_medium: a.picture_medium || a.picture || "",
        }));
      } else {
        const found = await searchArtists(search);
        return found.map((a) => ({
          id: a.id,
          name: a.name,
          picture: a.picture_medium || "",
          picture_medium: a.picture_medium || "",
        }));
      }
    },
  });
}
