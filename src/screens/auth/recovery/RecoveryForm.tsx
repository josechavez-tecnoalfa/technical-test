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
        Alert.alert('Operación exitosa', 'Por favor revise su correo', [
          { text: 'Aceptar', onPress: () => navigation.navigate('Welcome') }
        ])
      } catch (error) {
        Alert.alert('Error', 'Correo electronico no reconocido', [
          { text: 'Aceptar' }
        ])
      } finally {
        setRecoveryLoading(false)
      }
    }
  }

  return (
    <FormControl style={styles.form}>
        <Text style={styles.label}>Correo electrónico</Text>
        <CustomInput
          // @ts-expect-error TS(2322)
          style={styles.input}
          onChangeText={(input: any) => setEmail(String(input).trim())}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Ingresa aquí tu correo electrónico"
          placeholderTextColor="#9e9e9e"
          onSubmitEditing={recoverPassword}
          error={emailError}
          errorText={'Error en formato de correo'}
          onChange={(_: any) => setEmailError(false)}
        />
      <Button
        onPress={() => { recoverPassword().catch(e => console.error(e)) }}
        style={styles.button}>
        {recoveryLoading
          ? (<Spinner />)
          : (<Text style={styles.buttonText}>ENVIAR</Text>)}
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

export default RecoveryForm
