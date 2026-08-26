import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FaCheckCircle, FaEdit, FaMapMarkerAlt, FaPlus, FaTrash } from "react-icons/fa"
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Address } from "../../types/address"
import { addressApi } from "../../services/address"

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const emptyAddress = {
  label: "",
  recipient: "",
  phone: "",
  street: "",
  district: "",
  city: "",
  province: "",
  isDefault: false,
}

const addressQueryKey = ["addresses"]

type AddressPayload = {
  id?: string
  label: string
  receiverName: string
  phone: string
  street: string
  district: string
  city: string
  province: string
  isDefault: boolean
}

const ProfileAddresses = () => {
  const [editingId, setEditingId] = useState<string>("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [mapQuery, setMapQuery] = useState("")
  const [mapSearch, setMapSearch] = useState("")
  const [mapResults, setMapResults] = useState<any[]>([])
  const [mapLoading, setMapLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: string; lon: string; display_name: string } | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([10.8231, 106.6297]) // TP.HCM
  const [mapZoom] = useState(10)
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null)
  const [formData, setFormData] = useState({ ...emptyAddress })
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState("")
  const queryClient = useQueryClient()

  const { data: addresses = [] } = useQuery<Address[]>({
    queryKey: addressQueryKey,
    queryFn: async () => {
      const res = await addressApi.getAddress()
      if (!res.isSuccess || !res.value) {
        throw new Error(res.message || "Không thể tải địa chỉ")
      }
      return res.value
    },
  })

  useEffect(() => {
    const query = [formData.street, formData.city, formData.province]
      .filter(Boolean)
      .join(", ")
    setMapQuery(query || "Việt Nam")
  }, [formData])

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target
    const name = target.name
    const nextValue = target instanceof HTMLInputElement && target.type === "checkbox"
      ? target.checked
      : target.value

    setFormData(prev => ({
      ...prev,
      [name]: nextValue,
    }))
  }

  const parseVietnamWard = (displayName: string) => {
    const wardMatch = displayName.match(/\b(?:Phường|Xã|Thị trấn)\s+[^,]+/i)
    return wardMatch?.[0]?.trim() || ""
  }

  const parseVietnamProvince = (displayName: string) => {
    const provinceMatch = displayName.match(/\b(?:Tỉnh|Thành phố|Tp\.?|TP\.?)\s+[^,]+/i)
    return provinceMatch?.[0]?.trim() || ""
  }

  const parseNominatimAddress = (location: any) => {
    const address = location.address || {}
    const streetParts = [address.house_number, address.road, address.pedestrian, address.neighbourhood, address.suburb]
      .filter(Boolean)
      .join(" ")
    const street = streetParts || location.display_name || ""
    const ward = parseVietnamWard(location.display_name || "") || address.ward || address.suburb || address.village || address.hamlet
    const district = address.city_district || address.county || address.state_district || ""
    const city = address.city || address.town || address.village || address.hamlet || address.county || ""
    const province = parseVietnamProvince(location.display_name || "") || address.state || ""

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
      return data || null
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
        const result = await reverseGeocode(lat, lng)

        if (result && result.display_name) {
          const addressParts = parseNominatimAddress(result)
          setFormData(prev => ({
            ...prev,
            street: result.display_name,
            city: addressParts.ward || prev.city,
            district: addressParts.district || prev.district,
            province: addressParts.province || prev.province,
          }))
          setSelectedLocation({
            lat: lat.toString(),
            lon: lng.toString(),
            display_name: result.display_name,
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
        recipient: address.receiverName,
        phone: address.phone,
        street: address.street,
        district: address.district,
        city: address.city,
        province: address.province,
        isDefault: address.isDefault,
      })
    } else {
      setEditingId("")
      setFormData({ ...emptyAddress, isDefault: addresses.length === 0 })
    }
    setSaveError("")
    setIsMapOpen(false)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setEditingId("")
    setFormData({ ...emptyAddress, isDefault: addresses.length === 0 })
    setSaveError("")
    setIsMapOpen(false)
    setIsFormOpen(false)
  }

  const saveAddressMutation = useMutation({
    mutationFn: async ({ payload, isEdit }: { payload: AddressPayload; isEdit: boolean }) => {
      const res = isEdit
        ? await addressApi.updateAddress(payload as any)
        : await addressApi.createAddress(payload as any)

      if (!res.isSuccess) {
        throw new Error(res.message || (isEdit ? "Không thể cập nhật địa chỉ." : "Không thể tạo địa chỉ mới."))
      }

      return {
        payload,
        savedAddress: isEdit ? payload : (res.value as Address | undefined) ?? payload,
        isEdit,
      }
    },
    onSuccess: ({ payload, savedAddress, isEdit }) => {
      queryClient.setQueryData<Address[]>(addressQueryKey, (prev = []) => {
        const next = isEdit
          ? prev.map(item =>
              item.id === payload.id
                ? { ...item, ...payload, isDefault: payload.isDefault ? true : item.isDefault }
                : item
            )
          : [{ ...(savedAddress as Address), isDefault: payload.isDefault || prev.length === 0 }, ...prev.map(item => ({ ...item, isDefault: false }))]

        if (payload.isDefault && isEdit) {
          return next.map(item => ({ ...item, isDefault: item.id === payload.id }))
        }

        return next
      })
      closeForm()
    },
    onError: (error: Error) => {
      setSaveError(error.message)
    },
    onSettled: () => {
      setIsSaving(false)
    },
  })

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSaving(true)
    setSaveError("")

    const shouldBeDefault = formData.isDefault || (!editingId && addresses.length === 0)
    const payload: AddressPayload = {
      id: editingId || undefined,
      label: formData.label.trim() || "Địa chỉ mới",
      receiverName: formData.recipient.trim(),
      phone: formData.phone.trim(),
      street: formData.street.trim(),
      district: formData.district.trim(),
      city: formData.city.trim(),
      province: formData.province.trim(),
      isDefault: shouldBeDefault,
    }

    saveAddressMutation.mutate({ payload, isEdit: Boolean(editingId) })
  }

  const handleRemove = (id: string) => {
    queryClient.setQueryData<Address[]>(addressQueryKey, (prev = []) => {
      const next = prev.filter(address => address.id !== id)
      return next.length > 0 ? next.map((address, index) => ({ ...address, isDefault: index === 0 && !next.some(item => item.isDefault) })) : next
    })
  }

  const handleSetDefault = async (id: string) => {
    const target = addresses.find(address => address.id === id)
    if (!target) return

    const payload: AddressPayload = {
      id,
      label: target.label,
      receiverName: target.receiverName,
      phone: target.phone,
      street: target.street,
      district: target.district,
      city: target.city,
      province: target.province,
      isDefault: true,
    }

    try {
      const res = await addressApi.updateAddress(payload as any)
      if (!res.isSuccess) {
        return
      }

      queryClient.setQueryData<Address[]>(addressQueryKey, (prev = []) =>
        prev.map(address => ({ ...address, isDefault: address.id === id }))
      )
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="profile-section">
      <div className="addresses-header">
        <div>
          <h2>Quản lý địa chỉ</h2>
          <p className="section-description">
            Quản lý địa chỉ giao hàng của bạn, nhập phường/xã và chọn tỉnh/thành.
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
                <p className="address-name">{address.receiverName}</p>
              </div>
              {address.isDefault && (
                <span className="address-default">
                  <FaCheckCircle /> Mặc định
                </span>
              )}
            </div>
            <div className="address-details">
              <p>{address.phone}</p>
              <p>{address.street}, {address.city}</p>
              <p>{address.province}</p>
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
                    placeholder="Số nhà, đường, phường, xã..."
                  />
                  <button type="button" className="btn-secondary btn-map" onClick={() => setIsMapOpen(prev => !prev)}>
                    <FaMapMarkerAlt style={{ marginRight: 6 }} /> Chọn trên bản đồ
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label>Thành phố / Tỉnh</label>
                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Nhập tỉnh/thành hoặc để bản đồ điền"
                />
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
            </div>

            <div className="form-group form-group-checkbox">
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                />
                <span>Đặt làm địa chỉ mặc định</span>
              </label>
            </div>

            {saveError && <p className="save-error">{saveError}</p>}

            {isMapOpen && (
              <div className="map-panel">
                <div className="map-panel-header">
                  <div>
                    <p>Nhập tên đường, phường/xã, tỉnh/thành để tìm vị trí. Chọn kết quả để tự động điền địa chỉ.</p>
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
                {!mapLoading && selectedLocation && (
                  <p className="map-status">Đã chọn: {selectedLocation.display_name}</p>
                )}
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
              <button type="submit" className="btn-primary" disabled={isSaving}>
                {isSaving ? "Đang lưu..." : editingId ? "Lưu thay đổi" : "Lưu địa chỉ"}
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
