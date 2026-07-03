const placeholderMarkers = [
  "changeme",
  "example",
  "placeholder",
  "replace",
  "your-",
  "your_",
  "<",
  ">",
];

export function isClerkPublishableKeyConfigured(value: string | undefined) {
  const key = value?.trim();

  if (!key) {
    return false;
  }

  if (!key.startsWith("pk_test_") && !key.startsWith("pk_live_")) {
    return false;
  }

  const normalizedKey = key.toLowerCase();

  return !placeholderMarkers.some((marker) => normalizedKey.includes(marker));
}
