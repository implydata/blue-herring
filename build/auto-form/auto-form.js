"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var core_1 = require("@blueprintjs/core");
var AutoForm = (function (_super) {
    tslib_1.__extends(AutoForm, _super);
    function AutoForm(props) {
        var _this = _super.call(this, props) || this;
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
    AutoForm.prototype.renderField = function (field) {
        var label = field.label || AutoForm.makeLabelName(field.name);
        return React.createElement(core_1.FormGroup, { label: label, key: field.name }, this.renderFieldInput(field));
    };
    AutoForm.prototype.render = function () {
        var _this = this;
        var _a = this.props, fields = _a.fields, model = _a.model;
        return React.createElement("div", { className: "auto-form" }, model && fields.map(function (field) { return _this.renderField(field); }));
    };
    return AutoForm;
}(React.Component));
exports.AutoForm = AutoForm;
