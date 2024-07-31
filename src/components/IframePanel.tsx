import React from 'react';
import { PanelProps } from '@grafana/data';
import { IframeOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';

interface Props extends PanelProps<IframeOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    iframe: css`
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    `,
  };
};

export const IframePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const styles = useStyles2(getStyles);

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      {options.useProxy ? (
        <div>TK TODO: how to bust iframes?</div>
      ) : (
        <iframe title={options.title} src={options.src} className={styles.iframe} ></iframe>
      )}
    </div>
  );
};
