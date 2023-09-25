import { useCallback } from 'react';
import useEnv from '../useEnv';
var useAuth = function useAuth() {
  var _window;
  // @ts-ignore
  var _window$BEIDOU_LAYOUT = (_window = window) === null || _window === void 0 ? void 0 : _window.BEIDOU_LAYOUT,
    buttonList = _window$BEIDOU_LAYOUT.buttonList;
  var env = useEnv();
  var auth = useCallback(function (permissionCode) {
    // dev 环境不做权限
    if (env === 'dev') {
      return true;
    }
    return !!(buttonList === null || buttonList === void 0 ? void 0 : buttonList.find(function (item) {
      return permissionCode === item.permission.toString() && !item.isHidden;
    }));
  }, [buttonList, env]);
  return {
    auth: auth
  };
};
export default useAuth;