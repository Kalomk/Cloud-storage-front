import * as React from 'react';
import { createPortal } from 'react-dom';

const portalStyle: React.CSSProperties = {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 9999, // Adjust the z-index as needed
  background: 'rgba(0, 0, 0, 0.5)', // Optional: Add a semi-transparent background overlay
};

const contentStyle: React.CSSProperties = {
  position: 'relative',
  marginTop: '100px',

  zIndex: 1, // Ensure the content appears above the overlay
};

export default function Portal({
  children,
  isShow = false,
  portalRef,
}: {
  children: React.ReactNode;
  isShow: boolean;
  portalRef: any;
}) {
  return isShow
    ? createPortal(
        <div style={portalStyle}>
          <div ref={portalRef} style={contentStyle}>
            {children}
          </div>
        </div>,
        document.body
      )
    : null;
}
