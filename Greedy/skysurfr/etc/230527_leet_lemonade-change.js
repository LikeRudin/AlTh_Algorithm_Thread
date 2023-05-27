//  230527 리트 정답 보고 해석해보기
//  https://leetcode.com/problems/lemonade-change/solutions/2564925/js-simple-solution-with-o-n/
// 레모네이드 가판대에서 각 레모네이드의 가격은 $5입니다. 고객들이 줄을 서서 한 번에 하나씩(지폐에 지정된 순서대로) 주문하고 있습니다. 각 고객은 레모네이드를 한 개만 구매하고 5달러, 10달러 또는 20달러 지폐로 결제합니다. 각 고객에게 정확한 거스름돈을 제공하여 고객이 5달러를 지불하는 순 거래가 이루어지도록 해야 합니다.

// 처음에는 거스름돈을 가지고 있지 않다는 점에 유의하세요.

// bills[i]가 째 고객이 지불하는 지폐인 정수 배열 청구서가 주어지면 모든 고객에게 올바른 거스름돈을 제공할 수 있으면 참을 반환하고, 그렇지 않으면 거짓을 반환합니다.

/**
 * @param {number[]} bills
 * @return {boolean}
 */
const lemonadeChange = function (bills) {
  // 1. 문제를 정확히 파악하면 반은 푼다(다시 강조)
  // 2. 진짜로 상상을 하면서 섬세하게 하나하나 구현해야 한다. 막연히 머리속에서 굴리지 말고 (이번에 느낀 점)
  // 3. 탐욕은 전체를 훑어보되 최적부터 푼다(경우의 수가 가장 적은 것 부터 해결)
  // 4. 가능하면 잔가지를 쳐내면 좋지만(영진씨 경우처럼, 안되면 경우의 수 먼저 해결한다)

  // 배열을 동전통(넣었다 뺄 수 있는 동전통)이라 한다, 현황을 알 필요가 있음
  // 5달러 동전통
  const numberOf5 = [];
  // 10달러 동전통
  const numberOf10 = [];
  // 20달러는 꺼내지 않으니 기록 안함

  // 전체를 훑어봄
  for (let i = 0; i < bills.length; i++) {
    // 1. 물건값 5달려면 바로 받는다 (성공 경우 1)
    if (bills[i] === 5) {
      // 5달러통에 넣는다 push
      numberOf5.push(5);
      // 2. 10달러 받으면, 거스름 가능한지 본다 (실패 경우 1, 성공 경우 1)
    } else if (bills[i] === 10) {
      // 거슬러줘야 하는데(if) 5달러가 없으면 망함
      if (!numberOf5.length) return false;
      // 있다고 하면 5달러 빼고 pop
      numberOf5.pop();
      // 그리고 10달러를 넣고 push
      numberOf10.push(10);
      // 3. 20달러 받으면 경우의 수가 많아진다 ( 성공 경우 2, 실패 경우 1)
    } else {
      // 20달러일때 10달러와 5달러 모두 있다면 두종류 다 쓰면 되니 최적
      if (numberOf10.length && numberOf5.length) {
        // 10달러 꺼내고 pop
        numberOf10.pop();
        // 5달러 꺼낸다 pop
        numberOf5.pop();
        // 10달러가 없다고 해도 10달러가 없고 5달러가 3개 이상이면 성공
      } else if (!numberOf10.length && numberOf5.length >= 3) {
        // 5달러짜리 3개를 뽑아서 준다
        numberOf5.splice(numberOf5.length - 3, 3);
      } else {
        // 그 외의 경우는 모두 실패
        return false;
      }
    }
  }
  // 모든 경우를 통과했을때 성공
  return true;
};