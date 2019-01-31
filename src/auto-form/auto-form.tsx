import * as React from 'react';
import {
  FormGroup,
  InputGroup,
  NumericInput,
  TagInput,
  HTMLSelect
} from "@blueprintjs/core";

export interface AutoFormField {
  name: string;
  label?: string;
  type: 'number' | 'size-bytes' | 'string' | 'boolean' | 'string-array';
  min?: number;
}

export interface AutoFormProps<T> extends React.Props<any> {
  fields: AutoFormField[];
  model: T | null,
  onChange: (newValue: T) => void
}

export interface AutoFormState<T> {
}

export class AutoForm<T> extends React.Component<AutoFormProps<T>, AutoFormState<T>> {
  static makeLabelName(label: string): string {
    let newLabel = label.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(" ");
    newLabel = newLabel[0].toUpperCase() + newLabel.slice(1);
    return newLabel;
  }

  constructor(props: AutoFormProps<T>) {
    super(props);
    this.state = {
    }
  }

  private renderNumberInput(field: AutoFormField): JSX.Element {
    const { model, onChange } = this.props;

    return <NumericInput
      value={(model as any)[field.name]}
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
      value={(model as any)[field.name]}
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
      value={(model as any)[field.name]}
      onChange={(v: any) => {
        onChange(Object.assign({}, model, { [field.name]: v.target.value }));
      }}
    />;
  }

  private renderBooleanInput(field: AutoFormField): JSX.Element {
    const { model, onChange } = this.props;

    return <HTMLSelect
      options={["True", "False"]}
      value={(model as any)[field.name] === true ? "True" : "False"}
      onChange={e => {
        onChange(Object.assign({}, model, { [field.name]: e.currentTarget.value === "True" }));
      }}
    />
  }

  private renderStringArrayInput(field: AutoFormField): JSX.Element {
    const { model, onChange } = this.props;

    return <TagInput
      values={(model as any)[field.name] || []}
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

  renderField(field: AutoFormField) {
    const label = field.label || AutoForm.makeLabelName(field.name);
    return <FormGroup label={label} key={field.name}>
      {this.renderFieldInput(field)}
    </FormGroup>
  }

  render() {
    const { fields, model } = this.props;

    return <div className="auto-form">
      {model && fields.map(field => this.renderField(field))}
    </div>
  }
}
