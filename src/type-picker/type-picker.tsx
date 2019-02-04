import * as React from 'react';
import {
  Button, Position,
  Menu, MenuItem, MenuDivider, Popover
} from "@blueprintjs/core";

import { IconNames, IconName } from "@blueprintjs/icons";


import { PrimitiveValue } from '../types/types';

const ICONS: Record<PrimitiveValue, IconName> = {
  number: IconNames.NUMERICAL,
  "size-bytes": IconNames.ZOOM_TO_FIT,
  "string-array": IconNames.TAG,
  boolean: IconNames.SEGMENTED_CONTROL,
  string: IconNames.FONT
};

export interface TypePickerProps extends React.Props<any> {
  type: PrimitiveValue;
  onChange: (newType: PrimitiveValue) => void;
}

export interface TypePickerState {
  open?: boolean;
}

export class TypePicker extends React.Component<TypePickerProps, TypePickerState> {

  constructor(props: TypePickerProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, onChange } = this.props;
    const { open } = this.state;

    const menu = <Menu>
      {
        Object.keys(ICONS).map((t: PrimitiveValue) => (
          <MenuItem key={t} icon={ICONS[t]} text={t} onClick={() => onChange(t)} active={t === type}/>
        ))
      }
    </Menu>;

    return <Popover
      isOpen={open}
      position={Position.BOTTOM}
      canEscapeKeyClose
      onClose={() => this.setState({open: false})}
    >
      <Button onClick={() => this.setState({open: !open})} icon={ICONS[type]}/>
      {menu}
    </Popover>;
  }
}
