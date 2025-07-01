import { SafeAreaView, Text, View, TouchableOpacity, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useState } from 'react';

// Tipos explícitos para músicas e mashup
interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
}
interface Mashup {
  title: string;
  artists: string;
  cover: string;
  url: string;
}

const MOCK_SONGS: Song[] = [
  {
    id: '1',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    cover: 'https://i.scdn.co/image/ab67616d0000b273e5b8b7b8b7b8b7b8b7b8b7b8',
  },
  {
    id: '2',
    title: 'Levitating',
    artist: 'Dua Lipa',
    cover: 'https://i.scdn.co/image/ab67616d0000b273b8b7b8b7b8b7b8b7b8b7b8b7',
  },
  {
    id: '3',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    cover: 'https://i.scdn.co/image/ab67616d0000b273c7b8b7b8b7b8b7b8b7b8b7b8',
  },
];

const MOCK_MASHUP: Mashup = {
  title: 'Blinding Levitating',
  artists: 'The Weeknd x Dua Lipa',
  cover: 'https://i.scdn.co/image/ab67616d0000b273e5b8b7b8b7b8b7b8b7b8b7b8',
  url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
};

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: theme.colors.textPrimary,
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  slot: {
    width: 150,
    height: 180,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 2,
    borderColor: 'transparent',
  },
  slotSelected: {
    borderColor: theme.colors.accent,
    shadowOpacity: 0.18,
  },
  slotEmptyIcon: {
    marginBottom: 10,
    opacity: 0.25,
  },
  slotCover: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 10,
  },
  slotTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  slotArtist: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  plusIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: theme.colors.accent,
    borderRadius: 12,
    padding: 2,
    zIndex: 2,
  },
  mixButton: {
    marginTop: theme.spacing.xl,
    alignSelf: 'center',
    backgroundColor: theme.colors.accent,
    borderRadius: 32,
    paddingVertical: 18,
    paddingHorizontal: 60,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: theme.colors.accent,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 6,
    opacity: 1,
  },
  mixButtonDisabled: {
    opacity: 0.5,
  },
  mixButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  mashupPlayer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mashupCover: {
    width: 120,
    height: 120,
    borderRadius: 18,
    marginBottom: 12,
  },
  mashupTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'center',
  },
  mashupArtists: {
    fontSize: 15,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  audioMock: {
    marginTop: 10,
    color: theme.colors.textSecondary,
    fontSize: 13,
    fontStyle: 'italic',
  },
}));

export default function HomeScreen() {
  const { styles } = useStyles(stylesheet);
  const [vocal, setVocal] = useState<Song | null>(null);
  const [melody, setMelody] = useState<Song | null>(null);
  const [loading, setLoading] = useState(false);
  const [mashup, setMashup] = useState<Mashup | null>(null);

  function selectSong(type: 'vocal' | 'melody') {
    const available = MOCK_SONGS.filter(s => s.id !== (type === 'vocal' ? melody?.id : vocal?.id));
    const song = available[Math.floor(Math.random() * available.length)];
    if (type === 'vocal') setVocal(song);
    else setMelody(song);
  }

  function handleMix() {
    setLoading(true);
    setTimeout(() => {
      setMashup(MOCK_MASHUP);
      setLoading(false);
    }, 1800);
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#f8fafc", "#e0e7ff", "#f0abfc"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>🎚️ BeatBlend Mashup</Text>
      </View>
      <View style={styles.slotRow}>
        {/* Slot Vocal */}
        <Pressable
          style={[styles.slot, vocal && styles.slotSelected]}
          onPress={() => selectSong('vocal')}
        >
          <View style={styles.plusIcon}><FontAwesome5 name="microphone" size={16} color="#000" /></View>
          {vocal ? (
            <>
              <Image source={{ uri: vocal.cover }} style={styles.slotCover} />
              <Text style={styles.slotTitle}>{vocal.title}</Text>
              <Text style={styles.slotArtist}>{vocal.artist}</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="mic" size={40} color="#aaa" style={styles.slotEmptyIcon} />
              <Text style={styles.slotTitle}>Escolher Vocal</Text>
            </>
          )}
        </Pressable>
        {/* Slot Melodia */}
        <Pressable
          style={[styles.slot, melody && styles.slotSelected]}
          onPress={() => selectSong('melody')}
        >
          <View style={styles.plusIcon}><FontAwesome5 name="music" size={16} color="#000" /></View>
          {melody ? (
            <>
              <Image source={{ uri: melody.cover }} style={styles.slotCover} />
              <Text style={styles.slotTitle}>{melody.title}</Text>
              <Text style={styles.slotArtist}>{melody.artist}</Text>
            </>
          ) : (
            <>
              <MaterialIcons name="music-note" size={40} color="#aaa" style={styles.slotEmptyIcon} />
              <Text style={styles.slotTitle}>Escolher Melodia</Text>
            </>
          )}
        </Pressable>
      </View>
      <TouchableOpacity
        style={[styles.mixButton, (!vocal || !melody || loading) && styles.mixButtonDisabled]}
        disabled={!vocal || !melody || loading}
        onPress={handleMix}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <MaterialIcons name="graphic-eq" size={24} color="#000" />
        )}
        <Text style={styles.mixButtonText}>{loading ? 'Mixando...' : 'Mixar'}</Text>
      </TouchableOpacity>
      {mashup && !loading && (
        <View style={styles.mashupPlayer}>
          <Image source={{ uri: mashup.cover }} style={styles.mashupCover} />
          <Text style={styles.mashupTitle}>{mashup.title}</Text>
          <Text style={styles.mashupArtists}>{mashup.artists}</Text>
          {/* Player real pode ser adicionado depois */}
          <Text style={styles.audioMock}>[Player de áudio mockado]</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
