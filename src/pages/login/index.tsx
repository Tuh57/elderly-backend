import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions, Checkbox, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';

import less from './index.less';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [device, setDevice] = useState({});

  console.log(history);
  const [form] = Form.useForm();

  const login = async (params) => {
    return request('/management/auth/user/login', {
      method: 'Post',
      data: params
    });
  };

  useEffect(() => {}, []);

  const onFinish = () => {
    // history.push('/home');
    form.validateFields().then(async (values) => {
      console.log(values);
      const res = await login(values);
      if (!res.errmsg) {
        const { user } = res;

        localStorage.setItem('token', res.access_token);
        const url = user.role?.extra?.permissions[0]?.children[0].children[0].url;
        window.location.href = url;

        // history.push(url);
        // window.location.reload();
      } else {
        message.error(res.errmsg);
      }
    });
  };

  return (
    <XpPage>
      <div className={less.container}>
        <div className={less.title}>拓普居家养老管理平台</div>

        <Form
          name="normal_login"
          className={less.loginForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="登录账户"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          {/* 
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </XpPage>
  );
};
const keepliveView = () => (
  <KeepAlive name={window.location.pathname}>
    <CubeStoreDownTask />
  </KeepAlive>
);
export default keepliveView;
