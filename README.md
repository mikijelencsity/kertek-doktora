# Kertek Doktora Kft — weboldal

Statikus, többoldalas bemutatkozó weboldal a **Kertek Doktora Kft.** részére (kertépítés, gyepesítés, kertgondozás — Kraly Péter). Nincs build lépés és nincs szükség szerverre: sima HTML + CSS + JS.

## Oldalak

| Fájl | Oldal |
|------|-------|
| `index.html` | Főoldal (hero, szolgáltatás-kivonat, rólam, referencia-körhinta, vélemények) |
| `szolgaltatasok.html` | Szolgáltatások — részletes bemutatás |
| `referenciak.html` | Referenciák — galéria kategóriánként, kattintható nagyítással |
| `rolam.html` | Rólam — Kraly Péter bemutatkozása, munkamódszer |
| `kapcsolat.html` | Kapcsolat — űrlap, elérhetőségek, térkép, GYIK |

## Felépítés

```
index.html, szolgaltatasok.html, referenciak.html, rolam.html, kapcsolat.html
assets/
  styles.css   – közös stíluslap (minden oldal ezt használja)
  main.js      – közös szkriptek (preloader, menü, körhinta, lightbox, űrlap)
  favicon.svg  – oldalikon
  img/         – fotók
```

## Helyi megtekintés

Bármelyik statikus szerver megteszi, pl.:

```bash
npx serve .
# vagy
python -m http.server 8000
```

Majd nyisd meg: `http://localhost:8000`. (A `file://` megnyitás is jó, kivéve a beágyazott térképet.)

## ⚠️ Élesítés előtt cserélendő adatok

A kódban `CSERE:` megjegyzésekkel jelölve. Jelenleg **helykitöltő** adatok szerepelnek:

- **Telefonszám:** `+36 30 123 4567` — minden oldalon (fejléc, kapcsolat, lábléc). Keresd: `tel:+36301234567`
- **E-mail:** `info@kertekdoktora.hu` — keresd: `mailto:` és a `kapcsolat.html` űrlap `data-email` értéke
- **Működési terület:** jelenleg „Budapest és Pest megye"
- **Térkép:** a `kapcsolat.html`-ben lévő OpenStreetMap beágyazás jelenleg Budapest környékére van állítva — állítsd a valós területre/székhelyre (`bbox` és `marker` paraméterek)
- **Adatlap (schema.org):** `index.html` / `kapcsolat.html` JSON-LD — cím, telefon, alapítás éve
- **Számadatok:** „2015 / 10+ év / 200+ kert" — kitalált értékek, igazítsd a valósághoz
- **Közösségi linkek:** a Facebook/Instagram ikonok `href="#"` — töltsd ki a valós profilokkal

## Fotók

A galériában és a fejlécekben jelenleg **igényes stock fotók** szerepelnek (Unsplash, ingyenes, kereskedelmi célra is használható licenc) helykitöltőként, hogy látszódjon a felépítés. Ezeket érdemes a **valódi projektfotókra** cserélni: tedd az új képet az `assets/img/` mappába ugyanazzal a fájlnévvel, vagy írd át a hivatkozást a HTML-ben / `styles.css`-ben (fejléc-képek: `.pb-*::before`).

## Színvilág

CSS-változókkal a `styles.css` tetején (`:root`) — a teljes paletta pár sor átírásával hangolható:
`--leaf` (fő zöld), `--leaf-deep` (sötét szekciók), `--cream`/`--sage` (világos hátterek), `--lime` (kiemelés).
