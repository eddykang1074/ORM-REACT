//원시타입 변수 선언과 할당의 의미를 알아보자

let score;
score = 80;
score = 90;

console.log("스코어값:", score);

//원시타입 score값을 copy변수에 복사 할당한다.
let copy = score;

console.log("copy-score1", copy, score);

copy = 100;

//복사한 원시타입의 값을 변경해도 원본의 값은 변경되지 않는다.- 실제 저장되는 메모리 공간(주소)이 다르다는 뜻
console.log("copy-score2", copy, score);

//===  값을 비교하는 타입까지 같이비교하고 정확히는 동일한 메모리 주소를 바라보는지를 체크하는것...
console.log("변수의 메모리주소가 같은지 여부체크", score === copy);

//참조타입의 불변성에 대해 학습해봅니다.
//기본적으로 참조타입은 불변성을 지원하지 않습니다.= 동일한 메모리공간을 참조/재사용한다.
//참조타입은 값을 변경해서 새로운 메모리공간을 할당하지 않고 기존 할당된 메모리공간(메모리주소)에 값을 업데이트합니다.
var user1; //참조타입 선언 : undefined할당

//참조타입 값할당
user1 = {
  id: 1,
  name: "eddy",
  age: 45,
  address: { sido: "경기도", detail: "성남시 수정구" },
};

console.log("참조타입-객체정의하고 값할당하기", user1);

//참조타입 값 변경
user1.name = "강창훈";

console.log("참조타입-객체정의하고 값할당하기", user1);

//참조타입을 복사해봅니다.
//참조타입을 그냥 복사하면 복사한 원본의 주소를 참조하고 같은 공간의 데이터를 공유하게되며
//공유된 공간의 값을 복사하는데 이를 얕은카피(Shallow Copy)라고 합니다.
var user2 = user1;

user2.name = "가브리엘";

console.log("user1", user1);
console.log("user2", user2);

console.log("user1 === user2", user1 === user2);
