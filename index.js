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