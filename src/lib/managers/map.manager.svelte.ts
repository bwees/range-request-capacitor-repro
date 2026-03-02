import MapLibreGL from 'maplibre-gl';

class MapManager {
  map: MapLibreGL.Map | null = $state(null);

  isCentered: boolean = $state(false);

  // drawnRoutes: Route[] = $state([]);
  // selectedRoute: Route | null = $state(null);
  selectedDirectionId: string = $state('');

  mapWidth: number = $state(0);
  mapHeight: number = $state(0);

  registerMap(map: MapLibreGL.Map) {
    this.map = map;

    this.map.on('rotate', () => (this.isCentered = false));
    this.map.on('pitch', () => (this.isCentered = false));
    this.map.on('dragstart', () => (this.isCentered = false));

    return () => {};
  }

  unregisterMap() {
    this.map?.off('rotate', () => (this.isCentered = false));
    this.map?.off('pitch', () => (this.isCentered = false));
    this.map?.off('dragstart', () => (this.isCentered = false));

    this.map = null;
  }
}

// Persist mapManager across Svelte HMRs
let mapManager: MapManager;

if (import.meta.hot && import.meta.hot.data) {
  if (!import.meta.hot.data.mapManager) {
    import.meta.hot.data.mapManager = new MapManager();
  }
  mapManager = import.meta.hot.data.mapManager;
} else {
  mapManager = new MapManager();
}

export { mapManager };
