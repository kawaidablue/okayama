/**
 * single.html 用のアニメーション
 *  1) 読書進捗バー (.progress-bar の幅を scroll 位置で更新)
 *  2) STORY タイトルのタイプライター風登場 + 完了後に本文をすぐ表示
 */
(function () {
  /* ===== 1. 読書進捗バー ===== */
  const bar = document.querySelector(".progress-bar");
  if (bar) {
    let ticking = false;

    function updateProgress() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      bar.style.width = percent + "%";
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateProgress);
          ticking = true;
        }
      },
      { passive: true }
    );
    updateProgress();
  }

  /* ===== 2. タイプライター登場（.js-typewriter クラスに適用） ===== */
  const titles = document.querySelectorAll(".js-typewriter");
  if (!titles.length || !("IntersectionObserver" in window)) return;

  // reduced-motion 設定なら何もしない
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // 速度設定
  const CHAR_STEP = 40; // ms per char

  // タイトルを1文字ずつ span に分割
  titles.forEach((title) => {
    const text = title.textContent;
    title.innerHTML = "";
    Array.from(text).forEach((char, i) => {
      const span = document.createElement("span");
      span.className = "char";
      span.style.transitionDelay = i * CHAR_STEP + "ms";
      span.textContent = char === " " ? " " : char;
      title.appendChild(span);
    });
  });

  // top__intro__text を <br> で分割し、行ごとの span を生成（ステージング用）
  const introText = document.querySelector(".top__intro__text");
  if (introText) {
    const lines = introText.innerHTML
      .split(/<br\s*\/?>/i)
      .map((l) => l.trim())
      .filter((l) => l);
    introText.innerHTML = lines
      .map(
        (line, i) =>
          `<span class="line" style="transition-delay: ${i * 280}ms">${line}</span>`
      )
      .join("");
  }

  // ビューポートに入ったら .is-typing で発火し、最終文字が出始めるタイミングで本文も表示
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const title = entry.target;
        title.classList.add("is-typing");
        obs.unobserve(title);

        // .single__story または .top__intro のどちらかを親として探す
        const section = title.closest(".single__story, .top__intro");
        if (!section) return;

        // 最終文字が動き出した瞬間に本文 reveal（待ち時間最小化）
        const charCount = title.querySelectorAll(".char").length;
        const finishMs = (charCount - 1) * CHAR_STEP;

        setTimeout(() => {
          section.classList.add("is-text-ready");
        }, finishMs);
      });
    },
    { threshold: 0.25 }
  );

  titles.forEach((t) => observer.observe(t));
})();
