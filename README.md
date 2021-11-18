# 🔥 **Assignment_Deer Corporation (with NestJS)**



![KakaoTalk_20211118_144614088](https://user-images.githubusercontent.com/60311404/142436450-885685c1-71f1-4ad6-a128-d25a0f9de2fc.png)

🧱 **wanted x wecode 프리온보딩 백엔드 코스 - [Assignment 5] Deer Corporation**

- 일정: 2021년 11월 18일(목) 오후 5시 ~ 11월 22일(월) 오후 2시

  <br>

  [디어 사이트](https://web.deering.co/)

  [wanted 채용공고 링크](https://www.wanted.co.kr/wd/59051)

  <br>

## ☄️ **팀원 소개**

| 이름                                     | 담당 기능 |
| ---------------------------------------- | --------- |
| [김바다](https://github.com/sally0226)   |           |
| [김효민](https://github.com/luckyhyom)   |           |
| [원동균](https://github.com/WonDongGyun) |           |
| [이나영](https://github.com/bokiri409)   |           |
| [장희진](https://github.com/heejin99)    |           |
| [조재복](https://github.com/ildang100)   |           |

<br>

## 🌎 **배포**

주소 : 

<br>

## 🛠 **프로젝트 빌드 및 서버 실행 방법**

1. 상단의 Code 버튼을 눌러 경로를 복사한 후 클론 받습니다.

```
$ git clone https://github.com/preOnboarding-Team13/Assignment-6-deer.git
```

2. 패키지를 설치합니다.

```
$ npm install
```

3. 서버를 실행해 줍니다.

```
$ npm start
```

4. 정해진 API에 접근하여 서비스를 이용합니다.

<br>

## 📝 **과제 요구사항**

### ✔️ [필수 포함 사항]

- READ.ME 작성
  - 프로젝트 빌드, 자세한 실행 방법 명시
  - 구현 방법과 이유에 대한 간략한 설명
  - 완료된 시스템이 배포된 서버의 주소
  - 해당 과제를 진행하면서 회고 내용 블로그 포스팅
- Swagger나 Postman을 이용하여 API 테스트 가능하도록 구현


<details>
<summary>✔️  [주요 평가 사항 및 과제 안내]</summary>
<div markdown="1">       
<br>

  ### 주요 평가 사항

- 주어진 정보를 기술적으로 설계하고 구현할 수 있는 역량
- 확장성을 고려한 시스템 설계 및 구현
<br>

### 과제 안내
<br>

디어는 사용자의 요금을 계산하기 위해 다양한 상황을 고려합니다. 
<br>

- 우선 지역별로 다양한 요금제를 적용하고 있습니다. 예를 들어 건대에서 이용하는 유저는 기본요금 790원에 분당요금 150원, 여수에서 이용하는 유저는 기본요금 300원에 분당요금 70원으로 적용됩니다.
- 할인 조건도 있습니다. 사용자가 파킹존에서 반납하는 경우 요금의 30%를 할인해주며, 사용자가 마지막 이용으로부터 30분 이내에 다시 이용하면 기본요금을 면제해줍니다.
- 벌금 조건도 있습니다. 사용자가 지역 바깥에 반납한 경우 얼마나 멀리 떨어져있는지 거리에 비례하는 벌금을 부과하며, 반납 금지로 지정된 구역에 반납하면 6,000원의 벌금을 요금에 추과로 부과합니다.
- 예외도 있는데, 킥보드가 고장나서 정상적인 이용을 못하는 경우의 유저들을 배려하여 1분 이내의 이용에는 요금을 청구하지 않고 있습니다.
<br>

최근에 다양한 할인과 벌금을 사용하여 지자체와 협력하는 경우가 점점 많아지고 있어 요금제에 새로운 할인/벌금 조건을 추가하는 일을 쉽게 만드려고 합니다. 어떻게 하면 앞으로 발생할 수 있는 다양한 할인과 벌금 조건을 기존의 요금제에 쉽게 추가할 수 있는 소프트웨어를 만들 수 있을까요? 
<br>

우선은 사용자의 이용에 관한 정보를 알려주면 현재의 요금 정책에 따라 요금을 계산해주는 API를 만들어주세요. 그 다음은, 기능을 유지한 채로 새로운 할인이나 벌금 조건이 쉽게 추가될 수 있게 코드를 개선하여 최종 코드를 만들어주세요.
<br>
<br>


**다음과 같은 정보들이 도움이 될 것 같아요.**

---

- 요금제가 사용자 입장에서 합리적이고 이해가 쉬운 요금제라면 좋을 것 같아요.
- 앞으로도 할인과 벌금 조건은 새로운 조건이 굉장히 많이 추가되거나 변경될 것 같아요.
- 가장 최근의 할인/벌금 조건의 변경은 '특정 킥보드는 파킹존에 반납하면 무조건 무료' 였습니다.
<br>
<br>

**이용에는 다음과 같은 정보들이 있습니다.**

---

```
use_deer_name (사용자가 이용한 킥보드의 이름)
use_end_lat, use_end_lng (사용자가 이용을 종료할 때 위도 경도)
use_start_at, use_end_at (사용자가 이용을 시작하고 종료한 시간)
```
<br>

**데이터베이스에는 킥보드에 대해 다음과 같은 정보들이 있습니다.**

---

```
deer_name (킥보드의 이름으로 고유한 값)
deer_area_id (킥보드가 현재 위치한 지역의 아이디)
```
<br>

**데이터베이스에는 지역에 대해 다음과 같은 정보들이 있습니다.**

---

```
area_id (지역 아이디로 고유한 값)
area_bounday (지역을 표시하는 MySQL spatial data로 POLYGON)
area_center (지역의 중심점)
area_coords (지역의 경계를 표시하는 위도, 경도로 이루어진 점의 리스트)
```
<br>

**데이터베이스에는 파킹존에 대해 다음과 같은 정보들이 있습니다.**

---

```
parkingzone_id (파킹존 아이디로 고유한 값)
parkingzone_center_lat, parkingzone_center_lng (파킹존 중심 위도, 경도)
parkingzone_radius (파킹존의 반지름)
```
<br>

**데이터베이스에는 반납금지구역에 대해 다음과 같은 정보들이 있습니다.**

---

```
forbidden_area_id (반납금지구역 아이디로 고유한 값)
forbidden_area_boundary (반납금지구역을 표시하는 MySQL spatial data로 POLYGON)
forbidden_area_coords (반납금지구역의 경계를 표시하는 위도, 경도로 이루어진 점의 리스트)
```
</div>
</details>

<br>
<br>

## 🧬 **DB 모델링**

![디어 (4)](https://user-images.githubusercontent.com/60311404/142433452-5023f40d-3662-4149-837f-e1bc504e689c.png)

<br>

## 🏫 **사용 기술**

- Backend : [![img](https://camo.githubusercontent.com/cb0c26ab83b212946400b29c325debd89d07f0c36e3568c840dc6ae07127ca1b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6573744a532d4530323334453f7374796c653d666c6174266c6f676f3d4e6573744a53266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/cb0c26ab83b212946400b29c325debd89d07f0c36e3568c840dc6ae07127ca1b/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6573744a532d4530323334453f7374796c653d666c6174266c6f676f3d4e6573744a53266c6f676f436f6c6f723d7768697465)</a> [![img](https://camo.githubusercontent.com/17131306fc490286432e1148ea92ac1754363621a9d185bf613ad6e0f4d33a96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f7374796c653d666c6174266c6f676f3d54797065536372697074266c6f676f436f6c6f723d7768697465)](https://camo.githubusercontent.com/17131306fc490286432e1148ea92ac1754363621a9d185bf613ad6e0f4d33a96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f547970655363726970742d3331373843363f7374796c653d666c6174266c6f676f3d54797065536372697074266c6f676f436f6c6f723d7768697465)</a>
- DataBase : <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=MySQL&logoColor=white"/></a>
- Collaboration : <img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/></a> <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/></a> <img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white"/></a>
- Deploy: <img src="https://img.shields.io/badge/Naver Cloud-03C75A?style=flat&logo=Naver&logoColor=white"/>

<br>



## 📂 **폴더 구조**

```
📁 src
├── 📁 domain
│  ├── 📂 entities
│  │  ├── 📄 trials.entity.ts
│  │  ├── 📄 updatedBundles.entity.ts
│  │  └── 📄 updatedTrials.dto.ts
│  ├── 📂 search
│  │  ├── 📄 search.controller.spec.ts
│  │  ├── 📄 search.controller.ts
│  │  ├── 📄 search.module.ts
│  │  ├── 📄 search.repository.ts
│  │  ├── 📄 searchPage.repository.ts
│  │  ├── 📄 search.service.spec.ts
│  │  └── 📄 search.service.ts
│  ├── 📂 trials
│  │  ├── 📄 trials.module.ts
│  │  ├── 📄 trials.repository.ts
│  │  ├── 📄 trials.service.spec.ts
│  │  ├── 📄 trials.service.ts
│  │  ├── 📄 updatedTrialBundles.repository.ts
│  │  └── 📄 updatedTrials.repository.ts
├── 📂 global
│  ├── 📂 common
│  │  ├── 📄 CommonResponse.ts
│  │  ├── 📄 ErrorCode.ts
│  │  └── 📄 ErrorResponse.ts
│  ├── 📂 exception
│  │  └── 📄 ErrorHandler.ts
│  ├── 📂 util
│  │  ├── 📄 encryption.ts
│  │  └── 📄 date.ts
├── 📂 utils
│  └── 📄 batchFunction.ts
├── 📄 app.module.ts
└── 📄 main
📁 test
├── 📄 app.e2e-spec.ts
└── 📄 jest-e2e.json
📄 .env
📄 nest-cli.json
📄 package.json
📄 package-lock.json
📄 tsconfig.json
📄 tsconfig.build.json
📄 README.md
```


<br>

## ⚡ **작업 컨벤션**

#### - 코딩  컨벤션

- 파일 / 변수 네이밍 : CamelCase
- 탭 사이즈 : 4

#### - 깃 컨벤션

<img src="https://user-images.githubusercontent.com/60311404/142437453-bf90553a-1f18-4a31-a560-644c9087f939.png" alt="Untitled (3)" style="zoom:67%;" /> 

#### - 협업

- [Gather.town](https://www.gather.town/) 을 통해 화상 회의로 소통을 진행했습니다.
- Notion 을 이용해 API 명세서와 회의록을 작성했습니다.
- [ERDCloud](https://www.erdcloud.com/) 를 통해 DB 구조를 구축했습니다.

<br>

## 🔗 **구현 기능**

### 1) 체크 리스트



### 2) 상세 내용

[데이터베이스 설계](https://github.com/preOnboarding-Team13/Assignment-6-deer/wiki/%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%B2%A0%EC%9D%B4%EC%8A%A4-%EC%84%A4%EA%B3%84)

<br>

## 🐾 **API**

[Postman 주소-링크](https://documenter.getpostman.com/view/12074893/UVCB9PXL)

<br>

## 🐾 **API Test 방법**

#### 1. 위의 Postman 주소 링크를 클릭하여 Postman으로 들어갑니다.

#### 2. 

<br>

## 🍭 **TIL 주소**



| 김바다 | 김효민 | 원동균 | 이나영 | 장희진 | 조재복 |
| ------ | ------ | ------ | ------ | ------ | ------ |
|        |        |        |        |        |        |
