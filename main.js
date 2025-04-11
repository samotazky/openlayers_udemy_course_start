import './style.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import { fromLonLat } from 'ol/proj';
import { Overlay } from 'ol';

import ScaleLine from 'ol/control/ScaleLine.js';
import FullScreen from 'ol/control/FullScreen.js';
import MousePosition from 'ol/control/MousePosition.js';
import OverviewMap from 'ol/control/OverviewMap.js';
import ZoomSlider from 'ol/control/ZoomSlider.js';
import ZoomToExtent from 'ol/control/ZoomToExtent.js';

const map = new Map({
  view: new View({
    center: fromLonLat([19.699, 48.669]),
    zoom: 7,
    rotate: 0.5 
  }),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: "map",
  keyboardEventTarget: document,
  controls: [new ScaleLine(),
  new FullScreen(),
  new MousePosition(),
  new OverviewMap({
    collapsed: false, 
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ]
  }),
  new ZoomSlider(),
  new ZoomToExtent()
  ]
})

import { defaults as defaultControls } from 'ol/control';
console.log(defaultControls());

const popupContainerElement = document.getElementById("popup-coordinates")

const popup = new Overlay({
  element: popupContainerElement,
  positioning: "top-center"
})

map.addOverlay(popup)

map.on("click", (e) => {
  const clickedCoordinate = e.coordinate
  //popup.setPosition(undefined) // toto nie je momentálne potrebné
  popup.setPosition(clickedCoordinate)
  popupContainerElement.innerHTML = clickedCoordinate
})

// DragRotate Interaction
import DragRotate from 'ol/interaction/DragRotate.js';
import { altKeyOnly } from 'ol/events/condition.js';

const dragRotateInteraction = new DragRotate({
  condition: altKeyOnly
})
map.addInteraction(dragRotateInteraction)

// Draw Interaction
import Draw from 'ol/interaction/Draw.js';
import GeoJSON from 'ol/format/GeoJSON.js';

const drawInteraction = new Draw({
  type: "Polygon",
})
map.addInteraction(drawInteraction)


drawInteraction.on("drawend", (e) => {
  let parser = new GeoJSON()
  let drawnFeatures = parser.writeFeature(e.feature) 
  console.log(drawnFeatures);
})

//Map Controls
// nastavuje sa v Map

