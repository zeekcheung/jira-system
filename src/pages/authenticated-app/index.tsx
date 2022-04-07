import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "../../assets/software-logo.svg";
// 从 react-router 核心库中引入路由的核心逻辑
import { Routes, Route } from "react-router";
// 从 react-router-dom 库中引入路由的运行环境
import { BrowserRouter as Router } from "react-router-dom";
import { Button, Dropdown, Menu } from "antd";
import ProjectList from "./project-list";
import ProjectDetail from "./project-detail";
import Kanban from "./kanban";
import Epic from "./epic";
import { useAuth } from "context/auth-context";
import { resetRoute } from "utils";

export default function AuthenticatedApp() {
  return (
    <Container>
      <PageHeader />
      <Main>
        {/* 配置路由规则 */}
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            {/* 嵌套路由 */}
            <Route path="/projects/:projectId" element={<ProjectDetail />}>
              <Route path="kanban" element={<Kanban />} />
              <Route path="epic" element={<Epic />} />
            </Route>
            {/* 默认路由：No match route */}
            <Route path="*" element={<ProjectList />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
}

const PageHeader = () => {
  const { user, logout } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SoftwareLogo>
        </Button>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
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
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr;
`;

const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${({ between }) => (between ? "space-between" : undefined)};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? marginBottom + "ren" : undefined};

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${({ gap }) =>
      typeof gap === "number" ? gap + "rem" : gap ? "2rem" : undefined};
  }
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled(Row)``;

const Main = styled.div``;
