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
/******/ 	deferredModules.push([38,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

eval("module.exports = React;\n\n//# sourceURL=webpack:///external_%22React%22?");

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction makeLabel(label) {\n    var newLabel = label.split(/(?=[A-Z])/).map(function (s) { return s.toLowerCase(); }).join(\" \");\n    newLabel = newLabel[0].toUpperCase() + newLabel.slice(1);\n    return newLabel;\n}\nexports.makeLabel = makeLabel;\n;\n\n\n//# sourceURL=webpack:///./build/utils/label.js?");

/***/ }),

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\nvar React = __webpack_require__(0);\nvar core_1 = __webpack_require__(16);\nvar primitive_input_1 = __webpack_require__(30);\nvar object_input_1 = __webpack_require__(31);\nvar array_input_1 = __webpack_require__(21);\nvar label_1 = __webpack_require__(19);\nvar Input = (function (_super) {\n    tslib_1.__extends(Input, _super);\n    function Input() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    Input.prototype.render = function () {\n        var _a = this.props, field = _a.field, model = _a.model, onChange = _a.onChange;\n        if (field.type === 'object') {\n            return React.createElement(object_input_1.ObjectInput, { field: field, model: model, onChange: onChange });\n        }\n        if (field.type === 'array') {\n            return React.createElement(array_input_1.ArrayInput, { field: field, model: model, onChange: onChange });\n        }\n        if (field.type === 'date-interval')\n            return null;\n        var label = field.label || label_1.makeLabel('' + field.key);\n        return React.createElement(core_1.FormGroup, { label: label, key: field.key, inline: true },\n            React.createElement(primitive_input_1.PrimitiveInput, { type: field.type, model: model[field.key], onChange: onChange }));\n    };\n    return Input;\n}(React.Component));\nexports.Input = Input;\n\n\n//# sourceURL=webpack:///./build/input/input.js?");

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\nvar React = __webpack_require__(0);\nvar core_1 = __webpack_require__(16);\nvar label_1 = __webpack_require__(19);\nvar input_1 = __webpack_require__(20);\nvar ArrayInput = (function (_super) {\n    tslib_1.__extends(ArrayInput, _super);\n    function ArrayInput() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    ArrayInput.prototype.isRightArrayType = function (type, value) {\n        if (type === 'size-bytes')\n            return value.match(/some-bytes-regexp/);\n        if (type === 'number')\n            return !isNaN(value);\n        if (type === 'string')\n            return typeof value === 'string';\n        if (type === 'boolean')\n            return value === 'True' || value === 'False';\n        var keys = Object.keys(value);\n        if (type.every(function (t) { return keys.indexOf('' + t.key) > -1 || t.optional; }) && keys.every(function (k) { return !!type.find(function (t) { return t.key === k; }); }))\n            return true;\n        return false;\n    };\n    ArrayInput.prototype.guessArrayItemField = function (key, possibleTypes, value) {\n        for (var i = 0; i < possibleTypes.length; i++) {\n            var t = possibleTypes[i];\n            if (this.isRightArrayType(t, value)) {\n                if (Array.isArray(t)) {\n                    return { key: key, type: 'object', types: t };\n                }\n                else {\n                    return { key: key, type: t };\n                }\n            }\n        }\n        throw new Error(\"Could not match \" + value + \" with any given type\");\n    };\n    ArrayInput.prototype.render = function () {\n        var _this = this;\n        var _a = this.props, field = _a.field, model = _a.model, onChange = _a.onChange;\n        var values = model[field.key];\n        var label = field.label || label_1.makeLabel('' + field.key);\n        var onValueChange = function (newValue, index) {\n            var newArray = values.concat();\n            newArray[index] = newValue;\n            onChange(newArray);\n        };\n        return React.createElement(React.Fragment, { key: field.key },\n            React.createElement(core_1.FormGroup, { label: label, inline: true }),\n            values.map(function (value, i) {\n                var _field = _this.guessArrayItemField(i, field.itemsTypes, value);\n                return React.createElement(input_1.Input, { key: _field.key, field: _field, model: values, onChange: function (v) { return onValueChange(v, i); } });\n            }));\n    };\n    return ArrayInput;\n}(React.Component));\nexports.ArrayInput = ArrayInput;\n\n\n//# sourceURL=webpack:///./build/array-input/array-input.js?");

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\nvar React = __webpack_require__(0);\nvar core_1 = __webpack_require__(16);\nvar PrimitiveInput = (function (_super) {\n    tslib_1.__extends(PrimitiveInput, _super);\n    function PrimitiveInput(props, context) {\n        var _this = _super.call(this, props, context) || this;\n        _this.state = {};\n        return _this;\n    }\n    PrimitiveInput.prototype.renderNumberInput = function () {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.NumericInput, { value: model, onValueChange: function (v) {\n                if (isNaN(v))\n                    return;\n                onChange(v);\n            } });\n    };\n    PrimitiveInput.prototype.renderSizeBytesInput = function () {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.NumericInput, { value: model, onValueChange: function (v) {\n                if (isNaN(v))\n                    return;\n                onChange(v);\n            }, min: 0, stepSize: 1000, majorStepSize: 1000000 });\n    };\n    PrimitiveInput.prototype.renderStringInput = function () {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.InputGroup, { value: model, onChange: function (v) {\n                onChange(v.target.value);\n            } });\n    };\n    PrimitiveInput.prototype.renderBooleanInput = function () {\n        var _a = this.props, model = _a.model, onChange = _a.onChange;\n        return React.createElement(core_1.HTMLSelect, { options: [\"True\", \"False\"], value: model === true ? \"True\" : \"False\", onChange: function (e) {\n                onChange(e.currentTarget.value === \"True\");\n            } });\n    };\n    PrimitiveInput.prototype.render = function () {\n        var type = this.props.type;\n        switch (type) {\n            case 'number': return this.renderNumberInput();\n            case 'size-bytes': return this.renderSizeBytesInput();\n            case 'string': return this.renderStringInput();\n            case 'boolean': return this.renderBooleanInput();\n            default: throw new Error(\"Unknown field type '\" + type + \"'\");\n        }\n    };\n    return PrimitiveInput;\n}(React.Component));\nexports.PrimitiveInput = PrimitiveInput;\n\n\n//# sourceURL=webpack:///./build/primitive-input/primitive-input.js?");

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\nvar React = __webpack_require__(0);\nvar core_1 = __webpack_require__(16);\nvar auto_form_1 = __webpack_require__(32);\nvar label_1 = __webpack_require__(19);\nvar ObjectInput = (function (_super) {\n    tslib_1.__extends(ObjectInput, _super);\n    function ObjectInput() {\n        return _super !== null && _super.apply(this, arguments) || this;\n    }\n    ObjectInput.prototype.render = function () {\n        var _a = this.props, onChange = _a.onChange, field = _a.field, model = _a.model;\n        var label = field.label || label_1.makeLabel('' + field.key);\n        return React.createElement(React.Fragment, { key: field.key },\n            React.createElement(core_1.FormGroup, { label: label, inline: true }),\n            React.createElement(auto_form_1.AutoForm, { schema: field.types, model: model[field.key], onChange: onChange }));\n    };\n    return ObjectInput;\n}(React.Component));\nexports.ObjectInput = ObjectInput;\n\n\n//# sourceURL=webpack:///./build/object-input/object-input.js?");

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\nvar React = __webpack_require__(0);\nvar input_1 = __webpack_require__(20);\nvar AutoForm = (function (_super) {\n    tslib_1.__extends(AutoForm, _super);\n    function AutoForm() {\n        var _this = _super !== null && _super.apply(this, arguments) || this;\n        _this.renderField = function (field) {\n            var _a = _this.props, model = _a.model, onChange = _a.onChange;\n            return React.createElement(input_1.Input, { key: field.key, field: field, model: model, onChange: function (v) {\n                    var _a;\n                    return onChange(Object.assign({}, model, (_a = {}, _a[field.key] = v, _a)));\n                } });\n        };\n        return _this;\n    }\n    AutoForm.prototype.render = function () {\n        var _a = this.props, schema = _a.schema, model = _a.model;\n        return React.createElement(\"div\", { className: \"auto-form\" }, model && schema.map(this.renderField));\n    };\n    return AutoForm;\n}(React.Component));\nexports.AutoForm = AutoForm;\n\n\n//# sourceURL=webpack:///./build/auto-form/auto-form.js?");

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar React = __webpack_require__(0);\nvar ReactDOM = __webpack_require__(7);\nvar blue_herring_1 = __webpack_require__(39);\nvar schema = [\n    { key: 'dataSource', type: 'string' },\n    { key: 'parser', type: 'object', types: [\n            { key: 'type', type: 'string' },\n            { key: 'parseSpec', type: 'object', types: [\n                    { key: 'format', type: 'string' },\n                    { key: 'timestampSpec', type: 'object', types: [\n                            { key: 'column', type: 'string' },\n                            { key: 'format', type: 'string' }\n                        ] },\n                    { key: 'dimensionsSpec', type: 'object', types: [\n                            { key: 'dimensions', type: 'array', itemsTypes: [\n                                    'string',\n                                    [{ key: 'type', type: 'string' }, { key: 'name', type: 'string' }]\n                                ] },\n                            { key: 'dimensionExclusions', type: 'array', itemsTypes: ['string'] },\n                            { key: 'spatialDimensions', type: 'array', itemsTypes: ['string'] }\n                        ] },\n                ] },\n        ] },\n    { key: 'metricsSpec', type: 'array', itemsTypes: [\n            [{ key: 'type', type: 'string' }, { key: 'name', type: 'string' }, { key: 'fieldName', type: 'string', optional: true }],\n        ] },\n    { key: 'granularitySpec', type: 'object', types: [\n            { key: 'segmentGranularity', type: 'string' },\n            { key: 'queryGranularity', type: 'string' },\n            {\n                key: 'intervals',\n                type: 'date-interval',\n                stringToInterval: function (s) { return s.split('/').map(function (_s) { return new Date(_s); }); },\n                intervalToString: function (dates) { return dates[0].toLocaleDateString('en-US') + '/' + dates[1].toLocaleDateString('en-US'); }\n            }\n        ] }\n];\nvar model = {\n    dataSource: \"wikipedia\",\n    parser: {\n        type: \"string\",\n        parseSpec: {\n            format: \"json\",\n            timestampSpec: {\n                column: \"timestamp\",\n                format: \"auto\"\n            },\n            dimensionsSpec: {\n                dimensions: [\n                    \"page\",\n                    \"language\",\n                    \"user\",\n                    \"unpatrolled\",\n                    \"newPage\",\n                    \"robot\",\n                    \"anonymous\",\n                    \"namespace\",\n                    \"continent\",\n                    \"country\",\n                    \"region\",\n                    \"city\",\n                    { type: \"long\", name: \"countryNum\" },\n                    { type: \"float\", name: \"userLatitude\" },\n                    { type: \"float\", name: \"userLongitude\" }\n                ],\n                dimensionExclusions: [],\n                spatialDimensions: []\n            }\n        }\n    },\n    metricsSpec: [\n        { type: \"count\", name: \"count\" },\n        { type: \"doubleSum\", name: \"added\", fieldName: \"added\" },\n        { type: \"doubleSum\", name: \"deleted\", fieldName: \"deleted\" },\n        { type: \"doubleSum\", name: \"delta\", fieldName: \"delta\" }\n    ],\n    granularitySpec: {\n        segmentGranularity: \"DAY\",\n        queryGranularity: \"NONE\",\n        intervals: [\"2013-08-31/2013-09-01\"]\n    },\n    transformSpec: null\n};\nvar onChange = function (newValue) {\n    model = newValue;\n    console.log(model);\n    render();\n};\nvar onSchemaChange = function (newSchema) {\n    schema = newSchema;\n    render();\n};\nvar render = function () {\n    ReactDOM.render(React.createElement(blue_herring_1.AutoForm, { model: model, schema: schema, onChange: onChange, onSchemaChange: onSchemaChange }), document.getElementsByClassName('auto-form-demo-target')[0]);\n};\nrender();\n\n\n//# sourceURL=webpack:///./demo/auto-form.tsx?");

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\ntslib_1.__exportStar(__webpack_require__(21), exports);\ntslib_1.__exportStar(__webpack_require__(32), exports);\ntslib_1.__exportStar(__webpack_require__(20), exports);\ntslib_1.__exportStar(__webpack_require__(31), exports);\ntslib_1.__exportStar(__webpack_require__(30), exports);\ntslib_1.__exportStar(__webpack_require__(54), exports);\n\n\n//# sourceURL=webpack:///./build/blue-herring.js?");

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar tslib_1 = __webpack_require__(2);\nvar React = __webpack_require__(0);\nvar core_1 = __webpack_require__(16);\nvar icons_1 = __webpack_require__(33);\nvar ICONS = {\n    number: icons_1.IconNames.NUMERICAL,\n    \"size-bytes\": icons_1.IconNames.ZOOM_TO_FIT,\n    boolean: icons_1.IconNames.SEGMENTED_CONTROL,\n    string: icons_1.IconNames.FONT\n};\nvar TypePicker = (function (_super) {\n    tslib_1.__extends(TypePicker, _super);\n    function TypePicker(props) {\n        var _this = _super.call(this, props) || this;\n        _this.state = {};\n        return _this;\n    }\n    TypePicker.prototype.render = function () {\n        var _this = this;\n        var _a = this.props, type = _a.type, onChange = _a.onChange;\n        var open = this.state.open;\n        var menu = React.createElement(core_1.Menu, null, Object.keys(ICONS).map(function (t) { return (React.createElement(core_1.MenuItem, { key: t, icon: ICONS[t], text: t, onClick: function () { return onChange(t); }, active: t === type })); }));\n        return React.createElement(core_1.Popover, { isOpen: open, position: core_1.Position.BOTTOM, canEscapeKeyClose: true, onClose: function () { return _this.setState({ open: false }); } },\n            React.createElement(core_1.Button, { onClick: function () { return _this.setState({ open: !open }); }, icon: ICONS[type] }),\n            menu);\n    };\n    return TypePicker;\n}(React.Component));\nexports.TypePicker = TypePicker;\n\n\n//# sourceURL=webpack:///./build/type-picker/type-picker.js?");

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

eval("module.exports = ReactDOM;\n\n//# sourceURL=webpack:///external_%22ReactDOM%22?");

/***/ })

/******/ });