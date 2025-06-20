import { BigNumber } from 'bignumber.js';
import { picasso } from '@vechain/picasso';

/**
 * Format a number to a human-readable string
 * @param formattedValue The formatted number
 * @param originalValue The original number (optional)
 * @param symbol The symbol to append (optional)
 * @returns Formatted number string
 */
export const humanNumber = (
  formattedValue: BigNumber.Value,
  originalValue?: BigNumber.Value,
  symbol: string | null = null,
) => {
  const suffix = symbol ? ' ' + symbol : '';

  originalValue = originalValue || formattedValue;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'decimal',
    minimumFractionDigits:
      Number.parseFloat(formattedValue.toString()) % 1 === 0 ? 0 : 2,
  });

  let value = formatter.format(
    roundDownSignificantDigits(Number(formattedValue), 2),
  );

  //If the original number got scaled down to 0
  if (!isZero(originalValue) && isZero(value)) {
    value = '< 0.01';
  }

  return value + suffix;
};

export const isZero = (value?: BigNumber.Value) => {
  if (!value && value !== 0) return false;
  return new BigNumber(value).isZero();
};

function roundDownSignificantDigits(numbers: number, decimals: number = 0) {
  if (typeof numbers !== 'number' || typeof decimals !== 'number') {
    throw new Error(
      'Invalid input: number and decimals must be of type number',
    );
  }

  const significantDigits = parseInt(
    numbers.toExponential().split('e-')[1] || '0',
    10,
  );

  const effectiveDecimals = Math.max(0, decimals + significantDigits);
  const scaleFactor = Math.pow(10, effectiveDecimals);

  return Math.floor(numbers * scaleFactor) / scaleFactor;
}

export const humanAddress = (
    address: string,
    charAtStart = 6,
    charAtEnd = 4,
): string => `${address.slice(0, charAtStart)}•••${address.slice(-charAtEnd)}`;

export const humanDomain = (
    domain: string,
    lengthBefore = 8,
    lengthAfter = 6,
) => {
  // if domain is smaller than lengthBefore + lengthAfter, return the domain
  if (domain.length <= lengthBefore + lengthAfter) return domain;

  const before = domain.substring(0, lengthBefore);
  const after = domain.substring(domain.length - lengthAfter);
  return `${before}•••${after}`;
};

export const getPicassoImage = (address: string, base64 = false): string => {
  const image = picasso(address.toLowerCase());
  if (base64) {
    const base64data = Buffer.from(image, 'utf8').toString('base64');
    return `data:image/svg+xml;base64,${base64data}`;
  }
  return `data:image/svg+xml;utf8,${image}`;
};