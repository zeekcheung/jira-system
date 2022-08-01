import { Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import { Project } from './list'
// 系统用户接口

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}

type Param = Partial<Pick<Project, 'name' | 'personId'>>

interface SearchPanelProp {
  users: User[]
  param: Param
  setParam: (param: Param) => void
}

export const SearchPanel = ({ param, setParam }: SearchPanelProp) => {
  return (
    <Form style={{ marginBottom: '2rem' }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          defaultValue={param.name}
          onCompositionEnd={(event) => {
            setParam({
              ...param,
              name: (event.target as HTMLInputElement).value,
            })
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value || 0 })}
          defaultOptionName={'负责人'}
        />
      </Form.Item>
    </Form>
  )
}
