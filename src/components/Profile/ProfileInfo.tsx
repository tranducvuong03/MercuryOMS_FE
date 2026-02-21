interface User {
  name: string
  email: string
}

interface ProfileInfoProps {
  user: User
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  return (
    <div className="profile-section">
      <h2>Thông tin cá nhân</h2>
      <div className="info-form">
        <div className="form-group">
          <label>Họ và tên</label>
          <input type="text" value={user.name} disabled />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} disabled />
        </div>
        <div className="form-group">
          <label>Số điện thoại</label>
          <input type="tel" placeholder="Nhập số điện thoại" />
        </div>
        <div className="form-group">
          <label>Địa chỉ</label>
          <input type="text" placeholder="Nhập địa chỉ" />
        </div>
        <button className="btn-update">Cập nhật thông tin</button>
      </div>
    </div>
  )
}

export default ProfileInfo
