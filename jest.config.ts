import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // TypeScript와 Jest 연결
  testEnvironment: 'jest-environment-jsdom', // React DOM을 테스트하기 위해 jsdom 사용
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Jest 설정 초기화 파일
  transformIgnorePatterns: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // 파일 확장자 지정
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Babel을 이용해 TS/JS 변환
  },
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/__mocks__/fileMock.js', // SVG 파일 Mock 처리
    '\\.css$': 'identity-obj-proxy', // CSS 파일 Mock 처리
  },
};

export default config;
