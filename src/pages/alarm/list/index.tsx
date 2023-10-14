import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, history } from 'umi';
import moment from 'moment';
import { exportReq } from '@/common/utils';
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
      title: '家庭账号',
      dataIndex: ['family', 'phone'],
      width: 100
    },
    {
      title: '警报类型',
      dataIndex: 'type_text',
      width: 100
    },
    {
      title: '摔倒识别结果',
      dataIndex: 'content',
      width: 100
    },
    {
      title: '警报时间',
      dataIndex: 'datetime',
      width: 200,
      render: (text) => {
        return text ? moment(text * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
      }
    },
    {
      title: '子女账号',
      dataIndex: ['user', 'phone'],
      width: 100
    },
    {
      title: '响应状态',
      dataIndex: 'status_text',
      width: 100
    },
    {
      title: '是否误报',
      dataIndex: 'is_error_alarm_text',
      width: 100
    }
  ];
};

const CubeStoreDownTask = () => {
  const [form] = Form.useForm();

  const detailData = useRef();

  const getListReq = async (params) => {
    return request('/management/activity/alarm/record/list', {
      method: 'POST',
      data: params
    });
  };

  const formatResult = (data) => {
    return {
      ...data,
      code: 2000,
      data: data.records,
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
          search.submit({ page: 1 });
        }}
        onReset={search.reset}
      >
        <Form.Item label="手机号" name="phone">
          <Input placeholder="请输入" allowClear />
        </Form.Item>
        {/* 
        <Form.Item label="子女手机号" name="nickname">
          <Input placeholder="请输入" allowClear />
        </Form.Item> */}

        <Form.Item label="警报类型" name="type">
          <Select
            options={[
              { label: '全部', value: '' },
              { label: '紧急呼救', value: 1 },
              { label: '摔倒警报', value: 2 }
            ]}
            allowClear
            placeholder="请选择"
          />
        </Form.Item>
        {/* 
        <Form.Item label="通话时间段" name="createTime">
          <DatePicker.RangePicker allowClear showTime style={{ width: '100%' }} />
        </Form.Item> */}

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
        tableTitle="异常警报列表"
        // toolbarButton={
        //   <Space>
        //     <Button key="button">导出</Button>
        //   </Space>
        // }
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
