let $all = document.querySelector(".all");
let $news = document.querySelector(".news");
let $work = document.querySelector(".work");
let $job = document.querySelector(".job");
// let $asks = document.querySelector(".asks");
let $joke = document.querySelector(".joke");
let $header = document.querySelector("header");
let $main = document.querySelector('main');
// let $del = document.querySelector('.del');

function render(url) {
  $.ajax({
    url: url,
    method: 'GET',     // jQuery 1.9.0 之前使用 type: 'GET'
    success: function (json) {
      let data = json.data;
      let innerhtml = data.map(function (item) {
        let html = "";
        return html += `<section class="article" id = "${item._id}">
                      <div class = "title">
                        <a href="${item.url}">${item.title}</a>
                      </div>
                      <div class = "afterTitle">
                        <div class = "vote">
                          <i class = "fa fa-caret-up" data-id="${item._id}"></i>
                          <div class="score">${item.score} 赞</div>
                        </div>
                        <a class="detail" href = "editor.html" data-id="${item._id}">编辑</a>
                        <a class="del" href = "#" data-id="${item._id}">删除</a>
                      </div>
                      
                      <section>`
      }).join('');
      $main.innerHTML = innerhtml;
    }
  });
}

render("https://fe13.now.sh/api/posts");

function vote() {
  let vote = document.querySelector('.fa');
  document.addEventListener("click", function (event) {
    let target = event.target;
    //console.log(target.dataset.id);
    if (target.matches('.fa')) {
      $.ajax({
        url: `https://fe13.now.sh/api/posts/${target.dataset.id}/upvote`,
        method: 'PUT',
        success: function (data) {
          target.nextElementSibling.innerHTML = `${data.score} 赞`;
        }
      })
    }
  })
}

vote();
function getUrl() {
  $header.addEventListener("click", function (event) {
    if (event.target.className === "all") {
      let url = 'https://fe13.now.sh/api/posts';
      render(url);
    } else {
      let url = `https://fe13.now.sh/api/posts?type=${event.target.className}`;
      console.log(url);
      render(url);
    }
  })

}
getUrl();

function del() {
  document.addEventListener('click', function (event) {
    
    if (event.target.matches('.del')) {
      $.ajax({
        url: `https://fe13.now.sh/api/posts/${event.target.dataset.id}`,
        method: 'DELETE',
        success: function () {
          location.reload();
        }
      });
    }
  })
}
del();