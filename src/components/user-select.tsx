import React from 'react'
import { useUsers } from 'utils/users'
import IdSelect from './id-select'

export default function UserSelect(
  props: React.ComponentProps<typeof IdSelect>
) {
  const { data: users } = useUsers()
  return <IdSelect options={users || []} {...props} />
}
