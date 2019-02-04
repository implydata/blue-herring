"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var React = require("react");
var core_1 = require("@blueprintjs/core");
var icons_1 = require("@blueprintjs/icons");
var ICONS = {
    number: icons_1.IconNames.NUMERICAL,
    "size-bytes": icons_1.IconNames.ZOOM_TO_FIT,
    "string-array": icons_1.IconNames.TAG,
    boolean: icons_1.IconNames.SEGMENTED_CONTROL,
    string: icons_1.IconNames.FONT
};
var TypePicker = (function (_super) {
    tslib_1.__extends(TypePicker, _super);
    function TypePicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    TypePicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, type = _a.type, onChange = _a.onChange;
        var open = this.state.open;
        var menu = React.createElement(core_1.Menu, null, Object.keys(ICONS).map(function (t) { return (React.createElement(core_1.MenuItem, { key: t, icon: ICONS[t], text: t, onClick: function () { return onChange(t); }, active: t === type })); }));
        return React.createElement(core_1.Popover, { isOpen: open, position: core_1.Position.BOTTOM, canEscapeKeyClose: true, onClose: function () { return _this.setState({ open: false }); } },
            React.createElement(core_1.Button, { onClick: function () { return _this.setState({ open: !open }); }, icon: ICONS[type] }),
            menu);
    };
    return TypePicker;
}(React.Component));
exports.TypePicker = TypePicker;
