/* MKR Construction : contenu généré (métiers, galerie, avant/après) et petites interactions.
   Le contenu généré est aussi écrit dans le HTML par scripts/prerender.mjs pour Google. */
const fill=(id,html)=>{const el=document.getElementById(id); if(el&&!el.children.length) el.innerHTML=html;};
const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");
const ic=k=>`<span class="ico"><svg><use href="#i-${k}"/></svg></span>`;

/* ---------- Corps d'état ---------- */
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
fill("trades-home",T.map((x,n)=>`<article class="trade reveal" style="--d:${n%4}"><img class="trade-img" src="photos/${x.p}-m.jpg" alt="${esc(x.t)} – MKR Construction, Antananarivo" loading="lazy" decoding="async">${ic(x.i)}<h3>${esc(x.t)}</h3><p>${esc(x.s)}</p></article>`).join(""));
fill("trades-detail",T.map((x,n)=>`<article class="svc"><button type="button" class="svc-ph" data-lb="s" data-i="${n}"><span class="sr-only">Agrandir la photo : </span><img src="photos/${x.p}-m.jpg" alt="${esc(x.t)} – chantier MKR Construction, Antananarivo" loading="lazy" decoding="async"></button>${ic(x.i)}<div><h3>${esc(x.t)}</h3><p class="sub">${esc(x.s)}</p><ul class="list">${x.l.map(y=>`<li>${esc(y)}</li>`).join("")}</ul></div></article>`).join(""));

/* ---------- Réalisations ---------- */
const CATS={pis:"Piscine",bat:"Bâtiment",int:"Intérieur",ext:"Extérieur"};
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
const shot=(g,i,list)=>`<button type="button" class="shot" data-lb="${list}" data-i="${i}"><img src="photos/${g.s}-m.jpg" alt="${esc(g.t)} – MKR Construction, Antananarivo" loading="lazy" decoding="async"><span class="cap">${esc(g.t)}</span></button>`;
let view=G;
fill("shots",G.map((g,i)=>shot(g,i,"g")).join(""));
const HOME=["piscine-terrasse-restaurant","bar-briques","lounge-bar","piscine-ovale-remplie","jardin-pas-japonais"].map(s=>G.find(g=>g.s===s));
fill("home-shots",HOME.map((g,i)=>shot(g,i,"h")).join(""));
PAIRS.forEach(p=>{p.a=p.a||"avant-"+p.s;p.b=p.b||"apres-"+p.s;});
const PL=[]; PAIRS.forEach(p=>{PL.push({s:p.a,t:p.t+" · pendant"});PL.push({s:p.b,t:p.t+" · après"});});
fill("pairs",PAIRS.map((p,k)=>`<article class="pair"><button type="button" class="ba" data-lb="p" data-i="${2*k}"><img src="photos/${p.a}-m.jpg" alt="${esc(p.t)}, pendant les travaux" loading="lazy" decoding="async"><span>En cours</span></button><button type="button" class="ba after" data-lb="p" data-i="${2*k+1}"><img src="photos/${p.b}-m.jpg" alt="${esc(p.t)}, travaux terminés" loading="lazy" decoding="async"><span>Réalisé</span></button><div class="txt"><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></div></article>`).join(""));

/* Tout ce qui suit ne tourne que dans le navigateur (pas pendant le pré-rendu) */
if(document.body){
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Anciens liens du site à onglets (…/#services) : redirige vers la vraie page */
const OLD={services:"services.html",realisations:"realisations.html",apropos:"a-propos.html",contact:"contact.html"};
if(OLD[location.hash.slice(1)]) location.replace(OLD[location.hash.slice(1)]);

/* En-tête : menu mobile et version compacte au défilement */
const header=document.getElementById("top"), menu=document.getElementById("menu");
menu.addEventListener("click",()=>{const o=header.classList.toggle("open");menu.setAttribute("aria-expanded",o);});
addEventListener("scroll",()=>header.classList.toggle("compact",scrollY>40),{passive:true});

/* Apparition au défilement : visible par défaut, l'animation ne se joue qu'à l'entrée à l'écran */
if(!reduce&&"IntersectionObserver" in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);} }),{rootMargin:"0px 0px -8% 0px"});
  document.querySelectorAll(".reveal").forEach(el=>{ if(el.getBoundingClientRect().top>innerHeight) io.observe(el); });
}

/* Filtres de la galerie */
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));
  const f=b.dataset.f; view=f==="all"?G:G.filter(g=>g.c===f);
  const el=document.getElementById("shots"); el.innerHTML=view.map((g,i)=>shot(g,i,"g")).join("");
  if(!reduce) [...el.children].forEach((c,i)=>c.animate([{opacity:0,transform:"translateY(14px)"},{opacity:1,transform:"none"}],{duration:450,delay:Math.min(i*40,400),easing:"cubic-bezier(.2,.7,.2,1)",fill:"backwards"}));
}));

