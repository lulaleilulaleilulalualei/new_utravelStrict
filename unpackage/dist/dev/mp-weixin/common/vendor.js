(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 14:
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 15:
/*!*************************************************!*\
  !*** F:/code/utravel_s/utravel_s/vuex/store.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 16));

var _common = _interopRequireDefault(__webpack_require__(/*! ./modules/common.js */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


_vue.default.use(_vuex.default);
//创建store实例
var _default = new _vuex.default.Store({
  modules: {
    common: _common.default } });exports.default = _default;

/***/ }),

/***/ 16:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 17:
/*!**********************************************************!*\
  !*** F:/code/utravel_s/utravel_s/vuex/modules/common.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var types = _interopRequireWildcard(__webpack_require__(/*! ../types */ 18));var _mutations;function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};if (desc.get || desc.set) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}}newObj.default = obj;return newObj;}}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var state = {
  selfOrderObj: null,
  tvlObj: null, //出行人对象信息
  addressObj: null //地址信息
};

var getters = {
  selfOrderObj: function selfOrderObj(state) {return state.selfOrderObj;},
  tvlObj: function tvlObj(state) {return state.tvlObj;},
  addressObj: function addressObj(state) {return state.addressObj;} };


var mutations = (_mutations = {}, _defineProperty(_mutations,
types.BUY_SELF_PRO, function (state, obj) {
  state.selfOrderObj = obj;
}), _defineProperty(_mutations,
types.EDIT_TRAVELER, function (state, obj) {
  state.tvlObj = obj;
}), _defineProperty(_mutations,
types.EDIT_ADDRESS, function (state, obj) {
  state.addressObj = obj;
}), _mutations);


var actions = {
  toGetSelfOrder: function toGetSelfOrder(_ref, obj) {var commit = _ref.commit;
    commit(types.BUY_SELF_PRO, obj);
  },
  toGetTvlObj: function toGetTvlObj(_ref2, obj) {var commit = _ref2.commit;
    commit(types.EDIT_TRAVELER, obj);
  },
  toGetAddressObj: function toGetAddressObj(_ref3, obj) {var commit = _ref3.commit;
    commit(types.EDIT_ADDRESS, obj);
  } };var _default =


{
  state: state,
  actions: actions,
  getters: getters,
  mutations: mutations };exports.default = _default;

/***/ }),

/***/ 18:
/*!*************************************************!*\
  !*** F:/code/utravel_s/utravel_s/vuex/types.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.EDIT_ADDRESS = exports.EDIT_TRAVELER = exports.BUY_SELF_PRO = void 0;
//公共操作
var BUY_SELF_PRO = "BUY_SELF_PRO"; //购买茶咖
exports.BUY_SELF_PRO = BUY_SELF_PRO;
var EDIT_TRAVELER = "EDIT_TRAVELER"; //编辑出行人
exports.EDIT_TRAVELER = EDIT_TRAVELER;
var EDIT_ADDRESS = "EDIT_ADDRESS"; //编辑地址
exports.EDIT_ADDRESS = EDIT_ADDRESS;

/***/ }),

/***/ 19:
/*!*************************************************!*\
  !*** F:/code/utravel_s/utravel_s/common/api.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {


var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}
var config = __webpack_require__(/*! ../config.js */ 20);var

