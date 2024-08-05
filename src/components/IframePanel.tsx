import React, { useState, useEffect, useRef } from 'react';
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
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { // prevents iframe from interfering with resizing
    setIsResizing(true);

    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      setIsResizing(false);
    }, 100);

    return () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [width, height]);

  if (!options ||!options.src) {
    return (
      <div className={styles.wrapper}>
        <div>
          Please provide a source URL for the IFrame.
        </div>
      </div>
    );
  }

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
      <iframe
        title='IFrame'
        src={options.src}
        className={cx(
          styles.iframe,
          css`
            pointer-events: ${(isResizing || options.disableInteractivity) ? 'none' : 'auto'};
          `
        )}
      ></iframe>
    </div>
  );
};
