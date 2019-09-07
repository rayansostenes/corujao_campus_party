import React, { useState } from "react";
import { Text, View, FlatList, Image, Button } from "react-native";
import styled from "styled-components/native";
import * as ImagePicker from 'expo-image-picker';

const ScreenContainer = styled.View`
  flex: auto;
`;

const TabContainer = styled.View`
  flex-direction: row;
  height: 64px;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const TabItem = styled.TouchableOpacity`
  flex: auto;
`;

const TabItemText = styled.Text`
  text-align: center;
`;

const HeaderContainer = styled.View`
  background: #fff;
  height: 80px;
  padding: 18px;
  align-items: flex-start;
  justify-content: center;
`;

const TitleText = styled.Text`
  font-size: 28;
`;

const data_source = [
  {
    key: "a",
    description: "Minha Descrição da Foto",
    image_url: "https://placeimg.com/640/480/any",
    user: {
      name: "rayansostenes",
      avatar: "https://i.pravatar.cc/128"
    }
  },
  {
    key: "a",
    description: "Segunda Minha Descrição da Foto",
    image_url: "https://placeimg.com/640/480/any",
    user: {
      name: "rayansostenes",
      avatar: "https://i.pravatar.cc/128"
    }
  }
];

const PostImage = styled.Image`
  width: 450;
  height: 360;
  align-self: center;
`;

const AvatarImage = styled.Image`
  height: 32;
  width: 32;
  border-radius: 32;
`;

const PostDescription = styled.Text`
  margin-left: 15;
`;

function Post({ image_url, description, user }) {
  return (
    <View style={{ marginTop: 32 }}>
      <View
        style={{
          height: 32,
          alignItems: "center",
          flexDirection: "row",
          marginBottom: 15,
          marginLeft: 15
        }}
      >
        <AvatarImage source={{ uri: user.avatar }} />
        <Text style={{ marginLeft: 10 }}>{user.name}</Text>
      </View>

      <PostImage source={{ uri: image_url }} />
      <PostDescription>{description}</PostDescription>
    </View>
  );
}

function HomeScreen({data}) {
  return (
    <ScreenContainer>
      <HeaderContainer>
        <TitleText>Instagram</TitleText>
      </HeaderContainer>
      <FlatList data={data} renderItem={({ item }) => <Post {...item} />} />
    </ScreenContainer>
  );
}

async function getImage({data, changeData}) {
  const image = await ImagePicker.launchCameraAsync();
  const new_data = data.slice();
  new_data[0].image_url = image.uri
}


function AddPhotoScreen({data, changeData}) {
  return (
    <ScreenContainer style={{justifyContent: "center", alignItems: "center"}}>
      <Button onPress={() => getImage({data, changeData})} title="Tirar Foto"/>
    </ScreenContainer>
  );
}

function TabBar({ onPress }) {
  return (
    <TabContainer>
      <TabItem onPress={() => onPress("home")}>
        <TabItemText>Home</TabItemText>
      </TabItem>
      <TabItem onPress={() => onPress("add_photo")}>
        <TabItemText>Adicionar Foto</TabItemText>
      </TabItem>
    </TabContainer>
  );
}

function App() {
  let Component = HomeScreen;
  const [screen, changeScreen] = useState("home");
  const [data, changeData] = useState(data_source);

  if (screen === "home") {
    Component = HomeScreen;
  } else {
    Component = AddPhotoScreen;
  }

  return (
    <ScreenContainer>
      <Component data={data} changeData={changeData} />
      <TabBar onPress={changeScreen} />
    </ScreenContainer>
  );
}

export default App;
