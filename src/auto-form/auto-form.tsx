import * as React from 'react';
import { AutoFormField, ObjectType, ArrayType, ArrayItemsType, PrimitiveType } from '../types/types';
import { Input } from '../input/input';

import './auto-form.scss';

export interface AutoFormProps extends React.Props<any> {
  schema: AutoFormField[];
  model: any;
  onChange: (newValue: any) => void;
  onSchemaChange?: (newSchema: AutoFormField[]) => void;
}

export class AutoForm extends React.Component<AutoFormProps, {}> {
  render() {
    const { schema, model, onChange } = this.props;

    if (!model) return null;

    const field: AutoFormField = {
      type: 'object', types: schema, key: '__root__', label: 'My awesome form'
    };


    return <div className="auto-form">
      <Input
        field={field}
        model={{__root__: model}}
        onChange={onChange}
      />
    </div>;
  }
}
