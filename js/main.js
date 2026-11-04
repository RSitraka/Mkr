/* Remplit un conteneur seulement s'il existe sur la page et est encore vide (le HTML est pré-rendu pour Google) */
const fill=(id,html)=>{const el=document.getElementById(id); if(el&&!el.children.length) el.innerHTML=html;};
const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");

/* ---------- Atelier (Services) : fiches accrochées au panneau à outils ---------- */
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
fill("trades-detail",T.map((x,n)=>`<article class="fiche"><button type="button" class="fiche-photo" data-lb="s" data-i="${n}"><span class="sr-only">Agrandir la photo : </span><img src="photos/${x.p}-m.jpg" alt="${esc(x.t)} – chantier MKR Construction, Antananarivo" loading="lazy" decoding="async"></button><h3><span class="ico"><svg><use href="#i-${x.i}"/></svg></span>${esc(x.t)}</h3><p>${esc(x.s)}</p><ul>${x.l.map(y=>`<li>${esc(y)}</li>`).join("")}</ul></article>`).join(""));

/* ---------- Galerie (Réalisations) : cadres et cartels ---------- */
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
const art=(g,i,list)=>`<figure class="art"><button type="button" class="art-frame" data-lb="${list}" data-i="${i}"><span class="sr-only">Agrandir la photo : </span><img src="photos/${g.s}-m.jpg" alt="${esc(g.t)} – MKR Construction, Antananarivo" loading="lazy" decoding="async"></button><figcaption class="cartel">${esc(g.t)}</figcaption></figure>`;
let view=G;
fill("shots",G.map((g,i)=>art(g,i,"g")).join(""));
PAIRS.forEach(p=>{p.a=p.a||"avant-"+p.s;p.b=p.b||"apres-"+p.s;});
const PL=[]; PAIRS.forEach(p=>{PL.push({s:p.a,t:p.t+" · pendant"});PL.push({s:p.b,t:p.t+" · après"});});
const half=(src,alt,i,label)=>`<figure class="art"><button type="button" class="art-frame" data-lb="p" data-i="${i}"><span class="sr-only">Agrandir la photo : </span><img src="photos/${src}-m.jpg" alt="${alt}" loading="lazy" decoding="async"></button><span class="when${label==="Après"?" after":""}" aria-hidden="true">${label}</span></figure>`;
fill("pairs",PAIRS.map((p,k)=>`<article class="diptych"><div class="diptych-frames">${half(p.a,esc(p.t)+", pendant les travaux",2*k,"Pendant")}${half(p.b,esc(p.t)+", travaux terminés",2*k+1,"Après")}</div><div class="cartel cartel-lg"><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></div></article>`).join(""));

/* ---------- Salle des plans (Contact) : nuancier des types de projet ---------- */
const TYPES=[
 ["Piscine (création)","piscine-campagne","pis"],["Piscine (rénovation ou entretien)","piscine-renovation","reno"],
 ["Construction de bâtiment","villa-contemporaine","bat"],["Électricité","restaurant-amenage","elec"],["Plomberie","reseau-eau","plo"],
 ["Carrelage","toit-terrasse-verriere","car"],["Pavés autobloquants","allee-chevrons","pav"],["Toiture ou terrasse","apres-terrasse","eta"],
 ["Peinture et finitions","restaurant-rapide","pei"],["Aménagements extérieurs","pergola-vegetale","ext"],["Plusieurs travaux","immeuble-renove","new"]
];
fill("types",TYPES.map(([t,p,i],n)=>`<label class="swatch"><input class="sr-only" type="radio" name="type" value="${t}"${n?"":" checked"}><img src="photos/${p}-m.jpg" alt="" loading="lazy" decoding="async"><span class="swatch-txt"><span class="ico"><svg><use href="#i-${i}"/></svg></span>${t}</span><span class="swatch-ok" aria-hidden="true"><svg class="i"><use href="#i-check"/></svg></span></label>`).join(""));

/* Tout ce qui suit ne tourne que dans le navigateur (pas pendant le pré-rendu) */
if(document.body){
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Filtres de la galerie */
document.querySelectorAll(".filters button").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll(".filters button").forEach(x=>x.setAttribute("aria-pressed",x===b));
  const f=b.dataset.f; view=f==="all"?G:G.filter(g=>g.c===f);
  const el=document.getElementById("shots"); el.innerHTML=view.map((g,i)=>art(g,i,"g")).join("");
  if(!reduce) [...el.children].forEach((c,i)=>c.animate([{opacity:0,transform:"translateY(14px)"},{opacity:1,transform:"none"}],{duration:450,delay:Math.min(i*40,400),easing:"cubic-bezier(.2,.7,.2,1)",fill:"backwards"}));
}));

