var ArmsLoggerSDK = require("alife-logger");

import { useEffect, useRef } from "react";
import { history } from "umi";
var ARMS_IMG_URL = "https://arms-retcode.aliyuncs.com/r.png?";
var DEFAULT_PROD_HOSTS = ["admin-cn.x-peng.com", "admin-gzgc-ali-prod.x-peng.com", "admin-whgc-ali-prod.x-peng.com", "beidou.xiaopeng.com", "beidou-gz.xiaopeng.com", "beidou-wh.xiaopeng.com", "beidou-zq.xiaopeng.com"];

/**
 * 初始化 ARMS 上报
 * @param {string}  armsPid - arms pid 参数
 * @param {string[]} prodHosts 可选参数 - 生产环境域名列表
 */
var useArmsLogger = function useArmsLogger() {
  // 取消监听
  var unListen = useRef(); // 初始化arms

  var initArmsLogger = function initArmsLogger(_ref) {
    var _window, _window$location;

    var armsPid = _ref.armsPid,
        armsUid = _ref.armsUid,
        armsName = _ref.armsName,
        armsUserName = _ref.armsUserName,
        _ref$prodHosts = _ref.prodHosts,
        prodHosts = _ref$prodHosts === void 0 ? DEFAULT_PROD_HOSTS : _ref$prodHosts;
    // 通过域名判断当前环境为生产环境
    var isProdEnv = Array.isArray(prodHosts) && prodHosts.includes((_window = window) === null || _window === void 0 ? void 0 : (_window$location = _window.location) === null || _window$location === void 0 ? void 0 : _window$location.host);

    if (armsPid && isProdEnv) {
      var __bl = ArmsLoggerSDK.singleton({
        pid: armsPid,
        appType: "web",
        imgUrl: ARMS_IMG_URL,
        sendResource: true,
        enableLinkTrace: true,
        behavior: true,
        useFmp: true,
        enableSPA: false,
        enableConsole: true,
        uid: armsUid
      });

      __bl.setConfig({
        setUsername: function setUsername() {
          return "".concat(armsUserName, "(").concat(armsName, ")");
        },
        ignore: {
          ignoreErrors: ["ResizeObserver loop limit exceeded"]
        }
      }); // 开启路由监听，手动上报pageName


      unListen.current = history.listen(function () {
        var pageName = window.location.hostname + window.location.pathname + window.location.search + window.location.hash;

        __bl.setPage(pageName);
      });
    }
  };

  useEffect(function () {
    return function () {
      var _unListen$current;

      return (_unListen$current = unListen.current) === null || _unListen$current === void 0 ? void 0 : _unListen$current.call(unListen);
    };
  }, []);
  return initArmsLogger;
};

export default useArmsLogger;