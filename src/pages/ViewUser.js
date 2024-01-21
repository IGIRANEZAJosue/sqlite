import React, { useState } from 'react';
import { Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Mytext from './components/Mytext';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { DatabaseConnection } from '../database/database-connection';
import tw from "twrnc"

const db = DatabaseConnection.getConnection();

const ViewUser = () => {
  let [inputUserId, setInputUserId] = useState('');
  let [userData, setUserData] = useState({});

  let searchUser = () => {
    console.log(inputUserId);
    setUserData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [inputUserId],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            setUserData(results.rows.item(0));
          } else {
            alert('User not found !');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
        
        <Text style={tw`mx-[35px] mt-4 text-lg mb-2`}>User Filter</Text>
          
          <TextInput
            placeholder="Enter User Code"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={tw`p-[10px] border-[1.5px] border-[#6c63ff] mx-[35px] rounded-lg mb-4`}
          />
          <TouchableOpacity onPress={searchUser} style={tw`bg-[#6c63ff] mx-[35px] items-center p-[10px] rounded-lg my-5 `}>
            <Text style={tw`text-white`}>View User</Text>
          </TouchableOpacity>

          <View
            style={tw` mx-[35px] mt-[10px]`}>
            <Text>ID : {userData.user_id}</Text>
            <Text>Name : {userData.user_name}</Text>
            <Text>Telephone : {userData.user_contact}</Text>
            <Text>Address : {userData.user_address}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewUser;