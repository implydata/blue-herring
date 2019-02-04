"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var core_1 = require("@blueprintjs/core");
var type_picker_1 = require("../type-picker/type-picker");
var AutoForm = (function (_super) {
    tslib_1.__extends(AutoForm, _super);
    function AutoForm(props) {
        var _this = _super.call(this, props) || this;
        _this.renderField = function (field, index) {
            if (Array.isArray(field.type)) {
                return _this.renderSubForm(field, index);
            }
            var label = field.label || AutoForm.makeLabelName(field.name);
            return React.createElement(core_1.FormGroup, { label: label, key: field.name },
                React.createElement(core_1.ControlGroup, null,
                    index > -1 ? _this.renderTypePicker(field, index) : null,
                    _this.renderFieldInput(field)));
        };
        _this.state = {};
        return _this;
    }
    AutoForm.makeLabelName = function (label) {
        var newLabel = label.split(/(?=[A-Z])/).map(function (s) { return s.toLowerCase(); }).join(" ");
        newLabel = newLabel[0].toUpperCase() + newLabel.slice(1);
        return newLabel;
    };
    AutoForm.prototype.renderNumberInput = function (field) {
        var _a = this.props, model = _a.model, onChange = _a.onChange;
        return React.createElement(core_1.NumericInput, { value: model[field.name], onValueChange: function (v) {
                var _a;
                if (isNaN(v))
                    return;
                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = v, _a)));
            }, min: field.min || 0 });
    };
    AutoForm.prototype.renderSizeBytesInput = function (field) {
        var _a = this.props, model = _a.model, onChange = _a.onChange;
        return React.createElement(core_1.NumericInput, { value: model[field.name], onValueChange: function (v) {
                var _a;
                if (isNaN(v))
                    return;
                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = v, _a)));
            }, min: 0, stepSize: 1000, majorStepSize: 1000000 });
    };
    AutoForm.prototype.renderStringInput = function (field) {
        var _a = this.props, model = _a.model, onChange = _a.onChange;
        return React.createElement(core_1.InputGroup, { value: model[field.name], onChange: function (v) {
                var _a;
                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = v.target.value, _a)));
            } });
    };
    AutoForm.prototype.renderBooleanInput = function (field) {
        var _a = this.props, model = _a.model, onChange = _a.onChange;
        return React.createElement(core_1.HTMLSelect, { options: ["True", "False"], value: model[field.name] === true ? "True" : "False", onChange: function (e) {
                var _a;
                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = e.currentTarget.value === "True", _a)));
            } });
    };
    AutoForm.prototype.renderStringArrayInput = function (field) {
        var _a = this.props, model = _a.model, onChange = _a.onChange;
        return React.createElement(core_1.TagInput, { values: model[field.name] || [], onChange: function (v) {
                var _a;
                onChange(Object.assign({}, model, (_a = {}, _a[field.name] = v, _a)));
            }, addOnBlur: true });
    };
    AutoForm.prototype.renderFieldInput = function (field) {
        switch (field.type) {
            case 'number': return this.renderNumberInput(field);
            case 'size-bytes': return this.renderSizeBytesInput(field);
            case 'string': return this.renderStringInput(field);
            case 'boolean': return this.renderBooleanInput(field);
            case 'string-array': return this.renderStringArrayInput(field);
            default: throw new Error("unknown field type '" + field.type + "'");
        }
    };
    AutoForm.prototype.renderSubForm = function (field, fieldIndex) {
        var _a = this.props, model = _a.model, onChange = _a.onChange, level = _a.level, onSchemaChange = _a.onSchemaChange, fields = _a.fields;
        var subModel = model[field.name] || {};
        var onSubModelChange = function (newSubModel) {
            var _a;
            onChange(Object.assign({}, model, (_a = {}, _a[field.name] = newSubModel, _a)));
        };
        var onSubSchemaChange = function (newSubSchema) {
            var newFields = fields.concat();
            newFields[fieldIndex] = Object.assign({}, field, { type: newSubSchema });
            onSchemaChange(newFields);
        };
        var label = field.label || AutoForm.makeLabelName(field.name);
        return React.createElement(React.Fragment, { key: field.name },
            React.createElement(core_1.FormGroup, { label: label }),
            React.createElement(AutoForm, { level: level + 1, model: subModel, fields: field.type, onChange: onSubModelChange, onSchemaChange: fieldIndex > -1 ? onSubSchemaChange : null }));
    };
    AutoForm.prototype.renderTypePicker = function (field, i) {
        var _a = this.props, onSchemaChange = _a.onSchemaChange, fields = _a.fields;
        if (!onSchemaChange)
            return null;
        if (Array.isArray(field.type))
            return null;
        return React.createElement(type_picker_1.TypePicker, { type: field.type, onChange: function (type) {
                var newFields = fields.concat();
                newFields[i] = Object.assign({}, field, { type: type });
                onSchemaChange(newFields);
            } });
    };
    AutoForm.prototype.guessField = function (model, key) {
        var _this = this;
        var value = model[key];
        if (Array.isArray(value))
            return { name: key, type: 'string-array' };
        if (typeof value === 'number')
            return { name: key, type: 'number' };
        if (value === true || value === false)
            return { name: key, type: 'boolean' };
        if (value === Object(value)) {
            return {
                name: key,
                type: Object.keys(value).map(function (k) { return _this.guessField(value, k); })
            };
        }
        return { name: key, type: 'string' };
    };
    AutoForm.prototype.renderUnknownFields = function (model, fields) {
        var _this = this;
        var knownKeys = {};
        fields.forEach(function (f) { return knownKeys[f.name] = true; });
        var keys = Object.keys(model);
        return keys.map(function (key) {
            if (knownKeys[key])
                return null;
            var field = _this.guessField(model, key);
            return _this.renderField(field, -1);
        });
    };
    AutoForm.prototype.render = function () {
        var _a = this.props, fields = _a.fields, model = _a.model, level = _a.level;
        return React.createElement("div", { className: "auto-form", style: { marginLeft: level * 20 } },
            model && fields.map(this.renderField),
            model && this.renderUnknownFields(model, fields));
    };
    AutoForm.defaultProps = {
        level: 0
    };
    return AutoForm;
}(React.Component));
exports.AutoForm = AutoForm;
