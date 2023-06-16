(() => {
  // bazel-out/k8-fastbuild/bin/devtools/projects/shell-chrome/src/app/background.mjs
  var browserAction = chrome.browserAction || { setIcon: () => {
  }, setPopup: () => {
  } };
  browserAction.setIcon({
    path: {
      16: `assets/icon-bw16.png`,
      48: `assets/icon-bw48.png`,
      128: `assets/icon-bw128.png`
    }
  });
  var ports = {};
  chrome.runtime.onConnect.addListener((port) => {
    let tab = null;
    let name = null;
    console.log("Connection event in the background script");
    if (isNumeric(port.name)) {
      tab = port.name;
      console.log("Angular devtools connected, injecting the content script", port.name, ports[tab]);
      name = "devtools";
      installContentScript(parseInt(port.name, 10));
    } else {
      if (!port.sender || !port.sender.tab) {
        console.error("Unable to access the port sender and sender tab");
        return;
      }
      if (port.sender.tab.id === void 0) {
        console.error("Sender tab id is undefined");
        return;
      }
      console.log("Content script connected", port.sender.tab.id);
      tab = port.sender.tab.id.toString();
      name = "content-script";
    }
    let portsTab = ports[tab];
    if (!portsTab) {
      console.log("Creating a tab port");
      portsTab = ports[tab] = {
        devtools: null,
        "content-script": null
      };
    }
    portsTab[name] = port;
    if (portsTab.devtools && portsTab["content-script"]) {
      doublePipe(portsTab.devtools, portsTab["content-script"], tab);
    }
  });
  var isNumeric = (str) => {
    return +str + "" === str;
  };
  var installContentScript = (tabId) => {
    console.log("Installing the content-script");
    chrome.tabs.executeScript(tabId, { file: "app/content_script_bundle.js" }, (result) => {
      chrome.tabs.executeScript(tabId, {
        code: "globalThis.main()"
      });
    });
  };
  var doublePipe = (devtoolsPort, contentScriptPort, tab) => {
    if (devtoolsPort === null) {
      console.warn("DevTools port is equal to null");
      return;
    }
    console.log("Creating two-way communication channel", Date.now(), ports);
    const onDevToolsMessage = (message) => {
      contentScriptPort.postMessage(message);
    };
    devtoolsPort.onMessage.addListener(onDevToolsMessage);
    const onContentScriptMessage = (message) => {
      devtoolsPort.postMessage(message);
    };
    contentScriptPort.onMessage.addListener(onContentScriptMessage);
    const shutdown = (source) => {
      console.log("Disconnecting", source);
      devtoolsPort.onMessage.removeListener(onDevToolsMessage);
      contentScriptPort.onMessage.removeListener(onContentScriptMessage);
      devtoolsPort.disconnect();
      contentScriptPort.disconnect();
      ports[tab] = void 0;
    };
    devtoolsPort.onDisconnect.addListener(shutdown.bind(null, "devtools"));
    contentScriptPort.onDisconnect.addListener(shutdown.bind(null, "content-script"));
  };
  var getPopUpName = (ng) => {
    if (!ng.isAngular) {
      return "not-angular.html";
    }
    if (!ng.isIvy || !ng.isSupportedAngularVersion) {
      return "unsupported.html";
    }
    if (!ng.isDebugMode) {
      return "production.html";
    }
    return "supported.html";
  };
  chrome.runtime.onMessage.addListener((req, sender) => {
    if (!req.isAngularDevTools) {
      return;
    }
    if (sender && sender.tab) {
      browserAction.setPopup({
        tabId: sender.tab.id,
        popup: `popups/${getPopUpName(req)}`
      });
    }
    if (sender && sender.tab && req.isAngular) {
      browserAction.setIcon({
        tabId: sender.tab.id,
        path: {
          16: `assets/icon16.png`,
          48: `assets/icon48.png`,
          128: `assets/icon128.png`
        }
      });
    }
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//# sourceMappingURL=background_bundle.js.map
