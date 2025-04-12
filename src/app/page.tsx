'use client';

import { useState, useRef, useEffect, ChangeEvent } from 'react';

export default function WebScraper() {
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [websiteContent, setWebsiteContent] = useState<string>('');
  const [extractedHtml, setExtractedHtml] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const fetchWebsite = async (): Promise<void> => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setWebsiteContent('');
      setExtractedHtml('');

      const response = await fetch(`/api/proxy?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch website: ${response.statusText}`);
      }

      const html = await response.text();
      setWebsiteContent(html);
    } catch (err) {
      setError((err as Error).message || 'Failed to fetch website');
    } finally {
      setLoading(false);
    }
  };

  const setupElementSelection = (): void => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentDocument) return;

    const iframeDoc = iframe.contentDocument;

    // Add CSS to highlight elements on hover
    const style = iframeDoc.createElement('style');
    style.textContent = `
      *:hover {
        outline: 2px solid #3b82f6 !important;
        cursor: pointer !important;
      }
    `;
    iframeDoc.head.appendChild(style);

    // Add click event listeners to all elements
    const addClickListeners = (element: Element): void => {
      element.addEventListener('click', (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        setExtractedHtml((e.target as Element).outerHTML);
      });

      // Add listeners to children recursively
      Array.from(element.children).forEach(child => {
        addClickListeners(child);
      });
    };

    // Add listeners to all elements in the body
    if (iframeDoc.body) {
      addClickListeners(iframeDoc.body);
    }
  };

  // Set up iframe after content is loaded
  useEffect(() => {
    if (websiteContent && iframeRef.current) {
      // Wait for iframe to load
      iframeRef.current.onload = () => {
        setupElementSelection();
      };
    }
  }, [websiteContent]);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Web Scraper Tool</h1>

      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={url}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
          placeholder="Enter website URL (e.g., https://example.com)"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={fetchWebsite}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Loading...' : 'Fetch Website'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded mb-4">
          {error}
        </div>
      )}

      {websiteContent && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Website Preview (Click on elements to select)</h2>
            <div className="border rounded h-96 overflow-hidden">
              <iframe
                ref={iframeRef}
                srcDoc={websiteContent}
                title="Website Preview"
                className="w-full h-full"
                sandbox="allow-same-origin"
              />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Selected HTML</h2>
            <div className="bg-gray-100 p-2 rounded text-sm font-mono h-96 overflow-auto">
              {extractedHtml || 'Click on an element in the preview to see its HTML'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
