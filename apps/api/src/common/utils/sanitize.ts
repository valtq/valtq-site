/**
 * Strip control characters and collapse excessive whitespace.
 * Applied to free-text fields before persistence.
 */
export function sanitizeString(value: string): string {
  return (
    value
      // eslint-disable-next-line no-control-regex -- sanitizing untrusted strings
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

export function sanitizeOptionalString(
  value: string | undefined,
): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const sanitized = sanitizeString(value);
  return sanitized.length > 0 ? sanitized : undefined;
}

export function sanitizeStringArray(
  values: string[] | undefined,
): string[] | undefined {
  if (values === undefined) {
    return undefined;
  }

  const sanitized = values
    .map((value) => sanitizeString(value))
    .filter((value) => value.length > 0);

  return sanitized.length > 0 ? sanitized : undefined;
}
