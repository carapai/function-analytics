(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("function-analytics", [], factory);
	else if(typeof exports === 'object')
		exports["function-analytics"] = factory();
	else
		root["function-analytics"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/progress-promise/index.js":
/*!************************************************!*\
  !*** ./node_modules/progress-promise/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Fallback for engines that don't support Symbol
const LISTENERS = Symbol ? Symbol() : '__listeners';

class ProgressPromise extends Promise {
  constructor(executor) {
    super((resolve, reject) => executor(resolve, reject,
      // Pass method for passing progress to listener
      value => {
        try {
          return this[LISTENERS].forEach(listener => listener(value));
        } catch(error) {
          reject(error);
        }
      }));
    this[LISTENERS] = [];
  }
  progress(handler) {
    if(typeof handler !== 'function')
      throw new Error('PROGRESS_REQUIRES_FUNCTION');
    this[LISTENERS].push(handler);
    return this;
  }
  static all(promises) {
    const results = new Array(promises.length);
    const length = promises.length;
    let resolveCount = 0;
    return new ProgressPromise((resolve, reject, progress) => {
      promises.forEach((promise, index) => {
        promise.then(result => {
          results[index] = result;
          results.proportion = ++resolveCount / length;
          progress(results);
          if(resolveCount === length) resolve(results);
        }).catch(reject);
      });
    });
  }
  static sequence(inputs, handler) {
    const results = [];
    const length = inputs.length;
    let resolveCount = 0;
    return new ProgressPromise((resolve, reject, progress) => {
      function invokeNext() {
        handler.call(null, inputs[results.length])
          .then(result => {
            results.push(result);
            results.proportion = ++resolveCount / length;
            progress(results);
            if(results.length === length) resolve(results);
            else invokeNext();
          }).catch(reject);;
      }
      invokeNext();
    });
  }
}

module.exports = ProgressPromise;



/***/ }),

/***/ "./src/core/fetcher.js":
/*!*****************************!*\
  !*** ./src/core/fetcher.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fetcher = void 0;

var _runner = __webpack_require__(/*! ./runner */ "./src/core/runner.js");

var _processor = __webpack_require__(/*! ./processor */ "./src/core/processor.js");

var _progressPromise = _interopRequireDefault(__webpack_require__(/*! progress-promise */ "./node_modules/progress-promise/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Represents the fetcher process
 *@extends Processor
 */
var Fetcher =
/*#__PURE__*/
function (_Processor) {
  _inherits(Fetcher, _Processor);

  /**
   * Creates a fethcer
   * @constructor
   */
  function Fetcher() {
    var _this;

    _classCallCheck(this, Fetcher);

    _this = _possibleConstructorReturn(this, (Fetcher.__proto__ || Object.getPrototypeOf(Fetcher)).call(this));
    _this.parameters = {};
    return _this;
  }
  /**
   * Gets the URL Parameters
   * @returns {string}
   * @private
   */


  _createClass(Fetcher, [{
    key: "get",

    /**
     * Gets the running process started
     * @returns {ProgressPromise}
     */
    value: function get() {
      return new _runner.Runner().getResults(this);
    }
    /**
     * Set paremeters
     * @param {Object} parameters
     * @returns {Fetcher}
     */

  }, {
    key: "setParameters",
    value: function setParameters(parameters) {
      var _this2 = this;

      Object.keys(parameters).forEach(function (key) {
        _this2.parameters[key] = parameters[key];
      });
      return this;
    }
    /**
     * Get Dependency results
     * @returns {ProgressPromise}
     */

  }, {
    key: "getDependecyFetchResults",
    value: function getDependecyFetchResults() {
      var promises = this.dependencies.map(function (dependency) {
        return new _runner.Runner().getResults(dependency.processor);
      });
      return _progressPromise.default.all(promises);
    }
  }, {
    key: "_encode64",
    value: function _encode64(buff) {
      return btoa(new Uint8Array(buff).reduce(function (s, b) {
        return s + String.fromCharCode(b);
      }, ''));
    }
  }, {
    key: "hash",
    value: function hash() {
      return this.url;
    }
  }, {
    key: "_urlParameters",
    get: function get() {
      var _this3 = this;

      var url = '';
      Object.keys(this.parameters).forEach(function (key) {
        if (url !== '') {
          url += '&';
        }

        if (typeof _this3.parameters[key] === 'string') {
          url += key + '=' + _this3.parameters[key];
        } else {
          Object.keys(_this3.parameters[key]).forEach(function (key2) {
            if (url !== '') {
              url += '&';
            }

            if (_this3.parameters[key][key2] === '') {
              url += key + '=' + key2;
            } else {
              url += key + '=' + key2 + ':' + _this3.parameters[key][key2];
            }
          });
        }
      });
      return url;
    }
    /**
     * Gets the url
     * @throws Implementation Error
     */

  }, {
    key: "url",
    get: function get() {
      throw new Error('Should implement url generation');
    }
  }]);

  return Fetcher;
}(_processor.Processor);

exports.Fetcher = Fetcher;

/***/ }),

/***/ "./src/core/identifiable-object.js":
/*!*****************************************!*\
  !*** ./src/core/identifiable-object.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IdentifiableObject = void 0;

var _fetcher = __webpack_require__(/*! ../core/fetcher */ "./src/core/fetcher.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IdentifiableObject =
/*#__PURE__*/
function (_Fetcher) {
  _inherits(IdentifiableObject, _Fetcher);

  function IdentifiableObject() {
    var _this;

    _classCallCheck(this, IdentifiableObject);

    _this = _possibleConstructorReturn(this, (IdentifiableObject.__proto__ || Object.getPrototypeOf(IdentifiableObject)).call(this));
    _this._filters = [];
    return _this;
  }

  _createClass(IdentifiableObject, [{
    key: "where",
    value: function where(right, operator, left) {
      this._filters.push({
        right: right,
        operator: operator,
        left: left
      });

      return this;
    }
  }, {
    key: "name",
    get: function get() {
      throw Error('Object name not implemented');
    }
  }, {
    key: "url",
    get: function get() {
      var url = this._urlParameters;

      this._filters.forEach(function (filter) {
        if (url !== '') {
          url += '&';
        }

        url += 'filter=' + filter.right;

        if (filter.operator === '==') {
          url += ':eq:' + filter.left;
        } else if (filter.operator === '<') {
          url += ':lt:' + filter.left;
        } else if (filter.operator === '<=') {
          url += ':le:' + filter.left;
        } else if (filter.operator === '>') {
          url += ':gt:' + filter.left;
        } else if (filter.operator === '>=') {
          url += ':ge:' + filter.left;
        } else if (filter.operator === '<>') {
          url += ':!eq:' + filter.left;
        } else if (filter.operator === 'in' || filter.operator === '!in') {
          url += ':' + filter.operator + ':[' + filter.left + ']';
        } else if (!filter.left) {
          url += ':' + filter.operator;
        } else {
          url += ':' + filter.operator + ':' + filter.left;
        }
      });

      console.log(this.name + '.json?' + url);
      return this.name + '.json?' + url;
    }
  }]);

  return IdentifiableObject;
}(_fetcher.Fetcher);

exports.IdentifiableObject = IdentifiableObject;

/***/ }),

/***/ "./src/core/multi-fetcher.js":
/*!***********************************!*\
  !*** ./src/core/multi-fetcher.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiFetcher = void 0;

var _runner = __webpack_require__(/*! ./runner */ "./src/core/runner.js");

var _fetcher = __webpack_require__(/*! ./fetcher */ "./src/core/fetcher.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MultiFetcher =
/*#__PURE__*/
function (_Fetcher) {
  _inherits(MultiFetcher, _Fetcher);

  function MultiFetcher(fetchers) {
    var _this;

    _classCallCheck(this, MultiFetcher);

    _this = _possibleConstructorReturn(this, (MultiFetcher.__proto__ || Object.getPrototypeOf(MultiFetcher)).call(this));
    _this._fetchers = fetchers;
    return _this;
  }

  _createClass(MultiFetcher, [{
    key: "get",
    value: function get() {
      return new _runner.Runner().getAllResults(this);
    }
  }, {
    key: "fetchers",
    get: function get() {
      return this._fetchers;
    }
  }]);

  return MultiFetcher;
}(_fetcher.Fetcher);

exports.MultiFetcher = MultiFetcher;

/***/ }),

/***/ "./src/core/processor.js":
/*!*******************************!*\
  !*** ./src/core/processor.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Processor = exports.Dependency = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This callback type is called `processCallback`.
 *
 * @callback processCallback
 * @param {Object} result
 */

/**
 * Represents a process dependency
 */
var Dependency =
/**
 * Creates a dependency instance
 * @param {Processor} processor
 * @param {processCallback} process
 */
function Dependency(processor, process) {
  _classCallCheck(this, Dependency);

  this.processor = processor;
  this.process = process;
};
/**
 * This is the representation of the processor
 */


exports.Dependency = Dependency;

var Processor =
/*#__PURE__*/
function () {
  /**
   * Creates a processor
   */
  function Processor() {
    _classCallCheck(this, Processor);

    this.postProcessors = [];
    this.dependencies = [];
  }
  /**
   * Checks if processor has dependencies
   * @returns {boolean}
   */


  _createClass(Processor, [{
    key: "hasDependencies",
    value: function hasDependencies() {
      return this.dependencies.length > 0;
    }
    /**
     * Adds dependency to the processor
     * @param {Dependency} dependency
     * @returns {Processor}
     */

  }, {
    key: "preProcess",
    value: function preProcess(dependency) {
      this.dependencies.push(dependency);
      return this;
    }
    /**
     * Adds callback process the output process
     * @param callback
     * @returns {Processor}
     */

  }, {
    key: "postProcess",
    value: function postProcess(callback) {
      this.postProcessors.push(callback);
      return this;
    }
    /**
     * Performs pre process
     * @returns {Processor}
     */

  }, {
    key: "performPreProcess",
    value: function performPreProcess() {
      var _this = this;

      this.dependencies.forEach(function (dependency) {
        dependency.process(dependency.processor._results, _this);
      });
      return this;
    }
    /**
     * Performs post process after the process has ended
     * @param {Object} data
     * @returns {Object}
     */

  }, {
    key: "performPostProcess",
    value: function performPostProcess(data) {
      this._results = data;
      var dataToProcess = data;
      this.postProcessors.forEach(function (callback) {
        dataToProcess = callback(dataToProcess);
      });
      return dataToProcess;
    }
  }]);

  return Processor;
}();

exports.Processor = Processor;

/***/ }),

/***/ "./src/core/runner.js":
/*!****************************!*\
  !*** ./src/core/runner.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Runner = void 0;

var _progressPromise = _interopRequireDefault(__webpack_require__(/*! progress-promise */ "./node_modules/progress-promise/index.js"));

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _http = _interopRequireDefault(__webpack_require__(/*! axios/lib/adapters/http */ "./node_modules/axios/lib/adapters/xhr.js"));

