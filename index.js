// Page Navigation Logic
const navLinks = document.querySelectorAll('.nav-link');
const pageContents = document.querySelectorAll('.page-content');

/**
 * Determines which page to display and handles the fade transition.
 * @param {string} targetPageId - The ID of the page to navigate to (e.g., 'home', 'about').
 */
function navigate(targetPageId) {
    // Hide all pages with a fade-out effect
    pageContents.forEach(page => {
        // Find the currently active page
        if (page.classList.contains('active')) {
            page.style.opacity = 0;
            
            // Use a timeout to ensure fade-out completes before hiding content
            setTimeout(() => {
                page.classList.remove('active');
                page.style.display = 'none';

                // Find and show the target page
                const targetPage = document.getElementById(`page-${targetPageId}`);
                if (targetPage) {
                    targetPage.style.display = 'block';
                    // Trigger reflow to ensure CSS transitions start correctly
                    void targetPage.offsetHeight; 
                    targetPage.classList.add('active');
                    targetPage.style.opacity = 1; 
                }
                
                // Scroll to the top of the page for better UX
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
            }, 500); // Matches the CSS transition time
        }
    });

    // Update active navigation link styling
    navLinks.forEach(link => {
        link.classList.remove('active-link');
        link.classList.add('text-gray-300'); // Ensure non-active links have gray color
        if (link.getAttribute('data-page') === targetPageId) {
            link.classList.add('active-link');
        }
    });
}

// Attach navigation handlers to buttons
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navigate(link.getAttribute('data-page'));
    });
});

// --- API Integration: Quote Generator Logic ---

const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const fetchQuoteBtn = document.getElementById('fetch-quote-btn');

/**
 * Fetches a random quote from the ZenQuotes API and updates the UI.
 */
async function fetchQuoteAndDisplay() {
    // Show a loading state
    quoteText.textContent = "Loading a new quote...";
    quoteAuthor.textContent = "— Loading";
    fetchQuoteBtn.disabled = true;

    try {
        const response = await fetch('https://zenquotes.io/api/random');
        
        if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data && data.length > 0) {
            const quote = data[0]; 
            quoteText.textContent = `"${quote.q}"`;
            quoteAuthor.textContent = `— ${quote.a || 'Unknown'}`;
        } else {
            quoteText.textContent = "Sorry, no quote found (API returned empty data).";
            quoteAuthor.textContent = "— API Error";
        }

    } catch (error) {
        console.error("Quote fetch error:", error);
        
        // This fallback confirms the necessity of running on a server (like GitHub Pages)
        quoteText.textContent = "Failed to fetch quote: Network or CORS Error.";
        quoteAuthor.textContent = "— The quote generator requires the site to run on a web server (like GitHub Pages).";
    } finally {
        fetchQuoteBtn.disabled = false;
    }
}

// Initial setup when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Fetch an initial quote when the page loads
    fetchQuoteAndDisplay();

    // Attach click listener to the button
    if (fetchQuoteBtn) {
        fetchQuoteBtn.addEventListener('click', fetchQuoteAndDisplay);
    }
    
    // Ensure the initial 'home' page is active and visible on load
    const initialPage = document.getElementById('page-home');
    if (initialPage) {
        initialPage.classList.add('active');
        initialPage.style.display = 'block';
        initialPage.style.opacity = 1;
    }
});
