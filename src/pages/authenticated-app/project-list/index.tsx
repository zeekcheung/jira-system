import { useState, useEffect } from "react";
import { cleanObject, useDebounce, useMount } from "utils";
import SearchPanel from "./search-panel";
import List from "./list";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export default function ProjectList() {
  // 请求参数状态
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 1000);
  // 负责人列表状态
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  // 登录API
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // eslint-disable-next-line
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;
