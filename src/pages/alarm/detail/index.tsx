import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [device, setDevice] = useState({});

  console.log(history);
  const [form] = Form.useForm();

  const getDeviceListReq = async () => {
    return request('/management/activity/call/history/get', {
      method: 'GET',
      params: {
        id: history.location.query.id
      }
    });
  };

  useEffect(() => {
    getDeviceListReq().then((res) => {
      console.log(res);
      setDevice(res.record);
    });
  }, []);

  return (
    <XpPage>
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card title="基本信息" bordered={true}>
            <Descriptions title="" size={'middle'}>
              <Descriptions.Item label="老人账户昵称">{device.device_no}</Descriptions.Item>
              <Descriptions.Item label="手机号">{device.nickname}</Descriptions.Item>
              <Descriptions.Item label="子女账户昵称">{device.family?.nickname}</Descriptions.Item>
              <Descriptions.Item label="手机号">{device.software_version}</Descriptions.Item>
              <Descriptions.Item label="设备ID">{device.firmware_version}</Descriptions.Item>
              <Descriptions.Item label="设备名称">{device.status}</Descriptions.Item>
              <Descriptions.Item label="通话形式">{device.create_at}</Descriptions.Item>
              <Descriptions.Item label="通话开始时间">{device.active_at}</Descriptions.Item>
              <Descriptions.Item label="通话结束时间">{device.active_at}</Descriptions.Item>
              <Descriptions.Item label="通话时长">{device.active_at}</Descriptions.Item>
            </Descriptions>
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
