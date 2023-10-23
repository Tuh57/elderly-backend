import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, history } from 'umi';
import handleFormat from '@/common/utils/handleFormat';
import moment from 'moment';
import ImportDevice from './import';

// import {
//   getInboundRouteData,
//   getLocationData,
//   getMaterialByCodeData,
//   getMaterialByNameData,
//   getWarehouseAreaData
// } from '@/api/inventoryManagementApi';

const exportData = (res: any, fileName?: string) => {
  console.log(res);

  const blob = new Blob(['\ufeff' + res], {
    type: 'text/csv;charset=UTF-8'
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  // link.download = '标准模板.xls'
  // 文件名命名规范：三级菜单表格名称-导出时间，时间格式：年月日时分秒
  const formatName = `${fileName}-${moment().format('YYYYMMDDHHmmss')}`;
  fileName && link.setAttribute('download', formatName + '.csv');
  link.click();
  link.remove();
};

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
      title: '设备ID',
      dataIndex: 'device_no',
      width: 100
    },
    {
      title: '设备名称',
      dataIndex: 'nickname',
      width: 100
    },
    {
      title: '账户ID',
      dataIndex: ['family', 'family_no'],
      width: 100
    },
    {
      title: '出厂日期',
      dataIndex: 'manufacture_datetime',
      width: 200,
      render: (text) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    {
      title: '系统版本',
      dataIndex: 'motherboard_version',
      width: 100
    },
    {
      title: '软件版本',
      dataIndex: 'software_version',
      width: 100
    },
    {
      title: '固件版本',
      dataIndex: 'firmware_version',
      width: 100
    },
    {
      title: '激活状态',
      dataIndex: 'active',
      width: 100,
      render: (text, record) => {
        return record.active ? '已激活' : '未激活';
      }
    },
    {
      title: '激活日期',
      dataIndex: 'active_at',
      width: 200,
      render: (text) => {
        return text ? moment(Number(text) * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
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
                history.push('/device/detail?id=' + record.id);
              }}
            >
              详情
            </a>
          </div>
        );
      }
    }
  ];
};

const formatFormData = (param) => {
  const obj = {
    timeGroup: {
      createTime: ['manufacture_start_time', 'manufacture_end_time']
    }
  };
  return handleFormat(param, obj);
};

const CubeStoreDownTask = () => {
  const [form] = Form.useForm();
  const [importVisible, setImportVisible] = useState(false);

  const detailData = useRef();

  const getDeviceListReq = async (params) => {
    return request('/management/device/list', {
      method: 'POST',
      data: params
    });
  };

  const closeModal = () => {
    setImportVisible(false);
    search.submit({ page: 1 });
  };

  const exportDeviceListReq = async ({ pagination, param = {} }) => {
    // console.log(params, 'params');

    const file = await request('/management/device/export', {
      method: 'POST',
      data: {
        param,
        page: pagination.current,
        size: pagination.pageSize
      }
    });
    exportData(file, '机器人设备列表');
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
    formatResult,
    formatFormData
  });

  console.log(tableProps, 'tableProps');

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

        <Form.Item label="状态" name="active">
          <Select
            options={[
              { label: '全部', value: '' },
              { label: '未激活', value: false },
              { label: '已激活', value: true }
            ]}
            allowClear
            placeholder="请选择"
          />
        </Form.Item>

        <Form.Item label="出厂日期" name="createTime">
          <DatePicker.RangePicker allowClear showTime style={{ width: '100%' }} />
        </Form.Item>

        {/* <Form.Item label="激活时间" name="endTime">
          <DatePicker.RangePicker allowClear style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="下架时间" name="downTime">
          <DatePicker.RangePicker allowClear style={{ width: '100%' }} />
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
        tableTitle="机器人设备列表"
        toolbarButton={
          <Space>
            {/* <Button type="primary">模版下载</Button> */}

            <Button
              type="primary"
              onClick={() => {
                setImportVisible(true);
              }}
            >
              导入模版
            </Button>
            <Button
              key="button"
              type="primary"
              onClick={() => exportDeviceListReq({ pagination: tableProps.pagination, param })}
            >
              导出
            </Button>
          </Space>
        }
      />

      {importVisible && <ImportDevice visible={importVisible} setVisible={closeModal} />}
    </XpPage>
  );
};
const keepliveView = () => (
  <KeepAlive name={window.location.pathname}>
    <CubeStoreDownTask />
  </KeepAlive>
);
export default keepliveView;
