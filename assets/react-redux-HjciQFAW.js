import{R as g,o as T}from"./react-BjsiM_7A.js";import{w as U}from"./use-sync-external-store-DlQWUlfI.js";var u="default"in g?T:g,C=Symbol.for("react-redux-context"),w=typeof globalThis<"u"?globalThis:{};function D(){if(!u.createContext)return{};const e=w[C]??(w[C]=new Map);let n=e.get(u.createContext);return n||(n=u.createContext(null),e.set(u.createContext,n)),n}var c=D(),O=()=>{throw new Error("uSES not initialized!")};function y(e=c){return function(){return u.useContext(e)}}var k=y(),E=O,P=e=>{E=e},H=(e,n)=>e===n;function V(e=c){const n=e===c?k:y(e),t=(s,r={})=>{const{equalityFn:i=H,devModeChecks:a={}}=typeof r=="function"?{equalityFn:r}:r,{store:l,subscription:f,getServerState:o,stabilityCheck:b,identityFunctionCheck:S}=n();u.useRef(!0);const v=u.useCallback({[s.name](d){return s(d)}}[s.name],[s,b,a.stabilityCheck]),p=E(f.addNestedSub,l.getState,o||l.getState,v,i);return u.useDebugValue(p),p};return Object.assign(t,{withTypes:()=>t}),t}var X=V();function N(e){e()}function z(){let e=null,n=null;return{clear(){e=null,n=null},notify(){N(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){const t=[];let s=e;for(;s;)t.push(s),s=s.next;return t},subscribe(t){let s=!0;const r=n={callback:t,next:null,prev:n};return r.prev?r.prev.next=r:e=r,function(){!s||e===null||(s=!1,r.next?r.next.prev=r.prev:n=r.prev,r.prev?r.prev.next=r.next:e=r.next)}}}}var m={notify(){},get:()=>[]};function W(e,n){let t,s=m,r=0,i=!1;function a(x){b();const M=s.subscribe(x);let h=!1;return()=>{h||(h=!0,M(),S())}}function l(){s.notify()}function f(){d.onStateChange&&d.onStateChange()}function o(){return i}function b(){r++,t||(t=e.subscribe(f),s=z())}function S(){r--,t&&r===0&&(t(),t=void 0,s.clear(),s=m)}function v(){i||(i=!0,b())}function p(){i&&(i=!1,S())}const d={addNestedSub:a,notifyNestedSubs:l,handleChangeWrapper:f,isSubscribed:o,trySubscribe:v,tryUnsubscribe:p,getListeners:()=>s};return d}var q=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",I=typeof navigator<"u"&&navigator.product==="ReactNative",K=q||I?u.useLayoutEffect:u.useEffect;function R(e,n){return e===n?e!==0||n!==0||1/e===1/n:e!==e&&n!==n}function Y(e,n){if(R(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;const t=Object.keys(e),s=Object.keys(n);if(t.length!==s.length)return!1;for(let r=0;r<t.length;r++)if(!Object.prototype.hasOwnProperty.call(n,t[r])||!R(e[t[r]],n[t[r]]))return!1;return!0}function _({store:e,context:n,children:t,serverState:s,stabilityCheck:r="once",identityFunctionCheck:i="once"}){const a=u.useMemo(()=>{const o=W(e);return{store:e,subscription:o,getServerState:s?()=>s:void 0,stabilityCheck:r,identityFunctionCheck:i}},[e,s,r,i]),l=u.useMemo(()=>e.getState(),[e]);K(()=>{const{subscription:o}=a;return o.onStateChange=o.notifyNestedSubs,o.trySubscribe(),l!==e.getState()&&o.notifyNestedSubs(),()=>{o.tryUnsubscribe(),o.onStateChange=void 0}},[a,l]);const f=n||c;return u.createElement(f.Provider,{value:a},t)}var Z=_;function L(e=c){const n=e===c?k:y(e),t=()=>{const{store:s}=n();return s};return Object.assign(t,{withTypes:()=>t}),t}var F=L();function G(e=c){const n=e===c?F:L(e),t=()=>n().dispatch;return Object.assign(t,{withTypes:()=>t}),t}var $=G(),j=N;P(U.useSyncExternalStoreWithSelector);export{Z as P,X as a,j as b,F as c,Y as s,$ as u};
