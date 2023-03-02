import React from 'react'
import { FlatList } from 'native-base'
import FavoriteListElement from './FavoriteListElement'

interface IProps {
  list: any[];
}

const FavoriteList = ({ list }: IProps) => {
  return (
    <FlatList
      data={list || []}
      renderItem={({ item, index }) => <FavoriteListElement item={item} index={index} />}
    />
  )
}

export default FavoriteList
