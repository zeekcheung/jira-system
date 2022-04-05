import { useState } from "react";
import { useDebounce } from "utils";
import SearchPanel from "./search-panel";
import List from "./list";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/projects";
import { useUsers } from "utils/users";

export default function ProjectList() {
  // 请求参数状态
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 1000);
  const { data: list, error, isLoading } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <Typography.Text type="danger">{error?.message}</Typography.Text>
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;
