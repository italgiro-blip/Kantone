


# Kantone – Interaktiver Schweizer Kantons-Viewer

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white)
![GeoJSON](https://img.shields.io/badge/GeoJSON-4CAF50?style=flat&logo=geojson&logoColor=white)

Interaktive Webkarte der Schweiz zur Visualisierung **hypothetischer Raten** pro Kanton. Die Anwendung basiert auf **HTML, CSS, JavaScript**, verwendet **Leaflet** als Kartenbibliothek und lädt Geodaten im **GeoJSON**-Format. Die Klassifizierung der Werte erfolgt über **statistische Methoden** (Jenks, gleiche Intervalle, Quartile), die über eine Seitenleiste dynamisch gewechselt werden können.

---

## 📋 Inhaltsverzeichnis

- [Beschreibung](#-beschreibung)
- [Funktionen](#-funktionen)
- [Demo](#-demo)
- [Technologien](#-technologien)
- [Projektstruktur](#-projektstruktur)
- [Installation und Verwendung](#-installation-und-verwendung)
- [Bedienung der Oberfläche](#-bedienung-der-oberfläche)
- [Statistische Klassifikation](#-statistische-klassifikation)
- [Farbpaletten](#-farbpaletten)
- [GeoJSON-Format](#-geojson-format)
- [Anpassung](#-anpassung)
- [Roadmap](#-roadmap)
- [Lizenz](#-lizenz)
- [Autor](#-autor)

---

## 📖 Beschreibung

**Kantone** ist ein interaktiver Karten-Viewer für die 26 Schweizer Kantone. Die Karte wird mit **Leaflet** gerendert und über eine GeoJSON-Datei mit den Kantonsgrenzen befüllt. Jeder Kanton wird anhand einer **hypothetischen Rate** (`Tax_rate`) eingefärbt. Die Klassifizierung der Werte in Farbklassen erfolgt über wählbare **statistische Methoden**, sodass die gleichen Daten je nach Verfahren unterschiedlich dargestellt werden.

Die Anwendung eignet sich als Lehrmittel für **Datenklassifikation**, **Choroplethenkarten** und **georäumliche Visualisierung**.

---

## ✨ Funktionen

- 🗺️ Interaktive Karte der Schweiz mit **Leaflet**.
- 🎨 Drei **statistische Klassifikationsmethoden**: Jenks, gleiche Intervalle, Quartile.
- 🌈 Vier **Farbschemata**: Blau-, Rot-, Lilá- und Grünstufen.
- 🛰️ Drei **Hintergrundkarten**: Satellit (Esri), OpenStreetMap, CartoCDN Dark.
- 📥 **Layer-Import** über einen Button (`LAYER IMPORTIEREN`) – lädt die GeoJSON-Datei nach.
- 🔍 **Kantonsauswahl** über ein Dropdown-Menü.
- 📊 **Infobox** mit Verwaltungseinheit und aktuellem Wert.
- 🖱️ **Hover-Tooltip** auf jedem Kanton.
- 📱 Responsives Layout mit Seitenleiste und Seitenbildern.

---

## 🖥️ Demo

Die Anwendung benötigt einen lokalen Server, da die GeoJSON-Datei per `fetch()` geladen wird.

```bash
# Option 1: Python
python -m http.server 8000

# Option 2: Node.js
npx serve .
