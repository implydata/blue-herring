
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { AutoForm, AutoFormField } from 'blue-herring';

const fields: AutoFormField[] = [
  {
    label: 'Foo',
    name: 'foo',
    type: 'string'
  }
];

let model: any = {
  foo: 'Hello yes this is dog'
};

const onChange = (newValue: any) => {
  model = newValue;
  render();
}
const render = () => {
  ReactDOM.render(

<AutoForm
  model={model}
  fields={fields}
  onChange={onChange}
/>
    ,
    document.getElementsByClassName('auto-form-demo-target')[0]
  );
};

render();
