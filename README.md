# Study Compass (MVP)

## 포함 기능
- 오늘 공부 시간 기록 및 하루 목표
- 할 일 추가/완료 체크
- 과목별 이해도(1~5) 입력
- 과목별 공부 시간 요약
- 최근 7일 공부 시간 그래프
- 시험 점수 기록
- 주간 회고 메모
- 브라우저 LocalStorage 저장
- PWA 기본 manifest 및 service worker

## 실행
가장 간단하게는 `index.html`을 브라우저에서 열어 테스트할 수 있습니다.
PWA 설치 및 오프라인 캐시는 HTTPS로 제공되는 환경에서 동작합니다.

## 무료 배포
1. GitHub에서 새 공개 저장소를 만듭니다.
2. `index.html`, `manifest.webmanifest`, `sw.js`를 저장소 최상위에 업로드합니다.
3. 저장소 Settings → Pages → Deploy from a branch → `main` / root를 선택합니다.
4. 생성된 HTTPS 주소를 iPad/iPhone Safari 또는 Android Chrome에서 엽니다.
5. iOS는 공유 메뉴 → 홈 화면에 추가, Android는 브라우저 메뉴 → 앱 설치/홈 화면에 추가를 선택합니다.

## 데이터 안내
모든 기록은 현재 브라우저의 LocalStorage에 저장됩니다. 서버로 전송되지 않으며, 브라우저 데이터 삭제나 기기 변경 시 사라질 수 있습니다. 현재 버전은 로그인/기기 간 동기화를 제공하지 않습니다.