Api = /*#__PURE__*/function () {function Api() {_classCallCheck(this, Api);}_createClass(Api, null, [{ key: "warnNotice", //数据请求简单封装
    value: function warnNotice(
    title) {

      uni.getSystemInfo({
        success: function success(res) {
          var sysInfoVer = res.SDKVersion;
          if (sysInfoVer.split('.')[0] <= 1) {
            if (sysInfoVer.split('.')[1] >= 9) {
              uni.showToast({
                title: title,
                icon: 'none' });

            } else {
              uni.showToast({
                title: title,
                icon: 'loading' });

            }
          } else {
            uni.showToast({
              title: title,
              icon: 'none' });

          }
        } });









    } }, { key: "ajax", value: function ajax(

    dataObj) {
      var promise = new Promise(function (resolve, reject, defaults) {
        if (_vue.default.prototype.$userInfo) {
          if (!dataObj.data) dataObj.data = {};
          dataObj.data.token = _vue.default.prototype.$userInfo.token;
          // dataObj.data.token = '3b383cb74edb3e9dfca157d5c518386f'
        }
        uni.request({
          url: dataObj.url,
          method: dataObj.method || 'GET',
          header: dataObj.header || {},
          data: dataObj.data,
          success: resolve,
          fail: reject,
          complete: defaults });

      });
      return promise;
    } }, { key: "interleave", value: function interleave(

    str) {//回车空格替换
      return str.replace(/(\r\n)|(\n)/g, '\n');
    } }, { key: "formatTime", value: function formatTime(

    time) {
      var a = time.split(' ')[0];
      return a.replace(/-/g, '/');
    } }, { key: "userLogin", value: function userLogin(

    callBack) {//wx.canIUse('button.open-type.getUserInfo') botton授权兼容处理
      var $this = this;
      // 获取用户信息
      uni.login({
        timeout: 10000,
        success: function success(_res) {
          uni.getSetting({
            success: function success(res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                uni.getUserInfo({
                  lang: 'zh_CN',
                  success: function success(res) {
                    $this.ajax({
                      url: config.login,
                      method: 'POST',
                      data: {
                        code: _res.code,
                        encryptedData: res.encryptedData,
                        iv: res.iv } }).


                    then(function (resolve) {
                      if (resolve.statusCode == 200 && resolve.data.code == 0) {
                        _vue.default.prototype.$userInfo = resolve.data.data;
                        typeof callBack == 'function' && callBack('1');
                      } else {
                        $this.warnNotice(resolve.data.message);
                      }
                    }).
                    catch(function (err) {
                      $this.warnNotice('登录失败，请重新登录');
                    });
                  },
                  fail: function fail() {
                    $this.warnNotice('获取用户信息失败，请重新登录');
                  } });

              } else if (res.authSetting['scope.userInfo'] !== undefined && !res.authSetting['scope.userInfo']) {//已拒绝授权
                typeof callBack == 'function' && callBack('0');
              } else {//未授权
                typeof callBack == 'function' && callBack();
              }
            },
            fail: function fail() {
              $this.warnNotice('登录异常，请重新登录');
            } });

        },
        fail: function fail() {
          $this.warnNotice('登录异常，请重新登录');
        } });

    } }, { key: "trim", value: function trim(

    strs) {
      if (Object.prototype.toString.call(strs) === "[object String]") {
        return strs.replace(/(^\s*)|(\s*$)/g, '');
      }
    } }, { key: "countDownTime", value: function countDownTime(

    afterDate, callback) {
      var timer = setInterval(function () {
        var newDate = new Date().getTime(),
        times = Math.floor((afterDate - newDate) / 1000);

        if (times <= 0) {
          clearInterval(timer);
          return;
        }

        var day = Math.floor(Math.floor(times / 86400)),
        hour = day * 24 + Math.floor(times % 86400 / 3600),
        minute = Math.floor(times % 3600 / 60),
        second = times % 60;

        if (hour < 10) hour = '0' + hour;
        if (minute < 10) minute = '0' + minute;
        if (second < 10) second = '0' + second;

        typeof callback == 'function' && callback(hour, minute, second);
      }, 1000);
    } }, { key: "countDown", value: function countDown(

    callback) {
      var downObj = {
        maxTime: 60,
        countTxt: '',
        status: false,
        timer: '',
        downTime: function downTime() {
          var $this = this;
          if (this.maxTime > 1) {
            this.maxTime--;
            this.countTxt = this.maxTime + '秒后获取';
            this.status = true;
            typeof callback == 'function' && callback($this.countTxt, $this.status);
            this.timer = setTimeout(function () {
              $this.downTime();
            }, 1000);
          } else {
            this.status = false;
            this.timer = setTimeout(function () {
              typeof callback == 'function' && callback('获取验证码', $this.status);
            }, 1000);
          }
        } };

      downObj.downTime();
    } }, { key: "pointProblem", value: function pointProblem(

    arg1, arg2, type) {
      if (arg1 == '') arg1 = 0;
      if (arg2 == '') arg2 = 0;
      if (type == 'add') {
        var _r, _r2, _m;
        try {_r = arg1.toString().split(".")[1].length;} catch (e) {_r = 0;}
        try {_r2 = arg2.toString().split(".")[1].length;} catch (e) {_r2 = 0;}
        _m = Math.pow(10, Math.max(_r, _r2));
        return (arg1 * _m + arg2 * _m) / _m;
      }
      if (type == 'sub') {
        var r1, r2, m, n;
        try {r1 = arg1.toString().split(".")[1].length;} catch (e) {r1 = 0;}
        try {r2 = arg2.toString().split(".")[1].length;} catch (e) {r2 = 0;}
        m = Math.pow(10, Math.max(r1, r2));
        n = r1 >= r2 ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
      }
      if (type == 'mul') {
        var _m2 = 0,s1 = '',s2 = '';
        if (arg1 && arg1 != null)
        s1 = arg1.toString();

        if (arg2 && arg2 != null)
        s2 = arg2.toString();

        try {_m2 += s1.split('.')[1].length;} catch (e) {}
        try {_m2 += s2.split('.')[1].length;} catch (e) {}

        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, _m2);
      }
    } }, { key: "inputTest", value: function inputTest(

    val, type) {
      var telReg = /^\s*1[3456789]\d{9}$/,
      codeReg = /^\d{4}$/,
      cardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      mailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

      if (type == 'tel') {
        if (telReg.test(val)) {
          return true;
        } else {
          this.warnNotice('请输入正确的手机号码');
          return false;
        }
      } else if (type == 'card') {
        if (cardReg.test(val)) {
          return true;
        } else {
          this.warnNotice('请输入正确的身份证号码');
          return false;
        }
      } else if (type == 'mail') {
        if (mailReg.test(val)) {
          return true;
        } else {
          this.warnNotice('请输入正确的邮箱');
          return false;
        }
      } else if (type == 'code') {
        if (codeReg.test(val)) {
          return true;
        } else {
          this.warnNotice('请输入正确位数的验证码');
          return false;
        }
      }

    } }]);return Api;}();



