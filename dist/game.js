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
/******/ 	var hotCurrentHash = "e3a7095959b07eed0455"; // eslint-disable-line no-unused-vars
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
/******/ 	return hotCreateRequire(3)(__webpack_require__.s = 3);
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
};

exports.default = Sprite;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var MoneyData = {
    "BudgetItems": [{
        "NAME": "Campaign Manager",
        "MOD": 0.2,
        "INITCOST": 0,
        "MOCOST": -2000,
        "MINC": 2300,
        "MEFF": 0,
        "ID": 0
    }, {
        "NAME": "Graphic Designer",
        "MOD": 0.1,
        "INITCOST": -2000,
        "MOCOST": 0,
        "MINC": 400,
        "MEFF": 0,
        "ID": 1
    }, {
        "NAME": "Office Rent",
        "MOD": 0,
        "INITCOST": 0,
        "MOCOST": -500,
        "MINC": 0,
        "MEFF": 0,
        "ID": 2
    }, {
        "NAME": "Volunteer Coordinator",
        "MOD": 0.3,
        "INITCOST": 0,
        "MOCOST": -800,
        "MINC": 800,
        "MEFF": 0,
        "ID": 3
    }, {
        "NAME": "Literature/Digital",
        "MOD": 0.3,
        "INITCOST": 0,
        "MOCOST": -3000,
        "MINC": 1000,
        "MEFF": 0,
        "ID": 4
    }, {
        "NAME": "Other Media",
        "MOD": 0.2,
        "INITCOST": 0,
        "MOCOST": -3000,
        "MINC": 0,
        "MEFF": 0,
        "ID": 5
    }, {
        "NAME": "Fundraising",
        "MOD": 0,
        "INITCOST": 0,
        "MOCOST": -2000,
        "MINC": 2500,
        "MEFF": 0,
        "ID": 6
    }],
    "LedgerItems": [{
        "EntryName": "Starting Funds",
        "Value": 10000,
        "Month": 0,
        "MOD": 0
    }]
};
exports.default = MoneyData;

/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

var _scenes = __webpack_require__(4);

var _scenes2 = _interopRequireDefault(_scenes);

var _scene = __webpack_require__(5);

var _scene2 = _interopRequireDefault(_scene);

var _budgetMenu = __webpack_require__(6);

var _budgetMenu2 = _interopRequireDefault(_budgetMenu);

var _money = __webpack_require__(1);

