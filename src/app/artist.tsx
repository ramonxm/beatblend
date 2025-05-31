import { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { DeezerTrack } from "../services/deezerService";
import { Audio } from 'expo-av';
import { useArtistDetailQuery } from "../queries/useArtistDetailQuery";
import { useArtistTracksQuery } from "../queries/useArtistTracksQuery";

export default function ArtistScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const artistId = Number(id);

  const router = useRouter();
  
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  
  const { data: artist, isLoading: loading } = useArtistDetailQuery(artistId);
  const { data: tracks = [], isLoading: loadingTracks } = useArtistTracksQuery(artistId);

  const handlePlay = async (track: DeezerTrack) => {
    try {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri: track.preview });
      soundRef.current = sound;
      setPlayingId(track.id);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) setPlayingId(null);
      });
    } catch (e) {
      setPlayingId(null);
    }
  };

  const handlePause = async () => {
    if (soundRef.current) {
      await soundRef.current.pauseAsync();
      setPlayingId(null);
    }
  };

  if (loading || !artist) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
        <ActivityIndicator size="large" color="#ff0" style={{ marginTop: 40 }} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ margin: 20 }}>
          <Text style={{ color: '#ff0', fontSize: 18 }}>← Voltar</Text>
        </TouchableOpacity>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image source={{ uri: artist.picture_medium }} style={styles.artistImage} />
          <Text style={styles.artistName}>{artist.name}</Text>
          {artist.nb_fan && (
            <Text style={styles.artistFans}>{artist.nb_fan.toLocaleString()} fãs</Text>
          )}
        </View>
        <Text style={styles.sectionTitle}>Músicas</Text>
        {loadingTracks ? (
          <ActivityIndicator size="small" color="#ff0" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={tracks}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                  backgroundColor: playingId === item.id ? '#222' : 'transparent',
                  borderRadius: 12,
                  padding: 8,
                  borderWidth: playingId === item.id ? 1 : 0,
                  borderColor: playingId === item.id ? '#ff0' : 'transparent',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#fff', fontSize: 16, fontWeight: playingId === item.id ? 'bold' : 'normal' }}>{item.title}</Text>
                  <Text style={{ color: '#aaa', fontSize: 13 }}>Duração: {Math.floor(item.duration / 60)}:{(item.duration % 60).toString().padStart(2, '0')}</Text>
                </View>
                <TouchableOpacity
                  onPress={playingId === item.id ? handlePause : () => handlePlay(item)}
                  style={{ marginLeft: 12 }}
                >
                  <Text style={{ fontSize: 22, color: '#ff0' }}>{playingId === item.id ? '⏸️' : '▶️'}</Text>
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={{ color: '#aaa', textAlign: 'center', marginTop: 20 }}>Nenhuma música encontrada.</Text>}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  artistImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    backgroundColor: '#333',
  },
  artistName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 4,
    textAlign: 'center',
  },
  artistFans: {
    color: '#aaa',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
}); 