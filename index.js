/* ==========================================================================
   YouTube Comment History Finder Interactions Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPlatformTabs();
  initFaqAccordion();
});

/**
 * Initializes the Desktop vs Mobile Platform Toggles
 */
function initPlatformTabs() {
  const tabs = document.querySelectorAll('.tab-button');
  const panels = document.querySelectorAll('.guide-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Deactivate all tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      // Hide all panels
      panels.forEach(p => {
        p.classList.remove('active');
      });

      // Activate clicked tab
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show associated panel
      const targetPanelId = tab.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

/**
 * Initializes the Smooth FAQ Accordion Expansion
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other FAQ items for a clean accordion effect
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherTrigger && otherAnswer) {
            otherTrigger.setAttribute('aria-expanded', 'false');
            otherAnswer.style.maxHeight = '0px';
            otherAnswer.style.opacity = '0';
            setTimeout(() => {
              otherAnswer.setAttribute('hidden', '');
            }, 300); // match CSS transition time
          }
        }
      });

      if (isOpen) {
        // Close current item
        item.classList.remove('active');
        trigger.setAttribute('aria-expanded', 'false');
        answer.style.maxHeight = '0px';
        answer.style.opacity = '0';
        setTimeout(() => {
          answer.setAttribute('hidden', '');
        }, 300);
      } else {
        // Open current item
        answer.removeAttribute('hidden');
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
        
        // Compute content height dynamically
        const scrollHeight = answer.scrollHeight;
        answer.style.maxHeight = `${scrollHeight + 24}px`; // adjust padding offset
        answer.style.opacity = '1';
      }
    });
  });
}
