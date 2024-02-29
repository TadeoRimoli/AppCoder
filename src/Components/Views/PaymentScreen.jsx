import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ActivityIndicator, BackHandler } from 'react-native';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../CoreComponents/CustomButton';
import CustomInput from '../CoreComponents/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchasesItem, deleteAllCartItems } from '../../../Redux/slices/GeneralSlice';
import { Colors, FontSizeStyles, GeneralStyle } from '../../Styles/GeneralStyles';

const PaymentScreen = ({  }) => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [creditCardError, setCreditCardError] = useState(false);
  const [securityCodeError, setSecurityCodeError] = useState(false);
  const [cardholderNameError, setCardholderNameError] = useState(false);
  const route = useRoute();
  const { totalPrice } = route.params;
  

  const {cart,purchases} = useSelector(state => state.General);


  const cases ={
    good:'VALIDATED',
    bad:'ERROR',
    neutral:'NEUTRAL',
  }
  const [purchaseStatus, setPurchaseStatus] = useState(cases.neutral);

  const simulatePurchase = async () => {
    if (!creditCardNumber || !securityCode || !cardholderName) {
      setCreditCardError(!creditCardNumber);
      setSecurityCodeError(!securityCode);
      setCardholderNameError(!cardholderName);
      setLoading(false);
      return;
    } else {
      setLoading(true);
      await simulateTransaction(); // Espera 2 segundos con el cosito girando
      
      const success = true;//Math.random() < 0.5; // 50% de probabilidad para simular mas realidad

      if(success){
        setPurchaseStatus(cases.good);
        dispatch(addPurchasesItem({
          date: new Date().toISOString(),
          totalAmount: totalPrice,
          items: cart,
          card: creditCardNumber,
        }))
        
      } else {
        setPurchaseStatus(cases.bad);
      }
      setLoading(false);
    }
  };

  const simulateTransaction = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };
  const dispatch = useDispatch()
  const handleReturn = () => {
    dispatch(deleteAllCartItems())
    navigation.navigate("CategoriesStack")
  };

  const isFocused = useIsFocused()

  useEffect(()=>{
    if(!isFocused){
      navigation.pop()
    }
  },[isFocused])

  useEffect(()=>{
    if(purchaseStatus === cases.good){
      dispatch(deleteAllCartItems())
    }
  },[purchaseStatus])

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
      :
      <>
      {purchaseStatus=== cases.neutral &&<View style={{ width: '100%' }}>
        <Text style={[styles.text, FontSizeStyles.fontSize18]}>Total to pay: ${totalPrice.toFixed(2)}</Text>
        <CustomInput
          placeholder="Credit Card Number"
          keyboardType="numeric"
          value={creditCardNumber}
          setValue={(e) => setCreditCardNumber(e)}
          error={creditCardError}
          setError={setCreditCardError}
        />
        <CustomInput
          placeholder="Security Code"
          keyboardType="numeric"
          value={securityCode}
          setValue={(e) => setSecurityCode(e)}
          error={securityCodeError}
          setError={setSecurityCodeError}
        />
        <CustomInput
          placeholder="Cardholder Name"
          value={cardholderName}
          setValue={(e) => setCardholderName(e)}
          error={cardholderNameError}
          setError={setCardholderNameError}
        />
        <View style={[GeneralStyle.row, GeneralStyle.justifyBetween]}>
          <CustomButton color="#B93649" label="Cancel" onPress={handleReturn} />
          <CustomButton color={Colors.green} label="Buy" onPress={simulatePurchase} />
        </View>
      </View>}

      {purchaseStatus === cases.good && (
          <Text style={styles.successText}>Purchase successful!</Text>
      )}
      {purchaseStatus === cases.bad && (
        <>
          <Text style={[styles.errorText, { color: Colors.error,textAlign:'center' }]}>Purchase failed!</Text>
          <CustomButton color={Colors.error} label="Try again" 
          onPress={() => 
            setPurchaseStatus(cases.neutral)
          }
            />
        </>
      )}
      </>}
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    marginBottom: 20,
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  successText: {
    marginVertical: 20,
    color: 'green',
    fontSize: 30,
  },
  errorText: {
    fontSize: 20,
    marginVertical: 20,

  },
});