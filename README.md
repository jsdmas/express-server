## X-Forwarded-For(XFF) 란?
XFF 는 HTTP Header 중 하나로 HTTP Server 에 요청한 Client 의 IP 를 식별하기 위한 표준입니다.  

## session

secret : session을 암호화 해주는 키
resave : 다시저장 - 아무런 변동사항이 없을때도 session을 다시 저장하는 옵션 보통 false로 놓는다.
saveUninitialized :  초기화되지 않는 저장 - false로 하면 세션을 수정할 때만 DB에 저장한다.

## mysql 권한설정
grant all privileges on lbproject.* to library123@'%' with grant option;
flush privileges; -> MySQL 재시작 없이 변경한 설정 부분을 적용시키지 할때 사용.
현재 사용중인 MySQL의 캐시를 지우고 새로운 설정을 적용하기 위해 사용합니다. 이 명령어를 사용하려는 사용자는 reload권한을 가지고 있어야 합니다.

## MVC 패턴
MVC(Model-View-Controller) 모델은 웹 어플리케이션을 구현하는 데 사용되는 소프트웨어 디자인 패턴 중 하나입니다. MVC 모델은 어플리케이션을 세 가지 요소로 나누어 구성합니다.

- Model : 어플리케이션의 데이터와 그 데이터를 처리하는 로직을 담당합니다.  
  - 만든 서버에서 model의 역할은 MyBatis로 만든 mapper가 담당하고 있고 저수준의 sql을 직접처리 한다.
  - 이처럼 데이터베이스에 직접적으로 맞닿아 있는 객체라고 해서 DAO(Data  Access Object)라 부른다.
- View : 어플리케이션의 사용자 인터페이스(UI)를 담당합니다.
- Controller : Model과 View 사이의 연결고리 역할을 하며, 클라이언트의 요청을 처리합니다.

MVC 모델은 각 요소를 분리하여 관리하므로 어플리케이션의 유지보수 및 확장성을 높일 수 있습니다.  
또한, 하나의 모델에 대해 여러 개의 View를 가질 수 있어 어플리케이션의 UI를 쉽게 변경할 수 있습니다.  
MVC 모델은 웹 어플리케이션을 구현하는 데 널리 사용되며, 다양한 언어와 프레임워크에서 지원하고 있습니다.   

### Service 계층
비즈니스 로직이라고 하며 트렌젝션이라 부르기도 합니다.  
요청에 필요한 요구사항을 구현합니다. (router 의 contorller 처리중 sql문 처리과정, 학생을 delete하기위한 학과delete -> 교수 delete -> 학생 delete )

예시
```js
homrouter.router("/요청URL", ()=>{

    SQL 처리
    SQL 처리
    SQL 처리

    res.sendResult({data처리});
})
```
SQL을 처리하는 일련의 과정 모음을 Service계층 이라 합니다.

## Rest ? RESTful ? Rest Api ??????????

- API : 데이터와 기능의 집합을 제공하여 컴퓨터 프로그램간 상호작용을 촉진하며, 서로 정보를 교환가능하도록 하는 것


RESTful하다는, REST를 잘 지킨것이고, REST API는 REST형식으로 설계된 API를 말합니다.  

> 따라서, RESTful API란 REST한 방식으로 프로그램간 정보 교환 등의 상호작용을 가능하게 하는 것이 RESTful API입니다

1. Rest
   - REST란, HTTP를 잘 사용하기 위한 아키텍쳐 스타일 입니다.
   - REST는 URL과 HTTP 메소드를 사용해 자원과 행위를 표현합니다.
   - REST 원칙을 지키면서 API의 의미를 표헌하기 쉽고, 파악하기 쉽게 하는것을 Restful 하다고 합니다.



## Reast API 규칙

**Rest API Design**

URI에는 대문자를 포함하지 않는다.
```
/customerName/{name}  X
/customername/{name}  O
```
행위(Method)는 URL에 포함하지 않고 RequestMethod를 사용한다.
```
/getcustomername/{name} X
GET /customername/{name} O
```
계층 관계는 /를 통해 나타낸다.
```
GET /customer/{id}/name -> {id}를 가진 고객의 이름
```
마지막 문자로 /를 사용하지 않는다.
```
GET /customer/name/ X
GET /customer/name O
```
언더바(_) 대신 하이픈(-)을 사용한다.
```
GET /customer_name/ X
GET /customer-name O
```
파일 확장자(.xml, .txt)는 URL에 포함하지 않는다.  
Controller가 아닐 경우 명사를 사용한다.  
Document는 단수 명사를, Collection / Store는 복수 명사를 사용한다.  



