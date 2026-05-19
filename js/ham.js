/**
 * ハンバーガーメニューの開閉
 * .ham（ボタン）をクリックすると .ham-menu（オーバーレイ）が開閉する。
 * body に .is-ham-open を付けてスクロール固定。ESC キー・リンククリックでも閉じる。
 */
(function () {
  const button = document.querySelector(".ham");
  const menu = document.querySelector(".ham-menu");
  if (!button || !menu) return;

  function open() {
    button.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    button.classList.add("is-open");
    menu.classList.add("is-open");
    document.body.classList.add("is-ham-open");
  }

  function close() {
    button.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    button.classList.remove("is-open");
    menu.classList.remove("is-open");
    document.body.classList.remove("is-ham-open");
  }

  function toggle() {
    if (menu.classList.contains("is-open")) close();
    else open();
  }

  button.addEventListener("click", toggle);

  // メニュー内リンクをクリックしたら閉じる
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", close);
  });

  // ESC で閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) close();
  });

  // ウィンドウリサイズで PC 幅になったら強制クローズ
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && menu.classList.contains("is-open")) close();
  });
})();
