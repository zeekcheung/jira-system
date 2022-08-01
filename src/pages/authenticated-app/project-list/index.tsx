import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useDebounce, useDocumentTitle } from 'utils'
import { useProjects, useProjectsSearchParam } from 'utils/projects'
import { useUsers } from 'utils/users'
import { List } from './list'
import { SearchPanel } from './search-panel'

export const ProjectList = ({
  projectButton,
}: {
  projectButton: JSX.Element
}) => {
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
      <h1>
        项目列表
        {projectButton}
      </h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <Typography.Text type="danger">{error?.message}</Typography.Text>
      <List
        refresh={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
        projectButton={projectButton}
      />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`

// ProjectList.whyDidYouRender = true;
