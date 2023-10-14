import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Select, Space, Modal, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, history } from 'umi';
import moment from 'moment';
// import {
//   getInboundRouteData,
//   getLocationData,
//   getMaterialByCodeData,
//   getMaterialByNameData,
//   getWarehouseAreaData
// } from '@/api/inventoryManagementApi';

const valueToLabel = (present: any, label = 'valueName', value = 'valueCode') => {
  if (Array.isArray(present)) {
    try {
      const obj: { [key: string]: any } = {};
      const done = present.reduce((prev: any, cur: any) => {
        if (!obj[cur[value]]) obj[cur[value]] = prev.push({ label: cur[label], value: cur[value], opt: cur });
        return prev;
      }, []);
      return done;
    } catch (e) {
      console.log(e);
      return [];
    }
    return [];
  }
  return [];
};

const DeviceListColumns = ({ detailData, setAdminModalOpen, disableUser, enableUser, search }) => {
  const { confirm } = Modal;
  return [
    {
      title: '序号',
      dataIndex: 'index',
      width: 60,

      shouldCellUpdate: () => true,
      render: (text, record, index) => index + 1
    },
    {
      title: '账户ID',
      dataIndex: 'user_no',
      width: 100
    },
    {
      title: '登录账号',
      dataIndex: 'username',
      width: 100
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 100
    },
    {
      title: '邮箱账号',
      dataIndex: 'email',
      width: 200
    },
    {
      title: '用户名',
      dataIndex: 'nickname',
      width: 100
    },
    {
      title: '角色',
      dataIndex: ['role', 'title'],
      width: 100
    },
    {
      title: '创建人',
      dataIndex: ['creator', 'nickname'],
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
      width: 200,
      render: (text) => {
        return moment(text * 1000).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '状态',
      dataIndex: 'enable',
      width: 200,
      render: (text) => {
        return text ? '启用' : '禁用';
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      shouldCellUpdate: () => true,
      render: (text, record) => {
        return (
          <Space>
            {/* <div>
              <a
                onClick={() => {
                  // history.push('/device/detail?id=' + record.id);
                }}
              >
                详情
              </a>
            </div> */}

            <div>
              <a
                onClick={() => {
                  // history.push('/device/detail?id=' + record.id);
                  detailData.current = record;
                  setAdminModalOpen(true);
                }}
              >
                编辑
              </a>
            </div>

            <div>
              <a
                onClick={async () => {
                  confirm({
                    title: '你确认要' + (record.enable ? '禁用' : '启用') + '此数据吗？',
                    icon: <ExclamationCircleOutlined />,
                    content: '',
                    onOk() {
                      console.log('OK');
                      // history.push('/device/detail?id=' + record.id);
                      record.enable ? disableUser(record.id) : enableUser(record.id);
                      message.success('操作成功');
                      // search.submit({ page: 1 });
                      setTimeout(() => {
                        search.submit({ page: 1 });
                      }, 100);
                    },
                    onCancel() {
                      console.log('Cancel');
                    }
                  });
                }}
              >
                {record.enable ? '禁用' : '启用'}
              </a>
            </div>
          </Space>
        );
      }
    }
  ];
};

const AdminModal = (props) => {
  const { adminModalOpen, detailData, setAdminModalOpen, roles, search } = props;
  const [form] = Form.useForm();

  const adminUserCreateReq = (params) => {
    return request('/management/admin/user/create', {
      method: 'POST',
      data: params
    });
  };

  const adminUserGetReq = (id) => {
    return request('/management/admin/user/get', {
      method: 'GET',
      params: {
        id
      }
    });
  };

  const adminUserUpdateReq = (params) => {
    return request('/management/admin/user/update', {
      method: 'POST',
      data: {
        id: detailData.current.id,
        ...params
      }
    });
  };

  useEffect(() => {
    if (detailData?.current?.id) {
      adminUserGetReq(detailData.current.id).then((res) => {
        if (res.user) {
          const { data } = res.user;
          form.setFieldsValue(res.user);
        }
      });
    } else {
      console.log('++++');
    }
  }, detailData?.current?.id);

  const onOk = async () => {
    // console.log(treeData);
    const formData = await form.validateFields();
    console.log(formData);
    let data;

    if (detailData.current.id) {
      data = await adminUserUpdateReq(formData);
    } else {
      data = await adminUserCreateReq(formData);
    }

    if (data.errmsg) {
      message.error(data.errmsg);
      return;
    }

    setAdminModalOpen(false);
    message.success('操作成功');
    search.submit({ page: 1 });
    detailData.current = {};
  };

  const onCancel = () => {
    detailData.current = {};
    setAdminModalOpen(false);
  };

  const onValuesChange = () => {};

  // 判断手机号
  const checkPhone = (rule, value, callback) => {
    if (!value) {
      return Promise.resolve();
    } else if (!/^1[3456789]\d{9}$/.test(value)) {
      return Promise.reject('请输入正确的手机号');
    } else {
      return Promise.resolve();
    }
  };

  return (
    <Modal
      maskClosable={false}
      open={adminModalOpen}
      width={600}
      title={detailData.current.id ? '编辑用户' : '新增用户'}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} form={form} onValuesChange={onValuesChange}>
        <Form.Item
          label="登陆账号"
          name="username"
          rules={[{ required: true, message: '请输入登录账号 长度在3-15', min: 3, max: 15 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="邮箱" name="email" rules={[{ required: true, message: '请输入邮箱', type: 'email' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="phone"
          rules={[{ required: false, message: '请输入手机号', validator: checkPhone }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password1"
          rules={[{ required: !detailData.current.id, message: '请输入最少8位密码', min: 8 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="password2"
          rules={[{ required: !detailData.current.id, message: '请输入最少8位数密码', min: 8 }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="用户名称" name="nickname" rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="是否启用" name="enable" rules={[{ required: true, message: '请选择是否启用' }]}>
          <Select
            options={[
              { label: '是', value: true },
              { label: '否', value: false }
            ]}
            allowClear
            placeholder="请选择"
          />
        </Form.Item>

        <Form.Item label="角色" name="role_id" rules={[{ required: true, message: '请选择角色' }]}>
          <Select options={valueToLabel(roles, 'title', 'id')} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CubeStoreDownTask = () => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [roles, setRoles] = useState();

  const detailData = useRef({
    current: {}
  });

  const getDeviceListReq = async (params) => {
    return request('/management/admin/user/list', {
      method: 'POST',
      data: params
    });
  };

  const getRolesListReq = async (params) => {
    return request('/management/admin/role/list', {
      method: 'POST',
      data: params
    });
  };

  const enableUser = (id) => {
    return request('/management/admin/user/enable', {
      method: 'POST',
      data: {
        id: id
      }
    });
  };

  const disableUser = (id) => {
    return request('/management/admin/user/disable', {
      method: 'POST',
      data: {
        id: id
      }
    });
  };

  useEffect(() => {
    getRolesListReq({
      page: 1,
      size: 200,
      param: {}
    }).then((res) => {
      console.log(res);
      setRoles(res.roles);
    });
  }, []);

  const formatResult = (data) => {
    return {
      ...data,
      code: 2000,
      data: data.users,
      count: data.total
    };
  };

  const { tableProps, search, param } = useXpTable(getDeviceListReq, {
    form,
    formatResult
  });

  return (
    <XpPage>
      <XpSearchForm
        form={form}
        onSearch={() => {
          search.submit({ page: 1 });
        }}
        onReset={search.reset}
      >
        <Form.Item label="手机号码" name="phone">
          <Input placeholder="请输入手机号码" allowClear />
        </Form.Item>

        <Form.Item label="昵称" name="nickname">
          <Input placeholder="请输入用户名" allowClear />
        </Form.Item>

        <Form.Item label="状态" name="enable">
          <Select
            options={[
              { label: '开启', value: true },
              { label: '关闭', value: false }
            ]}
            allowClear
            placeholder="请选择"
          />
        </Form.Item>

        {/* <Form.Item label="下架记录号" name="serialNo">
          <Input placeholder="请输入" allowClear />
        </Form.Item> */}
      </XpSearchForm>
      <XpTable
        {...tableProps}
        columns={DeviceListColumns({
          detailData,
          setAdminModalOpen,
          disableUser,
          enableUser,
          search
        })}
        toolbarShowSetting={false}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showQuickJumper: true }}
        tableTitle="账户列表"
        toolbarButton={
          <Space>
            {/* <Button type="primary">导入模版</Button>
            <Button key="button">批量导出</Button> */}
            <Button
              key="button"
              onClick={() => {
                detailData.current = { id: '' };
                setAdminModalOpen(true);
              }}
            >
              新增账户
            </Button>
          </Space>
        }
      />

      <AdminModal
        adminModalOpen={adminModalOpen}
        detailData={detailData}
        roles={roles}
        setAdminModalOpen={setAdminModalOpen}
        search={search}
      />
    </XpPage>
  );
};
const keepliveView = () => (
  <KeepAlive name={window.location.pathname}>
    <CubeStoreDownTask />
  </KeepAlive>
);
export default keepliveView;
