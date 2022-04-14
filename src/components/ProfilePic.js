import { useEffect, useState } from 'react'
import { supabase } from '../lib/initSupabase'
import { Alert, StyleSheet, View, Image } from 'react-native'
import { Button, Input } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';


export default function ProfilePic({ url, size, onUpload }) {
  const [image, setImage] = useState(null);
  const [ProfilePicUrl, setProfilePicUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setProfilePicUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  async function uploadProfilePic(uri) {
    try {
      setUploading(true)

      if (!uri) {
        throw new Error('You must select an image to upload.')
      }

      const response = await fetch(uri);
      console.log(response)
      const file = await response.blob();
      console.log(file)
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `public/${fileName}`

      const { data, error } = await supabase
      .storage
      .from('avatars')
      .upload('public/avatar1.png', avatarFile, {
        cacheControl: '3600',
        upsert: false
      })


      console.log(error)
      console.log(data)

      if (error) {
        console.log("upload error")
        throw error
      }

      onUpload(filePath)

    } catch (error) {
      console.log("we are here: error")
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }
  
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
    console.log("now")
    console.log(image)
  };


  return (
    <View>
      {ProfilePicUrl && <Image source={{ uri: ProfilePicUrl }} style={{ width: 200, height: 200 }} />}

      <View>
  
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Set as Profile Picture" onPress={uploadProfilePic} />

      </View>
    </View>
  )
}