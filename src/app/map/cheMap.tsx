import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';

interface MapProps {
    latitude: any;
    longitude: any;
}

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
    useEffect(() => {

      const map = L.map("map").setView([latitude, longitude], 13);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/%7Bz%7D/%7Bx%7D/%7By%7D.png",
        {
          attribution: "&copy; OpenStreetMap contributors",
        }
      ).addTo(map);

      L.marker([latitude, longitude]).addTo(map).bindPopup("Ubicación de la propiedad");

      return () => {
        map.remove();
      };
    }, [latitude, longitude]);

    return <div id="map" style={{ height: "350px", width: "100%" }} />;
  };

// prueben que el mapa esta funcionando, la vida me hizo piola, no FrontEnd

export default Map;