var _money2 = _interopRequireDefault(_money);

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

		// Budget
		this.budgetMenu = new _budgetMenu2.default(this);
		this.showBudgetMenu = false; // budget menu or menu access button is visible
		this.money = 10000; // starting budget

		// Scoring
		this.polling = 0.3251243124; // TODO calculate this somewhere
		this.month = 0;
		this.lastMonth = 0; // updated when calculateBudget() is called

		// Background
		this.backgroundImage = null;

		// Audio
		this.audio = new Audio("dist/sound/loop.mp3");

		/* array of images */
		this.backgroundImage = null;
		this.showPlayAgain = false;
		this.showCredits = true;
		/* Call Methods */
		this.initCanvas();
		this.playButton = true;
		this.firstload = true;

		this.canvas.addEventListener('click', function (e) {
			// console.log("mousedown @ "+e.clientX+" "+e.clientY); // debug
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
		key: 'calculateBudget',
		value: function calculateBudget(selectedIDs) {
			if (this.month <= this.lastMonth) return;
			var months = this.month - this.lastMonth;
			for (var i in selectedIDs) {
				this.money += _money2.default["BudgetItems"][selectedIDs[i]]["MOCOST"] * months;
			}
			this.lastMonth = this.month;

			// for (var i = 0; i < selectedIDs.length; i++){
			// 	if (budget_ledger["BudgetItems"][i].ID = selectedIDs[i]) {
			// 		budget_ledger.LedgerItems.push({
			// 			"EntryName": budget_ledger["BudgetItems"][i]["NAME"], 
			// 			"Value": (budget_ledger["BudgetItems"][i]["MOCOST"] == 0) ? budget_ledger["BudgetItems"][i]["INITCOST"]:budget_ledger["BudgetItems"][i]["MOCOST"], 
			// 			"MONTH":month, 
			// 			"MOD": budget_ledger["BudgetItems"][i]["MOD"] 
			// 		});
			// 	}
			// }
			// var CashFlow = budget_ledger.LedgerItems;
			// this.money = 0;

			// for (i = 0; i < CashFlow.length; i++) {  
			// this.money += CashFlow[i].Value  } 
		}
	}, {
		key: 'handleClick',
		value: function handleClick(x, y) {
			this.lastClickX = x;
			this.lastClickY = y;
			if (this.showBudgetMenu) {
				if (this.budgetMenu.click(x, y) === true) return;
			}
			if (this.playButton) {
				// Play the game button
				if (x >= 526 & x <= 850 & y >= 200 & y <= 400) {
					// Stop drawing the menu
					this.firstload = false;
					this.playButton = false;
					this.showScene = true;
					this.showCredits = false;
					this.audio.play();
					this.audio.loop = true;

					this.showBudgetMenu = true;

					// Start drawing the first scene
					this.currentScene = new _scene2.default(this, this.getSceneByName("start"));
				} else if (x >= 600 & x <= 800 & y >= 430 & y <= 500) {
					/* should be changed to dry - but oot */
					this.firstload = false;
					this.playButton = false;
					this.showScene = true;
					this.showCredits = false;
					this.audio.play();
					this.audio.loop = true;

					this.showBudgetMenu = true;

					// Start drawing the first scene
					this.currentScene = new _scene2.default(this, this.getSceneByName("credits"));
				}
			}
			// If we want to do something special outside of scenes we can set the currentScene to nothing
			else if (this.showScene) {
					this.currentScene.click(x, y);
					this.month = this.currentScene.campaign_month_count;
					this.calculateBudget(this.budgetMenu.getSelectedIDs());
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
			drawing.src = "./dist/images/creditbutton.png"; // 4
			this.Images.push(drawing);
		}
	}, {
		key: 'animateGame',
		value: function animateGame() {
			var _this2 = this;

			this.timer = setInterval(function () {

				// Clear the Canvas
				_this2.clearCanvas();

				// Render primary elements
				if (_this2.currentScene != null) {
					_this2.currentScene.render();
				};
				if (_this2.budgetMenu !== null) {
					_this2.budgetMenu.render();
				};
				if (_this2.currentScene != null) {
					_this2.renderDate();
				};

				/* show menu */
				if (_this2.firstload == true) {
					_this2.drawMenu();
				}
				if (_this2.showCredits) {
					_this2.renderCredits();
				}
			}), this.tickTime;
		}
	}, {
		key: 'renderCredits',
		value: function renderCredits() {
			this.ctx.drawImage(this.Images[4], 600, 450);
		}
	}, {
		key: 'renderDate',
		value: function renderDate() {
			if (!this.currentScene || this.currentScene.current_date == null) return;
			var date = this.currentScene.current_date.split(" "); // [month, year];
			this.ctx.font = "24px BlueSky";
			this.ctx.fillStyle = "98D7DB";
			this.ctx.fillText(date[0].toUpperCase(), 80, 100);
			this.ctx.fillText(date[1], 80, 135);
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
			this.ctx.font = "bold 24px BlueSky8x8Monospaced";
			this.ctx.color = "red";
		}
	}, {
		key: 'clearCanvas',
		value: function clearCanvas() {
			/*  main background */

			this.ctx.fillStyle = "#000000";
			this.ctx.strokeStyle = "#ffffff";
			//context.fillRect(10,10, 100,100);
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
/* 4 */
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
	"img": "Animation_School.gif",
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_4"
	}]
}, { // Screen 4
	"name": "screen_4",
	"question": "After the meeting, your friend Heather, a former school board member, says, \"Hey, you should run. Have you thought about it?\" \n\n\t\t\u201CI wouldn\u2019t even know where to start--these people seem like they\u2019ve been doing this their whole lives.\u201D\n\t\t\u201CLet\u2019s have coffee in May,\u201D Heather says. \u201CI was on the school board a few years ago, and I can help you get started.\u201D",

	"current_date": "April 2020", // Date for Month
	"campaign_month_count": 0, // Counter for Budget
	"img": "Animation_Heather_Walking.gif",
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_5"
	}]
}, { // Screen 5
	"name": "screen_5",
	"question": "You meet up with Heather for coffee at The Old Washburne.\n\n\t\t\u201CI\u2019ve never even thought about running for office before,\u201D you tell Heather.\n\t\t\n\t\tHeather smiles and tells you, \u201CIt\u2019s not that hard, but it does take some planning. The school board elections happen every 2 years, and our next one is in May 2021. This is a great time to get started!\u201D",

	"current_date": "April 2020", // Date for Month
	"campaign_month_count": 0, // Counter for Budget
	"img": "Animation_Heather_Coffee.gif",
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_6"
	}]
}, {
	"name": "screen_6",
	"question": "\u201CWhat do I need to do? Do I have to go declare my intention somewhere?\u201D\n\t\tHeather takes out a pad of paper. \u201CActually, the best place to start is with budgeting. What\u2019s your top budget priority?\u201D \n\t\t",
	"current_date": "May 2020", // Date for Month
	"campaign_month_count": 1, // Counter for Budget
	"img": "Animation_Heather_Planning.gif",
	"choices": [{
		"description": "Rent an office to run your campaign from",

		"sceneDestination": "screen_6_wrong"
	}, {
		"description": "Hire a campaign manager",
		"sceneDestination": "screen_6_right"
	}, {
		"description": "Hire a public relations manager",
		"sceneDestination": "screen_6_wrong"
	}, {
		"description": "Find volunteers",
		"sceneDestination": "screen_6_wrong"
	}]

}, {
	"name": "screen_6_wrong",
	"question": "Heather responds with \u201CI\u2019d find someone to manage my campaign and design a logo first, but this could work too!\u201D",
	"current_date": "May 2020", // Date for Month
	"campaign_month_count": 1, // Counter for Budget
	"img": "Animation_Heather_Planning.gif",
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_7"
	}]

}, {
	"name": "screen_6_right",
	"question": "Heather responds with, \u201CA campaign manager and someone to design a logo would be my top priority too!\u201D",
	"current_date": "May 2020", // Date for Month
	"campaign_month_count": 1, // Counter for Budget
	"img": "Animation_Heather_Planning.gif",
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_7"
	}]

}, {
	"name": "screen_7",
	"question": "It\u2019s time to set your budget! Click on the \u201Cbudget\u201D button to set up your campaign budget. Each item will cost money. Items may generate additional income, and even give bonuses to your polling percentage.",
	"current_date": "May 2020", // Date for Month
	"campaign_month_count": 1, // Counter for Budget
	"img": "Animation_Heather_Planning.gif",
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_8"
	}]

}, {
	"name": "screen_8",
	"question": "The campaign is getting organized, and you meet up with Heather again in June. \u201CNow that we\u2019ve got your budget laid out, we should figure out what your goal is,\u201D Heather says. \u201CDo you know how to calculate your vote win number?\u201D Which is the formula for a \u201Cvote win number\u201D?",

	"current_date": "June 2020", // Date for Month
	"campaign_month_count": 2, // Counter for Budget
	"choices": [{
		"description": "The largest number of votes a candidate has received",
		"sceneDestination": "screen_8_wrong"
	}, {
		"description": "The most recent number of votes that a candidate needed to win",
		"sceneDestination": "screen_8_wrong"
	}, {
		"description": "The average number of winning votes needed over last 2 campaigns",
		"sceneDestination": "screen_8_right"
	}, {
		"description": "The number of votes needed to be elected in last 3 elections",
		"sceneDestination": "screen_8_wrong"
	}]

}, {
	"name": "screen_8_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "June 2020", // Date for Month
	"campaign_month_count": 2, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_9"
	}]

}, {
	"name": "screen_8_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "June 2020", // Date for Month
	"campaign_month_count": 2, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_9"
	}]

}, {
	"name": "screen_9",
	"question": "Everyone is getting into a rhythm, but your campaign doesn\u2019t have a lot of visibility in the community yet. Heather advises you to start some community outreach efforts.\n\n\t\tWhat outreach method do you think will be LEAST effective for Baby Boomers?",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 3, // Counter for Budget
	"choices": [{
		"description": "Facebook",
		"sceneDestination": "screen_9_wrong"
	}, {
		"description": "Door-to-door canvassing",
		"sceneDestination": "screen_9_wrong"
	}, {
		"description": "Instagram",
		"sceneDestination": "screen_9_right"
	}, {
		"description": "Phone banks",
		"sceneDestination": "screen_9_wrong"
	}, {
		"description": "Radio ads",
		"sceneDestination": "screen_9_wrong"
	}]

}, {
	"name": "screen_9_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 3, // Counter for Budget

	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_10"
	}]

}, {
	"name": "screen_9_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 3, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_10"
	}]

}, {
	"name": "screen_10",
	"question": "The after school political club has decided to help out. Their coordinator, Tim, has come to you to ask how they can they can get involved. After speaking with Heather, you decide to have them reach out to the younger voter demographic. \n\n\t\tWhat outreach method will be MOST effective for Millennials?",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 3, // Counter for Budget
	"choices": [{
		"description": "Facebook",
		"sceneDestination": "screen_10_wrong"
	}, {
		"description": "Door-to-door canvassing",
		"sceneDestination": "screen_10_wrong"
	}, {
		"description": "Phone banks",
		"sceneDestination": "screen_10_wrong"
	}, {
		"description": "Instagram",
		"sceneDestination": "screen_10_right"
	}, {
		"description": "Radio ads",
		"sceneDestination": "screen_10_wrong"
	}]

}, {
	"name": "screen_10_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 3, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_11"
	}]

}, {
	"name": "screen_10_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 3, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_11"
	}]

}, {
	"name": "screen_11",
	"question": "You\u2019re out at the Public House for dinner one night and see Heather. She asks, \u201CHow\u2019s your budget doing? In the second quarter, you\u2019ll probably need to start finding some volunteers. A volunteer coordinator could be a real help finding people and getting them organized!\u201D",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 3, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_12"
	}]

}, {
	"name": "screen_12",
	"question": "As the summer wears on, your campaign manager decides that it\u2019s time to start recruiting volunteers to help out with the campaign. There are many different benefits that different volunteers could bring, but what is the MOST important quality to look for?",
	"current_date": "August 2020", // Date for Month
	"campaign_month_count": 4, // Counter for Budget
	"choices": [{
		"description": "Skills",
		"sceneDestination": "screen_12_wrong"
	}, {
		"description": "Alignment of goals",
		"sceneDestination": "screen_12_right"
	}, {
		"description": "Availability",
		"sceneDestination": "screen_12_right"
	}, {
		"description": "Dedication to the cause",
		"sceneDestination": "screen_12_wrong"
	}, {
		"description": "Personality",
		"sceneDestination": "screen_12_wrong"
	}] }, {
	"name": "screen_12_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 4, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_13"
	}]

}, {
	"name": "screen_12_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "July 2020", // Date for Month
	"campaign_month_count": 4, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_13"
	}]

}, {
	"name": "screen_13",
	"question": "You check the funds with your team and discover that the money is getting low. You\u2019ve already solicited donations from everyone you know, so you need to find some new sources of funding. How can you refill your coffers?",
	"current_date": "September 2020", // Date for Month
	"campaign_month_count": 4, // Counter for Budget
	"choices": [{
		"description": "Visit the Oregon Secretary of State Finance Page (ORESTAR)",
		"sceneDestination": "screen_13_right"
	}, {
		"description": "High-interest loan",
		"sceneDestination": "screen_13_wrong"
	}, {
		"description": "An unpublicized Go Fund Me campaign",
		"sceneDestination": "screen_13_wrong"
	}, {
		"description": "Cold-calling local businesses",
		"sceneDestination": "screen_13_wrong"
	}]

}, {
	"name": "screen_13_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\" Check out ORESTAR for more help: https://sos.oregon.gov/elections/Pages/orestar.aspx",
	"current_date": "May 2020", // Date for Month
	"campaign_month_count": 1, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_14"
	}]

}, {
	"name": "screen_13_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "May 2020", // Date for Month
	"campaign_month_count": 1, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_14"
	}]

}, {
	"name": "screen_14",
	"question": "You\u2019re reading the paper one morning in October, and notice that there\u2019s a letter to the editor supporting one of your opponents in the race. You realize that you need to get your name in the paper somehow too. What\u2019s the best way to achieve this goal?",
	"current_date": "October 2020", // Date for Month
	"campaign_month_count": 6, // Counter for Budget
	"choices": [{
		"description": "Invite a reporter you know of out for drinks",
		"sceneDestination": "screen_14_wrong"
	}, {
		"description": "E-mail the paper asking them to write an article about you",
		"sceneDestination": "screen_14_wrong"
	}, {
		"description": "Prepare an editorial with your policy ideas and submit it for publication",
		"sceneDestination": "screen_14_right"
	}, {
		"description": "Show up unannounced at the front desk and demand a meeting with the editor",
		"sceneDestination": "screen_14_wrong"
	}]

}, {
	"name": "screen_14_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "October 2020", // Date for Month
	"campaign_month_count": 6, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_15"
	}]

}, {
	"name": "screen_14_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "October 2020", // Date for Month
	"campaign_month_count": 6, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_15"
	}]

}, {
	"name": "screen_15",
	"question": "It\u2019s the morning after the 2020 presidential election and the world is abuzz. Although all of the attention is at the White House, you\u2019re organizing for the most local elected level of office. You\u2019re excited to run and want to make it official when you realize\n\t\tHow do you qualify for the ballot? ",
	"current_date": "November 2020", // Date for Month
	"campaign_month_count": 7, // Counter for Budget
	"choices": [{
		"description": "You pay $10 or collect 25 signatures",
		"sceneDestination": "screen_15_right"
	}, {
		"description": "You pay $30",
		"sceneDestination": "screen_15_wrong"
	}, {
		"description": "You pay $10 fee and collect 25 signatures",
		"sceneDestination": "screen_15_wrong"
	}, {
		"description": "You pay $30 or collect 20 signatures",
		"sceneDestination": "screen_15_wrong"
	}]

}, {
	"name": "screen_15_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "November 2020", // Date for Month
	"campaign_month_count": 7, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_16"
	}]

}, {
	"name": "screen_15_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "November 2020", // Date for Month
	"campaign_month_count": 7, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_16"
	}]

}, {
	"name": "screen_16",
	"question": "BOOM. You were hit by a negative TV ad, and your jaw drops at how vicious and untrue it is. No names are listed as the sponsors of the ad, just a PAC. How can you find out who is funding this smear campaign?",
	"current_date": "November 2020", // Date for Month
	"campaign_month_count": 7, // Counter for Budget
	"choices": [{
		"description": "Contact the TV station that aired the ad",
		"sceneDestination": "screen_16_right"
	}, {
		"description": "Call the current school board",
		"sceneDestination": "screen_16_wrong"
	}, {
		"description": "Send an e-mail to the county elections clerk",
		"sceneDestination": "screen_16_wrong"
	}, {
		"description": "Check the Oregon Secretary of State ORESTAR page",
		"sceneDestination": "screen_16_wrong"
	}]

}, {
	"name": "screen_16_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens. I'd really suggest checking out ORESTAR at https://sos.oregon.gov/elections/Pages/orestar.aspx\"",
	"current_date": "November 2020", // Date for Month
	"campaign_month_count": 7, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_17"
	}]

}, {
	"name": "screen_16_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "November 2020", // Date for Month
	"campaign_month_count": 7, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_17"
	}]

}, {
	"name": "screen_17",
	"question": "You\u2019re having lunch with your co-workers, and they\u2019re curious about your campaign. Your cube-mate Aaron asks, \u201CHow many voters are there in the school district anyway?\u201D and you start to wonder as well. You know that Lane County has a document with the voter totals for the different districts, and decided to figure out just how many registered voters there are in Springfield School District #19.(link page)",
	"current_date": "January 2021", // Date for Month
	"campaign_month_count": 9, // Counter for Budget
	"choices": [{
		"description": "51650",
		"sceneDestination": "screen_17_right"
	}, {
		"description": "48459",
		"sceneDestination": "screen_17_wrong"
	}, {
		"description": "40060",
		"sceneDestination": "screen_17_wrong"
	}, {
		"description": "35680",
		"sceneDestination": "screen_17_wrong"
	}]

}, {
	"name": "screen_17_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "January 2021", // Date for Month
	"campaign_month_count": 9, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_18"
	}]

}, {
	"name": "screen_17_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "January 2021", // Date for Month
	"campaign_month_count": 9, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_18"
	}]

}, {
	"name": "screen_18",
	"question": "Your top canvasser Dean comes back from a long afternoon of spreading the word. He says that he got a lot of friendly comments, but there were some houses where he had to knock for a while before anyone answered. A few residents never answered their doors, but Dean says he left flyers in their mailboxes. Your volunteer coordinator turns red and takes Dean back into her office to talk about Dos and Don\u2019ts of canvassing. What did Dean do wrong?",
	"current_date": "February 2021", // Date for Month
	"campaign_month_count": 10, // Counter for Budget
	"choices": [{
		"description": "Accepted a glass of water from a resident",
		"sceneDestination": "screen_18_wrong"
	}, {
		"description": "Left flyers in mailboxes",
		"sceneDestination": "screen_18_right"
	}, {
		"description": "Knocked too long",
		"sceneDestination": "screen_18_wrong"
	}, {
		"description": "Didn’t have canvassing permit",
		"sceneDestination": "screen_18_wrong"
	}]

}, {
	"name": "screen_18_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "February 2021", // Date for Month
	"campaign_month_count": 10, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_19"
	}]

}, {
	"name": "screen_18_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "February 2021", // Date for Month
	"campaign_month_count": 10, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_19"
	}]

}, {
	"name": "screen_19",
	"question": "Election day is nearing, and you really want to take on your opponent in a public forum so that you can show everyone how much better you would be as a member of the school board. You realize you don\u2019t know how to get a debate set up, and decide to look into it. After some searches and talking to your campaign manager, you know that debates are organized by:",
	"current_date": "March 2021", // Date for Month
	"campaign_month_count": 11, // Counter for Budget
	"choices": [{
		"description": "Political parties",
		"sceneDestination": "screen_19_wrong"
	}, {
		"description": "The superintendent of the school district",
		"sceneDestination": "screen_19_wrong"
	}, {
		"description": "The county elections clerk",
		"sceneDestination": "screen_19_wrong"
	}, {
		"description": "Community organizations",
		"sceneDestination": "screen_19_right"
	}]

}, {
	"name": "screen_19_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "March 2021", // Date for Month
	"campaign_month_count": 11, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_20"
	}]

}, {
	"name": "screen_19_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "March 2021", // Date for Month
	"campaign_month_count": 11, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_20"
	}]

}, {
	"name": "screen_20",
	"question": "You\u2019re checking out books at the Springfield Library when the librarian asks what sorts of things you\u2019re doing in this final month of the election. You pause for a moment, uncertain. What SHOULD you be doing in the final month of the election?",
	"current_date": "April 2021", // Date for Month
	"campaign_month_count": 12, // Counter for Budget
	"choices": [{
		"description": "Fundraise as much as possible",
		"sceneDestination": "screen_20_wrong"
	}, {
		"description": "GOTV (Get out the vote)",
		"sceneDestination": "screen_20_right"
	}, {
		"description": "Recruit more volunteers",
		"sceneDestination": "screen_20_wrong"
	}, {
		"description": "Issue policy statements",
		"sceneDestination": "screen_20_wrong"
	}]

}, {
	"name": "screen_20_right",
	"question": "Heather responds with, \u201CYes! This is exactly what I would suggest!\u201D",
	"current_date": "April 2021", // Date for Month
	"campaign_month_count": 12, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_21"
	}]

}, {
	"name": "screen_20_wrong",
	"question": "Heather responds with \u201CThat isn't what I'd do. But I guess you could try it and see what happens.\"",
	"current_date": "April 2021", // Date for Month
	"campaign_month_count": 12, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "screen_21"
	}]

}, {
	"name": "screen_21",
	"question": "Election Day is tomorrow morning, and there\u2019s not much more you can do to support your candidacy. In a rare bit of quiet, you realize how much of a toll this campaign has taken on everyone you love and everyone who has helped you. What can you do to start to make amends and repair your relationships?",
	"current_date": "May 2021", // Date for Month
	"campaign_month_count": 13, // Counter for Budget
	"choices": [{
		"description": "Show gratitude to your volunteers by giving them all hugs",
		"sceneDestination": "screen_22"
	}, {
		"description": "Let your staff know they will get a Win Bonus whether or not you win",
		"sceneDestination": "screen_22"
	}, {
		"description": "Thank your donors for believing in you",
		"sceneDestination": "screen_22"
	}, {
		"description": "Thank your family and friends for putting up with you while you were being absent",
		"sceneDestination": "screen_22"
	}]

}, {
	"name": "screen_22",
	"question": "You\u2019re at Roaring Rapids on a warm spring evening and it\u2019s election night. It\u2019s been one year of hard work and you\u2019re looking forward to the ending, win or lose. Your family, staff, volunteers, friends, and donors are all with you, enjoying pizza and waiting for the election results to come in\u2026.",
	"current_date": "May 2021", // Date for Month
	"campaign_month_count": 13, // Counter for Budget
	"choices": [{
		"description": "Win",
		"sceneDestination": "screen_23"
	}, {
		"description": "Lose",
		"sceneDestination": "screen_24"
	}]
}, {
	"name": "screen_24",
	"question": "It\u2019s Wednesday morning at the Washburne and you\u2019re getting ready to see Heather for a cup of coffee before work. You feel that you may have let her down. When Heather gets to the table she gives you a big hug and says, \u201CYou ran such a great campaign! One thing I didn\u2019t tell you because I didn\u2019t want to scare you: I served two terms on the school board, and it was great. But I also ran two times before and lost. Your next campaign will be so much better!\u201D",
	"current_date": "May 2021", // Date for Month
	"campaign_month_count": 13, // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "credits"
	}]
}, {
	"name": "credits",
	"question": "",
	"current_date": "H4C", // Date for Month
	"campaign_month_count": 1,
	"img": "Credits.png", // Counter for Budget
	"choices": [{
		"description": "Continue",
		"sceneDestination": "start"
	}]
}, {
	"name": "screen_25",
	"question": "Game Over\n\t\tWe created this game at Hack For A Cause 2019. The intention of this game is to inspire and help get some new faces in office. We hope you enjoyed playing the game. \t\t\n\t\tThanks!\n\t\t",
	"current_date": "", // Date for Month
	"campaign_month_count": "", // Counter for Budget
	"choices": [{
		"description": "Play Again",
		"sceneDestination": "start"
	}]
}];
exports.default = Scenes;

