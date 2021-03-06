import { Button, Dropdown, Menu, Space, Table, TableProps } from 'antd'
import { Pin } from 'components/pin'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useEditProject } from 'utils/projects'
import { User } from './search-panel'

export interface Project {
  id: number
  name: string
  personId: number
  pin: boolean
  organization: string
  created: number
}

interface ListProp extends TableProps<Project> {
  users: User[]
  refresh: () => void
  projectButton: JSX.Element
}

export const List = ({ users, projectButton, ...props }: ListProp) => {
  const { mutate } = useEditProject()
  // 请求更新后，重新获取项目列表
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh)

  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            )
          },
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, { id, name }) {
            return <Link to={`/projects/${id}`}>{name}</Link>
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          },
        },
        {
          title: '',
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={'edit'}>{projectButton}</Menu.Item>
                    <Menu.Item key={'delete'}>
                      <Button type={'link'}>删除项目</Button>
                    </Menu.Item>
                  </Menu>
                }
                trigger={['click']}
              >
                <Space>
                  <Button type={'link'}>...</Button>
                </Space>
              </Dropdown>
            )
          },
        },
      ]}
      {...props}
    />
  )
}
