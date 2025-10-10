# 🍽️ ServeNow

**매장의 주문과 결제를 하나의 흐름으로 관리할 수 있는 실시간 POS 시스템**

<img width="800" height="500" alt="랜딩 페이지" src="https://github.com/user-attachments/assets/10a6e1f3-1d39-4ef9-b6df-c19167a196ea" />

<br/><br/>

### 목차

- [1. 프로젝트 개요](#1-프로젝트-개요)
- [2. 시작하기](#2-시작하기)
- [3. 기술 스택](#3-기술-스택)
- [4. 주요 기능](#4-주요-기능)
- [5. 폴더 구조 및 라우팅 설계](#5-폴더-구조-및-라우팅-설계)

<br/>

---

## 1. 프로젝트 개요

### 프로젝트 소개

ServeNow는 매장에서 사용하는 POS 시스템을 웹으로 구현한 프로젝트입니다.  
직원은 테이블 현황을 실시간으로 확인하고, 주문 생성부터 서빙 완료, 결제까지 하나의 플랫폼에서 처리할 수 있습니다.

<br/>

### 기간

2025-09-07 ~ 진행 중

<br/>

### 팀 구성

- 프론트엔드 2명
- 백엔드 1명

<br/><br/>

## 2. 시작하기

### [🍽️ ServeNow 바로가기](https://serve-now.site/)

<br/>

### 테스트 계정

| 아이디     | 비밀번호    |
| ---------- | ----------- |
| `test1234` | `test1234*` |

<br/>

### 실행 방법

```bash
# 1. 클론
git clone https://github.com/your-repo/servenow.git

# 2. 패키지 설치
npm install

# 3. 개발 서버 실행
npm run dev
```

<br/><br/>

## 3. 기술 스택

| 구분       | 기술                                 |
| ---------- | ------------------------------------ |
| 프레임워크 | Next.js 15                           |
| 언어       | TypeScript                           |
| 상태 관리  | React Query, Zustand                 |
| UI         | shadcn/ui, TailwindCSS, Lucide Icons |
| 결제       | TossPayments SDK                     |
| 배포       | AWS                                  |
| 기타       | Axios, ESLint, Prettier              |

<br/><br/>

## 4. 주요 기능

<p >
  <img src="https://github.com/user-attachments/assets/20bc9e5c-c9cf-4fec-9305-967f20821d8e"
       width="600"
       alt="테이블 선택 → 메뉴 선택 → 주문 생성 → TossPayments 결제 → 서빙 완료 업데이트 흐름 데모" />
  <br/>
  <sub>주문 생성부터 결제 완료까지의 핵심 사용자 흐름</sub>
</p>

<br/>

### 테이블 관리

- 매장 내 모든 테이블의 상태(빈 테이블 / 주문 중 / 서빙 완료) 실시간 확인
- 실제 매장 구조에 맞게 테이블 개수 설정
- 테이블 클릭 시 주문 내역 모달로 세부 정보 확인

<br/>

### 상품 관리

- 메뉴 생성 및 수정
- 카테고리별 메뉴 분류 관리

<br/>

### 주문 관리

- 메뉴 선택 및 주문 생성
- 카테고리별 메뉴 필터링
- 장바구니 기능으로 여러 메뉴 동시 주문
- 주문 내역 조회 및 서빙 상태 확인

<br/>

### 결제

- TossPayments 연동 간편 결제
- 결제 완료 시 테이블 상태 자동 업데이트 (서빙 완료)

<br/><br/>

## 5. 폴더 구조 및 라우팅 설계

### 전체 폴더 구조

```
├── src/
│   ├── app/
│   │   ├── (private)/
│   │   │   └── pos/
│   │   │       └── (shell-layout)/       # 공통 레이아웃 적용
│   │   │           ├── payment/          # 결제 페이지
│   │   │           │   ├── success/      # 결제 성공
│   │   │           │   └── fail/         # 결제 실패
│   │   │           ├── products/         # 상품 관리
│   │   │           │   ├── [productId]/  # 개별 상품 상세
│   │   │           │   │   └── edit/     # 상품 수정
│   │   │           │   ├── @modal/       # 상품 모달 (추가/수정/카테고리)
│   │   │           │   │   ├── (.)new/
│   │   │           │   │   ├── (.)newCategory/
│   │   │           │   │   └── (.)[productId]/
│   │   │           │   ├── new/          # 새 상품 추가
│   │   │           │   └── newCategory/  # 새 카테고리 추가
│   │   │           │   └── page.tsx
│   │   │           └── tables/           # 테이블 관리
│   │   │               ├── [tableId]/
│   │   │               │   ├── @modal/
│   │   │               │   │   └── (.)orders/  # 주문 내역 모달
│   │   │               │   └── orders/         # 주문 내역 페이지
│   │   │               └── page.tsx
│   │   ├── api/                          # API Routes
│   │   ├── signup/                       # 회원가입 페이지
│   │   └── page.tsx                      # 홈 페이지
│   ├── components/                       # 재사용 UI 컴포넌트
│   ├── hooks/                            # 커스텀 훅
│   ├── lib/                              # axios 인스턴스, 유틸리티
│   ├── styles/                           # 전역 스타일 (Tailwind 등)
│   └─ types/                              # 타입 정의
└── public/                                # 정적 파일
```

<br/>

### 주요 디렉토리

| 디렉토리      | 설명                                       |
| ------------- | ------------------------------------------ |
| `app/`        | Next.js App Router 기반 페이지 구조        |
| `components/` | 재사용 가능한 UI 컴포넌트 (shadcn/ui 포함) |
| `hooks/`      | React Query 기반 커스텀 훅                 |
| `lib/`        | Axios 인스턴스, 유틸리티 함수              |
| `styles/`     | 전역 스타일 및 Tailwind 설정               |
| `types/`      | API 응답 및 전역 타입 정의                 |

<br/>

### 라우팅 구조

- **App Router 기반 폴더 라우팅**
  - `app/` 디렉토리 내에서 파일 및 폴더 이름이 자동으로 URL 경로로 매핑
- **Route Group으로 POS 영역 분리**
  - `(private)/pos/` 구조를 통해 `/pos` 내부의 페이지(테이블, 상품, 결제 등) 그룹화
- **공통 레이아웃 분리**
  - `(shell-layout)` 그룹을 사용해 POS 내 공통 헤더, 사이드바 등 레이아웃 구성
- **Intercepting Route & Parallel Routes로 모달 구현**
  - `@modal/(.)orders`, `@modal/(.)new` 등으로 기존 페이지 위에서 모달이 오버레이 구조로 구현
- **동적 라우팅**
  - `[tableId]`, `[productId]` 등 동적 세그먼트를 통해 개별 테이블·상품 상세 페이지 처리

<br/>

---

**✨ 자세한 기술 구현과 트러블슈팅 기록은 [Wiki](https://github.com/serve-now/serveEase-frontend/wiki)에서 확인할 수 있습니다.**

<br/>
