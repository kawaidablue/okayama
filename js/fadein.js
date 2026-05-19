/**
 * スクロール連動フェードイン
 * .js-fadein クラスが付いた要素を、ビューポートに入った時点で
 * .is-visible クラスを付与して表示する。
 * CSS 側で .js-fadein の初期状態と .is-visible の最終状態を定義。
 */
(function () {
  const targets = document.querySelectorAll(".js-fadein");
  if (!targets.length) return;

  // IntersectionObserver 未対応ブラウザは即時表示
  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // data-fadein-delay があれば順番に遅延を付与
          const delay = entry.target.dataset.fadeinDelay;
          if (delay) {
            entry.target.style.transitionDelay = delay + "ms";
          }
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // 一度表示したら監視解除
        }
      });
    },
    {
      // 要素の上端が viewport の下から 15% 内側に入ったら発火
      rootMargin: "0px 0px -15% 0px",
      threshold: 0,
    }
  );

  targets.forEach((el) => observer.observe(el));
})();
