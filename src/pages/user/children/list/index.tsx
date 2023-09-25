import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, message, Select, Space } from 'antd';
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

const DeviceListColumns = ({ frozenChilden, unFrozenChilden, search }) => {
  return [
    {
      title: '编号',
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
      title: '手机号',
      dataIndex: 'phone',
      width: 100
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100
    },
    {
      title: '创建时间',
      dataIndex: 'createAt',
      width: 200,
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
                  history.push('/user/children/detail?id=' + record.id);
                }}
              >
                查看
              </a>
            </div>

            <div>
              <a
                onClick={async () => {
                  !record.frozen ? await frozenChilden(record.id) : await unFrozenChilden(record.id);
                  message.success('操作成功');
                  search.submit();
                }}
              >
                {record.frozen ? '解冻' : '冻结'}
              </a>
            </div>
          </Space>
        );
      }
    }
  ];
};

const CubeStoreDownTask = () => {
  const [form] = Form.useForm();

  const detailData = useRef();

  const frozenChilden = (id) => {
    return request('/management/user/frozen', {
      method: 'POST',
      data: {
        id
      }
    });
  };

  const unFrozenChilden = (id) => {
    return request('/management/user/unfrozen', {
      method: 'POST',
      data: {
        id
      }
    });
  };

  const getListReq = async (params) => {
    return request('/management/user/list', {
      method: 'POST',
      data: params
    });
  };

  const formatResult = (data) => {
    return {
      ...data,
      code: 2000,
      data: data.users,
      count: data.total
    };
  };

  const { tableProps, search, param } = useXpTable(getListReq, {
    form,
    formatResult
  });

  return (
    <XpPage>
      <XpSearchForm
        form={form}
        onSearch={() => {
          search.submit();
        }}
        onReset={search.reset}
      >
        <Form.Item label="手机号" name="phone">
          <Input placeholder="请输入" allowClear />
        </Form.Item>

        <Form.Item label="昵称" name="nickName">
          <Input placeholder="请输入" allowClear />
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

        <Form.Item label="创建时间" name="createAt">
          <DatePicker.RangePicker allowClear showTime style={{ width: '100%' }} />
        </Form.Item>
      </XpSearchForm>
      <XpTable
        {...tableProps}
        columns={DeviceListColumns({ frozenChilden, unFrozenChilden, search })}
        toolbarShowSetting={false}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showQuickJumper: true }}
        tableTitle="子女端用户列表"
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
