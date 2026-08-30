# Todolist App (사용 설명서)

HTML, CSS, JavaScript만으로 구현된 순수 프론트엔드(Vanilla) Todolist 애플리케이션입니다.
별도의 빌드 과정이나 서버(백엔드) 없이 브라우저에서 바로 실행할 수 있습니다.

## 소개 (Overview)

- 할 일(Task)을 추가, 수정, 삭제, 완료 처리할 수 있는 간단한 Todolist입니다.
- No build step, no backend — `index.html`을 브라우저로 열기만 하면 동작합니다.

## 실행 방법 (How to run)

1. 이 디렉토리(`todolist/`)에 있는 `index.html` 파일을 브라우저(Chrome, Edge 등)에서 직접 엽니다.
2. 또는 로컬 정적 서버로 실행하고 싶다면 아래 명령어를 사용합니다.

```bash
cd src/exercise/seoljinuk/todolist
python3 -m http.server 5500 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:5500/` 접속.

## 주요 기능 (Features)

- 할 일 추가 (Add task) — 여러 줄(multiline) 입력 가능, `Ctrl+Enter`로 빠르게 추가
- 할 일 완료 체크 (Toggle complete)
- 할 일 수정 (Edit task) — 텍스트를 더블클릭하거나 "수정" 버튼 클릭 시 여러 줄 편집기(textarea)로 전환, `Ctrl+Enter` 저장 / `Esc` 취소
- 할 일 삭제 (Delete task) — 삭제 전 `confirm` 대화상자로 사용자 확인을 거쳐야만 삭제됨 (완료 항목 일괄 삭제도 동일)
- 파일로 내보내기 (Export to file) — "파일로 내보내기" 버튼으로 현재 할 일 목록을 JSON 파일로 다운로드/기록
- 브라우저 로컬 저장소(LocalStorage)를 이용한 데이터 저장 (새로고침해도 목록 유지)

## 파일 구성 (File structure)

```
todolist/
├── README.md      # 사용 설명서 (this file)
├── CLAUDE.md       # 전체적인 설명 (project overview for Claude Code)
├── WORKFLOW.md     # 작업 순서 (build workflow / decisions)
├── index.html      # 메인 HTML
├── style.css       # 스타일시트
└── script.js       # 동작 로직 (JavaScript)
```

## 파일로 내보내기 상세 (Export to file details)

"파일로 내보내기" 버튼을 누르면 현재 할 일 목록(완료 여부 포함)이 `todolist-export-<타임스탬프>.json` 파일로 다운로드됩니다.
브라우저 다운로드 폴더에서 확인할 수 있으며, 별도의 백엔드 없이 클라이언트에서 `Blob` + 다운로드 링크로 생성됩니다.
