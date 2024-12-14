# 사용자 선호도에 따른 러닝 코스 추천 서비스 🥇READY 2 RUN🥇
### 24-2 오픈소스소프트웨어프로젝트 Running Machines팀

<br>

<table>
  <tr>
    <td style="text-align: center;">경로추천</td>
    <td style="text-align: center;">커뮤니티</td>
  </tr>
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/675c0c01-8ec6-4c4e-bb01-726ceb70d0ef" alt="목업-기록-추천코스" width="200"/>
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/user-attachments/assets/0332cf1a-91f8-43da-8d3f-b61a4135803d" alt="목업-나의크루-공지" width="200"/>
    </td>
  </tr>
</table>

<br>


## 🏃‍➡️ 팀원 소개

|[정호원](https://github.com/DONGSANSUNJAE)| [박서영](https://github.com/Seoyoung2222) | [설현아](https://github.com/hyeona01) |              [양희진](https://github.com/jjin70)  | [최주원](https://github.com/Juwon-Choe) |
| :------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: |:-----------------------------------------------------------------------------------------: |
|  팀장 <br /> 데이터 분석  |  백엔드  |  프론트엔드, UIUX 디자인  |  백엔드  |  UIUX 디자인  | 
|  통계학과  |  경영정보학과  |  융합보안학과  |  산업시스템공학과  |  경영정보학과  | 

<br>


## 📅 개발 기간

2024.09.02 ~ 2024.12.11

<br>

 
## 💻 프로젝트 소개
'Ready 2 Run'은 **사용자의 선호도**를 기반으로 **맞춤형 러닝 코스**를 추천하는 서비스이다.<br />
더불어, **전체 사용자**를 대상으로 한 `러닝화 추천`, `마라톤 일정`, `함께 달려요`의 커뮤니티로 사용자 간 소통을 도모한다.<br />
**크루 사용자**를 대상으로 `내 크루의 활동 갤러리 및 공지사항`, `크루원들의 러닝 활동 조회`, `단체 채팅`의 기능으로 소속감을 제공하며 즐거운 러닝 생활을 돕는다.

<br>


## 📹 시연 영상

[🔗 실제 러닝 및 추천 시스템 반영 시연 영상](https://youtu.be/toloDRARm5A?si=1Qow1DmUy_fxUOz2)
<img width="900" alt="스크린샷 2024-12-11 오후 3 38 11" src="https://github.com/user-attachments/assets/f416b857-dc9d-4e59-ab20-458f951745b0">
 
 <br />

[🔗 전체 서비스 시연 영상](https://youtu.be/oZt4-3rxUDE?si=W1kNUoARySAnHNOk)
<img width="900" alt="스크린샷 2024-12-11 오후 3 38 46" src="https://github.com/user-attachments/assets/5ce44780-2f05-410f-a33e-969801a91694">

<br>


## ⏳ 개발 동기 및 목적

현대 사회에서 건강 관리와 자기 계발의 중요성이 대두됨에 따라 러닝이 많은 사람들에게 인기 있는 운동으로 자리 잡았고, 다양한 사람들이 자신만의 방식으로 러닝을 즐기고 있다. 하지만 초보 러너부터 숙련된 러너까지 겪고 있는 불편함과 어려움이 존재한다.

- 초보 러너
    - 경로 선택의 어려움: 본인에게 맞는 난이도의 러닝 코스를 찾기 힘들고, 주변 정보가 부족하다.
    - 커뮤니티 부재: 유사한 경험을 가지고 정보를 공유하거나 소통할 플랫폼이 없다.
- 숙련된 러너
    - 새로운 도전: 기존 단조로운 코스에서 벗어나 새로운 경로를 찾고 싶어 한다.
    - 동기 부여 및 소속감: 개인의 성장을 지원하며 함께 성장할 수 있는 플랫폼이 없다.

 본 프로젝트는 러닝 초보자를 포함한 다양한 실력의 러너가 겪는 위와 같은 문제를 해결하고, 한국 내 러닝 커뮤니티의 부재를 극복하기 위해 경로 추천 및 커뮤니티 기반의 러닝 앱을 개발하는 것을 목표로 한다. 사용자의 위치, 선호도, 과거 러닝 기록 등을 바탕으로 최적의 러닝 코스를 추천하고, 사용자가 직접 코스를 등록하거나 해시태그 기능을 통한 후기를 남길 수 있는 커뮤니티 기능을 제공 한다. 이를 통해 초보 러너들이 적합한 경로를 손쉽게 선택할 수 있도록 돕고, 서로의 경험을 공유하며 소통할 수 있는 플랫폼을 제공한다.
 
  <br>

## 🧶 개발 목표 및 범위
대한민국 서울 지역의 모든 러너를 대상으로 러닝 경로를 추천하며, 러닝 커뮤니티를 통해 모든 러너 및 러닝 크루원들 사이의 활발한 상호작용을 창출하는 것을 목표로 한다.

### (1) 개인 맞춤형 러닝 코스 추천 시스템

- 추천 시스템
    
    사용자의 현재 위치와 개인 선호도(러닝 경험, 편의시설 선호 여부, 환경 등)에 기반해 최적의 러닝 코스를 제공한다. 회원가입 시, 선호도를 조사해 사용자 맞춤형 경로를 설정한다. 
    
    카카오맵 API를 활용해 러닝 중 주변 건물과 편의시설 정보를 명확히 제공한다. 해외 앱의 경우 주변 지형 정보를 제대로 파악하지 못하는 한계를 극복하고, 세밀한 정보를 제공한다.
    
- 데이터 축적 및 활용
    
    사용자는 자신의 러닝 기록을 마이페이지에 저장할 수 있다. 후기와 함께 기록된 경로들은 군집화 알고리즘을 통해 다른 사용자들에게 추천 경로로 활용된다. 이는 사용자 경험을 적극 반영한 데이터베이스를 구축해, 개인화된 서비스를 제공하는 데 중점을 둔다.
    

### (2) 커뮤니티 기반의 사용자 상호작용 플랫폼

- 전체 사용자 커뮤니티
    
    사용자는 자신이 등록한 러닝 경로를 다른 사용자와 공유할 수 있다. 간단한 러닝 후기나 코스에 대한 정보를 포함하여 다른 사용자들과 공유할 수 있다. 이외에도 ‘러닝화 추천’, ‘마라톤 일정’, ‘함께 달려요’ 등의 다양한 게시판을 통해 사용자 간 소통을 도모한다. 특히, ‘함께 달려요’ 게시판은 사용자 간의 소통과 협력을 통해 동기부여를 제공하며, 초보 러너와 숙련 러너를 연결하는 다리 역할을 한다.
    
- 크루 커뮤니티
    
    크루 인증 절차를 통해 크루 내 공지사항과 활동 현황을 실시간으로 조회할 수 있다. 더불어 단체 채팅 기능을 제공해 크루원 간 소통을 원활하게 한다. 한국 사용자들이 익숙한 카카오톡 문화와 유사한 소통 방식을 도입해 사용자들이 쉽게 소속감을 느낄 수 있도록 한다. 또한, 크루 관리 기능을 통해 특정 경로에서의 러닝 어려움을 경고 아이콘으로 표시하거나, 경로별 인원 제한 정책을 통해 안전하고 편리한 러닝 환경을 제공한다.

<br />

## ✨ 경로 추천 알고리즘
(1) GPX 파일 고도 데이터를 이용하여 ‘누적 상승 고도’, ‘최대 고도 변화량’, ‘구간별 고도 변화율’, ‘평균 경사도’, ‘경사도 변동성’을 기준으로 하여 코스의 난이도를 3개의 군집으로 나눔(Beginner 86개, Advanced 87개, Expert 86개)

| beginner 예시 | expert 예시 |
| --- | --- |
| <img width="430" alt="스크린샷 2024-12-04 오후 3 51 48" src="https://github.com/user-attachments/assets/111b99f0-887b-45c0-8454-3bb13cd3bca8"> | <img width="430" alt="스크린샷 2024-12-04 오후 3 52 04" src="https://github.com/user-attachments/assets/6da29750-90d0-4b5f-a378-c8cc8ef8fdce"> |
 
<br>

(2) 공중 화장실과 편의점 위치 데이터를 이용하여 코스별 100m마다 500m를 반경 으로 하여 공중 화장실과 편의점의 개수 파악하여 3개의 군집으로 나눔(No Facilities 22개, Essential Facilities 118개, Enhanced Facilities 119개)

| 반경을 구하는 예시1 | 반경을 구하는 예시2 |
| --- | --- |
| <img width="427" alt="스크린샷 2024-12-04 오후 3 52 59" src="https://github.com/user-attachments/assets/7767db00-701d-4fbc-9990-8fc05cdd530e"> | <img width="427" alt="스크린샷 2024-12-04 오후 3 53 17" src="https://github.com/user-attachments/assets/5f481e15-0650-42ce-87ae-6a6de7c8ddae"> |

<br>

(3) GPX 파일 위도, 경도 데이터를 이용하여 경‘로의 중심에 가까운 포인트 비율’, ‘전체 경로의 길이’, ‘전체 경로의 모양’, ‘경로의 시작점과 끝점’을 기준으로 하여 코스 의 모양을 2개의 군집으로 나눔(Track 25개, Non Track 234개)

| Track 예시 | Non Track 예시 |
| --- | --- |
| <img width="420" alt="스크린샷 2024-12-04 오후 3 53 49" src="https://github.com/user-attachments/assets/ea3ed9a1-7924-4a83-b8ae-a20123d848e6"> | <img width="420" alt="스크린샷 2024-12-04 오후 3 54 05" src="https://github.com/user-attachments/assets/f52f57d2-11c7-49c5-86f8-ced1390a32d7"> |


<br>

(4) 앞선 군집을 기준으로 수집했던 러닝 코스 데이터의 이름을 다음과 같이 설정하 였음(초기 base running 코스 setting)
- 17_Beginner_No_Facilities_NonTrack
- 57_Beginner_Enhanced_Facilities_NonTrack

<br>

(5) 자신의 위치가 잠실(37.511989, 127.091)이고, 러닝 초보자이며, 트랙보다는 일반
경로를 선호하고 러닝 시, 적당한 편의 시설이 필요하다고 가정했을 때 사용자 위치 기준 전체 경로와 추천 경로를 다음과 같이 제시하였음

| 사용자 위치 기준 전체 경로 | 사용자 위치 기준 추천 경로 |
| --- | --- |
| <img width="420" alt="스크린샷 2024-12-04 오후 3 55 10" src="https://github.com/user-attachments/assets/2fb8db1d-7b9b-4418-bbf7-9f908be17096"> | <img width="420" alt="스크린샷 2024-12-04 오후 3 55 24" src="https://github.com/user-attachments/assets/910dd9aa-b125-4072-8b03-0dc00f982195"> |

 

## 🚀 주요 기능 요구사항 분석

| **사용자**        | **화면**          | **기능**           | **데이터 & 인터페이스** | **추가 설명**                                |
|-------------------|-------------------|--------------------|-------------------------|--------------------------------------------|
| **일반 회원**        | 회원가입 페이지   | 회원가입           | 이메일, 비밀번호, 닉네임, 프로필사진, 선호도(고도, 편의시설 여부, 자연/도심) 데이터를 입력받아 사용자 생성 | - |
|                   | 로그인 페이지     | 로그인             | 이메일, 비밀번호를 입력받아 사용자 정보 확인 | - |
|                   | 홈 페이지         | 오늘의 러닝 기록 및 크루 순위 확인 | 오늘 달린 거리, 평균 페이스, 소요 시간 표시<br>주별 총 거리 및 평균 페이스 기준 상위 3개 크루 표시 | - |
|                   | 크루 페이지       | 크루 조회 및 크루 가입 | 크루별 인원 수 및 커뮤니티 데이터(글, 댓글 등) 조회<br>크루 가입 인증 코드 검증 후 가입 진행 | 크루 회원이 아닐 경우 작성 권한 제한, 열람만 가능 |
|                   | 기록 페이지       | 러닝 코스 추천     | 현재 위치 기반 추천 코스 정보(이름, 경로, 거리, 태그) 제공<br>위도, 경도 데이터를 지도에 폴리라인으로 표시 | - |
|                   |                   | 러닝 기록          | 실시간 경로 추적 및 위도, 경도, 시간 데이터 저장<br>러닝 완료 시 총 거리, 시간, 페이스 계산 및 저장<br>코스 난이도와 태그 후기 입력 받아 업데이트 | - |
|                   | 마이 페이지       | 러닝 기록 조회     | 일별 기록(거리, 시간, 페이스) 조회<br>주별, 월별 평균 기록 데이터 조회 | - |
|                   | 커뮤니티 페이지   | 전체 유저 커뮤니티 | 제목, 본문, 사진 데이터로 글 작성 및 업로드<br>댓글 입력 및 조회<br>게시판: 자유게시판/함께달려요/러닝화추천/마라톤일정 | - |
| **크루 회원**     | 나의 크루 페이지  | 크루 전용 커뮤니티 | 공지사항 및 갤러리 게시판에서 글/사진 업로드 및 조회<br>갤러리 게시판 댓글 작성 가능<br>크루원 간 러닝 기록(거리, 시간 등) 조회 | 크루 회원만 접근 가능 |

<br />

## 🔧 기술 스택

### Frontend
- **React**, **TypeScript**  
- **Tailwind CSS**, **Zustand**  
- **Axios**, **TanStack Query**  
- **Vercel**  

### Backend
- **SpringBoot**  
- **MySQL**
- **FastAPI**

### Data Analysis
- **Python**, **R**  

### Server
- **AWS EC2, S3, RDS**
- **Nginx**  



<br>

## 💼 전체 시스템 블록 다이어그램
<img width="800" alt="스크린샷 2024-12-04 오후 4 02 24" src="https://github.com/user-attachments/assets/847ca856-63c2-4a02-bdcd-19bfa21ad703">
<br>

## 🛳️ 플로우 차트
<img width="800" alt="스크린샷 2024-12-04 오후 4 02 44" src="https://github.com/user-attachments/assets/a4d49ba0-f33e-4f69-bcb3-2d0d62f33287">
<br>

## 💾 ERD
<img width="800" alt="스크린샷 2024-12-04 오후 4 03 19" src="https://github.com/user-attachments/assets/9f09bc18-a1c2-40b4-832f-00f1193bccb2">
<br>

<br>

## 🗂️ 디렉토리 구성
```
📦src
├── 📂ai
├── 📂backend
└── 📂frontend
```

<details>
  <summary><b>ai</b></summary>

  ```
📦ai
 ┣ 📂csv
 ┃ ┣ 📜final_conv.csv
 ┃ ┣ 📜final_streetlight.csv
 ┃ ┣ 📜final_toilet.csv
 ┃ ┗ 📜final_trafficlight.csv
 ┣ 📜llm_logic.py
 ┣ 📜main.py
 ┣ 📜off_path_check.py
 ┣ 📜path_naming.py
 ┗ 📜runningmachine.py
```
</details>

<details>
  <summary><b>backend</b></summary>

  ```
📦backend
 ┣ 📂gradle
 ┃ ┗ 📂wrapper
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂RunningMachines
 ┃ ┃ ┃ ┃ ┗ 📂R2R
 ┃ ┃ ┃ ┃ ┃ ┣ 📂domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂post
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂course
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂crew
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂board
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂post
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂gallery
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂notice
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┣ 📂global
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂s3
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂util
 ┃ ┃ ┃ ┃ ┃ ┗ 📜R2RApplication.java
 ┃ ┃ ┗ 📂resources
 ┃ ┃ ┃ ┗ 📜application.yml
 ┣ 📜.gitattributes
 ┣ 📜.gitignore
 ┣ 📜build.gradle
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┗ 📜settings.gradle
```
</details>

<details>
  <summary><b>frontend</b></summary>

  ```
📦frontend
 ┣ 📂public
 ┃ ┣ 📜R2R_logo.png
 ┃ ┣ 📜index.html
 ┃ ┣ 📜manifest.json
 ┃ ┣ 📜robots.txt
 ┃ ┣ 📜store.png
 ┃ ┗ 📜toilet.png
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜board.ts
 ┃ ┃ ┣ 📜course.ts
 ┃ ┃ ┣ 📜crew.ts
 ┃ ┃ ┣ 📜home.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜mypage.ts
 ┃ ┃ ┗ 📜running.ts
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┃ ┗ 📜.gitkeep
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┣ 📜BackIcon.svg
 ┃ ┃ ┃ ┣ 📜BigLogo.svg
 ┃ ┃ ┃ ┣ 📜CTOIcon.svg
 ┃ ┃ ┃ ┣ 📜CommentIcon.svg
 ┃ ┃ ┃ ┣ 📜CommunityIcon.svg
 ┃ ┃ ┃ ┣ 📜CourseCTA.svg
 ┃ ┃ ┃ ┣ 📜CrewIcon.svg
 ┃ ┃ ┃ ┣ 📜CrewPeopleIcon.svg
 ┃ ┃ ┃ ┣ 📜EndIcon.svg
 ┃ ┃ ┃ ┣ 📜FlagIcon.svg
 ┃ ┃ ┃ ┣ 📜HeartIcon.svg
 ┃ ┃ ┃ ┣ 📜HomeIcon.svg
 ┃ ┃ ┃ ┣ 📜MypageIcon.svg
 ┃ ┃ ┃ ┣ 📜NoticeIcon.svg
 ┃ ┃ ┃ ┣ 📜PopularIcon.svg
 ┃ ┃ ┃ ┣ 📜RecordIcon.svg
 ┃ ┃ ┃ ┣ 📜ReplyIcon.svg
 ┃ ┃ ┃ ┣ 📜RestartIcon.svg
 ┃ ┃ ┃ ┣ 📜RightArrowIcon.svg
 ┃ ┃ ┃ ┣ 📜ScrappedIcon.svg
 ┃ ┃ ┃ ┣ 📜SearchIcon.svg
 ┃ ┃ ┃ ┣ 📜SettingIcon.svg
 ┃ ┃ ┃ ┣ 📜SpinnerIcon.gif
 ┃ ┃ ┃ ┣ 📜StopIcon.svg
 ┃ ┃ ┃ ┣ 📜Store.svg
 ┃ ┃ ┃ ┣ 📜Toilet.svg
 ┃ ┃ ┃ ┣ 📜TrafficLight.svg
 ┃ ┃ ┃ ┗ 📜WriteIcon.svg
 ┃ ┃ ┗ 📂images
 ┃ ┃ ┃ ┣ 📜HomeBgImg.svg
 ┃ ┃ ┃ ┣ 📜logo.svg
 ┃ ┃ ┃ ┗ 📜play.svg
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜AlertModal.tsx
 ┃ ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┃ ┣ 📜CommentInput.tsx
 ┃ ┃ ┃ ┣ 📜GalleryComment.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜KakaoMap.tsx
 ┃ ┃ ┃ ┣ 📜Navbar.tsx
 ┃ ┃ ┃ ┣ 📜ProfileCard.tsx
 ┃ ┃ ┃ ┣ 📜Reply.tsx
 ┃ ┃ ┃ ┣ 📜RunningCalendar.tsx
 ┃ ┃ ┃ ┣ 📜ScrollToTop.tsx
 ┃ ┃ ┃ ┗ 📜Spinner.tsx
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┣ 📜CommnunityHeader.tsx
 ┃ ┃ ┃ ┣ 📜CommunityCard.tsx
 ┃ ┃ ┃ ┣ 📜CommunityList.tsx
 ┃ ┃ ┃ ┣ 📜MarathonCard.tsx
 ┃ ┃ ┃ ┗ 📜MarathonList.tsx
 ┃ ┃ ┣ 📂communityDetail
 ┃ ┃ ┃ ┣ 📜CommentsList.tsx
 ┃ ┃ ┃ ┗ 📜CommunityDetailInfo.tsx
 ┃ ┃ ┣ 📂communityWrite
 ┃ ┃ ┃ ┣ 📜CommunityWriteHeader.tsx
 ┃ ┃ ┃ ┗ 📜CommunityWriteInput.tsx
 ┃ ┃ ┣ 📂crewMemberDetail
 ┃ ┃ ┃ ┗ 📜CrewMemberDetailTitle.tsx
 ┃ ┃ ┣ 📂crewMembers
 ┃ ┃ ┃ ┣ 📜CrewMemberCard.tsx
 ┃ ┃ ┃ ┣ 📜CrewMemberSection.tsx
 ┃ ┃ ┃ ┗ 📜CrewMemberTitle.tsx
 ┃ ┃ ┣ 📂crewWrite
 ┃ ┃ ┃ ┣ 📜CrewWriteHeader.tsx
 ┃ ┃ ┃ ┗ 📜CrewWriteInput.tsx
 ┃ ┃ ┣ 📂galleryDetail
 ┃ ┃ ┃ ┗ 📜GalleryContents.tsx
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┃ ┣ 📜CrewRankingCard.tsx
 ┃ ┃ ┃ ┣ 📜DistanceRanking.tsx
 ┃ ┃ ┃ ┣ 📜HomeRecord.tsx
 ┃ ┃ ┃ ┗ 📜PaceRanking.tsx
 ┃ ┃ ┣ 📂myCrew
 ┃ ┃ ┃ ┣ 📜ContentsSection.tsx
 ┃ ┃ ┃ ┣ 📜GalleryCard.tsx
 ┃ ┃ ┃ ┣ 📜MyCrewProfile.tsx
 ┃ ┃ ┃ ┗ 📜NoticeCard.tsx
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📜Profile.tsx
 ┃ ┃ ┃ ┣ 📜RecentRecord.tsx
 ┃ ┃ ┃ ┗ 📜Stats.tsx
 ┃ ┃ ┣ 📂otherCrew
 ┃ ┃ ┃ ┗ 📜OtherCrewCard.tsx
 ┃ ┃ ┣ 📂otherCrewDetail
 ┃ ┃ ┃ ┣ 📜OtherCrewContents.tsx
 ┃ ┃ ┃ ┗ 📜OtherCrewProfile.tsx
 ┃ ┃ ┣ 📂record
 ┃ ┃ ┃ ┣ 📜BottomSheet.tsx
 ┃ ┃ ┃ ┣ 📜CourseCard.tsx
 ┃ ┃ ┃ ┣ 📜CourseSection.tsx
 ┃ ┃ ┃ ┣ 📜HomeCategory.tsx
 ┃ ┃ ┃ ┗ 📜Searchbar.tsx
 ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┣ 📜Step1.tsx
 ┃ ┃ ┃ ┣ 📜Step2.tsx
 ┃ ┃ ┃ ┣ 📜Step3.tsx
 ┃ ┃ ┃ ┗ 📜Step4.tsx
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜board.ts
 ┃ ┃ ┣ 📜course.ts
 ┃ ┃ ┣ 📜crew.ts
 ┃ ┃ ┗ 📜preference.ts
 ┃ ┣ 📂context
 ┃ ┃ ┗ 📜.gitkeep
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useAuth.ts
 ┃ ┃ ┣ 📜useBoard.ts
 ┃ ┃ ┣ 📜useCourse.ts
 ┃ ┃ ┣ 📜useCrew.ts
 ┃ ┃ ┣ 📜useHome.ts
 ┃ ┃ ┣ 📜useMypage.ts
 ┃ ┃ ┗ 📜useRunning.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Community
 ┃ ┃ ┃ ┗ 📜CommunityPage.tsx
 ┃ ┃ ┣ 📂CommunityDetail
 ┃ ┃ ┃ ┗ 📜CommunityDetailPage.tsx
 ┃ ┃ ┣ 📂CommunityWrite
 ┃ ┃ ┃ ┗ 📜CommunityWritePage.tsx
 ┃ ┃ ┣ 📂CrewChatting
 ┃ ┃ ┃ ┗ 📜CrewChattingPage.tsx
 ┃ ┃ ┣ 📂CrewMemberDetail
 ┃ ┃ ┃ ┗ 📜CrewMemberDetailPage.tsx
 ┃ ┃ ┣ 📂CrewMembers
 ┃ ┃ ┃ ┗ 📜CrewMembersPage.tsx
 ┃ ┃ ┣ 📂CrewWrite
 ┃ ┃ ┃ ┗ 📜CrewWritePage.tsx
 ┃ ┃ ┣ 📂GalleryDetail
 ┃ ┃ ┃ ┗ 📜GalleryDetailPage.tsx
 ┃ ┃ ┣ 📂Home
 ┃ ┃ ┃ ┗ 📜HomePage.tsx
 ┃ ┃ ┣ 📂MyCrew
 ┃ ┃ ┃ ┗ 📜MyCrewPage.tsx
 ┃ ┃ ┣ 📂Mypage
 ┃ ┃ ┃ ┗ 📜MyPage.jsx
 ┃ ┃ ┣ 📂NoticeDetail
 ┃ ┃ ┃ ┗ 📜NoticeDetailPage.tsx
 ┃ ┃ ┣ 📂OtherCrew
 ┃ ┃ ┃ ┗ 📜OtherCrewPage.tsx
 ┃ ┃ ┣ 📂OtherCrewDetail
 ┃ ┃ ┃ ┗ 📜OtherCrewDetailPage.tsx
 ┃ ┃ ┣ 📂Record
 ┃ ┃ ┃ ┗ 📜RecordPage.tsx
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┃ ┗ 📜ReviewPage.tsx
 ┃ ┃ ┣ 📂Running
 ┃ ┃ ┃ ┗ 📜RunningPage.tsx
 ┃ ┃ ┣ 📂Signin
 ┃ ┃ ┃ ┗ 📜SigninPage.tsx
 ┃ ┃ ┗ 📂Signup
 ┃ ┃ ┃ ┗ 📜SIgnupPage.tsx
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📜useCourseId.ts
 ┃ ┃ ┣ 📜useCourseStore.ts
 ┃ ┃ ┣ 📜useKakaomapStore.ts
 ┃ ┃ ┣ 📜useParsedCourse.ts
 ┃ ┃ ┣ 📜useRunningCourseStore.ts
 ┃ ┃ ┗ 📜useSelectedCourseStore.ts
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜RunningCalendar.css
 ┃ ┣ 📂types
 ┃ ┃ ┣ 📜board.ts
 ┃ ┃ ┣ 📜communityWrite.ts
 ┃ ┃ ┣ 📜course.ts
 ┃ ┃ ┣ 📜crew.ts
 ┃ ┃ ┣ 📜home.ts
 ┃ ┃ ┣ 📜kakaoMap.ts
 ┃ ┃ ┣ 📜mypage.ts
 ┃ ┃ ┣ 📜routes.ts
 ┃ ┃ ┣ 📜running.ts
 ┃ ┃ ┣ 📜signin.ts
 ┃ ┃ ┗ 📜signup.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜gpxParser.ts
 ┃ ┃ ┗ 📜validation.ts
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜react-app-env.d.ts
 ┃ ┣ 📜reportWebVitals.ts
 ┃ ┣ 📜router.tsx
 ┃ ┗ 📜setupTests.ts
 ┣ 📜.gitignore
 ┣ 📜README.md
 ┣ 📜craco.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜tailwind.config.js
 ┗ 📜tsconfig.json
```
</details>
<br>

## 👨‍🎓 기대효과
### 경제적 측면  
1. **헬스케어 시장 성장**  
   - 맞춤형 러닝 코스를 통해 러닝 문화를 대중화하고 헬스케어 및 웰니스 산업 성장 촉진.  

2. **지역 경제 활성화**  
   - 러닝 이벤트로 지역 상권 활성화 및 도시 브랜드 가치 상승.  

3. **비즈니스 기회 확대**  
   - 러닝 크루 통합 플랫폼을 통한 광고 및 협업 기회 제공.  

4. **데이터 활용**  
   - 러닝 데이터로 맞춤형 서비스 제공 및 헬스케어 비즈니스 모델 창출.  

### 사회적 측면  
1. **건강 증진**  
   - 러닝 참여 확대를 통해 건강한 라이프스타일과 지역 사회 건강 증진.  

2. **사회적 연대 강화**  
   - 커뮤니티 기능으로 소통과 협력 문화 증진.  

3. **포용적 러닝 문화**  
   - 초보자와 소외계층도 참여 가능한 지속 가능한 러닝 환경 조성.  

4. **공공 건강 기여**  
   - 데이터 기반 예방 의학 발전 및 의료 부담 감소.
<br>

## 📋 자료
- 회의록
  - [회의록](https://thisishyeona.notion.site/5c1c3f4da05d4cb0a90c471817076ac6)
- 이슈관리
  - [이슈 관리](https://github.com/CSID-DGU/2024-2-OSSProj-Running-Machines-04/issues)
- API 명세서
  - [API 명세서](https://thisishyeona.notion.site/API-2f1c22ec5e9a4bcea832ea6095215cfd?pvs=73)
- 보고서
  - [수행계획서](https://github.com/CSID-DGU/2024-2-OSSProj-Running-Machines-04/blob/main/doc/241015_6%EC%A3%BC%EC%B0%A8_%EC%88%98%ED%96%89%EA%B3%84%ED%9A%8D%EC%84%9C_%EB%B0%9C%ED%91%9C/Running%20Machines_04%20%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4SW%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%88%98%ED%96%89%EA%B3%84%ED%9A%8D%EC%84%9C_1016.pdf)
  - [중간보고서](https://github.com/CSID-DGU/2024-2-OSSProj-Running-Machines-04/blob/main/doc/241119_%EC%A4%91%EA%B0%84%EB%B3%B4%EA%B3%A0%EC%84%9C/Running%20Machines_04%20%EC%98%A4%ED%94%88%EC%86%8C%EC%8A%A4SW%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EC%A4%91%EA%B0%84%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf)
  - [최종보고서]()
- 발표자료
  - [수행 계획서 발표](https://github.com/CSID-DGU/2024-2-OSSProj-Running-Machines-04/blob/main/doc/241015_6%EC%A3%BC%EC%B0%A8_%EC%88%98%ED%96%89%EA%B3%84%ED%9A%8D%EC%84%9C_%EB%B0%9C%ED%91%9C/Running%20Machines_04_%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C_1016.pdf)
  - [중간 발표](https://github.com/CSID-DGU/2024-2-OSSProj-Running-Machines-04/blob/main/doc/241113_%EC%A4%91%EA%B0%84%EB%B0%9C%ED%91%9C.pdf)
  - [최종 발표](https://github.com/CSID-DGU/2024-2-OSSProj-Running-Machines-04/blob/main/doc/241210_%EC%B5%9C%EC%A2%85%EB%B0%9C%ED%91%9C.pdf)
