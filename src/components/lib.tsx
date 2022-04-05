import styled from "@emotion/styled";
import { Spin, Typography } from "antd";

// 全屏组件
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 全屏加载中组件
export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large"></Spin>
  </FullPage>
);

// 全屏错误提示组件
export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <Typography.Text type="danger">{error?.message}</Typography.Text>
  </FullPage>
);
