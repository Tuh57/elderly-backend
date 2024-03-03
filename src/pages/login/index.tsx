import { XpPage } from '@/common/es/index';
import { Button, Form, Input, message, Modal, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import KeepAlive from 'react-activation';
import { request, useHistory } from 'umi';
import logo from '@/assets/images/logo.png';
import success from '@/assets/images/success.png';
import less from './index.less';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [flag, setFlag] = useState('login' as string);
  const [isContent, setIsContent] = useState(false as boolean);
  const [loginButtonText, setLoginButtonText] = useState('登录' as string);
  const [text, setText] = useState('忘记密码' as string);
  const [tipText, setTipText] = useState('帐号登录' as string);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const background = {
    login: 'loginImg',
    forgot: 'forgotImg',
    captcha: 'resetPasswordImg',
    resetPassword: 'resetPasswordImg',
    success: 'resetPasswordImg'
  };

  // 判断是否是直接通过邮箱重置密码
  useEffect(() => {
    const { code } = history.location.query;
    if (code) {
      setFlag('resetPassword');
      setLoginButtonText('重设密码');
      setTipText('重设密码');
      setCode(code);
    }
  }, []);

  const createFormItem = (name, message, min, max, placeholder, prefix) => {
    return (
      <Form.Item
        name={name}
        rules={[
          { required: true, message },
          { min, max, message: `个数必须在${min}和${max}之间` }
        ]}
      >
        <Input placeholder={placeholder} prefix={prefix} />
      </Form.Item>
    );
  };
  // 创建一个映射对象，将flag的值映射到对应的表单元素
  const formItems = {
    login: (
      <>
        {createFormItem(
          'username',
          '请输入登录账户!',
          3,
          15,
          '请输入登录账户',
          <UserOutlined className={less.siteIcon} />
        )}
        {createFormItem('password', '请输入密码!', 6, null, '请输入密码', <LockOutlined className={less.siteIcon} />)}
      </>
    ),
    forgot: (
      <>
        {createFormItem(
          'email',
          '输入账户注册邮箱',
          null,
          null,
          '输入账户注册邮箱',
          <UserOutlined className={less.siteIcon} />,
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          '请输入有效的邮箱地址'
        )}
      </>
    ),
    captcha: (
      <>
        <div style={{ textAlign: 'center' }}>
          <Form.Item style={{ marginBottom: 4 }}>已发送验证码到邮箱：{email}</Form.Item>
          <p>输入验证码</p>
        </div>
        {createFormItem('code', '请输入验证码!', 6, null, '请输入验证码', <UserOutlined className={less.siteIcon} />)}
      </>
    ),
    resetPassword: (
      <>
        {createFormItem(
          'password1',
          '请输入密码!',
          6,
          null,
          '请输入新密码',
          <LockOutlined className={less.siteIcon} />
        )}
        {createFormItem(
          'password2',
          '请输入密码!',
          6,
          null,
          '请再次输入新的账户密码',
          <LockOutlined className={less.siteIcon} />,
          null,
          null,
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password1') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不匹配!'));
            }
          })
        )}
      </>
    ),
    success: (
      <Result
        status="success"
        title="重置密码成功"
        icon={<img src={success} alt="success" style={{ width: 60, height: 60 }} />}
      />
    )
  };

  const render = () => {
    // 从映射对象中获取对应的表单元素
    const formItem = formItems[flag];
    return <>{formItem}</>;
  };

  // 判断输入框是否有值
  const handleValuesChange = (changedValues, allValues) => {
    const list = ['email', 'code', 'password1', 'password2'];
    const result = list.find((v) => v in changedValues && changedValues[v]);
    setIsContent(result);
  };

  //  登录接口
  const login = async (params) => {
    return request('/management/auth/user/login', {
      method: 'Post',
      timeout: 5000,
      data: params
    });
  };

  // 发送重置邮箱
  const sendCode = async (params) => {
    return request('/management/auth/request/password/reset', {
      method: 'Post',
      data: params
    });
  };

  // 验证验证码
  const checkCode = async (params) => {
    return request('/management/auth/password/reset/code/check', {
      method: 'Post',
      data: params
    });
  };

  // 重置密码
  const resetPassword = async (params) => {
    return request('/management/auth/password/reset', {
      method: 'Post',
      data: params
    });
  };

  // 返回登录
  const changeFlag = (current) => {
    setFlag(current);
    setIsContent(false);
    setCode('');
    form.resetFields();
  };

  // 忘记密码
  const handleForgotPassword = () => {
    if (flag === 'login') {
      setLoginButtonText('发送验证码到邮箱');
      setText('返回登录');
      setTipText('找回密码');
      return changeFlag('forgot');
    }
    setLoginButtonText('登录');
    setText('忘记密码');
    setTipText('帐号登录');
    return changeFlag('login');
  };

  // 处理重复的部分
  const createSubmitFunction = (submitFunction) => {
    return async (params) => {
      setLoading(true);
      const result = await submitFunction(params);
      setLoading(false);
      if (result.errmsg) {
        message.error(result.errmsg);
      }
      return result;
    };
  };

  // 登录
  const loginSubmit = createSubmitFunction(async (params) => {
    const { username, password } = params;
    const { errmsg = '', user, access_token } = await login({ username, password });
    if (!errmsg) {
      localStorage.setItem('token', access_token);
      const url = user.role?.extra?.permissions[0]?.children[0].children[0].url;
      history.replace(url);
    }
  });

  // 发送邮件
  const forgotPasswordSubmit = createSubmitFunction(async (params) => {
    const { errmsg, result = false } = await sendCode(params);
    if (result) {
      setEmail(params.email);
      changeFlag('captcha');
      setLoginButtonText('下一步');
      return message.success('发送邮件成功');
    }
  });

  // 校验验证码
  const checkCodeSubmit = createSubmitFunction(async (params) => {
    const { result = false, code } = await checkCode(params);
    if (!result) {
      return message.error('验证码错误');
    }
    setCode(code);
    changeFlag('resetPassword');
    setLoginButtonText('重设密码');
    setTipText('重设密码');
    return message.success('验证码正确');
  });

  // 重置密码
  const resetPasswordSubmit = createSubmitFunction(async (params) => {
    const { errmsg, result } = await resetPassword({ ...params, code });
    if (result) {
      setTipText('');
      changeFlag('success');
      setIsContent(true);
      setLoginButtonText('重新登录');
      return message.success('重置密码成功');
    }
  });

  // 提交
  const onFinish = () => {
    form.validateFields().then(async (values) => {
      const submitFunctions = {
        login: loginSubmit,
        forgot: forgotPasswordSubmit,
        captcha: checkCodeSubmit,
        resetPassword: resetPasswordSubmit,
        success: handleForgotPassword
      };
      const submitFunction = submitFunctions[flag];
      if (submitFunction) {
        await submitFunction(values);
      }
    });
  };

  return (
    <XpPage>
      <div className={less.container}>
        <div className={less.nav}>
          <img src={logo} className={less.navLogo} />
          <span className={less.text}>养老管理平台</span>
        </div>
        <div className={`${less.loginBox} ${less[background[flag]]}`}>
          <img src={logo} alt="logo" className={less.logo} />
          <div className={less.loginForm}>
            <div className={less.title}>
              <p>优得护养老管理平台</p>
              <p style={{ fontSize: 19 }}>{tipText}</p>
            </div>

            <Form
              labelCol={{ span: 8 }}
              autoComplete="off"
              onValuesChange={handleValuesChange}
              onFinish={onFinish}
              form={form}
            >
              {render()}

              <Form.Item style={{ marginBottom: 4 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  size={'large'}
                  shape={'round'}
                  disabled={!isContent && flag !== 'login'}
                  loading={loading}
                  block
                >
                  {loginButtonText}
                </Button>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'right' }}>
                <a onClick={handleForgotPassword}>{flag !== 'success' && text}</a>
              </Form.Item>
            </Form>
          </div>
        </div>
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
