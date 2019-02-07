import * as React from 'react';
import { AutoFormField, ObjectType, ArrayType, ArrayItemsType, PrimitiveType } from '../types/types';
import { Input } from '../input/input';

export interface AutoFormProps extends React.Props<any> {
  schema: AutoFormField[];
  model: any,
  onChange: (newValue: any) => void
  onSchemaChange?: (newSchema: AutoFormField[]) => void;
}

export class AutoForm extends React.Component<AutoFormProps, {}> {
  renderField = (field: AutoFormField) => {
    const { model, onChange } = this.props;

    return <Input
      key={field.key}
      field={field}
      model={model}
      onChange={v => onChange(Object.assign({}, model, {[field.key]: v}))}
    />;
  }

  render() {
    const { schema, model } = this.props;

    return <div className="auto-form">
      {model && schema.map(this.renderField)}
    </div>
  }
}
