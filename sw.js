if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),d={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>d[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Bq1QKvi4.js",revision:null},{url:"assets/index-DhKpNmY2.js",revision:null},{url:"assets/index-zz9Y4EBs.js",revision:null},{url:"assets/settings-dialog-CfbWbvK6.js",revision:null},{url:"assets/stats-dialog-BmEI8Kf7.js",revision:null},{url:"assets/styles-CHdyCrNz.js",revision:null},{url:"index.html",revision:"b10fe420a57f224242430c8dc56c3851"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"apple-touch-icon-180x180.png",revision:"a82dd6c5c44bb628e3657d76851f7a09"},{url:"favicon.ico",revision:"fce60dfc0e4d9c3cc895c0e567f4bd02"},{url:"maskable-icon-512x512.png",revision:"9fb2836ad0a56d40307b43762ed0713f"},{url:"pwa-192x192.png",revision:"0551dcbf21965236a41130e56bf85dc8"},{url:"pwa-512x512.png",revision:"c4a40fb9efae16d17fc0a9dbd9ced24b"},{url:"pwa-64x64.png",revision:"324b01de329cbf998321f9867d642db3"},{url:"manifest.webmanifest",revision:"e7822a855ad88948426eb4cb1a141405"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));