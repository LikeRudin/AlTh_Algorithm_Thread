Can Place Flowers

Greedy, Array

---

Greedy Algorithm

problem-solving heuristic의 일종

큰그림을 배제하고 단계마다 최선의 선택만 하는 방식

---

### Greedy 소개 > heuristic

# Heuristic?

휴리스틱을 발견법이라고 합니다.

정확한 답을 찾는 체계적이고 합리적이면서 엄밀한 프로세스를 따르지않고,
직관적이면서도 간편한 로직을 사용하는 방법입니다.

---

### Greedy 소개 > heuristic예시

신영진이 A 지역에 살면서 B 지역에 있는 피자 가게에 약속이 있습니다.

그는 이동을 위해 총 8개의 지하철 역을 지나야 하며, 그 후 1km를 걸어야 합니다.

신영진은 자신의 집에서 지하철 역까지 가는 데 5분, 지하철을 기다리는 데 10분이 걸릴 것으로 생각합니다. 각 지하철 정거장은 3분씩 이동하는 데 소요되므로, 8개의 정거장을 지나는 데는 총 24분이 필요하다고 계산하였습니다.

그리고 마지막으로 1km를 걷는 데 15분이 걸릴 것으로 예상했습니다.

따라서, 그는 총 이동 시간을 대략 54분으로 추정하고, 약속보다 1시간 일찍 출발하기로 결정했습니다.

정확한 배차 간격이나 이동 시간, 지형과 유동인구에 따른 자신의 이동 속도를 정확하게 계산하지 않았습니다.

효율적인 해결책을 찾기 위한 과정입니다.

그러나 이는 엄밀한 해결책이 아니며, 최적의 해결책도 아닙니다.

---

### Greedy 소개 > heuristic > greedy

greedy는 휴리스틱중에, 선택지가 나오면 그상황안에서 최선이라고 여겨지는 선택지를 고르는것입니다.

greedy를 잘 사용하는법

---

## 내 첫번째 해답

문제: flowerbed 배열과 정수 n 을 입력받았을때,
n개를 더 추가로 심을 수있으면 true, 아니면 false를 출력하는 함수를 만들어라.

## 문제 비틀기

주어진 flowerbed에 n개의 꽃을 추가로 심을 수 있을까?

-> flowerbed에 심을 수 있을까

1. 심을수있는 꽃의 이론상 최대 개수를 구한다 =
   flowerNum

2. flowerNum >= n 를 반환한다.

---

let numFlower = 0;
let numZero = 0;

전략

1. 순환문

배열을 순회하면서
0이나오면 numZero값을 1증가시킨다.

1이나오면
(numZero -1) /2 를 numFlower에 더해주고,
numZero를 리셋해준다.

2. 그렇게 numFlower >= n 값을 반환한다.

문제점:

제로그라운드의 끝부분이
1인경우와 배열의 종단일때의 경우의 수가 다르다.

- 배제해주기 위해 양옆에 0을 하나씩 넣어주었습니다.

  flowerbed.unshift(0);
  flowerbed.push(0);

(numZero - 1) /2

const canPlaceFlowers = function(flowerbed, n) {

    let additionalFlowers = 0;
    let numZero = 0;

    flowerbed.unshift(0);
    flowerbed.push(0);
    for (const i of flowerbed ) {
        if(i == 0) {
            numZero += 1;
        } else if (numZero > 2) {
            additionalFlowers += Math.floor((numZero  -1)/ 2);
            numZero = 0;
        } else {
            numZero = 0;
            }
        }
    additionalFlowers += Math.floor((numZero  -1)/ 2);

    return additionalFlowers >= n

};

단점: 너무 greedy 하지 못함.

why??

전체 꽃의 개수를 새어보고, 마지막에 결과를 출력하니까.

---

개선사항

선택지를 만들자.

1. 사전에 배열의 길이를 통해 체크하자.

꽃은 연속해서 심어질 수 없다.

꽃의 최대 수는 (flowerbed.length /2) + 1 을 넘을 수 없다

1 <= flowerbed.length <= 2 \* 104
flowerbed[i] is 0 or 1.

There are no two adjacent flowers in flowerbed.
0 <= n <= flowerbed.length

1. 배열 길이로 컷

꽃은 인접해서 심을 수 없다.

-> 심어진 꽃의 최대 수는 화단의 길이 /2 + 1 을 넘을 수없다.

const theoricalMaximum = (flowerbed.length /2) + 1;

if (theoricalMaximum =< n){
return false
}

2. 배열 길이로 컷 현재 꽃의 수 + n

길이 1 -1.5
길이 2 - 2
길이 3 - 2.5
길이 4 - 3
길이 5 - 3.5
길이 6 - 4

2. 배열 성분과 길이로 컷

이제 내부 꽃의 수를 계산한다

const sumArray = function ([first, ...remain]) {
if (first === undefined) return 0;
return first + sumArray(remain);
}

if (theoricalMaximum =< sumArray(배열) + n) {return false};

3. 이제 세주자

여기서도 greedy하게 스피드런 하자!

additionalFlowers = 0; 으로 설정해놓고
0이 1을 만날때마다
Math.floor((numZero -1)/ 2) 값을 더해서

최종적으로 additionalFlowers 의 값과 n을 비교했습니다.

그런데 additionalFlowers 조건이 충족되면 언제든지 탈출 할 수 있게 해주면
좀더 greedy 할것같습니다.

순환문에 if문을 단계별로 추가하는것은 더 많은 코드,
더많은 계산량을 요구합니다.
하지만 빠르게 n값을 확인하여 탈출한다면, 더 빨리 나갈 수 있습니다.

additionalFlowers 변수 삭제

n을 저장하는 let numFlowers= n; 추가

else if (numZero > 2) {
additionalFlowers += Math.floor((numZero -1)/ 2);
numZero = 0;
}

여기서

else if (numZero > 2) {
numFlowers -= Math.floor((numZero -1)/ 2);
if numFlowers < 1 return true;

            numZero = 0;

}

const canPlaceFlowers = function(flowerbed, n) {

    let numFlowers = n;
    let numZero = 0;

    const theoricalMaximum = (flowerbed.length /2) + 1;

    // 이론상 최대치보다 n이 크면 바로탈출
    if (theoricalMaximum =< numFlowers){
    return false
    }

    // 이미 심어진꽃 +n 이 이론상 최대치보다 크면바로 탈출

    const sumArray = function ([first, ...remain]) {
    if (first === undefined) return 0;
    return first + sumArray(remain);
    }

    if (theoricalMaximum =< sumArray(배열) + n) {
        return false};

    // 다시 새자.

    flowerbed.unshift(0);
    flowerbed.push(0);
    for (const i of flowerbed ) {
        if(i == 0) {
            numZero += 1;
        } else if (numZero > 2) {
            numFlowers -= Math.floor((numZero  -1)/ 2);
            if (numFlowers < 1) {
                return true
                }
            numZero = 0;
        } else {
            numZero = 0;
            }
        }


    additionalFlowers += Math.floor((numZero  -1)/ 2);

    return false

};
