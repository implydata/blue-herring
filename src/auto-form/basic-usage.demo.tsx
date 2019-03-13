import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Example, Gallery } from 'hear-ye';

import { AutoForm } from './auto-form';
import { AutoFormField } from '../types/types';

export interface DemoState {
  schema?: AutoFormField[];
  model?: any;
}

class Demo extends React.Component<{}, DemoState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      schema: [
        {key: 'dataSource', type: 'string'},
        {key: 'parser', type: 'object', types: [
          {key: 'type', type: 'string'},
          {key: 'parseSpec', type: 'object', types: [
            {key: 'format', type: 'string'},
            {key: 'timestampSpec', type: 'object', types: [
              {key: 'column', type: 'string'},
              {key: 'format', type: 'string'}
            ]},
            {key: 'dimensionsSpec', type: 'object', types: [
              {key: 'dimensions', type: 'array', itemsTypes: [
                'string',
                [{key: 'type', type: 'string'}, {key: 'name', type: 'string'}]
              ]},
              {key: 'dimensionExclusions', type: 'array', itemsTypes: ['string']},
              {key: 'spatialDimensions', type: 'array', itemsTypes: ['string']}
            ]},
          ]},
        ]},
        {key: 'metricsSpec', type: 'array', itemsTypes: [
          [{key: 'type', type: 'string'}, {key: 'name', type: 'string'}],
          [{key: 'type', type: 'string'}, {key: 'name', type: 'string'}, {key: 'fieldName', type: 'string'}],
        ]},
        {key: 'granularitySpec', type: 'object', types: [
          {key: 'segmentGranularity', type: 'string'},
          {key: 'queryGranularity', type: 'string'},
          {
            key: 'intervals',
            type: 'date-interval',
            stringToInterval: (s: string) => s.split('/').map(_s => new Date(_s)) as [Date, Date],
            intervalToString: (dates: [Date, Date]) => dates[0].toLocaleDateString('en-US') + '/' + dates[1].toLocaleDateString('en-US')
          }
        ]}
      ],
      model: {
        dataSource: "wikipedia",
        parser: {
          type: "string",
          parseSpec: {
            format: "json",
            timestampSpec: {
              column: "timestamp",
              format: "auto"
            },
            dimensionsSpec: {
              dimensions: [
                "page",
                "language",
                "user",
                "unpatrolled",
                "newPage",
                "robot",
                "anonymous",
                "namespace",
                "continent",
                "country",
                "region",
                "city",
                {type: "long", name: "countryNum"},
                {type: "float", name: "userLatitude"},
                {type: "float", name: "userLongitude"}
              ],
              dimensionExclusions: [],
              spatialDimensions: []
            }
          }
        },
        metricsSpec: [
          {type: "count", name: "count"},
          {type: "doubleSum", name: "added", fieldName: "added"},
          {type: "doubleSum", name: "deleted", fieldName: "deleted"},
          {type: "doubleSum", name: "delta", fieldName: "delta"}
        ],
        granularitySpec: {
          segmentGranularity: "DAY",
          queryGranularity: "NONE",
          intervals: ["2013-08-31/2013-09-01"]
        },
        transformSpec: null
      }
    }
  }

  onModelChange = (newModel: any) => {
    this.setState({model: newModel});
  }

  onSchemaChange = (newSchema: AutoFormField[]) => {
    this.setState({schema: newSchema});
  }

  render() {
    const { model, schema } = this.state;

    return <AutoForm
      model={model}
      schema={schema}
      onChange={this.onModelChange}
      onSchemaChange={this.onSchemaChange}
    />;
  }
}

Gallery.add({
  path: ['AutoForm'],
  component: <Demo/>
});
