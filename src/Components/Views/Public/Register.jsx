import { Alert, Button, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GeneralStyle } from '../../../Styles/GeneralStyles'
import CustomInput from '../../CoreComponents/CustomInput'
import CustomButton from '../../CoreComponents/CustomButton'
import { useSignUpMutation } from '../../../services/authAPI'

import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../../CoreComponents/LoadingIndicator'
import CustomModal from '../../CoreComponents/CustomModal'
import { registerSchema } from '../../../services/authYupSchema'
import { appName } from '../../../Constants/Constants'
const Register = () => {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const [emailError, setEmailError] = useState({error:false,message:''});
  const [passwordError, setPasswordError] = useState({error:false,message:''});
  const [confirmPasswordError, setConfirmPasswordError] = useState({error:false,message:''});
  const [signUp,{data, isLoading, isError: postError, isSuccess,result}] = useSignUpMutation();

  
  useEffect(()=>{
    if(postError){
      setErrorModal(true)
    }
  },[postError])

  const handleSignUp = async () => {
    try {
      registerSchema.validateSync({ email, password, confirmPassword }, { abortEarly: false });
  
      signUp({ email, password });
    } catch (error) {
      const errors = {};
      error.inner.forEach(err => {
        errors[err.path] = err.message;
      });
      setEmailError({ error: errors.email ? true : false, message: errors.email || '' });
      setPasswordError({ error: errors.password ? true : false, message: errors.password || '' });
      setConfirmPasswordError({ error: errors.confirmPassword ? true : false, message: errors.confirmPassword || '' });
    }
  };

  const navigation = useNavigation()
  const redirectToLogin = () => {
    navigation.navigate('Login');
  };
  if(isLoading){
    return <LoadingIndicator/>
  }

  if(isSuccess){
    return   <Modal
    animationType="slide"
    transparent={false}
    visible={true}
    onRequestClose={() => {
      redirectToLogin();
    }}
  >
    <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', }]}>
      <Text style={[GeneralStyle.fontSize22,GeneralStyle.marginBottom10]}>Felicidades! la cuenta ya fue creada</Text>
      <CustomButton label="Iniciar sesión"textStyles={{fontSize:20}} onPress={redirectToLogin} />
    </View>
  </Modal>
  }

   


  return (
    <View style={[GeneralStyle.padding16, GeneralStyle.flex1, GeneralStyle.justifyCenter, GeneralStyle.itemsCenter]}>
      <Text style={[GeneralStyle.fontBold,GeneralStyle.fontSize24,GeneralStyle.marginBottom10]}>{appName}</Text>
      <CustomInput
      customStyles={{width:'100%'}}
      placeholder="Email"
      value={email}
      setValue={(text) => {setEmail(text)}}
      error={emailError}
      setError={setEmailError}
      />
      <CustomInput
      customStyles={{width:'100%'}}
      placeholder="Password"
      secureTextEntry={true}
      value={password}
      setValue={(text) => setPassword(text)}
      error={passwordError}
      setError={setPasswordError}
      />
      <CustomInput
      customStyles={{width:'100%'}}
      placeholder="Repeat Password"
      secureTextEntry={true}
      value={confirmPassword}
      setValue={(text) => setConfirmPassword(text)}
      error={confirmPasswordError}
      setError={setConfirmPasswordError}
      />
      <CustomButton
      customStyles={{width:'100%'}}
      label='Sign Up' onPress={handleSignUp} />
      <Text style={[GeneralStyle.fontSize16,GeneralStyle.marginTop15]}>Already have an account?<Text onPress={()=>{
          navigation.navigate("Login")
      }} style={[GeneralStyle.fontSize16,{color:'blue'}]}> Log in</Text> </Text>
      <CustomModal
      animationType="none"
      transparent={false}
      visible={errorModal}
      hideModalFunction={() => {
        setErrorModal(false);
      }}
    >
        <Text style={[GeneralStyle.fontSize22,GeneralStyle.marginBottom10]}>Ha ocurrido un error y no te pudimos registrar</Text>
    </CustomModal>
    </View>
  )
}

export default Register

const styles = StyleSheet.create({})