/**
 * single ページの写真スライダー（slick）
 */
(function () {
  // jQuery と slick が読み込まれているか確認
  if (typeof window.jQuery === "undefined" || typeof window.jQuery.fn.slick === "undefined") return;

  jQuery(function ($) {
    const $slider = $(".single__photos");
    if (!$slider.length) return;

    $slider.slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0, // 0 = 連続スクロール
      speed: 6000, // ゆっくりスムーズに流す
      cssEase: "linear", // 等速で流れる
      arrows: false,
      dots: false,
      infinite: true,
      pauseOnHover: false, // ホバーで止めない
      pauseOnFocus: false,
      swipe: false, // 流れを止めない
      draggable: false,
      responsive: [
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 4,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    });
  });
})();
