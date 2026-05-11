(function () {
  'use strict';

  var ENABLED_MIN_WIDTH = 900;
  var WHEEL_GESTURE_GAP_MS = 150; // reset gesture after this idle time
  var WHEEL_GESTURE_TRIGGER = 14; // low effort to trigger next/prev section
  var TOUCH_TRIGGER = 52; // swipe distance in px
  var BASE_ANIMATION_MS = 1250;
  var MAX_ANIMATION_MS = 2200;
  var COOLDOWN_MS = 260;

  var root = document.documentElement;
  var lastWheelAt = 0;
  var wheelAccumulator = 0;
  var isAnimating = false;
  var touchStartY = 0;
  var touchActive = false;
  var targets = [];
  var rafId = 0;

  function getHeaderElement() {
    return document.querySelector('.site-header.home-header') || document.querySelector('.site-header');
  }

  function syncHeaderOffset() {
    var header = getHeaderElement();
    if (!header) {
      root.style.setProperty('--header-offset', '88px');
      return 88;
    }

    var measured = Math.round(header.getBoundingClientRect().height);
    var safeHeight = measured > 0 ? measured : 88;
    root.style.setProperty('--header-offset', safeHeight + 'px');
    return safeHeight;
  }

  function getHeaderOffset() {
    var measured = syncHeaderOffset();
    if (measured > 0) return measured;

    var raw = getComputedStyle(root).getPropertyValue('--header-offset') || '0';
    var parsed = parseInt(raw, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function isEnabledViewport() {
    return window.innerWidth >= ENABLED_MIN_WIDTH;
  }

  function isVisible(el) {
    if (!el) return false;
    var style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetParent !== null;
  }

  function getSnapSections() {
    var nodes = Array.from(document.querySelectorAll(
      '.hero, #sticky-panels > .sticky-panel, .loons-footer-container'
    ));

    return nodes.filter(isVisible);
  }

  function refreshTargets() {
    var sections = getSnapSections();
    var headerOffset = getHeaderOffset();

    targets = sections.map(function (section) {
      var top = section.getBoundingClientRect().top + window.scrollY;
      return Math.max(0, Math.round(top - headerOffset));
    });

    // Ensure targets are sorted and unique in case two sections resolve to same position.
    targets = targets
      .sort(function (a, b) {
        return a - b;
      })
      .filter(function (value, index, arr) {
        return index === 0 || Math.abs(value - arr[index - 1]) > 2;
      });
  }

  function getCurrentTargetIndex() {
    if (!targets.length) return 0;

    var y = window.scrollY;
    var idx = 0;

    for (var i = 0; i < targets.length; i += 1) {
      if (targets[i] <= y + 8) {
        idx = i;
      } else {
        break;
      }
    }

    return idx;
  }

  function clamp(num, min, max) {
    return Math.max(min, Math.min(max, num));
  }

  function animateTo(targetY) {
    if (isAnimating) return;

    var startY = window.scrollY;
    var delta = targetY - startY;

    if (Math.abs(delta) < 2) {
      window.scrollTo(0, targetY);
      return;
    }

    isAnimating = true;
    var start = performance.now();

    function easeInOutSine(t) {
      return -(Math.cos(Math.PI * t) - 1) / 2;
    }

    var duration = clamp(BASE_ANIMATION_MS + Math.abs(delta) * 0.2, BASE_ANIMATION_MS, MAX_ANIMATION_MS);

    function step(now) {
    var elapsed = now - start;
    var t = clamp(elapsed / duration, 0, 1);
  var eased = easeInOutSine(t);
      window.scrollTo(0, Math.round(startY + delta * eased));

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        window.setTimeout(function () {
          isAnimating = false;
        }, COOLDOWN_MS);
      }
    }

    rafId = requestAnimationFrame(step);
  }

  function snapByDirection(direction) {
    if (!targets.length || isAnimating) return;

    var current = getCurrentTargetIndex();
    var next = clamp(current + direction, 0, targets.length - 1);

    if (next === current) return;
    animateTo(targets[next]);
  }

  function shouldIgnoreEventTarget(target) {
    if (!target || !(target instanceof Element)) return false;
    return Boolean(target.closest('input, textarea, select, [contenteditable="true"], .carousel-track-container'));
  }

  function onWheel(event) {
    if (!isEnabledViewport()) return;
    if (shouldIgnoreEventTarget(event.target)) return;
    if (!targets.length) return;

    // Allow natural scrolling when the user is at the first/last snap target
    // and keeps scrolling outward so lower/upper content remains reachable.
    var current = getCurrentTargetIndex();
    var atFirst = current <= 0;
    var atLast = current >= targets.length - 1;
    if ((atFirst && event.deltaY < 0) || (atLast && event.deltaY > 0)) {
      return;
    }

    // Keep sections snapped while navigating inside the snap range.
    event.preventDefault();

    if (isAnimating) return;

    var now = performance.now();
    if (now - lastWheelAt > WHEEL_GESTURE_GAP_MS) {
      wheelAccumulator = 0;
    }

    lastWheelAt = now;

    // Gesture model: accumulate raw wheel intent with a small trigger threshold.
    wheelAccumulator += event.deltaY;

    if (Math.abs(wheelAccumulator) >= WHEEL_GESTURE_TRIGGER) {
      var direction = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;
      snapByDirection(direction);
    }
  }

  function onKeyDown(event) {
    if (!isEnabledViewport()) return;
    if (isAnimating) return;
    if (!targets.length) return;
    if (shouldIgnoreEventTarget(event.target)) return;

    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
      event.preventDefault();
      snapByDirection(1);
    } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
      event.preventDefault();
      snapByDirection(-1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      animateTo(targets[0]);
    } else if (event.key === 'End') {
      event.preventDefault();
      animateTo(targets[targets.length - 1]);
    }
  }

  function onTouchStart(event) {
    if (!isEnabledViewport()) return;
    if (!event.touches || event.touches.length !== 1) return;
    if (shouldIgnoreEventTarget(event.target)) return;

    touchStartY = event.touches[0].clientY;
    touchActive = true;
  }

  function onTouchMove(event) {
    if (!isEnabledViewport()) return;
    if (!touchActive) return;
    if (isAnimating) {
      event.preventDefault();
      return;
    }

    var currentY = event.touches[0].clientY;
    var dy = touchStartY - currentY;

    // Block natural scrolling only once swipe has intentional distance.
    if (Math.abs(dy) > 10) {
      event.preventDefault();
    }
  }

  function onTouchEnd(event) {
    if (!isEnabledViewport()) return;
    if (!touchActive) return;

    var changed = event.changedTouches && event.changedTouches[0];
    touchActive = false;
    if (!changed) return;

    var dy = touchStartY - changed.clientY;
    if (Math.abs(dy) < TOUCH_TRIGGER) return;
    if (isAnimating) return;

    snapByDirection(dy > 0 ? 1 : -1);
  }

  function onResize() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
      isAnimating = false;
    }
    syncHeaderOffset();
    refreshTargets();
  }

  function init() {
    syncHeaderOffset();
    refreshTargets();

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });

    // Refresh when images/fonts settle to keep section targets accurate.
    window.setTimeout(function () {
      syncHeaderOffset();
      refreshTargets();
    }, 300);
    window.setTimeout(function () {
      syncHeaderOffset();
      refreshTargets();
    }, 1200);
    window.setTimeout(function () {
      syncHeaderOffset();
      refreshTargets();
    }, 2200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
