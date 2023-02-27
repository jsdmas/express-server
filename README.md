## 변경점
기존 수업떄비교해서 몇가지 누락된 것들
1. 쿠키설정
2. img upload

## LogHelper 
> winston-daily-rotate-file

winston-daily-rotate-file은 로그 파일을 관리해주는 모듈이다.   
기본적으로 하루(1일) 단위로 새 로그 파일을 생성해주고, 날짜별로 로그파일을 관리하게 구분해 주며, 로그 파일의 최대 크기와 최대 저장 파일 개수 등을 설정할 수 있다.   

## module
Nodejs에서는, module caching system을 활용해서 export한 모듈을 바로 쓸 수 있다.

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


