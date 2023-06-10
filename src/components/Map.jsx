import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer } from 'ol/layer';
import { OSM } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import markerpng from '../icons/marker.jpg';

const MyMap = ({ latitude, longitude }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker = useRef(null);

  useEffect(() => {
    if (latitude && longitude) {
      if (!map.current) {
        map.current = new Map({
          target: mapContainer.current,
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          view: new View({
            center: fromLonLat([longitude, latitude]),
            zoom: 19,
          }),
        });

        marker.current = new Feature({
          geometry: new Point(fromLonLat([longitude, latitude])),
        });

        const vectorSource = new VectorSource({
          features: [marker.current],
        });

        const markerStyle = new Style({
          image: new Icon({
            src: markerpng,
            scale: 0.1,
          }),
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource,
          style: markerStyle,
        });

        map.current.addLayer(vectorLayer);
      } else {
        const markerGeometry = marker.current.getGeometry();
        markerGeometry.setCoordinates(fromLonLat([longitude, latitude]));
        map.current.getView().setCenter(fromLonLat([longitude, latitude]));
      }
    }
  }, [latitude, longitude]);

  return <div style={{ width: '500px', height: '500px' }} ref={mapContainer}></div>;
};

export default MyMap;