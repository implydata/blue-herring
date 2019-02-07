import * as React from 'react';
import { FormGroup } from "@blueprintjs/core";

import { makeLabel } from '../utils/label'
import { AutoFormField, ArrayType, ArrayItemsType } from '../types/types';
import { Input } from '../input/input';

export interface ArrayInputProps extends React.Props<any> {
  field: AutoFormField & ArrayType;
  model: any;
  onChange: (newModel: any) => void;
}

export class ArrayInput extends React.Component<ArrayInputProps, {}> {

  isRightArrayType(type: ArrayItemsType, value: any): boolean {
    // TODO
    if (type === 'size-bytes') return value.match(/some-bytes-regexp/);

    if (type === 'number') return !isNaN(value);
    if (type === 'string') return typeof value === 'string';
    if (type === 'boolean') return value === 'True' || value === 'False';


    const keys = Object.keys(value);
    if (type.every(t => keys.indexOf('' + t.key) > -1 || t.optional) && keys.every(k => !!type.find( t => t.key === k))) return true;

    return false;
  }

  guessArrayItemField(key: any, possibleTypes: ArrayItemsType[], value: any): AutoFormField {
    for (let i = 0; i < possibleTypes.length; i++) {
      const t = possibleTypes[i];

      if (this.isRightArrayType(t, value)) {
        if (Array.isArray(t)) {
          return {key, type: 'object', types: t};
        } else {
          return {key, type: t}
        }
      }
    }

    throw new Error(`Could not match ${value} with any given type`);
  }

  render() {
    const { field, model, onChange } = this.props;

    const values = model[field.key] as any[];

    const label = field.label || makeLabel('' + field.key);

    const onValueChange = (newValue: any, index: number) => {
      const newArray = values.concat();
      newArray[index] = newValue;
      onChange(newArray);
    };

    return <React.Fragment key={field.key}>
      <FormGroup label={label} inline/>

      {values.map((value, i) => {
        const _field = this.guessArrayItemField(i, field.itemsTypes, value);

        return <Input
          key={_field.key}
          field={_field}
          model={values}
          onChange={v => onValueChange(v, i)}
        />;
      })}
    </React.Fragment>
  }
}
