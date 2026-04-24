// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Tính năng mới
        'fix', // Sửa lỗi
        'docs', // Tài liệu
        'style', // Format code (không thay đổi logic)
        'refactor', // Tái cấu trúc code
        'perf', // Cải thiện hiệu năng
        'test', // Viết unit test
        'chore', // Thay đổi nhỏ trong build system hoặc thư viện
        'revert', // Hoàn tác commit trước đó
      ],
    ],
    'subject-case': [0], // Cho phép viết hoa/thường tự do ở nội dung commit
  },
};
