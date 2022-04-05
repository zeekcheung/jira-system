import { Form, Input, Select } from "antd";

// 系统用户接口
export interface User {
  id: string;
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
    <Form style={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          defaultValue={param.name}
          onCompositionEnd={(event) => {
            setParam({
              ...param,
              name: (event.target as HTMLInputElement).value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={param.personId}
          onChange={(value) => {
            setParam({
              ...param,
              personId: value,
            });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
}
