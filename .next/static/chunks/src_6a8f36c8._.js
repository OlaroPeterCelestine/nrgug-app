(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/contexts/PlayerContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlayerProvider",
    ()=>PlayerProvider,
    "usePlayer",
    ()=>usePlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
const PlayerContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function PlayerProvider(param) {
    let { children } = param;
    _s();
    const [isPlayerVisible, setIsPlayerVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shouldStartPlaying, setShouldStartPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVideoPlayerVisible, setIsVideoPlayerVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shouldStartVideoPlaying, setShouldStartVideoPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const showPlayer = ()=>setIsPlayerVisible(true);
    const hidePlayer = ()=>setIsPlayerVisible(false);
    const minimizePlayer = ()=>setIsPlayerVisible(false);
    const startPlaying = ()=>{
        setShouldStartPlaying(true);
        setIsPlayerVisible(true);
    };
    const resetStartPlaying = ()=>setShouldStartPlaying(false);
    const showVideoPlayer = ()=>setIsVideoPlayerVisible(true);
    const hideVideoPlayer = ()=>setIsVideoPlayerVisible(false);
    const startVideoPlaying = ()=>{
        setShouldStartVideoPlaying(true);
        setIsVideoPlayerVisible(true);
    };
    const resetStartVideoPlaying = ()=>setShouldStartVideoPlaying(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlayerContext.Provider, {
        value: {
            isPlayerVisible,
            showPlayer,
            hidePlayer,
            minimizePlayer,
            startPlaying,
            shouldStartPlaying,
            resetStartPlaying,
            isVideoPlayerVisible,
            showVideoPlayer,
            hideVideoPlayer,
            startVideoPlaying,
            shouldStartVideoPlaying,
            resetStartVideoPlaying
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/PlayerContext.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(PlayerProvider, "RG6bwus7nMXul63KjVdVPq71K4g=");
_c = PlayerProvider;
function usePlayer() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(PlayerContext);
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
"[project]/src/lib/client-api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Client-side API configuration - uses direct Railway API
__turbopack_context__.s([
    "CLIENT_API_CONFIG",
    ()=>CLIENT_API_CONFIG,
    "clientFetch",
    ()=>clientFetch,
    "getClientApiUrl",
    ()=>getClientApiUrl
]);
const CLIENT_API_CONFIG = {
    BASE_URL: 'https://nrgug-api-production.up.railway.app/api',
    TIMEOUT: 10000,
    HEADERS: {
        'Content-Type': 'application/json'
    }
};
function getClientApiUrl(endpoint) {
    const baseUrl = CLIENT_API_CONFIG.BASE_URL.replace(/\/$/, '');
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : "/".concat(endpoint);
    return "".concat(baseUrl).concat(cleanEndpoint);
}
async function clientFetch(endpoint) {
    let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const url = getClientApiUrl(endpoint);
    // Add aggressive cache-busting parameter to force fresh data
    const cacheBuster = "?t=".concat(Date.now(), "&v=").concat(Math.random().toString(36).substr(2, 9));
    const finalUrl = url + cacheBuster;
    const response = await fetch(finalUrl, {
        ...options,
        headers: {
            ...CLIENT_API_CONFIG.HEADERS,
            ...options.headers,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
        }
    });
    if (!response.ok) {
        throw new Error("API request failed: ".concat(response.status, " ").concat(response.statusText));
    }
    return response;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api-utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiUtils",
    ()=>apiUtils
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$client$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/client-api.ts [app-client] (ecmascript)");
;
const apiUtils = {
    // Fetch shows
    async fetchShows () {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$client$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientFetch"])('/shows');
        return response.json();
    },
    // Fetch clients
    async fetchClients () {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$client$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientFetch"])('/clients');
        return response.json();
    },
    // Fetch news
    async fetchNews () {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$client$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientFetch"])('/news');
        return response.json();
    },
    // Fetch single news article
    async fetchNewsById (id) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$client$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientFetch"])("/news/".concat(id));
        return response.json();
    },
    // Subscribe to newsletter
    async subscribeToNewsletter (email, name) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$client$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientFetch"])('/subscribers', {
            method: 'POST',
            body: JSON.stringify({
                email,
                name
            })
        });
        return response.json();
    },
    // Submit contact form
    async submitContactForm (formData) {
        const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$client$2d$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clientFetch"])('/contact', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
        return response.json();
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BottomStickyPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BottomStickyPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function BottomStickyPlayer(param) {
    let { isVisible, shouldStartPlaying, onPlaybackStarted } = param;
    _s();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isBuffering, setIsBuffering] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFullyExpanded, setIsFullyExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shows, setShows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentShow, setCurrentShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const audioRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Fetch shows from API
    const fetchShows = async ()=>{
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUtils"].fetchShows();
            setShows(data);
        } catch (error) {
            console.error('Failed to fetch shows:', error);
        } finally{
            setLoading(false);
        }
    };
    // Get current day of week
    const getCurrentDay = ()=>{
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        return days[new Date().getDay()];
    };
    // Get current time in HH:MM format
    const getCurrentTime = ()=>{
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    // Find current show based on day and time
    const getCurrentShow = ()=>{
        if (shows.length === 0) return null;
        const currentDay = getCurrentDay();
        const currentTime = getCurrentTime();
        // Filter shows for current day and sort by start time
        const todayShows = shows.filter((show)=>show.day_of_week === currentDay).sort((a, b)=>{
            const aStartTime = a.time.split(' - ')[0];
            const bStartTime = b.time.split(' - ')[0];
            return aStartTime.localeCompare(bStartTime);
        });
        if (todayShows.length === 0) return null;
        // Find show that matches current time
        for (const show of todayShows){
            const [startTime, endTime] = show.time.split(' - ');
            if (currentTime >= startTime && currentTime <= endTime) {
                return show;
            }
        }
        // If no show matches current time, return the first show of the day (earliest)
        return todayShows[0];
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomStickyPlayer.useEffect": ()=>{
            fetchShows();
        }
    }["BottomStickyPlayer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomStickyPlayer.useEffect": ()=>{
            if (shows.length > 0) {
                const show = getCurrentShow();
                setCurrentShow(show);
            }
        }
    }["BottomStickyPlayer.useEffect"], [
        shows
    ]);
    // Update current show every minute
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomStickyPlayer.useEffect": ()=>{
            const interval = setInterval({
                "BottomStickyPlayer.useEffect.interval": ()=>{
                    if (shows.length > 0) {
                        const show = getCurrentShow();
                        setCurrentShow(show);
                    }
                }
            }["BottomStickyPlayer.useEffect.interval"], 60000) // Check every minute
            ;
            return ({
                "BottomStickyPlayer.useEffect": ()=>clearInterval(interval)
            })["BottomStickyPlayer.useEffect"];
        }
    }["BottomStickyPlayer.useEffect"], [
        shows
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomStickyPlayer.useEffect": ()=>{
            if (audioRef.current) {
                audioRef.current.src = "https://dc4.serverse.com/proxy/nrgugstream/stream";
                audioRef.current.preload = "none";
            }
        }
    }["BottomStickyPlayer.useEffect"], []);
    // Cleanup effect to handle component unmounting
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomStickyPlayer.useEffect": ()=>{
            return ({
                "BottomStickyPlayer.useEffect": ()=>{
                    if (audioRef.current) {
                        // Pause and reset audio on cleanup
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                }
            })["BottomStickyPlayer.useEffect"];
        }
    }["BottomStickyPlayer.useEffect"], []);
    // Handle start playing signal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomStickyPlayer.useEffect": ()=>{
            if (shouldStartPlaying && audioRef.current && !isPlaying) {
                const audio = audioRef.current;
                // Check if audio is still in the DOM
                if (audio.isConnected) {
                    // Play immediately
                    audio.play().then({
                        "BottomStickyPlayer.useEffect": ()=>{
                            setIsPlaying(true);
                            console.log('Audio started playing');
                            if (onPlaybackStarted) {
                                onPlaybackStarted();
                            }
                        }
                    }["BottomStickyPlayer.useEffect"]).catch({
                        "BottomStickyPlayer.useEffect": (error)=>{
                            console.error('Play failed:', error);
                            // Reset playing state on error
                            setIsPlaying(false);
                        }
                    }["BottomStickyPlayer.useEffect"]);
                } else {
                    console.warn('Audio element not connected to DOM, skipping play');
                }
            }
        }
    }["BottomStickyPlayer.useEffect"], [
        shouldStartPlaying,
        isPlaying,
        onPlaybackStarted
    ]);
    const togglePlayPause = ()=>{
        if (audioRef.current && audioRef.current.isConnected) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play().then(()=>{
                    setIsPlaying(true);
                }).catch((error)=>{
                    console.error('Play failed:', error);
                    setIsPlaying(false);
                });
            }
        } else {
            console.warn('Audio element not available or not connected to DOM');
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/10 shadow-2xl transition-all duration-500 ease-in-out ".concat(isFullyExpanded ? 'top-16 bottom-0' // Expand to nav bar (assuming nav bar is ~64px/16 units)
         : 'bottom-0'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        toggleExpanded();
                    },
                    className: "cursor-pointer hover:opacity-70 transition-opacity p-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-1 bg-white/30 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                        lineNumber: 217,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            isFullyExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        setIsExpanded(false);
                        setIsFullyExpanded(false);
                    },
                    className: "w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 24 24",
                        fill: "white",
                        className: "w-5 h-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M7 10l5 5 5-5z"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                            lineNumber: 233,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                        lineNumber: 232,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                    lineNumber: 224,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                lineNumber: 223,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "transition-all duration-500 ease-in-out ".concat(isFullyExpanded ? 'h-full flex flex-col justify-center px-6' : isExpanded ? 'h-20 sm:h-24' : 'h-16 sm:h-18'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center h-full ".concat(isFullyExpanded ? 'flex-col space-y-8' : 'px-4'),
                    onClick: handlePlayerClick,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 ".concat(isFullyExpanded ? 'mr-0' : 'mr-3 sm:mr-4'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-500 ".concat(isFullyExpanded ? 'w-48 h-48 sm:w-56 sm:h-56' : isExpanded ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-14 sm:h-14'),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: (currentShow === null || currentShow === void 0 ? void 0 : currentShow.image) || "https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg",
                                    alt: (currentShow === null || currentShow === void 0 ? void 0 : currentShow.show_name) || "NRG Live Radio",
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(isFullyExpanded ? 'text-center' : 'flex-1 min-w-0 mr-3 sm:mr-4'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "".concat(isFullyExpanded ? 'mb-4' : 'mb-1'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white font-semibold transition-all duration-500 ".concat(isFullyExpanded ? 'text-2xl sm:text-3xl mb-2' : isExpanded ? 'text-sm sm:text-base truncate' : 'text-xs sm:text-sm truncate'),
                                            children: (currentShow === null || currentShow === void 0 ? void 0 : currentShow.show_name) || 'NRG Live Radio'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                            lineNumber: 273,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 transition-all duration-500 ".concat(isFullyExpanded ? 'text-lg sm:text-xl' : isExpanded ? 'text-xs sm:text-sm truncate' : 'text-xs truncate'),
                                            children: (currentShow === null || currentShow === void 0 ? void 0 : currentShow.presenters) || 'Live from Kampala, Uganda'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                            lineNumber: 282,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 272,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center ".concat(isFullyExpanded ? 'justify-center mb-6' : 'mb-1'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative flex h-2 w-2 mr-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                                                lineNumber: 298,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "relative inline-flex rounded-full h-2 w-2 bg-green-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                                                lineNumber: 299,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                                        lineNumber: 297,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-green-400 font-medium ".concat(isFullyExpanded ? 'text-sm sm:text-base' : 'text-xs'),
                                                        children: "LIVE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                                lineNumber: 296,
                                                columnNumber: 17
                                            }, this),
                                            currentShow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-300 ".concat(isFullyExpanded ? 'text-sm sm:text-base' : 'text-xs'),
                                                children: currentShow.time
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                                lineNumber: 308,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 294,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                            lineNumber: 271,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center ".concat(isFullyExpanded ? 'mt-8' : ''),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    togglePlayPause();
                                },
                                className: "bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg ".concat(isFullyExpanded ? 'w-20 h-20 sm:w-24 sm:h-24 shadow-2xl' : isExpanded ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10 sm:w-12 sm:h-12'),
                                children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "black",
                                    className: "".concat(isFullyExpanded ? 'w-10 h-10 sm:w-12 sm:h-12' : isExpanded ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5 sm:w-6 sm:h-6'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                        lineNumber: 342,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 335,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "black",
                                    className: "".concat(isFullyExpanded ? 'w-10 h-10 sm:w-12 sm:h-12 ml-1 sm:ml-2' : isExpanded ? 'w-6 h-6 sm:w-7 sm:h-7 ml-0.5 sm:ml-1' : 'w-5 h-5 sm:w-6 sm:h-6 ml-0.5 sm:ml-1'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M8 5v14l11-7z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                        lineNumber: 352,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                    lineNumber: 345,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                                lineNumber: 321,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                            lineNumber: 319,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                    lineNumber: 247,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                ref: audioRef
            }, void 0, false, {
                fileName: "[project]/src/components/BottomStickyPlayer.tsx",
                lineNumber: 361,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BottomStickyPlayer.tsx",
        lineNumber: 201,
        columnNumber: 5
    }, this);
}
_s(BottomStickyPlayer, "mspaii5RnjmKswll0fR2ix+BPhg=");
_c = BottomStickyPlayer;
var _c;
__turbopack_context__.k.register(_c, "BottomStickyPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BottomVideoPlayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BottomVideoPlayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api-utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function BottomVideoPlayer(param) {
    let { isVisible, shouldStartPlaying, onPlaybackStarted } = param;
    _s();
    const [isPlaying, setIsPlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFullyExpanded, setIsFullyExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [shows, setShows] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentShow, setCurrentShow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Fetch shows from API
    const fetchShows = async ()=>{
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2d$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiUtils"].fetchShows();
            setShows(data);
        } catch (error) {
            console.error('Failed to fetch shows:', error);
        } finally{
            setLoading(false);
        }
    };
    // Get current day of week
    const getCurrentDay = ()=>{
        const days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ];
        return days[new Date().getDay()];
    };
    // Get current time in HH:MM format
    const getCurrentTime = ()=>{
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    // Find current show based on day and time
    const getCurrentShow = ()=>{
        if (shows.length === 0) return null;
        const currentDay = getCurrentDay();
        const currentTime = getCurrentTime();
        // Filter shows for current day
        const todayShows = shows.filter((show)=>show.day_of_week === currentDay);
        if (todayShows.length === 0) return null;
        // Find show that matches current time
        for (const show of todayShows){
            const [startTime, endTime] = show.time.split(' - ');
            if (currentTime >= startTime && currentTime <= endTime) {
                return show;
            }
        }
        // If no show matches current time, return the first show of the day
        return todayShows[0];
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomVideoPlayer.useEffect": ()=>{
            fetchShows();
        }
    }["BottomVideoPlayer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomVideoPlayer.useEffect": ()=>{
            if (shows.length > 0) {
                const show = getCurrentShow();
                setCurrentShow(show);
            }
        }
    }["BottomVideoPlayer.useEffect"], [
        shows
    ]);
    // Update current show every minute
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomVideoPlayer.useEffect": ()=>{
            const interval = setInterval({
                "BottomVideoPlayer.useEffect.interval": ()=>{
                    if (shows.length > 0) {
                        const show = getCurrentShow();
                        setCurrentShow(show);
                    }
                }
            }["BottomVideoPlayer.useEffect.interval"], 60000) // Check every minute
            ;
            return ({
                "BottomVideoPlayer.useEffect": ()=>clearInterval(interval)
            })["BottomVideoPlayer.useEffect"];
        }
    }["BottomVideoPlayer.useEffect"], [
        shows
    ]);
    // Handle start playing signal
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BottomVideoPlayer.useEffect": ()=>{
            if (shouldStartPlaying && !isPlaying) {
                setIsPlaying(true);
                console.log('Video started playing');
                if (onPlaybackStarted) {
                    onPlaybackStarted();
                }
            }
        }
    }["BottomVideoPlayer.useEffect"], [
        shouldStartPlaying,
        isPlaying,
        onPlaybackStarted
    ]);
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
    const togglePlayPause = ()=>{
        setIsPlaying(!isPlaying);
    };
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/10 shadow-2xl transition-all duration-500 ease-in-out ".concat(isFullyExpanded ? 'top-16 bottom-0' // Expand to nav bar (assuming nav bar is ~64px/16 units)
         : 'bottom-0'),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-center py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        toggleExpanded();
                    },
                    className: "cursor-pointer hover:opacity-70 transition-opacity p-1",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-1 bg-white/30 rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                    lineNumber: 153,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            isFullyExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 right-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        setIsExpanded(false);
                        setIsFullyExpanded(false);
                    },
                    className: "w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 24 24",
                        fill: "white",
                        className: "w-5 h-5",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            d: "M7 10l5 5 5-5z"
                        }, void 0, false, {
                            fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                            lineNumber: 176,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                        lineNumber: 175,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                lineNumber: 166,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "transition-all duration-500 ease-in-out ".concat(isFullyExpanded ? 'h-full flex flex-col justify-center px-6' : isExpanded ? 'h-20 sm:h-24' : 'h-16 sm:h-18'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center h-full ".concat(isFullyExpanded ? 'flex-col space-y-8' : 'px-4'),
                    onClick: handlePlayerClick,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 ".concat(isFullyExpanded ? 'mr-0' : 'mr-3 sm:mr-4'),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg transition-all duration-500 ".concat(isFullyExpanded ? 'w-48 h-48 sm:w-56 sm:h-56' : isExpanded ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-12 h-12 sm:w-14 sm:h-14'),
                                children: isFullyExpanded ? // Full video player when expanded
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
                                    ref: videoRef,
                                    src: "https://live2.tensila.com/nrg-radio-v-1.nrgug/player.html",
                                    className: "w-full h-full",
                                    frameBorder: "0",
                                    allow: "autoplay; encrypted-media; picture-in-picture",
                                    allowFullScreen: true
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                    lineNumber: 207,
                                    columnNumber: 17
                                }, this) : // Thumbnail when collapsed
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: (currentShow === null || currentShow === void 0 ? void 0 : currentShow.image) || "https://mmo.aiircdn.com/1449/67f4d50dd6ded.jpg",
                                    alt: (currentShow === null || currentShow === void 0 ? void 0 : currentShow.show_name) || "NRG Live Video",
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                    lineNumber: 217,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "".concat(isFullyExpanded ? 'text-center' : 'flex-1 min-w-0 mr-3 sm:mr-4'),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "".concat(isFullyExpanded ? 'mb-4' : 'mb-1'),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-white font-semibold transition-all duration-500 ".concat(isFullyExpanded ? 'text-2xl sm:text-3xl mb-2' : isExpanded ? 'text-sm sm:text-base truncate' : 'text-xs sm:text-sm truncate'),
                                            children: (currentShow === null || currentShow === void 0 ? void 0 : currentShow.show_name) || 'NRG Live Video'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                            lineNumber: 229,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-400 transition-all duration-500 ".concat(isFullyExpanded ? 'text-lg sm:text-xl' : isExpanded ? 'text-xs sm:text-sm truncate' : 'text-xs truncate'),
                                            children: (currentShow === null || currentShow === void 0 ? void 0 : currentShow.presenters) || 'Live from Kampala, Uganda'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                            lineNumber: 238,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center ".concat(isFullyExpanded ? 'justify-center mb-6' : 'mb-1'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative flex h-2 w-2 mr-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                                                lineNumber: 254,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "relative inline-flex rounded-full h-2 w-2 bg-red-500"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                                                lineNumber: 255,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-400 font-medium ".concat(isFullyExpanded ? 'text-sm sm:text-base' : 'text-xs'),
                                                        children: "LIVE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                                        lineNumber: 257,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                                lineNumber: 252,
                                                columnNumber: 17
                                            }, this),
                                            currentShow && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-gray-300 ".concat(isFullyExpanded ? 'text-sm sm:text-base' : 'text-xs'),
                                                children: currentShow.time
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                                lineNumber: 264,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                        lineNumber: 251,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                            lineNumber: 227,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center ".concat(isFullyExpanded ? 'mt-8' : ''),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: (e)=>{
                                    e.stopPropagation();
                                    togglePlayPause();
                                },
                                className: "bg-white rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg ".concat(isFullyExpanded ? 'w-20 h-20 sm:w-24 sm:h-24 shadow-2xl' : isExpanded ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10 sm:w-12 sm:h-12'),
                                children: isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "black",
                                    className: "".concat(isFullyExpanded ? 'w-10 h-10 sm:w-12 sm:h-12' : isExpanded ? 'w-6 h-6 sm:w-7 sm:h-7' : 'w-5 h-5 sm:w-6 sm:h-6'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M6 4h4v16H6V4zm8 0h4v16h-4V4z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                        lineNumber: 298,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                    lineNumber: 291,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    viewBox: "0 0 24 24",
                                    fill: "black",
                                    className: "".concat(isFullyExpanded ? 'w-10 h-10 sm:w-12 sm:h-12 ml-1 sm:ml-2' : isExpanded ? 'w-6 h-6 sm:w-7 sm:h-7 ml-0.5 sm:ml-1' : 'w-5 h-5 sm:w-6 sm:h-6 ml-0.5 sm:ml-1'),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M8 5v14l11-7z"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                        lineNumber: 308,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                    lineNumber: 301,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                            lineNumber: 275,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BottomVideoPlayer.tsx",
                lineNumber: 183,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BottomVideoPlayer.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s(BottomVideoPlayer, "YxAcx8h5mUcaLiMQ1s/ZVCxW3mQ=");
_c = BottomVideoPlayer;
var _c;
__turbopack_context__.k.register(_c, "BottomVideoPlayer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PlayerWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PlayerWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/PlayerContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BottomStickyPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BottomStickyPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BottomVideoPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BottomVideoPlayer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function PlayerWrapper() {
    _s();
    const { isPlayerVisible, shouldStartPlaying, resetStartPlaying, isVideoPlayerVisible, shouldStartVideoPlaying, resetStartVideoPlaying } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayer"])();
    const handlePlaybackStarted = ()=>{
        resetStartPlaying();
    };
    const handleVideoPlaybackStarted = ()=>{
        resetStartVideoPlaying();
    };
    // Manage body class for sticky players
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PlayerWrapper.useEffect": ()=>{
            const hasStickyPlayers = isPlayerVisible || isVideoPlayerVisible;
            if (hasStickyPlayers) {
                document.body.classList.add('has-sticky-players');
            } else {
                document.body.classList.remove('has-sticky-players');
            }
            // Cleanup on unmount
            return ({
                "PlayerWrapper.useEffect": ()=>{
                    document.body.classList.remove('has-sticky-players');
                }
            })["PlayerWrapper.useEffect"];
        }
    }["PlayerWrapper.useEffect"], [
        isPlayerVisible,
        isVideoPlayerVisible
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BottomStickyPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isVisible: isPlayerVisible,
                shouldStartPlaying: shouldStartPlaying,
                onPlaybackStarted: handlePlaybackStarted
            }, void 0, false, {
                fileName: "[project]/src/components/PlayerWrapper.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BottomVideoPlayer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                isVisible: isVideoPlayerVisible,
                shouldStartPlaying: shouldStartVideoPlaying,
                onPlaybackStarted: handleVideoPlaybackStarted
            }, void 0, false, {
                fileName: "[project]/src/components/PlayerWrapper.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(PlayerWrapper, "NwJY3YrKZYJ2sXc77cD3HMrvV/A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$PlayerContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePlayer"]
    ];
});
_c = PlayerWrapper;
var _c;
__turbopack_context__.k.register(_c, "PlayerWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/WhatsAppButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WhatsAppButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function WhatsAppButton() {
    _s();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const inquiryOptions = [
        {
            id: 'general',
            title: 'General Inquiry',
            message: 'Hello! I have a general question about NRG Radio.'
        },
        {
            id: 'partnership',
            title: 'Partnership',
            message: 'Hello! I\'m interested in partnering with NRG Radio.'
        },
        {
            id: 'advertising',
            title: 'Advertising',
            message: 'Hello! I\'d like to know about advertising opportunities with NRG Radio.'
        },
        {
            id: 'events',
            title: 'Events',
            message: 'Hello! I\'m interested in NRG Radio events and shows.'
        },
        {
            id: 'support',
            title: 'Technical Support',
            message: 'Hello! I need technical support with NRG Radio services.'
        },
        {
            id: 'feedback',
            title: 'Feedback',
            message: 'Hello! I\'d like to share feedback about NRG Radio.'
        }
    ];
    const handleInquiryClick = (inquiry)=>{
        const phoneNumber = '256740674674' // NRG Radio WhatsApp number
        ;
        const whatsappUrl = "https://wa.me/".concat(phoneNumber, "?text=").concat(encodeURIComponent(inquiry.message));
        window.open(whatsappUrl, '_blank');
        setIsMenuOpen(false);
    };
    const handleButtonClick = ()=>{
        setIsMenuOpen(!isMenuOpen);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed bottom-24 right-8 z-[100]",
        children: [
            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-20 right-0 bg-black rounded-2xl shadow-2xl border border-gray-700 w-64 max-h-80 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-semibold text-white mb-3 text-center",
                            children: "How can we help you?"
                        }, void 0, false, {
                            fileName: "[project]/src/components/WhatsAppButton.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: inquiryOptions.map((inquiry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>handleInquiryClick(inquiry),
                                    className: "w-full text-left p-3 rounded-xl hover:bg-gray-800 hover:text-green-400 transition-colors duration-200 border border-transparent hover:border-gray-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center space-x-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-2 h-2 bg-green-500 rounded-full"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/WhatsAppButton.tsx",
                                                lineNumber: 68,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-medium text-white",
                                                children: inquiry.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/WhatsAppButton.tsx",
                                                lineNumber: 69,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/WhatsAppButton.tsx",
                                        lineNumber: 67,
                                        columnNumber: 19
                                    }, this)
                                }, inquiry.id, false, {
                                    fileName: "[project]/src/components/WhatsAppButton.tsx",
                                    lineNumber: 62,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/components/WhatsAppButton.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/WhatsAppButton.tsx",
                    lineNumber: 58,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/WhatsAppButton.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleButtonClick,
                onMouseEnter: ()=>setIsHovered(true),
                onMouseLeave: ()=>setIsHovered(false),
                className: "bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 group border-2 border-white ".concat(isMenuOpen ? 'ring-4 ring-green-200' : ''),
                title: "Select inquiry type",
                children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhatsAppButton.tsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/WhatsAppButton.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-8 h-8",
                    fill: "currentColor",
                    viewBox: "0 0 24 24",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhatsAppButton.tsx",
                        lineNumber: 99,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/WhatsAppButton.tsx",
                    lineNumber: 93,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/WhatsAppButton.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this),
            isHovered && !isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-20 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 text-sm px-4 py-3 rounded-2xl whitespace-nowrap shadow-xl border border-gray-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 bg-green-500 rounded-full animate-pulse"
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhatsAppButton.tsx",
                                lineNumber: 108,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: "Select inquiry type"
                            }, void 0, false, {
                                fileName: "[project]/src/components/WhatsAppButton.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/WhatsAppButton.tsx",
                        lineNumber: 107,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-white border-t-4 border-t-transparent border-b-4 border-b-transparent"
                    }, void 0, false, {
                        fileName: "[project]/src/components/WhatsAppButton.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/WhatsAppButton.tsx",
                lineNumber: 106,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/WhatsAppButton.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(WhatsAppButton, "iAM9bIthMdlsVlFtpROaxxDvjKk=");
_c = WhatsAppButton;
var _c;
__turbopack_context__.k.register(_c, "WhatsAppButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ConditionalComponents.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConditionalComponents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PlayerWrapper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WhatsAppButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/WhatsAppButton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ConditionalComponents() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    // Hide PlayerWrapper and WhatsAppButton on video page
    if (pathname === '/video') {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PlayerWrapper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/ConditionalComponents.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$WhatsAppButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/components/ConditionalComponents.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ConditionalComponents, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ConditionalComponents;
var _c;
__turbopack_context__.k.register(_c, "ConditionalComponents");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_6a8f36c8._.js.map