import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';
import moment from 'moment';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [devices, setDevices] = useState([]);
  const [families, setFamilies] = useState([]);
  const [user, setUser] = useState([]);

  console.log(history);
  const [form] = Form.useForm();

  const getUserReq = async () => {
    return request('/management/user/get', {
      method: 'GET',
      params: {
        id: history.location.query.id
      }
    });
  };

  const getDeviceListReq = async () => {
    return request('/management/user/devices/related', {
      method: 'GET',
      params: {
        user_id: history.location.query.id
      }
    });
  };

  useEffect(() => {
    getUserReq().then((res) => {
      console.log(res);
      setUser(res.user);
    });

    getDeviceListReq().then((res) => {
      console.log(res);
      setDevices(res.devices);
      setFamilies(res.families);
    });
  }, []);

  const columns1 = [
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
      width: 300
    },
    {
      title: '设备名称',
      dataIndex: 'nickname',
      width: 300
    }
  ];

  const columns2 = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 60,
      shouldCellUpdate: () => true,
      render: (text, record, index) => index + 1
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 200
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 200
    }
  ];

  return (
    <XpPage>
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card title="基本信息" bordered={true}>
            <Descriptions title="" size={'middle'}>
              <Descriptions.Item label="账户ID">{user.user_no}</Descriptions.Item>
              <Descriptions.Item label="手机号">{user.phone}</Descriptions.Item>
              <Descriptions.Item label="昵称">{user?.nickname}</Descriptions.Item>
              {/* <Descriptions.Item label="绑定微信">{user.software_version}</Descriptions.Item> */}
              <Descriptions.Item label="状态">{user.frozen_text}</Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {moment(user.createAt * 1000).format('YYYY-MM-DD HH:mm:ss')}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="设备信息" bordered={true}>
            <XpTable columns={columns1} toolbarShowSetting={false} dataSource={devices} />
          </Card>
          <Card title="亲友信息" bordered={true}>
            <XpTable columns={columns2} toolbarShowSetting={false} dataSource={families} />
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
export default CubeStoreDownTask;
