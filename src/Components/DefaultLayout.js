import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
    import '../styles/layout.css'
    import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  CustomerServiceOutlined,
  StockOutlined,

  ShoppingCartOutlined,

  ProjectOutlined,

  InfoOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';


const DefaultLayout = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const {cartItems} = useSelector(state => state);
  useEffect(() => {
     setCollapsed(true);
   
    if(cartItems){
    localStorage.setItem("cartItems", JSON.stringify(cartItems)) 
    }
  }, [cartItems]);
 console.log(cartItems);
  const { Header, Sider, Content } = Layout;

const items = props.children;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
 
  return (
    <Layout className='site' >
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo"  > POS  </div>
        <Menu
          theme="dark"
          mode="inline"
          
          defaultSelectedKeys={window.location.pathname}
         
        >
          <Menu.Item key="/" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
            </Menu.Item>
          <Menu.Item key="/items"  icon={<ProjectOutlined />}>
            <Link to="/items">Items</Link>
            { localStorage.clear()}
          </Menu.Item>
          <Menu.Item key="/orders" icon={<UserOutlined />}>
            <Link to="/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="/logout" icon={<LogoutOutlined />} >
            <Link onClick={()=>{sessionStorage.clear("auth")}}> Logout</Link>

          </Menu.Item>

        </Menu>
      </Sider>
      <Layout className="site-layout" >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            marginLeft:  collapsed? '10%' : '165px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed)
          }) }
           
          <div className="cart" onClick={()=>navigate("/cart")}  >
            
          <p>{cartItems.length}</p>
          <ShoppingCartOutlined/>
          
         
          </div>  
         

        </Header>
        <Content
        className='content'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            marginLeft: collapsed? '10%' : '20%',
            
          }}
        >
      {items}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;