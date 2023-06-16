(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, copyDefault, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toESM = (module, isNodeMode) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/semver-dsl/node_modules/semver/semver.js
  var require_semver = __commonJS({
    "node_modules/semver-dsl/node_modules/semver/semver.js"(exports, module) {
      exports = module.exports = SemVer;
      var debug;
      if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
        debug = function() {
          var args = Array.prototype.slice.call(arguments, 0);
          args.unshift("SEMVER");
          console.log.apply(console, args);
        };
      } else {
        debug = function() {
        };
      }
      exports.SEMVER_SPEC_VERSION = "2.0.0";
      var MAX_LENGTH = 256;
      var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
      var MAX_SAFE_COMPONENT_LENGTH = 16;
      var re = exports.re = [];
      var src = exports.src = [];
      var R = 0;
      var NUMERICIDENTIFIER = R++;
      src[NUMERICIDENTIFIER] = "0|[1-9]\\d*";
      var NUMERICIDENTIFIERLOOSE = R++;
      src[NUMERICIDENTIFIERLOOSE] = "[0-9]+";
      var NONNUMERICIDENTIFIER = R++;
      src[NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
      var MAINVERSION = R++;
      src[MAINVERSION] = "(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")\\.(" + src[NUMERICIDENTIFIER] + ")";
      var MAINVERSIONLOOSE = R++;
      src[MAINVERSIONLOOSE] = "(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")\\.(" + src[NUMERICIDENTIFIERLOOSE] + ")";
      var PRERELEASEIDENTIFIER = R++;
      src[PRERELEASEIDENTIFIER] = "(?:" + src[NUMERICIDENTIFIER] + "|" + src[NONNUMERICIDENTIFIER] + ")";
      var PRERELEASEIDENTIFIERLOOSE = R++;
      src[PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[NUMERICIDENTIFIERLOOSE] + "|" + src[NONNUMERICIDENTIFIER] + ")";
      var PRERELEASE = R++;
      src[PRERELEASE] = "(?:-(" + src[PRERELEASEIDENTIFIER] + "(?:\\." + src[PRERELEASEIDENTIFIER] + ")*))";
      var PRERELEASELOOSE = R++;
      src[PRERELEASELOOSE] = "(?:-?(" + src[PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[PRERELEASEIDENTIFIERLOOSE] + ")*))";
      var BUILDIDENTIFIER = R++;
      src[BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
      var BUILD = R++;
      src[BUILD] = "(?:\\+(" + src[BUILDIDENTIFIER] + "(?:\\." + src[BUILDIDENTIFIER] + ")*))";
      var FULL = R++;
      var FULLPLAIN = "v?" + src[MAINVERSION] + src[PRERELEASE] + "?" + src[BUILD] + "?";
      src[FULL] = "^" + FULLPLAIN + "$";
      var LOOSEPLAIN = "[v=\\s]*" + src[MAINVERSIONLOOSE] + src[PRERELEASELOOSE] + "?" + src[BUILD] + "?";
      var LOOSE = R++;
      src[LOOSE] = "^" + LOOSEPLAIN + "$";
      var GTLT = R++;
      src[GTLT] = "((?:<|>)?=?)";
      var XRANGEIDENTIFIERLOOSE = R++;
      src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
      var XRANGEIDENTIFIER = R++;
      src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + "|x|X|\\*";
      var XRANGEPLAIN = R++;
      src[XRANGEPLAIN] = "[v=\\s]*(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:\\.(" + src[XRANGEIDENTIFIER] + ")(?:" + src[PRERELEASE] + ")?" + src[BUILD] + "?)?)?";
      var XRANGEPLAINLOOSE = R++;
      src[XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:\\.(" + src[XRANGEIDENTIFIERLOOSE] + ")(?:" + src[PRERELEASELOOSE] + ")?" + src[BUILD] + "?)?)?";
      var XRANGE = R++;
      src[XRANGE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAIN] + "$";
      var XRANGELOOSE = R++;
      src[XRANGELOOSE] = "^" + src[GTLT] + "\\s*" + src[XRANGEPLAINLOOSE] + "$";
      var COERCE = R++;
      src[COERCE] = "(?:^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?(?:$|[^\\d])";
      var LONETILDE = R++;
      src[LONETILDE] = "(?:~>?)";
      var TILDETRIM = R++;
      src[TILDETRIM] = "(\\s*)" + src[LONETILDE] + "\\s+";
      re[TILDETRIM] = new RegExp(src[TILDETRIM], "g");
      var tildeTrimReplace = "$1~";
      var TILDE = R++;
      src[TILDE] = "^" + src[LONETILDE] + src[XRANGEPLAIN] + "$";
      var TILDELOOSE = R++;
      src[TILDELOOSE] = "^" + src[LONETILDE] + src[XRANGEPLAINLOOSE] + "$";
      var LONECARET = R++;
      src[LONECARET] = "(?:\\^)";
      var CARETTRIM = R++;
      src[CARETTRIM] = "(\\s*)" + src[LONECARET] + "\\s+";
      re[CARETTRIM] = new RegExp(src[CARETTRIM], "g");
      var caretTrimReplace = "$1^";
      var CARET = R++;
      src[CARET] = "^" + src[LONECARET] + src[XRANGEPLAIN] + "$";
      var CARETLOOSE = R++;
      src[CARETLOOSE] = "^" + src[LONECARET] + src[XRANGEPLAINLOOSE] + "$";
      var COMPARATORLOOSE = R++;
      src[COMPARATORLOOSE] = "^" + src[GTLT] + "\\s*(" + LOOSEPLAIN + ")$|^$";
      var COMPARATOR = R++;
      src[COMPARATOR] = "^" + src[GTLT] + "\\s*(" + FULLPLAIN + ")$|^$";
      var COMPARATORTRIM = R++;
      src[COMPARATORTRIM] = "(\\s*)" + src[GTLT] + "\\s*(" + LOOSEPLAIN + "|" + src[XRANGEPLAIN] + ")";
      re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], "g");
      var comparatorTrimReplace = "$1$2$3";
      var HYPHENRANGE = R++;
      src[HYPHENRANGE] = "^\\s*(" + src[XRANGEPLAIN] + ")\\s+-\\s+(" + src[XRANGEPLAIN] + ")\\s*$";
      var HYPHENRANGELOOSE = R++;
      src[HYPHENRANGELOOSE] = "^\\s*(" + src[XRANGEPLAINLOOSE] + ")\\s+-\\s+(" + src[XRANGEPLAINLOOSE] + ")\\s*$";
      var STAR = R++;
      src[STAR] = "(<|>)?=?\\s*\\*";
      for (i = 0; i < R; i++) {
        debug(i, src[i]);
        if (!re[i]) {
          re[i] = new RegExp(src[i]);
        }
      }
      var i;
      exports.parse = parse;
      function parse(version2, options) {
        if (!options || typeof options !== "object") {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }
        if (version2 instanceof SemVer) {
          return version2;
        }
        if (typeof version2 !== "string") {
          return null;
        }
        if (version2.length > MAX_LENGTH) {
          return null;
        }
        var r = options.loose ? re[LOOSE] : re[FULL];
        if (!r.test(version2)) {
          return null;
        }
        try {
          return new SemVer(version2, options);
        } catch (er) {
          return null;
        }
      }
      exports.valid = valid;
      function valid(version2, options) {
        var v = parse(version2, options);
        return v ? v.version : null;
      }
      exports.clean = clean;
      function clean(version2, options) {
        var s = parse(version2.trim().replace(/^[=v]+/, ""), options);
        return s ? s.version : null;
      }
      exports.SemVer = SemVer;
      function SemVer(version2, options) {
        if (!options || typeof options !== "object") {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }
        if (version2 instanceof SemVer) {
          if (version2.loose === options.loose) {
            return version2;
          } else {
            version2 = version2.version;
          }
        } else if (typeof version2 !== "string") {
          throw new TypeError("Invalid Version: " + version2);
        }
        if (version2.length > MAX_LENGTH) {
          throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
        }
        if (!(this instanceof SemVer)) {
          return new SemVer(version2, options);
        }
        debug("SemVer", version2, options);
        this.options = options;
        this.loose = !!options.loose;
        var m = version2.trim().match(options.loose ? re[LOOSE] : re[FULL]);
        if (!m) {
          throw new TypeError("Invalid Version: " + version2);
        }
        this.raw = version2;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map(function(id) {
            if (/^[0-9]+$/.test(id)) {
              var num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      SemVer.prototype.format = function() {
        this.version = this.major + "." + this.minor + "." + this.patch;
        if (this.prerelease.length) {
          this.version += "-" + this.prerelease.join(".");
        }
        return this.version;
      };
      SemVer.prototype.toString = function() {
        return this.version;
      };
      SemVer.prototype.compare = function(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        return this.compareMain(other) || this.comparePre(other);
      };
      SemVer.prototype.compareMain = function(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
      };
      SemVer.prototype.comparePre = function(other) {
        if (!(other instanceof SemVer)) {
          other = new SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        var i2 = 0;
        do {
          var a = this.prerelease[i2];
          var b = other.prerelease[i2];
          debug("prerelease compare", i2, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i2);
      };
      SemVer.prototype.inc = function(release, identifier) {
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier);
            }
            this.inc("pre", identifier);
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          case "pre":
            if (this.prerelease.length === 0) {
              this.prerelease = [0];
            } else {
              var i2 = this.prerelease.length;
              while (--i2 >= 0) {
                if (typeof this.prerelease[i2] === "number") {
                  this.prerelease[i2]++;
                  i2 = -2;
                }
              }
              if (i2 === -1) {
                this.prerelease.push(0);
              }
            }
            if (identifier) {
              if (this.prerelease[0] === identifier) {
                if (isNaN(this.prerelease[1])) {
                  this.prerelease = [identifier, 0];
                }
              } else {
                this.prerelease = [identifier, 0];
              }
            }
            break;
          default:
            throw new Error("invalid increment argument: " + release);
        }
        this.format();
        this.raw = this.version;
        return this;
      };
      exports.inc = inc;
      function inc(version2, release, loose, identifier) {
        if (typeof loose === "string") {
          identifier = loose;
          loose = void 0;
        }
        try {
          return new SemVer(version2, loose).inc(release, identifier).version;
        } catch (er) {
          return null;
        }
      }
      exports.diff = diff;
      function diff(version1, version2) {
        if (eq(version1, version2)) {
          return null;
        } else {
          var v1 = parse(version1);
          var v2 = parse(version2);
          var prefix = "";
          if (v1.prerelease.length || v2.prerelease.length) {
            prefix = "pre";
            var defaultResult = "prerelease";
          }
          for (var key in v1) {
            if (key === "major" || key === "minor" || key === "patch") {
              if (v1[key] !== v2[key]) {
                return prefix + key;
              }
            }
          }
          return defaultResult;
        }
      }
      exports.compareIdentifiers = compareIdentifiers;
      var numeric = /^[0-9]+$/;
      function compareIdentifiers(a, b) {
        var anum = numeric.test(a);
        var bnum = numeric.test(b);
        if (anum && bnum) {
          a = +a;
          b = +b;
        }
        return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
      }
      exports.rcompareIdentifiers = rcompareIdentifiers;
      function rcompareIdentifiers(a, b) {
        return compareIdentifiers(b, a);
      }
      exports.major = major;
      function major(a, loose) {
        return new SemVer(a, loose).major;
      }
      exports.minor = minor;
      function minor(a, loose) {
        return new SemVer(a, loose).minor;
      }
      exports.patch = patch;
      function patch(a, loose) {
        return new SemVer(a, loose).patch;
      }
      exports.compare = compare;
      function compare(a, b, loose) {
        return new SemVer(a, loose).compare(new SemVer(b, loose));
      }
      exports.compareLoose = compareLoose;
      function compareLoose(a, b) {
        return compare(a, b, true);
      }
      exports.rcompare = rcompare;
      function rcompare(a, b, loose) {
        return compare(b, a, loose);
      }
      exports.sort = sort;
      function sort(list, loose) {
        return list.sort(function(a, b) {
          return exports.compare(a, b, loose);
        });
      }
      exports.rsort = rsort;
      function rsort(list, loose) {
        return list.sort(function(a, b) {
          return exports.rcompare(a, b, loose);
        });
      }
      exports.gt = gt;
      function gt(a, b, loose) {
        return compare(a, b, loose) > 0;
      }
      exports.lt = lt;
      function lt(a, b, loose) {
        return compare(a, b, loose) < 0;
      }
      exports.eq = eq;
      function eq(a, b, loose) {
        return compare(a, b, loose) === 0;
      }
      exports.neq = neq;
      function neq(a, b, loose) {
        return compare(a, b, loose) !== 0;
      }
      exports.gte = gte;
      function gte(a, b, loose) {
        return compare(a, b, loose) >= 0;
      }
      exports.lte = lte;
      function lte(a, b, loose) {
        return compare(a, b, loose) <= 0;
      }
      exports.cmp = cmp;
      function cmp(a, op, b, loose) {
        switch (op) {
          case "===":
            if (typeof a === "object")
              a = a.version;
            if (typeof b === "object")
              b = b.version;
            return a === b;
          case "!==":
            if (typeof a === "object")
              a = a.version;
            if (typeof b === "object")
              b = b.version;
            return a !== b;
          case "":
          case "=":
          case "==":
            return eq(a, b, loose);
          case "!=":
            return neq(a, b, loose);
          case ">":
            return gt(a, b, loose);
          case ">=":
            return gte(a, b, loose);
          case "<":
            return lt(a, b, loose);
          case "<=":
            return lte(a, b, loose);
          default:
            throw new TypeError("Invalid operator: " + op);
        }
      }
      exports.Comparator = Comparator;
      function Comparator(comp, options) {
        if (!options || typeof options !== "object") {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }
        if (comp instanceof Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        if (!(this instanceof Comparator)) {
          return new Comparator(comp, options);
        }
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      var ANY = {};
      Comparator.prototype.parse = function(comp) {
        var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
        var m = comp.match(r);
        if (!m) {
          throw new TypeError("Invalid comparator: " + comp);
        }
        this.operator = m[1];
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      };
      Comparator.prototype.toString = function() {
        return this.value;
      };
      Comparator.prototype.test = function(version2) {
        debug("Comparator.test", version2, this.options.loose);
        if (this.semver === ANY) {
          return true;
        }
        if (typeof version2 === "string") {
          version2 = new SemVer(version2, this.options);
        }
        return cmp(version2, this.operator, this.semver, this.options);
      };
      Comparator.prototype.intersects = function(comp, options) {
        if (!(comp instanceof Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (!options || typeof options !== "object") {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }
        var rangeTmp;
        if (this.operator === "") {
          rangeTmp = new Range(comp.value, options);
          return satisfies(this.value, rangeTmp, options);
        } else if (comp.operator === "") {
          rangeTmp = new Range(this.value, options);
          return satisfies(comp.semver, rangeTmp, options);
        }
        var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
        var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
        var sameSemVer = this.semver.version === comp.semver.version;
        var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
        var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && ((this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<"));
        var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && ((this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">"));
        return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
      };
      exports.Range = Range;
      function Range(range, options) {
        if (!options || typeof options !== "object") {
          options = {
            loose: !!options,
            includePrerelease: false
          };
        }
        if (range instanceof Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          return new Range(range.value, options);
        }
        if (!(this instanceof Range)) {
          return new Range(range, options);
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range;
        this.set = range.split(/\s*\|\|\s*/).map(function(range2) {
          return this.parseRange(range2.trim());
        }, this).filter(function(c) {
          return c.length;
        });
        if (!this.set.length) {
          throw new TypeError("Invalid SemVer Range: " + range);
        }
        this.format();
      }
      Range.prototype.format = function() {
        this.range = this.set.map(function(comps) {
          return comps.join(" ").trim();
        }).join("||").trim();
        return this.range;
      };
      Range.prototype.toString = function() {
        return this.range;
      };
      Range.prototype.parseRange = function(range) {
        var loose = this.options.loose;
        range = range.trim();
        var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
        range = range.replace(hr, hyphenReplace);
        debug("hyphen replace", range);
        range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range, re[COMPARATORTRIM]);
        range = range.replace(re[TILDETRIM], tildeTrimReplace);
        range = range.replace(re[CARETTRIM], caretTrimReplace);
        range = range.split(/\s+/).join(" ");
        var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
        var set = range.split(" ").map(function(comp) {
          return parseComparator(comp, this.options);
        }, this).join(" ").split(/\s+/);
        if (this.options.loose) {
          set = set.filter(function(comp) {
            return !!comp.match(compRe);
          });
        }
        set = set.map(function(comp) {
          return new Comparator(comp, this.options);
        }, this);
        return set;
      };
      Range.prototype.intersects = function(range, options) {
        if (!(range instanceof Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some(function(thisComparators) {
          return thisComparators.every(function(thisComparator) {
            return range.set.some(function(rangeComparators) {
              return rangeComparators.every(function(rangeComparator) {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      };
      exports.toComparators = toComparators;
      function toComparators(range, options) {
        return new Range(range, options).set.map(function(comp) {
          return comp.map(function(c) {
            return c.value;
          }).join(" ").trim().split(" ");
        });
      }
      function parseComparator(comp, options) {
        debug("comp", comp, options);
        comp = replaceCarets(comp, options);
        debug("caret", comp);
        comp = replaceTildes(comp, options);
        debug("tildes", comp);
        comp = replaceXRanges(comp, options);
        debug("xrange", comp);
        comp = replaceStars(comp, options);
        debug("stars", comp);
        return comp;
      }
      function isX(id) {
        return !id || id.toLowerCase() === "x" || id === "*";
      }
      function replaceTildes(comp, options) {
        return comp.trim().split(/\s+/).map(function(comp2) {
          return replaceTilde(comp2, options);
        }).join(" ");
      }
      function replaceTilde(comp, options) {
        var r = options.loose ? re[TILDELOOSE] : re[TILDE];
        return comp.replace(r, function(_, M, m, p, pr) {
          debug("tilde", comp, _, M, m, p, pr);
          var ret;
          if (isX(M)) {
            ret = "";
          } else if (isX(m)) {
            ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
          } else if (isX(p)) {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          } else if (pr) {
            debug("replaceTilde pr", pr);
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
          } else {
            ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
          }
          debug("tilde return", ret);
          return ret;
        });
      }
      function replaceCarets(comp, options) {
        return comp.trim().split(/\s+/).map(function(comp2) {
          return replaceCaret(comp2, options);
        }).join(" ");
      }
      function replaceCaret(comp, options) {
        debug("caret", comp, options);
        var r = options.loose ? re[CARETLOOSE] : re[CARET];
        return comp.replace(r, function(_, M, m, p, pr) {
          debug("caret", comp, _, M, m, p, pr);
          var ret;
          if (isX(M)) {
            ret = "";
          } else if (isX(m)) {
            ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
          } else if (isX(p)) {
            if (M === "0") {
              ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
            } else {
              ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
            }
          } else if (pr) {
            debug("replaceCaret pr", pr);
            if (M === "0") {
              if (m === "0") {
                ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
              } else {
                ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
              }
            } else {
              ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
            }
          } else {
            debug("no pr");
            if (M === "0") {
              if (m === "0") {
                ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
              } else {
                ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
              }
            } else {
              ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
            }
          }
          debug("caret return", ret);
          return ret;
        });
      }
      function replaceXRanges(comp, options) {
        debug("replaceXRanges", comp, options);
        return comp.split(/\s+/).map(function(comp2) {
          return replaceXRange(comp2, options);
        }).join(" ");
      }
      function replaceXRange(comp, options) {
        comp = comp.trim();
        var r = options.loose ? re[XRANGELOOSE] : re[XRANGE];
        return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
          debug("xRange", comp, ret, gtlt, M, m, p, pr);
          var xM = isX(M);
          var xm = xM || isX(m);
          var xp = xm || isX(p);
          var anyX = xp;
          if (gtlt === "=" && anyX) {
            gtlt = "";
          }
          if (xM) {
            if (gtlt === ">" || gtlt === "<") {
              ret = "<0.0.0";
            } else {
              ret = "*";
            }
          } else if (gtlt && anyX) {
            if (xm) {
              m = 0;
            }
            p = 0;
            if (gtlt === ">") {
              gtlt = ">=";
              if (xm) {
                M = +M + 1;
                m = 0;
                p = 0;
              } else {
                m = +m + 1;
                p = 0;
              }
            } else if (gtlt === "<=") {
              gtlt = "<";
              if (xm) {
                M = +M + 1;
              } else {
                m = +m + 1;
              }
            }
            ret = gtlt + M + "." + m + "." + p;
          } else if (xm) {
            ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
          } else if (xp) {
            ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
          }
          debug("xRange return", ret);
          return ret;
        });
      }
      function replaceStars(comp, options) {
        debug("replaceStars", comp, options);
        return comp.trim().replace(re[STAR], "");
      }
      function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
        if (isX(fM)) {
          from = "";
        } else if (isX(fm)) {
          from = ">=" + fM + ".0.0";
        } else if (isX(fp)) {
          from = ">=" + fM + "." + fm + ".0";
        } else {
          from = ">=" + from;
        }
        if (isX(tM)) {
          to = "";
        } else if (isX(tm)) {
          to = "<" + (+tM + 1) + ".0.0";
        } else if (isX(tp)) {
          to = "<" + tM + "." + (+tm + 1) + ".0";
        } else if (tpr) {
          to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
        } else {
          to = "<=" + to;
        }
        return (from + " " + to).trim();
      }
      Range.prototype.test = function(version2) {
        if (!version2) {
          return false;
        }
        if (typeof version2 === "string") {
          version2 = new SemVer(version2, this.options);
        }
        for (var i2 = 0; i2 < this.set.length; i2++) {
          if (testSet(this.set[i2], version2, this.options)) {
            return true;
          }
        }
        return false;
      };
      function testSet(set, version2, options) {
        for (var i2 = 0; i2 < set.length; i2++) {
          if (!set[i2].test(version2)) {
            return false;
          }
        }
        if (version2.prerelease.length && !options.includePrerelease) {
          for (i2 = 0; i2 < set.length; i2++) {
            debug(set[i2].semver);
            if (set[i2].semver === ANY) {
              continue;
            }
            if (set[i2].semver.prerelease.length > 0) {
              var allowed = set[i2].semver;
              if (allowed.major === version2.major && allowed.minor === version2.minor && allowed.patch === version2.patch) {
                return true;
              }
            }
          }
          return false;
        }
        return true;
      }
      exports.satisfies = satisfies;
      function satisfies(version2, range, options) {
        try {
          range = new Range(range, options);
        } catch (er) {
          return false;
        }
        return range.test(version2);
      }
      exports.maxSatisfying = maxSatisfying;
      function maxSatisfying(versions, range, options) {
        var max = null;
        var maxSV = null;
        try {
          var rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions.forEach(function(v) {
          if (rangeObj.test(v)) {
            if (!max || maxSV.compare(v) === -1) {
              max = v;
              maxSV = new SemVer(max, options);
            }
          }
        });
        return max;
      }
      exports.minSatisfying = minSatisfying;
      function minSatisfying(versions, range, options) {
        var min = null;
        var minSV = null;
        try {
          var rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions.forEach(function(v) {
          if (rangeObj.test(v)) {
            if (!min || minSV.compare(v) === 1) {
              min = v;
              minSV = new SemVer(min, options);
            }
          }
        });
        return min;
      }
      exports.minVersion = minVersion;
      function minVersion(range, loose) {
        range = new Range(range, loose);
        var minver = new SemVer("0.0.0");
        if (range.test(minver)) {
          return minver;
        }
        minver = new SemVer("0.0.0-0");
        if (range.test(minver)) {
          return minver;
        }
        minver = null;
        for (var i2 = 0; i2 < range.set.length; ++i2) {
          var comparators = range.set[i2];
          comparators.forEach(function(comparator) {
            var compver = new SemVer(comparator.semver.version);
            switch (comparator.operator) {
              case ">":
                if (compver.prerelease.length === 0) {
                  compver.patch++;
                } else {
                  compver.prerelease.push(0);
                }
                compver.raw = compver.format();
              case "":
              case ">=":
                if (!minver || gt(minver, compver)) {
                  minver = compver;
                }
                break;
              case "<":
              case "<=":
                break;
              default:
                throw new Error("Unexpected operation: " + comparator.operator);
            }
          });
        }
        if (minver && range.test(minver)) {
          return minver;
        }
        return null;
      }
      exports.validRange = validRange;
      function validRange(range, options) {
        try {
          return new Range(range, options).range || "*";
        } catch (er) {
          return null;
        }
      }
      exports.ltr = ltr;
      function ltr(version2, range, options) {
        return outside(version2, range, "<", options);
      }
      exports.gtr = gtr;
      function gtr(version2, range, options) {
        return outside(version2, range, ">", options);
      }
      exports.outside = outside;
      function outside(version2, range, hilo, options) {
        version2 = new SemVer(version2, options);
        range = new Range(range, options);
        var gtfn, ltefn, ltfn, comp, ecomp;
        switch (hilo) {
          case ">":
            gtfn = gt;
            ltefn = lte;
            ltfn = lt;
            comp = ">";
            ecomp = ">=";
            break;
          case "<":
            gtfn = lt;
            ltefn = gte;
            ltfn = gt;
            comp = "<";
            ecomp = "<=";
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (satisfies(version2, range, options)) {
          return false;
        }
        for (var i2 = 0; i2 < range.set.length; ++i2) {
          var comparators = range.set[i2];
          var high = null;
          var low = null;
          comparators.forEach(function(comparator) {
            if (comparator.semver === ANY) {
              comparator = new Comparator(">=0.0.0");
            }
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) {
              high = comparator;
            } else if (ltfn(comparator.semver, low.semver, options)) {
              low = comparator;
            }
          });
          if (high.operator === comp || high.operator === ecomp) {
            return false;
          }
          if ((!low.operator || low.operator === comp) && ltefn(version2, low.semver)) {
            return false;
          } else if (low.operator === ecomp && ltfn(version2, low.semver)) {
            return false;
          }
        }
        return true;
      }
      exports.prerelease = prerelease;
      function prerelease(version2, options) {
        var parsed = parse(version2, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
      }
      exports.intersects = intersects;
      function intersects(r1, r2, options) {
        r1 = new Range(r1, options);
        r2 = new Range(r2, options);
        return r1.intersects(r2);
      }
      exports.coerce = coerce;
      function coerce(version2) {
        if (version2 instanceof SemVer) {
          return version2;
        }
        if (typeof version2 !== "string") {
          return null;
        }
        var match = version2.match(re[COERCE]);
        if (match == null) {
          return null;
        }
        return parse(match[1] + "." + (match[2] || "0") + "." + (match[3] || "0"));
      }
    }
  });

  // node_modules/semver-dsl/index.js
  var require_semver_dsl = __commonJS({
    "node_modules/semver-dsl/index.js"(exports) {
      "use strict";
      var semver = require_semver();
      exports.SemVerDSL = function(target, lastPredicate) {
        if (lastPredicate === void 0) {
          lastPredicate = function() {
            return true;
          };
        }
        function createBoundContext(lastPredicate2) {
          return Object.create({}, {
            else: {
              value: function(callback) {
                if (!lastPredicate2())
                  callback();
              }
            },
            elseIf: {
              get: function() {
                return exports.SemVerDSL(target, function() {
                  return !lastPredicate2();
                });
              }
            }
          });
        }
        ;
        var dsl = {
          gte: function(version2, callback) {
            var predicate = function() {
              return semver.gte(target, version2) && lastPredicate();
            };
            if (predicate())
              callback();
            return createBoundContext(predicate);
          },
          lte: function(version2, callback) {
            var predicate = function() {
              return semver.lte(target, version2) && lastPredicate();
            };
            if (predicate())
              callback();
            return createBoundContext(predicate);
          },
          gt: function(version2, callback) {
            var predicate = function() {
              return semver.gt(target, version2) && lastPredicate();
            };
            if (predicate())
              callback();
            return createBoundContext(predicate);
          },
          lt: function(version2, callback) {
            var predicate = function() {
              return semver.lt(target, version2) && lastPredicate();
            };
            if (predicate())
              callback();
            return createBoundContext(predicate);
          },
          eq: function(version2, callback) {
            var predicate = function() {
              return semver.eq(target, version2) && lastPredicate();
            };
            if (predicate())
              callback();
            return createBoundContext(predicate);
          },
          neq: function(version2, callback) {
            var predicate = function() {
              return semver.neq(target, version2) && lastPredicate();
            };
            if (predicate())
              callback();
            return createBoundContext(predicate);
          },
          between: function(v1, v2, callback) {
            var predicate = function() {
              return semver.gte(target, v1) && semver.lte(target, v2) && lastPredicate();
            };
            if (predicate())
              callback();
            return createBoundContext(predicate);
          }
        };
        return dsl;
      };
    }
  });

  // node_modules/rxjs/_esm2015/internal/util/isFunction.js
  function isFunction(x) {
    return typeof x === "function";
  }

  // node_modules/rxjs/_esm2015/internal/config.js
  var _enable_super_gross_mode_that_will_cause_bad_things = false;
  var config = {
    Promise: void 0,
    set useDeprecatedSynchronousErrorHandling(value) {
      if (value) {
        const error = new Error();
        console.warn("DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" + error.stack);
      } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
        console.log("RxJS: Back to a better error behavior. Thank you. <3");
      }
      _enable_super_gross_mode_that_will_cause_bad_things = value;
    },
    get useDeprecatedSynchronousErrorHandling() {
      return _enable_super_gross_mode_that_will_cause_bad_things;
    }
  };

  // node_modules/rxjs/_esm2015/internal/util/hostReportError.js
  function hostReportError(err) {
    setTimeout(() => {
      throw err;
    }, 0);
  }

  // node_modules/rxjs/_esm2015/internal/Observer.js
  var empty = {
    closed: true,
    next(value) {
    },
    error(err) {
      if (config.useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        hostReportError(err);
      }
    },
    complete() {
    }
  };

  // node_modules/rxjs/_esm2015/internal/util/isArray.js
  var isArray = (() => Array.isArray || ((x) => x && typeof x.length === "number"))();

  // node_modules/rxjs/_esm2015/internal/util/isObject.js
  function isObject(x) {
    return x !== null && typeof x === "object";
  }

  // node_modules/rxjs/_esm2015/internal/util/UnsubscriptionError.js
  var UnsubscriptionErrorImpl = (() => {
    function UnsubscriptionErrorImpl2(errors) {
      Error.call(this);
      this.message = errors ? `${errors.length} errors occurred during unsubscription:
${errors.map((err, i) => `${i + 1}) ${err.toString()}`).join("\n  ")}` : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
      return this;
    }
    UnsubscriptionErrorImpl2.prototype = Object.create(Error.prototype);
    return UnsubscriptionErrorImpl2;
  })();
  var UnsubscriptionError = UnsubscriptionErrorImpl;

  // node_modules/rxjs/_esm2015/internal/Subscription.js
  var Subscription = class {
    constructor(unsubscribe) {
      this.closed = false;
      this._parentOrParents = null;
      this._subscriptions = null;
      if (unsubscribe) {
        this._ctorUnsubscribe = true;
        this._unsubscribe = unsubscribe;
      }
    }
    unsubscribe() {
      let errors;
      if (this.closed) {
        return;
      }
      let { _parentOrParents, _ctorUnsubscribe, _unsubscribe, _subscriptions } = this;
      this.closed = true;
      this._parentOrParents = null;
      this._subscriptions = null;
      if (_parentOrParents instanceof Subscription) {
        _parentOrParents.remove(this);
      } else if (_parentOrParents !== null) {
        for (let index = 0; index < _parentOrParents.length; ++index) {
          const parent = _parentOrParents[index];
          parent.remove(this);
        }
      }
      if (isFunction(_unsubscribe)) {
        if (_ctorUnsubscribe) {
          this._unsubscribe = void 0;
        }
        try {
          _unsubscribe.call(this);
        } catch (e) {
          errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
        }
      }
      if (isArray(_subscriptions)) {
        let index = -1;
        let len = _subscriptions.length;
        while (++index < len) {
          const sub = _subscriptions[index];
          if (isObject(sub)) {
            try {
              sub.unsubscribe();
            } catch (e) {
              errors = errors || [];
              if (e instanceof UnsubscriptionError) {
                errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
              } else {
                errors.push(e);
              }
            }
          }
        }
      }
      if (errors) {
        throw new UnsubscriptionError(errors);
      }
    }
    add(teardown) {
      let subscription = teardown;
      if (!teardown) {
        return Subscription.EMPTY;
      }
      switch (typeof teardown) {
        case "function":
          subscription = new Subscription(teardown);
        case "object":
          if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== "function") {
            return subscription;
          } else if (this.closed) {
            subscription.unsubscribe();
            return subscription;
          } else if (!(subscription instanceof Subscription)) {
            const tmp = subscription;
            subscription = new Subscription();
            subscription._subscriptions = [tmp];
          }
          break;
        default: {
          throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
        }
      }
      let { _parentOrParents } = subscription;
      if (_parentOrParents === null) {
        subscription._parentOrParents = this;
      } else if (_parentOrParents instanceof Subscription) {
        if (_parentOrParents === this) {
          return subscription;
        }
        subscription._parentOrParents = [_parentOrParents, this];
      } else if (_parentOrParents.indexOf(this) === -1) {
        _parentOrParents.push(this);
      } else {
        return subscription;
      }
      const subscriptions = this._subscriptions;
      if (subscriptions === null) {
        this._subscriptions = [subscription];
      } else {
        subscriptions.push(subscription);
      }
      return subscription;
    }
    remove(subscription) {
      const subscriptions = this._subscriptions;
      if (subscriptions) {
        const subscriptionIndex = subscriptions.indexOf(subscription);
        if (subscriptionIndex !== -1) {
          subscriptions.splice(subscriptionIndex, 1);
        }
      }
    }
  };
  Subscription.EMPTY = function(empty2) {
    empty2.closed = true;
    return empty2;
  }(new Subscription());
  function flattenUnsubscriptionErrors(errors) {
    return errors.reduce((errs, err) => errs.concat(err instanceof UnsubscriptionError ? err.errors : err), []);
  }

  // node_modules/rxjs/_esm2015/internal/symbol/rxSubscriber.js
  var rxSubscriber = (() => typeof Symbol === "function" ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random())();

  // node_modules/rxjs/_esm2015/internal/Subscriber.js
  var Subscriber = class extends Subscription {
    constructor(destinationOrNext, error, complete) {
      super();
      this.syncErrorValue = null;
      this.syncErrorThrown = false;
      this.syncErrorThrowable = false;
      this.isStopped = false;
      switch (arguments.length) {
        case 0:
          this.destination = empty;
          break;
        case 1:
          if (!destinationOrNext) {
            this.destination = empty;
            break;
          }
          if (typeof destinationOrNext === "object") {
            if (destinationOrNext instanceof Subscriber) {
              this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
              this.destination = destinationOrNext;
              destinationOrNext.add(this);
            } else {
              this.syncErrorThrowable = true;
              this.destination = new SafeSubscriber(this, destinationOrNext);
            }
            break;
          }
        default:
          this.syncErrorThrowable = true;
          this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
          break;
      }
    }
    [rxSubscriber]() {
      return this;
    }
    static create(next, error, complete) {
      const subscriber = new Subscriber(next, error, complete);
      subscriber.syncErrorThrowable = false;
      return subscriber;
    }
    next(value) {
      if (!this.isStopped) {
        this._next(value);
      }
    }
    error(err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this._error(err);
      }
    }
    complete() {
      if (!this.isStopped) {
        this.isStopped = true;
        this._complete();
      }
    }
    unsubscribe() {
      if (this.closed) {
        return;
      }
      this.isStopped = true;
      super.unsubscribe();
    }
    _next(value) {
      this.destination.next(value);
    }
    _error(err) {
      this.destination.error(err);
      this.unsubscribe();
    }
    _complete() {
      this.destination.complete();
      this.unsubscribe();
    }
    _unsubscribeAndRecycle() {
      const { _parentOrParents } = this;
      this._parentOrParents = null;
      this.unsubscribe();
      this.closed = false;
      this.isStopped = false;
      this._parentOrParents = _parentOrParents;
      return this;
    }
  };
  var SafeSubscriber = class extends Subscriber {
    constructor(_parentSubscriber, observerOrNext, error, complete) {
      super();
      this._parentSubscriber = _parentSubscriber;
      let next;
      let context = this;
      if (isFunction(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;
        if (observerOrNext !== empty) {
          context = Object.create(observerOrNext);
          if (isFunction(context.unsubscribe)) {
            this.add(context.unsubscribe.bind(context));
          }
          context.unsubscribe = this.unsubscribe.bind(this);
        }
      }
      this._context = context;
      this._next = next;
      this._error = error;
      this._complete = complete;
    }
    next(value) {
      if (!this.isStopped && this._next) {
        const { _parentSubscriber } = this;
        if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._next, value);
        } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
          this.unsubscribe();
        }
      }
    }
    error(err) {
      if (!this.isStopped) {
        const { _parentSubscriber } = this;
        const { useDeprecatedSynchronousErrorHandling } = config;
        if (this._error) {
          if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(this._error, err);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, this._error, err);
            this.unsubscribe();
          }
        } else if (!_parentSubscriber.syncErrorThrowable) {
          this.unsubscribe();
          if (useDeprecatedSynchronousErrorHandling) {
            throw err;
          }
          hostReportError(err);
        } else {
          if (useDeprecatedSynchronousErrorHandling) {
            _parentSubscriber.syncErrorValue = err;
            _parentSubscriber.syncErrorThrown = true;
          } else {
            hostReportError(err);
          }
          this.unsubscribe();
        }
      }
    }
    complete() {
      if (!this.isStopped) {
        const { _parentSubscriber } = this;
        if (this._complete) {
          const wrappedComplete = () => this._complete.call(this._context);
          if (!config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
            this.__tryOrUnsub(wrappedComplete);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parentSubscriber, wrappedComplete);
            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    }
    __tryOrUnsub(fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        this.unsubscribe();
        if (config.useDeprecatedSynchronousErrorHandling) {
          throw err;
        } else {
          hostReportError(err);
        }
      }
    }
    __tryOrSetError(parent, fn, value) {
      if (!config.useDeprecatedSynchronousErrorHandling) {
        throw new Error("bad call");
      }
      try {
        fn.call(this._context, value);
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          parent.syncErrorValue = err;
          parent.syncErrorThrown = true;
          return true;
        } else {
          hostReportError(err);
          return true;
        }
      }
      return false;
    }
    _unsubscribe() {
      const { _parentSubscriber } = this;
      this._context = null;
      this._parentSubscriber = null;
      _parentSubscriber.unsubscribe();
    }
  };

  // node_modules/rxjs/_esm2015/internal/util/canReportError.js
  function canReportError(observer) {
    while (observer) {
      const { closed, destination, isStopped } = observer;
      if (closed || isStopped) {
        return false;
      } else if (destination && destination instanceof Subscriber) {
        observer = destination;
      } else {
        observer = null;
      }
    }
    return true;
  }

  // node_modules/rxjs/_esm2015/internal/util/toSubscriber.js
  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver) {
      if (nextOrObserver instanceof Subscriber) {
        return nextOrObserver;
      }
      if (nextOrObserver[rxSubscriber]) {
        return nextOrObserver[rxSubscriber]();
      }
    }
    if (!nextOrObserver && !error && !complete) {
      return new Subscriber(empty);
    }
    return new Subscriber(nextOrObserver, error, complete);
  }

  // node_modules/rxjs/_esm2015/internal/symbol/observable.js
  var observable = (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();

  // node_modules/rxjs/_esm2015/internal/util/identity.js
  function identity(x) {
    return x;
  }

  // node_modules/rxjs/_esm2015/internal/util/pipe.js
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce((prev, fn) => fn(prev), input);
    };
  }

  // node_modules/rxjs/_esm2015/internal/Observable.js
  var Observable = class {
    constructor(subscribe) {
      this._isScalar = false;
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    lift(operator) {
      const observable2 = new Observable();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    }
    subscribe(observerOrNext, error, complete) {
      const { operator } = this;
      const sink = toSubscriber(observerOrNext, error, complete);
      if (operator) {
        sink.add(operator.call(sink, this.source));
      } else {
        sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
      }
      if (config.useDeprecatedSynchronousErrorHandling) {
        if (sink.syncErrorThrowable) {
          sink.syncErrorThrowable = false;
          if (sink.syncErrorThrown) {
            throw sink.syncErrorValue;
          }
        }
      }
      return sink;
    }
    _trySubscribe(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        if (config.useDeprecatedSynchronousErrorHandling) {
          sink.syncErrorThrown = true;
          sink.syncErrorValue = err;
        }
        if (canReportError(sink)) {
          sink.error(err);
        } else {
          console.warn(err);
        }
      }
    }
    forEach(next, promiseCtor) {
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor((resolve, reject) => {
        let subscription;
        subscription = this.subscribe((value) => {
          try {
            next(value);
          } catch (err) {
            reject(err);
            if (subscription) {
              subscription.unsubscribe();
            }
          }
        }, reject, resolve);
      });
    }
    _subscribe(subscriber) {
      const { source } = this;
      return source && source.subscribe(subscriber);
    }
    [observable]() {
      return this;
    }
    pipe(...operations) {
      if (operations.length === 0) {
        return this;
      }
      return pipeFromArray(operations)(this);
    }
    toPromise(promiseCtor) {
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor((resolve, reject) => {
        let value;
        this.subscribe((x) => value = x, (err) => reject(err), () => resolve(value));
      });
    }
  };
  Observable.create = (subscribe) => {
    return new Observable(subscribe);
  };
  function getPromiseCtor(promiseCtor) {
    if (!promiseCtor) {
      promiseCtor = config.Promise || Promise;
    }
    if (!promiseCtor) {
      throw new Error("no Promise impl found");
    }
    return promiseCtor;
  }

  // node_modules/rxjs/_esm2015/internal/scheduler/Action.js
  var Action = class extends Subscription {
    constructor(scheduler, work) {
      super();
    }
    schedule(state, delay = 0) {
      return this;
    }
  };

  // node_modules/rxjs/_esm2015/internal/scheduler/AsyncAction.js
  var AsyncAction = class extends Action {
    constructor(scheduler, work) {
      super(scheduler, work);
      this.scheduler = scheduler;
      this.work = work;
      this.pending = false;
    }
    schedule(state, delay = 0) {
      if (this.closed) {
        return this;
      }
      this.state = state;
      const id = this.id;
      const scheduler = this.scheduler;
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, delay);
      }
      this.pending = true;
      this.delay = delay;
      this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
      return this;
    }
    requestAsyncId(scheduler, id, delay = 0) {
      return setInterval(scheduler.flush.bind(scheduler, this), delay);
    }
    recycleAsyncId(scheduler, id, delay = 0) {
      if (delay !== null && this.delay === delay && this.pending === false) {
        return id;
      }
      clearInterval(id);
      return void 0;
    }
    execute(state, delay) {
      if (this.closed) {
        return new Error("executing a cancelled action");
      }
      this.pending = false;
      const error = this._execute(state, delay);
      if (error) {
        return error;
      } else if (this.pending === false && this.id != null) {
        this.id = this.recycleAsyncId(this.scheduler, this.id, null);
      }
    }
    _execute(state, delay) {
      let errored = false;
      let errorValue = void 0;
      try {
        this.work(state);
      } catch (e) {
        errored = true;
        errorValue = !!e && e || new Error(e);
      }
      if (errored) {
        this.unsubscribe();
        return errorValue;
      }
    }
    _unsubscribe() {
      const id = this.id;
      const scheduler = this.scheduler;
      const actions = scheduler.actions;
      const index = actions.indexOf(this);
      this.work = null;
      this.state = null;
      this.pending = false;
      this.scheduler = null;
      if (index !== -1) {
        actions.splice(index, 1);
      }
      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }
      this.delay = null;
    }
  };

  // node_modules/rxjs/_esm2015/internal/Scheduler.js
  var Scheduler = class {
    constructor(SchedulerAction, now = Scheduler.now) {
      this.SchedulerAction = SchedulerAction;
      this.now = now;
    }
    schedule(work, delay = 0, state) {
      return new this.SchedulerAction(this, work).schedule(state, delay);
    }
  };
  Scheduler.now = () => Date.now();

  // node_modules/rxjs/_esm2015/internal/scheduler/AsyncScheduler.js
  var AsyncScheduler = class extends Scheduler {
    constructor(SchedulerAction, now = Scheduler.now) {
      super(SchedulerAction, () => {
        if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
          return AsyncScheduler.delegate.now();
        } else {
          return now();
        }
      });
      this.actions = [];
      this.active = false;
      this.scheduled = void 0;
    }
    schedule(work, delay = 0, state) {
      if (AsyncScheduler.delegate && AsyncScheduler.delegate !== this) {
        return AsyncScheduler.delegate.schedule(work, delay, state);
      } else {
        return super.schedule(work, delay, state);
      }
    }
    flush(action) {
      const { actions } = this;
      if (this.active) {
        actions.push(action);
        return;
      }
      let error;
      this.active = true;
      do {
        if (error = action.execute(action.state, action.delay)) {
          break;
        }
      } while (action = actions.shift());
      this.active = false;
      if (error) {
        while (action = actions.shift()) {
          action.unsubscribe();
        }
        throw error;
      }
    }
  };

  // node_modules/rxjs/_esm2015/internal/scheduler/async.js
  var asyncScheduler = new AsyncScheduler(AsyncAction);
  var async = asyncScheduler;

  // node_modules/rxjs/_esm2015/internal/operators/debounceTime.js
  function debounceTime(dueTime, scheduler = async) {
    return (source) => source.lift(new DebounceTimeOperator(dueTime, scheduler));
  }
  var DebounceTimeOperator = class {
    constructor(dueTime, scheduler) {
      this.dueTime = dueTime;
      this.scheduler = scheduler;
    }
    call(subscriber, source) {
      return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
    }
  };
  var DebounceTimeSubscriber = class extends Subscriber {
    constructor(destination, dueTime, scheduler) {
      super(destination);
      this.dueTime = dueTime;
      this.scheduler = scheduler;
      this.debouncedSubscription = null;
      this.lastValue = null;
      this.hasValue = false;
    }
    _next(value) {
      this.clearDebounce();
      this.lastValue = value;
      this.hasValue = true;
      this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
    }
    _complete() {
      this.debouncedNext();
      this.destination.complete();
    }
    debouncedNext() {
      this.clearDebounce();
      if (this.hasValue) {
        const { lastValue } = this;
        this.lastValue = null;
        this.hasValue = false;
        this.destination.next(lastValue);
      }
    }
    clearDebounce() {
      const debouncedSubscription = this.debouncedSubscription;
      if (debouncedSubscription !== null) {
        this.remove(debouncedSubscription);
        debouncedSubscription.unsubscribe();
        this.debouncedSubscription = null;
      }
    }
  };
  function dispatchNext(subscriber) {
    subscriber.debouncedNext();
  }

  // node_modules/rxjs/_esm2015/internal/util/ObjectUnsubscribedError.js
  var ObjectUnsubscribedErrorImpl = (() => {
    function ObjectUnsubscribedErrorImpl2() {
      Error.call(this);
      this.message = "object unsubscribed";
      this.name = "ObjectUnsubscribedError";
      return this;
    }
    ObjectUnsubscribedErrorImpl2.prototype = Object.create(Error.prototype);
    return ObjectUnsubscribedErrorImpl2;
  })();
  var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl;

  // node_modules/rxjs/_esm2015/internal/SubjectSubscription.js
  var SubjectSubscription = class extends Subscription {
    constructor(subject, subscriber) {
      super();
      this.subject = subject;
      this.subscriber = subscriber;
      this.closed = false;
    }
    unsubscribe() {
      if (this.closed) {
        return;
      }
      this.closed = true;
      const subject = this.subject;
      const observers = subject.observers;
      this.subject = null;
      if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
        return;
      }
      const subscriberIndex = observers.indexOf(this.subscriber);
      if (subscriberIndex !== -1) {
        observers.splice(subscriberIndex, 1);
      }
    }
  };

  // node_modules/rxjs/_esm2015/internal/Subject.js
  var SubjectSubscriber = class extends Subscriber {
    constructor(destination) {
      super(destination);
      this.destination = destination;
    }
  };
  var Subject = class extends Observable {
    constructor() {
      super();
      this.observers = [];
      this.closed = false;
      this.isStopped = false;
      this.hasError = false;
      this.thrownError = null;
    }
    [rxSubscriber]() {
      return new SubjectSubscriber(this);
    }
    lift(operator) {
      const subject = new AnonymousSubject(this, this);
      subject.operator = operator;
      return subject;
    }
    next(value) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
      if (!this.isStopped) {
        const { observers } = this;
        const len = observers.length;
        const copy = observers.slice();
        for (let i = 0; i < len; i++) {
          copy[i].next(value);
        }
      }
    }
    error(err) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
      this.hasError = true;
      this.thrownError = err;
      this.isStopped = true;
      const { observers } = this;
      const len = observers.length;
      const copy = observers.slice();
      for (let i = 0; i < len; i++) {
        copy[i].error(err);
      }
      this.observers.length = 0;
    }
    complete() {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      }
      this.isStopped = true;
      const { observers } = this;
      const len = observers.length;
      const copy = observers.slice();
      for (let i = 0; i < len; i++) {
        copy[i].complete();
      }
      this.observers.length = 0;
    }
    unsubscribe() {
      this.isStopped = true;
      this.closed = true;
      this.observers = null;
    }
    _trySubscribe(subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else {
        return super._trySubscribe(subscriber);
      }
    }
    _subscribe(subscriber) {
      if (this.closed) {
        throw new ObjectUnsubscribedError();
      } else if (this.hasError) {
        subscriber.error(this.thrownError);
        return Subscription.EMPTY;
      } else if (this.isStopped) {
        subscriber.complete();
        return Subscription.EMPTY;
      } else {
        this.observers.push(subscriber);
        return new SubjectSubscription(this, subscriber);
      }
    }
    asObservable() {
      const observable2 = new Observable();
      observable2.source = this;
      return observable2;
    }
  };
  Subject.create = (destination, source) => {
    return new AnonymousSubject(destination, source);
  };
  var AnonymousSubject = class extends Subject {
    constructor(destination, source) {
      super();
      this.destination = destination;
      this.source = source;
    }
    next(value) {
      const { destination } = this;
      if (destination && destination.next) {
        destination.next(value);
      }
    }
    error(err) {
      const { destination } = this;
      if (destination && destination.error) {
        this.destination.error(err);
      }
    }
    complete() {
      const { destination } = this;
      if (destination && destination.complete) {
        this.destination.complete();
      }
    }
    _subscribe(subscriber) {
      const { source } = this;
      if (source) {
        return this.source.subscribe(subscriber);
      } else {
        return Subscription.EMPTY;
      }
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/angular-check.mjs
  var appIsAngularInDevMode = () => {
    return appIsAngular() && appHasGlobalNgDebugObject();
  };
  var appIsAngularIvy = () => {
    return typeof window.getAllAngularRootElements?.()?.[0]?.__ngContext__ !== "undefined";
  };
  var appIsAngular = () => {
    return !!getAngularVersion();
  };
  var appIsSupportedAngularVersion = () => {
    const version2 = getAngularVersion();
    if (!version2) {
      return false;
    }
    const major = parseInt(version2.toString().split(".")[0], 10);
    return appIsAngular() && (major >= 9 || major === 0);
  };
  var appHasGlobalNgDebugObject = () => {
    return typeof ng === "object" && (typeof ng.getComponent === "function" || typeof ng.probe === "function");
  };
  var getAngularVersion = () => {
    const el = document.querySelector("[ng-version]");
    if (!el) {
      return null;
    }
    return el.getAttribute("ng-version");
  };

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

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/directive-forest/ltree.mjs
  var import_semver_dsl = __toESM(require_semver_dsl(), 1);

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/highlighter.mjs
  var overlay;
  var overlayContent;
  var DEV_TOOLS_HIGHLIGHT_NODE_ID = "____ngDevToolsHighlight";
  function init() {
    if (overlay) {
      return;
    }
    overlay = document.createElement("div");
    overlay.style.backgroundColor = "rgba(104, 182, 255, 0.35)";
    overlay.style.position = "fixed";
    overlay.style.zIndex = "2147483647";
    overlay.style.pointerEvents = "none";
    overlay.style.display = "flex";
    overlay.style.borderRadius = "3px";
    overlay.setAttribute("id", DEV_TOOLS_HIGHLIGHT_NODE_ID);
    overlayContent = document.createElement("div");
    overlayContent.style.backgroundColor = "rgba(104, 182, 255, 0.9)";
    overlayContent.style.position = "absolute";
    overlayContent.style.bottom = "-23px";
    overlayContent.style.right = "0px";
    overlayContent.style.fontFamily = "monospace";
    overlayContent.style.fontSize = "11px";
    overlayContent.style.padding = "2px 3px";
    overlayContent.style.borderRadius = "3px";
    overlayContent.style.color = "white";
    overlay.appendChild(overlayContent);
  }
  var findComponentAndHost = (el) => {
    if (!el) {
      return { component: null, host: null };
    }
    while (el) {
      const component = el instanceof HTMLElement && ng.getComponent(el);
      if (component) {
        return { component, host: el };
      }
      if (!el.parentElement) {
        break;
      }
      el = el.parentElement;
    }
    return { component: null, host: null };
  };
  var getDirectiveName = (dir) => {
    if (dir) {
      return dir.constructor.name;
    }
    return "unknown";
  };
  var highlight = (el) => {
    const cmp = findComponentAndHost(el).component;
    const rect = getComponentRect(el);
    init();
    if (rect) {
      const content = [];
      const name = getDirectiveName(cmp);
      if (name) {
        const pre = document.createElement("span");
        pre.style.opacity = "0.6";
        pre.innerText = "<";
        const text = document.createTextNode(name);
        const post = document.createElement("span");
        post.style.opacity = "0.6";
        post.innerText = ">";
        content.push(pre, text, post);
      }
      showOverlay(rect, content);
    }
  };
  function unHighlight() {
    if (overlay && overlay.parentNode) {
      document.body.removeChild(overlay);
    }
  }
  function inDoc(node) {
    if (!node) {
      return false;
    }
    const doc = node.ownerDocument.documentElement;
    const parent = node.parentNode;
    return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
  }
  function getComponentRect(el) {
    if (!(el instanceof HTMLElement)) {
      return;
    }
    if (!inDoc(el)) {
      return;
    }
    return el.getBoundingClientRect();
  }
  function showOverlay({ width = 0, height = 0, top = 0, left = 0 }, content = []) {
    overlay.style.width = ~~width + "px";
    overlay.style.height = ~~height + "px";
    overlay.style.top = ~~top + "px";
    overlay.style.left = ~~left + "px";
    overlayContent.replaceChildren();
    content.forEach((child) => overlayContent.appendChild(child));
    document.body.appendChild(overlay);
  }

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/utils.mjs
  var runOutsideAngular = (f) => {
    const w = window;
    if (!w.Zone || !w.Zone.current) {
      f();
      return;
    }
    if (w.Zone.current._name !== "angular") {
      w.Zone.current.run(f);
      return;
    }
    const parent = w.Zone.current._parent;
    if (parent && parent.run) {
      parent.run(f);
      return;
    }
    f();
  };
  var isCustomElement = (node) => {
    if (typeof customElements === "undefined") {
      return false;
    }
    if (!(node instanceof HTMLElement)) {
      return false;
    }
    const tagName = node.tagName.toLowerCase();
    return !!customElements.get(tagName);
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/version.mjs
  var versionElement = document.querySelector("[ng-version]");
  var versionRe = /(\d+\.\d+\.\d+(-(next|rc)\.\d+)?)/;
  var defaultVersion = "0.0.0";
  var version = defaultVersion;
  if (versionElement) {
    version = versionElement.getAttribute("ng-version") ?? defaultVersion;
    version = (version.match(versionRe) ?? [""])[0] ?? defaultVersion;
  }
  var VERSION = version;

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/directive-forest/ltree.mjs
  var HEADER_OFFSET = 19;
  var latest = () => {
    HEADER_OFFSET = 20;
  };
  (0, import_semver_dsl.SemVerDSL)(VERSION).gte("10.0.0-next.4", latest);
  (0, import_semver_dsl.SemVerDSL)(VERSION).eq("0.0.0", latest);
  var TYPE = 1;
  var ELEMENT = 0;
  var LVIEW_TVIEW = 1;
  var isLContainer = (value) => {
    return Array.isArray(value) && value[TYPE] === true;
  };
  var isLView = (value) => {
    return Array.isArray(value) && typeof value[TYPE] === "object";
  };
  var METADATA_PROPERTY_NAME = "__ngContext__";
  var getLViewFromDirectiveOrElementInstance = (dir) => {
    if (!dir) {
      return null;
    }
    const context = dir[METADATA_PROPERTY_NAME];
    if (!context) {
      return null;
    }
    if (isLView(context)) {
      return context;
    }
    return context.lView;
  };
  var getDirectiveHostElement = (dir) => {
    if (!dir) {
      return false;
    }
    const ctx = dir[METADATA_PROPERTY_NAME];
    if (!ctx) {
      return false;
    }
    if (ctx[0] !== null) {
      return ctx[0];
    }
    const components = ctx[LVIEW_TVIEW].components;
    if (!components || components.length !== 1) {
      return false;
    }
    return ctx[components[0]][0];
  };
  var LTreeStrategy = class {
    supports(element) {
      return typeof element.__ngContext__ !== "undefined";
    }
    _getNode(lView, data, idx) {
      const directives = [];
      let component = null;
      const tNode = data[idx];
      const node = lView[idx][ELEMENT];
      const element = (node.tagName || node.nodeName).toLowerCase();
      if (!tNode) {
        return {
          nativeElement: node,
          children: [],
          element,
          directives: [],
          component: null
        };
      }
      for (let i = tNode.directiveStart; i < tNode.directiveEnd; i++) {
        const instance = lView[i];
        const dirMeta = data[i];
        if (dirMeta && dirMeta.template) {
          component = {
            name: element,
            isElement: isCustomElement(node),
            instance
          };
        } else if (dirMeta) {
          directives.push({
            name: getDirectiveName(instance),
            instance
          });
        }
      }
      return {
        nativeElement: node,
        children: [],
        element,
        directives,
        component
      };
    }
    _extract(lViewOrLContainer, nodes = []) {
      if (isLContainer(lViewOrLContainer)) {
        for (let i = 9; i < lViewOrLContainer.length; i++) {
          if (lViewOrLContainer[i]) {
            this._extract(lViewOrLContainer[i], nodes);
          }
        }
        return nodes;
      }
      const lView = lViewOrLContainer;
      const tView = lView[LVIEW_TVIEW];
      for (let i = HEADER_OFFSET; i < lView.length; i++) {
        const lViewItem = lView[i];
        if (tView.data && Array.isArray(lViewItem) && lViewItem[ELEMENT] instanceof Node) {
          const node = this._getNode(lView, tView.data, i);
          if (node.component || node.directives.length) {
            nodes.push(node);
            this._extract(lViewItem, node.children);
          }
        }
      }
      return nodes;
    }
    build(element, nodes = []) {
      const ctx = element.__ngContext__;
      const rootLView = ctx.lView ?? ctx;
      return this._extract(rootLView);
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/directive-forest/render-tree.mjs
  var extractViewTree = (domNode, result, getComponent, getDirectives) => {
    const directives = getDirectives(domNode);
    if (!directives.length && !(domNode instanceof Element)) {
      return result;
    }
    const componentTreeNode = {
      children: [],
      component: null,
      directives: directives.map((dir) => {
        return {
          instance: dir,
          name: dir.constructor.name
        };
      }),
      element: domNode.nodeName.toLowerCase(),
      nativeElement: domNode
    };
    if (!(domNode instanceof Element)) {
      result.push(componentTreeNode);
      return result;
    }
    const component = getComponent(domNode);
    if (component) {
      componentTreeNode.component = {
        instance: component,
        isElement: isCustomElement(domNode),
        name: domNode.nodeName.toLowerCase()
      };
    }
    if (component || componentTreeNode.directives.length) {
      result.push(componentTreeNode);
    }
    if (componentTreeNode.component || componentTreeNode.directives.length) {
      domNode.childNodes.forEach((node) => extractViewTree(node, componentTreeNode.children, getComponent, getDirectives));
    } else {
      domNode.childNodes.forEach((node) => extractViewTree(node, result, getComponent, getDirectives));
    }
    return result;
  };
  var RTreeStrategy = class {
    supports(_) {
      return ["getDirectiveMetadata", "getComponent", "getDirectives"].every((method) => typeof window.ng[method] === "function");
    }
    build(element) {
      while (element.parentElement) {
        element = element.parentElement;
      }
      const getComponent = window.ng.getComponent;
      const getDirectives = window.ng.getDirectives;
      const result = extractViewTree(element, [], getComponent, getDirectives);
      return result;
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/directive-forest/index.mjs
  var strategies = [new RTreeStrategy(), new LTreeStrategy()];
  var strategy = null;
  var selectStrategy = (element) => {
    for (const s of strategies) {
      if (s.supports(element)) {
        return s;
      }
    }
    return null;
  };
  var buildDirectiveTree = (element) => {
    if (!strategy) {
      strategy = selectStrategy(element);
    }
    if (!strategy) {
      console.error("Unable to parse the component tree");
      return [];
    }
    return strategy.build(element);
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/state-serializer/object-utils.mjs
  var getKeys = (obj) => {
    if (!obj) {
      return [];
    }
    return Object.getOwnPropertyNames(obj);
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/state-serializer/serialized-descriptor-factory.mjs
  var METADATA_PROPERTY_NAME2 = "__ngContext__";
  var serializable = {
    [PropType.Boolean]: true,
    [PropType.String]: true,
    [PropType.Null]: true,
    [PropType.Number]: true,
    [PropType.Object]: true,
    [PropType.Undefined]: true,
    [PropType.Unknown]: true,
    [PropType.Array]: false,
    [PropType.BigInt]: false,
    [PropType.Function]: false,
    [PropType.HTMLNode]: false,
    [PropType.Symbol]: false,
    [PropType.Date]: false
  };
  var typeToDescriptorPreview = {
    [PropType.Array]: (prop) => `Array(${prop.length})`,
    [PropType.BigInt]: (prop) => truncate(prop.toString()),
    [PropType.Boolean]: (prop) => truncate(prop.toString()),
    [PropType.String]: (prop) => `"${prop}"`,
    [PropType.Function]: (prop) => `${prop.name}(...)`,
    [PropType.HTMLNode]: (prop) => prop.constructor.name,
    [PropType.Null]: (_) => "null",
    [PropType.Number]: (prop) => parseInt(prop, 10).toString(),
    [PropType.Object]: (prop) => getKeys(prop).length > 0 ? "{...}" : "{}",
    [PropType.Symbol]: (_) => "Symbol()",
    [PropType.Undefined]: (_) => "undefined",
    [PropType.Date]: (prop) => {
      if (prop instanceof Date) {
        return `Date(${new Date(prop).toISOString()})`;
      }
      return prop;
    },
    [PropType.Unknown]: (_) => "unknown"
  };
  var ignoreList = /* @__PURE__ */ new Set([METADATA_PROPERTY_NAME2, "__ngSimpleChanges__"]);
  var shallowPropTypeToTreeMetaData = {
    [PropType.String]: {
      editable: true,
      expandable: false
    },
    [PropType.BigInt]: {
      editable: false,
      expandable: false
    },
    [PropType.Boolean]: {
      editable: true,
      expandable: false
    },
    [PropType.Number]: {
      editable: true,
      expandable: false
    },
    [PropType.Date]: {
      editable: false,
      expandable: false
    },
    [PropType.Null]: {
      editable: true,
      expandable: false
    },
    [PropType.Undefined]: {
      editable: true,
      expandable: false
    },
    [PropType.Symbol]: {
      editable: false,
      expandable: false
    },
    [PropType.Function]: {
      editable: false,
      expandable: false
    },
    [PropType.HTMLNode]: {
      editable: false,
      expandable: false
    },
    [PropType.Unknown]: {
      editable: false,
      expandable: false
    }
  };
  var isEditable = (instance, propName, propData) => {
    if (typeof propName === "symbol") {
      return false;
    }
    const descriptor = Object.getOwnPropertyDescriptor(instance, propName);
    if (descriptor?.writable === false) {
      return false;
    }
    if (!descriptor?.set && descriptor && !("value" in descriptor)) {
      return false;
    }
    if (descriptor?.set && !descriptor?.get && !("value" in descriptor)) {
      return false;
    }
    return shallowPropTypeToTreeMetaData[propData.type].editable;
  };
  var hasValue = (obj, prop) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    if (!descriptor?.get && typeof descriptor?.value === "undefined") {
      return false;
    }
    return true;
  };
  var getPreview = (instance, propName, propData) => {
    return hasValue(instance, propName) ? typeToDescriptorPreview[propData.type](propData.prop) : SETTER_FIELD_PREVIEW;
  };
  var SETTER_FIELD_PREVIEW = "[setter]";
  var createShallowSerializedDescriptor = (instance, propName, propData) => {
    const { type } = propData;
    const shallowSerializedDescriptor = {
      type,
      expandable: shallowPropTypeToTreeMetaData[type].expandable,
      editable: isEditable(instance, propName, propData),
      preview: getPreview(instance, propName, propData)
    };
    if (propData.prop !== void 0 && serializable[type]) {
      shallowSerializedDescriptor.value = propData.prop;
    }
    return shallowSerializedDescriptor;
  };
  var createLevelSerializedDescriptor = (instance, propName, propData, levelOptions, continuation) => {
    const { type, prop } = propData;
    const levelSerializedDescriptor = {
      type,
      editable: false,
      expandable: getKeys(prop).length > 0,
      preview: getPreview(instance, propName, propData)
    };
    if (levelOptions.level !== void 0 && levelOptions.currentLevel < levelOptions.level) {
      const value = getLevelDescriptorValue(propData, levelOptions, continuation);
      if (value !== void 0) {
        levelSerializedDescriptor.value = value;
      }
    }
    return levelSerializedDescriptor;
  };
  var createNestedSerializedDescriptor = (instance, propName, propData, levelOptions, nodes, nestedSerializer2) => {
    const { type, prop } = propData;
    const nestedSerializedDescriptor = {
      type,
      editable: false,
      expandable: getKeys(prop).length > 0,
      preview: getPreview(instance, propName, propData)
    };
    if (nodes && nodes.length) {
      const value = getNestedDescriptorValue(propData, levelOptions, nodes, nestedSerializer2);
      if (value !== void 0) {
        nestedSerializedDescriptor.value = value;
      }
    }
    return nestedSerializedDescriptor;
  };
  var getNestedDescriptorValue = (propData, levelOptions, nodes, nestedSerializer2) => {
    const { type, prop } = propData;
    const { currentLevel } = levelOptions;
    switch (type) {
      case PropType.Array:
        return nodes.map((nestedProp) => nestedSerializer2(prop, nestedProp.name, nestedProp.children, currentLevel + 1));
      case PropType.Object:
        return nodes.reduce((accumulator, nestedProp) => {
          if (prop.hasOwnProperty(nestedProp.name) && !ignoreList.has(nestedProp.name)) {
            accumulator[nestedProp.name] = nestedSerializer2(prop, nestedProp.name, nestedProp.children, currentLevel + 1);
          }
          return accumulator;
        }, {});
    }
  };
  var getLevelDescriptorValue = (propData, levelOptions, continuation) => {
    const { type, prop } = propData;
    const { currentLevel, level } = levelOptions;
    switch (type) {
      case PropType.Array:
        return prop.map((_, idx) => continuation(prop, idx, currentLevel + 1, level));
      case PropType.Object:
        return getKeys(prop).reduce((accumulator, propName) => {
          if (!ignoreList.has(propName)) {
            accumulator[propName] = continuation(prop, propName, currentLevel + 1, level);
          }
          return accumulator;
        }, {});
    }
  };
  var truncate = (str, max = 20) => {
    if (str.length > max) {
      return str.substr(0, max) + "...";
    }
    return str;
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/state-serializer/state-serializer.mjs
  var METADATA_PROPERTY_NAME3 = "__ngContext__";
  var ignoreList2 = /* @__PURE__ */ new Set([METADATA_PROPERTY_NAME3, "__ngSimpleChanges__"]);
  var commonTypes = {
    boolean: PropType.Boolean,
    bigint: PropType.BigInt,
    function: PropType.Function,
    number: PropType.Number,
    string: PropType.String,
    symbol: PropType.Symbol
  };
  var MAX_LEVEL = 1;
  var getPropType = (prop) => {
    if (prop === void 0) {
      return PropType.Undefined;
    }
    if (prop === null) {
      return PropType.Null;
    }
    if (prop instanceof HTMLElement) {
      return PropType.HTMLNode;
    }
    const type = typeof prop;
    if (commonTypes[type] !== void 0) {
      return commonTypes[type];
    }
    if (type === "object") {
      if (Array.isArray(prop)) {
        return PropType.Array;
      } else if (Object.prototype.toString.call(prop) === "[object Date]") {
        return PropType.Date;
      } else if (prop instanceof Node) {
        return PropType.HTMLNode;
      } else {
        return PropType.Object;
      }
    }
    return PropType.Unknown;
  };
  var nestedSerializer = (instance, propName, nodes, currentLevel = 0, level = MAX_LEVEL) => {
    const serializableInstance = instance[propName];
    const propData = { prop: serializableInstance, type: getPropType(serializableInstance) };
    if (currentLevel < level) {
      return levelSerializer(instance, propName, currentLevel, level, nestedSerializerContinuation(nodes, level));
    }
    switch (propData.type) {
      case PropType.Array:
      case PropType.Object:
        return createNestedSerializedDescriptor(instance, propName, propData, { level, currentLevel }, nodes, nestedSerializer);
      default:
        return createShallowSerializedDescriptor(instance, propName, propData);
    }
  };
  var nestedSerializerContinuation = (nodes, level) => (instance, propName, nestedLevel) => {
    const idx = nodes.findIndex((v) => v.name === propName);
    if (idx < 0) {
      return nestedSerializer(instance, propName, [], nestedLevel, level);
    }
    return nestedSerializer(instance, propName, nodes[idx].children, nestedLevel, level);
  };
  var levelSerializer = (instance, propName, currentLevel = 0, level = MAX_LEVEL, continuation = levelSerializer) => {
    const serializableInstance = instance[propName];
    const propData = { prop: serializableInstance, type: getPropType(serializableInstance) };
    switch (propData.type) {
      case PropType.Array:
      case PropType.Object:
        return createLevelSerializedDescriptor(instance, propName, propData, { level, currentLevel }, continuation);
      default:
        return createShallowSerializedDescriptor(instance, propName, propData);
    }
  };
  var serializeDirectiveState = (instance, levels = MAX_LEVEL) => {
    const result = {};
    getKeys(instance).forEach((prop) => {
      if (typeof prop === "string" && ignoreList2.has(prop)) {
        return;
      }
      result[prop] = levelSerializer(instance, prop, null, 0, levels);
    });
    return result;
  };
  var deeplySerializeSelectedProperties = (instance, props) => {
    const result = {};
    getKeys(instance).forEach((prop) => {
      if (ignoreList2.has(prop)) {
        return;
      }
      const idx = props.findIndex((v) => v.name === prop);
      if (idx < 0) {
        result[prop] = levelSerializer(instance, prop);
      } else {
        result[prop] = nestedSerializer(instance, prop, props[idx].children);
      }
    });
    return result;
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/component-tree.mjs
  var ChangeDetectionStrategy;
  (function(ChangeDetectionStrategy2) {
    ChangeDetectionStrategy2[ChangeDetectionStrategy2["OnPush"] = 0] = "OnPush";
    ChangeDetectionStrategy2[ChangeDetectionStrategy2["Default"] = 1] = "Default";
  })(ChangeDetectionStrategy || (ChangeDetectionStrategy = {}));
  var ngDebug = () => window.ng;
  var getLatestComponentState = (query, directiveForest) => {
    directiveForest = directiveForest ?? buildDirectiveForest();
    const node = queryDirectiveForest(query.selectedElement, directiveForest);
    if (!node) {
      return;
    }
    const result = {};
    const populateResultSet = (dir) => {
      if (query.propertyQuery.type === PropertyQueryTypes.All) {
        result[dir.name] = {
          props: serializeDirectiveState(dir.instance),
          metadata: getDirectiveMetadata(dir.instance)
        };
      }
      if (query.propertyQuery.type === PropertyQueryTypes.Specified) {
        result[dir.name] = {
          props: deeplySerializeSelectedProperties(dir.instance, query.propertyQuery.properties[dir.name] || []),
          metadata: getDirectiveMetadata(dir.instance)
        };
      }
    };
    node.directives.forEach(populateResultSet);
    if (node.component) {
      populateResultSet(node.component);
    }
    return result;
  };
  var getDirectiveMetadata = (dir) => {
    const getMetadata = window.ng.getDirectiveMetadata;
    if (getMetadata) {
      const metadata = getMetadata(dir);
      if (metadata) {
        return {
          inputs: metadata.inputs,
          outputs: metadata.outputs,
          encapsulation: metadata.encapsulation,
          onPush: metadata.changeDetection === ChangeDetectionStrategy.OnPush
        };
      }
    }
    const safelyGrabMetadata = (key) => {
      try {
        return dir.constructor.\u0275cmp ? dir.constructor.\u0275cmp[key] : dir.constructor.\u0275dir[key];
      } catch {
        console.warn(`Could not find metadata for key: ${key} in directive:`, dir);
        return void 0;
      }
    };
    return {
      inputs: safelyGrabMetadata("inputs"),
      outputs: safelyGrabMetadata("outputs"),
      encapsulation: safelyGrabMetadata("encapsulation"),
      onPush: safelyGrabMetadata("onPush")
    };
  };
  var getRoots = () => {
    const roots = Array.from(document.documentElement.querySelectorAll("[ng-version]"));
    const isTopLevel = (element) => {
      let parent = element;
      while (parent?.parentElement) {
        parent = parent.parentElement;
        if (parent.hasAttribute("ng-version")) {
          return false;
        }
      }
      return true;
    };
    return roots.filter(isTopLevel);
  };
  var buildDirectiveForest = () => {
    const roots = getRoots();
    return Array.prototype.concat.apply([], Array.from(roots).map(buildDirectiveTree));
  };
  var queryDirectiveForest = (position, forest) => {
    if (!position.length) {
      return null;
    }
    let node = null;
    for (const i of position) {
      node = forest[i];
      if (!node) {
        return null;
      }
      forest = node.children;
    }
    return node;
  };
  var findNodeInForest = (position, forest) => {
    const foundComponent = queryDirectiveForest(position, forest);
    return foundComponent ? foundComponent.nativeElement : null;
  };
  var findNodeFromSerializedPosition = (serializedPosition) => {
    const position = serializedPosition.split(",").map((index) => parseInt(index, 10));
    return queryDirectiveForest(position, buildDirectiveForest());
  };
  var updateState = (updatedStateData) => {
    const ngd = ngDebug();
    const node = queryDirectiveForest(updatedStateData.directiveId.element, buildDirectiveForest());
    if (!node) {
      console.warn("Could not update the state of component", updatedStateData, "because the component was not found");
      return;
    }
    if (updatedStateData.directiveId.directive !== void 0) {
      const directive = node.directives[updatedStateData.directiveId.directive].instance;
      mutateComponentOrDirective(updatedStateData, directive);
      ngd.applyChanges(ngd.getOwningComponent(directive));
      return;
    }
    if (node.component) {
      const comp = node.component.instance;
      mutateComponentOrDirective(updatedStateData, comp);
      ngd.applyChanges(comp);
      return;
    }
  };
  var mutateComponentOrDirective = (updatedStateData, compOrDirective) => {
    const valueKey = updatedStateData.keyPath.pop();
    if (valueKey === void 0) {
      return;
    }
    let parentObjectOfValueToUpdate = compOrDirective;
    updatedStateData.keyPath.forEach((key) => {
      parentObjectOfValueToUpdate = parentObjectOfValueToUpdate[key];
    });
    try {
      parentObjectOfValueToUpdate[valueKey] = updatedStateData.newValue;
    } catch {
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/hooks/identity-tracker.mjs
  var IdentityTracker = class {
    constructor() {
      this._directiveIdCounter = 0;
      this._currentDirectivePosition = /* @__PURE__ */ new Map();
      this._currentDirectiveId = /* @__PURE__ */ new Map();
      this.isComponent = /* @__PURE__ */ new Map();
    }
    static getInstance() {
      if (!IdentityTracker._instance) {
        IdentityTracker._instance = new IdentityTracker();
      }
      return IdentityTracker._instance;
    }
    getDirectivePosition(dir) {
      return this._currentDirectivePosition.get(dir);
    }
    getDirectiveId(dir) {
      return this._currentDirectiveId.get(dir);
    }
    hasDirective(dir) {
      return this._currentDirectiveId.has(dir);
    }
    index() {
      const directiveForest = buildDirectiveForest();
      const indexedForest = indexForest(directiveForest);
      const newNodes = [];
      const removedNodes = [];
      const allNodes = /* @__PURE__ */ new Set();
      indexedForest.forEach((root) => this._index(root, null, newNodes, allNodes));
      this._currentDirectiveId.forEach((_, dir) => {
        if (!allNodes.has(dir)) {
          removedNodes.push({ directive: dir, isComponent: !!this.isComponent.get(dir) });
        }
      });
      return { newNodes, removedNodes, indexedForest, directiveForest };
    }
    _index(node, parent, newNodes, allNodes) {
      if (node.component) {
        allNodes.add(node.component.instance);
        this.isComponent.set(node.component.instance, true);
        this._indexNode(node.component.instance, node.position, newNodes);
      }
      (node.directives || []).forEach((dir) => {
        allNodes.add(dir.instance);
        this.isComponent.set(dir.instance, false);
        this._indexNode(dir.instance, node.position, newNodes);
      });
      node.children.forEach((child) => this._index(child, parent, newNodes, allNodes));
    }
    _indexNode(directive, position, newNodes) {
      this._currentDirectivePosition.set(directive, position);
      if (!this._currentDirectiveId.has(directive)) {
        newNodes.push({ directive, isComponent: !!this.isComponent.get(directive) });
        this._currentDirectiveId.set(directive, this._directiveIdCounter++);
      }
    }
    destroy() {
      this._currentDirectivePosition = /* @__PURE__ */ new Map();
      this._currentDirectiveId = /* @__PURE__ */ new Map();
    }
  };
  var indexTree = (node, idx, parentPosition = []) => {
    const position = parentPosition.concat([idx]);
    return {
      position,
      element: node.element,
      component: node.component,
      directives: node.directives.map((d) => ({ position, ...d })),
      children: node.children.map((n, i) => indexTree(n, i, position)),
      nativeElement: node.nativeElement
    };
  };
  var indexForest = (forest) => forest.map((n, i) => indexTree(n, i));

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/hooks/profiler/shared.mjs
  var Profiler = class {
    constructor(config2 = {}) {
      this._inChangeDetection = false;
      this.changeDetection$ = new Subject();
      this._hooks = [];
      this._hooks.push(config2);
    }
    subscribe(config2) {
      this._hooks.push(config2);
    }
    unsubscribe(config2) {
      this._hooks.splice(this._hooks.indexOf(config2), 1);
    }
    _onCreate(_, __, id, ___, position) {
      if (id === void 0 || position === void 0) {
        return;
      }
      this._invokeCallback("onCreate", arguments);
    }
    _onDestroy(_, __, id, ___, position) {
      if (id === void 0 || position === void 0) {
        return;
      }
      this._invokeCallback("onDestroy", arguments);
    }
    _onChangeDetectionStart(_, __, id, position) {
      if (id === void 0 || position === void 0) {
        return;
      }
      this._invokeCallback("onChangeDetectionStart", arguments);
    }
    _onChangeDetectionEnd(_, __, id, position) {
      if (id === void 0 || position === void 0) {
        return;
      }
      this._invokeCallback("onChangeDetectionEnd", arguments);
    }
    _onLifecycleHookStart(_, __, ___, id, ____) {
      if (id === void 0) {
        return;
      }
      this._invokeCallback("onLifecycleHookStart", arguments);
    }
    _onLifecycleHookEnd(_, __, ___, id, ____) {
      if (id === void 0) {
        return;
      }
      this._invokeCallback("onLifecycleHookEnd", arguments);
    }
    _onOutputStart(_, __, ___, id, ____) {
      if (id === void 0) {
        return;
      }
      this._invokeCallback("onOutputStart", arguments);
    }
    _onOutputEnd(_, __, ___, id, ____) {
      if (id === void 0) {
        return;
      }
      this._invokeCallback("onOutputEnd", arguments);
    }
    _invokeCallback(name, args) {
      this._hooks.forEach((config2) => {
        const cb = config2[name];
        if (typeof cb === "function") {
          cb.apply(null, args);
        }
      });
    }
  };
  var hookNames = [
    "OnInit",
    "OnDestroy",
    "OnChanges",
    "DoCheck",
    "AfterContentInit",
    "AfterContentChecked",
    "AfterViewInit",
    "AfterViewChecked"
  ];
  var hookMethodNames = new Set(hookNames.map((hook) => `ng${hook}`));
  var getLifeCycleName = (obj, fn) => {
    const proto = Object.getPrototypeOf(obj);
    const keys = Object.getOwnPropertyNames(proto);
    for (const propName of keys) {
      if (!hookMethodNames.has(propName)) {
        continue;
      }
      if (proto[propName] === fn) {
        return propName;
      }
    }
    const fnName = fn.name;
    if (typeof fnName !== "string") {
      return "unknown";
    }
    for (const hookName of hookNames) {
      if (fnName.indexOf(hookName) >= 0) {
        return `ng${hookName}`;
      }
    }
    return "unknown";
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/hooks/profiler/native.mjs
  var NgProfiler = class extends Profiler {
    constructor(config2 = {}) {
      super(config2);
      this._tracker = IdentityTracker.getInstance();
      this._callbacks = [];
      this._lastDirectiveInstance = null;
      this._setProfilerCallback((event, instanceOrLView, hookOrListener) => {
        if (this[event] === void 0) {
          return;
        }
        this[event](instanceOrLView, hookOrListener);
      });
      this._initialize();
    }
    _initialize() {
      const ng2 = window.ng;
      ng2.\u0275setProfiler((event, instanceOrLView, hookOrListener) => this._callbacks.forEach((cb) => cb(event, instanceOrLView, hookOrListener)));
    }
    _setProfilerCallback(callback) {
      this._callbacks.push(callback);
    }
    destroy() {
      this._tracker.destroy();
    }
    onIndexForest(newNodes, removedNodes) {
      newNodes.forEach((node) => {
        const { directive, isComponent } = node;
        const position = this._tracker.getDirectivePosition(directive);
        const id = this._tracker.getDirectiveId(directive);
        this._onCreate(directive, getDirectiveHostElement(directive), id, isComponent, position);
      });
      removedNodes.forEach((node) => {
        const { directive, isComponent } = node;
        const position = this._tracker.getDirectivePosition(directive);
        const id = this._tracker.getDirectiveId(directive);
        this._onDestroy(directive, getDirectiveHostElement(directive), id, isComponent, position);
      });
    }
    [0](_directive, _hookOrListener) {
      return;
    }
    [1](_directive, _hookOrListener) {
      return;
    }
    [2](context, _hookOrListener) {
      if (!this._inChangeDetection) {
        this._inChangeDetection = true;
        runOutsideAngular(() => {
          Promise.resolve().then(() => {
            this.changeDetection$.next();
            this._inChangeDetection = false;
          });
        });
      }
      const position = this._tracker.getDirectivePosition(context);
      const id = this._tracker.getDirectiveId(context);
      if (position !== void 0 && id !== void 0) {
        this._lastDirectiveInstance = context;
      }
      if (id !== void 0 && position !== void 0) {
        this._onChangeDetectionStart(context, getDirectiveHostElement(context), id, position);
        return;
      }
      this._onChangeDetectionStart(this._lastDirectiveInstance, getDirectiveHostElement(this._lastDirectiveInstance), this._tracker.getDirectiveId(this._lastDirectiveInstance), this._tracker.getDirectivePosition(this._lastDirectiveInstance));
    }
    [3](context, _hookOrListener) {
      const position = this._tracker.getDirectivePosition(context);
      const id = this._tracker.getDirectiveId(context);
      if (this._tracker.hasDirective(context) && id !== void 0 && position !== void 0) {
        this._onChangeDetectionEnd(context, getDirectiveHostElement(context), id, position);
        return;
      }
      this._onChangeDetectionEnd(this._lastDirectiveInstance, getDirectiveHostElement(this._lastDirectiveInstance), this._tracker.getDirectiveId(this._lastDirectiveInstance), this._tracker.getDirectivePosition(this._lastDirectiveInstance));
    }
    [4](directive, hook) {
      const id = this._tracker.getDirectiveId(directive);
      const element = getDirectiveHostElement(directive);
      const lifecycleHookName = getLifeCycleName(directive, hook);
      const isComponent = !!this._tracker.isComponent.get(directive);
      this._onLifecycleHookStart(directive, lifecycleHookName, element, id, isComponent);
    }
    [5](directive, hook) {
      const id = this._tracker.getDirectiveId(directive);
      const element = getDirectiveHostElement(directive);
      const lifecycleHookName = getLifeCycleName(directive, hook);
      const isComponent = !!this._tracker.isComponent.get(directive);
      this._onLifecycleHookEnd(directive, lifecycleHookName, element, id, isComponent);
    }
    [6](componentOrDirective, listener) {
      const isComponent = !!this._tracker.isComponent.get(componentOrDirective);
      const node = getDirectiveHostElement(componentOrDirective);
      const id = this._tracker.getDirectiveId(componentOrDirective);
      this._onOutputStart(componentOrDirective, listener.name, node, id, isComponent);
    }
    [7](componentOrDirective, listener) {
      const isComponent = !!this._tracker.isComponent.get(componentOrDirective);
      const node = getDirectiveHostElement(componentOrDirective);
      const id = this._tracker.getDirectiveId(componentOrDirective);
      this._onOutputEnd(componentOrDirective, listener.name, node, id, isComponent);
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/hooks/profiler/polyfill.mjs
  var hookTViewProperties = [
    "preOrderHooks",
    "preOrderCheckHooks",
    "contentHooks",
    "contentCheckHooks",
    "viewHooks",
    "viewCheckHooks",
    "destroyHooks"
  ];
  var componentMetadata = (instance) => instance?.constructor?.\u0275cmp;
  var PatchingProfiler = class extends Profiler {
    constructor() {
      super(...arguments);
      this._patched = /* @__PURE__ */ new Map();
      this._undoLifecyclePatch = [];
      this._tracker = IdentityTracker.getInstance();
    }
    destroy() {
      this._tracker.destroy();
      for (const [cmp, template] of this._patched) {
        const meta = componentMetadata(cmp);
        meta.template = template;
        meta.tView.template = template;
      }
      this._patched = /* @__PURE__ */ new Map();
      this._undoLifecyclePatch.forEach((p) => p());
      this._undoLifecyclePatch = [];
    }
    onIndexForest(newNodes, removedNodes) {
      newNodes.forEach((node) => {
        this._observeLifecycle(node.directive, node.isComponent);
        this._observeComponent(node.directive);
        this._fireCreationCallback(node.directive, node.isComponent);
      });
      removedNodes.forEach((node) => {
        this._patched.delete(node.directive);
        this._fireDestroyCallback(node.directive, node.isComponent);
      });
    }
    _fireCreationCallback(component, isComponent) {
      const position = this._tracker.getDirectivePosition(component);
      const id = this._tracker.getDirectiveId(component);
      this._onCreate(component, getDirectiveHostElement(component), id, isComponent, position);
    }
    _fireDestroyCallback(component, isComponent) {
      const position = this._tracker.getDirectivePosition(component);
      const id = this._tracker.getDirectiveId(component);
      this._onDestroy(component, getDirectiveHostElement(component), id, isComponent, position);
    }
    _observeComponent(cmp) {
      const declarations = componentMetadata(cmp);
      if (!declarations) {
        return;
      }
      const original = declarations.template;
      const self = this;
      if (original.patched) {
        return;
      }
      declarations.tView.template = function(_, component) {
        if (!self._inChangeDetection) {
          self._inChangeDetection = true;
          runOutsideAngular(() => {
            Promise.resolve().then(() => {
              self.changeDetection$.next();
              self._inChangeDetection = false;
            });
          });
        }
        const position = self._tracker.getDirectivePosition(component);
        const id = self._tracker.getDirectiveId(component);
        self._onChangeDetectionStart(component, getDirectiveHostElement(component), id, position);
        original.apply(this, arguments);
        if (self._tracker.hasDirective(component) && id !== void 0 && position !== void 0) {
          self._onChangeDetectionEnd(component, getDirectiveHostElement(component), id, position);
        }
      };
      declarations.tView.template.patched = true;
      this._patched.set(cmp, original);
    }
    _observeLifecycle(directive, isComponent) {
      const ctx = getLViewFromDirectiveOrElementInstance(directive);
      if (!ctx) {
        return;
      }
      const tview = ctx[1];
      hookTViewProperties.forEach((hook) => {
        const current = tview[hook];
        if (!Array.isArray(current)) {
          return;
        }
        current.forEach((el, idx) => {
          if (el.patched) {
            return;
          }
          if (typeof el === "function") {
            const self = this;
            current[idx] = function() {
              if (!this[METADATA_PROPERTY_NAME]) {
                return;
              }
              const id = self._tracker.getDirectiveId(this);
              const lifecycleHookName = getLifeCycleName(this, el);
              const element = getDirectiveHostElement(this);
              self._onLifecycleHookStart(this, lifecycleHookName, element, id, isComponent);
              const result = el.apply(this, arguments);
              self._onLifecycleHookEnd(this, lifecycleHookName, element, id, isComponent);
              return result;
            };
            current[idx].patched = true;
            this._undoLifecyclePatch.push(() => {
              current[idx] = el;
            });
          }
        });
      });
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/hooks/profiler/index.mjs
  var selectProfilerStrategy = () => {
    const ng2 = window.ng;
    if (typeof ng2?.\u0275setProfiler === "function") {
      return new NgProfiler();
    }
    return new PatchingProfiler();
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/hooks/hooks.mjs
  var DirectiveForestHooks = class {
    constructor() {
      this._tracker = IdentityTracker.getInstance();
      this._forest = [];
      this._indexedForest = [];
      this.profiler = selectProfilerStrategy();
    }
    getDirectivePosition(dir) {
      const result = this._tracker.getDirectivePosition(dir);
      if (result === void 0) {
        console.warn("Unable to find position of", dir);
      }
      return result;
    }
    getDirectiveId(dir) {
      const result = this._tracker.getDirectiveId(dir);
      if (result === void 0) {
        console.warn("Unable to find ID of", result);
      }
      return result;
    }
    getIndexedDirectiveForest() {
      return this._indexedForest;
    }
    getDirectiveForest() {
      return this._forest;
    }
    initialize() {
      this.indexForest();
    }
    indexForest() {
      const { newNodes, removedNodes, indexedForest, directiveForest } = this._tracker.index();
      this._indexedForest = indexedForest;
      this._forest = directiveForest;
      this.profiler.onIndexForest(newNodes, removedNodes);
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/hooks/index.mjs
  var markName = (s, method) => `\u{1F170}\uFE0F ${s}#${method}`;
  var supportsPerformance = globalThis.performance && typeof globalThis.performance.getEntriesByName === "function";
  var recordMark = (s, method) => {
    if (supportsPerformance) {
      performance.mark(`${markName(s, method)}_start`);
    }
  };
  var endMark = (nodeName, method) => {
    if (supportsPerformance) {
      const name = markName(nodeName, method);
      const start2 = `${name}_start`;
      const end = `${name}_end`;
      if (performance.getEntriesByName(start2).length > 0) {
        performance.mark(end);
        performance.measure(name, start2, end);
      }
      performance.clearMarks(start2);
      performance.clearMarks(end);
      performance.clearMeasures(name);
    }
  };
  var timingAPIFlag = false;
  var enableTimingAPI = () => timingAPIFlag = true;
  var disableTimingAPI = () => timingAPIFlag = false;
  var timingAPIEnabled = () => timingAPIFlag;
  var directiveForestHooks;
  var initializeOrGetDirectiveForestHooks = () => {
    if (directiveForestHooks) {
      return directiveForestHooks;
    }
    directiveForestHooks = new DirectiveForestHooks();
    directiveForestHooks.profiler.subscribe({
      onChangeDetectionStart(component) {
        if (!timingAPIEnabled()) {
          return;
        }
        recordMark(getDirectiveName(component), "changeDetection");
      },
      onChangeDetectionEnd(component) {
        if (!timingAPIEnabled()) {
          return;
        }
        endMark(getDirectiveName(component), "changeDetection");
      },
      onLifecycleHookStart(component, lifecyle) {
        if (!timingAPIEnabled()) {
          return;
        }
        recordMark(getDirectiveName(component), lifecyle);
      },
      onLifecycleHookEnd(component, lifecyle) {
        if (!timingAPIEnabled()) {
          return;
        }
        endMark(getDirectiveName(component), lifecyle);
      },
      onOutputStart(component, output) {
        if (!timingAPIEnabled()) {
          return;
        }
        recordMark(getDirectiveName(component), output);
      },
      onOutputEnd(component, output) {
        if (!timingAPIEnabled()) {
          return;
        }
        endMark(getDirectiveName(component), output);
      }
    });
    directiveForestHooks.initialize();
    return directiveForestHooks;
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/component-inspector/component-inspector.mjs
  var ComponentInspector = class {
    constructor(componentOptions = {
      onComponentEnter: () => {
      },
      onComponentLeave: () => {
      },
      onComponentSelect: () => {
      }
    }) {
      this.bindMethods();
      this._onComponentEnter = componentOptions.onComponentEnter;
      this._onComponentSelect = componentOptions.onComponentSelect;
      this._onComponentLeave = componentOptions.onComponentLeave;
    }
    startInspecting() {
      window.addEventListener("mouseover", this.elementMouseOver, true);
      window.addEventListener("click", this.elementClick, true);
      window.addEventListener("mouseout", this.cancelEvent, true);
    }
    stopInspecting() {
      window.removeEventListener("mouseover", this.elementMouseOver, true);
      window.removeEventListener("click", this.elementClick, true);
      window.removeEventListener("mouseout", this.cancelEvent, true);
    }
    elementClick(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      if (this._selectedComponent.component && this._selectedComponent.host) {
        this._onComponentSelect(initializeOrGetDirectiveForestHooks().getDirectiveId(this._selectedComponent.component));
      }
    }
    elementMouseOver(e) {
      this.cancelEvent(e);
      const el = e.target;
      if (el) {
        this._selectedComponent = findComponentAndHost(el);
      }
      unHighlight();
      if (this._selectedComponent.component && this._selectedComponent.host) {
        highlight(this._selectedComponent.host);
        this._onComponentEnter(initializeOrGetDirectiveForestHooks().getDirectiveId(this._selectedComponent.component));
      }
    }
    cancelEvent(e) {
      e.stopImmediatePropagation();
      e.preventDefault();
      this._onComponentLeave();
    }
    bindMethods() {
      this.startInspecting = this.startInspecting.bind(this);
      this.stopInspecting = this.stopInspecting.bind(this);
      this.elementMouseOver = this.elementMouseOver.bind(this);
      this.elementClick = this.elementClick.bind(this);
      this.cancelEvent = this.cancelEvent.bind(this);
    }
    highlightByPosition(position) {
      const forest = initializeOrGetDirectiveForestHooks().getDirectiveForest();
      const elementToHighlight = findNodeInForest(position, forest);
      if (elementToHighlight) {
        highlight(elementToHighlight);
      }
    }
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/hooks/capture.mjs
  var inProgress = false;
  var inChangeDetection = false;
  var eventMap;
  var frameDuration = 0;
  var hooks = {};
  var start = (onFrame) => {
    if (inProgress) {
      throw new Error("Recording already in progress");
    }
    eventMap = /* @__PURE__ */ new Map();
    inProgress = true;
    hooks = getHooks(onFrame);
    initializeOrGetDirectiveForestHooks().profiler.subscribe(hooks);
  };
  var stop = () => {
    const directiveForestHooks2 = initializeOrGetDirectiveForestHooks();
    const result = flushBuffer(directiveForestHooks2);
    initializeOrGetDirectiveForestHooks().profiler.unsubscribe(hooks);
    hooks = {};
    inProgress = false;
    return result;
  };
  var startEvent = (map, directive, label) => {
    const name = getDirectiveName(directive);
    const key = `${name}#${label}`;
    map[key] = performance.now();
  };
  var getEventStart = (map, directive, label) => {
    const name = getDirectiveName(directive);
    const key = `${name}#${label}`;
    return map[key];
  };
  var getHooks = (onFrame) => {
    const timeStartMap = {};
    return {
      onCreate(directive, node, _, isComponent, position) {
        eventMap.set(directive, {
          isElement: isCustomElement(node),
          name: getDirectiveName(directive),
          isComponent,
          lifecycle: {},
          outputs: {}
        });
      },
      onChangeDetectionStart(component, node) {
        startEvent(timeStartMap, component, "changeDetection");
        if (!inChangeDetection) {
          inChangeDetection = true;
          const source = getChangeDetectionSource();
          runOutsideAngular(() => {
            Promise.resolve().then(() => {
              inChangeDetection = false;
              onFrame(flushBuffer(initializeOrGetDirectiveForestHooks(), source));
            });
          });
        }
        if (!eventMap.has(component)) {
          eventMap.set(component, {
            isElement: isCustomElement(node),
            name: getDirectiveName(component),
            isComponent: true,
            changeDetection: 0,
            lifecycle: {},
            outputs: {}
          });
        }
      },
      onChangeDetectionEnd(component) {
        const profile = eventMap.get(component);
        if (profile) {
          let current = profile.changeDetection;
          if (current === void 0) {
            current = 0;
          }
          const startTimestamp = getEventStart(timeStartMap, component, "changeDetection");
          if (startTimestamp === void 0) {
            return;
          }
          const duration = performance.now() - startTimestamp;
          profile.changeDetection = current + duration;
          frameDuration += duration;
        } else {
          console.warn("Could not find profile for", component);
        }
      },
      onDestroy(directive, node, _, isComponent, __) {
        if (!eventMap.has(directive)) {
          eventMap.set(directive, {
            isElement: isComponent && isCustomElement(node),
            name: getDirectiveName(directive),
            isComponent,
            lifecycle: {},
            outputs: {}
          });
        }
      },
      onLifecycleHookStart(directive, hookName, node, __, isComponent) {
        startEvent(timeStartMap, directive, hookName);
        if (!eventMap.has(directive)) {
          eventMap.set(directive, {
            isElement: isCustomElement(node),
            name: getDirectiveName(directive),
            isComponent,
            lifecycle: {},
            outputs: {}
          });
        }
      },
      onLifecycleHookEnd(directive, hookName, _, __, ___) {
        const dir = eventMap.get(directive);
        const startTimestamp = getEventStart(timeStartMap, directive, hookName);
        if (startTimestamp === void 0) {
          return;
        }
        if (!dir) {
          console.warn("Could not find directive in onLifecycleHook callback", directive, hookName);
          return;
        }
        const duration = performance.now() - startTimestamp;
        dir.lifecycle[hookName] = (dir.lifecycle[hookName] || 0) + duration;
        frameDuration += duration;
      },
      onOutputStart(componentOrDirective, outputName, node, isComponent) {
        startEvent(timeStartMap, componentOrDirective, outputName);
        if (!eventMap.has(componentOrDirective)) {
          eventMap.set(componentOrDirective, {
            isElement: isCustomElement(node),
            name: getDirectiveName(componentOrDirective),
            isComponent,
            lifecycle: {},
            outputs: {}
          });
        }
      },
      onOutputEnd(componentOrDirective, outputName) {
        const name = outputName;
        const entry = eventMap.get(componentOrDirective);
        const startTimestamp = getEventStart(timeStartMap, componentOrDirective, name);
        if (startTimestamp === void 0) {
          return;
        }
        if (!entry) {
          console.warn("Could not find directive or component in onOutputEnd callback", componentOrDirective, outputName);
          return;
        }
        const duration = performance.now() - startTimestamp;
        entry.outputs[name] = (entry.outputs[name] || 0) + duration;
        frameDuration += duration;
      }
    };
  };
  var insertOrMerge = (lastFrame, profile) => {
    let exists = false;
    lastFrame.directives.forEach((d) => {
      if (d.name === profile.name) {
        exists = true;
        let current = d.changeDetection;
        if (current === void 0) {
          current = 0;
        }
        d.changeDetection = current + (profile.changeDetection ?? 0);
        for (const key of Object.keys(profile.lifecycle)) {
          if (!d.lifecycle[key]) {
            d.lifecycle[key] = 0;
          }
          d.lifecycle[key] += profile.lifecycle[key];
        }
        for (const key of Object.keys(profile.outputs)) {
          if (!d.outputs[key]) {
            d.outputs[key] = 0;
          }
          d.outputs[key] += profile.outputs[key];
        }
      }
    });
    if (!exists) {
      lastFrame.directives.push(profile);
    }
  };
  var insertElementProfile = (frames, position, profile) => {
    if (!profile) {
      return;
    }
    const original = frames;
    for (let i = 0; i < position.length - 1; i++) {
      const pos = position[i];
      if (!frames[pos]) {
        console.warn("Unable to find parent node for", profile, original);
        return;
      }
      frames = frames[pos].children;
    }
    const lastIdx = position[position.length - 1];
    let lastFrame = {
      children: [],
      directives: []
    };
    if (frames[lastIdx]) {
      lastFrame = frames[lastIdx];
    } else {
      frames[lastIdx] = lastFrame;
    }
    insertOrMerge(lastFrame, profile);
  };
  var prepareInitialFrame = (source, duration) => {
    const frame = {
      source,
      duration,
      directives: []
    };
    const directiveForestHooks2 = initializeOrGetDirectiveForestHooks();
    const directiveForest = directiveForestHooks2.getIndexedDirectiveForest();
    const traverse = (node, children = frame.directives) => {
      let position;
      if (node.component) {
        position = directiveForestHooks2.getDirectivePosition(node.component.instance);
      } else {
        position = directiveForestHooks2.getDirectivePosition(node.directives[0].instance);
      }
      if (position === void 0) {
        return;
      }
      const directives = node.directives.map((d) => {
        return {
          isComponent: false,
          isElement: false,
          name: getDirectiveName(d.instance),
          outputs: {},
          lifecycle: {}
        };
      });
      if (node.component) {
        directives.push({
          isElement: node.component.isElement,
          isComponent: true,
          lifecycle: {},
          outputs: {},
          name: getDirectiveName(node.component.instance)
        });
      }
      const result = {
        children: [],
        directives
      };
      children[position[position.length - 1]] = result;
      node.children.forEach((n) => traverse(n, result.children));
    };
    directiveForest.forEach((n) => traverse(n));
    return frame;
  };
  var flushBuffer = (directiveForestHooks2, source = "") => {
    const items = Array.from(eventMap.keys());
    const positions = [];
    const positionDirective = /* @__PURE__ */ new Map();
    items.forEach((dir) => {
      const position = directiveForestHooks2.getDirectivePosition(dir);
      if (position === void 0) {
        return;
      }
      positions.push(position);
      positionDirective.set(position, dir);
    });
    positions.sort(lexicographicOrder);
    const result = prepareInitialFrame(source, frameDuration);
    frameDuration = 0;
    positions.forEach((position) => {
      const dir = positionDirective.get(position);
      insertElementProfile(result.directives, position, eventMap.get(dir));
    });
    eventMap = /* @__PURE__ */ new Map();
    return result;
  };
  var getChangeDetectionSource = () => {
    const zone = window.Zone;
    if (!zone || !zone.currentTask) {
      return "";
    }
    return zone.currentTask.source;
  };
  var lexicographicOrder = (a, b) => {
    if (a.length < b.length) {
      return -1;
    }
    if (a.length > b.length) {
      return 1;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] < b[i]) {
        return -1;
      }
      if (a[i] > b[i]) {
        return 1;
      }
    }
    return 0;
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/shared-utils/src/lib/shared-utils.mjs
  var arrayEquals = (a, b) => {
    if (a.length !== b.length) {
      return false;
    }
    if (a.length === 0) {
      return b.length === 0;
    }
    let equal;
    for (let i = 0; i < a.length; i++) {
      equal = i === 0 ? a[i] === b[i] : a[i] === b[i] && equal;
      if (!equal) {
        break;
      }
    }
    return equal ?? false;
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/set-console-reference.mjs
  var CONSOLE_REFERENCE_PREFIX = "$ng";
  var CAPACITY = 5;
  var nodesForConsoleReference = [];
  var setConsoleReference = (referenceNode) => {
    if (referenceNode.node === null) {
      return;
    }
    _setConsoleReference(referenceNode);
  };
  var _setConsoleReference = (referenceNode) => {
    prepareCurrentReferencesForInsertion(referenceNode);
    nodesForConsoleReference.unshift(referenceNode);
    assignConsoleReferencesFrom(nodesForConsoleReference);
  };
  var prepareCurrentReferencesForInsertion = (referenceNode) => {
    const foundIndex = nodesForConsoleReference.findIndex((nodeToLookFor) => arrayEquals(nodeToLookFor.position, referenceNode.position));
    if (foundIndex !== -1) {
      nodesForConsoleReference.splice(foundIndex, 1);
    } else if (nodesForConsoleReference.length === CAPACITY) {
      nodesForConsoleReference.pop();
    }
  };
  var assignConsoleReferencesFrom = (referenceNodes) => {
    referenceNodes.forEach((referenceNode, index) => setDirectiveKey(referenceNode.node, getConsoleReferenceWithIndexOf(index)));
  };
  var setDirectiveKey = (node, key) => {
    Object.defineProperty(window, key, {
      get: () => {
        if (node?.component) {
          return node.component.instance;
        }
        if (node?.nativeElement) {
          return node.nativeElement;
        }
        return node;
      },
      configurable: true
    });
  };
  var getConsoleReferenceWithIndexOf = (consoleReferenceIndex) => `${CONSOLE_REFERENCE_PREFIX}${consoleReferenceIndex}`;

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/client-event-subscribers.mjs
  var subscribeToClientEvents = (messageBus2) => {
    messageBus2.on("shutdown", shutdownCallback(messageBus2));
    messageBus2.on("getLatestComponentExplorerView", getLatestComponentExplorerViewCallback(messageBus2));
    messageBus2.on("queryNgAvailability", checkForAngularCallback(messageBus2));
    messageBus2.on("startProfiling", startProfilingCallback(messageBus2));
    messageBus2.on("stopProfiling", stopProfilingCallback(messageBus2));
    messageBus2.on("setSelectedComponent", selectedComponentCallback);
    messageBus2.on("getNestedProperties", getNestedPropertiesCallback(messageBus2));
    messageBus2.on("getRoutes", getRoutesCallback(messageBus2));
    messageBus2.on("updateState", updateState);
    messageBus2.on("enableTimingAPI", enableTimingAPI);
    messageBus2.on("disableTimingAPI", disableTimingAPI);
    if (appIsAngularInDevMode() && appIsSupportedAngularVersion() && appIsAngularIvy()) {
      setupInspector(messageBus2);
      runOutsideAngular(() => {
        initializeOrGetDirectiveForestHooks().profiler.changeDetection$.pipe(debounceTime(250)).subscribe(() => messageBus2.emit("componentTreeDirty"));
      });
    }
  };
  var shutdownCallback = (messageBus2) => () => {
    messageBus2.destroy();
  };
  var getLatestComponentExplorerViewCallback = (messageBus2) => (query) => {
    initializeOrGetDirectiveForestHooks().indexForest();
    if (!query) {
      messageBus2.emit("latestComponentExplorerView", [
        {
          forest: prepareForestForSerialization(initializeOrGetDirectiveForestHooks().getIndexedDirectiveForest())
        }
      ]);
      return;
    }
    messageBus2.emit("latestComponentExplorerView", [
      {
        forest: prepareForestForSerialization(initializeOrGetDirectiveForestHooks().getIndexedDirectiveForest()),
        properties: getLatestComponentState(query, initializeOrGetDirectiveForestHooks().getDirectiveForest())
      }
    ]);
  };
  var checkForAngularCallback = (messageBus2) => () => checkForAngular(messageBus2);
  var getRoutesCallback = (messageBus2) => () => getRoutes(messageBus2);
  var startProfilingCallback = (messageBus2) => () => start((frame) => {
    messageBus2.emit("sendProfilerChunk", [frame]);
  });
  var stopProfilingCallback = (messageBus2) => () => {
    messageBus2.emit("profilerResults", [stop()]);
  };
  var selectedComponentCallback = (position) => {
    const node = queryDirectiveForest(position, initializeOrGetDirectiveForestHooks().getIndexedDirectiveForest());
    setConsoleReference({ node, position });
  };
  var getNestedPropertiesCallback = (messageBus2) => (position, propPath) => {
    const emitEmpty = () => messageBus2.emit("nestedProperties", [position, { props: {} }, propPath]);
    const node = queryDirectiveForest(position.element, initializeOrGetDirectiveForestHooks().getIndexedDirectiveForest());
    if (!node) {
      return emitEmpty();
    }
    const current = position.directive === void 0 ? node.component : node.directives[position.directive];
    if (!current) {
      return emitEmpty();
    }
    let data = current.instance;
    for (const prop of propPath) {
      data = data[prop];
      if (!data) {
        console.error("Cannot access the properties", propPath, "of", node);
      }
    }
    messageBus2.emit("nestedProperties", [position, { props: serializeDirectiveState(data) }, propPath]);
  };
  var getRoutes = (messageBus2) => {
    messageBus2.emit("updateRouterTree", [[]]);
  };
  var checkForAngular = (messageBus2) => {
    const ngVersion = getAngularVersion();
    const appIsIvy = appIsAngularIvy();
    if (!ngVersion) {
      setTimeout(() => checkForAngular(messageBus2), 500);
      return;
    }
    if (appIsIvy && appIsAngularInDevMode() && appIsSupportedAngularVersion()) {
      initializeOrGetDirectiveForestHooks();
    }
    messageBus2.emit("ngAvailability", [
      { version: ngVersion.toString(), devMode: appIsAngularInDevMode(), ivy: appIsIvy }
    ]);
  };
  var setupInspector = (messageBus2) => {
    const inspector = new ComponentInspector({
      onComponentEnter: (id) => {
        messageBus2.emit("highlightComponent", [id]);
      },
      onComponentLeave: () => {
        messageBus2.emit("removeComponentHighlight");
      },
      onComponentSelect: (id) => {
        messageBus2.emit("selectComponent", [id]);
      }
    });
    messageBus2.on("inspectorStart", inspector.startInspecting);
    messageBus2.on("inspectorEnd", inspector.stopInspecting);
    messageBus2.on("createHighlightOverlay", (position) => {
      inspector.highlightByPosition(position);
    });
    messageBus2.on("removeHighlightOverlay", unHighlight);
  };
  var prepareForestForSerialization = (roots) => {
    return roots.map((node) => {
      return {
        element: node.element,
        component: node.component ? {
          name: node.component.name,
          isElement: node.component.isElement,
          id: initializeOrGetDirectiveForestHooks().getDirectiveId(node.component.instance)
        } : null,
        directives: node.directives.map((d) => ({
          name: d.name,
          id: initializeOrGetDirectiveForestHooks().getDirectiveId(d.instance)
        })),
        children: prepareForestForSerialization(node.children)
      };
    });
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/ng-devtools-backend/src/lib/index.mjs
  var initializeMessageBus = (messageBus2) => {
    subscribeToClientEvents(messageBus2);
  };

  // bazel-out/k8-fastbuild/bin/devtools/projects/shell-chrome/src/app/chrome-window-extensions.mjs
  var initializeExtendedWindowOperations = () => {
    extendWindowOperations(window, { inspectedApplication: chromeWindowExtensions });
  };
  var extendWindowOperations = (target, classImpl) => {
    for (const key of Object.keys(classImpl)) {
      if (target[key] != null) {
        console.warn(`A window function or object named ${key} would be overwritten`);
      }
    }
    Object.assign(target, classImpl);
  };
  var chromeWindowExtensions = {
    findConstructorByPosition: (serializedId) => {
      const node = findNodeFromSerializedPosition(serializedId);
      if (node === null) {
        console.error(`Cannot find element associated with node ${serializedId}`);
        return;
      }
      if (node.component) {
        return node.component.instance.constructor;
      } else {
        console.error("This component has no instance and therefore no constructor");
      }
    },
    findDomElementByPosition: (serializedId) => {
      const node = findNodeFromSerializedPosition(serializedId);
      if (node === null) {
        console.error(`Cannot find element associated with node ${serializedId}`);
        return void 0;
      }
      return node.nativeElement;
    },
    findPropertyByPosition: (args) => {
      const { directivePosition, objectPath } = JSON.parse(args);
      const node = queryDirectiveForest(directivePosition.element, buildDirectiveForest());
      if (node === null) {
        console.error(`Cannot find element associated with node ${directivePosition}`);
        return void 0;
      }
      const isDirective = directivePosition.directive !== void 0 && node.directives[directivePosition.directive] && typeof node.directives[directivePosition.directive] === "object";
      if (isDirective) {
        return traverseDirective(node.directives[directivePosition.directive].instance, objectPath);
      }
      if (node.component) {
        return traverseDirective(node.component.instance, objectPath);
      }
    }
  };
  var traverseDirective = (dir, objectPath) => {
    for (const key of objectPath) {
      if (!dir[key]) {
        return;
      }
      dir = dir[key];
    }
    return dir;
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

  // bazel-out/k8-fastbuild/bin/devtools/projects/shell-chrome/src/app/backend.mjs
  var messageBus = new SamePageMessageBus("angular-devtools-backend", "angular-devtools-content-script");
  var initialized = false;
  messageBus.on("handshake", () => {
    if (initialized) {
      return;
    }
    initialized = true;
    initializeMessageBus(messageBus);
    initializeExtendedWindowOperations();
    let inspectorRunning = false;
    messageBus.on("inspectorStart", () => {
      inspectorRunning = true;
    });
    messageBus.on("inspectorEnd", () => {
      inspectorRunning = false;
    });
    document.addEventListener("mousemove", () => {
      if (!inspectorRunning) {
        unHighlight();
      }
    }, false);
  });
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//# sourceMappingURL=backend_bundle.js.map
