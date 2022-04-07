import { Form, Input } from "antd";
import { LongButton } from "./login";
import { useAuth } from "context/auth-context";
import { useDocumentTitle } from "utils";

export default function Login() {
  const { register } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) =>
    register(values);

  useDocumentTitle("注册", false);

  return (
    <Form name="register" onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id="username" placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" id="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">
          确定
        </LongButton>
      </Form.Item>
    </Form>
  );
}
