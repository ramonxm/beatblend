import { useState } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Artist } from "../services/deezerService";
import { useRouter } from "expo-router";
import { useArtistsQuery } from "../queries/useArtistsQuery";

const CARD_WIDTH = 140;
const CARD_HEIGHT = 180;

function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: artist.picture_medium }} style={styles.cardImage} />
      <Text style={styles.cardName} numberOfLines={1}>
        {artist.name}
      </Text>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { data: artists = [], isLoading: loading } = useArtistsQuery(search);

  const handleSearch = (query: string) => {
    setSearch(query);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#111" }}>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "#fff",
            fontSize: 28,
            fontWeight: "bold",
            marginLeft: 20,
            marginTop: 16,
            marginBottom: 10,
            letterSpacing: 1.2,
          }}
        >
          BeatBlend
        </Text>
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Buscar artista..."
          placeholderTextColor="#aaa"
          style={{
            fontSize: 16,
            color: "#fff",
            marginBottom: 16,
            borderRadius: 12,
            paddingVertical: 10,
            marginHorizontal: 20,
            paddingHorizontal: 16,
            backgroundColor: "#222",
          }}
        />
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            marginLeft: 20,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          Top Artists
        </Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#ff0"
            style={{ marginTop: 40 }}
          />
        ) : (
          <FlatList
            horizontal
            data={artists}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: index < 3 ? 0.5 : 0.2,
                  shadowColor: index < 3 ? "#ff0" : "#000",
                }}
                onPress={() =>
                  router.push({ pathname: "/artist", params: { id: item.id } })
                }
              >
                <ArtistCard artist={item} />
                {index < 3 && (
                  <View
                    style={{
                      top: 8,
                      right: 8,
                      borderRadius: 8,
                      paddingVertical: 2,
                      position: "absolute",
                      paddingHorizontal: 6,
                      backgroundColor: "#ff0",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#222",
                        fontWeight: "bold",
                      }}
                    >
                      TOP
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#222",
    borderRadius: 18,
    marginRight: 16,
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    backgroundColor: "#333",
  },
  cardName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    textAlign: "center",
  },
  cardFans: {
    color: "#aaa",
    fontSize: 13,
    textAlign: "center",
  },
});
