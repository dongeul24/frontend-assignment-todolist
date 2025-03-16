# 📌 To-Do List (Next.js + TailwindCSS)

## 📝 프로젝트 소개
Next.js, Tanstack Query, TailwindCSS를 활용하여 제작한 간단한 **To-Do List 웹 페이지**입니다. 사용자가 할 일을 추가, 수정, 삭제하고, 완료 여부를 변경할 수 있습니다. 또한, 페이지네이션 및 필터 기능을 제공하여 보다 편리한 UI/UX를 제공합니다.

---

## 📂 폴더 구조
```
📦 src
 ┣ 📂 app                  # Next.js App Router 관련 파일
 ┃ ┣ 📜 error.tsx          # 글로벌 에러 핸들링 컴포넌트
 ┃ ┣ 📜 loading.tsx        # 글로벌 로딩 컴포넌트
 ┃ ┣ 📜 layout.tsx         # 전체 레이아웃 설정
 ┃ ┣ 📜 page.tsx           # 홈 페이지
 ┃ ┣ 📜 providers.tsx      # React Query Provider 등 설정
 ┣ 📂 components
 ┃ ┣ 📂 layout             # 헤더, 푸터 등 레이아웃 관련 컴포넌트
 ┃ ┃ ┣ 📜 Header.tsx       # 헤더 컴포넌트
 ┃ ┃ ┣ 📜 Footer.tsx       # 푸터 컴포넌트
 ┃ ┣ 📂 todolist           # Todo 관련 UI 컴포넌트
 ┃ ┃ ┣ 📜 TodoList.tsx     # Todo 목록 표시
 ┃ ┃ ┣ 📜 TodoForm.tsx     # Todo 개별 항목
 ┃ ┃ ┣ 📜 TodoInput.tsx    # Todo 입력 필드
 ┃ ┃ ┣ 📜 TodoFilter.tsx   # 필터 기능
 ┃ ┃ ┣ 📜 TodoDetail.tsx   # Todo 상세 모달
 ┃ ┃ ┣ 📜 ModifyTodoButton.tsx  # 모바일에서 수정/삭제 버튼
 ┣ 📂 lib
 ┃ ┣ 📜 todoApi.ts         # JSON Server와 통신하는 API 함수들
 ┣ 📂 types
 ┃ ┣ 📜 Todo.ts            # Todo 데이터 타입 정의
 ┃ ┣ 📜 Pagination.ts      # 페이지네이션 타입 정의
 ┣ 📂 utils
 ┃ ┣ 📜 formatDate.ts      # 날짜 포맷 유틸리티 함수
 ┃ ┣ 📜 getPagination.ts   # 페이지네이션 계산 유틸리티 함수
 ┣ 📜 db.json              # JSON Server용 데이터베이스 파일
 ┣ 📜 eslint.config.mjs    # ESLint 설정 파일
 ┣ 📜 next.config.ts       # Next.js 설정 파일
 ┣ 📜 package.json         # 프로젝트 의존성 및 스크립트
 ┗ 📜 README.md            # 프로젝트 문서
```

---

## 🛠️ 기술 스택
### ✅ **Frontend**
- **Next.js** - React 기반의 프레임워크
- **TypeScript** - 정적 타입 시스템 사용
- **TailwindCSS** - 유틸리티 퍼스트 CSS 프레임워크
- **React Icons** - 아이콘 라이브러리
- **SweetAlert2** - 모달 및 알림창 UI
- **React Query (TanStack Query)** - 비동기 데이터 관리 
- **react-query-devtools** - tanstack query 사용 추적용(제거됨)

### ✅ **Backend (Mock Server)**
- **JSON Server** - 간단한 REST API Mock 서버

---

## ✨ 주요 기능
### 🔹 **기본 기능**
- 할 일 **추가 / 수정 / 삭제**
- 할 일 **완료 / 미완료** 토글
- 필터 기능 (전체, 완료, 미완료)
- 페이지네이션
- **모바일 최적화** (반응형 레이아웃 적용)

### 🔹 **추가 기능**
- ✅ **로딩 & 에러 처리** (`loading.tsx`, `error.tsx`)
- ✅ **모바일 환경**: 수정 기능을 상세 페이지에 적용 시킴. (상세페이지에서 수정 가능.)
- ✅ **모달 UI**로 세부 정보 확인 가능
- ✅ **삭제, 수정, 추가 시 확인 모달** (SweetAlert2 적용)
- ✅ **JSON Server 사용**으로 간단한 백엔드 구현 (Glitch 이용해서 서버 배포)

--

