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

  useEffect(() => { // avoids iframe interfering with resizing
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
        title={options.title}
        src={options.src}
        className={cx(
          styles.iframe,
          css`
            pointer-events: ${isResizing ? 'none' : 'auto'};
          `
        )}
      ></iframe>
    </div>
  );
};