var _xhr = _interopRequireDefault(__webpack_require__(/*! axios/lib/adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _instance;
/**
 * Runner represents the process which will schedule and run operations of the processes
 */


var Runner =
/*#__PURE__*/
function () {
  function Runner() {
    _classCallCheck(this, Runner);
  }

  _createClass(Runner, [{
    key: "_fetch",

    /**
     * This callback type is called `resolveCallback`.
     *
     * @callback resolveCallback
     * @param {Object} responseResult
     */

    /**
     * This callback type is called `rejectCallback`.
     *
     * @callback rejectCallback
     * @param {Error} error
     */

    /**
     * Fetches the data from the fetcher
     * @param {Fetcher} fetcher
     * @param {resolveCallback} resolve
     * @param {rejectCallback} reject
     * @private
     */
    value: function _fetch(fetcher, resolve, reject) {
      if (!_instance) {
        var error = 'Configration not set please configre function ' + 'analytics eg {baseUrl:"dhis_base_url", username:"username", ' + 'password:"password"}';
        throw Error(error);
      }

      var config = {
        url: _instance.config.baseUrl + fetcher.url,
        method: 'get',
        adapter: typeof process !== 'undefined' ? _http.default : _xhr.default
      };

      if (_instance.config.username && _instance.config.password) {
        config.auth = {
          username: _instance.config.username,
          password: _instance.config.password
        };
      }

      _axios.default.request(config).then(function (results) {
        resolve(fetcher.performPostProcess(results.data));
      }, function (err) {
        reject(err);
      });
    }
    /**
     * Fetches data related to a fetcher
     * @param {Fetcher} fetcher
     * @returns {ProgressPromise}
     */

  }, {
    key: "getResults",
    value: function getResults(fetcher) {
      var _this = this;

      if (fetcher._fetchers) {
        // If is a multifetcher
        return this.getAllResults(fetcher);
      }

      var hashed = fetcher.hash();

      if (!_instance.cache[hashed]) {
        _instance.cache[hashed] = new _progressPromise.default(function (resolve, reject, progress) {
          if (fetcher.hasDependencies()) {
            fetcher.getDependecyFetchResults().then(function () {
              fetcher.performPreProcess();

              _this._fetch(fetcher, resolve, reject);
            }).catch(function (err) {
              console.log('Errrrrrrrrrr:', err);
              reject();
            });
          } else {
            _this._fetch(fetcher, resolve, reject);
          }
        });
      }

      return _instance.cache[hashed];
    }
    /**
     * Fetches data for multiple fetchers
     * @param {MultiFetcher} multifetcher
     * @returns {ProgressPromise}
     */

  }, {
    key: "getAllResults",
    value: function getAllResults(multifetcher) {
      return new _progressPromise.default(function (resolve, reject, progress) {
        var promises = multifetcher.fetchers.map(function (fetcher) {
          return new Runner().getResults(fetcher);
        });
        return _progressPromise.default.all(promises).then(function (results) {
          resolve(multifetcher.performPostProcess(results));
        }).catch(function (err) {
          reject(err);
        });
      });
    }
  }, {
    key: "instance",

    /**
     * Get the Runner instance
     * @returns {Runner}
     */
    get: function get() {
      return _instance;
    }
    /**
     * Set the configuration
     * @param configurations
     */

  }, {
    key: "config",
    set: function set(configurations) {
      this.config = configurations;
    }
    /**
     * Get the configurations
     * @returns {*}
     */
    ,
    get: function get() {
      return this.config;
    }
  }], [{
    key: "initiateRunner",

    /**
     * Initiates the runner singleton instance
     * @param configurations
     */
    value: function initiateRunner(configurations) {
      if (!Runner.instance) {
        this.config = configurations;
        this.cache = {};
        _instance = this;
      }
    }
  }]);

  return Runner;
}();

exports.Runner = Runner;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/impl/analytics.js":
/*!*******************************!*\
  !*** ./src/impl/analytics.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Analytics = exports.AnalyticsObject = exports.AnalyticsHeaders = exports.AnalyticsHeader = void 0;

var _fetcher = __webpack_require__(/*! ../core/fetcher */ "./src/core/fetcher.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This represents the Analytics header
 *
 */
var AnalyticsHeader = function AnalyticsHeader() {
  _classCallCheck(this, AnalyticsHeader);
};
/**
 * This represents the Analytics Headers
 *
 * @extends Array
 */


exports.AnalyticsHeader = AnalyticsHeader;

var AnalyticsHeaders =
/*#__PURE__*/
function (_Array) {
  _inherits(AnalyticsHeaders, _Array);

  function AnalyticsHeaders(data) {
    var _ref;

    var _this;

    _classCallCheck(this, AnalyticsHeaders);

    _this = _possibleConstructorReturn(this, (_ref = AnalyticsHeaders.__proto__ || Object.getPrototypeOf(AnalyticsHeaders)).call.apply(_ref, [this].concat(_toConsumableArray(data))));
    Object.setPrototypeOf(_this, Object.create(AnalyticsHeaders.prototype));
    return _this;
  }
  /**
   * Gets the data analytics header
   *
   * @returns {AnalyticsHeader}
   */


  _createClass(AnalyticsHeaders, [{
    key: "getHeader",

    /**
     * Gets the header of a parameter
     * @param id
     * @returns {AnalyticsHeader}
     */
    value: function getHeader(id) {
      var returnHeader;
      this.forEach(function (header, index) {
        if (header.name === id) {
          returnHeader = header;
          returnHeader.index = index;
        }
      });
      return returnHeader;
    }
  }, {
    key: "dx",
    get: function get() {
      return this.getHeader('dx');
    }
    /**
     * Gets the period analytics header
     *
     * @returns {AnalyticsHeader}
     */

  }, {
    key: "pe",
    get: function get() {
      return this.getHeader('pe');
    }
    /**
     * Gets the organisation unit analytics header
     *
     * @returns {AnalyticsHeader}
     */

  }, {
    key: "ou",
    get: function get() {
      return this.getHeader('ou');
    }
    /**
     * Gets the value analytics header
     *
     * @returns {AnalyticsHeader}
     */

  }, {
    key: "value",
    get: function get() {
      return this.getHeader('value');
    }
  }]);

  return AnalyticsHeaders;
}(Array);
/**
 * This represents the Analytics Results
 *
 */


exports.AnalyticsHeaders = AnalyticsHeaders;

var AnalyticsObject =
/*#__PURE__*/
function () {
  /**
   * Creates ana Analytics Object
   *
   * @param {Object} - DHIS Analytics object
   */
  function AnalyticsObject(analyticsObject) {
    _classCallCheck(this, AnalyticsObject);

    this._data = analyticsObject;
  }
  /**
   * Gets the Analytics Headers Array
   *
   * @returns {AnalyticsHeaders}
   */


  _createClass(AnalyticsObject, [{
    key: "headers",
    get: function get() {
      return new AnalyticsHeaders(this._data.headers);
    }
    /**
     * Gets the Analytics Metadata Object
     *
     * @returns {*|metaData|{dimensions, names, dx, pe, ou, co}|{ouHierarchy, items, dimensions}}
     */

  }, {
    key: "metaData",
    get: function get() {
      return this._data.metaData;
    }
    /**
     * Gets the rows of the analytics object
     *
     * @returns {Array}
     */

  }, {
    key: "rows",
    get: function get() {
      return this._data.rows;
    }
    /**
     * Gets the Analytics height
     *
     * @returns {number}
     */

  }, {
    key: "height",
    get: function get() {
      return this._data.height;
    }
    /**
     * Gets the Analytics width
     *
     * @returns {number}
     */

  }, {
    key: "width",
    get: function get() {
      return this._data.width;
    }
  }]);

  return AnalyticsObject;
}();
/**
 * This represents the Analytics Fetcher for processing analytics calls
 *
 * @extends Fetcher
 */


exports.AnalyticsObject = AnalyticsObject;

var Analytics =
/*#__PURE__*/
function (_Fetcher) {
  _inherits(Analytics, _Fetcher);

  /**
   * Creates an analytics fethcer
   *
   * @param oldAnalytics - Whether the structure to be returned should be old or new.
   */
  function Analytics() {
    var _this2;

    var oldAnalytics = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _classCallCheck(this, Analytics);

    _this2 = _possibleConstructorReturn(this, (Analytics.__proto__ || Object.getPrototypeOf(Analytics)).call(this));
    _this2.parameters['dimension'] = {};

    _this2.postProcess(function (data) {
      return _this2.standardizeAnalytics(data, oldAnalytics);
    });

    return _this2;
  }
  /**
   * Sets the data for the fetch
   * @param dx
   * @returns {Analytics}
   */


  _createClass(Analytics, [{
    key: "setData",
    value: function setData(dx) {
      this.setDimension('dx', dx);
      return this;
    }
    /**
     * Sets the period for the fetch
     * @param pe
     * @returns {Analytics}
     */

  }, {
    key: "setPeriod",
    value: function setPeriod(pe) {
      this.setDimension('pe', pe);
      return this;
    }
    /**
     * Sets the organisation unit for the fetching of the analytics
     * @param {string} ou - Organisation unit
     * @returns {Analytics} Analytics results
     */

  }, {
    key: "setOrgUnit",
    value: function setOrgUnit(ou) {
      this.setDimension('ou', ou);
      return this;
    }
    /**
     * Sets the dimension for the fetching of the analytics
     * @param {string} dim - Dynamic Dimension identifier
     * @param {string} value - Dynamic dimension options identifiers
     * @returns {Analytics}
     */

  }, {
    key: "setDimension",
    value: function setDimension(dim, value) {
      this.parameters['dimension'][dim] = value ? value : '';
      return this;
    }
    /**
     * Standardizes the analytics object
     *
     * @param analyticsObject - The analytics object
     * @param preferNormalStructure - Whether to prefer the old or new analytics structure
     * @returns {AnalyticsObject}
     */

  }, {
    key: "standardizeAnalytics",
    value: function standardizeAnalytics(analyticsObject) {
      var preferNormalStructure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      // if Serverside Event clustering do nothing
      if (analyticsObject.count) {
        return analyticsObject;
      }

      var sanitizedAnalyticsObject = {
        headers: [],
        metaData: {
          dimensions: {},
          names: {},
          dx: [],
          pe: [],
          ou: [],
          co: []
        },
        rows: []
      };

      if (analyticsObject) {
        /**
         * Check headers
         */
        if (analyticsObject.headers) {
          analyticsObject.headers.forEach(function (header) {
            try {
              var newHeader = header;
              sanitizedAnalyticsObject.headers.push(newHeader);
            } catch (e) {
              console.warn('Invalid header object');
            }
          });
        }
        /**
         * Check metaData
         */


        if (analyticsObject.metaData) {
          try {
            var sanitizedMetadata = this.getSanitizedAnalyticsMetadata(analyticsObject.metaData, preferNormalStructure);
            sanitizedAnalyticsObject.metaData = sanitizedMetadata;
          } catch (e) {
            console.warn('Invalid metadata object');
          }
        }
        /**
         * Check rows
         */


        if (analyticsObject.rows) {
          sanitizedAnalyticsObject.rows = analyticsObject.rows;
        }
      }

      sanitizedAnalyticsObject.height = analyticsObject.height;
      sanitizedAnalyticsObject.width = analyticsObject.width;
      return new AnalyticsObject(sanitizedAnalyticsObject);
    }
    /**
     * Standardizes the analytics metadata object
     *
     * @param analyticMetadata - The analytics metadata object
     * @param preferNormalStructure - Whether to prefer the old or new analytics structure
     * @returns {Object}
     */

  }, {
    key: "getSanitizedAnalyticsMetadata",
    value: function getSanitizedAnalyticsMetadata(analyticMetadata, preferNormalStructure) {
      var sanitizedMetadata = {};

      if (analyticMetadata) {
        if (analyticMetadata.ouHierarchy) {
          sanitizedMetadata.ouHierarchy = analyticMetadata.ouHierarchy;
        }

        if (preferNormalStructure) {
          // Get old structure
          sanitizedMetadata.names = {};

          if (analyticMetadata.names) {
            sanitizedMetadata.names = analyticMetadata.names;
          } else if (analyticMetadata.items) {
            Object.keys(analyticMetadata.items).forEach(function (nameKey) {
              sanitizedMetadata.names[nameKey] = analyticMetadata.items[nameKey].name;
            });
          }

          if (analyticMetadata.dimensions) {
            Object.keys(analyticMetadata.dimensions).forEach(function (nameKey) {
              sanitizedMetadata[nameKey] = analyticMetadata.dimensions[nameKey];
            });
          }
        } else {
          // Get new structure
          sanitizedMetadata.items = {};

          if (analyticMetadata.items) {
            sanitizedMetadata.items = analyticMetadata.items;
          } else if (analyticMetadata.names) {
            Object.keys(analyticMetadata.items).forEach(function (nameKey) {
              analyticMetadata.items[nameKey] = {
                name: analyticMetadata.names[nameKey]
              };
            });
          }

          if (!analyticMetadata.dimensions) {
            sanitizedMetadata.dimensions = {};
            Object.keys(analyticMetadata).forEach(function (nameKey) {
              if (['names', 'items', 'dimensions'].indexOf(nameKey) === -1) {
                sanitizedMetadata.dimensions[nameKey] = analyticMetadata[nameKey];
              }
            });
          } else {
            sanitizedMetadata.dimensions = analyticMetadata.dimensions;
          }
        }
      }

      return sanitizedMetadata;
    }
    /**
     * Gets the url for fetching
     * @returns {string}
     */

  }, {
    key: "url",
    get: function get() {
      return 'analytics?' + this._urlParameters;
    }
  }]);

  return Analytics;
}(_fetcher.Fetcher);

exports.Analytics = Analytics;

/***/ }),

/***/ "./src/impl/event-analytics.js":
/*!*************************************!*\
  !*** ./src/impl/event-analytics.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventAnalytics = void 0;

var _analytics = __webpack_require__(/*! ./analytics */ "./src/impl/analytics.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * This represents the Event Analytics Fetcher for processing analytics calls
 *
 * @extends Fetcher
 */
var EventAnalytics =
/*#__PURE__*/
function (_Analytics) {
  _inherits(EventAnalytics, _Analytics);

  function EventAnalytics() {
    _classCallCheck(this, EventAnalytics);

    return _possibleConstructorReturn(this, (EventAnalytics.__proto__ || Object.getPrototypeOf(EventAnalytics)).apply(this, arguments));
  }

  _createClass(EventAnalytics, [{
    key: "setProgram",

    /**
     * Sets the Program for the fetch
     * @param program
     * @returns {EventAnalytics}
     */
    value: function setProgram(program) {
      this.program = program;
      return this;
    }
    /**
     * Gets the url for fetching
     * @returns {string}
     */

  }, {
    key: "url",
    get: function get() {
      return 'analytics/events/query/' + this.program + '?' + this._urlParameters;
    }
  }]);

  return EventAnalytics;
}(_analytics.Analytics);

exports.EventAnalytics = EventAnalytics;

/***/ }),

/***/ "./src/impl/organisation-unit.js":
/*!***************************************!*\
  !*** ./src/impl/organisation-unit.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrganisationUnit = void 0;

var _identifiableObject = __webpack_require__(/*! ../core/identifiable-object */ "./src/core/identifiable-object.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Represents the fetcher for the organisation unit
 *
 * @extends IdentifiableObject
 */
var OrganisationUnit =
/*#__PURE__*/
function (_IdentifiableObject) {
  _inherits(OrganisationUnit, _IdentifiableObject);

  function OrganisationUnit() {
    _classCallCheck(this, OrganisationUnit);

    return _possibleConstructorReturn(this, (OrganisationUnit.__proto__ || Object.getPrototypeOf(OrganisationUnit)).apply(this, arguments));
  }

  _createClass(OrganisationUnit, [{
    key: "name",

    /**
     * Gets the name for fetching the identifiable object
     * @returns {string}
     */
    get: function get() {
      return 'organisationUnits';
    }
  }]);

  return OrganisationUnit;
}(_identifiableObject.IdentifiableObject);

exports.OrganisationUnit = OrganisationUnit;

/***/ }),

/***/ "./src/impl/sql-view.js":
/*!******************************!*\
  !*** ./src/impl/sql-view.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SQLViewData = void 0;

var _fetcher = __webpack_require__(/*! ../core/fetcher */ "./src/core/fetcher.js");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Represents a fetcher to load sql view data
 *
 * @extends Fetcher
 */
var SQLViewData =
/*#__PURE__*/
function (_Fetcher) {
  _inherits(SQLViewData, _Fetcher);

  /**
   * Creates the SQLViewData Instance
   * @param id
   */
  function SQLViewData(id) {
    var _this;

    _classCallCheck(this, SQLViewData);

    _this = _possibleConstructorReturn(this, (SQLViewData.__proto__ || Object.getPrototypeOf(SQLViewData)).call(this));
    _this._id = id;
    return _this;
  }
  /**
   * Gets the url for fetching
   * @returns {string}
   */


  _createClass(SQLViewData, [{
    key: "url",
    get: function get() {
      var url = 'sqlViews/' + this._id + '/data.json';
      return url;
    }
  }]);

  return SQLViewData;
}(_fetcher.Fetcher);

exports.SQLViewData = SQLViewData;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Fn = void 0;

var _analytics = __webpack_require__(/*! ./impl/analytics.js */ "./src/impl/analytics.js");

var _eventAnalytics = __webpack_require__(/*! ./impl/event-analytics.js */ "./src/impl/event-analytics.js");

var _sqlView = __webpack_require__(/*! ./impl/sql-view.js */ "./src/impl/sql-view.js");

var _organisationUnit = __webpack_require__(/*! ./impl/organisation-unit.js */ "./src/impl/organisation-unit.js");

var _progressPromise = _interopRequireDefault(__webpack_require__(/*! progress-promise */ "./node_modules/progress-promise/index.js"));

var _runner = __webpack_require__(/*! ./core/runner.js */ "./src/core/runner.js");

var _processor = __webpack_require__(/*! ./core/processor */ "./src/core/processor.js");

