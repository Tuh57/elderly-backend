import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';
import moment from 'moment';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [device, setDevice] = useState({});
  const [sapp, setSapp] = useState([]);
  const [bpart, setBpart] = useState([]);

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
      setSapp(res.app_versions);
      setBpart(res.third_part_versions);
    });
  }, []);

  const columns1 = [
    {
      title: '编号',
      dataIndex: 'index',
      width: 150,
      render: (text, record, index) => index + 1
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 300
    },
    {
      title: '当前版本',
      dataIndex: 'version',
      width: 300
    }
  ];

  const columns2 = [
    {
      title: '编号',
      dataIndex: 'index',
      width: 150,
      render: (text, record, index) => index + 1
    },
    {
      title: '软件版本',
      dataIndex: 'version',
      width: 200
    },
    {
      title: '发布日期',
      dataIndex: 'publish_at',
      width: 200,
      render: (text) => {
        return text ? moment(text * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
      }
    },
    {
      title: '是否更新',
      dataIndex: 'upgraded',
      width: 100,
      render: (text) => {
        return text ? '是' : '否';
      }
    },
    {
      title: '更新日期',
      dataIndex: 'upgraded_at',
      width: 200,
      render: (text) => {
        return text ? moment(text * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
      }
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
              <Descriptions.Item label="账户ID">{device.family?.family_no}</Descriptions.Item>
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
            <XpTable columns={columns1} toolbarShowSetting={false} dataSource={bpart} />
          </Card>
          <Card title="系统升级信息" bordered={true}>
            <XpTable columns={columns2} toolbarShowSetting={false} dataSource={sapp} />
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
