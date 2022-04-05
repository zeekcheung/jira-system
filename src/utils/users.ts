import { User } from "pages/authenticated-app/project-list/search-panel";
import { useMount } from "utils";
import { useAsync } from "./async";
import { useHttp } from "./http";

export const useUsers = () => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useMount(() => run(client("users")));

  return result;
};
