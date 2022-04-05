import React, { ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
export default class ErrorBoundary extends React.Component<
  { children: ReactNode; fallbackRender: FallbackRender },
  any
> {
  state = { error: null };

  // 当子组件抛出异常时，会调用该方法，接收到错误对象error，并将state设置为返回值
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallbackRender } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
