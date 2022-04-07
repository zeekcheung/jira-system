import { useState } from "react";
import styled from "@emotion/styled";
import { Typography } from "antd";
import SearchPanel from "./search-panel";
import List from "./list";
import { useProjects } from "utils/projects";
import { useDebounce, useDocumentTitle } from "utils";
import { useUsers } from "utils/users";
import { useUrlQueryParam } from "utils/url";

export default function ProjectList() {
  // 请求参数状态
  const [, setParam] = useState({ name: "", personId: "" });
  const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param] = useUrlQueryParam(keys);
  const debouncedParam = useDebounce(param, 1000);
  const { data: list, error, isLoading } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle("项目列表", false);

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

ProjectList.whyDidYouRender = true;
