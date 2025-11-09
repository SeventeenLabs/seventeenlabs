'use client';

interface TextSelectionPopupProps {
  selectedText: string;
  selectionRect: DOMRect | null;
  postTitle: string;
  postUrl: string;
  onClear: () => void;
}

export function TextSelectionPopup({ 
  selectedText, 
  selectionRect, 
  postTitle, 
  postUrl, 
  onClear 
}: TextSelectionPopupProps) {
  if (!selectedText || !selectionRect) return null;

  return (
    <div 
      className="selection-quote-popup visible"
      style={{
        top: `${selectionRect.top + window.scrollY - 55}px`,
        left: `${Math.max(10, selectionRect.left + selectionRect.width / 2 - 66)}px`,
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <button
        className="twitter"
        data-tooltip="Tweet"
        onClick={() => {
          const tweetText = `"${selectedText}" - ${postTitle}`;
          const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(postUrl)}&via=seventeenlabs`;
          window.open(tweetUrl, '_blank');
          setTimeout(onClear, 1000);
        }}
        aria-label="Quote on Twitter"
      >
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>
      <button
        className="linkedin"
        data-tooltip="LinkedIn"
        onClick={() => {
          const linkedInText = `"${selectedText}" - ${postTitle}\n\n${postUrl}`;
          const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}&summary=${encodeURIComponent(linkedInText)}`;
          window.open(linkedInUrl, '_blank');
          setTimeout(onClear, 1000);
        }}
        aria-label="Share on LinkedIn"
      >
        <svg fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>
      <button
        className="copy"
        data-tooltip="Copy"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(`"${selectedText}" - ${postTitle}\n\n${postUrl}`);
            // Visual feedback without breaking selection
            const buttons = document.querySelectorAll('.selection-quote-popup button.copy');
            const button = buttons[0] as HTMLButtonElement;
            if (button) {
              button.style.background = '#10B981';
              button.style.color = 'white';
              setTimeout(() => {
                button.style.background = '';
                button.style.color = '';
                onClear();
              }, 1500);
            }
          } catch (error) {
            console.error('Failed to copy:', error);
            onClear();
          }
        }}
        aria-label="Copy quote"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  );
}