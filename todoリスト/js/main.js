(function() {
  'use strict';

  var vm = new Vue({
    el: '#app',
    data: {
      newItem: '',
      todos: []
    },
    // todosに変更があったときの処理を監視
    watch: {
      // watchの中のtodosをさらにdeepに監視
      todos: {
        handler: function() {
          // localstrageにtodosのキーでデータを保存
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },

        deep: true
      }
    },
    mounted: function() {
      // jsonのparseがうまくいかなかった場合からの配列にする
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function() {
        var item = {
          // this.newitemをタイトルにする
          title: this.newItem,
          isDone: false
        };
        // addをプッシュすると入力したアイテムが表示
        this.todos.push(item);
        this.newItem = '';
      },
      // indexが渡ってきたら尋ねて確認が取れたらindex番目から1つ削除
      deleteItem: function(index) {
        if (confirm('are you sure?')) {
          this.todos.splice(index, 1);
        }
      },
      purge: function() {
        // ！否定キャンセルされた時処理をしない
        if (!confirm('delete finished?')) {
          return;
        }
        // 下のtodosをリメインに返す
        this.todos = this.remaining;
      }
    },
    computed: {
      // isdoneがまだ残ってる＝falseの項目の数を
      // フィルタリングして産出
      remaining: function() {
        return this.todos.filter(function(todo) {
          return !todo.isDone;
        });
      }
    }
  });
})();