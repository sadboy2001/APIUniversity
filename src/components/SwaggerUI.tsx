'use client';

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
        gap: '8px',
      }}>
        <span style={{ color: '#94a3b8' }}>Base API:</span>
        <span style={{ color: '#38bdf8' }}>{typeof window !== 'undefined' ? window.location.origin : ''}</span>
      </div>
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
