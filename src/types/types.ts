export type PrimitiveType = 'number' | 'size-bytes' | 'string' | 'boolean';

export type AutoFormField = {
  key: string | number;
  label?: string;
} & (SimpleType | ObjectType | ArrayType | DateIntervalType)

export type Optional = {
  optional?: true;
}

export type SimpleType = {
  type: PrimitiveType;
}

export type ObjectType = {
  type: 'object';
  types: AutoFormField[];
}

export type ArrayType = {
  type: 'array';
  itemsTypes: ArrayItemsType[];
}

export type ArrayItemsType = (PrimitiveType | AutoFormField[]);

export type DateIntervalType = {
  type: 'date-interval';
  stringToInterval: (s: string) => [Date, Date];
  intervalToString: (d: [Date, Date]) => string;
}

export function isPrimitive(type: any): type is PrimitiveType {
  return type === 'number' || type === 'size-bytes' || type === 'string' || type === 'boolean';
}
