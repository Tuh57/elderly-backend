import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';
import moment from 'moment';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [device, setDevice] = useState({});

  console.log(history);
  const [form] = Form.useForm();

  const getDeviceListReq = async () => {
    return request('/management/device/get', {
      method: 'GET',
      params: {
        id: history.location.query.id
      }
    });
  };

  useEffect(() => {
    getDeviceListReq().then((res) => {
      console.log(res);
      setDevice(res.device);
    });
  }, []);

  const columns1 = [
    {
      title: '编号',
      dataIndex: 'index',
      width: 150
    },
    {
      title: '名称',
      dataIndex: 'index',
      width: 300
    },
    {
      title: '当前版本',
      dataIndex: 'index',
      width: 300
    }
  ];

  const columns2 = [
    {
      title: '编号',
      dataIndex: 'index',
      width: 150
    },
    {
      title: '系统版本',
      dataIndex: 'index',
      width: 200
    },
    {
      title: '软件版本',
      dataIndex: 'index',
      width: 200
    },
    {
      title: '发布日期',
      dataIndex: 'index',
      width: 200
    },
    {
      title: '是否更新',
      dataIndex: 'index',
      width: 100
    },
    {
      title: '更新日期',
      dataIndex: 'index',
      width: 200
    }
  ];

  return (
    <XpPage>
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card title="基本信息" bordered={true}>
            <Descriptions title="" size={'middle'}>
              <Descriptions.Item label="设备ID">{device.device_no}</Descriptions.Item>
              <Descriptions.Item label="设备名称">{device.nickname}</Descriptions.Item>
              <Descriptions.Item label="账户ID">{device.family?.nickname}</Descriptions.Item>
              <Descriptions.Item label="软件版本">{device.software_version}</Descriptions.Item>
              <Descriptions.Item label="固件版本">{device.firmware_version}</Descriptions.Item>
              <Descriptions.Item label="激活状态">{device.active ? '已激活' : '未激活'}</Descriptions.Item>
              <Descriptions.Item label="出厂日期">
                {device.create_at && moment(device.create_at * 1000).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
              <Descriptions.Item label="激活日期">
                {device.active_at && moment(device.active_at * 1000).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="第三方软件信息" bordered={true}>
            <XpTable columns={columns1} toolbarShowSetting={false} />
          </Card>
          <Card title="系统升级信息" bordered={true}>
            <XpTable columns={columns2} toolbarShowSetting={false} />
          </Card>
        </Space>
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
