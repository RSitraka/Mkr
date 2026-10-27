/* Remplit un conteneur seulement s'il existe sur la page et est encore vide (le HTML est pré-rendu pour Google) */
const fill=(id,html)=>{const el=document.getElementById(id); if(el&&!el.children.length) el.innerHTML=html;};

/* Défilant */
const metiers=["Piscines","Bâtiment","Électricité","Plomberie","Carrelage","Pavés autobloquants","Toiture","Peinture","Aménagements extérieurs"];
/* Un métier sur deux en lettres pleines, l'autre en contour ; le sens reste lisible au raccord de la boucle */
const tick=metiers.map((m,i)=>`<span class="inline-flex items-center gap-7 px-3.5 font-display font-extrabold text-[1.3rem] sm:text-[1.55rem] leading-none tracking-[-.01em] [font-stretch:118%] ${i%2?"text-[#eafaf8] [-webkit-text-stroke:2.2px_var(--color-ink)] [paint-order:stroke_fill]":""}">${m}<span class="text-[.75rem] text-ink/40 [-webkit-text-stroke:0]">✦</span></span>`).join("");
fill("tick",tick+tick);

/* Corps d'état */
const T=[
 {i:"bat",p:"apres-immeuble",t:"Bâtiment & gros œuvre",s:"Maisons, villas, immeubles",l:["Maisons et villas","Extensions","Murs et clôtures","Rénovation"]},
 {i:"elec",p:"restaurant-amenage",t:"Électricité",s:"Installation et mise aux normes",l:["Installation neuve","Mise aux normes","Éclairage intérieur et extérieur"]},
 {i:"plo",p:"reseau-eau",t:"Plomberie & sanitaires",s:"Installation et dépannage",l:["Installation neuve","Salles de bain et cuisines","Dépannage"]},
 {i:"car",p:"toit-terrasse-verriere",t:"Carrelage",s:"Intérieur et extérieur",l:["Intérieur","Extérieur","Abords de piscine"]},
 {i:"pav",p:"allee-chevrons",t:"Pavés autobloquants",s:"Cours, allées, parkings",l:["Cours et allées","Parkings","Abords de piscine"]},
 {i:"eta",p:"apres-terrasse",t:"Toiture & terrasses",s:"Toits et terrasses",l:["Toitures","Terrasses","Infiltrations"]},
 {i:"pei",p:"restaurant-rapide",t:"Peinture & finitions",s:"Pour un rendu soigné",l:["Intérieur","Façades","Finitions"]},
 {i:"ext",p:"pergola-vegetale",t:"Aménagements extérieurs",s:"Autour de la maison",l:["Portails et clôtures","Jardins et terrasses","Pergolas"]}
];
fill("trades-home",T.map((x,n)=>`<article class="reveal group card overflow-hidden flex flex-col gap-2.5 pb-3.5 sm:pb-5 transition duration-200 hover:-translate-y-[3px] hover:border-aqua hover:shadow-lift" style="--d:${n%4}"><img class="w-full aspect-4/3 sm:aspect-16/10 object-cover -mb-[19px] sm:-mb-[23px] transition-transform duration-500 group-hover:scale-[1.04]" src="photos/${x.p}-m.jpg" alt="${x.t} – MKR Construction, Antananarivo" loading="lazy"><span class="ico relative mx-3 sm:mx-5 size-[38px] sm:size-[46px] border-3 border-white group-hover:bg-aqua group-hover:text-white"><svg><use href="#i-${x.i}"/></svg></span><h3 class="mx-3 sm:mx-5 text-[.98rem] sm:text-[1.18rem]">${x.t}</h3><p class="hidden sm:block mx-5 text-muted text-[.95rem]">${x.s}</p></article>`).join(""));
fill("trades-detail",T.map(x=>`<article class="card p-6 grid grid-cols-[46px_1fr] gap-4 *:min-w-0"><img class="col-span-full w-full aspect-21/9 object-cover rounded-xl" src="photos/${x.p}-m.jpg" alt="${x.t} – MKR Construction" loading="lazy"><span class="ico size-[46px]"><svg><use href="#i-${x.i}"/></svg></span><div><h3 class="text-[1.25rem]">${x.t}</h3><p class="text-muted text-[.95rem] mt-0.5 mb-2">${x.s}</p><ul class="list-disc pl-[1.1em] text-muted space-y-[3px]">${x.l.map(y=>`<li>${y}</li>`).join("")}</ul></div></article>`).join(""));

