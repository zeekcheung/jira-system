import { Button, Drawer, Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import React, { useState } from 'react'
import { Project } from './list'

export const ProjectModal = ({
  visible,
  onClose,
  ...props
}: React.ComponentProps<typeof Drawer>) => {
  const [param, setParam] = useState<Partial<Project>>({})
  const handleSubmit = (values: {
    name: string
    organization: string
    person: string
  }) => console.log(values)

  return (
    <Drawer
      width={'100vw'}
      bodyStyle={{
        display: 'flex',
        justifyContent: 'center',
      }}
      onClose={onClose}
      visible={visible}
      {...props}
    >
      <Form
        style={{ width: '40rem', textAlign: 'center' }}
        onFinish={handleSubmit}
      >
        <h1>创建项目</h1>
        <Form.Item
          name={'name'}
          label={'名称'}
          rules={[{ required: true, message: '请输入项目名称' }]}
        >
          <Input
            type={'text'}
            placeholder="请输入项目名称"
            defaultValue={param.name}
            onCompositionEnd={(e) => {
              setParam({
                ...param,
                name: (e.target as HTMLInputElement).value,
              })
            }}
          />
        </Form.Item>
        <Form.Item
          name={'organization'}
          label={'部门'}
          rules={[{ required: true, message: '请输入部门名' }]}
        >
          <Input
            type={'text'}
            placeholder="请输入部门名"
            defaultValue={param.organization}
            onCompositionEnd={(e) => {
              setParam({
                ...param,
                name: (e.target as HTMLInputElement).value,
              })
            }}
          />
        </Form.Item>
        <Form.Item
          name={'person'}
          label={'负责人'}
          rules={[{ required: true, message: '请选择负责人' }]}
        >
          <UserSelect
            value={param.personId}
            onChange={(value) => setParam({ ...param, personId: value })}
            defaultOptionName={'负责人'}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type={'primary'}
            htmlType={'submit'}
            style={{ float: 'right' }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}
