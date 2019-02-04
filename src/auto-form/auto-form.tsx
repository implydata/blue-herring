import * as React from 'react';
import {
  FormGroup,
  InputGroup,
  ControlGroup,
  NumericInput,
  TagInput,
  HTMLSelect,
  Button,
  Menu, MenuItem, MenuDivider, Popover
} from "@blueprintjs/core";

import { PrimitiveValue } from '../types/types';
import { TypePicker } from '../type-picker/type-picker';

export interface AutoFormField {
  name: string;
  label?: string;
  type: PrimitiveValue | AutoFormField[];
  min?: number;
}

export interface AutoFormProps<T> extends React.Props<any> {
  fields: AutoFormField[];
  model: T | null,
  onChange: (newValue: T) => void
  onSchemaChange?: (newSchema: AutoFormField[]) => void;
  level?: number;
}

export interface AutoFormState<T> {
}

export class AutoForm<T extends {[key: string]: any}> extends React.Component<AutoFormProps<T>, AutoFormState<T>> {
  static defaultProps = {
    level: 0
  }

  static makeLabelName(label: string): string {
    let newLabel = label.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(" ");
    newLabel = newLabel[0].toUpperCase() + newLabel.slice(1);
    return newLabel;
  }

  constructor(props: AutoFormProps<T>) {
    super(props);
    this.state = {};
  }

  private renderNumberInput(field: AutoFormField): JSX.Element {
    const { model, onChange } = this.props;

    return <NumericInput
      value={model[field.name]}
      onValueChange={v => {
        if (isNaN(v)) return;
        onChange(Object.assign({}, model, { [field.name]: v }));
      }}
      min={field.min || 0}
    />;
  }

  private renderSizeBytesInput(field: AutoFormField): JSX.Element {
    const { model, onChange } = this.props;

    return <NumericInput
      value={model[field.name]}
      onValueChange={v => {
        if (isNaN(v)) return;
        onChange(Object.assign({}, model, { [field.name]: v }));
      }}
      min={0}
      stepSize={1000}
      majorStepSize={1000000}
    />;
  }

  private renderStringInput(field: AutoFormField): JSX.Element {
    const { model, onChange } = this.props;

    return <InputGroup
      value={model[field.name]}
      onChange={(v: any) => {
        onChange(Object.assign({}, model, { [field.name]: v.target.value }));
      }}
    />;
  }

  private renderBooleanInput(field: AutoFormField): JSX.Element {
    const { model, onChange } = this.props;

    return <HTMLSelect
      options={["True", "False"]}
      value={model[field.name] === true ? "True" : "False"}
      onChange={e => {
        onChange(Object.assign({}, model, { [field.name]: e.currentTarget.value === "True" }));
      }}
    />;
  }

  private renderStringArrayInput(field: AutoFormField): JSX.Element {
    const { model, onChange } = this.props;

    return <TagInput
      values={model[field.name] || []}
      onChange={(v: any) => {
        onChange(Object.assign({}, model, { [field.name]: v }));
      }}
      addOnBlur={true}
    />;
  }

  renderFieldInput(field: AutoFormField) {
    switch (field.type) {
      case 'number': return this.renderNumberInput(field);
      case 'size-bytes': return this.renderSizeBytesInput(field);
      case 'string': return this.renderStringInput(field);
      case 'boolean': return this.renderBooleanInput(field);
      case 'string-array': return this.renderStringArrayInput(field);
      default: throw new Error(`unknown field type '${field.type}'`);
    }
  }

  renderSubForm(field: AutoFormField, fieldIndex: number) {
    const { model, onChange, level, onSchemaChange, fields } = this.props;

    const subModel: T = model[field.name] || {};

    const onSubModelChange = (newSubModel: any) => {
      onChange(Object.assign({}, model, { [field.name]: newSubModel }));
    };

    const onSubSchemaChange = (newSubSchema: AutoFormField[]) => {
      const newFields = fields.concat();
      newFields[fieldIndex] = Object.assign({}, field, { type: newSubSchema });
      onSchemaChange(newFields);
    };

    const label = field.label || AutoForm.makeLabelName(field.name);

    return <React.Fragment  key={field.name}>
      <FormGroup label={label}/>
      <AutoForm
        level={level + 1}
        model={subModel}
        fields={field.type as AutoFormField[]}
        onChange={onSubModelChange}
        onSchemaChange={fieldIndex > -1 ? onSubSchemaChange : null}
      />
    </React.Fragment>;
  }

  renderTypePicker(field: AutoFormField, i: number) {
    const { onSchemaChange, fields } = this.props;

    if (!onSchemaChange) return null;

    if (Array.isArray(field.type)) return null;

    return <TypePicker
      type={field.type}
      onChange={type => {
        const newFields = fields.concat();
        newFields[i] = Object.assign({}, field, { type });
        onSchemaChange(newFields);
      }}
    />;
  }

  renderField = (field: AutoFormField, index: number) => {
    if (Array.isArray(field.type)) {
      return this.renderSubForm(field, index);
    }

    const label = field.label || AutoForm.makeLabelName(field.name);
    return <FormGroup label={label} key={field.name}>
      <ControlGroup>
        {index > -1 ? this.renderTypePicker(field, index) : null}
        {this.renderFieldInput(field)}
      </ControlGroup>
    </FormGroup>
  }

  guessField(model: any, key: string): AutoFormField {
    const value = model[key];

    if (Array.isArray(value)) return {name: key, type: 'string-array'};
    if (typeof value === 'number') return {name: key, type: 'number'};
    if (value === true || value === false) return {name: key, type: 'boolean'};

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
    if (value === Object(value)) {
      return {
        name: key,
        type: Object.keys(value).map(k => this.guessField(value, k))
      };
    }

    return {name: key, type: 'string'};
  }

  renderUnknownFields(model: T, fields: AutoFormField[]) {
    const knownKeys: Record<string, boolean> = {};
    fields.forEach(f => knownKeys[f.name] = true);

    const keys = Object.keys(model);

    return keys.map(key => {
      if (knownKeys[key]) return null;

      const field = this.guessField(model, key);
      return this.renderField(field, -1)
    });
  }

  render() {
    const { fields, model, level } = this.props;

    return <div className="auto-form" style={{marginLeft: level * 20}}>
      {model && fields.map(this.renderField)}
      {model && this.renderUnknownFields(model, fields)}
    </div>
  }
}
