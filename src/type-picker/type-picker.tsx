import * as React from 'react';
import {
  Button, Position,
  Menu, MenuItem, MenuDivider, Popover, Label
} from "@blueprintjs/core";

import { IconNames, IconName } from "@blueprintjs/icons";

import { PrimitiveType, AutoFormField, isPrimitive } from '../types/types';

const ICONS: Record<PrimitiveType, IconName> = {
  number: IconNames.NUMERICAL,
  "size-bytes": IconNames.ZOOM_TO_FIT,
  boolean: IconNames.SEGMENTED_CONTROL,
  string: IconNames.FONT
};

export interface TypePickerProps extends React.Props<any> {
  label?: string;
  type: PrimitiveType | AutoFormField[];
  onChange: (newType: PrimitiveType | AutoFormField[]) => void;
  types: (PrimitiveType | AutoFormField[])[];
  onFold?: () => void;
  folded?: boolean;
}

export interface TypePickerState {
  open?: boolean;
}

export class TypePicker extends React.Component<TypePickerProps, TypePickerState> {

  constructor(props: TypePickerProps) {
    super(props);
    this.state = {};
  }

  renderMenuItem = (field: PrimitiveType | AutoFormField[], index: number) => {
    const { type, onChange } = this.props;

    if (!isPrimitive(field)) {

      const isActive = JSON.stringify(type) === JSON.stringify(field);

      return <MenuItem
        key={index}
        icon={this.getIcon(field)}
        text={'{ ' + field.map(f => f.key).join(', ') + ' }'}
        onClick={() => onChange(field)}
        active={isActive}
      />;
    }

    return <MenuItem
      key={index}
      icon={this.getIcon(field)}
      text={field}
      onClick={() => onChange(field)}
      active={field === type}
    />;
  }

  getIcon(type: (PrimitiveType | AutoFormField[])): IconName {
    if (isPrimitive(type)) return ICONS[type];

    return IconNames.CUBE;
  }

  renderButton() {
    const { type, onChange, types } = this.props;
    const { open } = this.state;

    if (!types) return null;

    return <Popover
      isOpen={open}
      position={Position.BOTTOM}
      canEscapeKeyClose
      onClose={() => this.setState({open: false})}
    >
      <Button minimal onClick={() => this.setState({open: !open})} icon={this.getIcon(type)}/>
      <Menu>
        {types.map(this.renderMenuItem)}
      </Menu>
    </Popover>;
  }

  renderFolder() {
    const { folded, onFold } = this.props;

    return <Button
      onClick={onFold}
      className="folder"
      small
      minimal
      icon={folded ? IconNames.CARET_RIGHT : IconNames.CARET_DOWN}
    />;
  }

  render() {
    const { type, onChange, types, label, onFold } = this.props;
    const { open } = this.state;

    const button = this.renderButton();

    if (!label) return button;

    return <div className="type-picker">
      {onFold ? this.renderFolder() : null}
      <div className="type-picker-label">{label}</div>
      {button}
    </div>;
  }
}
