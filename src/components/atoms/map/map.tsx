import L from 'leaflet'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { ReactElement, useMemo, useRef, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

type MapProps = {
  center?: L.LatLngExpression
  zoom?: number
  onLatLngChange: (position: [number, number]) => void
}

export function Map({ center = [51, -0.09], zoom = 15, onLatLngChange }: MapProps): ReactElement {
  function onChangeMarker(position: L.LatLngExpression) {
    if ((position as [number, number])?.length !== 2) {
      return
    }

    onLatLngChange(position as [number, number])
  }

  return (
    <div>
      <MapContainer
        center={center as L.LatLngExpression}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-[35vh] rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {center && <DraggableMarker onChangeMarker={onChangeMarker} center={center} draggable />}
      </MapContainer>
    </div>
  )
}

function DraggableMarker({
  onChangeMarker,
  center,
  draggable = false,
}: {
  onChangeMarker: (position: L.LatLngExpression) => void
  center: L.LatLngExpression
  draggable?: boolean
}) {
  const map = useMap()
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current as L.Marker | null
        if (marker != null) {
          const latLngExp: [number, number] = [marker.getLatLng().lat, marker.getLatLng().lng]
          setPosition(latLngExp)
          onChangeMarker(latLngExp)
          map.setView(latLngExp)
        }
      },
    }),
    [markerRef, map, onChangeMarker],
  )

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  )
}
