import React, { useState, useEffect, useRef } from 'react';
import { PanelProps } from '@grafana/data';
import { locationService, getTemplateSrv } from '@grafana/runtime';
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
      allow: 'accelerometer; encrypted-media;' allowfullscreen;
    `,
  };
};

const getDashboardID = (path: string): string => {
  const parts = path.split('/');
  if (parts.length >= 3) {
    return parts[2]; // The dashboard id is at index 2 (/d/DASHID/dash-slug)
  }
  return '';
};

export const IframePanel: React.FC<Props> = ({ options, width, height, replaceVariables }) => {
  const styles = useStyles2(getStyles);
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // prevents iframe from interfering with resizing
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

  if (!options || !options.src) {
    return (
      <div className={styles.wrapper}>
        <div>Please provide a source URL for the IFrame.</div>
      </div>
    );
  }

  const scaleFactor = options.scaleFactor || 1;
  const scaledWidth = width * (1 / scaleFactor);
  const scaledHeight = height * (1 / scaleFactor);

  // interpolate the dashboard variables on the src URL
  let srcUrl = replaceVariables(options.src);

  // interpolate the special $iframe_dbid template variable on the src URL
  const dbID = getDashboardID(locationService.getLocation().pathname);
  const ts = getTemplateSrv();
  srcUrl = ts.replace(srcUrl, { iframe_dbid: { value: dbID } });

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
        title="IFrame"
        src={srcUrl}
        className={cx(
          styles.iframe,
          css`
            pointer-events: ${isResizing || options.disableInteractivity ? 'none' : 'auto'};
            width: ${scaledWidth}px;
            height: ${scaledHeight}px;
            transform: scale(${scaleFactor});
          `
        )}
      ></iframe>
    </div>
  );
};
