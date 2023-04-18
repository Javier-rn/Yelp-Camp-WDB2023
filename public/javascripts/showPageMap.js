mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: campground.geometry.coordinates,
  zoom: 8,
});

new mapboxgl.Marker().setLngLat([-74.5, 40]).addTo(map);
