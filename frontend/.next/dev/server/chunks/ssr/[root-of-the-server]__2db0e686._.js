module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/app/HideDevIndicator.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HideDevIndicator",
    ()=>HideDevIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function HideDevIndicator() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const hideIndicator = ()=>{
            // Скрытие всех возможных вариантов индикатора
            const selectors = [
                '.devtools-indicator',
                '[class*="devtools-indicator"]',
                '[class*="devtools"]',
                'button[aria-label*="Next"]',
                'a[aria-label*="Next"]',
                'div[aria-label*="Next"]',
                'button[title*="Next"]',
                'a[title*="Next"]'
            ];
            selectors.forEach((selector)=>{
                const elements = document.querySelectorAll(selector);
                elements.forEach((el)=>{
                    el.style.display = 'none';
                    el.style.visibility = 'hidden';
                    el.style.opacity = '0';
                    el.style.pointerEvents = 'none';
                });
            });
            // Скрытие элементов с fixed позицией внизу слева или справа
            const allElements = document.querySelectorAll('*');
            allElements.forEach((el)=>{
                const htmlEl = el;
                const style = window.getComputedStyle(htmlEl);
                const rect = htmlEl.getBoundingClientRect();
                const text = htmlEl.textContent?.trim() || '';
                // Проверяем, находится ли элемент внизу (слева или справа) и содержит N или Next
                if (style.position === 'fixed' && rect.bottom < 100 && (rect.left < 100 || rect.right < 100) && (text === 'N' || text.includes('Next') || htmlEl.querySelector('svg') || htmlEl.getAttribute('aria-label')?.toLowerCase().includes('next') || htmlEl.getAttribute('title')?.toLowerCase().includes('next') || htmlEl.className?.toLowerCase().includes('dev') || htmlEl.id?.toLowerCase().includes('dev'))) {
                    htmlEl.style.display = 'none';
                    htmlEl.style.visibility = 'hidden';
                    htmlEl.style.opacity = '0';
                    htmlEl.style.pointerEvents = 'none';
                    htmlEl.remove(); // Полностью удаляем элемент из DOM
                }
            });
        };
        // Выполняем сразу
        hideIndicator();
        // Выполняем после небольшой задержки
        setTimeout(hideIndicator, 100);
        setTimeout(hideIndicator, 500);
        setTimeout(hideIndicator, 1000);
        // Наблюдаем за изменениями DOM
        const observer = new MutationObserver(()=>{
            hideIndicator();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: [
                'class',
                'style',
                'aria-label'
            ]
        });
        return ()=>observer.disconnect();
    }, []);
    return null;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__2db0e686._.js.map