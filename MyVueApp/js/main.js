(function() {
    'use strict';
  // この中に下記をいれる
    var likeComponent = Vue.extend({
      // propsというキーで受け取る
      props: {
        // メッセージを出す
        message: {
          type: String,
          default: 'Like'
        }
      },
      data: function() {
        return {
          // カウントの値が0
          count: 0
        }
      },
      // @マークでイベントを設定　
      // ボタンの後にはメッセージ、カウントが表示される
      template: '<button @click="countUp">{{ message }} {{ count }}</button>',
      methods: {
        // カウントアップに対して以下の処理を行う
        countUp: function() {
          // カウントをプラス1する
          this.count++;
// カウントが増えた時に赤字を発火
          this.$emit('increment');
        }
      }
    });
    // UI に結びつくデータView Model としてappとする
    var app = new Vue({
// appに大して下記のコンポーネントを使う定義
      el: '#app',
      components: {
        'like-component': likeComponent
      },
      // appの方でdataをtotalで保持
      data: {
        total: 0
      },
      methods: {
        incrementTotal: function() {
            // トータルをプラス1,データ内のデータはthisでok
          this.total++;
        }
      }
    });
  
  })();