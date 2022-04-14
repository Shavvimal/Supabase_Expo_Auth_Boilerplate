import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";
import { SafeAreaView , View, Alert, Button, TextInput, Text } from "react-native";
import { ApiError, Session } from "@supabase/supabase-js";

import ProfilePic from "../components/ProfilePic";

export default function Account({ session }: { session: Session }) {
  
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar_url, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string;
    website: string;
    avatar_url: string;
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      if (!user) throw new Error("No user on the session!");

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (error) {
      Alert.alert((error as ApiError).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      <Text> You're In Mate🎉🎉</Text>
      <View >
        <TextInput placeholder="Email" value={session?.user?.email}/>
      </View>

      <View >
        <TextInput
          placeholder="Username"
          value={username || ""}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View >
        <TextInput
          placeholder="Website"
          value={website || ""}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View >
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        />
      </View>

      <View >
        <Button title="Sign Out" color="red" onPress={() => supabase.auth.signOut()} />
      </View>

      {/* <ProfilePic url={avatar_url}
      size={150}       onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, website, avatar_url: url })
      }}/> */}

    </View >
  );
}
