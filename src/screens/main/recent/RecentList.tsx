import React from 'react'
import { FlatList } from 'native-base'
import RecentListElement from './RecentListElement'

interface IProps {
  list: any[];
}

const RecentList = ({ list }: IProps) => {
  return (
    <FlatList
      data={list || []}
      renderItem={({ item, index }) => <RecentListElement item={item} index={index} />}
    />
  )
}

export default RecentList
