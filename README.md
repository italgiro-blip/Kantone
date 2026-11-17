# Kantone – Interaktiver Schweizer Kantons-Viewer

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white)
![GeoJSON](https://img.shields.io/badge/GeoJSON-4CAF50?style=flat&logo=geojson&logoColor=white)

Interaktive Webkarte der Schweiz zur Visualisierung **hypothetischer Steuersätze** pro Kanton. Die Anwendung basiert auf **HTML, CSS und JavaScript**, verwendet **Leaflet** als Kartenbibliothek und lädt Geodaten im **GeoJSON**-Format. Die Klassifizierung der Werte erfolgt mittels **statistischer Methoden** (Jenks, gleiche Intervalle, Quartile), die dynamisch über die Seitenleiste gewechselt werden können.

---

## 📋 Inhaltsverzeichnis

- [Beschreibung](#-beschreibung)
- [Funktionen](#-funktionen)
- [Demo](#-demo)
- [Technologien](#-technologien)
- [Projektstruktur](#-projektstruktur)
- [Installation und Verwendung](#-installation-und-verwendung)
- [Bedienung der Oberfläche](#-bedienung-der-oberfläche)
- [Statistische Klassifizierung](#-statistische-klassifizierung)
- [Farbschemata](#-farbschemata)
- [GeoJSON-Format](#-geojson-format)
- [Anpassung](#-anpassung)
- [Roadmap](#-roadmap)
- [Lizenz](#-lizenz)
- [Autor](#-autor)

---

## 📖 Beschreibung

**GeoCH** ist ein interaktiver Kartenviewer der **26 Kantone** der Schweiz. Die Karte wird mit **Leaflet** gerendert und mittels einer GeoJSON-Datei mit den Kantonsgrenzen gefüllt. Jeder Kanton wird entsprechend einem **hypothetischen Steuersatz** (`Tax_rate`) eingefärbt. Die Klassifizierung der Werte in Farbklassen erfolgt über **wählbare statistische Methoden**, sodass dieselben Daten je nach gewähltem Verfahren unterschiedlich dargestellt werden können.

Die Anwendung dient als Lehrmaterial für **Datenklassifizierung**, **Choroplethenkarten** und **georäumliche Visualisierung**.

---

## ✨ Funktionen

- 🗺️ Interaktive Karte der Schweiz mit **Leaflet**.
- 🎨 Drei **statistische Klassifizierungsmethoden**: Jenks, gleiche Intervalle, Quartile.
- 🌈 Vier **Farbschemata**: Blau-, Rot-, Lila- und Grüntöne.
- 🛰️ Drei **Basiskarten**: Satellit (Esri), OpenStreetMap, CartoCDN Dark.
- 📥 **Layer-Import** über eine Schaltfläche (`LAYER IMPORTIEREN`) – lädt die GeoJSON-Datei neu.
- 🔍 **Kantonauswahl** über ein Dropdown-Menü.
- 📊 **Infobox** mit der Verwaltungseinheit und dem aktuellen Wert.
- 🖱️ **Tooltip beim Hovern** über jedem Kanton.
- 📱 Responsives Design mit Seitenleiste und seitlichen Bildern.

---

## 🖥️ Demo

Die Anwendung erfordert einen lokalen Server, da die GeoJSON-Datei über `fetch()` geladen wird.

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx serve .
```

---

## 🛠️ Technologien

| Technologie | Version | Verwendung |
|-------------|---------|------------|
| HTML5 | — | Struktur der Oberfläche |
| CSS3 | — | Styles und responsives Design |
| JavaScript (ES6+) | — | Anwendungslogik |
| [Leaflet](https://leafletjs.com/) | 1.9.x | Interaktive Kartenbibliothek |
| GeoJSON | — | Format der Geodaten |
| [statsbreaks](https://github.com/riatelab/statsbreaks) | 1.x | Berechnung von Jenks und Quantilen |

> **Hinweis:** `statsbreaks` ersetzt `simple-statistics` aus der spanischen Version und unterstützt nativ `jenks`, `quantile` und `equal` – ideal für Choroplethenkarten.

---

## 📁 Projektstruktur

```
geoch/
│
├── index.html              # Hauptseite
├── css/
│   └── styles.css          # Styles der Anwendung
├── js/
│   ├── app.js              # Hauptlogik (Karte, Layer, Events)
│   ├── classification.js   # Statistische Klassifizierungsmethoden
│   └── palettes.js         # Farbschemata
├── data/
│   └── cantons.geojson     # Grenzen der Schweizer Kantone
├── img/
│   └── (seitliche Bilder)
└── README.md
```

---

## ⚙️ Installation und Verwendung

1. **Repository klonen:**

   ```bash
   git clone https://github.com/dein-benutzer/geoch.git
   cd geoch
   ```

2. **Lokalen Server starten** (wegen `fetch()` erforderlich):

   ```bash
   # Option 1: Python
   python -m http.server 8000

   # Option 2: Node.js
   npx serve .
   ```

3. **Browser öffnen** unter `http://localhost:8000`.

---

## 🖱️ Bedienung der Oberfläche

| Element | Aktion |
|---------|--------|
| **Dropdown-Menü** | Wählt einen Kanton aus und zentriert die Karte darauf |
| **Klassifizierungsmethode** | Wechselt zwischen Jenks, gleichen Intervallen und Quartilen |
| **Farbschema** | Ändert das Farbschema (Blau, Rot, Lila, Grün) |
| **Basiskarte** | Wechselt zwischen Satellit, OpenStreetMap und CartoCDN Dark |
| **Schaltfläche `LAYER IMPORTIEREN`** | Lädt die GeoJSON-Datei neu |
| **Hover über die Karte** | Zeigt einen Tooltip mit Name und Wert |
| **Infobox** | Zeigt die Verwaltungseinheit und den aktuellen Wert |

---

## 📊 Statistische Klassifizierung

Die Anwendung erlaubt die Klassifizierung der Werte von `Tax_rate` mittels dreier Methoden:

### 1. Jenks (Natural Breaks)
Minimiert die Varianz innerhalb jeder Klasse und maximiert die Varianz zwischen den Klassen. Ideal für Daten mit unregelmäßiger Verteilung.

### 2. Gleiche Intervalle
Teilt die Wertespanne in Klassen gleicher Breite. Einfach, aber anfällig für Ausreißer.

### 3. Quartile
Teilt die Daten in vier Gruppen mit gleich vielen Beobachtungen. Nützlich für den Vergleich relativer Positionen.

---

## 🎨 Farbschemata

| Schema | Farben |
|--------|--------|
| **Blau** | `#f7fbff` → `#08306b` |
| **Rot** | `#fff5f0` → `#67000d` |
| **Lila** | `#fcfbfd` → `#3f007d` |
| **Grün** | `#f7fcf5` → `#00441b` |

Jedes Schema enthält **5 Farbklassen**, die automatisch nach der gewählten Klassifizierungsmethode zugewiesen werden.

---

## 🗺️ GeoJSON-Format

Die Datei `data/cantons.geojson` muss eine `FeatureCollection` mit einer `Feature` pro Kanton enthalten. Minimalbeispiel:

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Zürich",
        "Tax_rate": 21.5
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[...]]]
      }
    }
  ]
}
```

**Erforderliche Eigenschaften:**

| Eigenschaft | Typ | Beschreibung |
|-------------|-----|--------------|
| `name` | string | Name des Kantons |
| `Tax_rate` | number | Numerischer Wert zur Visualisierung |

**Datenquellen für Schweizer Kantonsgrenzen:**
- [severinlandolt/map-switzerland](https://github.com/severinlandolt/map-switzerland) – Shapefile, TopoJSON und GeoJSON der Kantone (WGS84).
- [Bundesamt für Statistik (BFS)](https://www.bfs.admin.ch/) – offizielle GeoJSON-Daten der Verwaltungsgrenzen.
- [ebp-group/Switzerland_Tilemap](https://github.com/ebp-group/Switzerland_Tilemap) – quadratische Kantons-Tilemap im GeoJSON-Format.

---

## 🔧 Anpassung

### Werte ändern
Bearbeite die Eigenschaft `Tax_rate` in `data/cantons.geojson`.

### Neue Farbschemata hinzufügen
Bearbeite `js/palettes.js` und füge ein neues Farbarray hinzu:

```javascript
export const palettes = {
  blau: ['#f7fbff', '#c6dbef', '#6baed6', '#2171b5', '#08306b'],
  // neues Schema:
  orange: ['#fff5eb', '#fdd0a2', '#fd8d3c', '#d94801', '#7f2704']
};
```

### Basiskarten ändern
Bearbeite das Layer-Objekt in `js/app.js` und füge neue TileLayer-URLs hinzu. Optional kann **swisstopo** als Schweizer Basiskarte ergänzt werden.

### Kartenmittelpunkt und Zoom
Der geografische Mittelpunkt der Schweiz liegt bei etwa **46.8°N, 8.2°E**. Empfohlener initialer Zoom-Level: **8 oder 9** (die Schweiz ist deutlich kleiner als Spanien).

---

## 🗺️ Roadmap

- [x] Interaktive Karte mit Leaflet
- [x] Statistische Klassifizierung (Jenks, gleiche Intervalle, Quartile)
- [x] Austauschbare Farbschemata
- [x] Basiskarten (Satellit, OSM, Dark)
- [x] Tooltip und Infobox
- [ ] Export der Karte als PNG
- [ ] Filter nach Wertebereich
- [ ] Balkendiagramm mit Werten pro Kanton
- [ ] Unterstützung für Bezirke und Gemeinden
- [ ] Dunkelmodus

---

## 📄 Lizenz

Dieses Projekt wird unter der **MIT-Lizenz** veröffentlicht. Weitere Informationen findest du in der Datei `LICENSE`.

---

## 👤 Autor
- GitHub: https://github.com/italgiro-blip/
- E-Mail: italgiro@gmail.com


