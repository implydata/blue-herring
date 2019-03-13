/*
 * Copyright (c) 2018 Imply Data, Inc. All rights reserved.
 *
 * This software is the confidential and proprietary information
 * of Imply Data, Inc.
 */

import * as React from 'react';
import * as classNames from 'classnames';
import { FormGroup, ControlGroup } from "@blueprintjs/core";

import { AutoFormField, ObjectType, ArrayType, PrimitiveType } from '../types/types';
import { PrimitiveInput } from '../primitive-input/primitive-input';
import { ObjectInput } from '../object-input/object-input';
import { ArrayInput } from '../array-input/array-input';
import { TypePicker } from '../type-picker/type-picker';

import { makeLabel } from '../utils/label';

import './input.scss';

class Tab extends React.Component {
  render() {return <div style={{marginLeft: 20}}>{this.props.children}</div>;}
}

export interface InputProps extends React.Props<any> {
  field: AutoFormField;
  model: any;
  onChange: (newModel: any) => void;
  possibleTypes?: (PrimitiveType | AutoFormField[])[];
  className?: string;
}

export class Input extends React.Component<InputProps, {}> {
  render() {
    const { field, model, onChange, possibleTypes, className } = this.props;

    if (field.type === 'object') {
      return <ObjectInput
        className={className}
        field={field}
        model={model[field.key]}
        onChange={onChange}
        possibleTypes={possibleTypes}
      />;
    }

    if (field.type === 'array') {
      return <ArrayInput
        className={className}
        field={field}
        model={model[field.key]}
        onChange={onChange}
      />;
    }

    if (field.type === 'date-interval') return null;

    const label = field.label || makeLabel('' + field.key);

    return <div className={classNames('input', className)}>
      <TypePicker label={label} type={field.type} onChange={t => console.log(t)} types={possibleTypes}/>
      <PrimitiveInput type={field.type} model={model[field.key]} onChange={onChange}/>
    </div>;
  }
}