module.exports = Api;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope) {
        return this.$scope[method](args)
      }
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!*********************************************!*\
  !*** F:/code/utravel_s/utravel_s/config.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var host = "http://192.168.199.150:2346";

var config = {
  host: host,
  login: "".concat(host, "/app/login"), //登录地址
  indexApi: "".concat(host, "/app/index"), //首页接口
  // 线路
  lineCondition: "".concat(host, "/route/query/conditions"), //线路筛选条件
  lineList: "".concat(host, "/route/page"), //线路列表
  lineDetail: "".concat(host, "/route/details"), //线路详情
  lineBatch: "".concat(host, "/route/batch/list"), //线路批次
  lineComment: "".concat(host, "/route/comment/page"), //线路评论
  lineCommentTag: "".concat(host, "/route/comment/tags"), //线路评论标签
  userList: "".concat(host, "/user/rel/list"), //出行列表
  createUser: "".concat(host, "/user/rel/create"), //新增出行人
  updateUser: "".concat(host, "/user/rel/update"), //编辑出行人
  deleteUser: "".concat(host, "/user/rel/delete"), //删除出行人

  // 收货地址
  addressList: "".concat(host, "/user/address/list"), //地址列表
  addAddress: "".concat(host, "/user/address/create"), //新增收货地址
  updateAddress: "".concat(host, "/user/address/update"), //更新地址
  deleteAddress: "".concat(host, "/user/address/delete"), //删除地址

  //收藏
  collectList: "".concat(host, "/user/collect/page"), //收藏列表
  addCollect: "".concat(host, "/user/collect/add"), //收藏
  cancelCollect: "".concat(host, "/user/collect/cancel") //取消收藏
};

module.exports = config;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 353:
/*!*****************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/home_icon.png ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/img/home_icon.d7576c35.png";

/***/ }),

