import * as React from 'react';

import { render, fireEvent } from 'react-testing-library';
import userEvent from 'user-event';
import { shallow, mount } from 'enzyme';

import { AutoForm, AutoFormField } from './auto-form';

describe('<AutoForm/>', () => {

  // react-testing-library
  it('fills a flat form at startup (react-testing-library)', () => {
    const fields: AutoFormField[] = [
      {name: "string", type: "string"},
      {name: "number", type: "number"},
      {name: "boolean", type: "boolean"},
      {name: "string_array", type: "string-array"},
      {name: "size_bytes", type: "size-bytes"}
    ];

    const originalModel = {
      string: 'Hello',
      number: 23,
      boolean: true,
      string_array: ['3', 'yes', 'this is dog'],
      size_bytes: 42
    };

    let model: typeof originalModel;

    const onChange = (newModel: typeof originalModel) => model = newModel;

    const comp = <AutoForm fields={fields} model={originalModel} onChange={onChange} />;


    const { container, getByValue, getByText } = render(comp);

    expect(container.firstChild).toMatchSnapshot();

    userEvent.type(getByValue('Hello'), '¡Hola!');
    expect(originalModel.string).toEqual('Hello');
    expect(model.string).toEqual('¡Hola!');

    userEvent.type(getByValue('23'), '42');
    expect(originalModel.number).toEqual(23);
    expect(model.number).toEqual(42);

    fireEvent.change(getByText('True').parentElement, {target: {value: 'False'}})
    expect(originalModel.boolean).toEqual(true);
    expect(model.boolean).toEqual(false);

    // userEvent.click(getByText('yes'));
    // userEvent.type(window, 'mwar');
    // fireEvent.keyPress(window, {which: 'enter'})
    // expect(originalModel.string_array).toEqual(['3', 'yes', 'this is dog']);
    // expect(model.string_array).toEqual(['3', 'mwar', 'this is dog'])

  });

  // Enzyme
  it('fills a flat form at startup (enzyme)', () => {
    const fields: AutoFormField[] = [
      {name: "string", type: "string"},
      {name: "number", type: "number"},
      {name: "boolean", type: "boolean"},
      {name: "string_array", type: "string-array"},
      {name: "size_bytes", type: "size-bytes"}
    ];

    const originalModel = {
      string: 'Hello',
      number: 23,
      boolean: true,
      string_array: ['3', 'yes', 'this is dog'],
      size_bytes: 42
    };

    let model: typeof originalModel;

    const onChange = (newModel: typeof originalModel) => model = newModel;

    const comp = <AutoForm fields={fields} model={originalModel} onChange={onChange} />;
    const shallowed = shallow(comp);
    expect(shallowed).toMatchSnapshot();

    const mounted = mount(comp);
    mounted.find('input[value="Hello"]').simulate('change', {target: {value: '¡Hola!'}});
    expect(originalModel.string).toEqual('Hello');
    expect(model.string).toEqual('¡Hola!');
  });
});
