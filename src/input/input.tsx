/*
 * Copyright (c) 2018 Imply Data, Inc. All rights reserved.
 *
 * This software is the confidential and proprietary information
 * of Imply Data, Inc.
 */

import * as React from 'react';
import { FormGroup } from "@blueprintjs/core";

import { AutoFormField, ObjectType, ArrayType } from '../types/types';
import { PrimitiveInput } from '../primitive-input/primitive-input';
import { ObjectInput } from '../object-input/object-input';
import { ArrayInput } from '../array-input/array-input';

import { makeLabel } from '../utils/label';


export interface InputProps extends React.Props<any> {
  field: AutoFormField;
  model: any;
  onChange: (newModel: any) => void;
}

export class Input extends React.Component<InputProps, {}> {
  render() {
    const { field, model, onChange } = this.props;

    if (field.type === 'object') {
      return <ObjectInput
        field={field}
        model={model}
        onChange={onChange}
      />;
    }

    if (field.type === 'array') {
      return <ArrayInput
        field={field}
        model={model}
        onChange={onChange}
      />;
    }

    if (field.type === 'date-interval') return null;

    const label = field.label || makeLabel('' + field.key);

    return <FormGroup label={label} key={field.key} inline>
      <PrimitiveInput type={field.type} model={model[field.key]} onChange={onChange}/>
    </FormGroup>;
  }
}
