const u=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}};u();const a="https://raw.githubusercontent.com/OpenXcom/OpenXcom/94640aab1279ae268e0420a7b5c99cc44eb09473/bin/common/SoldierName/Danish.nam",i=document.querySelector("#app"),f=i.querySelector("#fetch"),s=i.querySelector("#result");f.addEventListener("click",()=>{fetch(a,{headers:{range:"bytes=0-128"}}).then(o=>{o.text().then(r=>{s.textContent=r})}).catch(o=>{s.textContent=`Error: ${o.message}`})});
