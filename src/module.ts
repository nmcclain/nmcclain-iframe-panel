import { PanelPlugin } from '@grafana/data';
import { IframeOptions } from './types';
import { IframePanel } from './components/IframePanel';

export const plugin = new PanelPlugin<IframeOptions>(IframePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'title',
      name: 'IFrame Title',
      description: 'TKDescription of panel option',
      defaultValue: 'External iFrame',
    })
    .addTextInput({
      path: 'src',
      name: 'IFrame Source URL',
      description: 'TKDescription of panel option',
      defaultValue: 'http://example.com',
    })
    .addBooleanSwitch({
      path:'useProxy',
      name: 'Use Server Proxy',
      description: 'Proxy requests through Grafana server for sites that don\'t support IFrames.',
    })
});