/* En-tête : menu mobile et barre compacte au défilement */
const header=document.getElementById("top"), menu=document.getElementById("menu");
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
menu.addEventListener("click",()=>{const o=header.classList.toggle("open");menu.setAttribute("aria-expanded",o);});
addEventListener("scroll",()=>header.classList.toggle("compact",scrollY>40),{passive:true});

/* Apparition au défilement : le contenu est visible par défaut, l'animation ne se joue qu'à l'entrée à l'écran */
function observe(){
  if(reduce||!("IntersectionObserver" in window)) return;
  /* Pages sans repères posés à la main : titres de section et cartes apparaissent aussi */
  document.querySelectorAll("main section .wrap > *, #trades-detail > *, #pairs > *, main .card").forEach(el=>{
    if(el.closest(".reveal")||el.querySelector(".reveal,.card")) return;
    el.classList.add("reveal"); el.style.setProperty("--d",[...el.parentElement.children].indexOf(el)%4);
  });
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting && e.boundingClientRect.top>0){e.target.classList.add("in");io.unobserve(e.target);} }),{rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".reveal:not(.in)").forEach(el=>{ if(el.getBoundingClientRect().top>innerHeight) io.observe(el); });
}

/* Réalisations */
const G=[
{s:"piscine-campagne",c:"pis",t:"Piscine avec vue"},
{s:"piscine-rectangulaire",c:"pis",t:"Grande piscine"},
{s:"piscine-ovale-remplie",c:"pis",t:"Piscine rénovée"},
{s:"piscine-terrasse-restaurant",c:"pis",t:"Piscine et terrasse de restaurant"},
{s:"piscine-nuit",c:"pis",t:"Piscine de nuit"},
{s:"piscine-terrasse-bois",c:"pis",t:"Piscine et sa terrasse"},
{s:"piscine-ovale-villa",c:"pis",t:"Piscine de villa"},
{s:"piscine-renovation",c:"pis",t:"Remise à neuf d'une piscine"},
{s:"kiosque-burger",c:"bat",t:"Conteneur transformé en kiosque"},
{s:"villa-contemporaine",c:"bat",t:"Villa et ses extérieurs"},
{s:"immeuble-renove",c:"bat",t:"Rénovation d'un immeuble"},
{s:"toit-terrasse-verriere",c:"bat",t:"Toit-terrasse et verrière"},
{s:"verriere-interieur",c:"bat",t:"Verrière"},
{s:"escalier-helicoidal",c:"bat",t:"Escalier extérieur"},
{s:"bar-briques",c:"int",t:"Aménagement d'un bar"},
{s:"restaurant-amenage",c:"int",t:"Salle de restaurant"},
{s:"restaurant-rapide",c:"int",t:"Aménagement d'un restaurant rapide"},
{s:"lounge-bar",c:"int",t:"Espace lounge"},
{s:"terrasse-couverte",c:"int",t:"Terrasse couverte"},
{s:"salle-de-sport",c:"int",t:"Aménagement d'une salle de sport"},
{s:"allee-chevrons",c:"ext",t:"Allée en pavés"},
{s:"cour-paves",c:"ext",t:"Cour pavée"},
{s:"jardin-pas-japonais",c:"ext",t:"Aménagement de jardin"},
{s:"pergola-vegetale",c:"ext",t:"Pergola de jardin"},
{s:"acces-pave-porche",c:"ext",t:"Accès pavé"},
{s:"barbecue-maconne",c:"ext",t:"Barbecue extérieur"},
{s:"reseau-eau",c:"bat",t:"Installation d'eau"}
];
const PAIRS=[
{s:"piscine",a:"piscine-ovale-vide",b:"piscine-ovale-remplie",t:"Rénovation d'une piscine",d:"La même piscine, juste après nos travaux puis remplie."},
{s:"conteneur",a:"conteneur-avant",b:"kiosque-burger",t:"Un conteneur devenu kiosque",d:"Un simple conteneur, transformé en point de vente prêt à ouvrir."},
{s:"verriere",a:"verriere-structure",b:"verriere-interieur",t:"Création d'une verrière",d:"La structure posée sur le toit, puis la verrière vue de l'intérieur."},
{s:"immeuble",t:"Rénovation complète d'un immeuble",d:"Le même bâtiment, pendant puis après nos travaux."},
{s:"terrasse",t:"Rénovation d'un toit-terrasse",d:"La même terrasse, pendant puis après nos travaux."},
{s:"allees",t:"Création d'allées de jardin",d:"Le même jardin, pendant puis après nos travaux."}
];
const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");
const shot=(g,i,list,cls)=>`<button type="button" class="group relative block w-full rounded-[14px] overflow-hidden bg-line cursor-zoom-in ${cls}" data-lb="${list}" data-i="${i}"><img class="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" src="photos/${g.s}-m.jpg" alt="${esc(g.t)} – MKR Construction, Antananarivo" loading="lazy"><span class="absolute inset-x-0 bottom-0 pt-[22px] px-2.5 pb-[9px] text-[.8rem] sm:pt-7 sm:px-3.5 sm:pb-3 sm:text-[.92rem] bg-linear-to-b from-transparent to-ink/82 text-white font-semibold leading-[1.3] text-left">${esc(g.t)}</span></button>`;
let view=G;
function renderShots(f){
  view=f==="all"?G:G.filter(g=>g.c===f); const el=document.getElementById("shots");
  el.innerHTML=view.map((g,i)=>shot(g,i,"g","break-inside-avoid mb-2 sm:mb-3 [&_img]:h-auto")).join("");
  if(!reduce&&el.animate) [...el.children].forEach((c,i)=>c.animate([{opacity:0,transform:"translateY(16px) scale(.97)"},{opacity:1,transform:"none"}],{duration:520,delay:Math.min(i*45,450),easing:"cubic-bezier(.2,.7,.2,1)",fill:"backwards"}));
}
if(document.getElementById("shots")?.children.length===0) renderShots("all");
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===b)); renderShots(b.dataset.f);
  const pr=document.getElementById("p-realisations"); if(b.dataset.f==="all") pr.removeAttribute("data-amb"); else pr.dataset.amb=b.dataset.f;
}));
const HOME=["piscine-terrasse-restaurant","bar-briques","lounge-bar","villa-contemporaine","jardin-pas-japonais"].map(s=>G.find(g=>g.s===s));
fill("home-shots",HOME.map((g,i)=>shot(g,i,"h",i===0?"col-span-2 aspect-4/3 md:col-span-1 md:row-span-2 md:aspect-auto":"aspect-4/3 md:aspect-auto")).join(""));
PAIRS.forEach(p=>{p.a=p.a||"avant-"+p.s;p.b=p.b||"apres-"+p.s;});
const PL=[]; PAIRS.forEach(p=>{PL.push({s:p.a,t:p.t+" · pendant"});PL.push({s:p.b,t:p.t+" · après"});});
const ba=(src,alt,i)=>`<button type="button" class="relative block w-full rounded-xl overflow-hidden aspect-4/3 cursor-zoom-in bg-line" data-lb="p" data-i="${i}"><img class="w-full h-full object-cover" src="photos/${src}-m.jpg" alt="${alt}" loading="lazy"></button>`;
fill("pairs",PAIRS.map((p,k)=>`<article class="card rounded-[20px] p-3 sm:p-4 grid grid-cols-2 gap-2 sm:gap-3 *:min-w-0">${ba(p.a,esc(p.t)+", pendant les travaux",2*k)}${ba(p.b,esc(p.t)+", travaux terminés",2*k+1)}<div class="col-span-full px-1.5 pt-1 pb-0.5"><h3>${esc(p.t)}</h3><p class="text-muted text-[.96rem] mt-1">${esc(p.d)}</p></div></article>`).join(""));

