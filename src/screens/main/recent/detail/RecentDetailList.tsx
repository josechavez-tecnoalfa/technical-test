import React from 'react'
import { FlatList } from 'native-base'
import RecentDetailListElement from './RecentDetailListElement'

interface IProps {
  list: any[];
}

const RecentDetailList = ({ list }: IProps) => {
  return (
    <FlatList
      data={list || []}
      renderItem={({ item, index }) => <RecentDetailListElement item={item} index={index} />}
    />
  )
}

export default RecentDetailList