var _multiFetcher = __webpack_require__(/*! ./core/multi-fetcher */ "./src/core/multi-fetcher.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This is the main holder for the functionalities of the function
 * @type {{Promise: ProgressPromise, Analytics: Analytics,
  *   AnalyticsObject: AnalyticsObject, AnalyticsHeaders: AnalyticsHeaders,
  *   OrganisationUnit: OrganisationUnit, SQLViewData: SQLViewData,
  *   Runner: Runner, Dependency: Dependency, MultiFetcher: MultiFetcher,
  *   all: (function(Fetcher[])), init: (function(*=))}
  * }
 */
var Fn = {
  Promise: _progressPromise.default,
  Analytics: _analytics.Analytics,
  EventAnalytics: _eventAnalytics.EventAnalytics,
  AnalyticsObject: _analytics.AnalyticsObject,
  AnalyticsHeaders: _analytics.AnalyticsHeaders,
  OrganisationUnit: _organisationUnit.OrganisationUnit,
  SQLViewData: _sqlView.SQLViewData,
  Runner: _runner.Runner,
  Dependency: _processor.Dependency,
  MultiFetcher: _multiFetcher.MultiFetcher,

  /**
   * Adds multiple fetchers in queue for execution.
   *
   * @param {Fetcher[]} fetchers - The fethers is an array of the fetchers
   * @returns {ProgressPromise} - Progress Promise for fetching the various fetchers
   * @example
   * Fn.all([new Fn.Analytics(), new Fn.OrganisationUnit()]);
   */
  all: function all(fetchers) {
    return new _multiFetcher.MultiFetcher(fetchers);
  },

  /**
   * Configures the running environment parameters
   *
   * @param {Object} configuration - The fethers is an array of the fetchers
   * @returns {ProgressPromise} - Progress Promise for fetching the various fetchers
   * @example
   * Fn.all({baseUrl:''});
   */
  init: function init(config) {
    _runner.Runner.initiateRunner(config);
  }
};
exports.Fn = Fn;

if (typeof window !== 'undefined') {
  window.Fn = Fn;
}

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3Mvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J0b2EuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29va2llcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL3V0aWxzLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9ub2RlX21vZHVsZXMvcHJvZ3Jlc3MtcHJvbWlzZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvY29yZS9mZXRjaGVyLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL3NyYy9jb3JlL2lkZW50aWZpYWJsZS1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2NvcmUvbXVsdGktZmV0Y2hlci5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvY29yZS9wcm9jZXNzb3IuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2NvcmUvcnVubmVyLmpzIiwid2VicGFjazovL2Z1bmN0aW9uLWFuYWx5dGljcy8uL3NyYy9pbXBsL2FuYWx5dGljcy5qcyIsIndlYnBhY2s6Ly9mdW5jdGlvbi1hbmFseXRpY3MvLi9zcmMvaW1wbC9ldmVudC1hbmFseXRpY3MuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2ltcGwvb3JnYW5pc2F0aW9uLXVuaXQuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2ltcGwvc3FsLXZpZXcuanMiLCJ3ZWJwYWNrOi8vZnVuY3Rpb24tYW5hbHl0aWNzLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbIkZldGNoZXIiLCJwYXJhbWV0ZXJzIiwiZ2V0UmVzdWx0cyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwicHJvbWlzZXMiLCJkZXBlbmRlbmNpZXMiLCJtYXAiLCJkZXBlbmRlbmN5IiwicHJvY2Vzc29yIiwiYWxsIiwiYnVmZiIsImJ0b2EiLCJVaW50OEFycmF5IiwicmVkdWNlIiwicyIsImIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJ1cmwiLCJrZXkyIiwiRXJyb3IiLCJJZGVudGlmaWFibGVPYmplY3QiLCJfZmlsdGVycyIsInJpZ2h0Iiwib3BlcmF0b3IiLCJsZWZ0IiwicHVzaCIsIl91cmxQYXJhbWV0ZXJzIiwiZmlsdGVyIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJNdWx0aUZldGNoZXIiLCJmZXRjaGVycyIsIl9mZXRjaGVycyIsImdldEFsbFJlc3VsdHMiLCJEZXBlbmRlbmN5IiwicHJvY2VzcyIsIlByb2Nlc3NvciIsInBvc3RQcm9jZXNzb3JzIiwibGVuZ3RoIiwiY2FsbGJhY2siLCJfcmVzdWx0cyIsImRhdGEiLCJkYXRhVG9Qcm9jZXNzIiwiX2luc3RhbmNlIiwiUnVubmVyIiwiZmV0Y2hlciIsInJlc29sdmUiLCJyZWplY3QiLCJlcnJvciIsImNvbmZpZyIsImJhc2VVcmwiLCJtZXRob2QiLCJhZGFwdGVyIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsImF1dGgiLCJyZXF1ZXN0IiwidGhlbiIsInJlc3VsdHMiLCJwZXJmb3JtUG9zdFByb2Nlc3MiLCJlcnIiLCJoYXNoZWQiLCJoYXNoIiwiY2FjaGUiLCJwcm9ncmVzcyIsImhhc0RlcGVuZGVuY2llcyIsImdldERlcGVuZGVjeUZldGNoUmVzdWx0cyIsInBlcmZvcm1QcmVQcm9jZXNzIiwiX2ZldGNoIiwiY2F0Y2giLCJtdWx0aWZldGNoZXIiLCJjb25maWd1cmF0aW9ucyIsImluc3RhbmNlIiwiQW5hbHl0aWNzSGVhZGVyIiwiQW5hbHl0aWNzSGVhZGVycyIsInNldFByb3RvdHlwZU9mIiwiY3JlYXRlIiwicHJvdG90eXBlIiwiaWQiLCJyZXR1cm5IZWFkZXIiLCJoZWFkZXIiLCJpbmRleCIsImdldEhlYWRlciIsIkFycmF5IiwiQW5hbHl0aWNzT2JqZWN0IiwiYW5hbHl0aWNzT2JqZWN0IiwiX2RhdGEiLCJoZWFkZXJzIiwibWV0YURhdGEiLCJyb3dzIiwiaGVpZ2h0Iiwid2lkdGgiLCJBbmFseXRpY3MiLCJvbGRBbmFseXRpY3MiLCJwb3N0UHJvY2VzcyIsInN0YW5kYXJkaXplQW5hbHl0aWNzIiwiZHgiLCJzZXREaW1lbnNpb24iLCJwZSIsIm91IiwiZGltIiwidmFsdWUiLCJwcmVmZXJOb3JtYWxTdHJ1Y3R1cmUiLCJjb3VudCIsInNhbml0aXplZEFuYWx5dGljc09iamVjdCIsImRpbWVuc2lvbnMiLCJuYW1lcyIsImNvIiwibmV3SGVhZGVyIiwiZSIsIndhcm4iLCJzYW5pdGl6ZWRNZXRhZGF0YSIsImdldFNhbml0aXplZEFuYWx5dGljc01ldGFkYXRhIiwiYW5hbHl0aWNNZXRhZGF0YSIsIm91SGllcmFyY2h5IiwiaXRlbXMiLCJuYW1lS2V5IiwiaW5kZXhPZiIsIkV2ZW50QW5hbHl0aWNzIiwicHJvZ3JhbSIsIk9yZ2FuaXNhdGlvblVuaXQiLCJTUUxWaWV3RGF0YSIsIl9pZCIsIkZuIiwiUHJvbWlzZSIsImluaXQiLCJpbml0aWF0ZVJ1bm5lciIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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O0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzlTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx6QjtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxREE7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7SUFJYUEsTzs7Ozs7QUFDWDs7OztBQUlBLHFCQUFjO0FBQUE7O0FBQUE7O0FBQ1o7QUFDQSxVQUFLQyxVQUFMLEdBQWtCLEVBQWxCO0FBRlk7QUFHYjtBQUVEOzs7Ozs7Ozs7O0FBc0NBOzs7OzBCQUlNO0FBQ0osYUFBTyxxQkFBYUMsVUFBYixDQUF3QixJQUF4QixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7a0NBS2NELFUsRUFBWTtBQUFBOztBQUN4QkUsWUFBTSxDQUFDQyxJQUFQLENBQVlILFVBQVosRUFBd0JJLE9BQXhCLENBQWdDLFVBQUFDLEdBQUcsRUFBSTtBQUNyQyxjQUFJLENBQUNMLFVBQUwsQ0FBZ0JLLEdBQWhCLElBQXVCTCxVQUFVLENBQUNLLEdBQUQsQ0FBakM7QUFDRCxPQUZEO0FBR0EsYUFBTyxJQUFQO0FBQ0Q7QUFFRDs7Ozs7OzsrQ0FJMkI7QUFDekIsVUFBTUMsUUFBUSxHQUFHLEtBQUtDLFlBQUwsQ0FBa0JDLEdBQWxCLENBQXNCLFVBQUFDLFVBQVUsRUFBSTtBQUNuRCxlQUFPLHFCQUFhUixVQUFiLENBQXdCUSxVQUFVLENBQUNDLFNBQW5DLENBQVA7QUFDRCxPQUZnQixDQUFqQjtBQUlBLGFBQU8seUJBQWdCQyxHQUFoQixDQUFvQkwsUUFBcEIsQ0FBUDtBQUNEOzs7OEJBQ1NNLEksRUFBTTtBQUNkLGFBQU9DLElBQUksQ0FBQyxJQUFJQyxVQUFKLENBQWVGLElBQWYsRUFBcUJHLE1BQXJCLENBQTRCLFVBQUNDLENBQUQsRUFBSUMsQ0FBSjtBQUFBLGVBQVVELENBQUMsR0FBR0UsTUFBTSxDQUFDQyxZQUFQLENBQW9CRixDQUFwQixDQUFkO0FBQUEsT0FBNUIsRUFBa0UsRUFBbEUsQ0FBRCxDQUFYO0FBQ0Q7OzsyQkFDTTtBQUNMLGFBQU8sS0FBS0csR0FBWjtBQUNEOzs7d0JBckVvQjtBQUFBOztBQUNuQixVQUFJQSxHQUFHLEdBQUcsRUFBVjtBQUVBbEIsWUFBTSxDQUFDQyxJQUFQLENBQVksS0FBS0gsVUFBakIsRUFBNkJJLE9BQTdCLENBQXFDLFVBQUFDLEdBQUcsRUFBSTtBQUMxQyxZQUFJZSxHQUFHLEtBQUssRUFBWixFQUFnQjtBQUNkQSxhQUFHLElBQUksR0FBUDtBQUNEOztBQUNELFlBQUksT0FBTyxNQUFJLENBQUNwQixVQUFMLENBQWdCSyxHQUFoQixDQUFQLEtBQWdDLFFBQXBDLEVBQThDO0FBQzVDZSxhQUFHLElBQUlmLEdBQUcsR0FBRyxHQUFOLEdBQVksTUFBSSxDQUFDTCxVQUFMLENBQWdCSyxHQUFoQixDQUFuQjtBQUNELFNBRkQsTUFFTztBQUNMSCxnQkFBTSxDQUFDQyxJQUFQLENBQVksTUFBSSxDQUFDSCxVQUFMLENBQWdCSyxHQUFoQixDQUFaLEVBQWtDRCxPQUFsQyxDQUEwQyxVQUFBaUIsSUFBSSxFQUFJO0FBQ2hELGdCQUFJRCxHQUFHLEtBQUssRUFBWixFQUFnQjtBQUNkQSxpQkFBRyxJQUFJLEdBQVA7QUFDRDs7QUFDRCxnQkFBSSxNQUFJLENBQUNwQixVQUFMLENBQWdCSyxHQUFoQixFQUFxQmdCLElBQXJCLE1BQStCLEVBQW5DLEVBQXVDO0FBQ3JDRCxpQkFBRyxJQUFJZixHQUFHLEdBQUcsR0FBTixHQUFZZ0IsSUFBbkI7QUFDRCxhQUZELE1BRU87QUFDTEQsaUJBQUcsSUFBSWYsR0FBRyxHQUFHLEdBQU4sR0FBWWdCLElBQVosR0FBbUIsR0FBbkIsR0FBeUIsTUFBSSxDQUFDckIsVUFBTCxDQUFnQkssR0FBaEIsRUFBcUJnQixJQUFyQixDQUFoQztBQUNEO0FBQ0YsV0FURDtBQVVEO0FBQ0YsT0FsQkQ7QUFtQkEsYUFBT0QsR0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7d0JBSVU7QUFDUixZQUFNLElBQUlFLEtBQUosQ0FBVSxpQ0FBVixDQUFOO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0REg7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQyxrQjs7Ozs7QUFDWCxnQ0FBYztBQUFBOztBQUFBOztBQUNaO0FBQ0EsVUFBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUZZO0FBR2I7Ozs7MEJBSUtDLEssRUFBT0MsUSxFQUFVQyxJLEVBQU07QUFDM0IsV0FBS0gsUUFBTCxDQUFjSSxJQUFkLENBQW1CO0FBQ2pCSCxhQUFLLEVBQUVBLEtBRFU7QUFFakJDLGdCQUFRLEVBQUVBLFFBRk87QUFHakJDLFlBQUksRUFBRUE7QUFIVyxPQUFuQjs7QUFLQSxhQUFPLElBQVA7QUFDRDs7O3dCQVZVO0FBQ1QsWUFBTUwsS0FBSyxDQUFDLDZCQUFELENBQVg7QUFDRDs7O3dCQVVTO0FBQ1IsVUFBSUYsR0FBRyxHQUFHLEtBQUtTLGNBQWY7O0FBRUEsV0FBS0wsUUFBTCxDQUFjcEIsT0FBZCxDQUFzQixVQUFDMEIsTUFBRCxFQUFZO0FBQ2hDLFlBQUlWLEdBQUcsS0FBSyxFQUFaLEVBQWdCO0FBQ2RBLGFBQUcsSUFBSSxHQUFQO0FBQ0Q7O0FBQ0RBLFdBQUcsSUFBSSxZQUFZVSxNQUFNLENBQUNMLEtBQTFCOztBQUNBLFlBQUlLLE1BQU0sQ0FBQ0osUUFBUCxLQUFvQixJQUF4QixFQUE4QjtBQUM1Qk4sYUFBRyxJQUFJLFNBQVNVLE1BQU0sQ0FBQ0gsSUFBdkI7QUFDRCxTQUZELE1BRU8sSUFBSUcsTUFBTSxDQUFDSixRQUFQLEtBQW9CLEdBQXhCLEVBQTZCO0FBQ2xDTixhQUFHLElBQUksU0FBU1UsTUFBTSxDQUFDSCxJQUF2QjtBQUNELFNBRk0sTUFFQSxJQUFJRyxNQUFNLENBQUNKLFFBQVAsS0FBb0IsSUFBeEIsRUFBOEI7QUFDbkNOLGFBQUcsSUFBSSxTQUFTVSxNQUFNLENBQUNILElBQXZCO0FBQ0QsU0FGTSxNQUVBLElBQUlHLE1BQU0sQ0FBQ0osUUFBUCxLQUFvQixHQUF4QixFQUE2QjtBQUNsQ04sYUFBRyxJQUFJLFNBQVNVLE1BQU0sQ0FBQ0gsSUFBdkI7QUFDRCxTQUZNLE1BRUEsSUFBSUcsTUFBTSxDQUFDSixRQUFQLEtBQW9CLElBQXhCLEVBQThCO0FBQ25DTixhQUFHLElBQUksU0FBU1UsTUFBTSxDQUFDSCxJQUF2QjtBQUNELFNBRk0sTUFFQSxJQUFJRyxNQUFNLENBQUNKLFFBQVAsS0FBb0IsSUFBeEIsRUFBOEI7QUFDbkNOLGFBQUcsSUFBSSxVQUFVVSxNQUFNLENBQUNILElBQXhCO0FBQ0QsU0FGTSxNQUVBLElBQUlHLE1BQU0sQ0FBQ0osUUFBUCxLQUFvQixJQUFwQixJQUE0QkksTUFBTSxDQUFDSixRQUFQLEtBQW9CLEtBQXBELEVBQTJEO0FBQ2hFTixhQUFHLElBQUksTUFBTVUsTUFBTSxDQUFDSixRQUFiLEdBQXdCLElBQXhCLEdBQStCSSxNQUFNLENBQUNILElBQXRDLEdBQTZDLEdBQXBEO0FBQ0QsU0FGTSxNQUVBLElBQUksQ0FBQ0csTUFBTSxDQUFDSCxJQUFaLEVBQWtCO0FBQ3ZCUCxhQUFHLElBQUksTUFBTVUsTUFBTSxDQUFDSixRQUFwQjtBQUNELFNBRk0sTUFFQTtBQUNMTixhQUFHLElBQUksTUFBTVUsTUFBTSxDQUFDSixRQUFiLEdBQXdCLEdBQXhCLEdBQThCSSxNQUFNLENBQUNILElBQTVDO0FBQ0Q7QUFDRixPQXhCRDs7QUF5QkFJLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQUtDLElBQUwsR0FBWSxRQUFaLEdBQXVCYixHQUFuQztBQUNBLGFBQU8sS0FBS2EsSUFBTCxHQUFZLFFBQVosR0FBdUJiLEdBQTlCO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqREg7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVhYyxZOzs7OztBQUNYLHdCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUE7O0FBQ3BCO0FBQ0EsVUFBS0MsU0FBTCxHQUFpQkQsUUFBakI7QUFGb0I7QUFHckI7Ozs7MEJBS0s7QUFDSixhQUFRLG9CQUFELENBQWVFLGFBQWYsQ0FBNkIsSUFBN0IsQ0FBUDtBQUNEOzs7d0JBTmM7QUFDYixhQUFPLEtBQUtELFNBQVo7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZIOzs7Ozs7O0FBT0E7OztJQUdhRSxVO0FBQ1g7Ozs7O0FBS0Esb0JBQVk1QixTQUFaLEVBQXVCNkIsT0FBdkIsRUFBZ0M7QUFBQTs7QUFDOUIsT0FBSzdCLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsT0FBSzZCLE9BQUwsR0FBZUEsT0FBZjtBQUNELEM7QUFHSDs7Ozs7OztJQUdhQyxTOzs7QUFDWDs7O0FBR0EsdUJBQWM7QUFBQTs7QUFDWixTQUFLQyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0EsU0FBS2xDLFlBQUwsR0FBb0IsRUFBcEI7QUFDRDtBQUVEOzs7Ozs7OztzQ0FJa0I7QUFDaEIsYUFBTyxLQUFLQSxZQUFMLENBQWtCbUMsTUFBbEIsR0FBMkIsQ0FBbEM7QUFDRDtBQUVEOzs7Ozs7OzsrQkFLV2pDLFUsRUFBWTtBQUNyQixXQUFLRixZQUFMLENBQWtCcUIsSUFBbEIsQ0FBdUJuQixVQUF2QjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7O2dDQUtZa0MsUSxFQUFVO0FBQ3BCLFdBQUtGLGNBQUwsQ0FBb0JiLElBQXBCLENBQXlCZSxRQUF6QjtBQUNBLGFBQU8sSUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7d0NBSW9CO0FBQUE7O0FBQ2xCLFdBQUtwQyxZQUFMLENBQWtCSCxPQUFsQixDQUEwQixVQUFDSyxVQUFELEVBQWdCO0FBQ3hDQSxrQkFBVSxDQUFDOEIsT0FBWCxDQUFtQjlCLFVBQVUsQ0FBQ0MsU0FBWCxDQUFxQmtDLFFBQXhDLEVBQWtELEtBQWxEO0FBQ0QsT0FGRDtBQUdBLGFBQU8sSUFBUDtBQUNEO0FBRUQ7Ozs7Ozs7O3VDQUttQkMsSSxFQUFNO0FBQ3ZCLFdBQUtELFFBQUwsR0FBZ0JDLElBQWhCO0FBQ0EsVUFBSUMsYUFBYSxHQUFHRCxJQUFwQjtBQUVBLFdBQUtKLGNBQUwsQ0FBb0JyQyxPQUFwQixDQUE0QixVQUFDdUMsUUFBRCxFQUFjO0FBQ3hDRyxxQkFBYSxHQUFHSCxRQUFRLENBQUNHLGFBQUQsQ0FBeEI7QUFDRCxPQUZEO0FBR0EsYUFBT0EsYUFBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZIOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBQ0EsSUFBSUMsU0FBSjtBQUVBOzs7OztJQUdhQyxNOzs7Ozs7Ozs7O0FBcUNYOzs7Ozs7O0FBT0E7Ozs7Ozs7QUFPQTs7Ozs7OzsyQkFPT0MsTyxFQUFTQyxPLEVBQVNDLE0sRUFBUTtBQUMvQixVQUFJLENBQUNKLFNBQUwsRUFBZ0I7QUFDZCxZQUFJSyxLQUFLLEdBQUcsbURBQ1YsOERBRFUsR0FFVixzQkFGRjtBQUlBLGNBQU05QixLQUFLLENBQUM4QixLQUFELENBQVg7QUFDRDs7QUFDRCxVQUFNQyxNQUFNLEdBQUc7QUFDYmpDLFdBQUcsRUFBRTJCLFNBQVMsQ0FBQ00sTUFBVixDQUFpQkMsT0FBakIsR0FBMkJMLE9BQU8sQ0FBQzdCLEdBRDNCO0FBRWJtQyxjQUFNLEVBQUUsS0FGSztBQUdiQyxlQUFPLEVBQUUsT0FBT2pCLE9BQVAsS0FBbUIsV0FBbkI7QUFISSxPQUFmOztBQU1BLFVBQUlRLFNBQVMsQ0FBQ00sTUFBVixDQUFpQkksUUFBakIsSUFBNkJWLFNBQVMsQ0FBQ00sTUFBVixDQUFpQkssUUFBbEQsRUFBNEQ7QUFDMURMLGNBQU0sQ0FBQ00sSUFBUCxHQUFjO0FBQ1pGLGtCQUFRLEVBQUVWLFNBQVMsQ0FBQ00sTUFBVixDQUFpQkksUUFEZjtBQUVaQyxrQkFBUSxFQUFFWCxTQUFTLENBQUNNLE1BQVYsQ0FBaUJLO0FBRmYsU0FBZDtBQUlEOztBQUNELHFCQUFNRSxPQUFOLENBQWNQLE1BQWQsRUFBc0JRLElBQXRCLENBQTJCLFVBQUNDLE9BQUQsRUFBYTtBQUN0Q1osZUFBTyxDQUFDRCxPQUFPLENBQUNjLGtCQUFSLENBQTJCRCxPQUFPLENBQUNqQixJQUFuQyxDQUFELENBQVA7QUFDRCxPQUZELEVBRUcsVUFBQ21CLEdBQUQsRUFBUztBQUNWYixjQUFNLENBQUNhLEdBQUQsQ0FBTjtBQUNELE9BSkQ7QUFLRDtBQUVEOzs7Ozs7OzsrQkFLV2YsTyxFQUFTO0FBQUE7O0FBQ2xCLFVBQUlBLE9BQU8sQ0FBQ2IsU0FBWixFQUF1QjtBQUFFO0FBQ3ZCLGVBQU8sS0FBS0MsYUFBTCxDQUFtQlksT0FBbkIsQ0FBUDtBQUNEOztBQUNELFVBQUlnQixNQUFNLEdBQUdoQixPQUFPLENBQUNpQixJQUFSLEVBQWI7O0FBRUEsVUFBSSxDQUFDbkIsU0FBUyxDQUFDb0IsS0FBVixDQUFnQkYsTUFBaEIsQ0FBTCxFQUE4QjtBQUM1QmxCLGlCQUFTLENBQUNvQixLQUFWLENBQWdCRixNQUFoQixJQUEwQiw2QkFDeEIsVUFBQ2YsT0FBRCxFQUFVQyxNQUFWLEVBQWtCaUIsUUFBbEIsRUFBK0I7QUFDN0IsY0FBSW5CLE9BQU8sQ0FBQ29CLGVBQVIsRUFBSixFQUErQjtBQUM3QnBCLG1CQUFPLENBQ0pxQix3QkFESCxHQUVHVCxJQUZILENBRVEsWUFBTTtBQUNWWixxQkFBTyxDQUFDc0IsaUJBQVI7O0FBQ0EsbUJBQUksQ0FBQ0MsTUFBTCxDQUFZdkIsT0FBWixFQUFxQkMsT0FBckIsRUFBOEJDLE1BQTlCO0FBQ0QsYUFMSCxFQU1Hc0IsS0FOSCxDQU1TLFVBQUFULEdBQUcsRUFBSTtBQUNaakMscUJBQU8sQ0FBQ0MsR0FBUixDQUFZLGVBQVosRUFBNkJnQyxHQUE3QjtBQUNBYixvQkFBTTtBQUNQLGFBVEg7QUFVRCxXQVhELE1BV087QUFDTCxpQkFBSSxDQUFDcUIsTUFBTCxDQUFZdkIsT0FBWixFQUFxQkMsT0FBckIsRUFBOEJDLE1BQTlCO0FBQ0Q7QUFDRixTQWhCdUIsQ0FBMUI7QUFrQkQ7O0FBQ0QsYUFBT0osU0FBUyxDQUFDb0IsS0FBVixDQUFnQkYsTUFBaEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O2tDQUtjUyxZLEVBQWM7QUFDMUIsYUFBTyw2QkFBb0IsVUFBQ3hCLE9BQUQsRUFBVUMsTUFBVixFQUFrQmlCLFFBQWxCLEVBQStCO0FBQ3hELFlBQU05RCxRQUFRLEdBQUdvRSxZQUFZLENBQUN2QyxRQUFiLENBQXNCM0IsR0FBdEIsQ0FBMEIsVUFBQ3lDLE9BQUQ7QUFBQSxpQkFBYyxJQUFJRCxNQUFKLEVBQUQsQ0FBZS9DLFVBQWYsQ0FBMEJnRCxPQUExQixDQUFiO0FBQUEsU0FBMUIsQ0FBakI7QUFFQSxlQUFPLHlCQUFnQnRDLEdBQWhCLENBQW9CTCxRQUFwQixFQUE4QnVELElBQTlCLENBQW1DLFVBQUNDLE9BQUQsRUFBYTtBQUNyRFosaUJBQU8sQ0FBQ3dCLFlBQVksQ0FBQ1gsa0JBQWIsQ0FBZ0NELE9BQWhDLENBQUQsQ0FBUDtBQUNELFNBRk0sRUFFSlcsS0FGSSxDQUVFLFVBQUNULEdBQUQsRUFBUztBQUNoQmIsZ0JBQU0sQ0FBQ2EsR0FBRCxDQUFOO0FBQ0QsU0FKTSxDQUFQO0FBS0QsT0FSTSxDQUFQO0FBU0Q7Ozs7QUF6SEQ7Ozs7d0JBSWU7QUFDYixhQUFPakIsU0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7c0JBSVc0QixjLEVBQWdCO0FBQ3pCLFdBQUt0QixNQUFMLEdBQWNzQixjQUFkO0FBQ0Q7QUFFRDs7Ozs7d0JBSWE7QUFDWCxhQUFPLEtBQUt0QixNQUFaO0FBQ0Q7Ozs7QUFsQ0Q7Ozs7bUNBSXNCc0IsYyxFQUFnQjtBQUNwQyxVQUFJLENBQUMzQixNQUFNLENBQUM0QixRQUFaLEVBQXNCO0FBQ3BCLGFBQUt2QixNQUFMLEdBQWNzQixjQUFkO0FBQ0EsYUFBS1IsS0FBTCxHQUFhLEVBQWI7QUFDQXBCLGlCQUFTLEdBQUcsSUFBWjtBQUNEO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7O0lBSWE4QixlOzs7QUFDYjs7Ozs7Ozs7O0lBS2FDLGdCOzs7OztBQUNYLDRCQUFZakMsSUFBWixFQUFrQjtBQUFBOztBQUFBOztBQUFBOztBQUNoQiw4S0FBU0EsSUFBVDtBQUNBM0MsVUFBTSxDQUFDNkUsY0FBUCxRQUE0QjdFLE1BQU0sQ0FBQzhFLE1BQVAsQ0FBY0YsZ0JBQWdCLENBQUNHLFNBQS9CLENBQTVCO0FBRmdCO0FBR2pCO0FBRUQ7Ozs7Ozs7Ozs7QUFvQ0E7Ozs7OzhCQUtVQyxFLEVBQUk7QUFDWixVQUFJQyxZQUFKO0FBRUEsV0FBSy9FLE9BQUwsQ0FBYSxVQUFDZ0YsTUFBRCxFQUFTQyxLQUFULEVBQW1CO0FBQzlCLFlBQUlELE1BQU0sQ0FBQ25ELElBQVAsS0FBZ0JpRCxFQUFwQixFQUF3QjtBQUN0QkMsc0JBQVksR0FBR0MsTUFBZjtBQUNBRCxzQkFBWSxDQUFDRSxLQUFiLEdBQXFCQSxLQUFyQjtBQUNEO0FBQ0YsT0FMRDtBQU1BLGFBQU9GLFlBQVA7QUFDRDs7O3dCQTlDUTtBQUNQLGFBQU8sS0FBS0csU0FBTCxDQUFlLElBQWYsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O3dCQUtTO0FBQ1AsYUFBTyxLQUFLQSxTQUFMLENBQWUsSUFBZixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7d0JBS1M7QUFDUCxhQUFPLEtBQUtBLFNBQUwsQ0FBZSxJQUFmLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozt3QkFLWTtBQUNWLGFBQU8sS0FBS0EsU0FBTCxDQUFlLE9BQWYsQ0FBUDtBQUNEOzs7O0VBeENtQ0MsSztBQTREdEM7Ozs7Ozs7O0lBSWFDLGU7OztBQUNYOzs7OztBQUtBLDJCQUFZQyxlQUFaLEVBQTZCO0FBQUE7O0FBQzNCLFNBQUtDLEtBQUwsR0FBYUQsZUFBYjtBQUNEO0FBRUQ7Ozs7Ozs7Ozt3QkFLYztBQUNaLGFBQU8sSUFBSVgsZ0JBQUosQ0FBcUIsS0FBS1ksS0FBTCxDQUFXQyxPQUFoQyxDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7d0JBS2U7QUFDYixhQUFPLEtBQUtELEtBQUwsQ0FBV0UsUUFBbEI7QUFDRDtBQUVEOzs7Ozs7Ozt3QkFLVztBQUNULGFBQU8sS0FBS0YsS0FBTCxDQUFXRyxJQUFsQjtBQUNEO0FBRUQ7Ozs7Ozs7O3dCQUthO0FBQ1gsYUFBTyxLQUFLSCxLQUFMLENBQVdJLE1BQWxCO0FBQ0Q7QUFFRDs7Ozs7Ozs7d0JBS1k7QUFDVixhQUFPLEtBQUtKLEtBQUwsQ0FBV0ssS0FBbEI7QUFDRDs7Ozs7QUFHSDs7Ozs7Ozs7O0lBS2FDLFM7Ozs7O0FBQ1g7Ozs7O0FBS0EsdUJBQWlDO0FBQUE7O0FBQUEsUUFBckJDLFlBQXFCLHVFQUFOLElBQU07O0FBQUE7O0FBQy9CO0FBQ0EsV0FBS2pHLFVBQUwsQ0FBZ0IsV0FBaEIsSUFBK0IsRUFBL0I7O0FBQ0EsV0FBS2tHLFdBQUwsQ0FBaUIsVUFBQXJELElBQUksRUFBSTtBQUN2QixhQUFPLE9BQUtzRCxvQkFBTCxDQUEwQnRELElBQTFCLEVBQWdDb0QsWUFBaEMsQ0FBUDtBQUNELEtBRkQ7O0FBSCtCO0FBTWhDO0FBRUQ7Ozs7Ozs7Ozs0QkFLUUcsRSxFQUFJO0FBQ1YsV0FBS0MsWUFBTCxDQUFrQixJQUFsQixFQUF3QkQsRUFBeEI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs4QkFLVUUsRSxFQUFJO0FBQ1osV0FBS0QsWUFBTCxDQUFrQixJQUFsQixFQUF3QkMsRUFBeEI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUVEOzs7Ozs7OzsrQkFLV0MsRSxFQUFJO0FBQ2IsV0FBS0YsWUFBTCxDQUFrQixJQUFsQixFQUF3QkUsRUFBeEI7QUFDQSxhQUFPLElBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7aUNBTWFDLEcsRUFBS0MsSyxFQUFPO0FBQ3ZCLFdBQUt6RyxVQUFMLENBQWdCLFdBQWhCLEVBQTZCd0csR0FBN0IsSUFBb0NDLEtBQUssR0FBR0EsS0FBSCxHQUFXLEVBQXBEO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozt5Q0FPcUJoQixlLEVBQStDO0FBQUEsVUFBOUJpQixxQkFBOEIsdUVBQU4sSUFBTTs7QUFDbEU7QUFDQSxVQUFJakIsZUFBZSxDQUFDa0IsS0FBcEIsRUFBMkI7QUFDekIsZUFBT2xCLGVBQVA7QUFDRDs7QUFDRCxVQUFJbUIsd0JBQXdCLEdBQUc7QUFDN0JqQixlQUFPLEVBQUUsRUFEb0I7QUFFN0JDLGdCQUFRLEVBQUU7QUFDUmlCLG9CQUFVLEVBQUUsRUFESjtBQUVSQyxlQUFLLEVBQUUsRUFGQztBQUdSVixZQUFFLEVBQUUsRUFISTtBQUlSRSxZQUFFLEVBQUUsRUFKSTtBQUtSQyxZQUFFLEVBQUUsRUFMSTtBQU1SUSxZQUFFLEVBQUU7QUFOSSxTQUZtQjtBQVU3QmxCLFlBQUksRUFBRTtBQVZ1QixPQUEvQjs7QUFhQSxVQUFJSixlQUFKLEVBQXFCO0FBQ25COzs7QUFHQSxZQUFJQSxlQUFlLENBQUNFLE9BQXBCLEVBQTZCO0FBQzNCRix5QkFBZSxDQUFDRSxPQUFoQixDQUF3QnZGLE9BQXhCLENBQWdDLFVBQUNnRixNQUFELEVBQVk7QUFDMUMsZ0JBQUk7QUFDRixrQkFBSTRCLFNBQVMsR0FBRzVCLE1BQWhCO0FBRUF3QixzQ0FBd0IsQ0FBQ2pCLE9BQXpCLENBQWlDL0QsSUFBakMsQ0FBc0NvRixTQUF0QztBQUNELGFBSkQsQ0FJRSxPQUFPQyxDQUFQLEVBQVU7QUFDVmxGLHFCQUFPLENBQUNtRixJQUFSLENBQWEsdUJBQWI7QUFDRDtBQUNGLFdBUkQ7QUFTRDtBQUVEOzs7OztBQUdBLFlBQUl6QixlQUFlLENBQUNHLFFBQXBCLEVBQThCO0FBQzVCLGNBQUk7QUFDRixnQkFBSXVCLGlCQUFpQixHQUFHLEtBQUtDLDZCQUFMLENBQ3RCM0IsZUFBZSxDQUFDRyxRQURNLEVBRXRCYyxxQkFGc0IsQ0FBeEI7QUFLQUUsb0NBQXdCLENBQUNoQixRQUF6QixHQUFvQ3VCLGlCQUFwQztBQUNELFdBUEQsQ0FPRSxPQUFPRixDQUFQLEVBQVU7QUFDVmxGLG1CQUFPLENBQUNtRixJQUFSLENBQWEseUJBQWI7QUFDRDtBQUNGO0FBRUQ7Ozs7O0FBR0EsWUFBSXpCLGVBQWUsQ0FBQ0ksSUFBcEIsRUFBMEI7QUFDeEJlLGtDQUF3QixDQUFDZixJQUF6QixHQUFnQ0osZUFBZSxDQUFDSSxJQUFoRDtBQUNEO0FBQ0Y7O0FBQ0RlLDhCQUF3QixDQUFDZCxNQUF6QixHQUFrQ0wsZUFBZSxDQUFDSyxNQUFsRDtBQUNBYyw4QkFBd0IsQ0FBQ2IsS0FBekIsR0FBaUNOLGVBQWUsQ0FBQ00sS0FBakQ7QUFDQSxhQUFPLElBQUlQLGVBQUosQ0FBb0JvQix3QkFBcEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7a0RBTzhCUyxnQixFQUFrQlgscUIsRUFBdUI7QUFDckUsVUFBSVMsaUJBQWlCLEdBQUcsRUFBeEI7O0FBRUEsVUFBSUUsZ0JBQUosRUFBc0I7QUFDcEIsWUFBSUEsZ0JBQWdCLENBQUNDLFdBQXJCLEVBQWtDO0FBQ2hDSCwyQkFBaUIsQ0FBQ0csV0FBbEIsR0FBZ0NELGdCQUFnQixDQUFDQyxXQUFqRDtBQUNEOztBQUNELFlBQUlaLHFCQUFKLEVBQTJCO0FBQUU7QUFDM0JTLDJCQUFpQixDQUFDTCxLQUFsQixHQUEwQixFQUExQjs7QUFDQSxjQUFJTyxnQkFBZ0IsQ0FBQ1AsS0FBckIsRUFBNEI7QUFDMUJLLDZCQUFpQixDQUFDTCxLQUFsQixHQUEwQk8sZ0JBQWdCLENBQUNQLEtBQTNDO0FBQ0QsV0FGRCxNQUVPLElBQUlPLGdCQUFnQixDQUFDRSxLQUFyQixFQUE0QjtBQUNqQ3JILGtCQUFNLENBQUNDLElBQVAsQ0FBWWtILGdCQUFnQixDQUFDRSxLQUE3QixFQUFvQ25ILE9BQXBDLENBQTRDLFVBQUFvSCxPQUFPLEVBQUk7QUFDckRMLCtCQUFpQixDQUFDTCxLQUFsQixDQUF3QlUsT0FBeEIsSUFBbUNILGdCQUFnQixDQUFDRSxLQUFqQixDQUF1QkMsT0FBdkIsRUFBZ0N2RixJQUFuRTtBQUNELGFBRkQ7QUFHRDs7QUFFRCxjQUFJb0YsZ0JBQWdCLENBQUNSLFVBQXJCLEVBQWlDO0FBQy9CM0csa0JBQU0sQ0FBQ0MsSUFBUCxDQUFZa0gsZ0JBQWdCLENBQUNSLFVBQTdCLEVBQXlDekcsT0FBekMsQ0FDRSxVQUFBb0gsT0FBTyxFQUFJO0FBQ1RMLCtCQUFpQixDQUFDSyxPQUFELENBQWpCLEdBQ0VILGdCQUFnQixDQUFDUixVQUFqQixDQUE0QlcsT0FBNUIsQ0FERjtBQUVELGFBSkg7QUFNRDtBQUNGLFNBbEJELE1Ba0JPO0FBQUU7QUFDUEwsMkJBQWlCLENBQUNJLEtBQWxCLEdBQTBCLEVBQTFCOztBQUNBLGNBQUlGLGdCQUFnQixDQUFDRSxLQUFyQixFQUE0QjtBQUMxQkosNkJBQWlCLENBQUNJLEtBQWxCLEdBQTBCRixnQkFBZ0IsQ0FBQ0UsS0FBM0M7QUFDRCxXQUZELE1BRU8sSUFBSUYsZ0JBQWdCLENBQUNQLEtBQXJCLEVBQTRCO0FBQ2pDNUcsa0JBQU0sQ0FBQ0MsSUFBUCxDQUFZa0gsZ0JBQWdCLENBQUNFLEtBQTdCLEVBQW9DbkgsT0FBcEMsQ0FBNEMsVUFBQW9ILE9BQU8sRUFBSTtBQUNyREgsOEJBQWdCLENBQUNFLEtBQWpCLENBQXVCQyxPQUF2QixJQUFrQztBQUNoQ3ZGLG9CQUFJLEVBQUVvRixnQkFBZ0IsQ0FBQ1AsS0FBakIsQ0FBdUJVLE9BQXZCO0FBRDBCLGVBQWxDO0FBR0QsYUFKRDtBQUtEOztBQUVELGNBQUksQ0FBQ0gsZ0JBQWdCLENBQUNSLFVBQXRCLEVBQWtDO0FBQ2hDTSw2QkFBaUIsQ0FBQ04sVUFBbEIsR0FBK0IsRUFBL0I7QUFDQTNHLGtCQUFNLENBQUNDLElBQVAsQ0FBWWtILGdCQUFaLEVBQThCakgsT0FBOUIsQ0FBc0MsVUFBQW9ILE9BQU8sRUFBSTtBQUMvQyxrQkFBSSxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLFlBQW5CLEVBQWlDQyxPQUFqQyxDQUF5Q0QsT0FBekMsTUFBc0QsQ0FBQyxDQUEzRCxFQUE4RDtBQUM1REwsaUNBQWlCLENBQUNOLFVBQWxCLENBQTZCVyxPQUE3QixJQUF3Q0gsZ0JBQWdCLENBQUNHLE9BQUQsQ0FBeEQ7QUFDRDtBQUNGLGFBSkQ7QUFLRCxXQVBELE1BT087QUFDTEwsNkJBQWlCLENBQUNOLFVBQWxCLEdBQStCUSxnQkFBZ0IsQ0FBQ1IsVUFBaEQ7QUFDRDtBQUNGO0FBQ0Y7O0FBQ0QsYUFBT00saUJBQVA7QUFDRDtBQUVEOzs7Ozs7O3dCQUlVO0FBQ1IsYUFBTyxlQUFlLEtBQUt0RixjQUEzQjtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdFVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7SUFLYTZGLGM7Ozs7Ozs7Ozs7Ozs7O0FBQ1g7Ozs7OytCQUtXQyxPLEVBQVM7QUFDbEIsV0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBTyxJQUFQO0FBQ0Q7QUFDRDs7Ozs7Ozt3QkFJVTtBQUNSLGFBQU8sNEJBQTRCLEtBQUtBLE9BQWpDLEdBQTJDLEdBQTNDLEdBQWlELEtBQUs5RixjQUE3RDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7SUFLYStGLGdCOzs7Ozs7Ozs7Ozs7OztBQUVYOzs7O3dCQUlXO0FBQ1QsYUFBTyxtQkFBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZkg7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBOzs7OztJQUthQyxXOzs7OztBQUVYOzs7O0FBSUEsdUJBQVkzQyxFQUFaLEVBQWdCO0FBQUE7O0FBQUE7O0FBQ2Q7QUFDQSxVQUFLNEMsR0FBTCxHQUFXNUMsRUFBWDtBQUZjO0FBR2Y7QUFFRDs7Ozs7Ozs7d0JBSVU7QUFDUixVQUFJOUQsR0FBRyxHQUFHLGNBQWMsS0FBSzBHLEdBQW5CLEdBQXlCLFlBQW5DO0FBRUEsYUFBTzFHLEdBQVA7QUFDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCSDs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7QUFTQSxJQUFJMkcsRUFBRSxHQUFHO0FBQ1BDLFNBQU8sMEJBREE7QUFFUGhDLFdBQVMsc0JBRkY7QUFHUDBCLGdCQUFjLGdDQUhQO0FBSVBsQyxpQkFBZSw0QkFKUjtBQUtQVixrQkFBZ0IsNkJBTFQ7QUFNUDhDLGtCQUFnQixvQ0FOVDtBQU9QQyxhQUFXLHNCQVBKO0FBUVA3RSxRQUFNLGdCQVJDO0FBU1BWLFlBQVUsdUJBVEg7QUFVUEosY0FBWSw0QkFWTDs7QUFXUDs7Ozs7Ozs7QUFRQXZCLEtBQUcsRUFBRSxhQUFDd0IsUUFBRCxFQUFjO0FBQ2pCLFdBQU8sK0JBQWlCQSxRQUFqQixDQUFQO0FBQ0QsR0FyQk07O0FBc0JQOzs7Ozs7OztBQVFBOEYsTUFBSSxFQUFFLGNBQUM1RSxNQUFELEVBQVU7QUFDZCxtQkFBTzZFLGNBQVAsQ0FBc0I3RSxNQUF0QjtBQUNEO0FBaENNLENBQVQ7OztBQW1DQSxJQUFJLE9BQU84RSxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDQSxRQUFNLENBQUNKLEVBQVAsR0FBWUEsRUFBWjtBQUNELEMiLCJmaWxlIjoiZnVuY3Rpb24tYW5hbHl0aWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJmdW5jdGlvbi1hbmFseXRpY3NcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZnVuY3Rpb24tYW5hbHl0aWNzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImZ1bmN0aW9uLWFuYWx5dGljc1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB7bWV0aG9kOiAnZ2V0J30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIEZhbGxiYWNrIGZvciBlbmdpbmVzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBTeW1ib2xcbmNvbnN0IExJU1RFTkVSUyA9IFN5bWJvbCA/IFN5bWJvbCgpIDogJ19fbGlzdGVuZXJzJztcblxuY2xhc3MgUHJvZ3Jlc3NQcm9taXNlIGV4dGVuZHMgUHJvbWlzZSB7XG4gIGNvbnN0cnVjdG9yKGV4ZWN1dG9yKSB7XG4gICAgc3VwZXIoKHJlc29sdmUsIHJlamVjdCkgPT4gZXhlY3V0b3IocmVzb2x2ZSwgcmVqZWN0LFxuICAgICAgLy8gUGFzcyBtZXRob2QgZm9yIHBhc3NpbmcgcHJvZ3Jlc3MgdG8gbGlzdGVuZXJcbiAgICAgIHZhbHVlID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gdGhpc1tMSVNURU5FUlNdLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIodmFsdWUpKTtcbiAgICAgICAgfSBjYXRjaChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB0aGlzW0xJU1RFTkVSU10gPSBbXTtcbiAgfVxuICBwcm9ncmVzcyhoYW5kbGVyKSB7XG4gICAgaWYodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BST0dSRVNTX1JFUVVJUkVTX0ZVTkNUSU9OJyk7XG4gICAgdGhpc1tMSVNURU5FUlNdLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgc3RhdGljIGFsbChwcm9taXNlcykge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgQXJyYXkocHJvbWlzZXMubGVuZ3RoKTtcbiAgICBjb25zdCBsZW5ndGggPSBwcm9taXNlcy5sZW5ndGg7XG4gICAgbGV0IHJlc29sdmVDb3VudCA9IDA7XG4gICAgcmV0dXJuIG5ldyBQcm9ncmVzc1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCwgcHJvZ3Jlc3MpID0+IHtcbiAgICAgIHByb21pc2VzLmZvckVhY2goKHByb21pc2UsIGluZGV4KSA9PiB7XG4gICAgICAgIHByb21pc2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIHJlc3VsdHNbaW5kZXhdID0gcmVzdWx0O1xuICAgICAgICAgIHJlc3VsdHMucHJvcG9ydGlvbiA9ICsrcmVzb2x2ZUNvdW50IC8gbGVuZ3RoO1xuICAgICAgICAgIHByb2dyZXNzKHJlc3VsdHMpO1xuICAgICAgICAgIGlmKHJlc29sdmVDb3VudCA9PT0gbGVuZ3RoKSByZXNvbHZlKHJlc3VsdHMpO1xuICAgICAgICB9KS5jYXRjaChyZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIHNlcXVlbmNlKGlucHV0cywgaGFuZGxlcikge1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBjb25zdCBsZW5ndGggPSBpbnB1dHMubGVuZ3RoO1xuICAgIGxldCByZXNvbHZlQ291bnQgPSAwO1xuICAgIHJldHVybiBuZXcgUHJvZ3Jlc3NQcm9taXNlKChyZXNvbHZlLCByZWplY3QsIHByb2dyZXNzKSA9PiB7XG4gICAgICBmdW5jdGlvbiBpbnZva2VOZXh0KCkge1xuICAgICAgICBoYW5kbGVyLmNhbGwobnVsbCwgaW5wdXRzW3Jlc3VsdHMubGVuZ3RoXSlcbiAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHJlc3VsdCk7XG4gICAgICAgICAgICByZXN1bHRzLnByb3BvcnRpb24gPSArK3Jlc29sdmVDb3VudCAvIGxlbmd0aDtcbiAgICAgICAgICAgIHByb2dyZXNzKHJlc3VsdHMpO1xuICAgICAgICAgICAgaWYocmVzdWx0cy5sZW5ndGggPT09IGxlbmd0aCkgcmVzb2x2ZShyZXN1bHRzKTtcbiAgICAgICAgICAgIGVsc2UgaW52b2tlTmV4dCgpO1xuICAgICAgICAgIH0pLmNhdGNoKHJlamVjdCk7O1xuICAgICAgfVxuICAgICAgaW52b2tlTmV4dCgpO1xuICAgIH0pO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3NQcm9taXNlO1xuXG4iLCJpbXBvcnQgeyBSdW5uZXIgfSBmcm9tICcuL3J1bm5lcic7XG5pbXBvcnQgeyBQcm9jZXNzb3IgfSBmcm9tICcuL3Byb2Nlc3Nvcic7XG5pbXBvcnQgUHJvZ3Jlc3NQcm9taXNlIGZyb20gJ3Byb2dyZXNzLXByb21pc2UnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGZldGNoZXIgcHJvY2Vzc1xuICpAZXh0ZW5kcyBQcm9jZXNzb3JcbiAqL1xuZXhwb3J0IGNsYXNzIEZldGNoZXIgZXh0ZW5kcyBQcm9jZXNzb3Ige1xuICAvKipcbiAgICogQ3JlYXRlcyBhIGZldGhjZXJcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIFVSTCBQYXJhbWV0ZXJzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBnZXQgX3VybFBhcmFtZXRlcnMoKSB7XG4gICAgbGV0IHVybCA9ICcnO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5wYXJhbWV0ZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAodXJsICE9PSAnJykge1xuICAgICAgICB1cmwgKz0gJyYnO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnBhcmFtZXRlcnNba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdXJsICs9IGtleSArICc9JyArIHRoaXMucGFyYW1ldGVyc1trZXldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5wYXJhbWV0ZXJzW2tleV0pLmZvckVhY2goa2V5MiA9PiB7XG4gICAgICAgICAgaWYgKHVybCAhPT0gJycpIHtcbiAgICAgICAgICAgIHVybCArPSAnJic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnNba2V5XVtrZXkyXSA9PT0gJycpIHtcbiAgICAgICAgICAgIHVybCArPSBrZXkgKyAnPScgKyBrZXkyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1cmwgKz0ga2V5ICsgJz0nICsga2V5MiArICc6JyArIHRoaXMucGFyYW1ldGVyc1trZXldW2tleTJdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSB1cmxcbiAgICogQHRocm93cyBJbXBsZW1lbnRhdGlvbiBFcnJvclxuICAgKi9cbiAgZ2V0IHVybCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Nob3VsZCBpbXBsZW1lbnQgdXJsIGdlbmVyYXRpb24nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBydW5uaW5nIHByb2Nlc3Mgc3RhcnRlZFxuICAgKiBAcmV0dXJucyB7UHJvZ3Jlc3NQcm9taXNlfVxuICAgKi9cbiAgZ2V0KCkge1xuICAgIHJldHVybiBuZXcgUnVubmVyKCkuZ2V0UmVzdWx0cyh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgcGFyZW1ldGVyc1xuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVyc1xuICAgKiBAcmV0dXJucyB7RmV0Y2hlcn1cbiAgICovXG4gIHNldFBhcmFtZXRlcnMocGFyYW1ldGVycykge1xuICAgIE9iamVjdC5rZXlzKHBhcmFtZXRlcnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIHRoaXMucGFyYW1ldGVyc1trZXldID0gcGFyYW1ldGVyc1trZXldO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBEZXBlbmRlbmN5IHJlc3VsdHNcbiAgICogQHJldHVybnMge1Byb2dyZXNzUHJvbWlzZX1cbiAgICovXG4gIGdldERlcGVuZGVjeUZldGNoUmVzdWx0cygpIHtcbiAgICBjb25zdCBwcm9taXNlcyA9IHRoaXMuZGVwZW5kZW5jaWVzLm1hcChkZXBlbmRlbmN5ID0+IHtcbiAgICAgIHJldHVybiBuZXcgUnVubmVyKCkuZ2V0UmVzdWx0cyhkZXBlbmRlbmN5LnByb2Nlc3Nvcik7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gUHJvZ3Jlc3NQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cbiAgX2VuY29kZTY0KGJ1ZmYpIHtcbiAgICByZXR1cm4gYnRvYShuZXcgVWludDhBcnJheShidWZmKS5yZWR1Y2UoKHMsIGIpID0+IHMgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGIpLCAnJykpO1xuICB9XG4gIGhhc2goKSB7XG4gICAgcmV0dXJuIHRoaXMudXJsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBGZXRjaGVyIH0gZnJvbSAnLi4vY29yZS9mZXRjaGVyJztcblxuZXhwb3J0IGNsYXNzIElkZW50aWZpYWJsZU9iamVjdCBleHRlbmRzIEZldGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2ZpbHRlcnMgPSBbXTtcbiAgfVxuICBnZXQgbmFtZSgpIHtcbiAgICB0aHJvdyBFcnJvcignT2JqZWN0IG5hbWUgbm90IGltcGxlbWVudGVkJyk7XG4gIH1cbiAgd2hlcmUocmlnaHQsIG9wZXJhdG9yLCBsZWZ0KSB7XG4gICAgdGhpcy5fZmlsdGVycy5wdXNoKHtcbiAgICAgIHJpZ2h0OiByaWdodCxcbiAgICAgIG9wZXJhdG9yOiBvcGVyYXRvcixcbiAgICAgIGxlZnQ6IGxlZnRcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCB1cmwoKSB7XG4gICAgdmFyIHVybCA9IHRoaXMuX3VybFBhcmFtZXRlcnM7XG5cbiAgICB0aGlzLl9maWx0ZXJzLmZvckVhY2goKGZpbHRlcikgPT4ge1xuICAgICAgaWYgKHVybCAhPT0gJycpIHtcbiAgICAgICAgdXJsICs9ICcmJztcbiAgICAgIH1cbiAgICAgIHVybCArPSAnZmlsdGVyPScgKyBmaWx0ZXIucmlnaHQ7XG4gICAgICBpZiAoZmlsdGVyLm9wZXJhdG9yID09PSAnPT0nKSB7XG4gICAgICAgIHVybCArPSAnOmVxOicgKyBmaWx0ZXIubGVmdDtcbiAgICAgIH0gZWxzZSBpZiAoZmlsdGVyLm9wZXJhdG9yID09PSAnPCcpIHtcbiAgICAgICAgdXJsICs9ICc6bHQ6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICc8PScpIHtcbiAgICAgICAgdXJsICs9ICc6bGU6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICc+Jykge1xuICAgICAgICB1cmwgKz0gJzpndDonICsgZmlsdGVyLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlci5vcGVyYXRvciA9PT0gJz49Jykge1xuICAgICAgICB1cmwgKz0gJzpnZTonICsgZmlsdGVyLmxlZnQ7XG4gICAgICB9IGVsc2UgaWYgKGZpbHRlci5vcGVyYXRvciA9PT0gJzw+Jykge1xuICAgICAgICB1cmwgKz0gJzohZXE6JyArIGZpbHRlci5sZWZ0O1xuICAgICAgfSBlbHNlIGlmIChmaWx0ZXIub3BlcmF0b3IgPT09ICdpbicgfHwgZmlsdGVyLm9wZXJhdG9yID09PSAnIWluJykge1xuICAgICAgICB1cmwgKz0gJzonICsgZmlsdGVyLm9wZXJhdG9yICsgJzpbJyArIGZpbHRlci5sZWZ0ICsgJ10nO1xuICAgICAgfSBlbHNlIGlmICghZmlsdGVyLmxlZnQpIHtcbiAgICAgICAgdXJsICs9ICc6JyArIGZpbHRlci5vcGVyYXRvcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybCArPSAnOicgKyBmaWx0ZXIub3BlcmF0b3IgKyAnOicgKyBmaWx0ZXIubGVmdDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnLmpzb24/JyArIHVybCk7XG4gICAgcmV0dXJuIHRoaXMubmFtZSArICcuanNvbj8nICsgdXJsO1xuICB9XG59XG4iLCJpbXBvcnQgeyBSdW5uZXIgfSBmcm9tICcuL3J1bm5lcic7XG5pbXBvcnQgeyBGZXRjaGVyIH0gZnJvbSAnLi9mZXRjaGVyJztcblxuZXhwb3J0IGNsYXNzIE11bHRpRmV0Y2hlciBleHRlbmRzIEZldGNoZXIge1xuICBjb25zdHJ1Y3RvcihmZXRjaGVycykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fZmV0Y2hlcnMgPSBmZXRjaGVycztcbiAgfVxuICBnZXQgZmV0Y2hlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZldGNoZXJzO1xuICB9XG5cbiAgZ2V0KCkge1xuICAgIHJldHVybiAobmV3IFJ1bm5lcigpKS5nZXRBbGxSZXN1bHRzKHRoaXMpO1xuICB9XG59XG4iLCIvKipcbiAqIFRoaXMgY2FsbGJhY2sgdHlwZSBpcyBjYWxsZWQgYHByb2Nlc3NDYWxsYmFja2AuXG4gKlxuICogQGNhbGxiYWNrIHByb2Nlc3NDYWxsYmFja1xuICogQHBhcmFtIHtPYmplY3R9IHJlc3VsdFxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHByb2Nlc3MgZGVwZW5kZW5jeVxuICovXG5leHBvcnQgY2xhc3MgRGVwZW5kZW5jeSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZGVwZW5kZW5jeSBpbnN0YW5jZVxuICAgKiBAcGFyYW0ge1Byb2Nlc3Nvcn0gcHJvY2Vzc29yXG4gICAqIEBwYXJhbSB7cHJvY2Vzc0NhbGxiYWNrfSBwcm9jZXNzXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcm9jZXNzb3IsIHByb2Nlc3MpIHtcbiAgICB0aGlzLnByb2Nlc3NvciA9IHByb2Nlc3NvcjtcbiAgICB0aGlzLnByb2Nlc3MgPSBwcm9jZXNzO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgcmVwcmVzZW50YXRpb24gb2YgdGhlIHByb2Nlc3NvclxuICovXG5leHBvcnQgY2xhc3MgUHJvY2Vzc29yIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBwcm9jZXNzb3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucG9zdFByb2Nlc3NvcnMgPSBbXTtcbiAgICB0aGlzLmRlcGVuZGVuY2llcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBwcm9jZXNzb3IgaGFzIGRlcGVuZGVuY2llc1xuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGhhc0RlcGVuZGVuY2llcygpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmNpZXMubGVuZ3RoID4gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGRlcGVuZGVuY3kgdG8gdGhlIHByb2Nlc3NvclxuICAgKiBAcGFyYW0ge0RlcGVuZGVuY3l9IGRlcGVuZGVuY3lcbiAgICogQHJldHVybnMge1Byb2Nlc3Nvcn1cbiAgICovXG4gIHByZVByb2Nlc3MoZGVwZW5kZW5jeSkge1xuICAgIHRoaXMuZGVwZW5kZW5jaWVzLnB1c2goZGVwZW5kZW5jeSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBjYWxsYmFjayBwcm9jZXNzIHRoZSBvdXRwdXQgcHJvY2Vzc1xuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge1Byb2Nlc3Nvcn1cbiAgICovXG4gIHBvc3RQcm9jZXNzKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5wb3N0UHJvY2Vzc29ycy5wdXNoKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBwcmUgcHJvY2Vzc1xuICAgKiBAcmV0dXJucyB7UHJvY2Vzc29yfVxuICAgKi9cbiAgcGVyZm9ybVByZVByb2Nlc3MoKSB7XG4gICAgdGhpcy5kZXBlbmRlbmNpZXMuZm9yRWFjaCgoZGVwZW5kZW5jeSkgPT4ge1xuICAgICAgZGVwZW5kZW5jeS5wcm9jZXNzKGRlcGVuZGVuY3kucHJvY2Vzc29yLl9yZXN1bHRzLCB0aGlzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBwb3N0IHByb2Nlc3MgYWZ0ZXIgdGhlIHByb2Nlc3MgaGFzIGVuZGVkXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBwZXJmb3JtUG9zdFByb2Nlc3MoZGF0YSkge1xuICAgIHRoaXMuX3Jlc3VsdHMgPSBkYXRhO1xuICAgIGxldCBkYXRhVG9Qcm9jZXNzID0gZGF0YTtcblxuICAgIHRoaXMucG9zdFByb2Nlc3NvcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgIGRhdGFUb1Byb2Nlc3MgPSBjYWxsYmFjayhkYXRhVG9Qcm9jZXNzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YVRvUHJvY2VzcztcbiAgfVxufVxuIiwiaW1wb3J0IFByb2dyZXNzUHJvbWlzZSBmcm9tICdwcm9ncmVzcy1wcm9taXNlJztcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgaHR0cGFkYXB0ZXIgZnJvbSAnYXhpb3MvbGliL2FkYXB0ZXJzL2h0dHAnO1xuaW1wb3J0IHhocmFkYXB0ZXIgZnJvbSAnYXhpb3MvbGliL2FkYXB0ZXJzL3hocic7XG5sZXQgX2luc3RhbmNlO1xuXG4vKipcbiAqIFJ1bm5lciByZXByZXNlbnRzIHRoZSBwcm9jZXNzIHdoaWNoIHdpbGwgc2NoZWR1bGUgYW5kIHJ1biBvcGVyYXRpb25zIG9mIHRoZSBwcm9jZXNzZXNcbiAqL1xuZXhwb3J0IGNsYXNzIFJ1bm5lciB7XG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgdGhlIHJ1bm5lciBzaW5nbGV0b24gaW5zdGFuY2VcbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb25zXG4gICAqL1xuICBzdGF0aWMgaW5pdGlhdGVSdW5uZXIoY29uZmlndXJhdGlvbnMpIHtcbiAgICBpZiAoIVJ1bm5lci5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5jb25maWcgPSBjb25maWd1cmF0aW9ucztcbiAgICAgIHRoaXMuY2FjaGUgPSB7fTtcbiAgICAgIF9pbnN0YW5jZSA9IHRoaXM7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgUnVubmVyIGluc3RhbmNlXG4gICAqIEByZXR1cm5zIHtSdW5uZXJ9XG4gICAqL1xuICBnZXQgaW5zdGFuY2UoKSB7XG4gICAgcmV0dXJuIF9pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGNvbmZpZ3VyYXRpb25cbiAgICogQHBhcmFtIGNvbmZpZ3VyYXRpb25zXG4gICAqL1xuICBzZXQgY29uZmlnKGNvbmZpZ3VyYXRpb25zKSB7XG4gICAgdGhpcy5jb25maWcgPSBjb25maWd1cmF0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbmZpZ3VyYXRpb25zXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgZ2V0IGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWc7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBjYWxsYmFjayB0eXBlIGlzIGNhbGxlZCBgcmVzb2x2ZUNhbGxiYWNrYC5cbiAgICpcbiAgICogQGNhbGxiYWNrIHJlc29sdmVDYWxsYmFja1xuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VSZXN1bHRcbiAgICovXG5cbiAgLyoqXG4gICAqIFRoaXMgY2FsbGJhY2sgdHlwZSBpcyBjYWxsZWQgYHJlamVjdENhbGxiYWNrYC5cbiAgICpcbiAgICogQGNhbGxiYWNrIHJlamVjdENhbGxiYWNrXG4gICAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gICAqL1xuXG4gIC8qKlxuICAgKiBGZXRjaGVzIHRoZSBkYXRhIGZyb20gdGhlIGZldGNoZXJcbiAgICogQHBhcmFtIHtGZXRjaGVyfSBmZXRjaGVyXG4gICAqIEBwYXJhbSB7cmVzb2x2ZUNhbGxiYWNrfSByZXNvbHZlXG4gICAqIEBwYXJhbSB7cmVqZWN0Q2FsbGJhY2t9IHJlamVjdFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2ZldGNoKGZldGNoZXIsIHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmICghX2luc3RhbmNlKSB7XG4gICAgICBsZXQgZXJyb3IgPSAnQ29uZmlncmF0aW9uIG5vdCBzZXQgcGxlYXNlIGNvbmZpZ3JlIGZ1bmN0aW9uICcgK1xuICAgICAgICAnYW5hbHl0aWNzIGVnIHtiYXNlVXJsOlwiZGhpc19iYXNlX3VybFwiLCB1c2VybmFtZTpcInVzZXJuYW1lXCIsICcgK1xuICAgICAgICAncGFzc3dvcmQ6XCJwYXNzd29yZFwifSc7XG5cbiAgICAgIHRocm93IEVycm9yKGVycm9yKTtcbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgdXJsOiBfaW5zdGFuY2UuY29uZmlnLmJhc2VVcmwgKyBmZXRjaGVyLnVybCxcbiAgICAgIG1ldGhvZDogJ2dldCcsXG4gICAgICBhZGFwdGVyOiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgPyBodHRwYWRhcHRlciA6IHhocmFkYXB0ZXJcbiAgICB9O1xuXG4gICAgaWYgKF9pbnN0YW5jZS5jb25maWcudXNlcm5hbWUgJiYgX2luc3RhbmNlLmNvbmZpZy5wYXNzd29yZCkge1xuICAgICAgY29uZmlnLmF1dGggPSB7XG4gICAgICAgIHVzZXJuYW1lOiBfaW5zdGFuY2UuY29uZmlnLnVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogX2luc3RhbmNlLmNvbmZpZy5wYXNzd29yZFxuICAgICAgfTtcbiAgICB9XG4gICAgYXhpb3MucmVxdWVzdChjb25maWcpLnRoZW4oKHJlc3VsdHMpID0+IHtcbiAgICAgIHJlc29sdmUoZmV0Y2hlci5wZXJmb3JtUG9zdFByb2Nlc3MocmVzdWx0cy5kYXRhKSk7XG4gICAgfSwgKGVycikgPT4ge1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2hlcyBkYXRhIHJlbGF0ZWQgdG8gYSBmZXRjaGVyXG4gICAqIEBwYXJhbSB7RmV0Y2hlcn0gZmV0Y2hlclxuICAgKiBAcmV0dXJucyB7UHJvZ3Jlc3NQcm9taXNlfVxuICAgKi9cbiAgZ2V0UmVzdWx0cyhmZXRjaGVyKSB7XG4gICAgaWYgKGZldGNoZXIuX2ZldGNoZXJzKSB7IC8vIElmIGlzIGEgbXVsdGlmZXRjaGVyXG4gICAgICByZXR1cm4gdGhpcy5nZXRBbGxSZXN1bHRzKGZldGNoZXIpO1xuICAgIH1cbiAgICBsZXQgaGFzaGVkID0gZmV0Y2hlci5oYXNoKCk7XG5cbiAgICBpZiAoIV9pbnN0YW5jZS5jYWNoZVtoYXNoZWRdKSB7XG4gICAgICBfaW5zdGFuY2UuY2FjaGVbaGFzaGVkXSA9IG5ldyBQcm9ncmVzc1Byb21pc2UoXG4gICAgICAgIChyZXNvbHZlLCByZWplY3QsIHByb2dyZXNzKSA9PiB7XG4gICAgICAgICAgaWYgKGZldGNoZXIuaGFzRGVwZW5kZW5jaWVzKCkpIHtcbiAgICAgICAgICAgIGZldGNoZXJcbiAgICAgICAgICAgICAgLmdldERlcGVuZGVjeUZldGNoUmVzdWx0cygpXG4gICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBmZXRjaGVyLnBlcmZvcm1QcmVQcm9jZXNzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmV0Y2goZmV0Y2hlciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VycnJycnJycnJycjonLCBlcnIpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZmV0Y2goZmV0Y2hlciwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBfaW5zdGFuY2UuY2FjaGVbaGFzaGVkXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGZXRjaGVzIGRhdGEgZm9yIG11bHRpcGxlIGZldGNoZXJzXG4gICAqIEBwYXJhbSB7TXVsdGlGZXRjaGVyfSBtdWx0aWZldGNoZXJcbiAgICogQHJldHVybnMge1Byb2dyZXNzUHJvbWlzZX1cbiAgICovXG4gIGdldEFsbFJlc3VsdHMobXVsdGlmZXRjaGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9ncmVzc1Byb21pc2UoKHJlc29sdmUsIHJlamVjdCwgcHJvZ3Jlc3MpID0+IHtcbiAgICAgIGNvbnN0IHByb21pc2VzID0gbXVsdGlmZXRjaGVyLmZldGNoZXJzLm1hcCgoZmV0Y2hlcikgPT4gKG5ldyBSdW5uZXIoKSkuZ2V0UmVzdWx0cyhmZXRjaGVyKSk7XG5cbiAgICAgIHJldHVybiBQcm9ncmVzc1Byb21pc2UuYWxsKHByb21pc2VzKS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgIHJlc29sdmUobXVsdGlmZXRjaGVyLnBlcmZvcm1Qb3N0UHJvY2VzcyhyZXN1bHRzKSk7XG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEZldGNoZXIgfSBmcm9tICcuLi9jb3JlL2ZldGNoZXInO1xuXG4vKipcbiAqIFRoaXMgcmVwcmVzZW50cyB0aGUgQW5hbHl0aWNzIGhlYWRlclxuICpcbiAqL1xuZXhwb3J0IGNsYXNzIEFuYWx5dGljc0hlYWRlciB7fVxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgdGhlIEFuYWx5dGljcyBIZWFkZXJzXG4gKlxuICogQGV4dGVuZHMgQXJyYXlcbiAqL1xuZXhwb3J0IGNsYXNzIEFuYWx5dGljc0hlYWRlcnMgZXh0ZW5kcyBBcnJheSB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlciguLi5kYXRhKTtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgT2JqZWN0LmNyZWF0ZShBbmFseXRpY3NIZWFkZXJzLnByb3RvdHlwZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGRhdGEgYW5hbHl0aWNzIGhlYWRlclxuICAgKlxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzSGVhZGVyfVxuICAgKi9cbiAgZ2V0IGR4KCkge1xuICAgIHJldHVybiB0aGlzLmdldEhlYWRlcignZHgnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwZXJpb2QgYW5hbHl0aWNzIGhlYWRlclxuICAgKlxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzSGVhZGVyfVxuICAgKi9cbiAgZ2V0IHBlKCkge1xuICAgIHJldHVybiB0aGlzLmdldEhlYWRlcigncGUnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBvcmdhbmlzYXRpb24gdW5pdCBhbmFseXRpY3MgaGVhZGVyXG4gICAqXG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3NIZWFkZXJ9XG4gICAqL1xuICBnZXQgb3UoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0SGVhZGVyKCdvdScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHZhbHVlIGFuYWx5dGljcyBoZWFkZXJcbiAgICpcbiAgICogQHJldHVybnMge0FuYWx5dGljc0hlYWRlcn1cbiAgICovXG4gIGdldCB2YWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRIZWFkZXIoJ3ZhbHVlJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgaGVhZGVyIG9mIGEgcGFyYW1ldGVyXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzSGVhZGVyfVxuICAgKi9cbiAgZ2V0SGVhZGVyKGlkKSB7XG4gICAgbGV0IHJldHVybkhlYWRlcjtcblxuICAgIHRoaXMuZm9yRWFjaCgoaGVhZGVyLCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGhlYWRlci5uYW1lID09PSBpZCkge1xuICAgICAgICByZXR1cm5IZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHJldHVybkhlYWRlci5pbmRleCA9IGluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXR1cm5IZWFkZXI7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgdGhlIEFuYWx5dGljcyBSZXN1bHRzXG4gKlxuICovXG5leHBvcnQgY2xhc3MgQW5hbHl0aWNzT2JqZWN0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYW5hIEFuYWx5dGljcyBPYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IC0gREhJUyBBbmFseXRpY3Mgb2JqZWN0XG4gICAqL1xuICBjb25zdHJ1Y3RvcihhbmFseXRpY3NPYmplY3QpIHtcbiAgICB0aGlzLl9kYXRhID0gYW5hbHl0aWNzT2JqZWN0O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIEFuYWx5dGljcyBIZWFkZXJzIEFycmF5XG4gICAqXG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3NIZWFkZXJzfVxuICAgKi9cbiAgZ2V0IGhlYWRlcnMoKSB7XG4gICAgcmV0dXJuIG5ldyBBbmFseXRpY3NIZWFkZXJzKHRoaXMuX2RhdGEuaGVhZGVycyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgQW5hbHl0aWNzIE1ldGFkYXRhIE9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJucyB7KnxtZXRhRGF0YXx7ZGltZW5zaW9ucywgbmFtZXMsIGR4LCBwZSwgb3UsIGNvfXx7b3VIaWVyYXJjaHksIGl0ZW1zLCBkaW1lbnNpb25zfX1cbiAgICovXG4gIGdldCBtZXRhRGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5tZXRhRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSByb3dzIG9mIHRoZSBhbmFseXRpY3Mgb2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICovXG4gIGdldCByb3dzKCkge1xuICAgIHJldHVybiB0aGlzLl9kYXRhLnJvd3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgQW5hbHl0aWNzIGhlaWdodFxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IGhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YS5oZWlnaHQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgQW5hbHl0aWNzIHdpZHRoXG4gICAqXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgd2lkdGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGEud2lkdGg7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgdGhlIEFuYWx5dGljcyBGZXRjaGVyIGZvciBwcm9jZXNzaW5nIGFuYWx5dGljcyBjYWxsc1xuICpcbiAqIEBleHRlbmRzIEZldGNoZXJcbiAqL1xuZXhwb3J0IGNsYXNzIEFuYWx5dGljcyBleHRlbmRzIEZldGNoZXIge1xuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhbmFseXRpY3MgZmV0aGNlclxuICAgKlxuICAgKiBAcGFyYW0gb2xkQW5hbHl0aWNzIC0gV2hldGhlciB0aGUgc3RydWN0dXJlIHRvIGJlIHJldHVybmVkIHNob3VsZCBiZSBvbGQgb3IgbmV3LlxuICAgKi9cbiAgY29uc3RydWN0b3Iob2xkQW5hbHl0aWNzID0gdHJ1ZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzWydkaW1lbnNpb24nXSA9IHt9O1xuICAgIHRoaXMucG9zdFByb2Nlc3MoZGF0YSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5zdGFuZGFyZGl6ZUFuYWx5dGljcyhkYXRhLCBvbGRBbmFseXRpY3MpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRhdGEgZm9yIHRoZSBmZXRjaFxuICAgKiBAcGFyYW0gZHhcbiAgICogQHJldHVybnMge0FuYWx5dGljc31cbiAgICovXG4gIHNldERhdGEoZHgpIHtcbiAgICB0aGlzLnNldERpbWVuc2lvbignZHgnLCBkeCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgcGVyaW9kIGZvciB0aGUgZmV0Y2hcbiAgICogQHBhcmFtIHBlXG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3N9XG4gICAqL1xuICBzZXRQZXJpb2QocGUpIHtcbiAgICB0aGlzLnNldERpbWVuc2lvbigncGUnLCBwZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgb3JnYW5pc2F0aW9uIHVuaXQgZm9yIHRoZSBmZXRjaGluZyBvZiB0aGUgYW5hbHl0aWNzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvdSAtIE9yZ2FuaXNhdGlvbiB1bml0XG4gICAqIEByZXR1cm5zIHtBbmFseXRpY3N9IEFuYWx5dGljcyByZXN1bHRzXG4gICAqL1xuICBzZXRPcmdVbml0KG91KSB7XG4gICAgdGhpcy5zZXREaW1lbnNpb24oJ291Jywgb3UpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRpbWVuc2lvbiBmb3IgdGhlIGZldGNoaW5nIG9mIHRoZSBhbmFseXRpY3NcbiAgICogQHBhcmFtIHtzdHJpbmd9IGRpbSAtIER5bmFtaWMgRGltZW5zaW9uIGlkZW50aWZpZXJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gRHluYW1pYyBkaW1lbnNpb24gb3B0aW9ucyBpZGVudGlmaWVyc1xuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzfVxuICAgKi9cbiAgc2V0RGltZW5zaW9uKGRpbSwgdmFsdWUpIHtcbiAgICB0aGlzLnBhcmFtZXRlcnNbJ2RpbWVuc2lvbiddW2RpbV0gPSB2YWx1ZSA/IHZhbHVlIDogJyc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU3RhbmRhcmRpemVzIHRoZSBhbmFseXRpY3Mgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBhbmFseXRpY3NPYmplY3QgLSBUaGUgYW5hbHl0aWNzIG9iamVjdFxuICAgKiBAcGFyYW0gcHJlZmVyTm9ybWFsU3RydWN0dXJlIC0gV2hldGhlciB0byBwcmVmZXIgdGhlIG9sZCBvciBuZXcgYW5hbHl0aWNzIHN0cnVjdHVyZVxuICAgKiBAcmV0dXJucyB7QW5hbHl0aWNzT2JqZWN0fVxuICAgKi9cbiAgc3RhbmRhcmRpemVBbmFseXRpY3MoYW5hbHl0aWNzT2JqZWN0LCBwcmVmZXJOb3JtYWxTdHJ1Y3R1cmUgPSB0cnVlKSB7XG4gICAgLy8gaWYgU2VydmVyc2lkZSBFdmVudCBjbHVzdGVyaW5nIGRvIG5vdGhpbmdcbiAgICBpZiAoYW5hbHl0aWNzT2JqZWN0LmNvdW50KSB7XG4gICAgICByZXR1cm4gYW5hbHl0aWNzT2JqZWN0O1xuICAgIH1cbiAgICBsZXQgc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0ID0ge1xuICAgICAgaGVhZGVyczogW10sXG4gICAgICBtZXRhRGF0YToge1xuICAgICAgICBkaW1lbnNpb25zOiB7fSxcbiAgICAgICAgbmFtZXM6IHt9LFxuICAgICAgICBkeDogW10sXG4gICAgICAgIHBlOiBbXSxcbiAgICAgICAgb3U6IFtdLFxuICAgICAgICBjbzogW11cbiAgICAgIH0sXG4gICAgICByb3dzOiBbXVxuICAgIH07XG5cbiAgICBpZiAoYW5hbHl0aWNzT2JqZWN0KSB7XG4gICAgICAvKipcbiAgICAgICAqIENoZWNrIGhlYWRlcnNcbiAgICAgICAqL1xuICAgICAgaWYgKGFuYWx5dGljc09iamVjdC5oZWFkZXJzKSB7XG4gICAgICAgIGFuYWx5dGljc09iamVjdC5oZWFkZXJzLmZvckVhY2goKGhlYWRlcikgPT4ge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgbmV3SGVhZGVyID0gaGVhZGVyO1xuXG4gICAgICAgICAgICBzYW5pdGl6ZWRBbmFseXRpY3NPYmplY3QuaGVhZGVycy5wdXNoKG5ld0hlYWRlcik7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdJbnZhbGlkIGhlYWRlciBvYmplY3QnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIENoZWNrIG1ldGFEYXRhXG4gICAgICAgKi9cbiAgICAgIGlmIChhbmFseXRpY3NPYmplY3QubWV0YURhdGEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBsZXQgc2FuaXRpemVkTWV0YWRhdGEgPSB0aGlzLmdldFNhbml0aXplZEFuYWx5dGljc01ldGFkYXRhKFxuICAgICAgICAgICAgYW5hbHl0aWNzT2JqZWN0Lm1ldGFEYXRhLFxuICAgICAgICAgICAgcHJlZmVyTm9ybWFsU3RydWN0dXJlXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHNhbml0aXplZEFuYWx5dGljc09iamVjdC5tZXRhRGF0YSA9IHNhbml0aXplZE1ldGFkYXRhO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdJbnZhbGlkIG1ldGFkYXRhIG9iamVjdCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2hlY2sgcm93c1xuICAgICAgICovXG4gICAgICBpZiAoYW5hbHl0aWNzT2JqZWN0LnJvd3MpIHtcbiAgICAgICAgc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0LnJvd3MgPSBhbmFseXRpY3NPYmplY3Qucm93cztcbiAgICAgIH1cbiAgICB9XG4gICAgc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0LmhlaWdodCA9IGFuYWx5dGljc09iamVjdC5oZWlnaHQ7XG4gICAgc2FuaXRpemVkQW5hbHl0aWNzT2JqZWN0LndpZHRoID0gYW5hbHl0aWNzT2JqZWN0LndpZHRoO1xuICAgIHJldHVybiBuZXcgQW5hbHl0aWNzT2JqZWN0KHNhbml0aXplZEFuYWx5dGljc09iamVjdCk7XG4gIH1cblxuICAvKipcbiAgICogU3RhbmRhcmRpemVzIHRoZSBhbmFseXRpY3MgbWV0YWRhdGEgb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSBhbmFseXRpY01ldGFkYXRhIC0gVGhlIGFuYWx5dGljcyBtZXRhZGF0YSBvYmplY3RcbiAgICogQHBhcmFtIHByZWZlck5vcm1hbFN0cnVjdHVyZSAtIFdoZXRoZXIgdG8gcHJlZmVyIHRoZSBvbGQgb3IgbmV3IGFuYWx5dGljcyBzdHJ1Y3R1cmVcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIGdldFNhbml0aXplZEFuYWx5dGljc01ldGFkYXRhKGFuYWx5dGljTWV0YWRhdGEsIHByZWZlck5vcm1hbFN0cnVjdHVyZSkge1xuICAgIGxldCBzYW5pdGl6ZWRNZXRhZGF0YSA9IHt9O1xuXG4gICAgaWYgKGFuYWx5dGljTWV0YWRhdGEpIHtcbiAgICAgIGlmIChhbmFseXRpY01ldGFkYXRhLm91SGllcmFyY2h5KSB7XG4gICAgICAgIHNhbml0aXplZE1ldGFkYXRhLm91SGllcmFyY2h5ID0gYW5hbHl0aWNNZXRhZGF0YS5vdUhpZXJhcmNoeTtcbiAgICAgIH1cbiAgICAgIGlmIChwcmVmZXJOb3JtYWxTdHJ1Y3R1cmUpIHsgLy8gR2V0IG9sZCBzdHJ1Y3R1cmVcbiAgICAgICAgc2FuaXRpemVkTWV0YWRhdGEubmFtZXMgPSB7fTtcbiAgICAgICAgaWYgKGFuYWx5dGljTWV0YWRhdGEubmFtZXMpIHtcbiAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5uYW1lcyA9IGFuYWx5dGljTWV0YWRhdGEubmFtZXM7XG4gICAgICAgIH0gZWxzZSBpZiAoYW5hbHl0aWNNZXRhZGF0YS5pdGVtcykge1xuICAgICAgICAgIE9iamVjdC5rZXlzKGFuYWx5dGljTWV0YWRhdGEuaXRlbXMpLmZvckVhY2gobmFtZUtleSA9PiB7XG4gICAgICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5uYW1lc1tuYW1lS2V5XSA9IGFuYWx5dGljTWV0YWRhdGEuaXRlbXNbbmFtZUtleV0ubmFtZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhbmFseXRpY01ldGFkYXRhLmRpbWVuc2lvbnMpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyhhbmFseXRpY01ldGFkYXRhLmRpbWVuc2lvbnMpLmZvckVhY2goXG4gICAgICAgICAgICBuYW1lS2V5ID0+IHtcbiAgICAgICAgICAgICAgc2FuaXRpemVkTWV0YWRhdGFbbmFtZUtleV0gPVxuICAgICAgICAgICAgICAgIGFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9uc1tuYW1lS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgeyAvLyBHZXQgbmV3IHN0cnVjdHVyZVxuICAgICAgICBzYW5pdGl6ZWRNZXRhZGF0YS5pdGVtcyA9IHt9O1xuICAgICAgICBpZiAoYW5hbHl0aWNNZXRhZGF0YS5pdGVtcykge1xuICAgICAgICAgIHNhbml0aXplZE1ldGFkYXRhLml0ZW1zID0gYW5hbHl0aWNNZXRhZGF0YS5pdGVtcztcbiAgICAgICAgfSBlbHNlIGlmIChhbmFseXRpY01ldGFkYXRhLm5hbWVzKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXMoYW5hbHl0aWNNZXRhZGF0YS5pdGVtcykuZm9yRWFjaChuYW1lS2V5ID0+IHtcbiAgICAgICAgICAgIGFuYWx5dGljTWV0YWRhdGEuaXRlbXNbbmFtZUtleV0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IGFuYWx5dGljTWV0YWRhdGEubmFtZXNbbmFtZUtleV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWFuYWx5dGljTWV0YWRhdGEuZGltZW5zaW9ucykge1xuICAgICAgICAgIHNhbml0aXplZE1ldGFkYXRhLmRpbWVuc2lvbnMgPSB7fTtcbiAgICAgICAgICBPYmplY3Qua2V5cyhhbmFseXRpY01ldGFkYXRhKS5mb3JFYWNoKG5hbWVLZXkgPT4ge1xuICAgICAgICAgICAgaWYgKFsnbmFtZXMnLCAnaXRlbXMnLCAnZGltZW5zaW9ucyddLmluZGV4T2YobmFtZUtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgIHNhbml0aXplZE1ldGFkYXRhLmRpbWVuc2lvbnNbbmFtZUtleV0gPSBhbmFseXRpY01ldGFkYXRhW25hbWVLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNhbml0aXplZE1ldGFkYXRhLmRpbWVuc2lvbnMgPSBhbmFseXRpY01ldGFkYXRhLmRpbWVuc2lvbnM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNhbml0aXplZE1ldGFkYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHVybCBmb3IgZmV0Y2hpbmdcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldCB1cmwoKSB7XG4gICAgcmV0dXJuICdhbmFseXRpY3M/JyArIHRoaXMuX3VybFBhcmFtZXRlcnM7XG4gIH1cbn1cbiIsImltcG9ydCB7IEFuYWx5dGljcyB9IGZyb20gJy4vYW5hbHl0aWNzJztcblxuLyoqXG4gKiBUaGlzIHJlcHJlc2VudHMgdGhlIEV2ZW50IEFuYWx5dGljcyBGZXRjaGVyIGZvciBwcm9jZXNzaW5nIGFuYWx5dGljcyBjYWxsc1xuICpcbiAqIEBleHRlbmRzIEZldGNoZXJcbiAqL1xuZXhwb3J0IGNsYXNzIEV2ZW50QW5hbHl0aWNzIGV4dGVuZHMgQW5hbHl0aWNzIHtcbiAgLyoqXG4gICAqIFNldHMgdGhlIFByb2dyYW0gZm9yIHRoZSBmZXRjaFxuICAgKiBAcGFyYW0gcHJvZ3JhbVxuICAgKiBAcmV0dXJucyB7RXZlbnRBbmFseXRpY3N9XG4gICAqL1xuICBzZXRQcm9ncmFtKHByb2dyYW0pIHtcbiAgICB0aGlzLnByb2dyYW0gPSBwcm9ncmFtO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8qKlxuICAgKiBHZXRzIHRoZSB1cmwgZm9yIGZldGNoaW5nXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXQgdXJsKCkge1xuICAgIHJldHVybiAnYW5hbHl0aWNzL2V2ZW50cy9xdWVyeS8nICsgdGhpcy5wcm9ncmFtICsgJz8nICsgdGhpcy5fdXJsUGFyYW1ldGVycztcbiAgfVxufVxuIiwiaW1wb3J0IHsgSWRlbnRpZmlhYmxlT2JqZWN0IH0gZnJvbSAnLi4vY29yZS9pZGVudGlmaWFibGUtb2JqZWN0JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBmZXRjaGVyIGZvciB0aGUgb3JnYW5pc2F0aW9uIHVuaXRcbiAqXG4gKiBAZXh0ZW5kcyBJZGVudGlmaWFibGVPYmplY3RcbiAqL1xuZXhwb3J0IGNsYXNzIE9yZ2FuaXNhdGlvblVuaXQgZXh0ZW5kcyBJZGVudGlmaWFibGVPYmplY3Qge1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBuYW1lIGZvciBmZXRjaGluZyB0aGUgaWRlbnRpZmlhYmxlIG9iamVjdFxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuICdvcmdhbmlzYXRpb25Vbml0cyc7XG4gIH1cbn1cbiIsImltcG9ydCB7IEZldGNoZXIgfSBmcm9tICcuLi9jb3JlL2ZldGNoZXInO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBmZXRjaGVyIHRvIGxvYWQgc3FsIHZpZXcgZGF0YVxuICpcbiAqIEBleHRlbmRzIEZldGNoZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFNRTFZpZXdEYXRhIGV4dGVuZHMgRmV0Y2hlciB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIFNRTFZpZXdEYXRhIEluc3RhbmNlXG4gICAqIEBwYXJhbSBpZFxuICAgKi9cbiAgY29uc3RydWN0b3IoaWQpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdXJsIGZvciBmZXRjaGluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0IHVybCgpIHtcbiAgICB2YXIgdXJsID0gJ3NxbFZpZXdzLycgKyB0aGlzLl9pZCArICcvZGF0YS5qc29uJztcblxuICAgIHJldHVybiB1cmw7XG4gIH1cbn1cbiIsImltcG9ydCB7QW5hbHl0aWNzLCBBbmFseXRpY3NPYmplY3QsIEFuYWx5dGljc0hlYWRlcnN9IGZyb20gJy4vaW1wbC9hbmFseXRpY3MuanMnO1xuaW1wb3J0IHtFdmVudEFuYWx5dGljc30gZnJvbSAnLi9pbXBsL2V2ZW50LWFuYWx5dGljcy5qcyc7XG5pbXBvcnQge1NRTFZpZXdEYXRhfSBmcm9tICcuL2ltcGwvc3FsLXZpZXcuanMnO1xuaW1wb3J0IHtPcmdhbmlzYXRpb25Vbml0fSBmcm9tICcuL2ltcGwvb3JnYW5pc2F0aW9uLXVuaXQuanMnO1xuaW1wb3J0IFByb2dyZXNzUHJvbWlzZSBmcm9tICdwcm9ncmVzcy1wcm9taXNlJztcbmltcG9ydCB7IFJ1bm5lciB9IGZyb20gJy4vY29yZS9ydW5uZXIuanMnO1xuaW1wb3J0IHsgRGVwZW5kZW5jeSB9IGZyb20gJy4vY29yZS9wcm9jZXNzb3InO1xuaW1wb3J0IHsgTXVsdGlGZXRjaGVyIH0gZnJvbSAnLi9jb3JlL211bHRpLWZldGNoZXInO1xuXG4vKipcbiAqIFRoaXMgaXMgdGhlIG1haW4gaG9sZGVyIGZvciB0aGUgZnVuY3Rpb25hbGl0aWVzIG9mIHRoZSBmdW5jdGlvblxuICogQHR5cGUge3tQcm9taXNlOiBQcm9ncmVzc1Byb21pc2UsIEFuYWx5dGljczogQW5hbHl0aWNzLFxuICAqICAgQW5hbHl0aWNzT2JqZWN0OiBBbmFseXRpY3NPYmplY3QsIEFuYWx5dGljc0hlYWRlcnM6IEFuYWx5dGljc0hlYWRlcnMsXG4gICogICBPcmdhbmlzYXRpb25Vbml0OiBPcmdhbmlzYXRpb25Vbml0LCBTUUxWaWV3RGF0YTogU1FMVmlld0RhdGEsXG4gICogICBSdW5uZXI6IFJ1bm5lciwgRGVwZW5kZW5jeTogRGVwZW5kZW5jeSwgTXVsdGlGZXRjaGVyOiBNdWx0aUZldGNoZXIsXG4gICogICBhbGw6IChmdW5jdGlvbihGZXRjaGVyW10pKSwgaW5pdDogKGZ1bmN0aW9uKCo9KSl9XG4gICogfVxuICovXG5sZXQgRm4gPSB7XG4gIFByb21pc2U6IFByb2dyZXNzUHJvbWlzZSxcbiAgQW5hbHl0aWNzOiBBbmFseXRpY3MsXG4gIEV2ZW50QW5hbHl0aWNzOiBFdmVudEFuYWx5dGljcyxcbiAgQW5hbHl0aWNzT2JqZWN0OiBBbmFseXRpY3NPYmplY3QsXG4gIEFuYWx5dGljc0hlYWRlcnM6IEFuYWx5dGljc0hlYWRlcnMsXG4gIE9yZ2FuaXNhdGlvblVuaXQ6IE9yZ2FuaXNhdGlvblVuaXQsXG4gIFNRTFZpZXdEYXRhOiBTUUxWaWV3RGF0YSxcbiAgUnVubmVyOiBSdW5uZXIsXG4gIERlcGVuZGVuY3k6IERlcGVuZGVuY3ksXG4gIE11bHRpRmV0Y2hlcjogTXVsdGlGZXRjaGVyLFxuICAvKipcbiAgICogQWRkcyBtdWx0aXBsZSBmZXRjaGVycyBpbiBxdWV1ZSBmb3IgZXhlY3V0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0ZldGNoZXJbXX0gZmV0Y2hlcnMgLSBUaGUgZmV0aGVycyBpcyBhbiBhcnJheSBvZiB0aGUgZmV0Y2hlcnNcbiAgICogQHJldHVybnMge1Byb2dyZXNzUHJvbWlzZX0gLSBQcm9ncmVzcyBQcm9taXNlIGZvciBmZXRjaGluZyB0aGUgdmFyaW91cyBmZXRjaGVyc1xuICAgKiBAZXhhbXBsZVxuICAgKiBGbi5hbGwoW25ldyBGbi5BbmFseXRpY3MoKSwgbmV3IEZuLk9yZ2FuaXNhdGlvblVuaXQoKV0pO1xuICAgKi9cbiAgYWxsOiAoZmV0Y2hlcnMpID0+IHtcbiAgICByZXR1cm4gbmV3IE11bHRpRmV0Y2hlcihmZXRjaGVycyk7XG4gIH0sXG4gIC8qKlxuICAgKiBDb25maWd1cmVzIHRoZSBydW5uaW5nIGVudmlyb25tZW50IHBhcmFtZXRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ3VyYXRpb24gLSBUaGUgZmV0aGVycyBpcyBhbiBhcnJheSBvZiB0aGUgZmV0Y2hlcnNcbiAgICogQHJldHVybnMge1Byb2dyZXNzUHJvbWlzZX0gLSBQcm9ncmVzcyBQcm9taXNlIGZvciBmZXRjaGluZyB0aGUgdmFyaW91cyBmZXRjaGVyc1xuICAgKiBAZXhhbXBsZVxuICAgKiBGbi5hbGwoe2Jhc2VVcmw6Jyd9KTtcbiAgICovXG4gIGluaXQ6IChjb25maWcpPT57XG4gICAgUnVubmVyLmluaXRpYXRlUnVubmVyKGNvbmZpZyk7XG4gIH1cbn07XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICB3aW5kb3cuRm4gPSBGbjtcbn1cbmV4cG9ydCB7IEZuIH07XG4iXSwic291cmNlUm9vdCI6IiJ9