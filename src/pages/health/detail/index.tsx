import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [family, setFamily] = useState({});
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [healths, setHealths] = useState([]);

  console.log(history);
  const [form] = Form.useForm();

  const { id, family_id } = history.location.query;

  const getReq1 = async () => {
    return request('/management/health/file/get', {
      method: 'GET',
      params: {
        id
      }
    });
  };

  useEffect(() => {
    console.log('11');
    getReq1().then((res) => {
      console.log(res);
      setHealths(res.file);
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
      title: '姓名',
      dataIndex: 'nickname',
      width: 300
    },
    // {
    //   title: '关系',
    //   dataIndex: 'nickname',
    //   width: 300
    // },
    {
      title: '联系电话',
      dataIndex: 'phone',
      width: 300
    }
  ];

  return (
    <XpPage>
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card title="基本信息" bordered={true}>
            <Descriptions title="" size={'middle'}>
              <Descriptions.Item label="姓名">{healths?.name}</Descriptions.Item>
              <Descriptions.Item label="性别">{healths.gender ? '男人' : '女人'}</Descriptions.Item>
              <Descriptions.Item label="出生日期">{healths.birthday}</Descriptions.Item>
              <Descriptions.Item label="身高">{healths.height}</Descriptions.Item>
              <Descriptions.Item label="体重">{healths.weight}</Descriptions.Item>
              <Descriptions.Item label="语言偏好">{healths.language === 'en' ? '英语' : '普通话'}</Descriptions.Item>
              <Descriptions.Item label="档案编号">{healths.file_no}</Descriptions.Item>
              <Descriptions.Item label="家庭账号">{healths?.family?.family_no}</Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="紧急联系人" bordered={true}>
            <XpTable
              columns={columns1}
              toolbarShowSetting={false}
              dataSource={healths.emergency_contacts || []}
              pagination={false}
            />
          </Card>
          <Card title="基础疾病信息" bordered={true}>
            <Space direction="vertical" size="middle">
              <div>身体状况：{healths.self_care_text}</div>
              <div>慢病信息：{healths?.chronic_diseases?.join('/')}</div>
            </Space>
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
