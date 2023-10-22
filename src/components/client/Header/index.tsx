'use client';

import { Layout, Avatar, Menu, Popover, Button } from 'antd';
import { CloudOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';
import Api from '@/app/api';

const Header: React.FC = () => {
  const selectedMenu = usePathname();
  const onClickLogout = () => {
    if (window.confirm('Do you really want to quit')) {
      Api.Auth.logout();
      location.href = '/authorization';
    }
  };

  return (
    <Layout.Header className="fixed left-0 top-0 w-[100%] z-50 !bg-[#0071ce] ">
      <div className="flex justify-between items-center]">
        <div className="flex justify-center">
          <div className="font-medium font-segoe  mr-[36px] text-[20px]">
            <CloudOutlined width={24} height={24} className="mr-[10px]" />
            Cloud Storage
          </div>

          <Menu
            className="header-menu min-w-[200px] pb-[7px]"
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[selectedMenu]}
            items={[
              { key: '/dashboard', label: 'Main' },
              { key: '/dashboard/profile', label: 'Account' },
            ]}
          />
        </div>

        <div className="cursor-pointer">
          <Popover
            trigger="click"
            content={
              <Button onClick={onClickLogout} type="primary" danger>
                Close
              </Button>
            }
          >
            <Avatar>A</Avatar>
          </Popover>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
