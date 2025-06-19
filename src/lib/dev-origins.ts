export const devOriginPatterns = [
  /^https?:\/\/localhost(?::\d{1,5})?$/,
  /^https?:\/\/127(?:\.\d{1,3}){3}(?::\d{1,5})?$/,
  /^https?:\/\/\[::1\](?::\d{1,5})?$/,
  /^https?:\/\/10(?:\.\d{1,3}){3}(?::\d{1,5})?$/,
  /^https?:\/\/172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2}(?::\d{1,5})?$/,
  /^https?:\/\/192\.168(?:\.\d{1,3}){2}(?::\d{1,5})?$/,
]

export function isAllowedDevOrigin(origin: string) {
  return devOriginPatterns.some(re => re.test(origin))
}
