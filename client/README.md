# 🗳SelectionHistory - 우리나라 역대 대통령 선거 결과는?
지난 13대부터 20대 대통령 선거 결과 정보를 그래픽으로 제공합니다. 광역 단위 뿐만 아니라 세부 선거구 별 개표 결과까지 상세 페이지에서 보여줍니다.

<img width="1440" alt="스크린샷 2024-06-07 오전 12 50 45" src="https://github.com/TaehyeungKim/Presidential_Election/assets/85505622/e357055c-295f-4e85-9e3c-f2a28e3570ea">
<img width="1440" alt="스크린샷 2024-06-07 오전 12 51 04" src="https://github.com/TaehyeungKim/Presidential_Election/assets/85505622/0fda3002-c718-44b4-b543-360967326cb3">
<img width="1440" alt="스크린샷 2024-06-07 오전 12 51 34" src="https://github.com/TaehyeungKim/Presidential_Election/assets/85505622/a28596cc-5968-4f9b-b6a4-8bb6284dba97">

📌 Client: Typescript + React.js
📌 BackEnd: Python Flask
📌 Server: Linux Ubuntu

📌 WorkFlow: 실제 지난 20대 대통령 선거 개표 당시에는, 중앙선거관리위원회 홈페이지에 실시간으로 갱신되는 개표 현황 정보를 주기적으로 크롤링하여 서버의 엑셀 파일에 저장한 후, 클라이언트의 요청이 있을 시 해당 파일을 읽어와 사용자에게 정보를 제시하였습니다.(13-19대 대선 결과의 경우에는 미리 정적 데이터로 파일에 저장) Linux 서버의 crontab을 이용하여 크롤링이 주기적으로 실행될 수 있도록 설정하였습니다.

👇개표 당시(2022.3.21) 사이트 화면 녹화
https://github.com/TaehyeungKim/Presidential_Election/assets/85505622/93f61045-d39c-43a2-be78-723a12e1c62d


