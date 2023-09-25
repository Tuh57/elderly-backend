import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [record, setRecord] = useState({});

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
      setRecord(res.record);
    });
  }, []);

  return (
    <XpPage>
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card title="基本信息" bordered={true}>
            <Descriptions title="" size={'middle'}>
              <Descriptions.Item label="老人账户昵称">{record?.family?.nickname}</Descriptions.Item>
              <Descriptions.Item label="老人手机号">{record?.family?.phone}</Descriptions.Item>
              <Descriptions.Item label="子女账户昵称">{record.user?.nickname}</Descriptions.Item>
              <Descriptions.Item label="子女手机号">{record.user?.phone}</Descriptions.Item>
              <Descriptions.Item label="设备ID">{record.device?.device_no}</Descriptions.Item>
              <Descriptions.Item label="设备名称">{record.device?.nickname}</Descriptions.Item>
              <Descriptions.Item label="通话形式">{record.type}</Descriptions.Item>
              <Descriptions.Item label="通话开始时间">{record.start_time}</Descriptions.Item>
              <Descriptions.Item label="通话结束时间">{record.end_time}</Descriptions.Item>
              <Descriptions.Item label="通话时长">
                {((record.end_time - record.start_time) / 60).toFixed(2)}
              </Descriptions.Item>
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
