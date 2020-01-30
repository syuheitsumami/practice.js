
# 乱数を生成するためのrandom
# モジュールをインポート
import random
# 乱数の範囲
answer = random.randint(1, 10)
# 最初はカウントは0
count = 0

# trueまで書くことで字下げして書いた処理を繰り返す
# 字下げは選択してtabキーを押す
while True:
    # 末尾に何も追加しない
    print("Your guess? ", end='')
    # inputで受け取った文字列を
    # 数値に変換してnameに代入
    guess = int(input())
    # count = count + 1
    count += 1
    
    if answer == guess:
        # 文字列を埋め込む場合は&S 
        # 整数値を埋め込む場合は%i
        # ここでは%i=%count
        print("Bingo! It took %i guesses!" %count)
        # breakはループを抜ける処理
        break
    elif answer > guess:
        print("Bigger!")
        # 消去法
    else:
        print("Smaller!")