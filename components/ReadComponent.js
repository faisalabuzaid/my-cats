import React, { Component } from "react";

import firebase from "../config/firebase";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Button,
  View,
} from "react-native";
import { ListItem } from "react-native-elements";
import { collection, doc, onSnapshot } from "firebase/firestore";

class ReadComponent extends Component {
  constructor() {
    super();
    this.docs = collection(firebase, "cats");
    console.log(this.docs);
    this.state = {
      isLoading: true,
      students: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = onSnapshot(this.docs, this.fetchCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  addCat() {
    this.props.navigation.navigate("CreateComponent");
  }
  fetchCollection = (querySnapshot) => {
    const cats = [];
    querySnapshot.forEach((res) => {
      const { name, breed, descreiption } = res.data();
      cats.push({
        key: res.id,
        name,
        breed,
        descreiption,
      });
    });
    this.setState({
      cats,
      isLoading: false,
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.wrapper}>
        {this.state.cats.map((res, i) => {
          return (
            <ListItem
              key={i}
              onPress={() => {
                this.props.navigation.navigate("UpdateComponent", {
                  userkey: res.key,
                });
              }}
              bottomDivider
            >
              <ListItem.Content>
                <ListItem.Title>{res.name}</ListItem.Title>
                <ListItem.Subtitle>{res.breed}</ListItem.Subtitle>
                <ListItem.Subtitle>{res.descreiption}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="black" />
            </ListItem>
          );
        })}
        <View style={styles.button}>
          <Button
            title="Add new cat"
            onPress={() => this.addCat()}
            color="black"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingBottom: 20,
  },
  loader: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default ReadComponent;
