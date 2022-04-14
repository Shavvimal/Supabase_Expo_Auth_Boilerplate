import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  TextInput,
  Button,
} from "react-native";
import { supabase } from "../../lib/initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";


export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "ForgetPassword">) {

  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function forget() {
    setLoading(true);
    const { data, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    if (!error) {
      setLoading(false);
      alert("Check your email to reset your password!");
    }
    if (error) {
      setLoading(false);
      alert(error.message);
    }
  }
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >

          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: "white",
            }}
          >
            <Text
    
             
              style={{
                alignSelf: "center",
                padding: 30,
              }}
            >
              Forget Password
            </Text>
            <Text>Email</Text>
            <TextInput
              
              placeholder="Enter your email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />
            <Button
              title={loading ? "Loading" : "Send email"}
              onPress={() => {
                forget();
              }}
             
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
              }}
            >
              <Text>Already have an account?</Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text
            
                
                  style={{
                    marginLeft: 5,
                  }}
                >
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >

            </View>
          </View>
        </ScrollView>

    </KeyboardAvoidingView>
  );
}
