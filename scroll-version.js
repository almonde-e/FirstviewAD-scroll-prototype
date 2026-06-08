document.addEventListener('DOMContentLoaded', () => {
  const screen = document.getElementById('screen');
  const adBanner = document.getElementById('adBannerScroll');

  // Reset scroll position to top
  screen.scrollTop = 0;

  let hasAffordance = false;
  let hasExpanded = false;

  screen.addEventListener('scroll', () => {
    // Skip if already expanded
    if (hasExpanded) return;

    const adBannerRect = adBanner.getBoundingClientRect();
    const screenRect = screen.getBoundingClientRect();

    // Calculate how much of the ad banner is visible
    const visibleTop = Math.max(adBannerRect.top, screenRect.top);
    const visibleBottom = Math.min(adBannerRect.bottom, screenRect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);
    const visibleRatio = visibleHeight / adBannerRect.height;

    console.log('Visible ratio:', visibleRatio);

    // When 50% of the banner is visible, show affordance
    if (visibleRatio >= 0.5 && !hasAffordance) {
      hasAffordance = true;
      console.log('Affordance triggered');
      adBanner.classList.add('affordance');

      // After 0.8 seconds, expand
      setTimeout(() => {
        if (!hasExpanded) {
          hasExpanded = true;
          console.log('Expanded triggered');
          adBanner.classList.remove('affordance');
          adBanner.classList.add('expanded');
        }
      }, 800);
    }
  });
});
