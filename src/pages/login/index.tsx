import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions, Checkbox, message, Modal } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';
import less from './index.less';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [device, setDevice] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  console.log(history);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();

  const login = async (params) => {
    return request('/management/auth/user/login', {
      method: 'Post',
      timeout: 5000,
      data: params
    });
  };

  const resetPassword = async (params) => {
    return request('/management/auth/request/password/reset', {
      method: 'Post',
      data: params
    });
  };

  const resetPassword2 = async (params) => {
    return request('/management/auth/password/reset', {
      method: 'Post',
      data: params
    });
  };

  useEffect(() => {
    if (history.location?.query?.code) {
      console.log('111');
      setShowModal2(true);
    }
  }, [history.location?.query?.code]);

  const onFinish = () => {
    // history.push('/home');
    form.validateFields().then(async (values) => {
      console.log(values);
      const res = await login(values);
      if (!res.errmsg) {
        const { user } = res;

        localStorage.setItem('token', res.access_token);
        const url = user.role?.extra?.permissions[0]?.children[0].children[0].url;
        history.replace(url);
        // window.location.href = url;

        // history.push(url);
        // window.location.reload();
      } else {
        message.error(res.errmsg);
      }
    });
  };
  const onOk = async () => {
    const data = await form1.getFieldsValue();
    console.log(data);
    await resetPassword(data);
    message.success('发送邮件成功');
  };
  const onCancel = () => {
    setShowModal(false);
  };

  const onOk1 = async () => {
    const data = await form2.getFieldsValue();
    console.log(data);
    data.code = history.location?.query?.code;
    await resetPassword2(data);
    message.success('重置密码成功');
  };
  const onCancel1 = () => {
    setShowModal2(false);
  };

  const showModal1 = () => {
    const onOk = () => {};
    const onCancel = () => {};

    return (
      <Modal maskClosable={false} open={true} width={800} title={'忘记密码'} onOk={onOk} onCancel={onCancel}>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} form={form}>
          <Form.Item label="输入邮箱账号" name="title" rules={[{ required: true, message: '请输入邮箱账号' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="输入账户名" name="title" rules={[{ required: true, message: '请输入账户名' }]}>
            <Input />
          </Form.Item>

          {/* <Form.Item label="角色权限" name="permissions">
            {treeData.length && (
              <Tree
                treeData={treeData}
                // ref={treeRef}
                checkable
                onSelect={onSelect}
                onCheck={onCheck}
                defaultCheckedKeys={selectedRowKeys}
              />
            )}
          </Form.Item> */}
        </Form>
      </Modal>
    );
  };

  return (
    <XpPage>
      <div className={less.container}>
        <div className={less.title}>拓普优得户居家养老管理平台</div>

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
          <Form.Item label="登录账户" name="username" rules={[{ required: true, message: '请输入登录账户!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="登录密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码!' },
              { min: 6, message: '至少6位密码' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <a
              onClick={() => {
                setShowModal(true);
              }}
            >
              忘记密码
            </a>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>

      {showModal && (
        <Modal maskClosable={false} open={true} width={800} title={'忘记密码'} onOk={onOk} onCancel={onCancel}>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} form={form1}>
            <Form.Item label="输入邮箱账号" name="email" rules={[{ required: true, message: '请输入邮箱账号' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="输入账户名" name="username" rules={[{ required: true, message: '请输入账户名' }]}>
              <Input />
            </Form.Item>

            {/* <Form.Item label="角色权限" name="permissions">
            {treeData.length && (
              <Tree
                treeData={treeData}
                // ref={treeRef}
                checkable
                onSelect={onSelect}
                onCheck={onCheck}
                defaultCheckedKeys={selectedRowKeys}
              />
            )}
          </Form.Item> */}
          </Form>
        </Modal>
      )}

      {showModal2 && (
        <Modal maskClosable={false} open={true} width={800} title={'重置密码'} onOk={onOk1} onCancel={onCancel1}>
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} form={form2}>
            <Form.Item label="输入密码" name="password1" rules={[{ required: true, message: '请输入密码' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="重新输入密码" name="password2" rules={[{ required: true, message: '请输入密码' }]}>
              <Input />
            </Form.Item>

            {/* <Form.Item label="角色权限" name="permissions">
            {treeData.length && (
              <Tree
                treeData={treeData}
                // ref={treeRef}
                checkable
                onSelect={onSelect}
                onCheck={onCheck}
                defaultCheckedKeys={selectedRowKeys}
              />
            )}
          </Form.Item> */}
          </Form>
        </Modal>
      )}
    </XpPage>
  );
};
const keepliveView = () => (
  <KeepAlive name={window.location.pathname}>
    <CubeStoreDownTask />
  </KeepAlive>
);
export default keepliveView;
