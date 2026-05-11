import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Khởi tạo user an toàn với try-catch để tránh lỗi parse JSON
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('currentUser');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Lỗi khi đọc dữ liệu đăng nhập:", error);
            return null;
        }
    });

    // Hàm Đăng nhập
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
    };

    // Hàm Đăng xuất
    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        // Có thể thêm lệnh redirect về trang chủ ở đây
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);