/* Visionneuse */
let lbList=[], lbI=0, lbEl=null, lastFocus=null;
function lbShow(dir=0){ const g=lbList[lbI], im=lbEl.querySelector("img"); im.src="photos/"+g.s+".jpg"; im.alt=g.t;
  if(!reduce&&im.animate) im.animate([{opacity:0,transform:dir?`translateX(${dir*40}px)`:"scale(.94)"},{opacity:1,transform:"none"}],{duration:380,easing:"cubic-bezier(.2,.7,.2,1)"}); lbEl.querySelector("p").textContent=g.t+"  ·  "+(lbI+1)+" / "+lbList.length; }
function lbOpen(list,i){
  lbList=list; lbI=i; lastFocus=document.activeElement;
  lbEl=document.createElement("div");
  lbEl.className="lb fixed inset-0 z-60 bg-[rgb(6_14_16/.94)] flex flex-col items-center justify-center px-4 pt-[calc(56px+env(safe-area-inset-top,0px))] pb-[calc(70px+env(safe-area-inset-bottom,0px))] [&>button]:absolute [&>button]:bg-white/12 [&>button]:text-white [&>button]:rounded-full [&>button]:size-[46px] [&>button]:text-[1.4rem] [&>button]:font-semibold [&>button]:grid [&>button]:place-items-center [&>button]:cursor-pointer";
  lbEl.setAttribute("role","dialog"); lbEl.setAttribute("aria-modal","true"); lbEl.setAttribute("aria-label","Photo agrandie");
  lbEl.innerHTML='<img alt="" class="max-w-full max-h-full object-contain rounded-lg"><p class="text-white mt-3 text-center font-semibold"></p><button type="button" class="x top-[calc(12px+env(safe-area-inset-top,0px))] right-4" aria-label="Fermer">✕</button><button type="button" class="pv left-4 bottom-[calc(14px+env(safe-area-inset-bottom,0px))] md:bottom-auto md:top-1/2" aria-label="Photo précédente">‹</button><button type="button" class="nx right-4 bottom-[calc(14px+env(safe-area-inset-bottom,0px))] md:bottom-auto md:top-1/2" aria-label="Photo suivante">›</button>';
  document.body.appendChild(lbEl); document.body.style.overflow="hidden"; lbShow();
  lbEl.querySelector(".x").onclick=lbClose;
  lbEl.querySelector(".pv").onclick=()=>{lbI=(lbI-1+lbList.length)%lbList.length;lbShow(-1);};
  lbEl.querySelector(".nx").onclick=()=>{lbI=(lbI+1)%lbList.length;lbShow(1);};
  lbEl.addEventListener("click",e=>{ if(e.target===lbEl) lbClose(); });
  let x0=null; lbEl.addEventListener("touchstart",e=>{x0=e.touches[0].clientX;},{passive:true});
  lbEl.addEventListener("touchend",e=>{ if(x0===null)return; const dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>50) lbEl.querySelector(dx<0?".nx":".pv").click(); x0=null; });
  lbEl.querySelector(".x").focus();
}
function lbClose(){ if(!lbEl)return; lbEl.remove(); lbEl=null; document.body.style.overflow=""; if(lastFocus) lastFocus.focus(); }
document.addEventListener("keydown",e=>{ if(!lbEl)return; if(e.key==="Escape")lbClose(); if(e.key==="ArrowRight")lbEl.querySelector(".nx").click(); if(e.key==="ArrowLeft")lbEl.querySelector(".pv").click(); });
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-lb]"); if(!b) return;
  const l=b.dataset.lb, i=+b.dataset.i;
  const TEAM=[{s:"directeur-salle",t:"Avant la remise du chantier, tout est vérifié à fond"},{s:"equipe-pergola",t:"L'équipe à la livraison"},{s:"equipe-baie-vitree",t:"Pose d'une baie vitrée"},{s:"equipe-verriere",t:"Montage d'une verrière"}];
  lbOpen(l==="g"?view:l==="h"?HOME:l==="t"?TEAM:PL,i);
});

