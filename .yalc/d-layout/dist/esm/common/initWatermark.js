import { watermark } from "@xp-security/watermark";
var DEFAULT_SYS_ID = "beidou"; // 获取 YYYY-MM-DD 格式的日期

var getDate = function getDate() {
  var date = new Date();
  var YYYY = date.getFullYear();
  var M = date.getMonth() + 1;
  var MM = M < 10 ? "0".concat(M) : M;
  var D = date.getDate();
  var DD = D < 10 ? "0".concat(D) : D;
  return "".concat(YYYY, "-").concat(MM, "-").concat(DD);
}; // 从 sessionStorage 获取当前用户信息


var getUserInfo = function getUserInfo() {
  var userInfoOrigin = sessionStorage.getItem("userInfo");
  return userInfoOrigin && userInfoOrigin !== "undefined" && userInfoOrigin !== "null" ? JSON.parse(userInfoOrigin) : {};
};

var initWatermark = function initWatermark(_ref) {
  var _ref$sysID = _ref.sysID,
      sysID = _ref$sysID === void 0 ? DEFAULT_SYS_ID : _ref$sysID;
  var curDate = getDate();
  var userInfo = getUserInfo();

  try {
    watermark({
      uid: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.username) || (userInfo === null || userInfo === void 0 ? void 0 : userInfo.id) || "",
      sysID: sysID,
      text: "".concat(userInfo === null || userInfo === void 0 ? void 0 : userInfo.username, "\n").concat(curDate)
    });
  } catch (err) {
    console.warn("watermark init error, msg: " + JSON.stringify((err === null || err === void 0 ? void 0 : err.message) || err));
  }
};

export default initWatermark;