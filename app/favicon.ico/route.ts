const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#111827"/>
  <path d="M18 22h28v6H25v8h17v6H25v12h-7V22Z" fill="#ffffff"/>
  <path d="M43 12h6v40h-6z" fill="#2563eb"/>
</svg>`;

export function GET() {
  return new Response(faviconSvg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
