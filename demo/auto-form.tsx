
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AutoForm, AutoFormField } from 'blue-herring';

let fields: AutoFormField[] = [
  {name: 'Field #0', type: 'string'},
  {name: 'Field #1', type: 'number'},
  {name: 'Field #2', type: 'boolean'},
  {name: 'Field #3', type: 'string-array'},
  {name: 'Field #4', type: 'size-bytes'},
  {name: 'I am a sub-form', type: [
    {name: 'Field #5', type: 'number'},
    {name: 'Field #6', type: 'boolean'},
    {name: 'Field #7', type: 'string-array'}
  ]}
];

let model: any = {
  'Unknown field': true,
  'Unknown complex field': {
    'Foo': 42,
    Bar: ['a', 'b', 'c']
  },
  'I am a sub-form': {
    'Nested unknown field': 'Hello'
  }
};

const onChange = (newValue: any) => {
  model = newValue;
  console.log(model)
  render();
};

const onSchemaChange = (newSchema: AutoFormField[]) => {
  fields = newSchema;
  render();
};
const render = () => {
  ReactDOM.render(

<AutoForm
  model={model}
  fields={fields}
  onChange={onChange}
  onSchemaChange={onSchemaChange}
/>
    ,
    document.getElementsByClassName('auto-form-demo-target')[0]
  );
};

render();
