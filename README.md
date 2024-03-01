# Playwright Repository Dokumentation

## Einleitung
Diese Dokumentation beschreibt die notwendigen Schritte um das von Damodar und Timo erstelltem Playwright Testumgebungs Kit direkt benutzen zu können.
Nach ungefähr 10 min Setup und demFestlegen einer URL in der Navigation Funktion ist es bereits möglich tests mit Report in Jenkins auszuführen(Leider nur lokal).

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

# Jenkins Installation und Einrichtung

## Jenkins herunterladen und installieren

1. Lade Jenkins von der offiziellen Website herunter: [Jenkins Download](https://www.jenkins.io/download/)
2. Führe das Installationsprogramm aus und befolge die Anweisungen auf dem Bildschirm, um Jenkins zu installieren.
3. Starte den Jenkins-Dienst nach der Installation.

## Jenkins starten und öffnen

1. Öffne deinen Webbrowser.
2. Gehe zur folgenden Adresse: `http://localhost:8080`

## Jenkins Plugins installieren

Um die erforderlichen Funktionen für die Anzeige von Allure-Testberichten und das Arbeiten mit Git-Repositories in Jenkins zu ermöglichen, müssen die folgenden Plugins installiert werden:

### 1. Allure HTML Publisher Plugin

Das Allure HTML Publisher Plugin ermöglicht die Anzeige von Allure-Testberichten direkt in Jenkins.

1. Gehe zu "Verwalten Jenkins" > "Plugin verwalten" > "Verfügbar".
2. Suche nach "Allure" und aktiviere das "Allure HTML Publisher" Plugin.
3. Klicke auf "Installieren ohne Neustart".

### 2. Git Plugin

Das Git Plugin ermöglicht das Einbinden von Git-Repositories in Jenkins-Jobs.

1. Gehe zu "Verwalten Jenkins" > "Plugin verwalten" > "Verfügbar".
2. Suche nach "Git" und aktiviere das "Git Plugin".
3. Klicke auf "Installieren ohne Neustart".

Nach der Installation dieser Plugins können sie in Jenkins verwendet werden, um Allure-Testberichte zu veröffentlichen und mit Git-Repositories zu arbeiten.

## Einrichtung eines Jenkins-Jobs aus einem Git-Repository

Um einen Jenkins-Job aus einem Git-Repository zu erstellen, folgen Sie diesen Schritten:

1. Wählen Sie "Neues Element erstellen" auf der Jenkins-Startseite.
2. Geben Sie einen Namen für Ihren Job ein und wählen Sie "Pipeline".
3. Konfigurieren Sie die Pipeline-Quelle mit "Pipeline-Skript aus SCM".
4. Wählen Sie als SCM "Git" und fügen Sie die Repository-URL `https://github.com/codewithme2023/codewithme2023.git` ein.
5. Fügen Sie erforderliche Zugangsdaten hinzu oder wählen Sie vorhandene aus.
6. Füge den folgenden Pipeline-Code in das Textfeld ein:

```groovy
pipeline {
    agent any

    stages {
        stage('Clone repository') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/codewithme2023/codewithme2023.git',
                    credentialsId: 'githubcredentials'
            }
        }
        stage('Playwright install'){
            steps{
                bat 'npm install'
                bat 'npm install -g playwright'    
                bat 'npm install @playwright/test@latest'
                bat 'npx playwright install'
            }
        }

        stage('Run tests') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                        bat 'npx playwright test --list'
                        bat 'npx playwright test'
                    }
                }
            }
        }

        stage('Archive artifacts') {
            steps {
                archiveArtifacts 'playwright-report/**'
            }
        }

        stage('Generate and Display Allure Report') {
            steps {
                script {
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                }
            }
        }

        stage('Publish HTML Reports') {
            steps {
                echo 'Contents of the report directory:'
                bat 'dir playwright-report'
                publishHTML(target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
}
```

7. Klicke auf "Speichern" um die Konfiguration zu übernehmen.

## Konfiguration der Jenkins-Startparameter

1. Bearbeite die Jenkins-Konfigurationsdatei `jenkins.xml`.
2. Füge die folgenden Argumente zu den Jenkins-Startparametern hinzu:

```xml
<arguments>-Xrs -Xmx256m -Dhudson.lifecycle=hudson.lifecycle.WindowsServiceLifecycle -Dhudson.model.DirectoryBrowserSupport.CSP="sandbox; default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'" -jar "C:\Program Files\Jenkins\jenkins.war" --httpPort=8080 --webroot="%ProgramData%\Jenkins\war"</arguments>
```

3. Speichere die Änderungen und starte den Jenkins-Dienst neu.

## Ausführen der Tests

1. Klicke auf "Jetzt bauen", um den Jenkins-Job auszuführen.
2. Die Tests werden ausgeführt und die Ergebnisse werden in den Jenkins-Build-Logs angezeigt.

## Anzeigen der Testberichte

1. Klicke auf "Playwright Test Report" unter "Zusätzliche Aktionen", um den HTML-Testbericht anzuzeigen.
2. Klicke auf den "Allure Report" Button, um den Allure-Testbericht anzuzeigen.

```

Diese Anleitung führt dich durch den Prozess der Installation und Konfiguration von Jenkins, der Einrichtung eines Jenkins-Jobs aus einem Git-Repository, der Ausführung von Playwright-Tests und dem Anzeigen der Testberichte in Jenkins.

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

# Playwright - Allgemeine Dokumentation

## Was ist Playwright?

Playwright ist ein leistungsstarkes Tool zur Automatisierung von Browserinteraktionen. Es ermöglicht Entwicklern, Webanwendungen zu testen, zu überprüfen und zu automatisieren. Mit Playwright können Benutzer Abläufe im Browser simulieren, Benutzerinteraktionen ausführen, Tests schreiben und vieles mehr.

## Installation von Playwright

Um Playwright zu verwenden, müssen Sie es zu Ihrem Projekt hinzufügen. Führen Sie dazu den folgenden Befehl aus:

```bash
npm install @playwright/test
```

## Erstellen eines Playwright-Tests

Um einen Playwright-Test zu erstellen, können Sie die folgenden Schritte ausführen:

1. Importieren Sie die `test`-Funktion aus dem `@playwright/test`-Paket:

   ```javascript
   const { test } = require('@playwright/test');
   ```

2. Schreiben Sie Ihren Testfall unter Verwendung der Playwright-API:

   ```javascript
   test('Mein erster Test', async ({ page }) => {
     // Führen Sie hier Ihre Testaktionen aus
   });
   ```

## Struktur eines Playwright-Tests

Ein typischer Playwright-Test besteht aus folgenden Elementen:

- Initialisierung des Tests: Importieren der benötigten Module und Funktionen.
- Definieren von Testfällen: Verwenden der `test`-Funktion zum Definieren von Testfällen.
- Ausführen von Browseraktionen: Verwenden der Playwright-API zum Ausführen von Aktionen im Browser.
- Überprüfen von Ergebnissen: Verwenden von Assertions zum Überprüfen des erwarteten Verhaltens der Anwendung.

## Beispiel einer einfachen Testdatei

```javascript
const { test } = require('@playwright/test');

test('Mein erster Test', async ({ page }) => {
  await page.goto('https://example.com');
  await page.click('text=Klick mich');
  await page.waitForSelector('text=Hallo Welt!');
});
```

In diesem Beispiel wird eine einfache Testdatei gezeigt, die eine Webseite aufruft, auf einen Link klickt und auf das Erscheinen eines bestimmten Textes wartet.

## Weitere Ressourcen

- Offizielle Playwright-Dokumentation: [Playwright Dokumentation](https://playwright.dev/)
- Playwright GitHub Repository: [GitHub Repository](https://github.com/microsoft/playwright)
- Playwright Test Framework: [Playwright Test Framework](https://github.com/microsoft/playwright-test)
```

Dies ist eine grundlegende Einführung in Playwright mit Beispielcode und Ressourcen für weiterführende Informationen.
