import { useXpTable, XpPage, XpSearchForm, XpTable, XpModal } from '@/common/es/index';
import { Button, DatePicker, Form, Input, Select, Space, Card, Descriptions, Radio } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import KeepAlive, { useAliveController } from 'react-activation';
import { request, useHistory } from 'umi';
import ReactECharts from 'echarts-for-react';
import './index.less';
import moment from 'moment';

const CubeStoreDownTask = (props) => {
  const history = useHistory();
  const [family, setFamily] = useState({});
  const [devices, setDevices] = useState([]);
  const [users, setUsers] = useState([]);
  const [healths, setHealths] = useState([]);

  const [echartShow, setEchartShow] = useState(false);
  const [dateShow, setDateShow] = useState(false);

  let [echartsData, setEchartsData] = useState([[], [], [], [], [], [], []]);
  let [echartsData2, setEchartsData2] = useState([[], [], [], [], [], [], []]);

  const [echartsRowData, setEchartsRowData] = useState([[], [], [], []]);

  const [timeIndex, setTimeIndex] = useState(0);
  const [timeType, setTimeType] = useState('day');
  const [queryTime, setQueryTime] = useState([]);
  const [typeIndex, setTypeIndex] = useState(0);
  const [recordList, setRecordList] = useState([]);

  const [defaultTime, setDefaultTime] = useState('');

  const [summary, setSummary] = useState({});

  // const [pagination, setPagination] = useState({
  //   page: 1,
  //   size: 50
  // });

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const timeTypeData = ['day', 'week', 'month', 'year'];

  const recordColumns = [
    { value: 'heart_rate', value2: 'heart_rate_status_text' },
    { value: 'spo2', value2: 'spo2_status_text' },
    { value: 'diastolic_pressure', value2: 'blood_pressure_status_text' },
    { value: 'bk', value2: 'bk_status_text' },
    { value: 'hrv', value2: 'hrv_status_text' },
    { value: 'fatigue', value2: 'fatigue_level_status_text' }
  ];

  const typeText = ['心率', '血氧', '血压', '微循环', '心率变异性', '疲劳状态'];

  // 1-24 小时
  // 1-7 天
  // 1-31 天
  // 1-12 月

  console.log(history);
  const [form] = Form.useForm();

  // const { tableProps, search, param } = useXpTable(getRecordListReq, { form });

  const { id, family_id } = history.location.query;

  const timeQuery = ['hour', 'week', 'day', 'month'];

  useEffect(() => {
    setTimeIndex(3);
    setTimeType('year');
    const date = moment(new Date());
    setQueryTime([date.startOf('year').unix(), date.endOf('year').unix()]);
    setDefaultTime(date);
    setTimeout(() => {
      setDateShow(true);
    }, 300);
  }, []);

  const getReq1 = async () => {
    return request('/management/health/record/aggregate', {
      method: 'POST',
      data: {
        param: {
          member_file_id: id || 3,
          start_date_time: queryTime[0],
          end_date_time: queryTime[1],
          unit: timeQuery[timeIndex]
        },
        page: 1,
        size: 100
      }
    });
  };

  const getData = async () => {
    // setEchartShow(false);
    if (queryTime[0] && queryTime[1]) {
      const res = await getReq1();
      formatData(res.records || []);
      setSummary(res.summary2 || {});
    }
    // setEchartShow(true);
  };

  const getRecordListReq = async (currentPage) => {
    if (queryTime[0] && queryTime[1]) {
      let metric_key;
      if (typeIndex === 5) {
        metric_key = 'fatigue';
      } else {
        metric_key = recordColumns[typeIndex].value;
      }

      console.log(currentPage, 'currentPagecurrentPage');

      const res = await request('/management/health/record/list', {
        method: 'POST',
        data: {
          param: {
            member_file_id: id || 3,
            start_date_time: queryTime[0],
            end_date_time: queryTime[1],
            metric_key
          },
          page: currentPage || 1,
          size: 50
        }
      });
      setTotal(res.total || 0);
      setRecordList(res.records || []);
      console.log(res, 'res---');
    }
  };

  const resetData = () => {
    setDateShow(false);
    setEchartsData([[], [], [], [], [], [], []]);
    setEchartsData2([[], [], [], [], [], [], []]);
    setQueryTime([]);
    setSummary({});
    setRecordList([]);
    // setDateShow(true);
    // setEchartsRowData([[], [], [], []]);
  };

  useEffect(() => {
    formatRowData();
    getData();
    setDateShow(true);
    // setEchartShow(true);
  }, [timeIndex, queryTime, typeIndex]);

  useEffect(() => {
    getRecordListReq();
  }, [timeIndex, queryTime, typeIndex]);

  useEffect(() => {
    setTimeout(() => {
      setEchartShow(true);
    }, 300);

    // setDateShow(true);
  }, []);

  const formatData = (data) => {
    echartsData = [[], [], [], [], [], [], []];
    echartsData2 = [[], [], [], [], [], [], []];
    data.forEach((item, index) => {
      if (!item) {
        item = {};
      }

      if (!item.heart_rate) {
        item.heart_rate = { min: 0, max: 0 };
      }

      if (!item.spo2) {
        item.spo2 = { min: 0, max: 0 };
      }

      if (!item.diastolic_pressure) {
        item.diastolic_pressure = { min: 0, max: 0 };
      }

      if (!item.systolic_pressure) {
        item.systolic_pressure = { min: 0, max: 0 };
      }

      if (!item.bk) {
        item.bk = { min: 0, max: 0 };
      }

      if (!item.hrv) {
        item.hrv = { min: 0, max: 0 };
      }

      if (!item.fatigue_level) {
        item.fatigue_level = { min: 0, max: 0 };
      }

      echartsData[0].push(item?.heart_rate?.min); // 心率
      echartsData[1].push(item?.spo2?.min); // 血氧
      echartsData[2].push(item?.diastolic_pressure?.min); // 血压
      echartsData[3].push(item?.bk?.min); // 微循环
      echartsData[4].push(item?.hrv?.min); // 心率变异性
      echartsData[5].push(item?.fatigue_level?.min); // 疲劳状态
      echartsData[6].push(item?.systolic_pressure?.min); // 血压

      echartsData2[0].push(item?.heart_rate?.max - item?.heart_rate?.min); // 心率
      echartsData2[1].push(item?.spo2?.max - item?.spo2?.min); // 血氧
      echartsData2[2].push(item?.diastolic_pressure?.max - item?.diastolic_pressure?.min); // 血压
      echartsData2[3].push(item?.bk?.max - item?.bk?.min); // 微循环
      echartsData2[4].push(item?.hrv?.max - item?.hrv?.min); // 心率变异性
      echartsData2[5].push(item?.fatigue_level?.max - item?.fatigue_level?.min); // 疲劳状态
      echartsData2[6].push(item?.systolic_pressure?.max - item?.systolic_pressure?.min); // 疲劳状态
    });
    console.log(echartsData, '---');
    console.log(echartsData2, '---');
    setEchartsData(echartsData);
    setEchartsData2(echartsData2);
  };

  const formatRowData = () => {
    echartsRowData[0] = Array.from({ length: 24 }, (v, k) => k + 1);
    echartsRowData[1] = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    echartsRowData[2] = Array.from({ length: 31 }, (v, k) => k + 1);
    echartsRowData[3] = Array.from({ length: 12 }, (v, k) => k + 1);
    setEchartsRowData(echartsRowData);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString, '日期---');
    if (date) {
      console.log(date, dateString, '---');
      console.log(date.startOf(timeType).unix(), '---');
      console.log(date.endOf(timeType).unix(), '---');
      // const type = timeTypeData[timeIndex];
      setQueryTime([date.startOf(timeType).unix(), date.endOf(timeType).unix()]);
    } else {
      // setQueryTime([]);
      resetData();
    }
  };

  const onPanelChange = (value, model) => {
    console.log(value, model, '---');
  };

  const onClickTime = (e) => {
    console.log(e, '++');
    resetData();
    setDefaultTime('');
    setTimeIndex(Number(e.target.value));
    setTimeType(timeTypeData[Number(e.target.value)]);
    setTimeout(() => {
      setDateShow(true);
    }, 300);
    // resetData();
    // getData();
  };

  const onClickType = (e) => {
    setTypeIndex(Number(e.target.value));
  };

  const columns1 = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 60
      // shouldCellUpdate: () => true,
      // render: (text, record, index) => index + 1
    },
    {
      title: '监测时间',
      dataIndex: 'datetime',
      width: 300,
      render: (text, record, index) => {
        return text ? moment(text * 1000).format('YYYY-MM-DD HH:mm:ss') : '';
      }
    },
    {
      title: '监测结果',
      dataIndex: recordColumns[typeIndex]?.value,
      width: 300,
      render: (text, record, index) => {
        if (typeIndex === 2) {
          return record.blood_pressure_status_text;
        } else if (typeIndex === 5) {
          return record.fatigue_level;
        } else {
          return text;
        }
      }
    },
    {
      title: '数值范围',
      dataIndex: recordColumns[typeIndex]?.value2,
      width: 300,
      render: (text, record, index) => {
        if (typeIndex === 2) {
          return '舒张压：' + record.diastolic_pressure + ' ' + '收缩压：' + record.systolic_pressure;
        } else if (typeIndex === 5) {
          return record.fatigue_description;
        } else {
          return text;
        }
      }
    },
    {
      title: '原因分析',
      dataIndex: ['metrics', recordColumns[typeIndex]?.value, 'status_desc', 'reason'],
      width: 300,
      render: (text, record, index) => {
        if (typeIndex === 2) {
          return (
            record?.metrics?.diastolic_pressure?.status_desc?.reason +
            record.metrics?.systolic_pressure?.status_desc?.reason
          );
        } else {
          return text;
        }
      }
    },
    {
      title: '建议',
      dataIndex: ['metrics', recordColumns[typeIndex]?.value, 'status_desc', 'advice'],
      width: 300,
      render: (text, record, index) => {
        if (typeIndex === 2) {
          return (
            record.metrics?.diastolic_pressure?.status_desc?.advice +
            record.metrics?.systolic_pressure?.status_desc?.advice
          );
        } else {
          return text;
        }
      }
    }
  ];

  const soption = [
    {
      name: '3333',
      type: 'bar',
      stack: 'Total',
      yAxisIndex: 0,
      itemStyle: {
        borderColor: 'transparent',
        color: 'transparent'
      },
      emphasis: {
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        }
      },
      data: echartsData[2]
    },
    {
      name: '3333',
      type: 'bar',
      stack: 'Total',
      yAxisIndex: 0,
      label: {
        show: true,
        position: 'inside'
      },
      data: echartsData2[2]
    },
    {
      name: '3333',
      type: 'bar',
      stack: 'Total',
      yAxisIndex: 0,
      itemStyle: {
        borderColor: 'transparent',
        color: 'transparent'
      },
      emphasis: {
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        }
      },
      data: echartsData[6]
    },
    {
      name: '3333',
      type: 'bar',
      stack: 'Total',
      yAxisIndex: 0,
      label: {
        show: true,
        position: 'inside'
      },
      data: echartsData2[6]
    }
  ];

  const subtextFnc = () => {
    if (typeIndex === 2) {
      return (
        '舒张压最小值：' +
        (summary['diastolic_pressure']?.min || 0) +
        '舒张压最大值：' +
        (summary['diastolic_pressure']?.max || 0) +
        '收缩压最小值：' +
        (summary['systolic_pressure']?.min || 0) +
        '收缩压最大值：' +
        (summary['systolic_pressure']?.max || 0)
      );
    } else if (typeIndex === 5) {
      return '最小值：' + (summary['fatigue_level']?.min || 0) + ' 最大值：' + (summary['fatigue_level']?.max || 0);
    } else {
      return (
        '最小值：' +
        (summary[recordColumns[typeIndex]?.value]?.min || 0) +
        ' 最大值：' +
        (summary[recordColumns[typeIndex]?.value]?.max || 0)
      );
    }
  };

  let option = {
    title: {
      text: typeText[typeIndex] + '监测图',

      subtext: subtextFnc()
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      splitLine: { show: false },
      data: echartsRowData[timeIndex]
    },
    yAxis: [
      {
        type: 'value'
      },
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '3333',
        type: 'bar',
        stack: 'Total',
        yAxisIndex: 0,
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        },
        emphasis: {
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          }
        },
        data: echartsData[typeIndex]
      },
      {
        name: '3333',
        type: 'bar',
        stack: 'Total',
        yAxisIndex: 0,
        label: {
          show: true,
          position: 'inside'
        },
        data: echartsData2[typeIndex]
      }
      // {
      //   name: '2222',
      //   type: 'bar',
      //   stack: 'Total',
      //   yAxisIndex: 1,
      //   itemStyle: {
      //     borderColor: 'transparent',
      //     color: 'transparent'
      //   },
      //   emphasis: {
      //     itemStyle: {
      //       borderColor: 'transparent',
      //       color: 'transparent'
      //     }
      //   },
      //   data: [100, 200, 300, 600, 300, 900]
      // },
      // {
      //   name: '2222',
      //   type: 'bar',
      //   stack: 'Total',
      //   yAxisIndex: 1,
      //   label: {
      //     show: true,
      //     position: 'inside'
      //   },
      //   data: [200, 100, 400, 200, 900, 300]
      // }
    ]
  };

  if (typeIndex === 2) {
    option.series = soption;
    console.log(option, echartsData2[2], 'option---');
  }

  return (
    <XpPage>
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Card bordered={true}>
            <Space direction="vertical" size="large">
              {/* <Form form={form}> */}
              <div className="h">
                <div>指标：</div>
                <div>
                  <Radio.Group defaultValue="0" onChange={onClickType}>
                    <Radio.Button value="0">心率</Radio.Button>
                    <Radio.Button value="1">血氧</Radio.Button>
                    <Radio.Button value="2">血压</Radio.Button>
                    <Radio.Button value="3">微循环</Radio.Button>
                    <Radio.Button value="4">心率变异性</Radio.Button>
                    <Radio.Button value="5">疲劳状态</Radio.Button>
                  </Radio.Group>
                </div>
              </div>

              <div className="h">
                <div>时间周期：</div>
                <div>
                  <Radio.Group defaultValue="3" onChange={onClickTime}>
                    <Radio.Button value="0">日</Radio.Button>
                    <Radio.Button value="1">周</Radio.Button>
                    <Radio.Button value="2">月</Radio.Button>
                    <Radio.Button value="3">年</Radio.Button>
                  </Radio.Group>
                </div>
              </div>

              <div className="h">
                <div>日期：</div>
                <div>
                  {/* {' '} */}
                  {dateShow && (
                    <DatePicker
                      onChange={onChange}
                      onPanelChange={onPanelChange}
                      picker={timeType}
                      defaultValue={defaultTime}
                    />
                  )}
                </div>
              </div>
              {/* </Form> */}
            </Space>
          </Card>
          <Card bordered={true}>
            {echartShow && <ReactECharts option={option} notMerge={true} lazyUpdate={true} />}
          </Card>
          <Card title={typeText[typeIndex] + '监测记录'} bordered={true}>
            <XpTable
              columns={columns1}
              toolbarShowSetting={false}
              dataSource={recordList}
              pagination={{
                total,
                current: currentPage,
                defaultPageSize: 50
              }}
              onChange={(pagination) => {
                console.log(pagination, 'pagination');
                setCurrentPage(pagination.current);
                getRecordListReq(pagination.current);
              }}
            />
          </Card>
        </Space>
      </div>
    </XpPage>
  );
};

export default CubeStoreDownTask;
