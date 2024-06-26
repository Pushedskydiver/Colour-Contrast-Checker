import { useState } from "react";
import clsx from "clsx";
import CopyToClipboard from "react-copy-to-clipboard";
import { useColourContrast } from "~/components/Context";
import { isDark } from "~/components/Utils";
import { Clipboard } from "../Icon/Icon";
import { Text } from "../text/text";

import styles from './copy-cta.module.css';

export type TCopyCta = {
  id: string;
  value: string;
}

export const CopyCta: React.FC<TCopyCta> = ({
  id,
  value,
}) => {
  const [copied, setCopiedState] = useState(false);
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  const setCopyState = (): void => {
    setCopiedState(true);

    const delaySetState = setTimeout(() => {
      setCopiedState(false);
      clearTimeout(delaySetState);
    }, 2000);
  }

  return (
    <CopyToClipboard text={value} onCopy={setCopyState}>
      <span className={styles.ctaWrapper}>
        <Text
          size="pulse"
          weight="medium"
          className={clsx(
            styles.tooltip,
            isPoorContrast && !isBackgroundDark ? styles.tooltipDark : undefined,
            isPoorContrast && isBackgroundDark ? styles.tooltipLight : undefined,
            copied ? styles.tooltipFadeInOut : undefined,
          )}
        >
          {copied ? 'Copied' : `Copy ${value} to clipboard`}
        </Text>

        <button
          type="button"
          aria-labelledby={id}
          className={clsx(
            styles.cta,
            isPoorContrast && !isBackgroundDark ? styles.ctaDark : undefined,
            isPoorContrast && isBackgroundDark ? styles.ctaLight : undefined,
          )}
        >
          <Clipboard />
        </button>
      </span>
    </CopyToClipboard>
  )
}
