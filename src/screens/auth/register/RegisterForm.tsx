import React from 'react'
import { StyleSheet, Alert, Text } from 'react-native'
import { Button, Spinner, FormControl } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { regexes } from 'constants/regexes'
import CustomInput from 'components/CustomInput'
import { useAuth } from 'hooks/useAuth'

const RegisterForm = () => {
  const navigation = useNavigation()
  const { signUp, authLoading } = useAuth()

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [emailError, setEmailError] = React.useState(false)
  const [passwordError, setPasswordError] = React.useState(false)

  const onRegisterPressed = async () => {
    let errorsFound = false

    if (!regexes.email.test(email)) {
      setEmailError(true)
      errorsFound = true
    }
    if (!regexes.password.test(password)) {
      setPasswordError(true)
      errorsFound = true
    }
    if (!errorsFound) {
      try {
        await signUp(email, password)
        navigation.navigate('Welcome' as never)
      } catch (e) {
        Alert.alert('Error', 'Hubo un error en el registro', [{ text: 'Aceptar' }])
      }
    }
  }

  return (
  <FormControl style={styles.form}>
        <Text style={styles.label}>Correo electrónico</Text>
        <CustomInput
          // @ts-expect-error TS(2322)
          onChangeText={(text: any) => setEmail(String(text).trim())}
          value={email} style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Ingresa aquí tu correo electrónico"
          placeholderTextColor="#9e9e9e"
          error={emailError}
          errorText={'Formato de email erroneo.'}
          onChange={(_: any) => setEmailError(false)}
        />
        <Text style={styles.label}>Contraseña</Text>
        <CustomInput
          // @ts-expect-error TS(2322)
          onChangeText={(text: any) => setPassword(String(text).trim())}
          value={password}
          secureTextEntry
          style={styles.input}
          placeholder="Ingresa aquí tu contraseña"
          placeholderTextColor="#9e9e9e"
          error={passwordError}
          errorText={'La contraseña debe ser de 8 caracteres, debe contener al menos una letra, un numero y un caracter especial.'}
          onChange={(_: any) => setPasswordError(false)}
          />
      <Button onPress={onRegisterPressed} style={styles.button}>
        {authLoading
          ? (<Spinner />)
          : (<Text style={styles.buttonText}>Registrarse</Text>)}
      </Button>
    </FormControl>)
}

const styles = StyleSheet.create({
  form: {
    alignContent: 'space-around',
    padding: 50
  },
  label: { color: '#FFD233', fontSize: 14, fontWeight: 'bold' },
  text: {
    color: '#445177'
  },
  input: { color: '#000', fontSize: 16 },
  button: {
    marginVertical: 15,
    backgroundColor: '#FFD233'
  },
  buttonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold'
  }
})

export default RegisterForm
