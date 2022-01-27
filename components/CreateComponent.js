import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  TextInput,
} from "react-native";
import firebase from "../config/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
class CreateComponent extends Component {
  constructor() {
    super();
    this.ref = collection(firebase, "cats");
    this.state = {
      name: "",
      breed: "",
      description: "",
      isLoading: false,
    };
  }

  onValUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  addCat() {
    if (this.state.name === "") {
      alert("Name is required.");
    } else {
      this.setState({
        isLoading: true,
      });
      addDoc(this.ref, {
        name: this.state.name,
        breed: this.state.breed,
        description: this.state.description,
      })
        .then((res) => {
          this.setState({
            name: "",
            breed: "",
            description: "",
            isLoading: false,
          });
          this.props.navigation.navigate("ReadComponent");
        })
        .catch((err) => {
          console.error("Error occured: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="green" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.formEle}>
          <TextInput
            placeholder={"Name"}
            value={this.state.name}
            onChangeText={(val) => this.onValUpdate(val, "name")}
          />
        </View>
        <View style={styles.formEle}>
          <TextInput
            placeholder={"Breed"}
            value={this.state.breed}
            onChangeText={(val) => this.onValUpdate(val, "breed")}
          />
        </View>
        <View style={styles.formEle}>
          <TextInput
            multiline={true}
            numberOfLines={5}
            placeholder={"Description"}
            value={this.state.description}
            onChangeText={(val) => this.onValUpdate(val, "description")}
          />
        </View>
        <View style={styles.button}>
          <Button title="Create" onPress={() => this.addCat()} color="black" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  formEle: {
    flex: 1,
    padding: 5,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#4e4e4e",
  },
  loading: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default CreateComponent;
