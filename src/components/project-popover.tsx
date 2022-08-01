import { Dropdown, Menu } from 'antd'
import MenuDivider from 'antd/lib/menu/MenuDivider'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { openProjectModal } from 'store/slices/project-slice'
import { useProjects } from 'utils/projects'
import { ButtonNoPadding } from './lib'

export const ProjectPopover = () => {
  const { data: projects } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const handleOpenModal = () => dispatch(openProjectModal())

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
          <Menu.Item>
            <ButtonNoPadding type={'link'} onClick={handleOpenModal}>
              创建项目
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
      overlayStyle={{ width: '20em' }}
    >
      <h2>项目</h2>
    </Dropdown>
  )
}
