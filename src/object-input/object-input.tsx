/*
 * Copyright (c) 2018 Imply Data, Inc. All rights reserved.
 *
 * This software is the confidential and proprietary information
 * of Imply Data, Inc.
 */

import * as React from 'react';

import { FormGroup } from "@blueprintjs/core";

import { AutoForm } from '../auto-form/auto-form';
import { makeLabel } from '../utils/label'
import { AutoFormField, ObjectType } from '../types/types';

export interface ObjectInputProps extends React.Props<any> {
  field: AutoFormField & ObjectType;
  model: any;
  onChange: (newModel: any) => void;
}

export class ObjectInput extends React.Component<ObjectInputProps, {}> {
  render() {
    const { onChange, field, model } = this.props;

    const label = field.label || makeLabel('' + field.key);

    return <React.Fragment key={field.key}>
      <FormGroup label={label} inline/>
      <AutoForm
        schema={field.types}
        model={model[field.key]}
        onChange={onChange}
      />
    </React.Fragment>;
  }
}
