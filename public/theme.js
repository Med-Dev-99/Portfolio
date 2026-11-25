/* Runs in <head> before first paint: picks the theme, then wires the toggle. */
(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  var theme = stored === 'light' || stored === 'dark'
    ? stored
    : (window.matchMedia && matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.dataset.theme = theme;
  var meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#f6f7f9' : '#060912');

  document.addEventListener('click', function (event) {
    if (!event.target.closest) return;
    // Close the mobile menu once a section link is chosen.
    var menuLink = event.target.closest('[popover] a');
    if (menuLink) { var menu = menuLink.closest('[popover]'); if (menu.hidePopover) menu.hidePopover(); }
    var button = event.target.closest('[data-theme-toggle]');
    if (!button) return;
    var next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'light' ? '#f6f7f9' : '#060912');
  });
})();
