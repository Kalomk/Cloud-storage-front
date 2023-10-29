import React from 'react';
import { setCookie } from 'nookies';
import { Button, Form, Input, notification } from 'antd';
import { RegisterFormDTO } from '@/app/api/auth/dto/auth.dto';
import Api from '@/app/api';

const RegisterForm: React.FC = () => {
  const onSubmit = async (values: RegisterFormDTO) => {
    try {
      const token = await Api.Auth.register(values);

      notification.success({
        message: 'Successful!',
        description: 'Entering admin dashboard',
        duration: 2,
      });

      setCookie(null, 'token', token, {
        path: '/',
      });

      location.href = '/dashboard/all';
    } catch (err) {
      console.warn('LoginForm', err);

      notification.error({
        message: 'Error!',
        description: 'User is already exist',
        duration: 2,
      });
    }
  };

  return (
    <div className="bg-white p-[20px] rounded-[15px]">
      <Form
        name="register"
        labelCol={{
          span: 8,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="E-Mail"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please,write the mail',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="FullName"
          name="fullName"
          rules={[
            {
              required: true,
              message: 'Please,write the fullname',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Write the password',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Enter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
