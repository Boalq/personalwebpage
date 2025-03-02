document.addEventListener('DOMContentLoaded', () => {
    // Make yin-yang clickable to return to intro
    const yinYang = document.querySelector('.yin-yang');
    yinYang.addEventListener('click', () => {
        document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });
    });

    // Get all navigation circles
    const navCircles = document.querySelectorAll('.nav-circles .circle');
    
    // Function to update circle colors and tooltips based on current section
    function updateNavStyles() {
        // Get the current visible section
        const sections = document.querySelectorAll('.section');
        let currentSection = null;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // If section is mostly visible in viewport
            if (rect.top < window.innerHeight/2 && rect.bottom > window.innerHeight/2) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            // Check if current section has dark background
            const isDarkSection = currentSection.id === 'skills' || currentSection.id === 'education';
            
            // Update all navigation circles and tooltips
            navCircles.forEach(circle => {
                // Update circle color
                if (isDarkSection) {
                    circle.style.backgroundColor = '#fff'; // White circles for dark background
                    
                    // Create tooltip style for dark background
                    const tooltipStyle = document.createElement('style');
                    tooltipStyle.textContent = `
                        .circle[data-section="${circle.getAttribute('data-section')}"]::before {
                            background-color: rgba(255, 255, 255, 0.8) !important;
                            color: #000 !important;
                        }
                    `;
                    document.head.appendChild(tooltipStyle);
                    
                } else {
                    circle.style.backgroundColor = '#000'; // Black circles for light background
                    
                    // Create tooltip style for light background
                    const tooltipStyle = document.createElement('style');
                    tooltipStyle.textContent = `
                        .circle[data-section="${circle.getAttribute('data-section')}"]::before {
                            background-color: rgba(0, 0, 0, 0.8) !important;
                            color: #fff !important;
                        }
                    `;
                    document.head.appendChild(tooltipStyle);
                }
            });
        }
    }
    
    // Update on scroll
    window.addEventListener('scroll', updateNavStyles);
    
    // Initial update
    updateNavStyles();
    
    // Update on navigation click
    navCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            // Small delay to allow scrolling to complete
            setTimeout(updateNavStyles, 100);
        });
    });
}); 