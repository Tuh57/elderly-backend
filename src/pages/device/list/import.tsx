// import {
//   importMaterialAppliance,
//   materialApplianceTemplate
// } from '@/pages/basicInfomation/stampingHomemadeMasterData/api';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { XpModal, XpTable } from '@/common/es/index';
import { Button, Input, message, Upload } from 'antd';
import type { FC, ReactElement } from 'react';
import React, { useState } from 'react';
import { request } from 'umi';
// import { importColumns } from './columns';

interface PropsType {
  visible: boolean;
  setVisible: (flag: boolean) => void;
}
let file: any = null;

// 冲压自制件模板
export const importTempalte = async (params: any) => {
  const res = await request(`/management/device/import`, {
    method: 'POST',
    data: params,
    contentType: 'multipart/form-data',
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res;
};

const ImportDevice: FC<PropsType> = ({ visible, setVisible }): ReactElement => {
  const [loading, setLoading] = useState(false);
  const [importList, setImportList] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible(false);
      setLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    setVisible(false);
    file = null;
  };

  const downloadTemplate = () => {
    window.open('http://8.134.151.47:8000/templates/devices.csv');
    // materialApplianceTemplate();
  };

  const uploadTemplate = async () => {
    const formData = new FormData();
    formData.append('file', file);
    setImportLoading(true);
    if (file) {
      const { errmsg } = await importTempalte(formData);
      if (!errmsg) {
        setImportLoading(false);
        message.success('操作完成');
      } else {
        setImportLoading(false);
        message.error(errmsg);
      }
    } else {
      setImportLoading(false);
      message.warning({
        content: '请选择文件上传',
        style: {
          marginTop: '10vh'
        }
      });
    }
  };

  const props = {
    beforeUpload: (fil: any) => {
      file = fil;
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (!isLt20M) {
        message.error({
          content: '文件大小不能超过20M',
          style: {
            marginTop: '10vh'
          }
        });
      }
      //格式校验
      const isExcel =
        file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type == 'application/vnd.ms-excel';
      const suffix = file.name.substr(file.name.lastIndexOf('.'));
      if ('.csv' !== suffix) {
        message.error('格式必须为csv');
        return Upload.LIST_IGNORE;
      }
      return false;
    }
  };

  return (
    <div>
      <XpModal
        title="导入设备列表"
        visible={visible}
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        width={'70%'}
        footer={[]}
      >
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ height: '32px', lineHeight: '32px' }}>选择文件：</div>
          <div>
            <Upload {...props} name="file" maxCount={1} accept=".csv">
              <div style={{ display: 'flex' }}>
                <Input placeholder="" readOnly style={{ width: 240 }} />
                <Button style={{ marginLeft: '-1px' }}>浏览</Button>
              </div>
              <p style={{ fontSize: 12, color: '#999' }}>支持扩展名：.csv,单个文件不超过20M</p>
            </Upload>
          </div>
          <Button
            type="primary"
            icon={<UploadOutlined />}
            loading={importLoading}
            style={{ marginLeft: 10 }}
            onClick={uploadTemplate}
          >
            上传
          </Button>
          <Button
            icon={<DownloadOutlined />}
            loading={uploadLoading}
            style={{ marginLeft: 25 }}
            onClick={downloadTemplate}
          >
            下载模板
          </Button>
        </div>
      </XpModal>
    </div>
  );
};
export default ImportDevice;
