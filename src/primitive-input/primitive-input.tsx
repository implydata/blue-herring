/*
 * Copyright (c) 2018 Imply Data, Inc. All rights reserved.
 *
 * This software is the confidential and proprietary information
 * of Imply Data, Inc.
 */

import * as React from 'react';
import {
  InputGroup,
  NumericInput,
  TagInput,
  HTMLSelect,
} from "@blueprintjs/core";

import { PrimitiveType } from '../types/types';

export interface PrimitiveInputProps extends React.Props<any> {
  type: PrimitiveType;
  model: any;
  onChange: (value: any) => void;
}

export interface PrimitiveInputState {
}

export class PrimitiveInput extends React.Component<PrimitiveInputProps, PrimitiveInputState> {
  constructor(props: PrimitiveInputProps, context: any) {
    super(props, context);
    this.state = {};
  }

  private renderNumberInput(): JSX.Element {
    const { model, onChange } = this.props;

    return <NumericInput
      value={model}
      onValueChange={v => {
        if (isNaN(v)) return;
        onChange(v);
      }}
    />;
  }

  private renderSizeBytesInput(): JSX.Element {
    const { model, onChange } = this.props;

    return <NumericInput
      value={model}
      onValueChange={v => {
        if (isNaN(v)) return;
        onChange(v);
      }}
      min={0}
      stepSize={1000}
      majorStepSize={1000000}
    />;
  }

  private renderStringInput(): JSX.Element {
    const { model, onChange } = this.props;

    return <InputGroup
      value={model}
      onChange={(v: any) => {
        onChange(v.target.value);
      }}
    />;
  }

  private renderBooleanInput(): JSX.Element {
    const { model, onChange } = this.props;

    return <HTMLSelect
      options={["True", "False"]}
      value={model === true ? "True" : "False"}
      onChange={e => {
        onChange(e.currentTarget.value === "True");
      }}
    />;
  }

  render() {
    const { type } = this.props;

    switch (type) {
      case 'number': return this.renderNumberInput();
      case 'size-bytes': return this.renderSizeBytesInput();
      case 'string': return this.renderStringInput();
      case 'boolean': return this.renderBooleanInput();

      default: throw new Error(`Unknown field type '${type}'`);
    }
  }
}
