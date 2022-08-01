import styled from '@emotion/styled'
import { ReactComponent as SoftwareLogo } from '../../assets/software-logo.svg'
// 从 react-router 核心库中引入路由的核心逻辑
import { Route, Routes } from 'react-router'
// 从 react-router-dom 库中引入路由的运行环境
import { Button, Dropdown, Menu } from 'antd'
import { ProjectPopover } from 'components/project-popover'
import { useAuth } from 'context/auth-context'
import { useSelector } from 'react-redux'
import { selectModalVisible, useHandleModal } from 'store/slices/project-slice'
import { resetRoute } from 'utils'
import { Epic } from './epic'
import { Kanban } from './kanban'
import { ProjectDetail } from './project-detail'
import { ProjectList } from './project-list'
import { ProjectModal } from './project-list/project-modal'

export const AuthenticatedApp = () => {
  const modalVisible = useSelector(selectModalVisible)
  const { handleCloseModal } = useHandleModal()

  return (
    <Container>
      <PageHeader />
      <Main>
        {/* 配置路由规则 */}
        <Routes>
          <Route path="/projects" element={<ProjectList />} />
          {/* 嵌套路由 */}
          <Route path="/projects/:projectId" element={<ProjectDetail />}>
            <Route path="kanban" element={<Kanban />} />
            <Route path="epic" element={<Epic />} />
          </Route>
          {/*No match route */}
          <Route path="*" element={<ProjectList />} />
        </Routes>
      </Main>
      <ProjectModal visible={modalVisible} onClose={handleCloseModal} />
    </Container>
  )
}

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo
            width={'18rem'}
            color={'rgb(38, 132, 255)'}
          ></SoftwareLogo>
        </Button>
        <ProjectPopover />
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
`

const Row = styled.div<{
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ between }) => (between ? 'space-between' : undefined)};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom + 'ren' : undefined};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${({ gap }) =>
      typeof gap === 'number' ? gap + 'rem' : gap ? '2rem' : undefined};
  }
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`

const HeaderLeft = styled(Row)``
const HeaderRight = styled(Row)``

const User = () => {
  const { user, logout } = useAuth()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button type="link" onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  )
}

const Main = styled.div``
