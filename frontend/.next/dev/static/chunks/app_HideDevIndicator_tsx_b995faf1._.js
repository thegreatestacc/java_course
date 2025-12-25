(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/HideDevIndicator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HideDevIndicator",
    ()=>HideDevIndicator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function HideDevIndicator() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HideDevIndicator.useEffect": ()=>{
            const hideIndicator = {
                "HideDevIndicator.useEffect.hideIndicator": ()=>{
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
                    selectors.forEach({
                        "HideDevIndicator.useEffect.hideIndicator": (selector)=>{
                            const elements = document.querySelectorAll(selector);
                            elements.forEach({
                                "HideDevIndicator.useEffect.hideIndicator": (el)=>{
                                    el.style.display = 'none';
                                    el.style.visibility = 'hidden';
                                    el.style.opacity = '0';
                                    el.style.pointerEvents = 'none';
                                }
                            }["HideDevIndicator.useEffect.hideIndicator"]);
                        }
                    }["HideDevIndicator.useEffect.hideIndicator"]);
                    // Скрытие элементов с fixed позицией внизу слева или справа
                    const allElements = document.querySelectorAll('*');
                    allElements.forEach({
                        "HideDevIndicator.useEffect.hideIndicator": (el)=>{
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
                        }
                    }["HideDevIndicator.useEffect.hideIndicator"]);
                }
            }["HideDevIndicator.useEffect.hideIndicator"];
            // Выполняем сразу
            hideIndicator();
            // Выполняем после небольшой задержки
            setTimeout(hideIndicator, 100);
            setTimeout(hideIndicator, 500);
            setTimeout(hideIndicator, 1000);
            // Наблюдаем за изменениями DOM
            const observer = new MutationObserver({
                "HideDevIndicator.useEffect": ()=>{
                    hideIndicator();
                }
            }["HideDevIndicator.useEffect"]);
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
            return ({
                "HideDevIndicator.useEffect": ()=>observer.disconnect()
            })["HideDevIndicator.useEffect"];
        }
    }["HideDevIndicator.useEffect"], []);
    return null;
}
_s(HideDevIndicator, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = HideDevIndicator;
var _c;
__turbopack_context__.k.register(_c, "HideDevIndicator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_HideDevIndicator_tsx_b995faf1._.js.map