// Ícones inline SVG das plataformas — evita depender de pacotes de marcas.
type P = { size?: number; className?: string };

export function TwitchIcon({ size = 24, className }: P) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M4 2l-2 4v14h5v3h3l3-3h4l5-5V2H4zm16 11l-3 3h-4l-3 3v-3H6V4h14v9zM14 6h2v5h-2zM9 6h2v5H9z" />
    </svg>
  );
}
export function InstagramIcon({ size = 24, className }: P) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}
export function YouTubeIcon({ size = 24, className }: P) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M23 7.5s-.2-1.6-.9-2.3c-.8-.9-1.7-.9-2.2-1C16.6 4 12 4 12 4s-4.6 0-7.9.2c-.5.1-1.4.1-2.2 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.3v1.4c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.2 7.7.2s4.6 0 7.9-.3c.5-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8v-1.4c0-1.9-.2-3.7-.2-3.7zM9.7 15V8l6.3 3.5L9.7 15z" />
    </svg>
  );
}
export function TikTokIcon({ size = 24, className }: P) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
      <path d="M16.5 3c.4 2 1.7 3.6 3.5 4.2v2.6c-1.4 0-2.7-.4-3.9-1.1v5.9a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.9 2.9 0 1 0 2 2.7V3h3.1z" />
    </svg>
  );
}
export function InstagramMonoLine() {
  return <InstagramIcon />;
}
