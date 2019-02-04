import * as React from 'react';
import { PrimitiveValue } from '../types/types';
export interface AutoFormField {
    name: string;
    label?: string;
    type: PrimitiveValue | AutoFormField[];
    min?: number;
}
export interface AutoFormProps<T> extends React.Props<any> {
    fields: AutoFormField[];
    model: T | null;
    onChange: (newValue: T) => void;
    onSchemaChange?: (newSchema: AutoFormField[]) => void;
    level?: number;
}
export interface AutoFormState<T> {
}
export declare class AutoForm<T extends {
    [key: string]: any;
}> extends React.Component<AutoFormProps<T>, AutoFormState<T>> {
    static defaultProps: {
        level: number;
    };
    static makeLabelName(label: string): string;
    constructor(props: AutoFormProps<T>);
    private renderNumberInput;
    private renderSizeBytesInput;
    private renderStringInput;
    private renderBooleanInput;
    private renderStringArrayInput;
    renderFieldInput(field: AutoFormField): JSX.Element;
    renderSubForm(field: AutoFormField, fieldIndex: number): JSX.Element;
    renderTypePicker(field: AutoFormField, i: number): JSX.Element;
    renderField: (field: AutoFormField, index: number) => JSX.Element;
    guessField(model: any, key: string): AutoFormField;
    renderUnknownFields(model: T, fields: AutoFormField[]): JSX.Element[];
    render(): JSX.Element;
}
