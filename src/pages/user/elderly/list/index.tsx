import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, message, Modal } from 'antd';
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

const DeviceListColumns = ({ frozen, unFrozen, search }) => {
  const { confirm } = Modal;
  return [
    {
      title: '编号',
      dataIndex: 'id',
      width: 60

      // shouldCellUpdate: () => true,
      // render: (text, record, index) => index + 1
    },
    {
      title: '账户ID',
      dataIndex: 'family_no',
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
      title: '绑定设备ID',
      dataIndex: 'sss',
      width: 100,
      render: (text, record) => {
        if (record?.devices?.length) {
          return record?.devices
            .map((item) => {
              return item.device_no;
            })
            .join(',');
        }
      }
    },
    {
      title: '设备名称',
      dataIndex: 'b',
      width: 100,
      render: (text, record) => {
        if (record?.devices?.length) {
          return record?.devices
            .map((item) => {
              return item.nickname;
            })
            .join(',');
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'frozen_text',
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
                  history.push('/user/elderly/detail?id=' + record?.id);
                }}
              >
                查看
              </a>
            </div>

            <div>
              <a
                onClick={async () => {
                  confirm({
                    title: '你确认要' + (record.frozen ? '解冻' : '冻结') + '此数据吗？',
                    content: '',
                    onOk() {
                      console.log('OK');
                      !record.frozen ? frozen(record.id) : unFrozen(record.id);
                      message.success('操作成功');
                      // search.submit();
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
                {record.frozen ? '解冻' : '冻结'}
              </a>
            </div>

            {/* {record?.frozen && (
              <div>
                <a
                  onClick={async () => {
                    const { errcode } = await unFrozen(record.id);
                    if (errcode === 0) {
                      message.success('解结成功');
                    } else {
                      message.error('解结失败');
                    }
                  }}
                >
                  解冻
                </a>
              </div>
            )} */}
          </Space>
        );
      }
    }
  ];
};

const CubeStoreDownTask = () => {
  const [form] = Form.useForm();

  const detailData = useRef();

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
    exportData(file, '老人设备列表');
  };

  const frozen = (id) => {
    return request('/management/family/frozen', {
      method: 'POST',
      data: {
        id
      }
    });
  };

  const unFrozen = (id) => {
    return request('/management/family/unfrozen', {
      method: 'POST',
      data: {
        id
      }
    });
  };

  const getListReq = async (params) => {
    if (params.param?.createAt) {
      params.param.create_start_time = params.param.createAt[0].unix();
      params.param.create_end_time = params.param.createAt[1].unix();
    }

    return request('/management/family/list', {
      method: 'POST',
      data: params
    });
  };

  const formatResult = (data) => {
    return {
      ...data,
      code: 2000,
      data: data.families,
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
          <Input placeholder="请输入手机号" allowClear />
        </Form.Item>
        {/* 
        <Form.Item label="设备ID" name="device_no">
          <Input placeholder="请输入设备ID" allowClear />
        </Form.Item> */}

        <Form.Item label="昵称" name="nickname">
          <Input placeholder="请输入昵称" allowClear />
        </Form.Item>

        <Form.Item label="状态" name="frozen">
          <Select
            options={[
              { label: '全部', value: '' },
              { label: '正常', value: false },
              { label: '已冻结', value: true }
            ]}
            allowClear
            placeholder="请选择"
          />
        </Form.Item>

        <Form.Item label="创建时间" name="createAt">
          <DatePicker.RangePicker allowClear showTime style={{ width: '100%' }} />
        </Form.Item>

        {/* <Form.Item label="下架记录号" name="serialNo">
          <Input placeholder="请输入" allowClear />
        </Form.Item> */}
      </XpSearchForm>
      <XpTable
        {...tableProps}
        columns={DeviceListColumns({
          frozen,
          unFrozen,
          search
        })}
        toolbarShowSetting={false}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showQuickJumper: true }}
        tableTitle="老人端用户列表"
        toolbarButton={
          <Space>
            {/* <Button type="primary">导入模版</Button>
            <Button key="button">批量导出</Button> */}
            <Button
              key="button"
              onClick={() =>
                exportReq({
                  pagination: tableProps.pagination,
                  param,
                  title: '老人列表',
                  exportUrl: '/management/family/export'
                })
              }
            >
              导出
            </Button>
          </Space>
        }
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
