import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Views/HomeScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import ProductCatalog from '../Views/ProductCatalog';
import ProductOffers from '../Views/ProductOffers';
import { MaterialIcons } from '@expo/vector-icons';
import ShoppingCart from '../Views/ShoppingCart';
import ProductList from '../Views/ProductList';
import { products } from '../../Constants/Arrays';
import PaymentScreen from '../Views/PaymentScreen';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const MyNavigator = ({cart,setCart}) => {

    const HomeStack = () => {
        return <Stack.Navigator >
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        </Stack.Navigator>
    }

    const CategoriesStack = ({navigation,route}) => {

      function LocalProductCatalog(){
        return <ProductCatalog navigation={navigation} route={route} cart={cart}setCart={setCart}/>
      }
   
        return <Stack.Navigator initialRouteName='Categories' >
            <Stack.Screen name="Categories" component={LocalProductCatalog} />
      
        </Stack.Navigator>
    }

    const ProductOffersStack = () => {
      
      function LocalProductOffers(){
        return <ProductOffers cart={cart}setCart={setCart}/>
      }
      
      return <Stack.Navigator >
          <Stack.Screen name="HotSale" 
          options={{headerTitle:'Hot Sale'}}
          component={LocalProductOffers} />
      </Stack.Navigator>
    }

    

    const ShoppingCartStack = ({ navigation }) => {
      
      function LocalShoppingCart(){
        return <ShoppingCart cart={cart}setCart={setCart}/>
      }
      function LocalPaymentScreen(){
        return <PaymentScreen navigation={navigation} setCart={setCart}/>
      }

        return <Stack.Navigator >
            <Stack.Screen 
                name="ShoppingCart" 
                options={{
                  headerTitle:'Shopping Cart'
                }}
                component={(LocalShoppingCart)} // Aquí se pasa directamente el componente ShoppingCart
            />
            <Stack.Screen 
                name="PaymentScreen" 
                options={{
                  headerTitle:'Shopping Cart'
                }}
                component={(LocalPaymentScreen)} // Aquí se pasa directamente el componente ShoppingCart
            />
        </Stack.Navigator>
    }

  return (
      <Tab.Navigator
      screenOptions={{ headerShown: false,tabBarShowLabel:false }}
      >
        <Tab.Screen  
        name="HomeStack" component={HomeStack}
        options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        
        <Tab.Screen  
        name="CategoriesStack"
        component={CategoriesStack}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pricetags" size={size} color={color} />
            ),
          }}
        />
        
        <Tab.Screen  
        name="HotSaleStack" component={ProductOffersStack}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="local-fire-department" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen  
        name="CartStack" 
        component={ShoppingCartStack}
        options={{
            tabBarLabel:'',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
  )
}

export default MyNavigator
