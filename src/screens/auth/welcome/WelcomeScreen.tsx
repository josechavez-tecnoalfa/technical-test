import React from 'react'
import { StyleSheet, Alert } from 'react-native'
import { Button, Text } from 'native-base'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'

import { useApp } from 'hooks/useApp'
import { useAuth } from 'hooks/useAuth'
import AuthLayout from 'layouts/AuthLayout'

const WelcomeScreen = () => {
  const navigation = useNavigation()
  const { token } = useApp()
  const { session, signInAnonymously } = useAuth()

  React.useEffect(() => {
    if (
      session &&
      !session.emailVerified &&
      !session.isAnonymous
    ) {
      Alert.alert(
        'Account not verified',
        `It is required to confirm your email before accessing the platform ${
          session?.email
        }`,
        [
          {
            text: 'Send verification email again',
            onPress: () => {
              auth()
                .currentUser?.sendEmailVerification()
                .then((_) =>
                  Alert.alert(
                    'Email sent',
                    'Please check your inbox',
                    [{ text: 'Accept', onPress: () => { auth().signOut().catch(e => console.error(e)) } }]
                  )
                )
                .catch((_) =>
                  Alert.alert(
                    'Error',
                    'The verification email could not be sent',
                    [{ text: 'Accept' }]
                  )
                )
            }
          },
          { text: 'Accept', onPress: () => { auth().signOut().catch(e => console.error(e)) } }
        ]
      )
    }
  }, [token, session])

  const onAnonPressed = async () => {
    try {
      await signInAnonymously()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AuthLayout backgroundName={'authBackground'} title={'Welcome!'}>
      <Button
        style={[styles.navigationButton, { backgroundColor: '#FFD233' }]}
        onPress={() => navigation.navigate('Signup' as never)}>
        <Text style={styles.navigationButtonText}>Sign up</Text>
      </Button>
      <Button
        style={styles.navigationButton}
        onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.navigationButtonText}>Log in</Text>
        </Button>
      <Text fontSize={16} style={styles.recoveryText} onPress={() => navigation.navigate('Recovery' as never)}>Forgot password?</Text>
      <Text
        style={styles.anonText}
        onPress={() => { onAnonPressed().catch(e => console.error(e)) }}>
        o accede a la app sin cuenta
      </Text>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  recoveryText: {
    color: '#fff',
    alignSelf: 'center'
  },
  anonText: {
    color: '#fff',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '10%',
    textDecorationLine: 'underline'
  },
  navigationButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 50,
    width: 220,
    alignSelf: 'center',
    margin: 10
  },
  navigationButtonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold'
  }
})

export default WelcomeScreen
