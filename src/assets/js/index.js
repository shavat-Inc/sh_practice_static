$(document).ready(function () {
  // 検索フォームの送信イベント
  $("#search-form").submit(function (event) {
    event.preventDefault(); // ページリロードを防ぐ

    const keyword = escapeHTML($("#search-keyword").val()); // キーワードを取得しエスケープ

    if (keyword) {
      // search.htmlにリダイレクトし、クエリパラメータにキーワードを追加
      window.location.href =
        "/search_test/search/search.html?keyword=" +
        encodeURIComponent(keyword);
    }
  });

  // 現在のページがsearch.htmlか確認
  if (location.href.indexOf("/search/") != -1) {
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = escapeHTML(urlParams.get("keyword")); // URLからキーワードを取得

    if (keyword) {
      $.ajax({
        type: "GET",
        url: "/search_test/js/search-data.json", // 静的なJSONファイルのパス
        dataType: "json",
      }).then(
        function (data) {
          $("h1.ja").html("「" + keyword + "」の検索結果");
          $(".post_list").empty(); // 前の検索結果をクリア
          let found = false;
          for (let i in data) {
            const cur_data = data[i];
            if (
              cur_data.post_title.indexOf(keyword) != -1 ||
              cur_data.post_content.indexOf(keyword) != -1
            ) {
              $(".post_list").append(cur_data.html.replace(/\\/g, ""));
              found = true;
            }
          }
          if (!found) {
            $(".post_list").append(
              '<p style="margin: 0 0 0 1.5em; font-size: 14px;">見つかりませんでした。</p>'
            );
          }
        },
        function () {
          console.log("検索失敗");
        }
      );
    }
  }
});

// HTMLエスケープ関数
function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
    const escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return escape[match];
  });
}

// アイコンを追加する関数 (必要に応じて)
function addNewIcon() {
  console.log("New icon added");
}
