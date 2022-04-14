import React, {useState} from "react";
import { View, Linking, Button, Text } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { supabase } from "../lib/initSupabase";

export default function ({navigation,}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {

  async function logout() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert("Signed out!");
    }
    if (error) {
      alert(error.message);
    }
  }


  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text> You're In Mate🎉🎉</Text>
        <Button
          color="red"
          title="Logout"
          onPress={() => {
            logout();
          }}
        />
      </View>
    </>
  );
}
