import type { UserInfo } from "../../services/user"

interface ProfileInfoProps {
  user: UserInfo
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  return (
    <div className="profile-section">
      <h2>Thông tin cá nhân</h2>
      <div className="info-form">
        <div className="form-group">
          <label>Họ và tên</label>
          <input type="text" value={user.fullName} disabled />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={user.email} disabled />
        </div>
        <button className="btn-update">Cập nhật thông tin</button>
      </div>
    </div>
  )
}

export default ProfileInfo
