import { useDocumentTitle } from "utils";

export default function Epic() {
  useDocumentTitle("任务组", false);
  return <h1>任务组组件</h1>;
}