/***/ }),
/* 5 */
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
		_this.offset = 110;
		_this.positionX = 0;
		_this.positionY = 0;
		_this.startY = 500;
		// this.font = "30px Arial";
		// this.fontColor = "red";
		_this.question = options.question;
		_this.current_date = options.current_date;
		_this.campaign_month_count = options.campaign_month_count;

		// this is for checking if it exists before using

		if (options.img != null) {
			_this.image = "./dist/images/" + options.img;
		}
		_this.options = options;
		_this.width = window.innerWidth;
		_this.height = window.innerHeight;
		return _this;
	}

	_createClass(Scene, [{
		key: "render",
		value: function render() {
			// Draw main image
			if (this.image != null) {
				try {
					var sceneImage = new Image();
					sceneImage.src = this.image;

					this.game.ctx.drawImage(sceneImage, 50, 200);
				} catch (error) {
					null;
				}
			}
			// Draw choices
			var startY = this.startY;
			for (var i = 0; i < this.options.choices.length; i++) {

				this.game.ctx.strokecolor = "white";
				this.game.ctx.fillStyle = "white";
				this.game.ctx.fillStyle = "EBE6DD";
				this.game.ctx.font = "22px LeagueMono";
				this.game.ctx.color = "white";
				this.game.ctx.fillText("> " + this.options.choices[i].description, 500, startY);
				// Spacing of question
				startY += 50;
			}

			// Lets work on drawing the final questions
			this.game.ctx.strokecolor = "white";
			this.game.ctx.fillStyle = "white";
			this.game.ctx.fillStyle = "EBE6DD";
			this.game.ctx.font = "22px LeagueMono";
			this.wrapText(this.game.ctx, this.question, 500, 200, 700, 22);

			this.game.ctx.drawImage(this.game.Images[2], 0, 0);
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
			if (x < 300) return; // definitely out of range
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
	}]);

	return Scene;
}(_sprite2.default);

