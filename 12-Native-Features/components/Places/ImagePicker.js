import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useState } from "react";

import { Colors } from "../../constants/colors";

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();

  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }
    //     // If we make it into neither of these if-checks,
    //     // we know that we're not in undetermined state and it was not denied,
    //     // so we do have the permission to use the camera and hence I'll return true here.
    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    //     // console.log(image);
    setPickedImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

// // below code does not render image file... small bug
// import { useState } from "react";
// import { Alert, Button, Image, View, Text, StyleSheet } from "react-native";
// import {
//   launchCameraAsync,
//   PermissionStatus,
//   useCameraPermissions,
// } from "expo-image-picker";
// import { Colors } from "../../constants/colors";

// function ImagePicker() {
//   const [pickedImage, setPickedImage] = useState();

//   const [cameraPermissionInformation, requestPermission] =
//     useCameraPermissions();

//   async function verifyPermissions() {
//     if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
//       const permissionResponse = await requestPermission();

//       return permissionResponse.granted;
//     }
//     if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
//       Alert.alert(
//         "Insufficient Permissions!",
//         "You need to grant camera permissions to use this app."
//       );
//       return false;
//     }
//     // If we make it into neither of these if-checks,
//     // we know that we're not in undetermined state and it was not denied,
//     // so we do have the permission to use the camera and hence I'll return true here.
//     return true;
//   }

//   async function takeImageHandler() {
//     const hasPermission = await verifyPermissions();

//     if (!hasPermission) {
//       return;
//     }

//     const image = await launchCameraAsync({
//       allowsEditing: true,
//       aspect: [16, 9],
//       quality: 0.5,
//     });
//     // console.log(image);
//     setPickedImage(image.uri);
//   }
//   // if we have no image then display message
//   let imagePreview = <Text>No image taken yet.</Text>;

//   if (pickedImage) {
//     imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />;
//   }

//   return (
//     <View>
//       <View style={styles.imagePreview}>{imagePreview}</View>
//       <Button title="Take Image" onPress={takeImageHandler} />
//     </View>
//   );
// }

// export default ImagePicker;

// const styles = StyleSheet.create({
//   imagePreview: {
//     width: "100%",
//     height: 200,
//     marginVertical: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: Colors.primary100,
//     borderRadius: 4,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
// });
