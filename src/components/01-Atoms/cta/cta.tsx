import clsx from "clsx";

import { useColourContrast } from '~/components/Context';
import { isDark } from '~/components/Utils';
import { Text } from "../text/text";

import styles from './cta.module.css';

export type TButton = React.ButtonHTMLAttributes<HTMLButtonElement> & CtaShared;

export type TLinkButton = React.AnchorHTMLAttributes<HTMLAnchorElement> & CtaShared;

type CtaShared = React.PropsWithChildren<{
  className?: string;
}>;

export const Button: React.FC<TButton> = ({
  children,
  type = 'button',
  className,
  onClick,
  ...buttonAttributes
}) => {
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={clsx(
        styles.cta,
        isPoorContrast && !isBackgroundDark ? styles.ctaDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.ctaLight : undefined,
        className,
      )}
      {...buttonAttributes}
    >
      {children}
    </button>
  );
};

export const LinkButton: React.FC<TLinkButton> = ({
  href,
  children,
  className,
  onClick,
  ...linkAttributes
}) => {
  const { background, contrast } = useColourContrast();
  const isPoorContrast = contrast < 3;
  const isBackgroundDark = isDark(background);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={clsx(
        styles.cta,
        isPoorContrast && !isBackgroundDark ? styles.ctaDark : undefined,
        isPoorContrast && isBackgroundDark ? styles.ctaLight : undefined,
        className,
      )}
      {...linkAttributes}
    >
      {children}
    </a>
  );
};

type TCtaText = {
  children: React.ReactNode;
  className?: string;
};

const CtaText: React.FC<TCtaText> = ({ children, className }) => (
  <Text
    role="presentation"
    weight="medium"
    className={clsx(styles.content, className)}
  >
    {children}
  </Text>
);

export const CtaContent = {
  Text: CtaText,
};
