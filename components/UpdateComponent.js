import React, { Component } from "react";

import firebase from "../config/firebase";
import {
  Alert,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { collection, doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

class UpdateComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      designation: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    const docRef = doc(
      collection(firebase, "cats"),
      this.props.route.params.userkey
    );
    getDoc(docRef).then((res) => {
      if (res.exists) {
        const cat = res.data();
        this.setState({
          key: res.id,
          name: cat.name,
          breed: cat.breed,
          description: cat.description,
          isLoading: false,
        });
      } else {
        console.log("No document found.");
      }
    });
  }

  inputEl = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  editCat() {
    this.setState({
      isLoading: true,
    });
    const docUpdate = doc(collection(firebase, "cats"), this.state.key);
    setDoc(docUpdate, {
      name: this.state.name,
      breed: this.state.breed,
      description: this.state.description,
    })
      .then((docRef) => {
        this.setState({
          key: "",
          name: "",
          breed: "",
          description: "",
          isLoading: false,
        });
        this.props.navigation.navigate("ReadComponent");
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteCat() {
    const docRef = doc(
      collection(firebase, "cats"),
      this.props.route.params.userkey
    );
    deleteDoc(docRef).then((res) => {
      console.log("Doc deleted.");
      this.props.navigation.navigate("ReadComponent");
    });
  }

  alertDialog = () => {
    Alert.alert(
      "Delete",
      "Really?",
      [
        { text: "Yes", onPress: () => this.deleteCat() },
        {
          text: "No",
          onPress: () => console.log("Item not deleted"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
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
      <ScrollView style={styles.container}>
        <View style={styles.formEl}>
          <TextInput
            placeholder={"Name"}
            value={this.state.name}
            onChangeText={(val) => this.inputEl(val, "name")}
          />
        </View>
        <View style={styles.formEl}>
          <TextInput
            placeholder={"Breed"}
            value={this.state.breed}
            onChangeText={(val) => this.inputEl(val, "breed")}
          />
        </View>
        <View style={styles.formEl}>
          <TextInput
            multiline={true}
            placeholder={"Description"}
            numberOfLines={5}
            value={this.state.description}
            onChangeText={(val) => this.inputEl(val, "description")}
          />
        </View>
        <View style={styles.button}>
          <Button title="Update" onPress={() => this.editCat()} color="green" />
        </View>
        <View>
          <Button title="Delete" onPress={this.alertDialog} color="red" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  formEl: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
  button: {
    marginBottom: 8,
  },
});

export default UpdateComponent;
