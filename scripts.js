document.addEventListener('DOMContentLoaded', () => {
    // 1. KARTE UND BASISKARTEN     
    const baseLayers = {
       dark: L.tileLayer('https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=cb1_4iak_1_24289eb4ef8a24a5a8752e0e', {
    subdomains: 'abcd',
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
}),

        streets: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap'
        }),
        satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 19,
            attribution: 'Tiles &copy; Esri'
        })
    };

    const map = L.map('map', {
        zoomControl: false,
        layers: [baseLayers.satellite]
    }).setView([46.8009866002, 8.2297845701], 8);

    L.control.scale({ imperial: false, position: 'bottomleft' }).addTo(map);

    let geojsonLayer, currentData, currentBreaks = [];
    
    const colorSchemes = {
        blues:   ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'],
        reds:    ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
        purples: ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f'],
        greens:  ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c']
    };

    const getPalette = () => {
        const key = document.getElementById('paletteSelect')?.value || 'blues';
        return colorSchemes[key] || colorSchemes.blues;
    };

    const getProp = (p, keys) => {
        const lowerKeys = keys.map(k => k.toLowerCase());
        const foundKey = Object.keys(p).find(k => lowerKeys.includes(k.toLowerCase()));
        return foundKey ? p[foundKey] : null;
    };

    // 2. STATISTISCHE LOGIK
    function computeBreaks(data, method) {
        const vals = data.features
            .map(f => parseFloat(getProp(f.properties, ['tasa_promedio', 'Tax_rate', 'Wert'])) || 0)
            .sort((a, b) => a - b);
        const min = vals[0], max = vals[vals.length - 1];
        
        if (method === 'equal') {
            return Array.from({ length: 6 }, (_, i) => min + (i * (max - min) / 5));
        } else if (method === 'quartiles') {
            return [
                vals[0],
                vals[Math.floor(vals.length * 0.2)],
                vals[Math.floor(vals.length * 0.4)],
                vals[Math.floor(vals.length * 0.6)],
                vals[Math.floor(vals.length * 0.8)],
                vals[vals.length - 1]
            ];
        } else {
            return [
                min,
                vals[Math.floor(vals.length * 0.1)],
                vals[Math.floor(vals.length * 0.3)],
                vals[Math.floor(vals.length * 0.6)],
                vals[Math.floor(vals.length * 0.85)],
                max
            ];
        }
    }

    function getColorIndex(v, brk) {
        for (let i = 0; i < 5; i++) if (v >= brk[i] && v <= brk[i + 1]) return i;
        return 4;
    }

    // 3. RENDERING UND KREUZINTERAKTION
    function renderMap(data) {
        if (!data) return;
        currentBreaks = computeBreaks(data, document.getElementById('classificationSelect').value);

        if (geojsonLayer) map.removeLayer(geojsonLayer);

        const palette = getPalette();

        geojsonLayer = L.geoJSON(data, {
            style: (f) => ({
                fillColor: palette[getColorIndex(
                    parseFloat(getProp(f.properties, ['tasa_promedio', 'Tax_rate', 'Wert'])) || 0,
                    currentBreaks
                )],
                weight: 1.5,
                color: 'rgba(255,255,255,0.8)',
                fillOpacity: 0.75
            }),
                        onEachFeature: (f, layer) => {
                const n = getProp(f.properties, ['nombre', 'name', 'NAME_1']);
                const t = parseFloat(getProp(f.properties, ['tasa_promedio', 'Tax_rate', 'Wert'])) || 0;

                // --- SOLO POPUP (AL HACER CLIC) ---
                const popupHTML = `
                    <div class="popup-header">${n || 'Unbekannt'}</div>
                    <div class="popup-body">
                        <span class="popup-label">Wert</span>
                        <span class="popup-val">${t.toFixed(1)}</span>
                    </div>
                `;
                layer.bindPopup(popupHTML, { className: 'custom-popup' });

                layer.on({
                    mouseover: (e) => {
                        const index = getColorIndex(t, currentBreaks);
                        resaltarBloqueLegenda(index);
                        layer.setStyle({ weight: 3, color: '#FFD700', fillOpacity: 0.9 });
                        layer.bringToFront();
                    },
                    mouseout: (e) => {
                        resetBloqueLegenda();
                        geojsonLayer.resetStyle(e.target);
                    },
                    click: () => {
                        document.getElementById('detailNAME_1').innerText = n || '--';
                        document.getElementById('detailTax_rate').innerText = t.toFixed(1);
                    }
                });
            }

                // POPUP AVANZADO (CLICK)
                const popupHTML = `
                    <div class="popup-header">${n || 'Unbekannt'}</div>
                    <div class="popup-body">
                        <span class="popup-label">Wert</span>
                        <span class="popup-val">${t.toFixed(1)}</span>
                    </div>
                `;
                layer.bindPopup(popupHTML, { className: 'custom-popup' });

                layer.on({
                    mouseover: (e) => {
                        const index = getColorIndex(t, currentBreaks);
                        resaltarBloqueLegenda(index);
                        layer.setStyle({ weight: 3, color: '#FFD700', fillOpacity: 0.9 });
                        layer.bringToFront();
                    },
                    mouseout: (e) => {
                        resetBloqueLegenda();
                        geojsonLayer.resetStyle(e.target);
                    },
                    click: () => {
                        document.getElementById('detailNAME_1').innerText = n || '--';
                        document.getElementById('detailTax_rate').innerText = t.toFixed(1);
                        // El popup se abre automáticamente por bindPopup
                    }
                });
            }
        }).addTo(map);

        updateLegend();
    }

    // 4. LEGENDE UND FARBSKALA
    function updateLegend() {
        let container = document.querySelector('.legend-horizontal');

        if (!container) {
            container = L.DomUtil.create('div', 'legend-horizontal');
            const lControl = L.control({ position: 'bottomright' });
            lControl.onAdd = () => container;
            lControl.addTo(map);
        }

        const palette = getPalette();

        let html = `<div class="legend-title">Farbskala</div>
                    <div class="legend-container">`;

        for (let i = 0; i < 5; i++) {
            html += `
            <div class="legend-item" id="leg-block-${i}">
                <div class="legend-color" style="background:${palette[i]};"></div>
            </div>`;
        }

        html += `</div>`;

        html += `<div class="legend-labels">`;
        for (let i = 0; i <= 5; i++) {
            const val = currentBreaks[i] !== undefined ? currentBreaks[i].toFixed(1) : '';
            html += `<span>${val}</span>`;
        }
        html += `</div>`;

        container.innerHTML = html;
    }

    // SYNCHRONISATIONSFUNKTIONEN
    window.resaltarBloqueLegenda = (index) => {
        const block = document.getElementById(`leg-block-${index}`);
        if (block) {
            block.firstElementChild.style.borderColor = "#FFD700";
            block.firstElementChild.style.borderWidth = "2px";
            block.firstElementChild.style.transform = "scale(1.1)";
            block.firstElementChild.style.boxShadow = "0 0 10px rgba(255,215,0,0.5)";
        }
    };

    window.resetBloqueLegenda = () => {
        for (let i = 0; i < 5; i++) {
            const block = document.getElementById(`leg-block-${i}`);
            if (block) {
                block.firstElementChild.style.borderColor = "rgba(255,255,255,0.2)";
                block.firstElementChild.style.borderWidth = "1px";
                block.firstElementChild.style.transform = "scale(1)";
                block.firstElementChild.style.boxShadow = "none";
            }
        }
    };

    // 5. LADEN UND SELEKTOREN
    document.getElementById('btnCargarGeoJSON').onclick = () => {
        // Efecto visual de carga en el botón
        const btn = document.getElementById('btnCargarGeoJSON');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'LADE DATEN...';
        btn.style.opacity = '0.7';

        fetch('Kantone.geojson')
            .then(r => r.json())
            .then(data => {
                currentData = data;
                renderMap(data);
                map.fitBounds(geojsonLayer.getBounds(), { padding: [30, 30] });

                const select = document.getElementById('labelSelect');
                select.innerHTML = '<option value="">Kanton auswählen...</option>';
                const nombres = data.features
                    .map(f => getProp(f.properties, ['nombre', 'name', 'NAME_1']))
                    .filter(n => n)
                    .sort();
                nombres.forEach(name => select.add(new Option(name, name)));
                
                // Restaurar botón
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
            })
            .catch(err => {
                console.error("Error cargando GeoJSON:", err);
                btn.innerHTML = 'FEHLER!';
                setTimeout(() => { btn.innerHTML = originalText; btn.style.opacity = '1'; }, 2000);
            });
    };

    document.getElementById('labelSelect').onchange = (e) => {
        const sel = e.target.value;
        if (!sel) return;

        geojsonLayer.resetStyle();

        geojsonLayer.eachLayer(layer => {
            const nombre = getProp(layer.feature.properties, ['nombre', 'name', 'NAME_1']);

            if (nombre === sel) {
                map.fitBounds(layer.getBounds(), { padding: [100, 100], maxZoom: 10 });

                const v = getProp(layer.feature.properties, ['tasa_promedio', 'Tax_rate', 'Wert']) || 0;

                document.getElementById('detailNAME_1').innerText = sel;
                document.getElementById('detailTax_rate').innerText = parseFloat(v).toFixed(1);

                layer.setStyle({ weight: 3, color: '#FFD700', fillOpacity: 0.9 });
                layer.openPopup(); // Abre el popup en lugar del tooltip
            }
        });
    };

    document.getElementById('classificationSelect').onchange = () => renderMap(currentData);
    document.getElementById('paletteSelect').onchange = () => renderMap(currentData);

    document.getElementById('baseMapSelect').onchange = (e) => {
        Object.values(baseLayers).forEach(l => map.removeLayer(l));
        baseLayers[e.target.value].addTo(map);
    };
});
