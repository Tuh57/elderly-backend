import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions, Avatar } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import moment from 'moment';
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
    return request('/management/family/get', {
      method: 'GET',
      params: {
        id
      }
    });
  };

  const getReq2 = async () => {
    return request('/management/family/devices', {
      method: 'POST',
      data: {
        page: 1,
        size: 200,
        param: { family_id: id }
      }
    });
  };

  const getReq3 = async () => {
    return request('/management/family/users', {
      method: 'POST',
      data: {
        page: 1,
        size: 200,
        param: { family_id: id }
      }
    });
  };

  const getReq4 = async () => {
    return request('/management/health/file/list', {
      method: 'POST',
      data: {
        page: 1,
        size: 200,
        param: { family_id: id }
      }
    });
  };

  useEffect(() => {
    console.log('11');
    Promise.all([getReq1(), getReq2(), getReq3(), getReq4()]).then((res) => {
      console.log(res);
      setFamily(res[0].family);
      setDevices(res[1].devices);
      setUsers(res[2].users);
      setHealths(res[3].files);
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
      width: 300
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      width: 300
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 300
    }
  ];

  const columns3 = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 60,
      shouldCellUpdate: () => true,
      render: (text, record, index) => index + 1
    },
    {
      title: '用户名',
      dataIndex: 'name',
      width: 200
    },
    {
      title: '身高',
      dataIndex: 'height',
      width: 200
    },
    {
      title: '体重',
      dataIndex: 'weight',
      width: 200
    },
    {
      title: '身体状况',
      dataIndex: 'self_care_text',
      width: 200
    },
    {
      title: '慢病史',
      dataIndex: 'chronic_diseases',
      width: 200,
      render: (text, record) => {
        return record.chronic_diseases?.join(',');
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
                  history.push('/health/detail?id=' + record.id);
                }}
              >
                查看档案详情
              </a>
            </div>
          </Space>
        );
      }
    }
  ];

  return (
    <XpPage>
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card title="基本信息" bordered={true}>
            <Avatar size="large" src={family.avatar} />
            <Descriptions title="" size={'middle'}>
              <Descriptions.Item label="账户ID">{family.family_no}</Descriptions.Item>
              <Descriptions.Item label="手机号">{family.phone}</Descriptions.Item>
              <Descriptions.Item label="昵称">{family?.nickname}</Descriptions.Item>
              <Descriptions.Item label="状态">{family.frozen ? '冻结' : '正常'}</Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {family.create_at ? moment(family.create_at * 1000).format('YYYY-MM-DD hh:mm:ss') : ''}
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Card title="设备信息" bordered={true}>
            <XpTable columns={columns1} toolbarShowSetting={false} dataSource={devices} pagination={false} />
          </Card>
          <Card title="亲友信息" bordered={true}>
            <XpTable columns={columns2} toolbarShowSetting={false} dataSource={users} pagination={false} />
          </Card>
          <Card title="健康成员" bordered={true}>
            <XpTable columns={columns3} toolbarShowSetting={false} dataSource={healths} pagination={false} />
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
