# 기기 간 동기화 설정 (Firebase, 약 10분)

로그인한 계정 하나로 휴대폰·태블릿·PC의 공부 기록을 자동으로 합쳐 줍니다. Firebase 무료 요금제(Spark)로 충분합니다.
설정하기 전에도 앱은 지금처럼 이 기기에만 저장되며 정상 동작합니다.

## 1. Firebase 프로젝트 만들기
1. https://console.firebase.google.com 에서 **프로젝트 추가** (Google Analytics는 꺼도 됩니다).
2. 프로젝트 홈에서 **웹 앱(`</>`) 추가** → 앱 닉네임 입력 → **앱 등록**.
3. 화면에 나온 `firebaseConfig = { ... }` 안의 값을 복사해 둡니다.

## 2. 로그인 방식 켜기
**빌드 → Authentication → 시작하기 → Sign-in method**
- **이메일/비밀번호** 사용 설정
- (선택) **Google** 사용 설정

**Authentication → 설정 → 승인된 도메인**에 앱 주소를 추가합니다. 예: `내아이디.github.io` (`localhost`는 기본 포함)

## 3. Firestore 만들기
1. **빌드 → Firestore Database → 데이터베이스 만들기** → 위치 `asia-northeast3 (서울)` → **프로덕션 모드**로 시작.
2. **규칙** 탭에 아래 내용을 붙여 넣고 **게시**합니다. (본인 계정의 데이터만 읽고 쓸 수 있게 하는 규칙입니다.)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/data/{docId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

## 4. 앱에 연결하기
`sync-config.js`의 `null`을 1단계에서 복사한 값으로 바꿔 GitHub에 올립니다.

```js
window.SC_FIREBASE_CONFIG = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  appId: "..."
};
```
(`apiKey`는 비밀번호가 아니라 프로젝트 식별용이라 공개 저장소에 있어도 됩니다. 보안은 3단계의 규칙이 담당합니다.)

## 5. 사용하기
앱의 **목표 설정 → 기기 간 동기화**에서 회원가입/로그인합니다. 다른 기기에서도 같은 계정으로 로그인하면 됩니다.
- 처음 로그인할 때 이 기기에 있던 기록이 계정으로 올라가고, 계정에 이미 있던 기록과 합쳐집니다.
- 한 기기에서 삭제한 기록은 다른 기기에서도 삭제됩니다.
- 오프라인에서 기록해도 괜찮습니다. 연결되면 자동으로 동기화됩니다.
- 실행 중인 타이머는 기기별로 따로 동작하며 동기화되지 않습니다. 정지 후 저장한 기록만 동기화됩니다.

## 주의
- 앱을 업데이트할 때 `sync-config.js`는 덮어쓰지 마세요. (설정이 지워집니다.)
- 브라우저의 "사이트 데이터 삭제"는 이 기기의 기록을 지웁니다. 동기화/백업이 되어 있지 않다면 복구할 수 없습니다.