exports.default = Scene;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

var _money = __webpack_require__(1);

var _money2 = _interopRequireDefault(_money);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BudgetMenu = function (_Sprite) {
	_inherits(BudgetMenu, _Sprite);

	function BudgetMenu(game) {
		_classCallCheck(this, BudgetMenu);

		var _this = _possibleConstructorReturn(this, (BudgetMenu.__proto__ || Object.getPrototypeOf(BudgetMenu)).call(this, game));

		_this.expanded = false;
		_this.budgetItems = [];
		_this.ax1 = 80; // alignment
		_this.ax2 = 450; // alignment

		var offsetY = 180;
		var data = _money2.default["BudgetItems"];
		for (var i = 0; i < data.length; i++) {
			var name = data[i]["NAME"] + ":";
			var c1 = -data[i]["INITCOST"];
			var c2 = -data[i]["MOCOST"];
			var cost = "";
			if (c1 > 0) {
				cost = (c1 > 999 ? "$" + c1 / 1000 + "K" : c1) + " (one time)";
			} else {
				cost = (c2 > 999 ? "$" + c2 / 1000 + "K" : c2) + "/month";
			}
			_this.budgetItems.push(new BudgetItem(_this.ax2, offsetY, 600, 35, 22, name, cost));
			offsetY += 60;
		}

		var img = new Image();
		img.src = './dist/images/BudgetButton.png';
		img.height = 23;
		_this.showButton = new Button(_this.ax1, 630, 147, 50, img);
		img = new Image();
		img.height = 23;
		img.src = './dist/images/BudgetUpdateButton.png';
		_this.hideButton = new Button(_this.ax2, 630, 260, 56, img);
		return _this;
	}

	_createClass(BudgetMenu, [{
		key: 'getSelectedIDs',
		value: function getSelectedIDs() {
			var ret = [];
			for (var i in this.budgetItems) {
				if (this.budgetItems[i].checked) ret.push(i);
			}
			return ret;
		}
	}, {
		key: 'render',
		value: function render() {
			if (this.expanded) {
				this.game.ctx.fillStyle = "#141922";
				this.game.ctx.fillRect(0, 0, 1440, 800);
				this.game.ctx.drawImage(this.game.Images[2], 0, 0);
				this.renderTitle(this.game.ctx);
				this.renderCash(this.game.ctx);
				this.renderSummary(this.game.ctx);
				for (var i in this.budgetItems) {
					this.budgetItems[i].render(this.game.ctx);
				}
				this.hideButton.render(this.game.ctx);
			} else {
				this.showButton.render(this.game.ctx);
				this.renderCash(this.game.ctx);
			}
		}
	}, {
		key: 'click',
		value: function click(x, y) {
			if (this.expanded) {
				// clicked somewhere on menu
				this.game.calculateBudget(this.getSelectedIDs());
				for (var i in this.budgetItems) {
					this.budgetItems[i].click(x, y);
				}
				if (this.hideButton.isClick(x, y)) {
					this.hideButton.visible = false;
					this.showButton.visible = true;
					this.expanded = false;
				}
				return true;
			} else if (this.showButton.isClick(x, y)) {
				// clicked button
				this.showButton.visible = false;
				this.hideButton.visible = true;
				this.expanded = true;
				return true;
			} else {
				return false;
			}
		}
		// private

	}, {
		key: 'renderTitle',
		value: function renderTitle(ctx) {
			ctx.strokecolor = "white";
			ctx.font = "24px BlueSky";
			//ctx.fillStyle = "389DB1";
			ctx.fillStyle = "white";
			ctx.fillText("BUDGET", this.ax2, 150);
		}
	}, {
		key: 'renderCash',
		value: function renderCash(ctx) {
			ctx.strokecolor = "white";
			ctx.font = "12px BlueSky";
			ctx.fillStyle = "389DB1";
			ctx.fillText("CASH", this.ax1, 180);
			ctx.font = "24px BlueSky";
			ctx.fillText("$" + this.game.money.toLocaleString(), this.ax1, 215);
		}
	}, {
		key: 'renderSummary',
		value: function renderSummary(ctx) {
			ctx.strokecolor = "white";
			this.game.renderDate();
			this.renderCash(ctx);
			ctx.font = "12px BlueSky";
			ctx.fillStyle = "389DB1";
			ctx.fillText("MONTHLY NET", this.ax1, 260);
			ctx.fillText("POLLING", this.ax1, 340);
			ctx.font = "24px BlueSky";
			ctx.fillText((this.game.polling * 100).toPrecision(3) + "%", this.ax1, 375);
			var net = this.calculateNet();
			if (net < 0) {
				// losing money
				ctx.fillStyle = "DA5B66";
				net = "-$" + (-net).toLocaleString();
			} else {
				// gaining money
				ctx.fillStyle = "80DB8E";
				net = "$" + net.toLocaleString();
			}
			ctx.fillText(net, this.ax1, 295);
		}
	}, {
		key: 'calculateNet',
		value: function calculateNet() {
			var ids = this.getSelectedIDs();
			var net = 0;
			for (var i in ids) {
				net += _money2.default["BudgetItems"][ids[i]]["MOCOST"];
			}
			return net;
		}
	}]);

	return BudgetMenu;
}(_sprite2.default);

