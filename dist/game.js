/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "8c4beab3ed1994024b25"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(2)(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function Sprite(game) {
	_classCallCheck(this, Sprite);

	this.game = game;
	/* Where on the canvas is it */
	this.positionX = 0;
	this.positionY = 0;
	/* How fast is it going */
	this.speed = 0;

	/* Where is it going */

	this.destinationX = 0;
	this.destinationY = 0;

	/* Do we draw this in the canvas */
	this.visible = false;

	/* Center of Screen */
	this.centerX = this.game.canvas.width / 2;
	this.centerY = this.game.canvas.height / 2;
};

exports.default = Sprite;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

var _scenes = __webpack_require__(3);

var _scenes2 = _interopRequireDefault(_scenes);

var _scene = __webpack_require__(4);

var _scene2 = _interopRequireDefault(_scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(game) {
		var _this = this;

		_classCallCheck(this, Game);

		this.canvas = document.getElementsByTagName("canvas")[0];
		this.ctx = this.canvas.getContext('2d');
		this.handleClick.bind(this);
		this.clickAbleSprites = [];
		this.lastClickX = null;
		this.lastclickY = null;
		/*
  type {
  	x.pos
  	x.width
  	y.pos
  	y.width
  }
  */
		/* Refactor into array of sprites */

		//this.batter = new Batter(this);
		//	//this.pitcher = new Pitcher(this);
		//this.ball = new Ball(this);
		//this.platform = new Platform(this);
		//this.scoreboard = new Scoreboard(this);

		/* Some Defaults */
		this.backgroundColor = "#000000";

		/* Timer */
		this.playSound = true;
		this.timer = null;
		this.tickTime = 100;

		// Which Scene is showing
		this.showScene = false;
		this.currentScene = null;
		this.scenes = _scenes2.default;

		this.roundTime = -1;
		// Round has begun
		this.roundStarted = true;

		// Current Number of Runs
		this.roundScore = 0;
		this.backgroundImage = null;

		this.audio = new Audio("dist/sound/loop.mp3");
		this.audio.play();
		this.audio.loop = true;
		/* array of images */
		this.backgroundImage = null;

		this.showPlayAgain = false;
		/* Call Methods */
		/* stretch canvas */
		this.initCanvas();
		this.playButton = true;
		this.firstload = true;

		this.canvas.addEventListener('click', function (e) {
			var pos = {
				x: e.clientX,
				y: e.clientY
			};
			_this.handleClick(pos.x, pos.y);
		});
		// Start Game Rendering  - Last Method
		this.animateGame();
	}

	_createClass(Game, [{
		key: 'handleClick',
		value: function handleClick(x, y) {
			this.lastClickX = x;
			this.lastClickY = y;
			if (this.playButton) {
				// Play the game button
				if (x >= 526 & x <= 850 & y >= 354 & y <= 400) {
					// Stop drawing the menu
					this.firstload = false;
					this.playButton = false;
					this.showScene = true;
					// Start drawing the first scene
					this.currentScene = new _scene2.default(this, this.getSceneByName("start"));
				}
				console.log("x: " + x + "y: " + y);
			}
			// If we want to do something special outside of scenes we can set the currentScene to nothing
			else if (this.showScene) {

					this.currentScene.click(x, y);
				}
		}
	}, {
		key: 'getSceneByName',
		value: function getSceneByName(name) {
			var selectedScene = null;
			this.scenes.forEach(function (scene) {
				if (scene.name == name) {
					selectedScene = scene;
				}
			});
			if (selectedScene == null) {
				return "start";
			} else {
				return selectedScene;
			}
		}
	}, {
		key: 'initCanvas',
		value: function initCanvas() {
			this.canvas.width = 1440;
			this.canvas.height = 800;
			this.backgroundImages = [];
			this.Images = [];

			var drawing = new Image();

			drawing.src = "./dist/images/title.png"; // can also be a remote URL e.g. http:// // 0
			this.Images.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/campaign.png"; // 1
			this.Images.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/frame.png"; // 2
			this.Images.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/campaign.png"; // 3
			this.Images.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/credits.png"; // 4
			this.Images.push(drawing);

			/*		
   		drawing = new Image();
   		drawing.src = "./dist/images/keys.png"; // 4
   		this.backgroundImages.push(drawing);
   
   		drawing = new Image();
   		drawing.src = "./dist/images/playagain.png"; // 4
   		this.backgroundImages.push(drawing);
   
   		drawing = new Image();
   		drawing.src = "./dist/images/title.png"; // 5
   		this.backgroundImages.push(drawing);
   
   		drawing = new Image();
   		drawing.src = "./dist/images/play.png"; // 6
   		this.backgroundImages.push(drawing);
   
   		this.audio = [];
   		this.audio.push(new Audio('./dist/audio/47356__fotoshop__oof.wav')); //0
   		this.audio.push(new Audio('./dist/audio/fart01.wav')); // 1 / 
   		this.audio.push(new Audio('./dist/audio/hitbat_v1.wav')); // 2 / 
   		this.audio.push(new Audio('./dist/audio/stadiumcheer1.wav')); // 3 / 
   		this.audio.push(new Audio('./dist/audio/whooshbat1.wav')); //4 
   		
   */
		}
	}, {
		key: 'animateGame',
		value: function animateGame() {
			var _this2 = this;

			this.timer = setInterval(function () {

				// Clear the Canvas
				_this2.clearCanvas();

				/* Render Scene Manager */
				if (_this2.currentScene != null) {
					_this2.currentScene.render();
				}

				/* show menu */
				if (_this2.firstload == true) {
					_this2.drawMenu();
				}
			}), this.tickTime;
		}
	}, {
		key: 'loadScene',
		value: function loadScene(scene) {
			console.log("load scene" + scene);
		}
	}, {
		key: 'drawPlayAgain',
		value: function drawPlayAgain() {
			this.ctx.drawImage(this.backgroundImages[4], 375, 110);
		}
	}, {
		key: 'drawMenu',
		value: function drawMenu() {

			this.ctx.beginPath();
			this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.fillStyle = "black";
			this.ctx.fill();
			// Title Image
			this.ctx.drawImage(this.Images[0], 475, 80);
			// Play Button
			this.ctx.drawImage(this.Images[1], 525, 350);

			// Draw the frame
			this.ctx.drawImage(this.Images[2], 0, 0);

			this.ctx.strokecolor = "red";
			this.ctx.fillStyle = "red";
			this.ctx.font = "bold 24px Arial";
			this.ctx.color = "red";
		}
	}, {
		key: 'clearCanvas',
		value: function clearCanvas() {
			/*  main background */

			this.ctx.fillStyle = "#000000";
			this.ctx.strokeStyle = "#ffffff";
			//  context.fillRect(10,10, 100,100);
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}]);

	return Game;
}();

var game = void 0;
window.addEventListener('load', function () {
	game = new Game();
});
window.addEventListener('resize', function () {
	console.log("Window Changed");
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var Scenes = [{
	// Screen 3
	"name": "start", // Name of the Scene "Scene"
	"question": "At a school board meeting in April 2020, the school board surprises the community with plans to change the location of your local school. You are upset by these plans, and take the opportunity to speak out against the move. ", // Question 
	"current_date": "April 2020", // Date for Month
	"campaign_month_count": 0, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_4"
	}]
}, { // Screen 4
	"name": "screen_4",
	"question": "After the meeting, your friend Heather, a former school board member, says, \"Hey, you should run. Have you thought about it?\" \n\t\t\u201CI wouldn\u2019t even know where to start--these people seem like they\u2019ve been doing this their whole lives.\u201D\n\t\t\u201CLet\u2019s have coffee in May,\u201D Heather says. \u201CI was on the school board a few years ago, and I can help you get started.\u201D",
	"current_date": "April 2020", // Date for Month
	"campaign_month_count": 0, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_5"
	}]
}, { // Screen 5
	"name": "screen_5",
	"question": "You meet up with Heather for coffee at The Old Washburne.\n\t\t\u201CI\u2019ve never even thought about running for office before,\u201D you tell Heather.\n\t\t\n\t\tHeather smiles and tells you, \u201CIt\u2019s not that hard, but it does take some planning. The school board elections happen every 2 years, and our next one is in May 2021. This is a great time to get started!\u201D",
	"current_date": "April 2020", // Date for Month
	"campaign_month_count": 0, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_6"
	}]
}, {
	"name": "screen_6",
	"question": "\u201CWhat do I need to do? Do I have to go declare my intention somewhere?\u201D\n\t\tHeather takes out a pad of paper. \u201CActually, the best place to start is with budgeting. What\u2019s your top budget priority?\u201D \n\t\t",
	"current_date": "May 2020", // Date for Month
	"campaign_month_count": 1, // Counter for Budget
	"choices": [{
		"description": "Rent an office to run your campaign from",
		"sceneDestination": "start"
	}, {
		"description": "Hire a campaign manager",
		"sceneDestination": "start"
	}, {
		"description": "Hire a public relations manager",
		"sceneDestination": "start"
	}, {
		"description": "Find volunteers",
		"sceneDestination": "start"
	}]

}, {
	"name": "screen_7",
	"question": "Example Question? Wecome to the game?",
	"current_date": "April 2020", // Date for Month
	"campaign_month_count": 1, // Counter for Budget
	"choices": [{
		"description": "go back to example",
		"sceneDestination": "start"
	}]

}, {
	"name": "screen_6",
	"question": "Example Question? Wecome to the game?",
	"current_date": "April 2020", // Date for Month
	"campaign_month_count": 0, // Counter for Budget
	"choices": [{
		"description": "go back to example",
		"sceneDestination": "start"
	}]

}];
exports.default = Scenes;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scene = function (_Sprite) {
	_inherits(Scene, _Sprite);

	function Scene(game, options) {
		_classCallCheck(this, Scene);

		var _this = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, game));

		_this.game = game;
		_this.offset = 75;
		_this.positionX = 0;
		_this.positionY = 0;
		//this.scoreboardImages = null;
		_this.startY = 375;
		_this.font = "30px Arial";
		_this.fontColor = "red";
		_this.question = options.question;
		_this.current_date = options.current_date;
		_this.campaign_month_count = options.campaign_month_count;
		console.log("options" + JSON.stringify(options));
		// this is for checking if it exists before using
		_this.imgLoad = "./dist/images/scenes/" + options.name + ".png";

		if (_this.imageExists(_this.imgLoad)) {
			_this.sceneImage = new Image();
			_this.sceneImage.src = _this.imgLoad;
		} else {
			_this.sceneImage = null;
		}

		_this.options = options;
		_this.buildOptions();
		return _this;
	}

	_createClass(Scene, [{
		key: "render",
		value: function render() {
			//draw the frame


			// Draw main image
			if (this.sceneImage != null) {

				this.game.ctx.drawImage(this.sceneImage, 0, 0);
			}
			// Draw choices
			var startY = this.startY + this.offset;
			for (var i = 0; i < this.options.choices.length; i++) {

				this.game.ctx.strokecolor = "white";
				this.game.ctx.fillStyle = "white";
				this.game.ctx.font = " 24px Arial";
				this.game.ctx.color = "white";
				this.game.ctx.fillText(this.options.choices[i].description, 50, startY);
				// Spacing of question
				startY += 50;
			}
			// wrapText(context, text, x, y, line_width, line_height)
			// Lets work on drawing the final questions
			this.game.ctx.strokecolor = "white";
			this.game.ctx.fillStyle = "white";
			this.game.ctx.font = " 14px Arial";
			this.game.ctx.color = "white";
			this.wrapText(this.game.ctx, this.question, 50, 350, 1200, 12);

			this.game.ctx.drawImage(this.game.Images[2], 0, 0);
		}
		// This gets called if its clickable

	}, {
		key: "buildOptions",
		value: function buildOptions() {
			console.log(this.options);
		}
	}, {
		key: "click",
		value: function click(x, y) {
			/*
   opt 1 : 350 - 400
   opt 2 : 400 - 450
   opt 3: 450 - 500
   opt 4: 500 - 550
   opt 5: 550 - 600*/

			if (this.options.choices.length >= 5) {
				if (y > 550 + this.offset && y < 600 + this.offset) {
					this.game.currentScene = new Scene(this.game, this.game.getSceneByName(this.options.choices[4].sceneDestination));
				}
			}
			if (this.options.choices.length >= 4) {
				if (y > 500 + this.offset && y < 550 + this.offset) {
					this.game.currentScene = new Scene(this.game, this.game.getSceneByName(this.options.choices[3].sceneDestination));
				}
			}
			if (this.options.choices.length >= 3) {
				if (y > 450 + this.offset && y < 500 + this.offset) {
					this.game.currentScene = new Scene(this.game, this.game.getSceneByName(this.options.choices[2].sceneDestination));
				}
			}
			if (this.options.choices.length >= 2) {
				if (y > 400 + this.offset && y < 450 + this.offset) {
					this.game.currentScene = new Scene(this.game, this.game.getSceneByName(this.options.choices[1].sceneDestination));
				}
			}
			if (this.options.choices.length >= 1) {
				if (y > 350 + this.offset && y < 400 + this.offset) {
					this.game.currentScene = new Scene(this.game, this.game.getSceneByName(this.options.choices[0].sceneDestination));
				}
			}

			var selection = y;
			console.log("I was clicked x:" + x + "y:" + y);
			console.log("options:" + this.options.choices.length);
		}
		// Helper

	}, {
		key: "wrapText",
		value: function wrapText(context, text, x, y, line_width, line_height) {
			var line = '';
			var paragraphs = text.split('\n');
			for (var i = 0; i < paragraphs.length; i++) {
				var words = paragraphs[i].split(' ');
				for (var n = 0; n < words.length; n++) {
					var testLine = line + words[n] + ' ';
					var metrics = context.measureText(testLine);
					var testWidth = metrics.width;
					if (testWidth > line_width && n > 0) {
						context.fillText(line, x, y);
						line = words[n] + ' ';
						y += line_height;
					} else {
						line = testLine;
					}
				}
				context.fillText(line, x, y);
				y += line_height;
				line = '';
			}
		}
	}, {
		key: "imageExists",
		value: function imageExists(image_url) {
			var http = new XMLHttpRequest();

			http.open('HEAD', image_url, false);
			http.send();

			return http.status != 404;
		}
	}]);

	return Scene;
}(_sprite2.default);

exports.default = Scene;

/***/ })
/******/ ]);
//# sourceMappingURL=game.js.map