/***/ 354:
/*!*******************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/mini_icon_2.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 355:
/*!*******************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/mini_icon_1.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdQAAAAICAYAAABArA6MAAAAAXNSR0IArs4c6QAAA6FJREFUaAXtl8FqJDcQhlWlbnvMOoQcDJsXc0hyDuSJQkLOYVn8JnmSgGF9mUmmp6WqfKX2xHvYU7wGL1SDRiWVVKX5p6lvVEo+qUAqkAqkAqlAKpAKvCYFfv393XfRXtOZ8iypQCqQCnxKgaxXn1LleXP6vO25+6zAAKmXPwotoXpWJftUIBV4jQp8XK9++e3dD6/xjF/imcTd5e7uTm9ubuT+/l6vr69lv9/r8XjUdV318vJbWddFe19pTc2i7XS36/TRLkbvl6YXNuvptFSfZ53dtEmpk7u6V+yGXdWnqtJa7fh4iFmq9FYdWwq29Fp6raV6wJ5xqWalnm03n0rR4dNi2LUaG2Id3yV8tZClsEfEI311enGZIr4X5ra4E0GqeZljPuJbGfZUpLC+TC4yFWISmz7WyFyKz7H/bNOTs+xoV/gIxQxfghg//vzT9+9jnE8qkAqkAq9FgTNMqZdR96JeUdKKMaYE+kq9O4GFRjlrRXx1L13UG7V1LQCADdjhK4y9F5Vz3wDK2GdilH/pRG5UxU6ORvyYayRjHOtKHzZ5XKwTf8yPfKLkwM8a6jQ5Yq2PsZiZ4IcQHZNzAwDWUHSt1m3NlkM2H0ThJMPmHBysGxDoDZs4w1ZVW3U1OVVTPdki1WTRYYdPtRJ7sr/rP6bTZHWebfnrBLYubJqubFlq//DhzzVgUB4eHgJQcjgcRr/B9GttbSHWIk8w3antmu4+AqlddIAZeUs9zUVnYBrjDabTsNGyIn9tU9GpNVSDgsAVQAPTR7ACqYBiwNSAqnZVUPUfTAOW6qpeRMVtsgDtAFsfkJQBWUHXR5jiQ2jGVvkRacY69qLggK85MAWy4qwT4PkITgOeMuLEy7Y1oMxvNQPfAWViAOqA+fBvsCVoPqlAKpAKfIkKAKs9dW1PjdtAWoAfEKWurlYCjgAsQKgKYI0SLqvH/AbKzuWjgayAZ+NCAxS29TZiSONSBBiBHf4AbEBZyDGgKswHfKEEn9isBrjWKbJcvwKYkfsJnrVT/wdcuXn1rgwDqs49zToVfAItQBOaACK+EvkcYHKM2b0HVlYgKafV5gu2V7WlFtOjAbKA8s6+Ap6HK+C5vwKYl3Y8Lh7gfCMHewNMYaa/ffuN3d7e8kfg6UkKPGnxLOv8r28Eydvps7TMzalAKvCyCmS9ell9M/pnUCBe0vGifoZYGSIVSAVSgZdUIOvVS6qbsVOBVCAVSAVSgVTgfyvwL+cxUwtPNnnnAAAAAElFTkSuQmCC"

/***/ }),

/***/ 356:
/*!********************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/power_icon_1.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 357:
/*!********************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/power_icon_2.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 358:
/*!********************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/power_icon_3.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 359:
/*!********************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/power_icon_4.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 360:
/*!********************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/power_icon_5.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 361:
/*!********************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pageMember/imgs/power_icon_6.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 4:
/*!**********************************************!*\
  !*** F:/code/utravel_s/utravel_s/pages.json ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-23720191024001","_inBundle":false,"_integrity":"sha512-vJEk493Vdb8KueNzR2otzDi23rfyRcQBo/t1R41MwNGPk+AUB94gh10+HVLo98DRcvMzkuVofz3KXTAfEx24iw==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-23720191024001.tgz","_shasum":"18272814446a9bc6053bc92666ec7064a1767588","_spec":"@dcloudio/uni-stat@next","_where":"/Users/fxy/Documents/DCloud/HbuilderX-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"a725c04ef762e5df78a9a69d140c2666e0de05fc","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-23720191024001"};

/***/ }),

