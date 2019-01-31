/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([29,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(0);\nvar ReactDOM = __webpack_require__(7);\nvar blue_herring_1 = __webpack_require__(30);\nvar fields = [\n    {\n        label: 'Foo',\n        name: 'foo',\n        type: 'string'\n    }\n];\nvar model = {\n    foo: 'Hello yes this is dog'\n};\nvar onChange = function (newValue) {\n    model = newValue;\n    render();\n};\nvar render = function () {\n    ReactDOM.render(React.createElement(blue_herring_1.AutoForm, { model: model, fields: fields, onChange: onChange }), document.getElementsByClassName('auto-form-demo-target')[0]);\n};\nrender();\n\n\n//# sourceURL=webpack:///./demo/auto-form.tsx?");

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\ntslib_1.__exportStar(__webpack_require__(31), exports);\n\n\n//# sourceURL=webpack:///./build/blue-herring.js?");

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\nvar React = __webpack_require__(0);\nvar core_1 = __webpack_require__(46);\nvar AutoForm = (function (_super) {\n    tslib_1.__extends(AutoForm, _super);\n    function AutoForm(props) {\n        var _this = _super.call(this, props) || this;\n        _this.state = {};\n        return _this;\n    }\n    AutoForm.makeLabelName = function (label) {\n        var newLabel = label.split(/(?=[A-Z])/).map(function (s) { return s.toLowerCase(); }).join(\" \");\n        newLabel = newLabel[0].toUpperCase() + newLabel.slice(1);\n        return newLabel;\n    };\n    AutoForm.prototype.renderNumberInput = function (field) {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.NumericInput, { value: model[field.name], onValueChange: function (v) {\n                var _a;\n                if (isNaN(v))\n                    return;\n                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = v, _a)));\n            }, min: field.min || 0 });\n    };\n    AutoForm.prototype.renderSizeBytesInput = function (field) {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.NumericInput, { value: model[field.name], onValueChange: function (v) {\n                var _a;\n                if (isNaN(v))\n                    return;\n                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = v, _a)));\n            }, min: 0, stepSize: 1000, majorStepSize: 1000000 });\n    };\n    AutoForm.prototype.renderStringInput = function (field) {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.InputGroup, { value: model[field.name], onChange: function (v) {\n                var _a;\n                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = v.target.value, _a)));\n            } });\n    };\n    AutoForm.prototype.renderBooleanInput = function (field) {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.HTMLSelect, { options: [\"True\", \"False\"], value: model[field.name] === true ? \"True\" : \"False\", onChange: function (e) {\n                var _a;\n                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = e.currentTarget.value === \"True\", _a)));\n            } });\n    };\n    AutoForm.prototype.renderStringArrayInput = function (field) {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.TagInput, { values: model[field.name] || [], onChange: function (v) {\n                var _a;\n                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = v, _a)));\n            }, addOnBlur: true });\n    };\n    AutoForm.prototype.renderFieldInput = function (field) {\n        switch (field.type) {\n            case 'number': return this.renderNumberInput(field);\n            case 'size-bytes': return this.renderSizeBytesInput(field);\n            case 'string': return this.renderStringInput(field);\n            case 'boolean': return this.renderBooleanInput(field);\n            case 'string-array': return this.renderStringArrayInput(field);\n            default: throw new Error(\"unknown field type '\" + field.type + \"'\");\n        }\n    };\n    AutoForm.prototype.renderField = function (field) {\n        var label = field.label || AutoForm.makeLabelName(field.name);\n        return React.createElement(core_1.FormGroup, { label: label, key: field.name }, this.renderFieldInput(field));\n    };\n    AutoForm.prototype.render = function () {\n        var _this = this;\n        var _a = this.props, fields = _a.fields, model = _a.model;\n        return React.createElement(\"div\", { className: \"auto-form\" }, model && fields.map(function (field) { return _this.renderField(field); }));\n    };\n    return AutoForm;\n}(React.Component));\nexports.AutoForm = AutoForm;\n\n\n//# sourceURL=webpack:///./build/auto-form/auto-form.js?");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });