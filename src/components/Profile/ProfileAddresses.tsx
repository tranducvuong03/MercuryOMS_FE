import { useEffect, useState, type ChangeEvent, type FormEvent} from "react"
import { FaCheckCircle, FaEdit, FaMapMarkerAlt, FaPlus, FaTrash } from "react-icons/fa"
import { districtOptions, provinceOptions } from "../../data/vietnamLocations"
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Address } from "../../types/address"

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const defaultAddresses: Address[] = [
  {
    id: 1,
    label: "Nhà riêng",
    recipient: "Nguyễn Văn A",
    phone: "0912 345 678",
    street: "123 Đường Lê Lợi",
    district: "Quận 1",
    city: "Phường Bến Nghé",
    province: "ho-chi-minh",
    isDefault: true,
  },
  {
    id: 2,
    label: "Văn phòng",
    recipient: "Trần Thị B",
    phone: "0987 654 321",
    street: "456 Phố Hai Bà Trưng",
    district: "Quận 3",
    city: "Phường 6",
    province: "ho-chi-minh",
    isDefault: false,
  },
]

const emptyAddress = {
  label: "",
  recipient: "",
  phone: "",
  street: "",
  district: "",
  city: "",
  province: "",
}

const ProfileAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [mapQuery, setMapQuery] = useState("")
  const [mapSearch, setMapSearch] = useState("")
  const [mapResults, setMapResults] = useState<any[]>([])
  const [mapLoading, setMapLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: string; lon: string; display_name: string } | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.8231, 106.6297]) // TP.HCM
  const [mapZoom, setMapZoom] = useState(10)
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)
  const [formData, setFormData] = useState({ ...emptyAddress })

  useEffect(() => {
    const saved = localStorage.getItem("profileAddresses")
    if (saved) {
      setAddresses(JSON.parse(saved))
    } else {
      setAddresses(defaultAddresses)
    }
  }, [])

  useEffect(() => {
    if (addresses.length > 0) {
      localStorage.setItem("profileAddresses", JSON.stringify(addresses))
    }
  }, [addresses])

  useEffect(() => {
    const provinceLabel = provinceOptions.find(option => option.value === formData.province)?.label || ""
    const query = [formData.street, formData.city, formData.district, provinceLabel]
      .filter(Boolean)
      .join(", ")
    setMapQuery(query || "Việt Nam")
  }, [formData])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "province" ? { district: "" } : {}),
    }))
  }

  const parseNominatimAddress = (location: any) => {
    const address = location.address || {}
    const streetParts = [address.house_number, address.road, address.pedestrian, address.neighbourhood, address.suburb]
      .filter(Boolean)
      .join(" ")
    const street = streetParts || location.display_name || ""
    const ward = address.suburb || address.village || address.hamlet || ""
    const district = address.city_district || address.county || address.suburb || address.state_district || ""
    const city = address.city || address.town || address.village || address.hamlet || address.county || ""
    const vietnamState = address.state || ""
    const province = vietnamState.includes("Hồ Chí Minh")
      ? "ho-chi-minh"
      : vietnamState.includes("Hà Nội")
      ? "ha-noi"
      : vietnamState.includes("Đà Nẵng")
      ? "da-nang"
      : vietnamState.includes("Hải Phòng")
      ? "hai-phong"
      : vietnamState.includes("Cần Thơ")
      ? "can-tho"
      : vietnamState.includes("Đồng Nai")
      ? "dong-nai"
      : vietnamState.includes("Bình Dương")
      ? "binh-duong"
      : ""

    return {
      street,
      ward,
      district,
      city,
      province,
    }
  }

  const searchMapLocation = async () => {
    if (!mapSearch.trim()) {
      setMapResults([])
      return
    }

    setMapLoading(true)
    setMapResults([])

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=6&countrycodes=vn&addressdetails=1&q=${encodeURIComponent(
          mapSearch,
        )}`,
      )
      const data = await response.json()
      setMapResults(data || [])
    } catch {
      setMapResults([])
    } finally {
      setMapLoading(false)
    }
  }

  const reverseGeocode = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&accept-language=vi`
      )
      const data = await response.json()
      if (data && data.display_name) {
        return data.display_name
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error)
    }
    return null
  }

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng
        setMarkerPosition([lat, lng])
        setMapCenter([lat, lng])
        const address = await reverseGeocode(lat, lng)
        if (address) {
          setFormData(prev => ({
            ...prev,
            street: address,
          }))
          setSelectedLocation({
            lat: lat.toString(),
            lon: lng.toString(),
            display_name: address,
          })
        }
      },
    })
    return null
  }

  const handleSelectLocation = (location: any) => {
    const addressParts = parseNominatimAddress(location)
    setFormData(prev => ({
      ...prev,
      street: location.display_name || addressParts.street || prev.street,
      district: addressParts.district || prev.district,
      city: addressParts.ward || addressParts.city || prev.city,
      province: addressParts.province || prev.province,
    }))
    setSelectedLocation({
      lat: location.lat,
      lon: location.lon,
      display_name: location.display_name,
    })
    setMapQuery(location.display_name)
    setMapResults([])
    setMapSearch("")
  }

  const openForm = (address?: Address) => {
    if (address) {
      setEditingId(address.id)
      setFormData({
        label: address.label,
        recipient: address.recipient,
        phone: address.phone,
        street: address.street,
        district: address.district,
        city: address.city,
        province: address.province,
      })
    } else {
      setEditingId(null)
      setFormData({ ...emptyAddress })
    }
    setIsMapOpen(false)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setEditingId(null)
    setFormData({ ...emptyAddress })
    setIsMapOpen(false)
    setIsFormOpen(false)
  }

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = {
      id: editingId ?? Date.now(),
      label: formData.label.trim() || "Địa chỉ mới",
      recipient: formData.recipient.trim() || "",
      phone: formData.phone.trim() || "",
      street: formData.street.trim() || "",
      district: formData.district.trim() || "",
      city: formData.city.trim() || "",
      province: formData.province.trim() || "",
      isDefault: addresses.length === 0 || editingId === null ? true : addresses.find(a => a.id === editingId)?.isDefault ?? false,
    }

    setAddresses(prev => {
      const updated = editingId
        ? prev.map(address => (address.id === editingId ? next : address))
        : [next, ...prev.map(address => ({ ...address, isDefault: false }))]

      if (!updated.some(address => address.isDefault) && updated.length > 0) {
        updated[0] = { ...updated[0], isDefault: true }
      }

      return updated
    })

    closeForm()
  }

  const handleRemove = (id: number) => {
    setAddresses(prev => {
      const next = prev.filter(address => address.id !== id)
      if (!next.some(address => address.isDefault) && next.length > 0) {
        next[0] = { ...next[0], isDefault: true }
      }
      return next
    })
  }

  const handleSetDefault = (id: number) => {
    setAddresses(prev => prev.map(address => ({ ...address, isDefault: address.id === id })))
  }

  const availableDistricts = formData.province ? districtOptions[formData.province] ?? [] : []

  return (
    <div className="profile-section">
      <div className="addresses-header">
        <div>
          <h2>Quản lý địa chỉ</h2>
          <p className="section-description">
            Quản lý địa chỉ giao hàng của bạn, chọn quận/huyện và tỉnh/thành bằng dropdown.
          </p>
        </div>
        <button className="btn-primary btn-add" onClick={() => openForm()}>
          <FaPlus style={{ marginRight: 8 }} /> Thêm địa chỉ mới
        </button>
      </div>

      <div className="address-grid">
        {addresses.map(address => (
          <div key={address.id} className={`address-card ${address.isDefault ? "default" : ""}`}>
            <div className="address-card-top">
              <div>
                <p className="address-label">{address.label}</p>
                <p className="address-name">{address.recipient}</p>
              </div>
              {address.isDefault && (
                <span className="address-default">
                  <FaCheckCircle /> Mặc định
                </span>
              )}
            </div>
            <div className="address-details">
              <p>{address.phone}</p>
              <p>{address.street}, {address.city}, {address.district}</p>
              <p>{provinceOptions.find(option => option.value === address.province)?.label || address.province}</p>
            </div>
            <div className="address-actions">
              <button className="btn-secondary" onClick={() => openForm(address)}>
                <FaEdit style={{ marginRight: 6 }} /> Chỉnh sửa
              </button>
              <div>
                {!address.isDefault && (
                  <button className="btn-primary btn-small" onClick={() => handleSetDefault(address.id)}>
                    Đặt mặc định
                  </button>
                )}
                <button className="btn-danger btn-small" onClick={() => handleRemove(address.id)}>
                  <FaTrash style={{ marginRight: 6 }} /> Xoá
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="address-form-panel">
          <div className="form-panel-header">
            <h3>{editingId ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</h3>
            <button className="btn-secondary btn-close" onClick={closeForm}>
              Huỷ
            </button>
          </div>
          <form className="address-form" onSubmit={handleSave}>
            <div className="address-form-grid">
              <div className="form-group">
                <label>Tiêu đề địa chỉ</label>
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  placeholder="Ví dụ: Nhà riêng, Văn phòng"
                />
              </div>
              <div className="form-group">
                <label>Người nhận</label>
                <input
                  type="text"
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                  placeholder="Tên người nhận"
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0912 345 678"
                />
              </div>
              <div className="form-group form-group-map">
                <label>Địa chỉ chi tiết</label>
                <div className="map-input-row">
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Số nhà, đường, phường, quận..."
                  />
                  <button type="button" className="btn-secondary btn-map" onClick={() => setIsMapOpen(prev => !prev)}>
                    <FaMapMarkerAlt style={{ marginRight: 6 }} /> Chọn trên bản đồ
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Phường / Xã</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Nhập phường / xã"
                />
              </div>
              <div className="form-group">
                <label>Quận / Huyện</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                >
                  <option value="">Chọn quận/huyện</option>
                  {availableDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Thành phố / Tỉnh</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                >
                  <option value="">Chọn tỉnh/thành</option>
                  {provinceOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {isMapOpen && (
              <div className="map-panel">
                <div className="map-panel-header">
                  <div>
                    <p>Nhập tên đường, quận, thành phố để tìm vị trí. Chọn kết quả để tự động điền địa chỉ.</p>
                  </div>
                  <a
                    className="map-open-link"
                    href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Mở bản đồ chi tiết
                  </a>
                </div>
                <div className="map-search-row">
                  <input
                    type="text"
                    value={mapSearch}
                    onChange={e => setMapSearch(e.target.value)}
                    placeholder="Tìm kiếm địa chỉ trên bản đồ"
                  />
                  <button type="button" className="btn-primary btn-search" onClick={searchMapLocation}>
                    Tìm
                  </button>
                </div>
                {mapLoading && <p className="map-status">Đang tìm...</p>}
                {mapResults.length > 0 && (
                  <div className="map-results">
                    {mapResults.map(result => (
                      <button
                        key={result.place_id}
                        type="button"
                        className="map-result-item"
                        onClick={() => handleSelectLocation(result)}
                      >
                        <strong>{result.display_name.split(", ")[0]}</strong>
                        <span>{result.display_name}</span>
                      </button>
                    ))}
                  </div>
                )}
                <div className="map-iframe-wrapper">
                  <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapClickHandler />
                    {markerPosition && <Marker position={markerPosition} />}
                  </MapContainer>
                  <p className="map-instruction">Nhấp vào bản đồ để chọn vị trí. Địa chỉ sẽ được tự động điền.</p>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Lưu thay đổi" : "Lưu địa chỉ"}
              </button>
              <button type="button" className="btn-secondary" onClick={closeForm}>
                Huỷ
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ProfileAddresses
