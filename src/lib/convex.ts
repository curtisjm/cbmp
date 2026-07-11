const PLACEHOLDER_VALUE_PATTERN =
  /(?:placeholder|replace|example|your[-_]|[<>])/i;

export function getConfiguredConvexUrl(value: string | undefined) {
  const configuredValue = value?.trim();

  if (!configuredValue || PLACEHOLDER_VALUE_PATTERN.test(configuredValue)) {
    return undefined;
  }

  try {
    const url = new URL(configuredValue);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return undefined;
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return undefined;
  }
}

export function isConvexEnabled(value: string | undefined) {
  return getConfiguredConvexUrl(value) !== undefined;
}
