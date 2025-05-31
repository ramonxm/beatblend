export type DeezerArtist = {
  id: number;
  name: string;
  nb_album: number;
  nb_fan: number;
  picture_medium: string;
};

export type DeezerTrack = {
  id: number;
  title: string;
  duration: number;
  preview: string;
};

export type Artist = {
  id: number;
  name: string;
  picture: string;
  picture_medium: string;
};

export async function getTopArtists(): Promise<Artist[]> {
  const url = "https://api.deezer.com/chart/0/artists";
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}

export async function searchArtists(query: string): Promise<DeezerArtist[]> {
  const url = `https://api.deezer.com/search/artist?q=${encodeURIComponent(
    query
  )}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data;
}

export async function getArtist(id: number): Promise<DeezerArtist> {
  const url = `https://api.deezer.com/artist/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getTopTracks(artistId: number): Promise<DeezerTrack[]> {
  const url = `https://api.deezer.com/artist/${artistId}/top?limit=10`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
