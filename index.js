document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Default mein 'home' page active rahegi
    let activePageId = 'home';

    // Function to handle page change (Smooth Transition)
    const showPage = (targetId) => {
        // Agar same page par click hua toh kuch nahi
        if (targetId === activePageId) return; 

        const currentPage = document.getElementById(activePageId);
        const nextPage = document.getElementById(targetId);

        if (currentPage && nextPage) {
            // Step 1: Current page ko fade out karo
            currentPage.style.opacity = '0';
            
            setTimeout(() => {
                currentPage.classList.remove('active');
                currentPage.style.display = 'none';

                // Step 2: Naye page ko display: block karo
                nextPage.style.display = 'block';
                
                // Chhota delay taaki browser display change hone ko process kar sake
                setTimeout(() => {
                    // Step 3: Naye page ko fade-in karo
                    nextPage.classList.add('active');
                    nextPage.style.opacity = '1';
                    activePageId = targetId;
                    
                    // Better UX ke liye page ko top par scroll karo
                    window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }, 50); 

            }, 500); // CSS transition time (0.5s)
        }
    };

    // Navigation button click listener
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            const targetPage = event.target.getAttribute('data-page');
            if (targetPage) {
                showPage(targetPage);
            }
        });
    });

    // Initial setup: Ensure 'home' is active on load
    showPage(activePageId);
});
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
                    // Trigger reflow to apply display:block before opacity:1
                    void targetPage.offsetHeight; 
                    targetPage.classList.add('active');
                    targetPage.style.opacity = 1; 
                }
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

// Initial load check for the active page
document.addEventListener('DOMContentLoaded', () => {
    // Ensures the first page (home) is displayed correctly on load
    const initialPage = document.querySelector('.page-content.active');
    if (initialPage) {
        initialPage.style.opacity = 1;
        initialPage.style.display = 'block';
    }
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
            // Handle HTTP errors (e.g., 404, 500)
            throw new Error(`Server returned status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data && data.length > 0) {
            const quote = data[0]; 
            
            // Update UI with the fetched quote
            quoteText.textContent = `"${quote.q}"`;
            quoteAuthor.textContent = `— ${quote.a || 'Unknown'}`;
        } else {
            // Fallback if API returns empty data
            quoteText.textContent = "Sorry, no quote found (API returned empty data).";
            quoteAuthor.textContent = "— API Error";
        }

    } catch (error) {
        console.error("Quote fetch error:", error);
        
        // --- Custom Fallback for CORS/Network Issues ---
        quoteText.textContent = "Failed to fetch quote: Network or CORS Error.";
        quoteAuthor.textContent = "— Try running the site on a web server (like GitHub Pages) instead of opening the file directly.";
    } finally {
        // Re-enable the button regardless of success or failure
        fetchQuoteBtn.disabled = false;
    }
}

// Initial quote fetch when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Fetch an initial quote when the page loads
    fetchQuoteAndDisplay();

    // Attach click listener to the button
    if (fetchQuoteBtn) {
        fetchQuoteBtn.addEventListener('click', fetchQuoteAndDisplay);
    }
});
