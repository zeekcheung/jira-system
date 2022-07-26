import styled from '@emotion/styled'
import { Button, Card, Divider } from 'antd'
import React, { useState } from 'react'
import { Login } from './login'
import { Register } from './register'
import logo from '../../assets/logo.svg'
import left from '../../assets/left.svg'
import right from '../../assets/right.svg'

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? '注册' : '登录'}</Title>
        {isRegister ? <Register /> : <Login />}
        <Divider />
        <Button type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '已有帐号？去登录' : '没有账号？去注册'}
        </Button>
      </ShadowCard>
    </Container>
  )
}

// 根据HTML原生的元素创建带样式的组件：styled.el`style`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`

// logo
const Header = styled.header`
  width: 100%;
  padding: 5rem 0;
  background: url(${logo}) no-repeat center;
  background-size: 8rem;
`

// 根据已有组件创建带样式的组件：styled(Component)`style`
const ShadowCard = styled(Card)`
  box-sizing: border-box;
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`

// 标题
const Title = styled.h2`
  filter: opacity(0.8);
  margin-bottom: 2.4rem;
`

// 背景
const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: url(${left}), url(${right});
  background-repeat: no-repeat;
  background-position: left bottom, right bottom;
  background-size: calc((100vw - 40rem - 10rem) / 2),
    calc((100vw - 40rem - 10rem) / 2);
`
