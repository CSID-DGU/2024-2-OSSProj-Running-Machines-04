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

(6) ‘94_Advanced_Essential_Facilities_NonTrack’와 같이 초기에 설정해 두었던 gpx 파일 이름에 대해서 ‘94_Advanced_Essential_Facilities_NonTrack’_3.2Km‘와 같이 러닝 경로의 총거리를 추가하였음

(7) 본 프로젝트에서는 초기 기본적인 경로추천 알고리즘을 제작한 후 문제 사항을 발견한 후 다음과 같이 문제점에 대한 해결방안을 제시하였음 
먼저, 신호등과 같이 러닝 시 방해가 되는 요소를 고려했음. 이에, 서울시 신호등 위치를 수집하였고, gpx 경로 내에 모든 포인트에 대해서 1m 이내의 신호등 개수를 파악하였음. 신호등의 개수로 군집을 나누는 것은 다소 무리가 있다고 판단했기에, 신호등의 개수를 파악하여 러닝 시 반영하였음
다음으로, 추천 경로가 너무 많거나 적을 때에 대해서 문제점을 자체적으로 인식하였음. 추천 경로가 너무 많거나 적을 경우, 다음과 같은 로직을 적용하였음. 
- 추천 경로가 너무 많을 경우, 사용자의 선호도에 부합하는 경로를 5개로 제한하고 사용자의 위치에서 가장 가까운 경로에 대해서 5개로 제한하여 제시하였음
- 추천 경로가 너무 적을 경우, 사용자의 선호도를 모두 고려하지 않았음. 가령, 사용자의 선호도에 모두 부합하는 추천 경로가 없을 경우, 사용자의 선호도 중 하나라도 부합을 하는 경로를 분류하여 사용자의 위치를 기준으로 가까운 순서대로 제시하였음. 다만, 추천 경로가 너무 적을 경우의 문제점은 초기 수집하였던 경로에 추가적으로 추천 경로가 등록되면서 해결될 문제라고 판단하였음

(8) 경로의 이름을 ‘94_Advanced_Essential_Facilities_NonTrack’_3.2Km‘와 같이 제시한다면 사용자 친화적이지 못하다고 판단하였음. 따라서 LLM(Large Language Model) 을 사용하여 경로의 이름과 경로 설명을 자동으로 생성하게 구현하였음. 구현함에 있어서 LLM과 상호작용하는 응용 프로그램을 구축하기 위한 오픈소스 프레임워크인 ’LangChain‘과 LLM API 서비스 제공자인 ’OpenAI’를 사용하였음. LangChain과 OpenAi를 사용하여 경로의 이름과 설명을 생성하는 과정은 다음과 같음. 
- 경로 데이터를 입력 받음. 경로 데이터는 러닝 후 테그를 입력받는데 경로의 이름과 경로의 설명은 해당 테그를 통해 구성할 예정임
- LangChain Framework를 구성하여 OpenAI와 중간관리자 역할을 하는 Framework를 구성함
- 특정 성격과 역할을 수행하도록 정의하는 페르소나(Persona)를 설정함. 가령, 본 프로젝트에서는 ‘경로의 이름을 다채롭게 지어줘’ 등과 같은 페르소나를 설정하였음
- 데이터 형식을 미리 정의하는 프롬프트 템플릿(Prompo Template)을 정의함. 본 프로젝트에서는 경로의 이름과 경로의 설명을 도출하고자 했기에, ‘경로의 이름 – 경로의 설명’ 과 같은 특정 형식을 설정하여 모델에 주입하였음
- 다음으로는 OpenAI API를 호출함. LLM 모델을 실행하기 위한 요청으로, 호출 후 응답을 처리하도록 함. 이로써 경로의 이름과 경로의 설명이 자동으로 생성됨
결과적으로, 다음과 같이 결과가 도출되었음. 초기 수집한 경로의 경우 내장되어 있는 경로에 대한 정보가 있었기에, ‘한남대교 남행 러닝 – 한강의 아름다운 풍경을 즐기며 남쪽으로 달리는 코스’ 등과 같이 결과가 도출되었고 새롭게 추천될 코스에서는 임의로 ‘# 친구 # 사람이 많아요 # 아스팔트 # 길이 넓어요’ 와 같은 테그를 임의로 설정한 결과, ‘친구와 함께하는 러닝 – 함께 달리며 즐기는 활기찬 도심 속 러닝’ 과 같은 결과가 도출되었음.

