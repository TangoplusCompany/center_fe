# 에러 정의
- 센터 기기 조회 API에서 올바른 값을 입력해도 401 UnAuth 에러 발생

## 어떤 값을? (Given)
accessToken: 234203f20.2kf20ofk20f2f0.kf202;

## 어떤 코드에? (When)
fetch("/api/center/device", {
	method: "GET",
	header: {
		"Authorization": `Bearer ${accessToken}`
	}
})

## 어떻게 출력되었는지? (Then)
### 예상
deviceInfo: [
	{
		...기기정보들
	}
]
### 실제코드
401 Error - UnAuthorization