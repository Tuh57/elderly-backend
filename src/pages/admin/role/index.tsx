import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Modal, Tree } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, history } from 'umi';
// import {
//   getInboundRouteData,
//   getLocationData,
//   getMaterialByCodeData,
//   getMaterialByNameData,
//   getWarehouseAreaData
// } from '@/api/inventoryManagementApi';

const DeviceListColumns = ({ setAdminModalOpen, detailData, deleteRoleReq, search }) => {
  return [
    {
      title: '序号',
      dataIndex: 'index',
      width: 60,

      shouldCellUpdate: () => true,
      render: (text, record, index) => index + 1
    },
    {
      title: '角色名称',
      dataIndex: 'title',
      width: 100
    },
    {
      title: '备注',
      dataIndex: 'description',
      width: 300
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return (
          <Space>
            {/* <div>
              <a
                onClick={() => {
                  history.push('/device/detail?id=' + record.id);
                }}
              >
                详情
              </a>
            </div> */}

            <div>
              <a
                onClick={() => {
                  // setShowModal(true);
                  detailData.current = record;
                  setAdminModalOpen(true);
                }}
              >
                编辑
              </a>
            </div>

            <div>
              <a
                onClick={() => {
                  // history.push('/device/detail?id=' + record.id);
                  deleteRoleReq(record.id);
                  search.submit();
                }}
              >
                删除
              </a>
            </div>
          </Space>
        );
      }
    }
  ];
};

