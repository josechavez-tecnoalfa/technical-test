import React from 'react'
import { FlatList } from 'native-base'

import PopularListElement from './PupularListElement'

interface IProps {
  list: any[];
}

const PopularList = ({ list }: IProps) => {
  return (
    <FlatList
      data={list || []}
      renderItem={({ item, index }) => <PopularListElement item={item} index={index} list={list} />}
      horizontal
      />
  )
}

export default PopularList
