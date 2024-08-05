import { PanelPlugin } from '@grafana/data';
import { IframeOptions } from './types';
import { IframePanel } from './components/IframePanel';

export const plugin = new PanelPlugin<IframeOptions>(IframePanel).setPanelOptions((builder) => {
  return builder
    .addTextInput({
      path: 'src',
      name: 'Source URL',
      description: 'IFrame Source URL',
      defaultValue: '',
    })
    .addBooleanSwitch({
      path:'disableInteractivity',
      name: 'Disable Interactivity',
      description: 'Disables interactivity for the IFrame',
      defaultValue: false,
    })
});
