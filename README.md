# Immobilien-Finanzierungsrechner

Zwei browserbasierte Rechner für Immobilienfinanzierungen (Hausverwaltung Kurrle) als installierbare PWA.

**Live:** https://sunshinelover94.github.io/immobilien-finanzierungsrechner/

## Inhalt
- **Steuer-, AfA- & Verkaufsrechner** (`steuer.html`) – Kaufnebenkosten, Annuität & Tilgungsplan, Cashflow vor/nach Steuern, lineare AfA bzw. Restnutzungsdauer-Gutachten, Mietsteigerung, Verkaufsszenario mit Spekulationssteuer.
- **Basis-Finanzierungsrechner** (`basis.html`) – Kaufnebenkosten je Bundesland, monatliche Rate, LTV, Tilgungsplan, optionale Mietrendite/Cashflow.
- `index.html` – Auswahl-Startseite.

## Technik
- Reines HTML/CSS/JS, keine externen Abhängigkeiten, läuft offline.
- PWA: `manifest.webmanifest` + `sw.js` (Cache-First). Installierbar in Chrome/Edge und auf dem Smartphone via „Zum Startbildschirm hinzufügen".
- Hosting: GitHub Pages (Branch `main`, Root).

## Hinweis
Vereinfachte Modellrechnungen – **keine Steuer-, Rechts- oder Finanzierungsberatung**. Alle Annahmen (z. B. Grunderwerbsteuersätze) vor Verwendung prüfen.
