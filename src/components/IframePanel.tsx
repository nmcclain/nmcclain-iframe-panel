import React, { useState, useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { IframeOptions } from 'types';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';

interface Props extends PanelProps<IframeOptions> {}

const getStyles = () => {
  return {
    wrapper: css`
      font-family: Open Sans, sans-serif;
      overflow: hidden;
      position: relative;
    `,
    iframe: css`
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      frameborder: 0;
      display: block;
      transform-origin: 0 0;
      allow: "accelerometer; encrypted-media;"
      allowfullscreen;
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

   const scaleFactor = options.scaleFactor || 1;
   const scaledWidth = width * (1 / scaleFactor);
   const scaledHeight = height * (1 / scaleFactor);

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
            width: ${scaledWidth}px;
            height: ${scaledHeight}px;
            transform: scale(${scaleFactor});
          `
        )}
      ></iframe>
    </div>
  );
};
