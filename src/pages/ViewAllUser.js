import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { DatabaseConnection } from '../database/database-connection';
import tw from "twrnc"

const db = DatabaseConnection.getConnection();

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);

  let listItemView = (item) => {
    return (
      <View
        key={item.user_id}
        style={tw`bg-[#EEE] mt-5 p-[30px] rounded-xl`}>
        <Text style={tw`font-bold text-[#111] text-[12px] `}>ID</Text>
        <Text style={tw`text-[#111] text-[18px]`}>{item.user_id}</Text>

        <Text style={tw`font-bold text-[#111] text-[12px] `}>Name</Text>
        <Text style={tw`text-[#111] text-[18px]`}>{item.user_name}</Text>

        <Text style={tw`font-bold text-[#111] text-[12px] `}>Contact</Text>
        <Text style={tw`text-[#111] text-[18px]`}>{item.user_contact}</Text>

        <Text style={tw`font-bold text-[#111] text-[12px] `} >Address</Text>
        <Text style={tw`text-[#111] text-[18px]`}>{item.user_address}</Text>


      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 30 }}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;