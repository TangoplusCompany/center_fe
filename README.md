# 탱고바디 관리자 페이지
탱고바디의 관리자 페이지 레포지토리 입니다. 
## 개요
탱고바디 관리자 페이지는 센터 관리자들이 사용하는 페이지로 사용자조회, 측정조회, 매니저관리, 센터관리 등 다양한 백오피스 업무를 볼 수 있는 페이지입니다.

## 기술 스택

|분야|기술 스택|
|---|---|
|Frontend|```React 19``` ```Next 15``` ```Typescript``` ```zustand``` ```tailwindCSS``` ```shadcn/ui``` ```tanstack-query``` ```zod``` ```react-hook-form``` ```qrcode.react``` |
|Backend|```node.js(Next 15 Server)``` ```PHP```|
|Infra|```vercel```|
|기타|```ESLint``` ```Prettier```|

## 폴더 구조
```
src/              # 루트 디렉토리
├── app/          # 페이지 디렉토리
├── components/   # 컴포넌트 디렉토리
├── css/          # 스타일 시트 디렉토리
├── hooks/        # 커스텀 훅 디렉토리
├── lib/          # 라이브러리 관련 디렉토리
├── provider/     # 프로바이더 관련 디렉토리
├── schemas/      # Form Schema 관련 디렉토리
├── services/     # API 디렉토리
├── store/        # zustand store 디렉토리
├── types/        # 타입 선언 디렉토리
├── utils/        # 유틸 함수 디렉토리
└── middleware    # 미들웨어
```

## 설치 및 실행 방법
탱고바디 관리자 페이지 프로젝트는 ```npm``` 과 ```pnpm``` 을 이용하여 ```modules``` 를 설치하고 실행할 수 있습니다.

### 1. 설치
```
# use npm
npm install

# use pnpm
pnpm add
```

### 2. 실행
```
# use npm
npm run dev

# use pnpm
pnpm dev
```

```
# https 사용시
const { createServer } = require("https");
const { createProxyServer } = require("http-proxy");
const fs = require("fs");

const proxy = createProxyServer({ target: "http://localhost:3632" });

# key와 cert는 본인의 인증 pem 파일에 맞게 사용하시면됩니다.
const options = {
  key: fs.readFileSync("./localhost+2-key.pem"),
  cert: fs.readFileSync("./localhost+2.pem"),
};

createServer(options, (req, res) => {
  proxy.web(req, res);
}).listen(4862, () => {
  console.log("🔐 HTTPS Proxy running at https://localhost:4862");
});

# 이후 해당 파일 node로 실행
# node 파일명.js
```
### 3. 빌드
```
# use npm
npm run build

# use pnpm
pnpm build
```

### 4. 배포
```Github```의 ```main branch``` 에 ```merge``` 할 경우 ```vercel```을 통해 자동 배포 됩니다.

추후 배포 환경 변경시 해당 환경에 맞게 배포를 진행하시면 됩니다.

## API 연동 및 환경변수 설명
API는 환경변수에 주소를 저장하고 사용중입니다. API 관련 문서는 ```Notion``` 을 참고해 주시기 바랍니다.

환경변수 예시는 다음과 같습니다.
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_FILE_URL=
NEXT_PUBLIC_KAKAO_URL=
TANGO_SECRET_KEY=
TANGO_SECRET_IV=
```


## 기타
```ESLint``` 와 ```prettier``` 로 코드 컨벤션을 준수하고 있습니다. 빌드시 에러가 발생할 수 있으니 컨벤션을 준수해 주시면됩니다.

현재 배포 환경은 ```vercel``` 입니다. 다만 무료로 사용중인만큼 트래픽에 대한 한계와 초과시 비용에 대한 문제가 발생할 수 있으니 추후 변경 바랍니다.