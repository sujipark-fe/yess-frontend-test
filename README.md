# YESS 프론트엔드 사전과제

- preview 경로: https://yess-frontend-test.vercel.app

<div align="center">
  <img src="https://github.com/user-attachments/assets/2e29e6d7-3887-4cbd-8cd8-485861deebf6" alt="cat viewer" width="800">
  <img src="https://github.com/user-attachments/assets/83773130-da99-4ba4-a86f-851ce9030f57" alt="working hour" width="800">
</div>

## 설명

개발 언어로는 React, TypeScript를 사용하였습니다.
빠른 실행을 위해 pnpm, Vite를 사용하였고,
최대한 라이브러리 사용을 자제하기 위해 버튼, 셀렉트 박스 등 UI 컴포넌트는 직접 개발하였습니다.
상태관리 툴로는 쉽고 간편하게 상태관리를 할 수 있는 zustand를 사용하였습니다.
스타일링 방식은 SCSS를 사용하였습니다.

## 패키지 버전

```
node v.20
```

## 설치

```
pnpm install
```

## 실행

```
pnpm dev
```

## 미구현된 부분

시간 부족으로 아래 항목들이 미구현 되었습니다.

CatViewer

- 이미지 클릭 시 이미지의 해당 위치에서 scale up/down 되는 부분

WorkingHours

- 평일의 기본 시간 셋팅
- 저장, 취소 기능
