module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Bạn có thể thêm các rule tùy chỉnh ở đây nếu muốn
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
  },
};
