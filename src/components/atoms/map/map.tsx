'use client'

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
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
})

type MapProps = {
  center?: L.LatLngExpression
  zoom?: number
  onLatLngChange?: (position: [number, number]) => void
  draggablePin?: boolean
  dragging?: boolean
  zoomControl?: boolean
  doubleClickZoom?: boolean
}

export function Map({
  center = [51, -0.09],
  zoom = 15,
  onLatLngChange,
  draggablePin = false,
  dragging = false,
  zoomControl = false,
  doubleClickZoom = false,
}: MapProps): ReactElement | null {
  function onChangeMarker(position: L.LatLngExpression): void {
    if ((position as [number, number])?.length !== 2) {
      return
    }

    onLatLngChange?.(position as [number, number])
  }

  return (
    <MapContainer
      center={center as L.LatLngExpression}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-[35vh] rounded-lg w-full"
      dragging={dragging}
      zoomControl={zoomControl}
      doubleClickZoom={doubleClickZoom}
    >
      {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
      <TileLayer
        attribution="Google Maps"
        url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
      />
      {center && (
        <DraggableMarker
          onChangeMarker={onChangeMarker}
          center={center}
          draggable={draggablePin}
        />
      )}
    </MapContainer>
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
}): ReactElement {
  const map = useMap()
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend(): void {
        const marker = markerRef.current as L.Marker | null
        if (marker != null) {
          const latLngExp: [number, number] = [
            marker.getLatLng().lat,
            marker.getLatLng().lng,
          ]
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
