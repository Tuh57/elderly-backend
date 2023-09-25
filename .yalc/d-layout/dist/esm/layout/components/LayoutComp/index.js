function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import { Layout } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { history, KeepAlive, useAliveController } from "umi";
import KeepAliveTabs from "../KeepAliveTabs";
import useArmsLogger from "../../../common/useArmsLogger";
import { formatIcon, isInIframe, isNotEmpty, removeUrlBase, removeUrlQuery } from "../../utils";
import Updater from "../../utils/update";
import BreadCrumbComp from "../BreadCrumbComp";
import HeaderComp from "../HeaderComp";
import SiderComp from "../SiderComp";
import "./index.less";
import UpdateModal from "../Modal/UpdateModal";
import ErrorPage from "../ErrorPage";
import { useEnv } from "@mqi/hooks";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";

var LayoutComp = function LayoutComp(props) {
  var _tabRef$current3, _fullScreenRef$curren, _tabRef$current4, _breadCrumbRef$curren;

  var _useAliveController = useAliveController(),
      refreshScope = _useAliveController.refreshScope;

  var env = useEnv();
  var initArmsLogger = useArmsLogger(); // arms相关

  var openKeepAlive = props.openKeepAlive,
      appPrefix = props.appPrefix,
      switchOrg = props.switchOrg,
      loginOut = props.loginOut,
      armsPid = props.armsPid,
      keepaliveWhiteList = props.keepaliveWhiteList,
      _props$openPageAuth = props.openPageAuth,
      openPageAuth = _props$openPageAuth === void 0 ? false : _props$openPageAuth,
      _props$openCheckVersi = props.openCheckVersion,
      openCheckVersion = _props$openCheckVersi === void 0 ? false : _props$openCheckVersi;
  var Content = Layout.Content; //权限

  var buttonAuth = [];

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      buttonList = _useState2[0],
      setButtonList = _useState2[1]; // ref


  var siderRef = useRef();
  var tabRef = useRef();
  var breadCrumbRef = useRef();
  var fullScreenRef = useRef();
  var xtRef = useRef();
  var errorType = useRef(); //接口数据

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      userInfo = _useState4[0],
      setUserInfo = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      systemInfo = _useState6[0],
      setSystemInfo = _useState6[1];

  var _useState7 = useState({}),
      _useState8 = _slicedToArray(_useState7, 2),
      organizationInfo = _useState8[0],
      setOrganizationInfo = _useState8[1]; // 目录


  var _useState9 = useState([]),
      _useState10 = _slicedToArray(_useState9, 2),
      headerMenu = _useState10[0],
      setHeaderMenu = _useState10[1];

  var _useState11 = useState(""),
      _useState12 = _slicedToArray(_useState11, 2),
      headerId = _useState12[0],
      setHeaderId = _useState12[1]; // 菜单


  var _useState13 = useState({}),
      _useState14 = _slicedToArray(_useState13, 2),
      siderMenu = _useState14[0],
      setSiderMenu = _useState14[1];

  var _useState15 = useState(""),
      _useState16 = _slicedToArray(_useState15, 2),
      siderId = _useState16[0],
      setSiderId = _useState16[1]; // 路径


  var _useState17 = useState({}),
      _useState18 = _slicedToArray(_useState17, 2),
      pathEnum = _useState18[0],
      setPathEnum = _useState18[1]; // 加载状态


  var _useState19 = useState(true),
      _useState20 = _slicedToArray(_useState19, 2),
      loading = _useState20[0],
      setLoading = _useState20[1];

  var _useState21 = useState(false),
      _useState22 = _slicedToArray(_useState21, 2),
      isMount = _useState22[0],
      setIsMount = _useState22[1]; // 弹窗


  var _useState23 = useState(false),
      _useState24 = _slicedToArray(_useState23, 2),
      refreshVisible = _useState24[0],
      setRefreshVisible = _useState24[1]; // 强制重新渲染-请勿轻易删除


  var _useState25 = useState(false),
      _useState26 = _slicedToArray(_useState25, 2),
      mandatoryRendering = _useState26[0],
      setMandatoryRendering = _useState26[1]; // 初始化接口


  var getInitInfo = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return props === null || props === void 0 ? void 0 : props.initReq();

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function getInitInfo() {
      return _ref.apply(this, arguments);
    };
  }(); // 初始化提示语


  var initTooltip = function initTooltip(headerData, success, code, sysAppInfo) {
    if (success === false) {
      if (code !== 4001) {
        var _tabRef$current, _tabRef$current2;

        errorType.current = 500;
        var tabData = {
          key: 500,
          title: "系统异常",
          keepAliveKey: 500,
          location: 500,
          routeIndex: 0
        };
        var tabs = ((_tabRef$current = tabRef.current) === null || _tabRef$current === void 0 ? void 0 : _tabRef$current.pageTabs) || [];
        tabs.push(tabData);
        (_tabRef$current2 = tabRef.current) === null || _tabRef$current2 === void 0 ? void 0 : _tabRef$current2.addPageTabs(tabs);
      }
    } else if (!isNotEmpty(headerData)) {// 跳转到无权限页面
      // xtRef.current?.showNoAccess({
      //   showLogoutBtn: true,
      //   logout: loginOut,
      //   tips: `账号无${
      //     sysAppInfo?.appName ? `【${sysAppInfo.appName}】` : "系统"
      //   }权限，请联系管理员开通`,
      // });
    }
  };

  var changeRefreshVisible = function changeRefreshVisible() {
    setRefreshVisible(!refreshVisible);
  };

  var clearKeepAlive = function clearKeepAlive(_ref2) {
    var key = _ref2.key,
        keepAliveKey = _ref2.keepAliveKey;
    var refreshKey = keepaliveWhiteList === null || keepaliveWhiteList === void 0 ? void 0 : keepaliveWhiteList.find(function (v) {
      if (v === key) {
        return key;
      } else if (v === keepAliveKey) {
        return keepaliveWhiteList;
      }
    });

    if (refreshKey) {
      refreshScope(openKeepAlive ? removeUrlBase(refreshKey, appPrefix) : refreshKey);
    }
  };

  var isRenderTqmIcon = function isRenderTqmIcon() {
    var prefix = appPrefix === null || appPrefix === void 0 ? void 0 : appPrefix.toLowerCase();

    if (prefix.includes("tqm")) {
      var tqmIcon = document.createElement("script");
      tqmIcon.type = "text/javascript";
      tqmIcon.src = "https://cdn3.codesign.qq.com/icons/Q2kY5j3AqX0ExNd/latest/iconfont.js";
      document.head.appendChild(tqmIcon);
    }
  };

  var setInitInfoToStorage = function setInitInfoToStorage(loginUserInfo, sysAppInfo, orgInfo) {
    localStorage.setItem("loginUserInfo", JSON.stringify(loginUserInfo));
    localStorage.setItem("userInfo", JSON.stringify(loginUserInfo));
  };

  var monitorUpdate = function monitorUpdate() {
    var up = new Updater({
      timer: 300000,
      appPrefix: appPrefix
    }); //未更新通知

    up.on("no-update", function () {// console.log("未更新");
    }); //更新通知

    up.on("update", function () {
      // console.log("更新了");
      if (!refreshVisible) {
        changeRefreshVisible();
      }
    });
  };

  var defaultHeadId = useMemo(function () {
    if (isNotEmpty(headerMenu)) {
      var defaultItem = headerMenu.find(function (item) {
        return !item.isHidden;
      });
      return (defaultItem === null || defaultItem === void 0 ? void 0 : defaultItem.url) || "";
    }

    return "";
  }, [headerMenu]);

  var findLastUnhidden = function findLastUnhidden(source) {
    var target = {};
    if (!isNotEmpty(source)) return target;

    var _iterator = _createForOfIteratorHelper(source),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var item = _step.value;

        if ((item === null || item === void 0 ? void 0 : item.isHidden) === false) {
          target = item;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return target;
  };

  var settingMenu = function settingMenu(pathList) {
    var _pathList$;

    var siderItem = findLastUnhidden(_toConsumableArray(pathList));
    setHeaderId(((_pathList$ = pathList[0]) === null || _pathList$ === void 0 ? void 0 : _pathList$.url) || "");
    setSiderId((siderItem === null || siderItem === void 0 ? void 0 : siderItem.url) || "");
  };

  var handleCollapsed = function handleCollapsed(flag) {
    var _siderRef$current = siderRef === null || siderRef === void 0 ? void 0 : siderRef.current,
        changeCollapsed = _siderRef$current.changeCollapsed;

    if (flag && changeCollapsed) {
      changeCollapsed(flag === "close");
    }
  };

  var contentRender = function contentRender() {
    var _props$location, _props$location$query;

    if (errorType.current) {
      var type = errorType.current;
      return /*#__PURE__*/_jsx(ErrorPage, {
        errorType: type
      });
    }

    var iframeUrl = (props === null || props === void 0 ? void 0 : (_props$location = props.location) === null || _props$location === void 0 ? void 0 : (_props$location$query = _props$location.query) === null || _props$location$query === void 0 ? void 0 : _props$location$query.iframe_url) || null;

    if (iframeUrl) {
      return /*#__PURE__*/_jsx("iframe", {
        src: iframeUrl,
        width: "100%",
        style: {
          height: "calc(100vh - 160px)",
          border: 0
        }
      });
    }

    if (openKeepAlive) {
      var _props$location2, _props$location3;

      return /*#__PURE__*/_jsx(KeepAlive, {
        id: props === null || props === void 0 ? void 0 : (_props$location2 = props.location) === null || _props$location2 === void 0 ? void 0 : _props$location2.pathname,
        name: props === null || props === void 0 ? void 0 : (_props$location3 = props.location) === null || _props$location3 === void 0 ? void 0 : _props$location3.pathname,
        children: props === null || props === void 0 ? void 0 : props.children
      });
    } else {
      return props === null || props === void 0 ? void 0 : props.children;
    }
  }; // 获取菜单


  var getMenus = function getMenus(resources, menusItem, deepPath) {
    resources === null || resources === void 0 ? void 0 : resources.forEach(function (item, index) {
      var _buttonAuth;

      if (menusItem && !item.isHidden) {
        menusItem[index] = {
          title: item === null || item === void 0 ? void 0 : item.resourceName,
          label: item === null || item === void 0 ? void 0 : item.resourceName,
          key: item === null || item === void 0 ? void 0 : item.url,
          path: item === null || item === void 0 ? void 0 : item.url,
          url: item === null || item === void 0 ? void 0 : item.url,
          resourceType: item === null || item === void 0 ? void 0 : item.resourceType,
          icon: formatIcon(item),
          children: item.children && item.children.length && item.children.filter(function (i) {
            return !i.isHidden;
          }).length > 0 ? [] : null
        };
      }

      var deepPaths = [].concat(_toConsumableArray(deepPath), [_objectSpread({}, item)]);
      buttonAuth.push(item);
      buttonAuth = (_buttonAuth = buttonAuth) === null || _buttonAuth === void 0 ? void 0 : _buttonAuth.concat((item === null || item === void 0 ? void 0 : item.buttons) || []);
      pathEnum[removeUrlQuery(item.url)] = deepPaths;
      getMenus(item.children, menusItem && menusItem[index] && menusItem[index]["children"], deepPaths);
    });
  }; // 获取目录


  var formatMenu = function formatMenu(data) {
    data === null || data === void 0 ? void 0 : data.forEach(function (item) {
      var _item$resourceName, _item$resourceName2, _item$resourceName3;

      var newItem = {
        id: item === null || item === void 0 ? void 0 : item.id,
        path: item === null || item === void 0 ? void 0 : item.url,
        title: (_item$resourceName = item === null || item === void 0 ? void 0 : item.resourceName) !== null && _item$resourceName !== void 0 ? _item$resourceName : item === null || item === void 0 ? void 0 : item.permission,
        // icon: item?.icon ? item?.icon : "",
        name: (_item$resourceName2 = item === null || item === void 0 ? void 0 : item.resourceName) !== null && _item$resourceName2 !== void 0 ? _item$resourceName2 : item === null || item === void 0 ? void 0 : item.permission,
        label: (_item$resourceName3 = item === null || item === void 0 ? void 0 : item.resourceName) !== null && _item$resourceName3 !== void 0 ? _item$resourceName3 : item === null || item === void 0 ? void 0 : item.permission,
        url: item === null || item === void 0 ? void 0 : item.url,
        key: item === null || item === void 0 ? void 0 : item.url,
        sidechildren: item === null || item === void 0 ? void 0 : item.children
      };

      if (!(item !== null && item !== void 0 && item.isHidden) && item.children && item.children.length) {
        item.children.forEach(function (menuItem) {
          menuItem.icon = menuItem.icon || "mqi-icon-783";
        });
        headerMenu.push(newItem);
      }

      if (isNotEmpty(item.children)) {
        var siderList = [];
        getMenus(item.children, siderList, [newItem]);
        siderMenu[item === null || item === void 0 ? void 0 : item.url] = siderList;
      }
    });
    return {
      headerData: headerMenu,
      siderData: siderMenu
    };
  }; //路由变化


  var handleUrl = function handleUrl(location) {
    // 重置异常状态
    errorType.current = undefined;

    var formatLocation = _objectSpread({}, location);

    var _ref3 = (siderRef === null || siderRef === void 0 ? void 0 : siderRef.current) || {
      handleOpenkeys: function handleOpenkeys() {}
    },
        handleOpenkeys = _ref3.handleOpenkeys;

    var _ref4 = (tabRef === null || tabRef === void 0 ? void 0 : tabRef.current) || {
      pageTabs: [],
      addPageTabs: function addPageTabs() {},
      handleActive: function handleActive() {}
    },
        pageTabs = _ref4.pageTabs,
        addPageTabs = _ref4.addPageTabs,
        handleActive = _ref4.handleActive;

    var _ref5 = (breadCrumbRef === null || breadCrumbRef === void 0 ? void 0 : breadCrumbRef.current) || {
      setBreadCrumbs: function setBreadCrumbs() {}
    },
        setBreadCrumbs = _ref5.setBreadCrumbs;

    formatLocation.pathname = removeUrlBase(formatLocation.pathname, appPrefix);
    var pathname = formatLocation.pathname;
    var currentUrl = appPrefix + pathname;
    var pathList = pathEnum[currentUrl];

    var sourcePages = _toConsumableArray(pageTabs);

    var pageIndex = sourcePages.findIndex(function (item) {
      return item.key === currentUrl;
    });
    var whitelist = [{
      suffix: "inbread",
      title: "详情"
    }, {
      suffix: "detail",
      title: "详情"
    }, {
      suffix: "edit",
      title: "编辑"
    }, {
      suffix: "add",
      title: "新增"
    }];
    var tabData = {
      key: currentUrl,
      title: "详情页",
      keepAliveKey: currentUrl,
      location: formatLocation,
      routeIndex: 0
    };

    if (isNotEmpty(pathList)) {
      var fatherData = pathList[(pathList === null || pathList === void 0 ? void 0 : pathList.length) - 1];
      tabData = {
        key: currentUrl,
        keepAliveKey: fatherData === null || fatherData === void 0 ? void 0 : fatherData.url,
        title: (fatherData === null || fatherData === void 0 ? void 0 : fatherData.title) || (fatherData === null || fatherData === void 0 ? void 0 : fatherData.resourceName),
        location: formatLocation,
        routeIndex: 0
      };
      settingMenu(pathList);
      handleOpenkeys(pathList);
      setBreadCrumbs(pathList);
    } else {
      var urlArr = currentUrl === null || currentUrl === void 0 ? void 0 : currentUrl.split("/");

      if ((urlArr === null || urlArr === void 0 ? void 0 : urlArr.length) > 1) {
        var _urlArr$slice$, _urlArr$slice;

        var urlSuffix = urlArr === null || urlArr === void 0 ? void 0 : (_urlArr$slice$ = urlArr.slice(-1)[0]) === null || _urlArr$slice$ === void 0 ? void 0 : _urlArr$slice$.toLowerCase();
        var fatherUrl = pathEnum[urlArr === null || urlArr === void 0 ? void 0 : (_urlArr$slice = urlArr.slice(0, -1)) === null || _urlArr$slice === void 0 ? void 0 : _urlArr$slice.join("/")];
        var modeIndex = whitelist === null || whitelist === void 0 ? void 0 : whitelist.findIndex(function (item) {
          return urlSuffix === null || urlSuffix === void 0 ? void 0 : urlSuffix.endsWith(item.suffix);
        }); //判断是否存在父级

        if (fatherUrl) {
          var fatherArr = [].concat(_toConsumableArray(fatherUrl), [{
            url: currentUrl,
            name: "详情"
          }]);
          settingMenu(fatherUrl);
          handleOpenkeys(fatherUrl);

          if (modeIndex > -1) {
            var _fatherUrl;

            var tabTitle = "".concat(((_fatherUrl = fatherUrl[(fatherUrl === null || fatherUrl === void 0 ? void 0 : fatherUrl.length) - 1]) === null || _fatherUrl === void 0 ? void 0 : _fatherUrl.name) + whitelist[modeIndex]["title"]);
            tabData.title = tabTitle;
            fatherArr[fatherArr.length - 1]["name"] = tabTitle;
          }

          setBreadCrumbs(fatherArr);
        } else {
          setBreadCrumbs([]);
          handleOpenkeys([]);
          setSiderId("");
          setHeaderId("");
        } // 报表目录增加权限控制


        if (pathname.indexOf("/reportCenter/") !== -1) {
          tabData.title = "无页面权限";
          errorType.current = 401;
        } // 不在白名单中、存在文件资源(去掉pages根目录) => 401无权限


        if (openPageAuth && (urlArr === null || urlArr === void 0 ? void 0 : urlArr.length) > 3 && modeIndex === -1) {
          var _props$route$routes;

          // 去掉尾斜杠
          var cleanPath = pathname !== null && pathname !== void 0 && pathname.endsWith("/") ? pathname === null || pathname === void 0 ? void 0 : pathname.slice(0, -1) : pathname;

          if (((_props$route$routes = props.route.routes) === null || _props$route$routes === void 0 ? void 0 : _props$route$routes.findIndex(function (item) {
            return item.path === cleanPath;
          })) !== -1) {
            tabData.title = "无页面权限";
            errorType.current = 401;
          }
        }
      }
    }

    if (pageIndex > -1) {
      //是否关闭keepAlive
      clearKeepAlive(sourcePages[pageIndex]);
      sourcePages[pageIndex] = tabData;
    } else {
      sourcePages.push(tabData); // console.log(tabData, "tabData初始化");
      // sourcePages.push(tabData);
    }

    handleActive(currentUrl); // console.log(sourcePages, "tabData初始化");

    addPageTabs(sourcePages); // 因为只触发子组件渲染,window全局方法还是旧值,需要手动触发一次父组件渲染

    setMandatoryRendering(!mandatoryRendering);
  }; //初始化tab


  var setInitTab = function setInitTab() {
    // console.log("初始化");
    handleUrl(props.location);
    setIsMount(true);
  };

  var init = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _user$role, _user$role$extra;

      var _yield$getInitInfo, _yield$getInitInfo$us, user, loginUserInfo, roleResources, sysAppInfo, orgInfo, _formatMenu, headerData, siderData;

      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getInitInfo();

            case 2:
              _yield$getInitInfo = _context2.sent;
              _yield$getInitInfo$us = _yield$getInitInfo.user;
              user = _yield$getInitInfo$us === void 0 ? {} : _yield$getInitInfo$us;
              loginUserInfo = user;
              roleResources = (user === null || user === void 0 ? void 0 : (_user$role = user.role) === null || _user$role === void 0 ? void 0 : (_user$role$extra = _user$role.extra) === null || _user$role$extra === void 0 ? void 0 : _user$role$extra.permissions) || [];
              sysAppInfo = {};
              orgInfo = {}; // 设置标题
              // if (sysAppInfo?.appName) {
              //   document.title = `北斗智造-${sysAppInfo.appName}`;
              // }
              // 获取目录和菜单

              _formatMenu = formatMenu(roleResources), headerData = _formatMenu.headerData, siderData = _formatMenu.siderData;
              console.log(headerData, siderData, "----");
              loginUserInfo.id = loginUserInfo.userId; // 初始化Storage

              setInitInfoToStorage(loginUserInfo, sysAppInfo, orgInfo); // loginUserInfo && sessionStorage.setItem('userInfo', JSON.stringify(loginUserInfo));
              // // 初始化水印
              // initWatermark({
              //   sysID: sysAppInfo?.appCode as string,
              // });
              // // 初始化 arms
              // initArmsLogger({
              //   armsPid: armsPid,
              //   armsUid: loginUserInfo?.userId,
              //   armsName: loginUserInfo?.name,
              //   armsUserName: loginUserInfo?.username,
              // });
              // 初始化提示
              // initTooltip(headerData, success, code, sysAppInfo);

              if (!(errorType.current === 500)) {
                _context2.next = 17;
                break;
              }

              setLoading(false);
              setIsMount(true);
              return _context2.abrupt("return");

            case 17:
              // 检测版本
              if (openCheckVersion) {
                monitorUpdate();
              }

              setHeaderMenu(_toConsumableArray(headerData));
              setSiderMenu(_objectSpread({}, siderData));
              setPathEnum(_objectSpread({}, pathEnum));
              setButtonList(buttonAuth);
              setUserInfo(loginUserInfo);
              setOrganizationInfo(orgInfo);
              setSystemInfo(sysAppInfo);
              setLoading(false); // 初始化tab

              setInitTab();

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function init() {
      return _ref6.apply(this, arguments);
    };
  }(); //全局提供的方法


  window.BEIDOU_LAYOUT = {
    buttonList: buttonList,
    toggleCollapsed: handleCollapsed,
    closeTab: tabRef === null || tabRef === void 0 ? void 0 : (_tabRef$current3 = tabRef.current) === null || _tabRef$current3 === void 0 ? void 0 : _tabRef$current3.closeTab,
    setFullPage: fullScreenRef === null || fullScreenRef === void 0 ? void 0 : (_fullScreenRef$curren = fullScreenRef.current) === null || _fullScreenRef$curren === void 0 ? void 0 : _fullScreenRef$curren.setFullScreenStatus,
    rewriteTabRemoveFnc: tabRef === null || tabRef === void 0 ? void 0 : (_tabRef$current4 = tabRef.current) === null || _tabRef$current4 === void 0 ? void 0 : _tabRef$current4.rewriteTabRemoveFnc,
    setBreadcrumbs: breadCrumbRef === null || breadCrumbRef === void 0 ? void 0 : (_breadCrumbRef$curren = breadCrumbRef.current) === null || _breadCrumbRef$curren === void 0 ? void 0 : _breadCrumbRef$curren.breadcrumbSettings
  };
  useEffect(function () {
    // // 翼虎实例
    // let xtEnv = "test";
    // if (
    //   env === "prod" ||
    //   env === "gz-prod" ||
    //   env === "wh-uat" ||
    //   env === "wh-prod"
    // ) {
    //   xtEnv = "production";
    // }
    // xtRef.current =
    //   new window.xtigerSSO({
    //     lang: "zh",
    //     env: xtEnv,
    //   }) || {};
    init();
  }, []);
  useEffect(function () {
    var _xtRef$current;

    // 打开关闭loading
    (_xtRef$current = xtRef.current) === null || _xtRef$current === void 0 ? void 0 : _xtRef$current.showLoading(loading);
  }, [loading]); //路由监听

  useEffect(function () {
    var unBlock = history.block(function (location) {
      handleUrl(location);
    });
    return function () {
      return unBlock();
    };
  }, []);
  useEffect(function () {
    var iconLink = document.createElement("link");
    iconLink.rel = "stylesheet";
    iconLink.href = "/common-static/menu-icon/iconfont.css";
    document.head.appendChild(iconLink);
  }, []);
  return /*#__PURE__*/_jsx(_Fragment, {
    children: loading ? null : isInIframe() ? props.children : /*#__PURE__*/_jsxs(Layout, {
      style: {
        height: "100%"
      },
      className: "xp-layout",
      children: [/*#__PURE__*/_jsx(HeaderComp, {
        organizationInfo: organizationInfo,
        userInfo: userInfo,
        loginOut: loginOut,
        switchOrg: switchOrg,
        appPrefix: appPrefix,
        pathEnum: pathEnum,
        systemInfo: systemInfo,
        headerId: headerId,
        headerMenu: headerMenu,
        siderMenu: siderMenu,
        fullScreenRef: fullScreenRef
      }), /*#__PURE__*/_jsxs(Layout, {
        children: [/*#__PURE__*/_jsx(SiderComp, {
          ref: siderRef,
          siderId: siderId,
          headerId: headerId,
          siderMenu: siderMenu,
          defaultHeadId: defaultHeadId,
          appPrefix: appPrefix
        }), /*#__PURE__*/_jsx("div", {
          className: "mqi-layout-container",
          children: /*#__PURE__*/_jsxs(Layout, {
            style: {
              padding: "0px 10px 8px",
              minHeight: "calc(100vh - 70px)"
            },
            children: [/*#__PURE__*/_jsx(KeepAliveTabs, {
              ref: tabRef,
              appPrefix: appPrefix,
              openKeepAlive: openKeepAlive
            }), /*#__PURE__*/_jsx(BreadCrumbComp, {
              ref: breadCrumbRef,
              appPrefix: appPrefix
            }), /*#__PURE__*/_jsx(Content, {
              className: "site-layout-background mqi-layout-content",
              style: {
                padding: "0 16px",
                margin: 0,
                minHeight: 280
              },
              children: isMount && contentRender()
            }), /*#__PURE__*/_jsx(UpdateModal, {
              visible: refreshVisible,
              changeVisible: changeRefreshVisible
            })]
          })
        })]
      })]
    })
  });
};

export default LayoutComp;