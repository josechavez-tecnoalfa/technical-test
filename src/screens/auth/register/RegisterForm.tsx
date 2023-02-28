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

  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const [emailError, setEmailError] = React.useState<boolean>(false)
  const [passwordError, setPasswordError] = React.useState<boolean>(false)

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
        Alert.alert('Error', 'Sign up unsuccessful', [{ text: 'Accept' }])
      }
    }
  }

  return (
  <FormControl style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <CustomInput
          // @ts-expect-error TS(2322)
          onChangeText={(text: string) => setEmail(text.trim())}
          value={email} style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter Email"
          placeholderTextColor="#9e9e9e"
          error={emailError}
          errorText={'Incorrect email format'}
          onChange={() => setEmailError(false)}
        />
        <Text style={styles.label}>Password</Text>
        <CustomInput
          // @ts-expect-error TS(2322)
          onChangeText={(text: string) => setPassword(text.trim())}
          value={password}
          secureTextEntry
          style={styles.input}
          placeholder="Enter Password"
          placeholderTextColor="#9e9e9e"
          error={passwordError}
          errorText={'Password must be 8 characters that contain a letter, a number and a special character'}
          onChange={() => setPasswordError(false)}
          />
      <Button onPress={onRegisterPressed} style={styles.button}>
        {authLoading
          ? (<Spinner />)
          : (<Text style={styles.buttonText}>Sign up</Text>)}
      </Button>
        <Text style={styles.goBackText} onPress={() => navigation.navigate('Welcome' as never)}>Go back</Text>
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
  input: { color: '#fff', fontSize: 16 },
  button: {
    marginVertical: 15,
    backgroundColor: '#FFD233'
  },
  buttonText: {
    color: '#000',
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

export default RegisterForm
