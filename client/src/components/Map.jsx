import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const Map = () => {
    const location = useLocation();
    const {name} = location.state || undefined;
    const mapRef = useRef(null);
    const markersRef = useRef({});
    const mapInstance = useRef(null); // Ref to store the map instance

    useEffect(() => {
        if (mapInstance.current) {
            // If mapInstance is already set, no need to initialize again
            return;
        }

        // Initialize the map
        mapInstance.current = L.map(mapRef.current).setView([0, 0], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Created using leaflet and OpenStreetMap tiles'
        }).addTo(mapInstance.current);

        const socket = io('http://localhost:8000');

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    socket.emit('send-location', { latitude, longitude });
                },
                (error) => {
                    console.log('Geolocation error:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            console.log('Geolocation is not supported in this browser');
        }

        const markerIcon = L.icon({
            iconUrl: 'https://cdn2.iconfinder.com/data/icons/social-media-8/512/pointer.png',
            iconSize: [40, 40],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        socket.on('received', (data) => {
            const { id, latitude, longitude } = data;
            mapInstance.current.setView([latitude, longitude], 16);
            if (markersRef.current[id]) {
                markersRef.current[id].setLatLng([latitude, longitude]);
            } else {
                markersRef.current[id] = L.marker([latitude, longitude], { icon: markerIcon })
                    .addTo(mapInstance.current)
                    .bindPopup(`${name}`)
                    .openPopup();
            }
        });

        socket.on('user_disconnected', (id) => {
            if (markersRef.current[id]) {
                mapInstance.current.removeLayer(markersRef.current[id]);
                delete markersRef.current[id];
            }
        });

        return () => {
            socket.disconnect();
            // Cleanup map instance if needed
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, []);

    return (
        <div id='map' ref={mapRef} style={{ height: '100vh', width: '100vw' }}>Map</div>
    );
};

export default Map;
