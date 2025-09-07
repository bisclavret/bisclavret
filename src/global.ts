// Disable default right-click context menu
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Function to handle external links
const handleExternalLinks = () => {
  if (window.__TAURI__ && window.__TAURI__.shell) {
    document.querySelectorAll('a[href]').forEach(link => {
      const url = link.getAttribute('href');

      // Only external links (start with http:// or https://)
      if (url && /^https?:\/\//.test(url)) {
        // Remove existing listeners to avoid duplicates
        link.removeEventListener('click', handleLinkClick);
        link.addEventListener('click', handleLinkClick);
      }
    });
  }
};

// Click handler for external links
const handleLinkClick = (e: Event) => {
  e.preventDefault();
  const target = e.target as HTMLAnchorElement;
  const url = target.getAttribute('href');
  
  if (url && window.__TAURI__ && window.__TAURI__.shell) {
    window.__TAURI__.shell.open(url);
  }
};

// Set up external link handling
document.addEventListener('DOMContentLoaded', handleExternalLinks);

// Also set up a mutation observer to handle dynamically added links (React components)
const observer = new MutationObserver(() => {
  handleExternalLinks();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

