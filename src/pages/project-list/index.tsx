import { useState, useEffect } from "react";
import { stringify } from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
import SearchPanel from "./search-panel";
import List from "./list";

const apiUrl = process.env.REACT_APP_API_URL;

export interface User {
  id: number;
  name: string;
}

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

  useEffect(() => {
    fetch(`${apiUrl}/projects?${stringify(cleanObject(debouncedParam))}`).then(
      async (resp) => {
        if (resp.ok) {
          setList(await resp.json());
        }
      }
    );
  }, [debouncedParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (resp) => {
      if (resp.ok) {
        setUsers(await resp.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
}
