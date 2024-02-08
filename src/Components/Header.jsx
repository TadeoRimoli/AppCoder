import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GeneralStyle } from '../../Styles/GeneralStyles'

const Header = ({title}) => {
  return (
    <View style={[styles.container,{backgroundColor:'#2c3e50'}]}>
      <Text style={styles.header}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        padding:20,
        height:'10%'
    },
    header:{
        fontSize:20,
        color:'white'
    }
})