/* ---------- Visionneuse plein écran ---------- */
const TEAM=[{s:"directeur-salle",t:"Avant la remise du chantier, tout est vérifié à fond"},{s:"equipe-pergola",t:"L'équipe à la livraison"},{s:"equipe-baie-vitree",t:"Pose d'une baie vitrée"},{s:"equipe-verriere",t:"Montage d'une verrière"}];
const SV=T.map(x=>({s:x.p,t:x.t}));
let lbList=[], lbI=0, lbEl=null, lastFocus=null;
function lbShow(dir=0){ const g=lbList[lbI], im=lbEl.querySelector("img"); im.src="photos/"+g.s+".jpg"; im.alt=g.t;
  if(!reduce) im.animate([{opacity:0,transform:dir?`translateX(${dir*40}px)`:"scale(.94)"},{opacity:1,transform:"none"}],{duration:380,easing:"cubic-bezier(.2,.7,.2,1)"});
  lbEl.querySelector("p").textContent=g.t+"  ·  "+(lbI+1)+" / "+lbList.length; }
function lbOpen(list,i){
  lbList=list; lbI=i; lastFocus=document.activeElement;
  lbEl=document.createElement("div"); lbEl.className="lb";
  lbEl.setAttribute("role","dialog"); lbEl.setAttribute("aria-modal","true"); lbEl.setAttribute("aria-label","Photo agrandie");
  lbEl.innerHTML='<img alt=""><p></p><button type="button" class="x" aria-label="Fermer">✕</button><button type="button" class="pv" aria-label="Photo précédente">‹</button><button type="button" class="nx" aria-label="Photo suivante">›</button>';
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
document.addEventListener("keydown",e=>{ if(!lbEl)return;
  if(e.key==="Escape")lbClose(); if(e.key==="ArrowRight")lbEl.querySelector(".nx").click(); if(e.key==="ArrowLeft")lbEl.querySelector(".pv").click();
  if(e.key==="Tab"){ const f=[...lbEl.querySelectorAll("button")], i=f.indexOf(document.activeElement); e.preventDefault(); f[(i+(e.shiftKey?-1:1)+f.length)%f.length].focus(); }
});
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-lb]"); if(!b) return;
  const l=b.dataset.lb; lbOpen(l==="g"?view:l==="t"?TEAM:l==="s"?SV:PL,+b.dataset.i);
});

/* ---------- Copie ---------- */
function copyText(text,btn,node){
  const sel=()=>{if(!node)return;const r=document.createRange();r.selectNodeContents(node);const s=getSelection();s.removeAllRanges();s.addRange(r);};
  const done=()=>{const o=btn.innerHTML;btn.textContent="Copié";setTimeout(()=>btn.innerHTML=o,1600);};
  try{navigator.clipboard.writeText(text).then(done,sel);}catch(_){sel();}
}
document.querySelectorAll("[data-copy]").forEach(b=>b.addEventListener("click",()=>{const n=document.getElementById(b.dataset.copy);copyText(n.textContent,b,n);}));
document.getElementById("share")?.addEventListener("click",e=>copyText(location.origin+"/",e.currentTarget,null));

/* ---------- Nuancier des types de projet ---------- */
const types=document.getElementById("types");
if(types){
  const prev=document.getElementById("types-prev"), next=document.getElementById("types-next");
  const ends=()=>{ prev.disabled=types.scrollLeft<4; next.disabled=types.scrollLeft+types.clientWidth>types.scrollWidth-4; };
  prev.addEventListener("click",()=>types.scrollBy({left:-types.clientWidth*.8,behavior:reduce?"auto":"smooth"}));
  next.addEventListener("click",()=>types.scrollBy({left:types.clientWidth*.8,behavior:reduce?"auto":"smooth"}));
  types.addEventListener("scroll",ends,{passive:true}); addEventListener("resize",ends); ends();
  types.addEventListener("change",e=>e.target.closest("label").scrollIntoView({behavior:reduce?"auto":"smooth",block:"nearest",inline:"nearest"}));
}

/* ---------- Fiche de rendez-vous ---------- */
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
  document.getElementById("result").scrollIntoView({behavior:reduce?"auto":"smooth",block:"nearest"});
});
document.getElementById("copy")?.addEventListener("click",e=>{const n=document.getElementById("out");copyText(n.textContent,e.currentTarget,n);});

/* =====================================================================
   Caméra : on entre par les portes, on ressort en reculant.
   - data-go="in"   : la porte s'ouvre puis la caméra s'avance dedans
   - data-go="out"  : la porte se referme devant nous, on recule ; la page d'arrivée
                      démarre zoomée dans la porte d'où l'on sort, puis recule
   - data-go="swap" : passage d'une pièce à l'autre
   Le sens est transmis à la page suivante via sessionStorage.
   ===================================================================== */
