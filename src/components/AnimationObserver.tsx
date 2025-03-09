
import { useEffect } from 'react';

const AnimationObserver = () => {
  useEffect(() => {
    // Animation observer
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get the data-width attribute for skill bars
            const skillBar = entry.target.querySelector('[data-width]');
            if (skillBar && skillBar instanceof HTMLElement) {
              const width = skillBar.getAttribute('data-width');
              if (width) {
                setTimeout(() => {
                  skillBar.style.width = width;
                }, 100);
              }
            }

            // Add animation for section reveals
            if (entry.target.classList.contains('js-reveal')) {
              entry.target.classList.add('animate-slide-in');
              entry.target.classList.remove('opacity-0', 'translate-y-8');
            }

            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
      });

      // Observe all elements with js-reveal class
      document.querySelectorAll('.js-reveal').forEach((element) => {
        observer.observe(element);
      });

      // Observe all elements containing skill bars
      document.querySelectorAll('.js-reveal').forEach((element) => {
        observer.observe(element);
      });
    };

    // Run on first load with a slight delay to ensure DOM is ready
    setTimeout(observeElements, 100);

    // Clean up observer on component unmount
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};

export default AnimationObserver;