/* Copie */
function copyText(text,btn,node){
  const sel=()=>{if(!node)return;const r=document.createRange();r.selectNodeContents(node);const s=getSelection();s.removeAllRanges();s.addRange(r);};
  const done=()=>{const o=btn.innerHTML;btn.textContent="Copié";setTimeout(()=>btn.innerHTML=o,1600);};
  try{navigator.clipboard.writeText(text).then(done,sel);}catch(_){sel();}
}
document.querySelectorAll("[data-copy]").forEach(b=>b.addEventListener("click",()=>{const n=document.getElementById(b.dataset.copy);copyText(n.textContent,b,n);}));
document.getElementById("share")?.addEventListener("click",e=>copyText(location.href.split("#")[0],e.currentTarget,null));

/* Carrousel des types de projet : choisir un type fait basculer l'ambiance (piscine ou bâtiment) */
const TYPES=[
 ["Piscine (création)","piscine-campagne","pis"],["Piscine (rénovation ou entretien)","piscine-renovation","reno"],
 ["Construction de bâtiment","villa-contemporaine","bat"],["Électricité","restaurant-amenage","elec"],["Plomberie","reseau-eau","plo"],
 ["Carrelage","toit-terrasse-verriere","car"],["Pavés autobloquants","allee-chevrons","pav"],["Toiture ou terrasse","apres-terrasse","eta"],
 ["Peinture et finitions","restaurant-rapide","pei"],["Aménagements extérieurs","pergola-vegetale","ext"],["Plusieurs travaux","immeuble-renove","new"]
];
fill("types",TYPES.map(([t,p,i],n)=>`<label class="tcard group relative snap-start shrink-0 w-[150px] sm:w-[172px] rounded-2xl overflow-hidden bg-white cursor-pointer gap-0! outline-2 outline-offset-2 outline-transparent has-checked:outline-aqua has-focus-visible:outline-copper"><input class="sr-only" type="radio" name="type" value="${t}"${n?"":" checked"}><img class="w-full aspect-4/3 object-cover transition-transform duration-500 group-hover:scale-105 group-has-checked:scale-105" src="photos/${p}-m.jpg" alt="" loading="lazy"><span class="flex items-center gap-2 p-2.5 pr-3 text-[.86rem] leading-tight font-semibold"><span class="ico size-8 rounded-lg group-has-checked:bg-aqua group-has-checked:text-white [&_svg]:size-[18px]"><svg><use href="#i-${i}"/></svg></span>${t}</span><span class="absolute top-2 right-2 size-6 grid place-items-center rounded-full bg-aqua text-white scale-0 transition-transform duration-300 group-has-checked:scale-100" aria-hidden="true"><svg class="size-3.5"><use href="#i-check"/></svg></span></label>`).join(""));
const types=document.getElementById("types");
if(types){
  const prev=document.getElementById("types-prev"), next=document.getElementById("types-next"), page=document.getElementById("p-contact");
  const ends=()=>{ prev.disabled=types.scrollLeft<4; next.disabled=types.scrollLeft+types.clientWidth>types.scrollWidth-4; };
  prev.addEventListener("click",()=>types.scrollBy({left:-types.clientWidth*.8}));
  next.addEventListener("click",()=>types.scrollBy({left:types.clientWidth*.8}));
  types.addEventListener("scroll",ends,{passive:true}); addEventListener("resize",ends); ends();
  types.addEventListener("change",e=>{
    const pool=e.target.value.startsWith("Piscine");
    page.classList.toggle("t-pool",pool); page.classList.toggle("t-bat",!pool);
    e.target.closest("label").scrollIntoView({behavior:reduce?"auto":"smooth",block:"nearest",inline:"nearest"});
  });
}

