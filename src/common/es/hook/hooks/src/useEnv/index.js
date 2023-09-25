import { useMemo, useRef } from 'react';
var useEnv = function useEnv() {
  var evnAndPrefix = useRef([{
    prefix: 'beidou-dev.xiaopeng.local',
    env: 'dev'
  }, {
    prefix: 'beidou-sit.xiaopeng.local',
    env: 'sit'
  }, {
    prefix: 'beidou-uat.xiaopeng.com',
    env: 'uat'
  }, {
    prefix: 'beidou.xiaopeng.com',
    env: 'prod'
  }, {
    prefix: 'beidou-gz.xiaopeng.com',
    env: 'gz-prod'
  }, {
    prefix: 'beidou-gz-uat.xiaopeng.com',
    env: 'gz-uat'
  }, {
    prefix: 'beidou-wh.xiaopeng.com',
    env: 'wh-prod'
  }, {
    prefix: 'beidou-wh-uat.xiaopeng.com',
    env: 'wh-uat'
  }]);
  var env = useMemo(function () {
    var _evnAndPrefix$current, _evnAndPrefix$current2;
    return ((_evnAndPrefix$current = evnAndPrefix.current) === null || _evnAndPrefix$current === void 0 ? void 0 : (_evnAndPrefix$current2 = _evnAndPrefix$current.find(function (item) {
      return item.prefix === window.location.host;
    })) === null || _evnAndPrefix$current2 === void 0 ? void 0 : _evnAndPrefix$current2.env) || 'sit';
  }, [evnAndPrefix]);
  return env;
};
export default useEnv;