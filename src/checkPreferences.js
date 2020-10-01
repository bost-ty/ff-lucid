function checkPreferences() {
  // Set color and font preference.
  const rootStyles = document.documentElement;
  const light = getComputedStyle(rootStyles).getPropertyValue("--light");
  const dark = getComputedStyle(rootStyles).getPropertyValue("--dark");
  const sans = getComputedStyle(rootStyles).getPropertyValue("--sans");
  const mono = getComputedStyle(rootStyles).getPropertyValue("--mono");
  if (!colorPreference) {
    // Default to dark mode
    rootStyles.style.setProperty("--foreground", light);
    rootStyles.style.setProperty("--background", dark);
  } else if (colorPreference == "light") {
    rootStyles.style.setProperty("--foreground", dark);
    rootStyles.style.setProperty("--background", light);
    if (colorRadios) colorRadios[1].checked = true;
  } else if (colorPreference == "dark") {
    rootStyles.style.setProperty("--foreground", light);
    rootStyles.style.setProperty("--background", dark);
    if (colorRadios) colorRadios[0].checked = true;
  }
  if (!fontPreference) rootStyles.style.setProperty("--fontStack", mono);
  else if (fontPreference == "sans") rootStyles.style.setProperty("--fontStack", sans);
  else if (fontPreference == "mono") rootStyles.style.setProperty("--fontStack", mono);
}

export { checkPreferences };
