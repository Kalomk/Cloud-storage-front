import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import LoginForm from './Login';
import RegisterForm from './Register';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'SignIn',
    children: <LoginForm />,
  },
  {
    key: '2',
    label: 'SignUp',
    children: <RegisterForm />,
  },
];

const FormEnter: React.FC = () => <Tabs defaultActiveKey="1" items={items} />;

export default FormEnter;
