import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
import tw from "twrnc";


import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import { TouchableOpacity } from 'react-native-gesture-handler';

const db = DatabaseConnection.getConnection();

const UpdateUser = ({ navigation }) => {

  let [inputUserId, setInputUserId] = useState('');
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let updateAllStates = (name, contact, address) => {
    setUserName(name);
    setUserContact(contact);
    setUserAddress(address);
  };

  let searchUser = () => {
    console.log(inputUserId);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            let res = results.rows.item(0);
            updateAllStates(
              res.user_name,
              res.user_contact,
              res.user_address
            );
          } else {
            alert('User not found!');
            updateAllStates('', '', '');
          }
        }
      );
    });
  };
  let updateUser = () => {
    console.log(inputUserId, userName, userContact, userAddress);

    if (!inputUserId) {
      alert('Please provide the Code!');
      return;
    }
    if (!userName) {
      alert('Please provide the name!');
      return;
    }
    if (!userContact) {
      alert('Please provide your telephone number!');
      return;
    }
    if (!userAddress) {
      alert('Please provide the address!');
      return;
    }

    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
        [userName, userContact, userAddress, inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Sucess',
              'User updated successfully!!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Error updating user');
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
              style={tw`flex-1 justify-between`}>
              <Text style={tw`mx-[35px] mt-4 text-lg mb-2`}>User Filter</Text>
              <TextInput
                placeholder="Enter User Code"
                onChangeText={
                  (inputUserId) => setInputUserId(inputUserId)
                }
                style={tw`p-[10px] border-[1.5px] border-[#6c63ff] mx-[35px] rounded-lg`}
              />

                <TouchableOpacity onPress={searchUser} style={tw`bg-[#6c63ff] mx-[35px] items-center p-[10px] rounded-lg my-5 `}>
                  <Text style={tw`text-white`}>Search User</Text>
                </TouchableOpacity>

              
              <TextInput
                placeholder="Enter Name"
                value={userName}
                style={tw`p-[10px] border-[1.5px] border-[#6c63ff] mx-[35px] rounded-lg mb-4`}
                onChangeText={
                  (userName) => setUserName(userName)
                }
              />
              <TextInput
                placeholder="Enter Phone"
                value={'' + userContact}
                onChangeText={
                  (userContact) => setUserContact(userContact)
                }
                maxLength={10}
                style={tw`p-[10px] border-[1px] border-[#6c63ff] mx-[35px] rounded-lg mb-4`}
                keyboardType="numeric"
              />
              <TextInput
                value={userAddress}
                placeholder="Enter Address"
                onChangeText={
                  (userAddress) => setUserAddress(userAddress)
                }
                maxLength={225}
                numberOfLines={5}
                multiline={true}
                style={tw`p-[10px] border-[1.5px] border-[#6c63ff] mx-[35px] rounded-lg mb-4`}
              />
              <TouchableOpacity onPress={updateUser} style={tw`bg-[#6c63ff] mx-[35px] items-center p-[10px] rounded-lg my-5 `}>
                <Text style={tw`text-white`}>Update User</Text>
              </TouchableOpacity>

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateUser;