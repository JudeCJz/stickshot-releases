// Stickshot site: top bar styling and download button scroll visibility
(function () {
  var bar = document.getElementById("topbar");
  var topbarBtn = bar ? bar.querySelector(".js-download") : null;
  var heroBtn = document.querySelector(".s-hero .js-download");

  function update() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    if (bar) {
      bar.classList.toggle("scrolled", scrollY > 8);
    }

    if (topbarBtn) {
      var barHeight = bar ? bar.offsetHeight : 0;
      var heroVisible = false;
      if (heroBtn) {
        var heroRect = heroBtn.getBoundingClientRect();
        // The big hero button hides once its bottom edge scrolls at or above the sticky topbar
        heroVisible = heroRect.bottom > barHeight && heroRect.top < window.innerHeight;
      }

      // Show the topbar button only once the hero button has scrolled away.
      var showTopbarBtn = !heroVisible;
      topbarBtn.classList.toggle("is-visible", showTopbarBtn);
    }
  }

  // On a Windows PC, make the Windows download the main (red) button instead of Android.
  if (/Windows NT/i.test(navigator.userAgent || "")) {
    document.querySelectorAll(".s-hero-cta").forEach(function (row) {
      var apk = row.querySelector("[data-dl='apk']");
      var win = row.querySelector("[data-dl='win']");
      if (!apk || !win) return;
      apk.classList.remove("btn-red"); apk.classList.add("btn-glass");
      win.classList.remove("btn-glass"); win.classList.add("btn-red");
      row.insertBefore(win, apk);
    });
  }

  var ticking = false;
  function onScrollOrResize() {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        update();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
  window.addEventListener("load", update);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", update);
  } else {
    update();
  }
})();
