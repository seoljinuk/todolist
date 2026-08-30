# WORKFLOW.md (작업 순서)

이 문서는 `todolist` 앱을 구현하기 위한 작업 순서(계획)와 설계 결정을 기록합니다.

## 요구사항 (Requirements)

- HTML, CSS, JavaScript만 사용 (No frameworks/libraries, no build step)
- 할 일 추가 / 완료 처리 / 수정 / 삭제 기능 (Add / complete / edit / delete tasks)
- 새로고침 후에도 데이터 유지 (Persist data across page reloads via LocalStorage)

## 작업 순서 (Planned steps)

1. **문서 초안 작성 (Docs scaffold)** — `README.md`, `CLAUDE.md`, `WORKFLOW.md` 생성 (현재 단계, Current step)
2. **HTML 구조 작성 (Markup)** — `index.html`에 입력창, 추가 버튼, 할 일 목록(list) 영역 구성
3. **스타일 작성 (Styling)** — `style.css`에 레이아웃, 완료 항목 표시(취소선 등), 반응형 스타일 적용
4. **로직 구현 (Logic)** — `script.js`에서
   - 할 일 추가 (Add task)
   - 완료 토글 (Toggle complete)
   - 할 일 수정 (Edit task)
   - 할 일 삭제 (Delete task)
   - LocalStorage 저장/불러오기 (Save/load via LocalStorage)
5. **동작 확인 (Manual testing)** — 브라우저에서 직접 열어 추가/수정/삭제/새로고침 시나리오 확인
6. **문서 업데이트 (Docs update)** — 구현 후 README.md/CLAUDE.md 내용을 실제 구현에 맞게 보완

## 설계 결정 (Design decisions)

- **입력/수정: multiline** — 할 일 추가는 `<textarea>`로, 수정도 (텍스트 더블클릭 또는 "수정" 버튼 시) `<textarea>` 기반 편집 모드로 전환. `Enter`는 줄바꿈으로 남기고, 제출/저장은 버튼 클릭 또는 `Ctrl+Enter` 단축키로 처리 (single-line `<input>`이었다면 Enter가 줄바꿈을 만들 수 없어 요구사항을 만족하지 못함).
- **삭제 확인 (confirm)** — 개별 삭제와 완료 항목 일괄 삭제 모두 `window.confirm()`으로 사용자 확인을 받은 뒤에만 실행. 실수로 인한 삭제를 방지하기 위함.
- **수정 UX: blur 대신 명시적 저장/취소 버튼** — 최초 구현은 `input` blur 시 자동 저장이었으나, 저장/취소 버튼 클릭 시 blur가 먼저 발생해 DOM이 재렌더링되며 클릭 이벤트가 유실될 수 있는 문제가 있어, `editingId` 상태값으로 편집 모드를 명시적으로 관리하고 저장/취소 버튼 + `Ctrl+Enter`/`Esc` 단축키로 전환.
- **파일로 내보내기 (Export to file)** — 별도 백엔드 없이 클라이언트에서 `Blob` + `<a download>`로 현재 할 일 목록을 JSON 파일(`todolist-export-<timestamp>.json`)로 다운로드. JSON을 택한 이유는 멀티라인 텍스트를 손실 없이 보존하기 위함.

## 진행 상태 (Status)

- [x] 1. 문서 초안 작성 (Docs scaffold)
- [x] 2. HTML 구조 작성
- [x] 3. 스타일 작성
- [x] 4. 로직 구현 (멀티라인 입력/수정, 삭제 confirm, 파일 내보내기 포함)
- [ ] 5. 동작 확인 (샌드박스에 헤드리스 브라우저 실행 환경이 없어 실제 브라우저 확인은 미완료 — 정적 파일 서빙만 curl로 확인함)
- [ ] 6. 문서 업데이트
