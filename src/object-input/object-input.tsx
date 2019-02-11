/*
 * Copyright (c) 2018 Imply Data, Inc. All rights reserved.
 *
 * This software is the confidential and proprietary information
 * of Imply Data, Inc.
 */

import * as React from 'react';

import { FormGroup, Button } from "@blueprintjs/core";
import * as classNames from 'classnames';

import { AutoForm } from '../auto-form/auto-form';
import { makeLabel } from '../utils/label'
import { AutoFormField, ObjectType, PrimitiveType } from '../types/types';
import { Input } from '../input/input';
import { TypePicker } from '../type-picker/type-picker';

export interface ObjectInputProps extends React.Props<any> {
  field: AutoFormField & ObjectType;
  model: any;
  onChange: (newModel: any) => void;
  possibleTypes?: (PrimitiveType | AutoFormField[])[];
  className?: string;
}

export interface ObjectInputState {
  collapsed?: boolean;
}

export class ObjectInput extends React.Component<ObjectInputProps, ObjectInputState> {
  constructor(props: ObjectInputProps, context: any) {
    super(props, context);

    this.state = {};
  }

  renderField = (field: AutoFormField) => {
    const { model, onChange } = this.props;

    return <Input
      className="object-field"
      key={field.key}
      field={field}
      model={model}
      onChange={v => onChange(Object.assign({}, model, {[field.key]: v}))}
    />;
  }

  onFold = () => {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed
    });
  }

  render() {
    const { onChange, field, model, possibleTypes, className } = this.props;
    const { collapsed } = this.state;

    const label = field.label || makeLabel('' + field.key)

    return <div className={classNames('object-input', className)} key={field.key}>
      <TypePicker
        onFold={this.onFold}
        folded={collapsed}
        type={field.types}
        onChange={t => console.log(t)}
        types={possibleTypes}
        label={label}

      />
      {collapsed ? null : field.types.map(this.renderField)}
    </div>;
  }
}
