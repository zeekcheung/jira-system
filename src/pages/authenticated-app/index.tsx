import styled from "@emotion/styled";
import { useAuth } from "context/auth-context";
import React from "react";
import ProjectList from "./project-list";
import { ReactComponent as SoftwareLogo } from "../../assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

export default function AuthenticatedApp() {
  const { user, logout } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo
            width={"18rem"}
            color={"rgb(38, 132, 255)"}
          ></SoftwareLogo>
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
      <Main>
        <ProjectList />
      </Main>
    </Container>
  );
}

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
