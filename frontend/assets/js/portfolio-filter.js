/* ============================================
   PORTFOLIO FILTER FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    // Add click event to all filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter portfolio cards
            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all') {
                    // Show all cards
                    card.style.display = 'block';
                    card.classList.add('show');
                    card.classList.remove('hide');
                } else if (cardCategory === filterValue) {
                    // Show matching cards
                    card.style.display = 'block';
                    card.classList.add('show');
                    card.classList.remove('hide');
                } else {
                    // Hide non-matching cards
                    card.style.display = 'none';
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });
});
