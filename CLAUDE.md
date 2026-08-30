# CLAUDE.md

이 파일은 `todolist/` 디렉토리 작업 시 Claude Code(claude.ai/code)에게 제공하는 가이드입니다.
저장소 전체 규칙은 상위 `CLAUDE.md`(레포 루트)를 따르며, 이 문서는 이 exercise에 한정된 세부 설명입니다.

## 프로젝트 개요 (Project overview)

- 이름: Todolist App
- 목적: HTML, CSS, JavaScript(Vanilla JS)만으로 구성된 간단한 할 일 관리(Todolist) 웹 애플리케이션
- 빌드 시스템 / 패키지 매니저 없음 (No build tool, no package manager, no framework)
- 백엔드 없음 — 데이터는 브라우저 LocalStorage에 저장 (No backend — data persists via browser LocalStorage)

## 디렉토리 구조 (Directory structure)

```
todolist/
├── README.md      # 사용 설명서 (how to run / features)
├── CLAUDE.md       # 이 파일 (project guidance)
├── WORKFLOW.md     # 작업 순서 및 설계 결정 기록
├── index.html      # 진입점 HTML (entry point)
├── style.css       # 스타일 (styling)
└── script.js       # 애플리케이션 로직 (app logic)
```

## 실행 방법 (How to run)

`index.html`을 브라우저에서 직접 열거나, 정적 서버로 서빙합니다.

```bash
cd src/exercise/seoljinuk/todolist
python3 -m http.server 5500 --bind 127.0.0.1
```

## 설계 원칙 (Design principles)

- 외부 라이브러리/프레임워크 사용하지 않음 (No external libraries or frameworks)
- 상태(state)는 JavaScript 메모리 + LocalStorage로만 관리 (State kept in JS memory, persisted to LocalStorage)
- 다른 exercise 디렉토리를 참조하거나 의존하지 않음 (Self-contained, no cross-references to other exercises)

## 현재 상태 (Current status)

- 문서 파일(README.md, CLAUDE.md, WORKFLOW.md)만 먼저 생성된 상태이며, 실제 구현(index.html, style.css, script.js)은 아직 진행되지 않았습니다.
- Documentation-only scaffold stage — implementation files are not yet created.
