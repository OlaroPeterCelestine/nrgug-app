(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/nrg-website-dev/src/contexts/PlayerContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerProvider",
    ()=>PlayerProvider,
    "usePlayer",
    ()=>usePlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nrg-website-dev/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nrg-website-dev/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const PlayerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function PlayerProvider(param) {
    let { children } = param;
    _s();
    const [isPlayerVisible, setIsPlayerVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showPlayer = ()=>setIsPlayerVisible(true);
    const hidePlayer = ()=>setIsPlayerVisible(false);
    const minimizePlayer = ()=>setIsPlayerVisible(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlayerContext.Provider, {
        value: {
            isPlayerVisible,
            showPlayer,
            hidePlayer,
            minimizePlayer
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/nrg-website-dev/src/contexts/PlayerContext.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
_s(PlayerProvider, "edBKJsuMpfdGPw+LDstexGeFGms=");
_c = PlayerProvider;
function usePlayer() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
}
_s1(usePlayer, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "PlayerProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BottomStickyPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nrg-website-dev/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nrg-website-dev/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function BottomStickyPlayer(param) {
    let { isVisible } = param;
    _s();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBuffering, setIsBuffering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFullyExpanded, setIsFullyExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomStickyPlayer.useEffect": ()=>{
            if (audioRef.current) {
                audioRef.current.src = "https://dc4.serverse.com/proxy/nrgugstream/stream";
                audioRef.current.preload = "none";
                // Simulate buffering for a few seconds
                setTimeout({
                    "BottomStickyPlayer.useEffect": ()=>{
                        setIsBuffering(false);
                    }
                }["BottomStickyPlayer.useEffect"], 2000);
            }
        }
    }["BottomStickyPlayer.useEffect"], []);
    const togglePlayPause = ()=>{
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    // volume slider removed per design
    const toggleExpanded = ()=>{
        if (!isExpanded) {
            // First click: fully expand to nav bar
            setIsExpanded(true);
            setIsFullyExpanded(true);
        } else {
            // Reset to collapsed
            setIsExpanded(false);
            setIsFullyExpanded(false);
        }
    };
    const handlePlayerClick = ()=>{
        if (!isExpanded) {
            // Click anywhere: fully expand to nav bar
            setIsExpanded(true);
            setIsFullyExpanded(true);
        }
    };
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/10 shadow-2xl transition-all duration-500 ease-in-out ".concat(isFullyExpanded ? 'top-16 bottom-0' // Expand to nav bar (assuming nav bar is ~64px/16 units)
         : 'bottom-0'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        toggleExpanded();
                    },
                    className: "cursor-pointer hover:opacity-70 transition-opacity p-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-1 bg-white/30 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            isFullyExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        setIsExpanded(false);
                        setIsFullyExpanded(false);
                    },
                    className: "w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 24 24",
                        fill: "white",
                        className: "w-5 h-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M7 10l5 5 5-5z"
                        }, void 0, false, {
                            fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                            lineNumber: 99,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                        lineNumber: 98,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                    lineNumber: 90,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                lineNumber: 89,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "transition-all duration-500 ease-in-out ".concat(isFullyExpanded ? 'h-full flex flex-col justify-center px-6' : isExpanded ? 'h-20 sm:h-24' : 'h-16 sm:h-18'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center h-full ".concat(isFullyExpanded ? 'flex-col space-y-8' : 'px-4'),
                    onClick: handlePlayerClick,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 ".concat(isFullyExpanded ? 'mr-0' : 'mr-3 sm:mr-4'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-500 ".concat(isFullyExpanded ? 'w-48 h-48 sm:w-56 sm:h-56' : isExpanded ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-14 sm:h-14'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg",
                                    alt: "NRG Live Radio",
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 128,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(isFullyExpanded ? 'text-center' : 'flex-1 min-w-0 mr-3 sm:mr-4'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "".concat(isFullyExpanded ? 'mb-4' : 'mb-1'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white font-semibold transition-all duration-500 ".concat(isFullyExpanded ? 'text-2xl sm:text-3xl mb-2' : isExpanded ? 'text-sm sm:text-base truncate' : 'text-xs sm:text-sm truncate'),
                                            children: isBuffering ? 'Buffering...' : 'NRG Live Radio'
                                        }, void 0, false, {
                                            fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 transition-all duration-500 ".concat(isFullyExpanded ? 'text-lg sm:text-xl' : isExpanded ? 'text-xs sm:text-sm truncate' : 'text-xs truncate'),
                                            children: "Live from Kampala, Uganda"
                                        }, void 0, false, {
                                            fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center ".concat(isFullyExpanded ? 'justify-center mb-6' : 'mb-1'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative flex h-2 w-2 mr-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                                                    }, void 0, false, {
                                                        fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                                        lineNumber: 163,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "relative inline-flex rounded-full h-2 w-2 bg-green-500"
                                                    }, void 0, false, {
                                                        fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                                        lineNumber: 164,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                                lineNumber: 162,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-green-400 font-medium ".concat(isFullyExpanded ? 'text-sm sm:text-base' : 'text-xs'),
                                                children: "LIVE"
                                            }, void 0, false, {
                                                fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 160,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center ".concat(isFullyExpanded ? 'mt-8' : ''),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    togglePlayPause();
                                },
                                className: "bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg ".concat(isFullyExpanded ? 'w-20 h-20 sm:w-24 sm:h-24 shadow-2xl' : isExpanded ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10 sm:w-12 sm:h-12'),
                                children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "black",
                                    className: "".concat(isFullyExpanded ? 'w-10 h-10 sm:w-12 sm:h-12' : isExpanded ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5 sm:w-6 sm:h-6'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z"
                                    }, void 0, false, {
                                        fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                        lineNumber: 197,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 190,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "black",
                                    className: "".concat(isFullyExpanded ? 'w-10 h-10 sm:w-12 sm:h-12 ml-1 sm:ml-2' : isExpanded ? 'w-6 h-6 sm:w-7 sm:h-7 ml-0.5 sm:ml-1' : 'w-5 h-5 sm:w-6 sm:h-6 ml-0.5 sm:ml-1'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M8 5v14l11-7z"
                                    }, void 0, false, {
                                        fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                        lineNumber: 207,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 200,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                                lineNumber: 176,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                    lineNumber: 113,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                ref: audioRef
            }, void 0, false, {
                fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(BottomStickyPlayer, "k5m3wzB6nSaVuniWmVU7z56Ynz4=");
_c = BottomStickyPlayer;
var _c;
__turbopack_context__.k.register(_c, "BottomStickyPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/nrg-website-dev/src/components/PlayerWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlayerWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nrg-website-dev/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$src$2f$components$2f$BottomStickyPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/nrg-website-dev/src/components/BottomStickyPlayer.tsx [app-client] (ecmascript)");
'use client';
;
;
function PlayerWrapper() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$nrg$2d$website$2d$dev$2f$src$2f$components$2f$BottomStickyPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        isVisible: true
    }, void 0, false, {
        fileName: "[project]/nrg-website-dev/src/components/PlayerWrapper.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = PlayerWrapper;
var _c;
__turbopack_context__.k.register(_c, "PlayerWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=nrg-website-dev_src_7db942f9._.js.map