const AdminModal = (props) => {
  const { adminModalOpen, setAdminModalOpen, detailData = {} } = props;
  const [form] = Form.useForm();
  const treeRef = useRef();
  const [treeData, setTreeData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [defaultCheckedKeys, setDefaultCheckedKeys] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  const adminRoleCreateReq = (params) => {
    return request('/management/admin/role/create', {
      method: 'POST',
      data: params
    });
  };

  const adminRoleGetReq = (id) => {
    return request('/management/admin/role/get', {
      method: 'GET',
      params: {
        id
      }
    });
  };

  const adminRoleUpdateReq = (params) => {
    return request('/management/admin/role/update', {
      method: 'POST',
      data: {
        id: detailData.current.id,
        ...params
      }
    });
  };

  useEffect(() => {
    const newTreeData = JSON.parse(JSON.stringify(window.mockRouter));
    const recursion = (list: any[]) => {
      list.forEach((item) => {
        if (!item.key) {
          item.key = item.url;
        }
        if (item.children) {
          recursion(item.children);
        }
      });
    };
    recursion(newTreeData);

    if (detailData.current.id) {
      adminRoleGetReq(detailData.current.id).then((res) => {
        console.log(res);
        if (res.role) {
          const { description, title, permissionConfig = {} } = res.role;
          form.setFieldsValue({
            description,
            title
          });

          if (res?.role?.extra?.selectedRowKeys) {
            setSelectedRowKeys(res?.role?.extra?.selectedRowKeys);
          }
          setTreeData(newTreeData);
        }
      });
    } else {
      console.log('++++');

      setTreeData(newTreeData);
    }
  }, detailData?.current?.id);

  useEffect(() => {
    // const newTreeData = JSON.parse(JSON.stringify(window.mockRouter));
    // const recursion = (list: any[]) => {
    //   list.forEach((item) => {
    //     if (!item.key) {
    //       item.key = item.url;
    //     }
    //     if (item.children) {
    //       recursion(item.children);
    //     }
    //   });
    // };
    // recursion(newTreeData);
    // console.log(newTreeData, 'newTreeData');
    // setTreeData(newTreeData);
  }, []);

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log(checkedKeys, 'checkedKeys');

    setSelectedRowKeys([...checkedKeys]);
  };

  // 树形结构 根据key 返回一条树结构
  function filterTreeByKeys(treeArray, keys) {
    const filteredTree = [];

    function findNodeByKey(node, keys) {
      if (keys.includes(node.key)) {
        return { ...node, children: node?.children?.map((child) => findNodeByKey(child, keys)) };
      } else if (node.children && node.children.length > 0) {
        const filteredChildren = node.children.map((child) => findNodeByKey(child, keys)).filter(Boolean);
        return filteredChildren.length > 0 ? { ...node, children: filteredChildren } : null;
      } else {
        return null;
      }
    }

    for (let i = 0; i < treeArray.length; i++) {
      const node = treeArray[i];
      const filteredNode = findNodeByKey(node, keys);
      if (filteredNode) {
        filteredTree.push(filteredNode);
      }
    }

    return filteredTree;
  }

  const onOk = async () => {
    // 设置treeData匹配selectedRowKeys选中状态
    const formData = await form.validateFields();
    console.log(formData);

    const newTreeData = JSON.parse(JSON.stringify(treeData));
    const newTree = filterTreeByKeys(newTreeData, selectedRowKeys);
    console.log('onCheck', newTree);
    console.log(newTree);
    // setTreeData(newTreeData);
    formData.permissions = newTree;
    formData.extra = {
      selectedRowKeys: selectedRowKeys,
      permissions: newTree
    };

    if (detailData.current.id) {
      await adminRoleUpdateReq(formData);
    } else {
      const data = await adminRoleCreateReq(formData);
    }

    setAdminModalOpen(false);
    detailData.current = {};

    // console.log(treeData);
  };

  const onCancel = () => {
    detailData.current = {};
    setAdminModalOpen(false);
  };

  return (
    <Modal maskClosable={false} open={adminModalOpen} width={800} title="新增用户" onOk={onOk} onCancel={onCancel}>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} form={form}>
        <Form.Item label="角色名称" name="title" rules={[{ required: true, message: 'Please input your username!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="备注" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="角色权限" name="permissions">
          {treeData.length && (
            <Tree
              treeData={treeData}
              // ref={treeRef}
              checkable
              onSelect={onSelect}
              onCheck={onCheck}
              defaultCheckedKeys={selectedRowKeys}
            />
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CubeStoreDownTask = () => {
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [form] = Form.useForm();
  // const ref = useRef();

  const detailData = useRef({});

  const getDeviceListReq = async (params) => {
    return request('/management/admin/role/list', {
      method: 'POST',
      data: params
    });
  };

  const deleteRoleReq = async (id) => {
    return request('/management/admin/role/delete', {
      method: 'POST',
      data: { id }
    });
  };

  const formatResult = (data) => {
    return {
      ...data,
      code: 2000,
      data: data.roles,
      count: data.total
    };
  };

  const { tableProps, search, param } = useXpTable(getDeviceListReq, {
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
        <Form.Item label="关键词" name="nickname">
          <Input placeholder="请输入关键词" allowClear />
        </Form.Item>

        {/* <Form.Item label="下架记录号" name="serialNo">
          <Input placeholder="请输入" allowClear />
        </Form.Item> */}
      </XpSearchForm>
      <XpTable
        {...tableProps}
        columns={DeviceListColumns({ setAdminModalOpen, detailData, deleteRoleReq, search })}
        toolbarShowSetting={false}
        rowKey="id"
        pagination={{ ...tableProps.pagination, showQuickJumper: true }}
        tableTitle="账户列表"
        toolbarButton={
          <Space>
            <Button
              key="button"
              onClick={() => {
                detailData.current = { id: '' };
                setAdminModalOpen(true);
              }}
            >
              新建角色
            </Button>
          </Space>
        }
      />
      {adminModalOpen && (
        <AdminModal adminModalOpen={adminModalOpen} setAdminModalOpen={setAdminModalOpen} detailData={detailData} />
      )}
    </XpPage>
  );
};
const keepliveView = () => (
  <KeepAlive name={window.location.pathname}>
    <CubeStoreDownTask />
  </KeepAlive>
);
export default keepliveView;
