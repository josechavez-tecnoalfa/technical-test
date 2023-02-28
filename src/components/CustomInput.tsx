import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Icon, Input } from 'native-base'
import { IInputComponentType } from 'native-base/lib/typescript/components/primitives/Input/types'

type Props = IInputComponentType & {
  error?: boolean
  errorText?: string
}

const CustomInput = ({ error, errorText, ...rest }: Props) => {
  // const toast = useToast()
  // React.useEffect(() => {
  //   if (error && errorText) {
  //     toast.show({
  //       title: 'Revisa los campos',
  //       description: errorText,
  //       duration: 5000
  //     })
  //   } else if (!error) {
  //     toast.closeAll()
  //   }
  // }, [error, errorText, toast])

  return (
    <View style={styles.main}>
      <Input
          w="100%"
          {...rest}
      />
      {error && <Icon name="close-circle" />}
    </View>

  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'row'
  },
  errorIcon: { color: 'red' }
})

export default CustomInput
