(() => {
  // bazel-out/k8-fastbuild/bin/devtools/projects/shell-chrome/src/app/ng-validate.mjs
  window.addEventListener("message", (event) => {
    if (event.source === window && event.data) {
      chrome.runtime.sendMessage(event.data);
    }
  });
  function detectAngular(win) {
    const isDebugMode = Boolean(win.ng);
    const ngVersionElement = document.querySelector("[ng-version]");
    let isSupportedAngularVersion = false;
    let isAngular = false;
    if (ngVersionElement) {
      isAngular = true;
      const attr = ngVersionElement.getAttribute("ng-version");
      const major = attr ? parseInt(attr.split(".")[0], 10) : -1;
      if (attr && (major >= 9 || major === 0)) {
        isSupportedAngularVersion = true;
      }
    }
    win.postMessage({
      isIvy: typeof window.getAllAngularRootElements?.()?.[0]?.__ngContext__ !== "undefined",
      isAngular,
      isDebugMode,
      isSupportedAngularVersion,
      isAngularDevTools: true
    }, "*");
    if (!isAngular) {
      setTimeout(() => detectAngular(win), 1e3);
    }
  }
  function installScript(fn) {
    const source = `;(${fn})(window)`;
    const script = document.createElement("script");
    script.textContent = source;
    document.documentElement.appendChild(script);
    const parentElement = script.parentElement;
    if (parentElement) {
      parentElement.removeChild(script);
    }
  }
  if (document instanceof HTMLDocument) {
    installScript(detectAngular.toString());
  }
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//# sourceMappingURL=ng_validate_bundle.js.map
