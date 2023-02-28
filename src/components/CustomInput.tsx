import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Text, WarningIcon } from 'native-base'
import { IInputComponentType } from 'native-base/lib/typescript/components/primitives/Input/types'

type Props = IInputComponentType & {
  error?: boolean
  errorText?: string
}

const CustomInput = ({ error, errorText, ...rest }: Props) => {
  return (
    <View>
      <Input
          w="100%"
          {...rest}
      />
      {error && <Text style={styles.error}><WarningIcon name={'close-circle'} style={styles.errorIcon} /> {errorText}</Text>}
    </View>

  )
}

const styles = StyleSheet.create({
  error: { color: 'red', alignSelf: 'center' },
  errorIcon: { color: '#FFD233' }
})

export default CustomInput
