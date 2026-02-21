const ProfileSettings = () => {
  return (
    <div className="profile-section">
      <h2>Cài đặt</h2>
      <div className="settings-list">
        <div className="settings-item">
          <div>
            <p className="setting-title">Thay đổi mật khẩu</p>
            <p className="setting-desc">Cập nhật mật khẩu để bảo mật tài khoản</p>
          </div>
          <button className="btn-change">Thay đổi</button>
        </div>

        <div className="settings-item">
          <div>
            <p className="setting-title">Quản lý địa chỉ</p>
            <p className="setting-desc">Thêm hoặc chỉnh sửa địa chỉ giao hàng</p>
          </div>
          <button className="btn-change">Quản lý</button>
        </div>

        <div className="settings-item">
          <div>
            <p className="setting-title">Thông báo</p>
            <p className="setting-desc">Cài đặt các loại thông báo</p>
          </div>
          <button className="btn-change">Cài đặt</button>
        </div>

        <div className="settings-item danger">
          <div>
            <p className="setting-title">Đăng xuất</p>
            <p className="setting-desc">Thoát khỏi tài khoản của bạn</p>
          </div>
          <button className="btn-logout">Đăng xuất</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
