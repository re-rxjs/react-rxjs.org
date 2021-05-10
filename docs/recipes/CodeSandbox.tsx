import React from 'react';

export default function CodeSandbox({ id }: { id: string }) {
  return (
    <iframe
      src={`https://codesandbox.io/embed/${id}?fontsize=14&hidenavigation=1&theme=dark`}
      style={{
        width: '100%',
        height: '80vh',
        border: '0',
        borderRadius: 4,
        overflow: 'hidden',
      }}
      title="managing-lists-simple"
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  )
}
