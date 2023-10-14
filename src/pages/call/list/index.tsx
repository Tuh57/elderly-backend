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
      title: '老人手机号',
      dataIndex: ['family', 'phone'],
      width: 100
    },
    {
      title: '子女手机号',
      dataIndex: ['user', 'phone'],
      width: 100
    },
    {
      title: '设备ID',
      dataIndex: ['device', 'device_no'],
      width: 100
    },
    {
      title: '设备名称',
      dataIndex: ['device', 'nickname'],
      width: 200
    },
    {
      title: '通话形式',
      dataIndex: 'type',
      width: 100,
      render: (text) => (text === 'video' ? '视频通话' : '语音通话')
    },
    {
      title: '通话开始时间',
      dataIndex: 'start_time',
      width: 100,
      render: (text) => {
        return text ? moment(text * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
      }
    },
    {
      title: '通话结束时间',
      dataIndex: 'end_time',
      width: 100,
      render: (text) => {
        return text ? moment(text * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
      }
    },
    {
      title: '通话时长（分钟）',
      dataIndex: 'active_at',
      width: 200,
      render: (text, record) => {
        if (record.end_time && record.start_time) {
          return ((record.end_time - record.start_time) / 60).toFixed(2);
        } else {
          return '';
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return (
          <div>
            <a
              onClick={() => {
                history.push('/call/detail?id=' + record.id);
              }}
            >
              查看详情
            </a>
          </div>
        );
      }
    }
  ];
};

const CubeStoreDownTask = () => {
  const [form] = Form.useForm();

  const detailData = useRef();

  const getListReq = async (params) => {
    if (params.param?.createAt) {
      params.param.create_start_time = params.param.createAt[0].unix();
      params.param.create_end_time = params.param.createAt[1].unix();
    }

    return request('/management/activity/call/history/list', {
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
        <Form.Item label="老人手机号" name="family_phone">
          <Input placeholder="请输入" allowClear />
        </Form.Item>

        <Form.Item label="子女手机号" name="user_phone">
          <Input placeholder="请输入" allowClear />
        </Form.Item>

        <Form.Item label="通话形式" name="type">
          <Select
            options={[
              { label: '全部', value: '' },
              { label: '视频通话', value: 'video' },
              { label: '语音通话', value: 'audio' }
            ]}
            allowClear
            placeholder="请选择"
          />
        </Form.Item>

        <Form.Item label="通话时间段" name="createAt">
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
        tableTitle="互动数据列表"
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
