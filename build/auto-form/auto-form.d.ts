import * as React from 'react';
export interface AutoFormField {
    name: string;
    label?: string;
    type: 'number' | 'size-bytes' | 'string' | 'boolean' | 'string-array';
    min?: number;
}
export interface AutoFormProps<T> extends React.Props<any> {
    fields: AutoFormField[];
    model: T | null;
    onChange: (newValue: T) => void;
}
export interface AutoFormState<T> {
}
export declare class AutoForm<T> extends React.Component<AutoFormProps<T>, AutoFormState<T>> {
    static makeLabelName(label: string): string;
    constructor(props: AutoFormProps<T>);
    private renderNumberInput;
    private renderSizeBytesInput;
    private renderStringInput;
    private renderBooleanInput;
    private renderStringArrayInput;
    renderFieldInput(field: AutoFormField): JSX.Element;
    renderField(field: AutoFormField): JSX.Element;
    render(): JSX.Element;
}
