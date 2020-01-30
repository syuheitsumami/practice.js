'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
//   result直下のpを取得
  const scoreLabel = document.querySelector('#result > p');
// 代入する前にshuffleする
  const quizSet = shuffle([
    {q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は？', c: ['256', '64', '1024']},
    {q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'HTML']},
  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    //   iは最後の要素のインデックス　
    // iが0より大きい間1ずつ減らすループ処理
    for (let i = arr.length - 1; i > 0; i--) {
        // jは乱数 0からi番目
      const j = Math.floor(Math.random() * (i + 1));
    //   arr[i] と arr[j] を入れ替え
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    //   isansweredがtrueだったら処理を止める
    if (isAnswered) {
      return;
    }
    isAnswered = true;
// currentnum番目のcの最初0と一緒だったら正解
    if (li.textContent === quizSet[currentNum].c[0]) {
        // liにcorrectをadd
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }
// disableを外して青になる
    btn.classList.remove('disabled');
  }

  function setQuiz() {
    //   回答していますかまだです
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;
    // これがないと前の選択肢が残る
    // choiceの子要素が有る限り前の選択肢をnullになるまで消す
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }
// c選択肢をいれる　foreachでshufflechoiceを選択　　
// ...でquizSetの配列の値のコピーをshuffle渡す
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
    //   liをchoicesに追加
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }
// setquizを呼び出さないといけない
  setQuiz();

  btn.addEventListener('click', () => {
    //   勝手に次の問題に進めないようにする
    //   btnにdisabledクラスがついていたら処理しない
    if (btn.classList.contains('disabled')) {
      return;
    }
    // またdisabledに戻す
    btn.classList.add('disabled');
// 一つ小さい値＝最後の一つになったら
    if (currentNum === quizSet.length - 1) {
        // 上の文字列を代入　length中のscore
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
    //   resultからhiddenを外す
      result.classList.remove('hidden');
    } else {
        // currentnumを1増やしてsetquizを呼び出す
      currentNum++;
      setQuiz();
    }
  });
}