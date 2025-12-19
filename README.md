# 백화점 고객 설문조사 대시보드

Google Sheets API를 통해 백화점 고객 설문조사 데이터를 실시간으로 가져와 시각화하는 Next.js 대시보드입니다.

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **인증**: NextAuth.js v5 (Auth.js)
- **UI 라이브러리**: shadcn/ui (vega 스타일, orange 테마)
- **차트**: Recharts
- **Google API**: googleapis 패키지
- **스타일링**: Tailwind CSS

## 기능

- 📊 **KPI 카드**: 총 응답 수, 평균 별점, 재방문율
- 👥 **인구통계 분석**: 성별/연령대 분포 차트
- 🛍️ **방문 패턴 분석**: 방문 빈도 및 목적별 분석
- ⭐ **만족도 분석**: 5개 항목별 만족도 (Radar/Bar 차트)
- 💬 **피드백 분석**: 만족 서비스 TOP 5, 개선 필요 서비스 TOP 5, 별점 분포

## 설정 방법

### 1. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Google OAuth Credentials
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# Auth.js Secret (for session encryption)
AUTH_SECRET=your-random-secret-key

# For Vercel deployment
AUTH_TRUST_HOST=true

# Local development URL
AUTH_URL=http://localhost:3000
```

**AUTH_SECRET 생성 방법:**
```bash
openssl rand -base64 32
```

### 2. 서비스 계정 키 파일 준비

프로젝트 루트에 `dashboard-study-f4d1a77606c1.json` 파일이 있는지 확인하세요.

### 3. Google Sheets 공유 설정

스프레드시트에 서비스 계정 이메일(`dashboard-bot@dashboard-study.iam.gserviceaccount.com`)을 **뷰어** 또는 **편집자**로 공유해야 합니다.

### 4. Google OAuth 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에서 OAuth 2.0 클라이언트 ID 생성
2. **승인된 JavaScript 원본**: `http://localhost:3000` (개발), `https://your-domain.vercel.app` (배포)
3. **승인된 리디렉션 URI**: `http://localhost:3000/api/auth/callback/google` (개발), `https://your-domain.vercel.app/api/auth/callback/google` (배포)

### 5. 의존성 설치

```bash
npm install
```

### 6. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열면 로그인 페이지가 표시됩니다.

## 인증 및 보안

- **도메인 제한**: `@goldenrabbit.co.kr` 도메인의 구글 계정만 로그인 가능
- **세션 관리**: NextAuth.js를 통한 안전한 세션 관리
- **자동 리디렉션**: 미인증 사용자는 자동으로 로그인 페이지로 리디렉션

## 프로젝트 구조

```
dashboard/
├── app/
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 대시보드 메인 페이지
│   └── api/
│       └── sheets/
│           └── route.ts    # Google Sheets API 라우트
├── components/
│   ├── ui/                 # shadcn/ui 컴포넌트
│   └── dashboard/          # 대시보드 전용 컴포넌트
│       ├── kpi-cards.tsx
│       ├── demographics-chart.tsx
│       ├── visit-pattern-chart.tsx
│       ├── satisfaction-chart.tsx
│       └── feedback-section.tsx
├── lib/
│   ├── google-sheets.ts    # Google Sheets API 클라이언트
│   └── data-utils.ts       # 데이터 변환 및 통계 계산 유틸리티
└── dashboard-study-f4d1a77606c1.json  # 서비스 계정 키
```

## 데이터 구조

대시보드는 다음 데이터를 기대합니다:

- 타임스탬프
- 성별
- 연령대
- 방문 빈도
- 방문 목적 (복수 선택 가능)
- 만족도 항목 5개 (직원 친절도, 상품 구색, 매장 청결, 편의시설, 주차시설)
- 만족 서비스
- 개선 필요 서비스
- 전반적인 별점 (1-5)

## 배포 (Vercel)

### 환경 변수 설정

Vercel 대시보드에서 다음 환경 변수를 설정하세요:

- `AUTH_GOOGLE_ID`: 구글 클라이언트 ID
- `AUTH_GOOGLE_SECRET`: 구글 클라이언트 보안 비밀번호
- `AUTH_SECRET`: 세션 암호화용 비밀키
- `AUTH_TRUST_HOST`: `true`로 설정
- `AUTH_URL`: Vercel이 자동으로 감지하므로 설정 불필요 (선택사항)

### Google OAuth 리디렉션 URI 업데이트

Vercel 배포 후 생성된 도메인을 Google Cloud Console의 **승인된 리디렉션 URI**에 추가하세요:
- `https://your-app.vercel.app/api/auth/callback/google`

### 주의사항

- 서비스 계정 키 파일은 환경 변수로 관리하거나 안전한 방식으로 저장해야 합니다.
- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 .gitignore에 포함됨).

## 라이선스

MIT
