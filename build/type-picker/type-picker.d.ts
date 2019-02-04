import * as React from 'react';
import { PrimitiveValue } from '../types/types';
export interface TypePickerProps extends React.Props<any> {
    type: PrimitiveValue;
    onChange: (newType: PrimitiveValue) => void;
}
export interface TypePickerState {
    open?: boolean;
}
export declare class TypePicker extends React.Component<TypePickerProps, TypePickerState> {
    constructor(props: TypePickerProps);
    render(): JSX.Element;
}
