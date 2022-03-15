// 系统用户接口
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
export interface Param {
  name: string;
  personId: string;
}

interface SearchPanelProp {
  users: User[];
  param: Param;
  setParam: (param: Param) => void;
}

export default function SearchPanel({
  users,
  param,
  setParam,
}: SearchPanelProp) {
  return (
    <form>
      <input
        type="text"
        defaultValue={param.name}
        onCompositionEnd={(event) => {
          setParam({
            ...param,
            name: (event.target as HTMLInputElement).value,
          });
        }}
      />
      <select
        value={param.personId}
        onChange={(event) => {
          setParam({
            ...param,
            personId: event.target.value,
          });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((user) => (
          <option value={user.id} key={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </form>
  );
}
