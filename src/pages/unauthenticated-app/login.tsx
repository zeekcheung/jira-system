import styled from '@emotion/styled'
import { Button, Form, Input } from 'antd'
import { useAuth } from 'context/auth-context'
import { useDocumentTitle } from 'utils'

export const Login = () => {
  const { login } = useAuth()

  const handleSubmit = (values: { username: string; password: string }) =>
    login(values)

  useDocumentTitle('登录', false)

  return (
    <Form name="login" onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input
          type="text"
          id="username"
          autoComplete="username"
          placeholder="用户名"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          确定
        </LongButton>
      </Form.Item>
    </Form>
  )
}

export const LongButton = styled(Button)`
  width: 100%;
`