/* ---------- Visionneuse plein écran ---------- */
const TEAM=[{s:"directeur-salle",t:"Avant la remise du chantier, tout est vérifié à fond"},{s:"equipe-pergola",t:"L'équipe à la livraison"},{s:"equipe-baie-vitree",t:"Pose d'une baie vitrée"},{s:"equipe-verriere",t:"Montage d'une verrière"}];
const SV=T.map(x=>({s:x.p,t:x.t}));
let lbList=[], lbI=0, lbEl=null, lastFocus=null;
function lbShow(){ const g=lbList[lbI], im=lbEl.querySelector("img"); im.src="photos/"+g.s+".jpg"; im.alt=g.t; lbEl.querySelector("p").textContent=g.t+"  ·  "+(lbI+1)+" / "+lbList.length; }
function lbOpen(list,i){
  lbList=list; lbI=i; lastFocus=document.activeElement;
  lbEl=document.createElement("div"); lbEl.className="lb";
  lbEl.setAttribute("role","dialog"); lbEl.setAttribute("aria-modal","true"); lbEl.setAttribute("aria-label","Photo agrandie");
  lbEl.innerHTML='<img alt=""><p></p><button type="button" class="x" aria-label="Fermer">✕</button><button type="button" class="pv" aria-label="Photo précédente">‹</button><button type="button" class="nx" aria-label="Photo suivante">›</button>';
  document.body.appendChild(lbEl); document.body.style.overflow="hidden"; lbShow();
  lbEl.querySelector(".x").onclick=lbClose;
  lbEl.querySelector(".pv").onclick=()=>{lbI=(lbI-1+lbList.length)%lbList.length;lbShow();};
  lbEl.querySelector(".nx").onclick=()=>{lbI=(lbI+1)%lbList.length;lbShow();};
  lbEl.addEventListener("click",e=>{ if(e.target===lbEl) lbClose(); });
  let x0=null; lbEl.addEventListener("touchstart",e=>{x0=e.touches[0].clientX;},{passive:true});
  lbEl.addEventListener("touchend",e=>{ if(x0===null)return; const dx=e.changedTouches[0].clientX-x0; if(Math.abs(dx)>50) lbEl.querySelector(dx<0?".nx":".pv").click(); x0=null; });
  lbEl.querySelector(".x").focus();
}
function lbClose(){ if(!lbEl)return; lbEl.remove(); lbEl=null; document.body.style.overflow=""; if(lastFocus) lastFocus.focus(); }
document.addEventListener("keydown",e=>{ if(!lbEl)return;
  if(e.key==="Escape")lbClose(); if(e.key==="ArrowRight")lbEl.querySelector(".nx").click(); if(e.key==="ArrowLeft")lbEl.querySelector(".pv").click();
  if(e.key==="Tab"){ const f=[...lbEl.querySelectorAll("button")], i=f.indexOf(document.activeElement); e.preventDefault(); f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus(); }
});
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-lb]"); if(!b) return;
  const l=b.dataset.lb; lbOpen(l==="g"?view:l==="h"?HOME:l==="t"?TEAM:l==="s"?SV:PL,+b.dataset.i);
});

/* ---------- Copie ---------- */
function copyText(text,btn,node){
  const sel=()=>{if(!node)return;const r=document.createRange();r.selectNodeContents(node);const s=getSelection();s.removeAllRanges();s.addRange(r);};
  const done=()=>{const o=btn.innerHTML;btn.textContent="Copié";setTimeout(()=>btn.innerHTML=o,1600);};
  try{navigator.clipboard.writeText(text).then(done,sel);}catch(_){sel();}
}
document.querySelectorAll("[data-copy]").forEach(b=>b.addEventListener("click",()=>{const n=document.getElementById(b.dataset.copy);copyText(n.textContent,b,n);}));
document.getElementById("share")?.addEventListener("click",e=>copyText(location.origin+"/",e.currentTarget,null));

/* ---------- Formulaire de rendez-vous ---------- */
document.getElementById("rdv")?.addEventListener("submit",e=>{
  e.preventDefault();
  const v=id=>document.getElementById(id).value.trim(), err=document.getElementById("err");
  if(!v("nom")||!v("tel")){err.hidden=false;document.getElementById(v("nom")?"tel":"nom").focus();return;}
  err.hidden=true;
  const t=`Bonjour MKR Construction,
Je souhaite prendre rendez-vous.
Nom : ${v("nom")}
Téléphone : ${v("tel")}
Projet : ${v("type")}
Lieu : ${v("lieu")||"à préciser"}
Disponibilités : ${v("dispo")||"à convenir"}
Détails : ${v("msg")||"à préciser lors du rendez-vous"}`;
  document.getElementById("out").textContent=t;
  document.getElementById("sendwa").href="https://wa.me/261341242466?text="+encodeURIComponent(t);
  document.getElementById("result").hidden=false;
  document.getElementById("result").scrollIntoView({behavior:reduce?"auto":"smooth",block:"nearest"});
});
document.getElementById("copy")?.addEventListener("click",e=>{const n=document.getElementById("out");copyText(n.textContent,e.currentTarget,n);});
}
