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
  const [email, setEmail] = React.useState<string>('')
  const [passwd, setPasswd] = React.useState<string>('')

  const [emailError, setEmailError] = React.useState<boolean>(false)
  const [passwdError, setPasswdError] = React.useState<boolean>(false)

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
        <Text style={styles.label}>Email</Text>
        <CustomInput
          // @ts-expect-error TS(2322)
          onChangeText={(text: string) => setEmail(text.trim())}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter Email"
          placeholderTextColor="#9e9e9e"
          autoCorrect={false}
          onSubmitEditing={onLoginPressed}
          error={emailError}
          errorText={'Incorrect email format'}
          onChange={() => setEmailError(false)}
        />
        <Text style={styles.label}>Constraseña</Text>
        <CustomInput
            // @ts-expect-error TS(2322)
            onChangeText={(text: string) => setPasswd(text.trim())}
            secureTextEntry
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#9e9e9e"
            onSubmitEditing={onLoginPressed}
            error={passwdError}
            errorText={'No password entered'}
            onChange={() => setPasswdError(false)}
          />
        <Button onPress={() => { onLoginPressed().catch(e => console.error(e)) }} style={styles.button}>
          {authLoading
            ? (<Spinner />)
            : (<Text style={styles.buttonText}>Iniciar Sesión</Text>)}
        </Button>
        <Text style={styles.goBackText} onPress={() => navigation.navigate('Welcome' as never)}>Go back</Text>
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
  input: { color: '#fff', fontSize: 16 },
  button: {
    marginVertical: 15,
    backgroundColor: '#FFD233'
  },
  buttonText: {
    color: '#191919',
    fontSize: 14,
    fontWeight: 'bold'
  },
  goBackText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD233',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10
  }
})

export default LoginForm
