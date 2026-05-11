import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // Lấy hàm login từ Context
  const { login } = useAuth(); 

  const handleLogin = (e) => {
    e.preventDefault();

    // Xử lý đăng nhập cho Sinh viên
    if (email === 'student@edu.vn' && password === '123456') {
      login({ 
        id: "SV001", 
        name: "Kiệt", 
        email: email, 
        role: "STUDENT" 
      });
      navigate('/dashboard'); 
    } 
    // Xử lý đăng nhập cho Giáo viên
    else if (email === 'teacher@edu.vn' && password === '123456') {
      login({ 
        id: "GV001", 
        name: "Thầy Bình", 
        email: email, 
        role: "LECTURER" 
      });
      navigate('/lecturer-dashboard'); 
    } 
    // Báo lỗi nếu sai
    else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="login-container">
      <div className="wrapper">
        <div className="logo-box">
          <i className="fa-solid fa-graduation-cap"></i>
          <h1 className="title">67ELEARNING</h1>
          <b className="subtitle">Sáu bảy là học hết sảy!</b>
        </div>
        
        <div className="login-card">
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <div className="input-wrapper">
                <i className="fa-regular fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="student@edu.vn" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Mật khẩu</label>
              <div className="input-wrapper">
                <i className="fa-solid fa-lock"></i>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">Đăng nhập</button>
          </form>

          <div className="divider"></div>

          <div className="demo-text">Tài khoản demo:</div>
          <div className="demo-buttons">
            <button 
              type="button" 
              className="btn-demo btn-student"
              onClick={() => {
                setEmail('student@edu.vn');
                setPassword('123456');
              }}
            >
              👨‍🎓 Sinh viên
            </button>
            <button 
              type="button" 
              className="btn-demo btn-teacher"
              onClick={() => {
                setEmail('teacher@edu.vn');
                setPassword('123456');
              }}
            >
              👩‍🏫 Giáo viên
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;