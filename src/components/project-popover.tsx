import { Dropdown, Menu } from 'antd'
import MenuDivider from 'antd/lib/menu/MenuDivider'
import { useNavigate } from 'react-router'
import { useProjects } from 'utils/projects'

export const ProjectPopover = ({
  projectButton,
}: {
  projectButton: JSX.Element
}) => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)
  const navigate = useNavigate()
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item style={{ color: 'rgb(187,187,186)' }}>收藏项目</Menu.Item>
          <Menu.ItemGroup>
            {pinnedProjects?.map((project) => (
              <Menu.Item
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                {project.name}
              </Menu.Item>
            ))}
          </Menu.ItemGroup>
          <MenuDivider />
          <Menu.Item>{projectButton}</Menu.Item>
        </Menu>
      }
      overlayStyle={{ width: '20em' }}
    >
      <h2>项目</h2>
    </Dropdown>
  )
}