/* Formulaire de rendez-vous */
document.getElementById("rdv")?.addEventListener("submit",e=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value.trim(), err=document.getElementById("err");
  if(!v("nom")||!v("tel")){err.hidden=false;document.getElementById(v("nom")?"tel":"nom").focus();return;}
  err.hidden=true;
  const t=`Bonjour MKR Construction,
Je souhaite prendre rendez-vous.
Nom : ${v("nom")}
Téléphone : ${v("tel")}
Projet : ${document.querySelector("[name=type]:checked")?.value||"à préciser"}
Lieu : ${v("lieu")||"à préciser"}
Disponibilités : ${v("dispo")||"à convenir"}
Détails : ${v("msg")||"à préciser lors du rendez-vous"}`;
  document.getElementById("out").textContent=t;
  document.getElementById("sendwa").href="https://wa.me/261341242466?text="+encodeURIComponent(t);
  document.getElementById("result").hidden=false;
});
document.getElementById("copy")?.addEventListener("click",e=>{const n=document.getElementById("out");copyText(n.textContent,e.currentTarget,n);});
observe();

/* Onde au clic sur les boutons */
if(!reduce) document.addEventListener("pointerdown",e=>{
  const b=e.target.closest(".btn,.btn-sm"); if(!b) return;
  const r=b.getBoundingClientRect(), s=document.createElement("span");
  s.className="ripple"; s.style.cssText=`left:${e.clientX-r.left}px;top:${e.clientY-r.top}px;--s:${Math.hypot(r.width,r.height)*2}px`;
  b.appendChild(s); s.addEventListener("animationend",()=>s.remove());
});

/* Reflet qui suit le pointeur sur les cartes, inclinaison 3D et ombre qui glisse à l'opposé */
const FLOAT=".card,#home-shots > button,#shots > button,.hero aside,.tcard";
if(!reduce&&matchMedia("(hover: hover) and (pointer: fine)").matches){
  document.addEventListener("pointermove",e=>{
    const t=e.target.closest?.(FLOAT); if(!t) return;
    const r=t.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5, f=Math.min(1,380/r.width);
    t.style.setProperty("--mx",e.clientX-r.left+"px"); t.style.setProperty("--my",e.clientY-r.top+"px");
    t.style.setProperty("--rx",(-y*5*f).toFixed(2)+"deg"); t.style.setProperty("--ry",(x*6*f).toFixed(2)+"deg");
    t.style.setProperty("--sx",(-x*16).toFixed(1)+"px"); t.style.setProperty("--sy",(-y*10).toFixed(1)+"px");
  },{passive:true});
  document.addEventListener("pointerout",e=>{
    const t=e.target.closest?.(FLOAT); if(t&&!t.contains(e.relatedTarget)) ["--rx","--ry","--sx","--sy"].forEach(p=>t.style.removeProperty(p));
  });
}

/* Anciens liens du site à onglets (…/#services) : redirige vers la vraie page */
const OLD={services:"services.html",realisations:"realisations.html",apropos:"a-propos.html",contact:"contact.html"};
if(OLD[location.hash.slice(1)]) location.replace(OLD[location.hash.slice(1)]);
