/**
 * Unit identifiers for byte sizes (lowercase).
 */
type BytesUnit = "b" | "kb" | "mb" | "gb" | "tb" | "pb";

/**
 * Unit identifiers for byte sizes (uppercase).
 */
type BytesUnitUpper = "B" | "KB" | "MB" | "GB" | "TB" | "PB";

/**
 * All valid unit identifier variations.
 */
type BytesUnitAny = BytesUnit | BytesUnitUpper;

/**
 * Valid byte size string formats that can be parsed.
 *
 * @example
 * '50mb'
 * '1.5gb'
 * '100 KB'
 * '-5mb'
 * '+10gb'
 */
type BytesString =
  | `${number}${BytesUnitAny}`
  | `${number} ${BytesUnitAny}`
  | `${number}.${number}${BytesUnitAny}`
  | `${number}.${number} ${BytesUnitAny}`
  | `+${number}${BytesUnitAny}`
  | `+${number} ${BytesUnitAny}`
  | `+${number}.${number}${BytesUnitAny}`
  | `+${number}.${number} ${BytesUnitAny}`
  | `-${number}${BytesUnitAny}`
  | `-${number} ${BytesUnitAny}`
  | `-${number}.${number}${BytesUnitAny}`
  | `-${number}.${number} ${BytesUnitAny}`;

/**
 * Options for formatting bytes into a human-readable string.
 */
interface BytesOptions {
  /**
   * Number of decimal places to include in the output.
   *
   * @default 2
   *
   * @example
   * bytes(1024, { decimalPlaces: 0 }); // '1KB'
   * bytes(1024, { decimalPlaces: 2 }); // '1.00KB'
   */
  decimalPlaces?: number;

  /**
   * Whether to always include the specified number of decimal places,
   * even if they are zero.
   *
   * @default false
   *
   * @example
   * bytes(1024, { fixedDecimals: true, decimalPlaces: 2 }); // '1.00KB'
   * bytes(1024, { fixedDecimals: false, decimalPlaces: 2 }); // '1KB'
   */
  fixedDecimals?: boolean;

  /**
   * Character to use as a thousands separator in the output.
   *
   * @default ''
   *
   * @example
   * bytes(1000000, { thousandsSeparator: ',' }); // '976.56KB' or '1,000,000B'
   */
  thousandsSeparator?: string;

  /**
   * The unit to use for formatting.
   * If not specified, the most appropriate unit is chosen automatically.
   *
   * @example
   * bytes(1024, { unit: 'kb' }); // '1KB'
   * bytes(1048576, { unit: 'kb' }); // '1024KB'
   */
  unit?: BytesUnitAny;

  /**
   * Character to use as a separator between the numeric value and the unit.
   *
   * @default ''
   *
   * @example
   * bytes(1024, { unitSeparator: ' ' }); // '1 KB'
   * bytes(1024, { unitSeparator: '' }); // '1KB'
   */
  unitSeparator?: string;
}

/**
 * Convert a human-readable byte size string to bytes as an integer.
 *
 * If the input is a number, it is returned as-is.
 * If the input is an invalid string format, returns `null`.
 *
 * @param value - The value to parse (e.g., '5MB', '1.5GB', 1024)
 * @returns The number of bytes, or `null` if parsing fails
 *
 * @example
 * bytes.parse('1KB'); // 1024
 * bytes.parse('1MB'); // 1048576
 * bytes.parse('1GB'); // 1073741824
 * bytes.parse('invalid'); // null
 * bytes.parse(1024); // 1024
 */
declare function parse(value: BytesString): number | null;
declare function parse(value: number): number;
declare function parse(value: BytesString | number): number | null;

/**
 * Format bytes as a human-readable string.
 *
 * If the value is not a finite number, returns `null`.
 *
 * @param value - The number of bytes to format
 * @param options - Formatting options
 * @returns A human-readable string (e.g., '5MB', '1.5GB'), or `null` if the value is invalid
 *
 * @example
 * bytes.format(1024); // '1KB'
 * bytes.format(1048576); // '1MB'
 * bytes.format(1073741824, { decimalPlaces: 2 }); // '1.00GB'
 * bytes.format(Infinity); // null
 */
declare function format(
  value: number,
  options?: BytesOptions
): BytesString | null;

/**
 * Convert the given value to/from bytes.
 *
 * - If `value` is a string, it is parsed to bytes (integer).
 * - If `value` is a number, it is formatted to a human-readable string.
 * - Returns `null` if the conversion fails.
 *
 * @param value - A string to parse or a number to format
 * @param options - Options for formatting (only used when `value` is a number)
 * @returns The converted value, or `null` if conversion fails
 *
 * @example
 * // Parsing string to bytes
 * bytes('1KB'); // 1024
 * bytes('1MB'); // 1048576
 * bytes('invalid'); // null
 *
 * // Formatting number to string
 * bytes(1024); // '1KB'
 * bytes(1048576); // '1MB'
 * bytes(1073741824, { decimalPlaces: 2, unitSeparator: ' ' }); // '1.00 GB'
 */
declare function bytes(value: BytesString): number | null;
declare function bytes(
  value: number,
  options?: BytesOptions
): BytesString | null;
declare function bytes(
  value: BytesString | number,
  options?: BytesOptions
): BytesString | number | null;

declare namespace bytes {
  export {
    parse,
    format,
    BytesOptions,
    BytesString,
    BytesUnit,
    BytesUnitUpper,
    BytesUnitAny,
  };
}

export = bytes;
