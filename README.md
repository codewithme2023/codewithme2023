# Playwright Repository Dokumentation

## Einleitung
Dies ist eine Dokumentation für das Playwright-Repository, das Funktionen zur Automatisierung von Browserinteraktionen bereitstellt.

## Installation

1. Klone das Repository mit Git:
   ```bash
   git clone https://github.com/codewithme2023/codewithme2023.git
   ```

2. Öffne das Repository und führe den folgenden Befehl aus, um die Abhängigkeiten zu installieren:
   ```bash
   cd codewithme2023
   npm install
   ```

## Aufbau des Playwright-Repositorys

Das Repository ist wie folgt strukturiert:

- Im Verzeichnis `pages` befinden sich verschiedene Seiten, die spezifische Playwright-Funktionen enthalten.
- Im Verzeichnis `tests` sind die Testdateien zu finden, die diese Funktionen zu Testfällen kombinieren.

## Beispiel für eine Testdatei

Die Testdateien sehen folgendermaßen aus:

```javascript
const { test } = require('@playwright/test');
const AngularjsMainPage = require('../pages/angularjs_main_page.js');

test('Angularjs', async ({ page } ) => {
  // Testcode hier...
});
```

In diesem Beispiel wird eine Testdatei für AngularJS gezeigt, die die Funktionalitäten der `AngularjsMainPage` nutzt.

## Beispiel für eine Seite

Eine Seiten-Datei sieht wie folgt aus:

```javascript
class AngularjsMainPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('https://angularjs.org/');
  }

  // Weitere Funktionen...
}

module.exports = AngularjsMainPage;
```

Das ist ein Beispiel für eine Seite, die die Navigation auf die AngularJS-Website ermöglicht.

## Ausführen der Tests

Um die Tests auszuführen, können verschiedene Befehle genutzt werden:

- `npm run test`: Führt die Tests aus.
- `npm run test:reporter`: Führt die Tests aus und generiert einen Bericht.
- `npm run allure-report`: Generiert einen Allure-Bericht.

## Befehle im Überblick

- `npm run clean`: Löscht vorherige Testergebnisse.
- `npm run test`: Führt die Tests aus.
- `npm run posttest`: Führt nach den Tests bestimmte Aktionen aus.
- `npm run test:reporter`: Führt die Tests aus und generiert einen Bericht.
- `npm run allure-report`: Generiert einen Allure-Bericht.

```
