import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'

export const ProjectDetail = () => {
  return (
    <div>
      {/* 注意：链接到子路由时，路径不需要斜杠，和配置子路由规则时一样 */}
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>

      {/* 指定子路由的出口 */}
      <Outlet />
    </div>
  )
}
