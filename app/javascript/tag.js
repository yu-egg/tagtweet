if (location.pathname.match("tweets/new")){
  window.addEventListener("load", (e) => {
  const inputElement = document.getElementById("tweets_tag_name");
    inputElement.addEventListener("keyup", (e) => {
      const input = document.getElementById("tweets_tag_name").value;
      const xhr = new XMLHttpRequest();
      xhr.open("GET", `search/?input=${input}`, true);
      xhr.responseType = "json";
      xhr.send();
      xhr.onload = () => {
        const tagName = xhr.response.keyword;
        const searchResult = document.getElementById('search-result')
        searchResult.innerHTML = ''
        tagName.forEach(function(tag){

          const parentsElement = document.createElement('div')
          const childElement = document.createElement('div')

          parentsElement.setAttribute('id', 'parents')
          childElement.setAttribute('id', tag.id )
          childElement.setAttribute('class', 'child' )

          parentsElement.appendChild(childElement)
          childElement.innerHTML = tag.name
          searchResult.appendChild(parentsElement)

          const clickElement = document.getElementById(tag.id)
          clickElement.addEventListener("click", () => {
            document.getElementById("tweets_tag_name").value = clickElement.textContent;
            clickElement.remove();
          })
        })
      }
    });
  })
};

// 5~9行目では、tweets_tag_nameというID名の要素に入力された値を「input」に代入後、Ajaxの記述を行っています。

// 先の編集で、searchアクションと紐付けるルーティングを設定したので「openメソッド」でsearchアクションへのパスを設定します。この時、「input」に代入されたバリューをqueryパラメータとして設定します。また、レスポンスのデータ型は「json」と指定して、送信を行っています。
// ビューで取得した情報を元に、タグの検索をコントローラーで行います。その後、「keyword」というキーに対応するバリューとしてセットして、jsonデータとして返します。
// 16~17行目では、インクリメンタルサーチの結果を画面上に表示させるために、div要素を作成しています。
// 作成したdiv要素の中に、インクリメンタルサーチの結果を加えていきます。
// 19~21行目では、さきほど作成した要素にIDとクラス名を付与します。
// childElementには、表示させるタグのIDを代入します。また、CSSを当てるためにクラスも付与させています。
// 23~25行目では、parentsElementの子要素としてchildElementを加えます。次にchildElementに表示させる、タグのHTMLを生成させます。最後に、searchResultの子要素にparentsElementを加えています。
// 12~13行目では、二文字目以降に重複して表示されないように、searchResultの中へ空文字の代入をしています。
// 27~30行目では、候補として表示させたタグがクリックされると、選択されたタグのテキスト要素を入力フォームのバリューとしてセットします。最後に、選択されたタグは、表示の一覧から削除します。

// 以上がインクリメンタルサーチの一連の動きになります。