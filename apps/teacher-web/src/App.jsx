import HeaderNav from './components/HeaderNav';

import { Flex, Layout } from 'antd';

const { Header, Content, Footer } = Layout;


export default function App() {
  return (
    <>
      <Header>
        <HeaderNav/>
      </Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </>
  )
}
