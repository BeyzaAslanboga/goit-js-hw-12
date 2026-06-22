/* empty css                      */import{a as h,S as g,i}from"./assets/vendor-BtI-3F0k.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))d(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&d(a)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();const y="56332254-8c399c713ebd1cc160f0b6b1c";async function b(e,t=1){return(await h.get("https://pixabay.com/api/",{params:{key:y,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40}})).data}function L(e){return e.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}">
          <img
            src="${t.webformatURL}"
            alt="${t.tags}"
          />
        </a>

        <div class="info">
          <p><b>Likes</b><br>${t.likes}</p>
          <p><b>Views</b><br>${t.views}</p>
          <p><b>Comments</b><br>${t.comments}</p>
          <p><b>Downloads</b><br>${t.downloads}</p>
        </div>
      </li>
    `).join("")}const w=document.querySelector(".search-form"),p=document.querySelector(".gallery"),u=document.querySelector(".loader"),s=document.querySelector(".load-more");let n=1,c="",f=0;const v=40,S=new g(".gallery a",{captionsData:"alt",captionDelay:250});w.addEventListener("submit",async e=>{e.preventDefault(),c=e.currentTarget.elements.search.value.trim(),c&&(n=1,p.innerHTML="",s.classList.add("hidden"),await m())});s.addEventListener("click",async()=>{n+=1,await m(),I()});async function m(){try{u.classList.remove("hidden");const e=await b(c,n);if(f=e.totalHits,e.hits.length===0){i.error({message:"Sorry, there are no images matching your search query.",position:"topRight"});return}p.insertAdjacentHTML("beforeend",L(e.hits)),S.refresh(),q()}catch(e){i.error({message:"Something went wrong. Please try again.",position:"topRight"}),console.error(e)}finally{u.classList.add("hidden")}}function q(){if(n*v>=f){s.classList.add("hidden"),i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"});return}s.classList.remove("hidden")}function I(){const e=document.querySelector(".gallery-item");if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
