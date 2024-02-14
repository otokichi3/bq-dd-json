# Data Definition to BigQuery by GAS

作成した BigQuery テーブル定義書から JSON 形式のスキーマを出力するための GAS です。  
GAS で出力するためにフォーマットされたテーブル定義書からしか出力できません。  
テーブル定義には以下を使ってください。  
https://docs.google.com/spreadsheets/d/1pN5Tqr0tBsBlpChJ7qT27z1GCuTBCyWuBztVfLfoGrU/edit?usp=sharing

## Clasp を使って GAS のコードをデプロイしたり Git/GitHub で管理するには？

https://github.com/google/clasp

既存の GAS を clone して GitHub リポジトリに push する：
```
npm install -g @google/clasp
clasp login // ブラウザが起動し、認証する
mkdir clasp-test && cd clasp-test
SCRIPT_ID= // GAS プロジェクト上からスクリプト ID を取得する
clasp clone $SCRIPT_ID

echo "# clasp-test" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin [repository].git
git push -u origin main
```

手元のコードを GAS に反映する：
```
clasp login
clasp push
```
