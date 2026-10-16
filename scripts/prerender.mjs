// Écrit dans les pages HTML le contenu que js/main.js génère (métiers, galerie, avant/après),
// pour que Google le lise sans exécuter de JavaScript. Relancé par `npm run build`.
import fs from "node:fs";
import vm from "node:vm";

const out = {};
const el = id => ({
  children: { length: 0 },
  set innerHTML(html) { out[id] = html; },
  addEventListener() {}, setAttribute() {}, removeAttribute() {}, classList: { toggle() {}, add() {} }, dataset: {},
});
const sandbox = {
  document: { getElementById: el, querySelectorAll: () => [], addEventListener() {} },
  matchMedia: () => ({ matches: true }),
  addEventListener() {}, location: { href: "", hash: "" }, navigator: {}, window: {},
};
vm.runInNewContext(fs.readFileSync("js/main.js", "utf8"), sandbox);

for (const file of fs.readdirSync(".").filter(f => f.endsWith(".html"))) {
  let html = fs.readFileSync(file, "utf8"), n = 0;
  for (const [id, inner] of Object.entries(out)) {
    const re = new RegExp(`(<div[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(</div><!--/${id}-->)`);
    if (re.test(html)) { html = html.replace(re, (_, a, b) => a + inner + b); n++; }
  }
  if (n) { fs.writeFileSync(file, html); console.log(`${file} : ${n} bloc(s) pré-rendu(s)`); }
}
