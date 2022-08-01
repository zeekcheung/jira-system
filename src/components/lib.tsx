import styled from '@emotion/styled'
import { Button, Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'

// 全屏组件
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

// 全屏加载中组件
export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large"></Spin>
  </FullPage>
)

// 全屏错误提示组件
export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
)

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`
