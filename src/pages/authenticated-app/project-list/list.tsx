import { Table, TableProps } from "antd";
import { Link } from "react-router-dom";
import { User } from "./search-panel";
import dayjs from "dayjs";

// TODO: 将 id 类型转化为 number
export interface Project {
  id: number;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProp extends TableProps<Project> {
  users: User[];
}

export default function List({ users, ...props }: ListProp) {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, { id, name }) {
            return <Link to={`/projects/${id}`}>{name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
}
