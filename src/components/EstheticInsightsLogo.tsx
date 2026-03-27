import type { SVGProps } from 'react';

type Props = SVGProps<SVGSVGElement> & {
  /** When true, omits the right wordmark (ÉSTHETIC / INSIGHTS) for compact marks */
  monogramOnly?: boolean;
};

/**
 * Esthetic Insights wordmark: EI monogram + ÉSTHETIC / INSIGHTS (vector text, currentColor).
 */
export default function EstheticInsightsLogo({ className, monogramOnly, 'aria-hidden': ariaHidden, ...props }: Props) {
  return (
    <svg
      viewBox={monogramOnly ? '0 0 132 118' : '0 0 560 118'}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={ariaHidden ? undefined : 'Esthetic Insights'}
      aria-hidden={ariaHidden}
      {...props}
    >
      {!ariaHidden && <title>Esthetic Insights</title>}
      <text
        x="0"
        y="100"
        fontFamily="Georgia, 'Times New Roman', Times, serif"
        fontWeight="700"
        fontSize="96"
        letterSpacing="-0.03em"
      >
        EI
      </text>
      {!monogramOnly && (
        <g transform="translate(128, 0)">
          <text
            x="0"
            y="50"
            fontFamily="Georgia, 'Times New Roman', Times, serif"
            fontWeight="500"
            fontSize="26"
            letterSpacing="0.2em"
          >
            ÉSTHETIC
          </text>
          <text
            x="0"
            y="100"
            fontFamily="Georgia, 'Times New Roman', Times, serif"
            fontWeight="500"
            fontSize="26"
            letterSpacing="0.22em"
          >
            INSIGHTS
          </text>
        </g>
      )}
    </svg>
  );
}
