'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const SwaggerUIReact = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
        <div style={{ fontSize: '20px', color: '#3b4151', marginBottom: '12px' }}>
          Loading API documentation...
        </div>
        <div style={{ color: '#6b7280', fontSize: '14px' }}>University API v1.0.0</div>
      </div>
    </div>
  ),
});

import 'swagger-ui-react/swagger-ui.css';

export default function SwaggerUI() {
  const [showKey, setShowKey] = useState(false);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <div style={{
        backgroundColor: '#1e293b',
        color: '#e2e8f0',
        padding: '12px 20px',
        fontFamily: 'monospace',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#94a3b8' }}>Base API:</span>
          <span style={{ color: '#38bdf8' }}>{typeof window !== 'undefined' ? window.location.origin : ''}</span>
        </div>
        <button
          onClick={() => setShowKey(true)}
          style={{
            backgroundColor: '#f59e0b',
            color: '#1a202c',
            border: 'none',
            padding: '6px 14px',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '13px',
            cursor: 'pointer',
          }}
        >
          Get API Key
        </button>
      </div>

      {showKey && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            fontFamily: 'sans-serif',
          }}
          onClick={() => setShowKey(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '420px',
              width: '90%',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1a202c' }}>API Key</h2>
            <p style={{ margin: '0 0 20px 0', color: '#6b7280', fontSize: '14px' }}>
              Required for Courses endpoints
            </p>

            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Auth Type</div>
                <div style={{ fontSize: '14px', color: '#1a202c', fontWeight: 'bold' }}>API Key</div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Key</div>
                <code style={{ fontSize: '14px', color: '#1a202c', backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>X-API-Key</code>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Value</div>
                <code style={{ fontSize: '14px', color: '#1a202c', backgroundColor: '#e2e8f0', padding: '2px 6px', borderRadius: '4px' }}>university-api-key-2025</code>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Add to</div>
                <div style={{ fontSize: '14px', color: '#1a202c', fontWeight: 'bold' }}>Header</div>
              </div>
            </div>

            <button
              onClick={() => setShowKey(false)}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <SwaggerUIReact
        url="/api/openapi.json"
        docExpansion="list"
        defaultModelsExpandDepth={1}
        defaultModelExpandDepth={1}
        filter={true}
        showExtensions={true}
        showCommonExtensions={true}
        tryItOutEnabled={true}
        requestSnippetsEnabled={true}
        deepLinking={true}
      />
      <style>{`
        .swagger-ui .topbar { display: none !important; }
        .swagger-ui .info { margin: 20px 0 !important; }
        .swagger-ui .scheme-container { background: #f7f7f7 !important; border: 1px solid #e5e7eb !important; border-radius: 8px !important; }
        .swagger-ui .opblock { border-radius: 8px !important; }
        .swagger-ui .btn { border-radius: 6px !important; }
        .swagger-ui section.models { border: 1px solid #e5e7eb !important; border-radius: 8px !important; }
      `}</style>
    </div>
  );
}
