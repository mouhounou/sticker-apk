import { View, StyleSheet, Platform } from 'react-native';
import { Image } from 'expo-image'; 
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ImgViewer from '@/components/ImgViewer';
import Bouton from '@/components/Bouton';
import * as ImagePicker    from 'expo-image-picker'
import domtoimage from 'dom-to-image';
import { useRef, useState } from 'react';
import IconButton from '@/components/IconButton';
import CircleButton from '@/components/CircleButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';
import * as MediaLibrary from 'expo-media-library'
import { captureRef } from 'react-native-view-shot';



const PlaceholderImage = require('@/assets/images/background-image.png');


export default function Index() {

  const [selectImage,  setSelectImage] = useState <string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<string | undefined>(undefined);
  const imageRef = useRef <View>(null)

  const [status, requestPermission] = MediaLibrary.usePermissions();
  if (status === null){
    requestPermission()
  }

  const pickImageAsync = async () => {

    // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
    //   if (status !== 'granted') {
    //     alert("Nous avons besoin de l'autorisation pour accéder à vos photos !");
    //     return;
    //   }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing :true,
      quality : 1
    })

    if (!result.canceled){
      
      setSelectImage(result.assets[0].uri);
      setShowAppOptions(true)
      console.log('====================================');
      console.log(result);
      console.log('====================================');
    } else {
      console.log('====================================');
      console.log('vous n avez pas choisi une image ');
      console.log('====================================');
    }
  }


  const onReset = () =>{
    setShowAppOptions(false)
  }

  
  const onAddSticker = () =>{
    setIsModalVisible(true)
  }

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  
  const onSaveImageAsync = async () => {
    if (Platform.OS !== 'web') {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert('Saved!');
        }
      } catch (e) {
        console.log(e);
      }
    } else{
      try {
        if (imageRef.current) {
          const dataUrl = await domtoimage.toJpeg(imageRef.current as unknown as Node, {
            quality: 0.95,  
            width: 320,
            height: 440,
          });
      
          let link = document.createElement('a');
          link.download = 'sticker-smash.jpeg';
          link.href = dataUrl;
          link.click();
        }
      } catch (e) {
        console.log(e);
      }
      
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>

      <View style={styles.imageContainer}>
        <View ref = {imageRef} collapsable={false}>
          <ImgViewer imgSource= {PlaceholderImage} selectedImage= {selectImage} />
          {
            pickedEmoji && <EmojiSticker imageSize={40} stickerSource= {pickedEmoji}/>
          }
        </View>
      </View>

      {showAppOptions ?
        (
          <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
        )
        :(
          <View style = {styles.footerContainer}>
            <Bouton theme="primary" label="Choose a photo" onPress={pickImageAsync} />
            <Bouton  label='use this hoto' onPress={ () => setShowAppOptions(true)}/>
        </View>
        )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },

  imageContainer: {
    flex: 1,
  },

  footerContainer : {
    flex : 1/3
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
