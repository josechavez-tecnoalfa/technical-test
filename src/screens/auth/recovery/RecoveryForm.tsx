import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Button, Text, Spinner, FormControl } from 'native-base'
import { firebase } from '@react-native-firebase/auth'

import { regexes } from 'constants/regexes'
import CustomInput from 'components/CustomInput'

interface Props {
  navigation: any
}

const RecoveryForm = (props: Props) => {
  const { navigation } = props
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(false)
  const [recoveryLoading, setRecoveryLoading] = React.useState(false)

  const recoverPassword = async () => {
    let errorsFound = false

    if (!regexes.email.test(email)) {
      errorsFound = true
      setEmailError(true)
    }
    if (!errorsFound) {
      try {
        setRecoveryLoading(true)
        await firebase.auth().sendPasswordResetEmail(email)
        Alert.alert('Recovery email sent', 'Please check your inbox', [
          { text: 'Accept', onPress: () => navigation.navigate('Welcome') }
        ])
      } catch (error) {
        Alert.alert('Error', 'Email not found', [
          { text: 'Accept' }
        ])
      } finally {
        setRecoveryLoading(false)
      }
    }
  }

  return (
    <FormControl style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <CustomInput
          // @ts-expect-error TS(2322)
          style={styles.input}
          onChangeText={(text: string) => setEmail(text.trim())}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter Email"
          placeholderTextColor="#9e9e9e"
          onSubmitEditing={recoverPassword}
          error={emailError}
          errorText={'Incorrect email format'}
          onChange={() => setEmailError(false)}
        />
      <Button
        onPress={() => { recoverPassword().catch(e => console.error(e)) }}
        style={styles.button}>
        {recoveryLoading
          ? (<Spinner />)
          : (<Text style={styles.buttonText}>Recover</Text>)}
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

export default RecoveryForm