(9) 다음으로는 신규 추천경로를 생성하는 과정에 대한 알고리즘임. 새로운 추천 경로를 등록하기 위한 절차로 총 2가지 지표를 통해서 새로운 추천 경로를 등록하였음. 본 프로젝트를 진행함에 있어서 의문점은 ‘추천 경로를 과연 제대로 따라 뛰었는가?’ 와 ‘나만의 경로를 새롭게 만들어 뛰었을 때 새로운 경로는 어떻게 추천 경로가 되는가?’ 이렇게 총 2가지 의문점을 가지고 추천 경로 과정을 고민하였음. 첫 번째 의문점의 경우 이탈률 지표를 통해서 추천 경로를 제대로 뛰었는지 뛰지 않았는지에 대해 의문점을 해결하였음. 이탈률은 다음과 같이 수식을 도출하였음. ‘이탈률(%) = (이탈한 포인트 수 / 추천 경로 포인트 수) × 100’. 이탈률 지표를 통해 추천 경로를 완벽하게 따라 뛴 경우, 추천 경로를 따라 뛰었으나 덜 뛴 경우, 추천 경로를 따라 뛰었으나 더 뛴 경우, 추천 코스를 이탈한 경우(이탈률 20%초과), 이렇게 총 4가지의 경우를 나누었음. 두 번째 의문점의 경우 유사도 지표를 통해 의문점을 해결하였음. 또한, 유사도 지표를 사용하여 새로운 추천 경로를 등록하였음. 유사도는 다음과 같이 수식을 도출하였음. ‘DTW 유사도 = 1 / (1 + DTW(A,B))’. 즉, 두 경로 간 모든 지점 간의 거리를 계산하여 가장 짧은 경로를 역추적하는 방식으로 유사도를 산출하였음. 추천 경로를 따라 뛰었지만 추천 경로를 이탈한 경우와 나만의 경로로 새롭게 뛴 경우, 총 2가지의 경우에 대해서 유사도가 90% 이상인 경로끼리 같은 그룹으로 묶고, 한 그룹 내에서 유사도가 가장 높은 경로를 추천경로로 등록하였음. 등록할 때에는, ‘gpx 파일의 초기 이름’, ‘경로 주변 공중화장실 개수’, ‘경로 주변 공중화장실 위치’, ‘경로 주변 편의점 개수’, ‘경로 주변 편의점 위치’, ‘경로의 총 거리’, ‘트랙 여부’, ‘난이도’, ‘편의도’, ‘경로 주변 신호등의 개수’, ‘경로 이름’, ‘경로 설명’ 의 정보를 자동으로 DB에 저장할 수 있도록 알고리즘을 구현하였음 

 

## 🚀 주요 기능 요구사항 분석

| **사용자**        | **화면**          | **기능**           | **데이터 & 인터페이스** | **추가 설명**                                |
|-------------------|-------------------|--------------------|-------------------------|--------------------------------------------|
| **일반 회원**        | 회원가입 페이지   | 회원가입           | 이메일, 비밀번호, 닉네임, 프로필사진, 선호도(고도 난이도, 편의시설 여부, 트랙 여부) 데이터를 입력 받아 사용자를 생성 | - |
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
 ┃ ┣ 📜index.html
 ┃ ┣ 📜manifest.json
 ┃ ┣ 📜robots.txt
 ┣ 📂src
 ┃ ┣ 📂apis
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┗ 📂images
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┣ 📂communityDetail
 ┃ ┃ ┣ 📂communityWrite
 ┃ ┃ ┣ 📂crewMemberDetail
 ┃ ┃ ┣ 📂crewMembers
 ┃ ┃ ┣ 📂crewWrite
 ┃ ┃ ┣ 📂galleryDetail
 ┃ ┃ ┣ 📂home
 ┃ ┃ ┣ 📂myCrew
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂otherCrew
 ┃ ┃ ┣ 📂otherCrewDetail
 ┃ ┃ ┣ 📂record
 ┃ ┃ ┗ 📂signup
 ┃ ┣ 📂constants
 ┃ ┣ 📂context
 ┃ ┣ 📂hooks
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Community
 ┃ ┃ ┣ 📂CommunityDetail
 ┃ ┃ ┣ 📂CommunityWrite
 ┃ ┃ ┣ 📂CrewChatting
 ┃ ┃ ┣ 📂CrewMemberDetail
 ┃ ┃ ┣ 📂CrewMembers
 ┃ ┃ ┣ 📂CrewWrite
 ┃ ┃ ┣ 📂GalleryDetail
 ┃ ┃ ┣ 📂Home
 ┃ ┃ ┣ 📂MyCrew
 ┃ ┃ ┣ 📂Mypage
 ┃ ┃ ┣ 📂NoticeDetail
 ┃ ┃ ┣ 📂OtherCrew
 ┃ ┃ ┣ 📂OtherCrewDetail
 ┃ ┃ ┣ 📂Record
 ┃ ┃ ┣ 📂Review
 ┃ ┃ ┣ 📂Running
 ┃ ┃ ┣ 📂Signin
 ┃ ┃ ┗ 📂Signup
 ┃ ┣ 📂store
 ┃ ┣ 📂styles
 ┃ ┣ 📂types
 ┃ ┣ 📂utils
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
