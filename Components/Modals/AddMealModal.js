import React from "react";
import { View, TouchableOpacity, KeyboardAvoidingView, Platform, Text } from "react-native";
import { Modal } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { AppColors } from "../../Styles/AppColors";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function ({ isModalVisible, closeModal }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}

    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={closeModal}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >

        <View style={{ backgroundColor: AppColors.cardBackground,borderTopRightRadius:10,borderTopLeftRadius:10,paddingHorizontal: 10,gap:10,paddingTop:5}}>
          <View style={{ flexDirection: 'row', }}>
            <TextInput
              autoFocus
              placeholder="Type something..."
              style={{ flex: 1, color: 'white', fontSize: 25 }}
            />
            <MaterialCommunityIcons name="barcode-scan" size={40} color="white" />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',gap:10 }}>
            {/*set manually */}
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{ fontSize: 20, color: 'white' }}>
              99999
              </Text>
              <Text style={{ color: 'white' }}>
                weightss
              </Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{ fontSize: 20, color: 'white' }}>
              99999
              </Text>
              <Text style={{ color: 'white' }}>
                Calories
              </Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{ fontSize: 20, color: 'white' }}>
              99999
              </Text>
              <Text style={{ color: 'white' }}>
                carbs
              </Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{ fontSize: 20, color: 'white' }}>
                99999
              </Text>
              <Text style={{ color: 'white' }}>
                fat
              </Text>
            </View>
            <View style={{flex:1,alignItems:'center'}}>
              <Text style={{ fontSize: 20, color: 'white' }}>
              99999
              </Text>
              <Text style={{ color: 'white' }}>
                protein
              </Text>
            </View>
          </View>
          <View>
            {/* meal type*/}
          </View>

        </View>

      </KeyboardAvoidingView>
    </Modal>
  );
};