/***/ 7:
/*!***************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pages.json?{"type":"style"} ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/home/home": { "navigationBarTitleText": "首页" }, "pages/outdoorsPro/outdoorsPro": { "navigationBarTitleText": "户外" }, "pages/selfPro/selfPro": { "navigationBarTitleText": "茶咖" }, "pages/mine/mine": { "navigationBarTitleText": "茶咖" }, "pages/lineDetail/lineDetail": { "navigationBarTitleText": "线路详情" }, "pages/selectBatch/selectBatch": { "navigationBarTitleText": "选择班期/人数" }, "pages/selfPro/selectStore": { "navigationBarTitleText": "选择门店" }, "pages/outdoorsPro/outProDetail": { "navigationBarTitleText": "产品详情" }, "pages/selfPro/sureOrder": { "navigationBarTitleText": "确认订单" }, "pages/selfPro/orderRemarks": { "navigationBarTitleText": "订单备注" }, "pages/selfPro/selfOrderDetail": { "navigationBarTitleText": "订单详情" }, "pages/lineList/lineList": { "navigationBarTitleText": "全部线路" }, "pages/writeOrder/writeOrder": { "navigationBarTitleText": "填写订单" }, "pages/utravelServiceProtocol/utravelServiceProtocol": { "navigationBarTitleText": "优旅家平台服务协议" }, "pages/succurityNotice/succurityNotice": { "navigationBarTitleText": "旅游安全须知" }, "pages/selectTraveler/selectTraveler": { "navigationBarTitleText": "选择出行人" }, "pages/optTraveler/optTraveler": { "navigationBarTitleText": "出行人" }, "pages/discountsCoupon/discountsCoupon": { "navigationBarTitleText": "优惠券" }, "pages/applyInvoice/applyInvoice": { "navigationBarTitleText": "发票申请" }, "pages/addressList/addressList": { "navigationBarTitleText": "地址管理" }, "pages/optAddress/optAddress": { "navigationBarTitleText": "收货地址" }, "pages/lineOrderDetail/lineOrderDetail": { "navigationBarTitleText": "订单详情" }, "pages/collectList/collectList": { "navigationBarTitleText": "我的收藏" }, "pages/myOrders/myOrders": { "navigationBarTitleText": "我的订单" }, "pages/mineWallet/mineWallet": { "navigationBarTitleText": "我的钱包" }, "pages/mineWallet/getMoneyRecord": { "navigationBarTitleText": "提现记录" }, "pages/personalInfo/personalInfo": { "navigationBarTitleText": "个人资料" }, "pages/personalInfo/editPersonnalInfo": { "navigationBarTitleText": "编辑资料" }, "pages/personalInfo/editTel": { "navigationBarTitleText": "修改号码" }, "pages/applyPartner/applyPartner": { "navigationBarTitleText": "申请合伙人" }, "pages/applyPartner/partnerProtocal": { "navigationBarTitleText": "合伙人协议" }, "pages/integralList/integralList": { "navigationBarTitleText": "排名" }, "pages/outdoorsPro/outProList": { "navigationBarTitleText": "全部产品" }, "pages/outdoorsPro/sureProOrder": { "navigationBarTitleText": "确定订单" }, "pages/outdoorsPro/orderRemarks": { "navigationBarTitleText": "订单备注" }, "pages/commentList/commentList": { "navigationBarTitleText": "点评" }, "pages/writeComment/writeComment": { "navigationBarTitleText": "评价" }, "pages/outProOrderDetail/outProOrderDetail": { "navigationBarTitleText": "订单详情" }, "pages/outProOrderDetail/orderFlowInfo": { "navigationBarTitleText": "物流信息" }, "pageMember/utravelMember/utravelMember": { "navigationBarTitleText": "超级会员" } }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "优旅家严选", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8", "navigationStyle": "custom" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!**************************************************************!*\
  !*** F:/code/utravel_s/utravel_s/pages.json?{"type":"stat"} ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__CCEF42A" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map