import React, { useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity, Text } from "react-native";
import MyImageButton from "./components/MyImageButton";
import { DatabaseConnection } from "../database/database-connection";

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
   useEffect(() => {
      db.transaction(function (txn) {
         txn.executeSql(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
            [],
            function (tx, res) {
               console.log("item:", res.rows.length);
               if (res.rows.length == 0) {
                  txn.executeSql("DROP TABLE IF EXISTS table_user", []);
                  txn.executeSql(
                     "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))",
                     []
                  );
               }
            }
         );
      });
   }, []);

   return (
      <SafeAreaView style={{ flex: 1 }}>
         <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ flex: 1 }}>
               <View style={{ flex: 1 }}>
                  <MyImageButton
                     title="Register User"
                     btnColor="#2992C4"
                     btnIcon="user-plus"
                     customClick={() => navigation.navigate("Register")}
                  />

                  <MyImageButton
                     title="Update User"
                     btnColor="#A45BB9"
                     btnIcon="user-circle"
                     customClick={() => navigation.navigate("Update")}
                  />

                  <MyImageButton
                     title="View User"
                     btnColor="#fb8500"
                     btnIcon="user"
                     customClick={() => navigation.navigate("View")}
                  />
                  <MyImageButton
                     title="View All Users"
                     btnColor="#384F62"
                     btnIcon="users"
                     customClick={() => navigation.navigate("ViewAll")}
                  />

                  <MyImageButton
                     title="Delete User"
                     btnColor="#6c63ff"
                     btnIcon="user-times"
                     customClick={() => navigation.navigate("Delete")}
                  />
               </View>
            </View>
         </View>
      </SafeAreaView>
   );
};

export default HomeScreen;
