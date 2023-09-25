import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Modal } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, history } from 'umi';
// import {
//   getInboundRouteData,
//   getLocationData,
//   getMaterialByCodeData,
//   getMaterialByNameData,
//   getWarehouseAreaData
// } from '@/api/inventoryManagementApi';

const DeviceListColumns = () => {
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
      dataIndex: 'device_no',
      width: 100
    },
    {
      title: '登陆账号',
      dataIndex: 'nickname',
      width: 100
    },
    {
      title: '手机号',
      dataIndex: 'family.user_id',
      width: 100
    },
    {
      title: '邮箱账号',
      dataIndex: 'create_at',
      width: 200
    },
    {
      title: '用户名车',
      dataIndex: 'software_version',
      width: 100
    },
    {
      title: '角色',
      dataIndex: 'firmware_version',
      width: 100
    },
    {
      title: '创建人',
      dataIndex: 'status',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'active_at',
      width: 200
    },
    {
      title: '状态',
      dataIndex: 'active_at',
      width: 200
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return (
          <Space>
            <div>
              <a
                onClick={() => {
                  history.push('/device/detail?id=' + record.id);
                }}
              >
                详情
              </a>
            </div>

            <div>
              <a
                onClick={() => {
                  history.push('/device/detail?id=' + record.id);
                }}
              >
                编辑
              </a>
            </div>

            <div>
              <a
                onClick={() => {
                  history.push('/device/detail?id=' + record.id);
                }}
              >
                启用
              </a>
            </div>
          </Space>
        );
      }
    }
  ];
};

const AdminModal = (props) => {
  const { adminModalOpen } = props;
  const [form] = Form.useForm();
  return (
    <Modal maskClosable={false} open={adminModalOpen} width={800} title="新增用户">
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} form={form}>
        <Form.Item
          label="登陆账号"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="邮箱" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="手机号" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CubeStoreDownTask = () => {
  const [adminModalOpen, setAdminModalOpen] = useState(true);
  const [form] = Form.useForm();

  const detailData = useRef();

  const getDeviceListReq = async (params) => {
    return request('/management/admin/user/list', {
      method: 'POST',
      data: params
    });
  };

  const formatResult = (data) => {
    return {
      ...data,
      code: 2000,
      data: data.devices,
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
        <Form.Item label="设备ID" name="device_no">
          <Input placeholder="请输入设备ID" allowClear />
        </Form.Item>

        <Form.Item label="设备名称" name="nickname">
          <Input placeholder="请输入设备名称" allowClear />
        </Form.Item>

        <Form.Item label="状态" name="status">
          <Select
            options={[
              { label: '全部', value: '' },
              { label: '未激活', value: 0 },
              { label: '已激活', value: 1 }
            ]}
            allowClear
            placeholder="请选择"
          />
        </Form.Item>

        <Form.Item label="出厂日期" name="createTime">
          <DatePicker.RangePicker allowClear showTime style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="激活时间" name="endTime">
          <DatePicker.RangePicker allowClear showTime style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="下架时间" name="downTime">
          <DatePicker.RangePicker allowClear showTime style={{ width: '100%' }} />
        </Form.Item>

        {/* <Form.Item label="下架记录号" name="serialNo">
          <Input placeholder="请输入" allowClear />
        </Form.Item> */}
      </XpSearchForm>
      <XpTable
        {...tableProps}
        columns={DeviceListColumns()}
        toolbarShowSetting={false}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showQuickJumper: true }}
        tableTitle="账户列表"
        // toolbarButton={
        //   <Space>
        //     <Button type="primary">导入模版</Button>
        //     <Button key="button">批量导出</Button>
        //     <Button key="button">导出</Button>
        //   </Space>
        // }
      />

      <AdminModal adminModalOpen={adminModalOpen} />
    </XpPage>
  );
};
const keepliveView = () => (
  <KeepAlive name={window.location.pathname}>
    <CubeStoreDownTask />
  </KeepAlive>
);
export default keepliveView;
