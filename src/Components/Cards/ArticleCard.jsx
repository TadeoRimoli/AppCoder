import React from 'react'
import {StatusBar, StyleSheet, SafeAreaView,Text, View ,TextInput, Pressable } from 'react-native';
import PrimaryButton from '../PrimaryButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors, GeneralStyle } from '../../../Styles/GeneralStyles';

 ArticleCard = ({ article ={id:'',description:'',createdAt:new Date(),category:""}, onPress }) => {
  return (
    <View style={[styles.container, GeneralStyle.background2 ]}>
      <View style={styles.textContainer}>
        <Text style={styles.labelText}>Codigo:</Text>
        <Text style={styles.buttonText}>{article.id}</Text>

        <Text style={styles.labelText}>Descripcion:</Text>
        <Text style={styles.buttonText}>{article.description}</Text>

        <Text style={styles.labelText}>Categoria:</Text>
        <Text style={styles.buttonText}>{article.category}</Text>
        <Text style={styles.labelText}>Creado:</Text>
        <Text style={styles.buttonText}>{`${article.createdAt.getHours()}:${article.createdAt.getMinutes()} hs`}</Text>
      </View>

      <Pressable style={{margin:5}}>
        <Ionicons name="trash" size={35} onPress={onPress} color={'black'} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {

  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
  labelText: {
    color: 'black',
    fontWeight: 'bold', 
    marginRight: 5, 
  },
});


export default ArticleCard