exports.default = BudgetMenu;

var Button = function () {
	function Button(x, y, w, h, img) {
		var visible = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

		_classCallCheck(this, Button);

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.img = img;
		this.pad = 5; // buffer that still counts as click
		// this.backColor = "rgb(50, 50, 50)"; // debug
		this.visible = visible;
	}

	_createClass(Button, [{
		key: 'isClick',
		value: function isClick(x, y) {
			return this.visible && x > this.x - this.pad && x < this.x + this.w + this.pad && y > this.y - this.pad && y < this.y + this.h + this.pad;
		}
	}, {
		key: 'render',
		value: function render(ctx) {
			if (!this.visible) return;
			// ctx.fillStyle = this.backColor;
			// ctx.fillRect(this.x-this.pad, this.y-this.pad, this.w+(this.pad*2), this.h+(this.pad*2)); // background
			ctx.drawImage(this.img, this.x, this.y);
		}
	}]);

	return Button;
}();

var BudgetItem = function () {
	function BudgetItem(x, y, w, h, pt, text1, text2) {
		_classCallCheck(this, BudgetItem);

		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.pt = pt;
		this.text1 = text1;
		this.text2 = text2;

		this.imgChecked = new Image();
		this.imgChecked.src = './dist/images/CheckButton_Selected.png';
		this.imgUnchecked = new Image();
		this.imgUnchecked.src = './dist/images/CheckButton_Static.png';

		this.font = pt + "px LeagueMono";
		this.pad = 5;
		this.checked = false;
		// this.backColor = "rgb(50, 50, 50)"; // debug
	}

	_createClass(BudgetItem, [{
		key: 'click',
		value: function click(x, y) {
			if (x > this.x - this.pad && x < this.x + this.w + this.pad && y > this.y - this.pad && y < this.y + this.h + this.pad) {
				this.checked = !this.checked;
			}
		}
	}, {
		key: 'render',
		value: function render(ctx) {
			// ctx.fillStyle = this.backColor;
			// ctx.fillRect(this.x-this.pad, this.y-this.pad, this.w+(this.pad*2), this.h+(this.pad*2)); // background
			var img = this.checked ? this.imgChecked : this.imgUnchecked;
			ctx.drawImage(img, this.x, this.y + (this.h - img.height) / 2); // checkbox
			ctx.font = this.font;
			ctx.fillStyle = "EBE6DD";
			ctx.fillText(this.text1, this.x + img.width + 20, this.y + this.h - (this.h - this.pt) / 2 - 3);
			ctx.fillStyle = "389DB1";
			ctx.fillText(this.text2, this.x + img.width + 20 + (this.text1.length + 1) * (this.pt / 1.7), this.y + this.h - (this.h - this.pt) / 2 - 3);
		}
	}]);

	return BudgetItem;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=game.js.map