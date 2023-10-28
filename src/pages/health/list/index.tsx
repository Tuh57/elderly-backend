import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
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

const HealthListColumns = () => {
  return [
    {
      title: '编号',
      dataIndex: 'index',
      width: 60,

      shouldCellUpdate: () => true,
      render: (text, record, index) => index + 1
    },
    {
      title: '档案编号',
      dataIndex: 'file_no',
      width: 100
    },
    {
      title: '家庭账号',
      dataIndex: ['family', 'phone'],
      width: 100
    },
    {
      title: '用户姓名',
      dataIndex: 'name',
      width: 100
    },
    {
      title: '创建人',
      dataIndex: ['creator', 'nickname'],
      width: 200
    },
    {
      title: '创建人账号',
      dataIndex: ['creator', 'phone'],
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'create_at',
      width: 100,
      render: (text) => {
        return moment(text * 1000).format('YYYY-MM-DD HH:mm:ss');
      }
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
                  history.push('/health/detail?id=' + record.id);
                }}
              >
                查看档案
              </a>
            </div>

            <div>
              <a
                onClick={() => {
                  history.push('/health/record?id=' + record.id);
                }}
              >
                查看检测
              </a>
            </div>
          </Space>
        );
      }
    }
  ];
};

const HealthList = () => {
  const [form] = Form.useForm();

  const detailData = useRef();

  const getDeviceListReq = async (params) => {
    return request('/management/health/file/list', {
      method: 'POST',
      data: params
    });
  };

  const formatResult = (data) => {
    return {
      ...data,
      code: 2000,
      data: data.files,
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
        <Form.Item label="用户姓名" name="name">
          <Input placeholder="请输入用户姓名" allowClear />
        </Form.Item>

        <Form.Item label="家庭账号" name="family_phone">
          <Input placeholder="请输入家庭账号" allowClear />
        </Form.Item>

        <Form.Item label="档案编号" name="file_no">
          <Input placeholder="请输入档案编号" allowClear />
        </Form.Item>

        <Form.Item label="创建人" name="user_phone">
          <Input placeholder="请输入创建人" allowClear />
        </Form.Item>

        {/* <Form.Item label="创建人账号" name="creator.phone">
          <Input placeholder="请输入创建人账号" allowClear />
        </Form.Item>

        <Form.Item label="创建时间" name="create_at">
          <DatePicker.RangePicker allowClear showTime style={{ width: '100%' }} />
        </Form.Item> */}
        {/* <Form.Item label="下架记录号" name="serialNo">
          <Input placeholder="请输入" allowClear />
        </Form.Item> */}
      </XpSearchForm>
      <XpTable
        {...tableProps}
        columns={HealthListColumns()}
        toolbarShowSetting={false}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showQuickJumper: true }}
        tableTitle="健康档案列表"
      />
    </XpPage>
  );
};
const keepliveView = () => (
  <KeepAlive name={window.location.pathname}>
    <HealthList />
  </KeepAlive>
);
export default HealthList;
