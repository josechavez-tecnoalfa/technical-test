import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, Spinner, FormControl } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import { regexes } from 'constants/regexes'
import CustomInput from 'components/CustomInput'
import { useAuth } from 'hooks/useAuth'

const LoginForm = () => {
  const navigation = useNavigation()
  const { signIn, authLoading } = useAuth()
  const [email, setEmail] = React.useState('')
  const [passwd, setPasswd] = React.useState('')

  const [emailError, setEmailError] = React.useState(false)
  const [passwdError, setPasswdError] = React.useState(false)

  const onLoginPressed = async () => {
    let errorsFound = false

    if (!regexes.email.test(email)) {
      setEmailError(true)
      errorsFound = true
    }
    if (!passwd) {
      setPasswdError(true)
      errorsFound = true
    }
    if (!errorsFound) {
      try {
        await signIn(email, passwd)
        navigation.navigate('Welcome' as never)
      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
      <FormControl style={styles.form}>
        <Text style={styles.label}>Correo electrónico</Text>
        <CustomInput
          // @ts-expect-error TS(2322)
          onChangeText={(text: any) => setEmail(String(text).trim())}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Ingresa aquí tu correo electrónico"
          placeholderTextColor="#9e9e9e"
          autoCorrect={false}
          onSubmitEditing={onLoginPressed}
          error={emailError}
          errorText={'Error en formato de correo'}
          onChange={(_: any) => setEmailError(false)}
        />
        <Text style={styles.label}>Constraseña</Text>
        <CustomInput
            // @ts-expect-error TS(2322)
            onChangeText={(text: any) => setPasswd(String(text).trim())}
            secureTextEntry
            style={styles.input}
            placeholder="Ingresa aquí tu contraseña"
            placeholderTextColor="#9e9e9e"
            onSubmitEditing={onLoginPressed}
            error={passwdError}
            errorText={'No ingresaste contraseña'}
            onChange={(_: any) => setPasswdError(false)}
          />
        <Button onPress={() => { onLoginPressed().catch(e => console.error(e)) }} style={styles.button} >
          {authLoading
            ? (<Spinner />)
            : (<Text style={styles.buttonText}>Iniciar Sesión</Text>)}
        </Button>
      </FormControl>
  )
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

export default LoginForm
