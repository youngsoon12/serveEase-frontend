export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = Object.fromEntries(
    document.cookie.split('; ').map((v) => v.split('=')),
  );
  const value = cookies[name];
  return value ? decodeURIComponent(value) : null;
}