const scene=document.getElementById("scene"), veil=document.querySelector(".veil"), closer=document.querySelector(".closer");
const PAGE=document.body.dataset.page, KEY="mkr-go";
const EASE="cubic-bezier(.6,0,.3,1)";
let busy=false;
const save=v=>{try{sessionStorage.setItem(KEY,JSON.stringify(v));}catch(_){}};
const take=()=>{try{const v=JSON.parse(sessionStorage.getItem(KEY)||"null");sessionStorage.removeItem(KEY);return v;}catch(_){return null;}};
const doorFor=a=>a.matches("[data-door]")?a:document.querySelector(`[data-door="${a.dataset.doorRef||""}"]`);
/* Centre d'un élément : dans le repère de la scène (pour transform-origin) et en % de l'écran (pour le voile) */
function aim(el){
  const r=el.getBoundingClientRect(), s=scene.getBoundingClientRect(), cx=r.left+r.width/2, cy=r.top+r.height/2;
  scene.style.transformOrigin=`${cx-s.left}px ${cy-s.top}px`;
  veil.style.setProperty("--vx",cx/innerWidth*100+"%"); veil.style.setProperty("--vy",cy/innerHeight*100+"%");
}
function aimCenter(){ const s=scene.getBoundingClientRect(); scene.style.transformOrigin=`50% ${innerHeight/2-s.top}px`; veil.style.setProperty("--vx","50%"); veil.style.setProperty("--vy","55%"); }

function leave(a){
  busy=true;
  const dir=a.dataset.go, href=a.href;
  save({dir,from:PAGE});
  if(reduce){ veil.animate([{opacity:0},{opacity:1}],{duration:260,fill:"forwards"}); setTimeout(()=>location.href=href,260); return; }
  if(dir==="in"){
    const door=doorFor(a), op=door?.querySelector(".opening")||a, leaf=door?.querySelector(".leaf");
    aim(op);
    leaf?.animate([{transform:"rotateY(-104deg)"}],{duration:420,easing:EASE,fill:"forwards"});
    scene.animate([{transform:"scale(1)"},{transform:"scale(3.6)"}],{duration:720,delay:180,easing:"cubic-bezier(.55,0,.4,1)",fill:"forwards"});
    veil.animate([{opacity:0},{opacity:1}],{duration:380,delay:520,easing:"ease-in",fill:"forwards"});
    setTimeout(()=>location.href=href,900);
  } else {
    /* On recule : la porte de la pièce se referme devant la caméra */
    aimCenter();
    closer.style.visibility="visible";
    closer.firstElementChild.animate([{transform:"rotateY(-96deg)"},{transform:"rotateY(0deg)"}],{duration:620,easing:"cubic-bezier(.5,0,.3,1)",fill:"forwards"});
    scene.animate([{transform:"scale(1)"},{transform:"scale(.86)"}],{duration:620,easing:EASE,fill:"forwards"});
    veil.animate([{opacity:0},{opacity:1}],{duration:200,delay:560,fill:"forwards"});
    setTimeout(()=>location.href=href,760);
  }
}
document.addEventListener("click",e=>{
  const a=e.target.closest("a[data-go]");
  if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey) return;
  e.preventDefault(); if(!busy) leave(a);
});

function arrive(){
  const go=take();
  document.documentElement.classList.remove("arriving");
  if(!go) return;
  if(reduce){ veil.animate([{opacity:1},{opacity:0}],{duration:300,fill:"forwards"}); return; }
  const door=go.dir==="out"&&(document.querySelector(`[data-door="${go.from}"]`)||document.querySelector('[data-door="entree"]'));
  if(door){
    /* On ressort : la caméra part de l'intérieur de la porte, recule, puis la porte se referme */
    aim(door.querySelector(".opening")||door);
    door.querySelector(".leaf")?.animate([{transform:"rotateY(-104deg)"},{transform:"rotateY(-104deg)",offset:.55},{transform:"rotateY(0deg)"}],{duration:1150,easing:"cubic-bezier(.4,0,.2,1)"});
    scene.animate([{transform:"scale(3.6)"},{transform:"scale(1)"}],{duration:820,easing:"cubic-bezier(.3,0,.2,1)"});
    veil.animate([{opacity:1},{opacity:0}],{duration:520,easing:"ease-out",fill:"forwards"});
  } else {
    /* On entre : la caméra avance dans la pièce */
    aimCenter();
    scene.animate([{transform:"scale(1.22)",opacity:.5},{transform:"scale(1)",opacity:1}],{duration:760,easing:"cubic-bezier(.2,.7,.2,1)"});
    veil.animate([{opacity:1},{opacity:0}],{duration:560,easing:"ease-out",fill:"forwards"});
  }
}
arrive();
/* Bouton « Précédent » du navigateur (page restaurée depuis le cache) : on remet la scène au repos */
addEventListener("pageshow",e=>{ if(!e.persisted) return;
  busy=false; document.getAnimations().filter(a=>!(a instanceof CSSAnimation||a instanceof CSSTransition)).forEach(a=>a.cancel()); closer.style.visibility="";
  document.documentElement.classList.remove("arriving"); try{sessionStorage.removeItem(KEY);}catch(_){}
});

/* Anciens liens du site à onglets (…/#services) : redirige vers la vraie page */
const OLD={services:"services.html",realisations:"realisations.html",apropos:"a-propos.html",contact:"contact.html"};
if(OLD[location.hash.slice(1)]) location.replace(OLD[location.hash.slice(1)]);
}
