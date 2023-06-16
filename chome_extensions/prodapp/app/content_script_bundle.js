(() => {
  // bazel-out/k8-fastbuild/bin/devtools/projects/protocol/src/lib/messages.mjs
  var PropType;
  (function(PropType2) {
    PropType2[PropType2["Number"] = 0] = "Number";
    PropType2[PropType2["String"] = 1] = "String";
    PropType2[PropType2["Null"] = 2] = "Null";
    PropType2[PropType2["Undefined"] = 3] = "Undefined";
    PropType2[PropType2["Symbol"] = 4] = "Symbol";
    PropType2[PropType2["HTMLNode"] = 5] = "HTMLNode";
    PropType2[PropType2["Boolean"] = 6] = "Boolean";
    PropType2[PropType2["BigInt"] = 7] = "BigInt";
    PropType2[PropType2["Function"] = 8] = "Function";
    PropType2[PropType2["Object"] = 9] = "Object";
    PropType2[PropType2["Date"] = 10] = "Date";
    PropType2[PropType2["Array"] = 11] = "Array";
    PropType2[PropType2["Unknown"] = 12] = "Unknown";
  })(PropType || (PropType = {}));
  var PropertyQueryTypes;
  (function(PropertyQueryTypes2) {
    PropertyQueryTypes2[PropertyQueryTypes2["All"] = 0] = "All";
    PropertyQueryTypes2[PropertyQueryTypes2["Specified"] = 1] = "Specified";
  })(PropertyQueryTypes || (PropertyQueryTypes = {}));

  // bazel-out/k8-fastbuild/bin/devtools/projects/protocol/src/lib/message-bus.mjs
  var MessageBus = class {
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/shell-chrome/src/app/chrome-message-bus.mjs
  var ChromeMessageBus = class extends MessageBus {
    constructor(_port) {
      super();
      this._port = _port;
      this._disconnected = false;
      this._listeners = [];
      _port.onDisconnect.addListener(() => {
        this._disconnected = true;
      });
    }
    onAny(cb) {
      const listener = (msg) => {
        cb(msg.topic, msg.args);
      };
      this._port.onMessage.addListener(listener);
      this._listeners.push(listener);
      return () => {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
        this._port.onMessage.removeListener(listener);
      };
    }
    on(topic, cb) {
      const listener = (msg) => {
        if (msg.topic === topic) {
          cb.apply(null, msg.args);
        }
      };
      this._port.onMessage.addListener(listener);
      this._listeners.push(listener);
      return () => {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
        this._port.onMessage.removeListener(listener);
      };
    }
    once(topic, cb) {
      const listener = (msg) => {
        if (msg.topic === topic) {
          cb.apply(null, msg.args);
          this._port.onMessage.removeListener(listener);
        }
      };
      this._port.onMessage.addListener(listener);
    }
    emit(topic, args) {
      if (this._disconnected) {
        return false;
      }
      this._port.postMessage({
        topic,
        args
      });
      return true;
    }
    destroy() {
      this._listeners.forEach((l) => window.removeEventListener("message", l));
      this._listeners = [];
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/shell-chrome/src/app/same-page-message-bus.mjs
  var SamePageMessageBus = class extends MessageBus {
    constructor(_source, _destination) {
      super();
      this._source = _source;
      this._destination = _destination;
      this._listeners = [];
    }
    onAny(cb) {
      const listener = (e) => {
        if (e.source !== window || !e.data || !e.data.topic || e.data.source !== this._destination) {
          return;
        }
        cb(e.data.topic, e.data.args);
      };
      window.addEventListener("message", listener);
      this._listeners.push(listener);
      return () => {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
        window.removeEventListener("message", listener);
      };
    }
    on(topic, cb) {
      const listener = (e) => {
        if (e.source !== window || !e.data || e.data.source !== this._destination || !e.data.topic) {
          return;
        }
        if (e.data.topic === topic) {
          cb.apply(null, e.data.args);
        }
      };
      window.addEventListener("message", listener);
      this._listeners.push(listener);
      return () => {
        this._listeners.splice(this._listeners.indexOf(listener), 1);
        window.removeEventListener("message", listener);
      };
    }
    once(topic, cb) {
      const listener = (e) => {
        if (e.source !== window || !e.data || e.data.source !== this._destination || !e.data.topic) {
          return;
        }
        if (e.data.topic === topic) {
          cb.apply(null, e.data.args);
        }
        window.removeEventListener("message", listener);
      };
      window.addEventListener("message", listener);
    }
    emit(topic, args) {
      window.postMessage({
        source: this._source,
        topic,
        args
      }, "*");
      return true;
    }
    destroy() {
      this._listeners.forEach((l) => window.removeEventListener("message", l));
      this._listeners = [];
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/shell-chrome/src/app/content-script.mjs
  var main = () => {
    let backgroundDisconnected = false;
    let backendInitialized = false;
    const port = chrome.runtime.connect({
      name: "content-script"
    });
    const handleDisconnect = () => {
      localMessageBus.emit("shutdown");
      localMessageBus.destroy();
      chromeMessageBus.destroy();
      backgroundDisconnected = true;
    };
    port.onDisconnect.addListener(handleDisconnect);
    const localMessageBus = new SamePageMessageBus("angular-devtools-content-script", "angular-devtools-backend");
    const chromeMessageBus = new ChromeMessageBus(port);
    const handshakeWithBackend = () => {
      localMessageBus.emit("handshake");
    };
    chromeMessageBus.onAny((topic, args) => {
      localMessageBus.emit(topic, args);
    });
    localMessageBus.onAny((topic, args) => {
      backendInitialized = true;
      chromeMessageBus.emit(topic, args);
    });
    if (!backendInitialized) {
      console.log("Attempting initialization", new Date());
      const retry = () => {
        if (backendInitialized || backgroundDisconnected) {
          return;
        }
        handshakeWithBackend();
        setTimeout(retry, 500);
      };
      retry();
    }
  };
  globalThis.main = main;
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//# sourceMappingURL=content_script_bundle.js.map
