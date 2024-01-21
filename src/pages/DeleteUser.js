import React, { useState } from 'react';
import { View, Alert, SafeAreaView, TextInput, TouchableOpacity, Text } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import tw from "twrnc"

const db = DatabaseConnection.getConnection();

const DeleteUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User Deleted Successfully!',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please enter a valid user code!');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Enter User ID"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={tw`p-[10px] border-[1.5px] border-[#6c63ff] mx-[35px] rounded-lg mt-6 mb-4`}
          />
          <TouchableOpacity onPress={deleteUser} style={tw`bg-[#6c63ff] mx-[35px] items-center p-[10px] rounded-lg my-5 `}>
            <Text style={tw`text-white`}>Delete User</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;