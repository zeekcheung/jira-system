import styled from '@emotion/styled'
import { Typography } from 'antd'
import SearchPanel from './search-panel'
import List from './list'
import { useProjects, useProjectsSearchParam } from 'utils/projects'
import { useDebounce, useDocumentTitle } from 'utils'
import { useUsers } from 'utils/users'

export default function ProjectList() {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectsSearchParam()
  const {
    data: list,
    error,
    isLoading,
    retry,
  } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <Typography.Text type="danger">{error?.message}</Typography.Text>
      <List
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`

// ProjectList.whyDidYouRender = true;
