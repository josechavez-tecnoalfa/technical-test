import React from 'react'
import { ScrollView } from 'native-base'

type Props = {
    children?: any;
    style?: any;
};

const ScrollableView = ({ children, ...rest }: Props) => {
  return (
    <ScrollView {...rest}>
      {children}
    </ScrollView>
  )
}

export default ScrollableView
