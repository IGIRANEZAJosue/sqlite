import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import { DatabaseConnection } from '../database/database-connection';

import tw from "twrnc"

const db = DatabaseConnection.getConnection();

const RegisterUser = ({ navigation }) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Please fill in the name!');
      return;
    }
    if (!userContact) {
      alert('Please fill in the contact');
      return;
    }
    if (!userAddress) {
      alert('Please fill in the address!');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User Registered Successfully!!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error when trying to Register User!!!');
        }
      );
    });
  };

  return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={{ flex: 1 }}>
				<ScrollView keyboardShouldPersistTaps="handled">
					<KeyboardAvoidingView
					behavior="padding"
					style={{ flex: 1, justifyContent: 'space-between' }}>
					<TextInput
						placeholder="Enter Name"
						onChangeText={
							(userName) => setUserName(userName)
						}
            style={tw`p-[10px] border-[1.5px] border-[#6c63ff] mx-[35px] rounded-md mt-4 mb-4`}
					/>

					<TextInput
						placeholder="Enter with Phone"
						onChangeText={
							(userContact) => setUserContact(userContact)
						}
						maxLength={10}
						keyboardType="numeric"
            style={tw`p-[10px] border-[1.5px] border-[#6c63ff] mx-[35px] rounded-md mb-4`}
					/>
					<TextInput
						placeholder="Enter the Address"
						onChangeText={
							(userAddress) => setUserAddress(userAddress)
						}
						maxLength={225}
						numberOfLines={5}
						multiline={true}
            style={tw`p-[10px] border-[1.5px] border-[#6c63ff] mx-[35px] rounded-lg mb-4`}
					/>

					<TouchableOpacity onPress={register_user} style={tw`bg-[#6c63ff] mx-[35px] items-center p-[10px] rounded-lg my-5 `}>
            <Text style={tw`text-white`}>Register User</Text>
          </TouchableOpacity>


					</KeyboardAvoidingView>
				</ScrollView>
			</View>
			</View>
		</SafeAreaView>
  );
};

export default RegisterUser;