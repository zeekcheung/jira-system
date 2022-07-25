import { Project } from 'pages/authenticated-app/project-list/list'
import { useEffect, useMemo } from 'react'
import { cleanObject } from 'utils'
import { useAsync } from './async'
import { useHttp } from './http'
import { useUrlQueryParam } from './url'

export const useProjects = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  const client = useHttp()

  const fetchProjects = () =>
    client('projects', { data: cleanObject(param || {}) })

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    })
    // eslint-disable-next-line
  }, [param])

  return result
}

export const useProjectsSearchParam = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const
}

export const useEditProject = () => {
  const { run, ...result } = useAsync()
  const client = useHttp()

  const mutate = (params: Partial<Project>) => {
    // 发送修改项目请求
    return run(
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      })
    )
  }

  return { mutate, ...result }
}

export const useAddProject = () => {
  const { run, ...result } = useAsync()
  const client = useHttp()

  const mutate = (params: Partial<Project>) => {
    // 发送修改项目请求
    return run(
      client(`projects/${params.id}`, {
        method: 'POST',
        data: params,
      })
    )
  }

  return { mutate, ...result }
}
