import React from 'react';

// A beautiful, light, and colorful abstract gradient.
// This self-contained base64 URI ensures the background always loads without external dependencies.
const abstractLightBgBase64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAwIDkwMCI+PGZpbHRlciBpZD0iYiIgeD0iMCUiIHk9IjAlIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii4wMiIgbnVtT2N0YXZlcz0iMyIgc2VlZD0iMSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHR5cGU9InNhdHVyYXRlIiB2YWx1ZXM9IjAiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjllZGZiIi8+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2IpIiBvcGFjaXR5PSIuNSIvPjwvc3ZnPg==';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("${abstractLightBgBase64}")`,
        }}
      ></div>
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at top left, rgba(173, 216, 230, 0.4), transparent 40%), radial-gradient(circle at bottom right, rgba(221, 160, 221, 0.4), transparent 40%)',
        }}
      ></div>
    </div>
  );
};