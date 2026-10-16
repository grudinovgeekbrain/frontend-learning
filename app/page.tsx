import LeadForm from "./ui/LeadForm";

const coffees = [
  { number: "01", name: "Эфиопия Иргачеффе", notes: "Цветы · бергамот · чайная лёгкость", roast: "Светлая обжарка", price: "32", weight: "250 г", tone: "gold" },
  { number: "02", name: "Колумбия Уила", notes: "Карамель · красное яблоко · мягкая сладость", roast: "Средняя обжарка", price: "29", weight: "250 г", tone: "rose" },
  { number: "03", name: "Бразилия Серрадо", notes: "Орех · шоколад · плотное тело", roast: "Под эспрессо", price: "26", weight: "250 г", tone: "brown" },
  { number: "04", name: "Дрип-пакеты, ассорти", notes: "Десять чашек без кофемашины", roast: "10 штук", price: "18", weight: "набор", tone: "cream" }
];

export default function Home() {
  return <main>
    <header className="nav wrap">
      <a className="wordmark" href="#" aria-label="Кварта — на главную"><span className="mark">к.</span> кварта<span className="wordmark-dot">/</span></a>
      <nav aria-label="Основная навигация">
        <a href="#coffee">Кофе</a><a href="#subscription">Подписка</a><a href="#story">Мастерская</a>
      </nav>
      <a className="nav-cta" href="#order">Выбрать кофе <span>↗</span></a>
    </header>

    <section className="hero wrap">
      <div className="hero-copy">
        <p className="eyebrow"><span className="live-dot"></span> НЕБОЛЬШАЯ ОБЖАРКА · МИНСК</p>
        <h1>Хороший кофе<br/>не любит <em>ждать.</em></h1>
        <p className="hero-intro">Обжариваем маленькими партиями по четвергам. В пятницу развозим по Минску — чтобы зерно приехало к вам на пике свежести.</p>
        <div className="hero-actions"><a className="button button-dark" href="#coffee">Выбрать свой кофе <span>↗</span></a><a className="text-link" href="#story">Знакомьтесь, мы Кварта <span>↓</span></a></div>
        <div className="hero-proof"><div className="proof-avatars"><span>А</span><span>Д</span></div><p><strong>Аня и Дмитрий</strong><br/>обжаривают с 2019 года</p><span className="proof-separator"></span><p><strong>1–3 дня</strong><br/>от обжарки до вас</p></div>
      </div>
      <div className="hero-visual">
        <div className="hero-image" role="img" aria-label="Свежие кофейные зёрна и чашка кофе"></div>
        <div className="image-label"><span>ПАРТИЯ № 024</span><span>ОБЖАРЕНО С ЗАБОТОЙ ↗</span></div>
        <div className="round-stamp"><span>FRESH</span><strong>не залеживается</strong><span>ROASTED IN MINSK</span></div>
      </div>
      <div className="hero-bottom-note"><span>01 / 04</span><span>МАЛЕНЬКИЕ ПАРТИИ. БОЛЬШОЙ ВКУС.</span><span>ПРОКРУТИТЕ ↓</span></div>
    </section>

    <section className="ticker" aria-label="Наш принцип"><div>ОБЖАРКА ПО ЧЕТВЕРГАМ <span>✳</span> ДОСТАВКА ПО ПЯТНИЦАМ <span>✳</span> КОФЕ НА СВОЁМ ПИКЕ <span>✳</span> ОБЖАРКА ПО ЧЕТВЕРГАМ <span>✳</span> ДОСТАВКА ПО ПЯТНИЦАМ <span>✳</span></div></section>

    <section id="coffee" className="section wrap coffee-section">
      <div className="section-heading"><div><p className="eyebrow">НА ПОЛКЕ СЕЙЧАС</p><h2>Четыре повода<br/>поставить чайник.</h2></div><p className="section-side-copy">Не коллекционируем сорта ради списка. Выбираем те, к которым хочется вернуться.</p></div>
      <div className="coffee-grid">{coffees.map((coffee) => <article className={`coffee-card ${coffee.tone}`} key={coffee.number}>
        <div className="coffee-art"><span className="coffee-number">{coffee.number}</span><div className="coffee-shape"><span></span><span></span><span></span></div><span className="coffee-weight">{coffee.weight}</span></div>
        <div className="coffee-info"><p className="roast">{coffee.roast}</p><h3>{coffee.name}</h3><p className="notes">{coffee.notes}</p><div className="coffee-price"><span><strong>{coffee.price}</strong> BYN</span><a href={`#order?product=${encodeURIComponent(coffee.name)}`} aria-label={`Заказать: ${coffee.name}`}>Заказать <span>↗</span></a></div></div>
      </article>)}</div>
      <p className="small-note">Обжариваем по мере заказов. Если сорта временно нет — предложим похожий по вкусу.</p>
    </section>

    <section id="subscription" className="subscription-section">
      <div className="subscription-inner wrap"><div className="subscription-art"><div className="sub-circle"><span>К</span><span>РАЗ В МЕСЯЦ</span></div><div className="sub-bag bag-one">КВАРТА<br/><small>КОФЕ НА КАЖДЫЙ ДЕНЬ</small></div><div className="sub-bag bag-two">FRESH<br/><small>ROASTED IN MINSK</small></div><span className="scribble">без лишних<br/>решений ↗</span></div>
        <div className="subscription-copy"><p className="eyebrow">ПОДПИСКА НА ХОРОШЕЕ</p><h2>Кофе сам<br/>приходит <em>к вам.</em></h2><p>Две пачки по 250 г раз в месяц. Мы подберём сочетание под ваш вкус и привезём бесплатно. Никаких напоминаний себе — только утренний кофе.</p><div className="subscription-price"><strong>54 BYN</strong><span>/ месяц</span></div><a className="button button-light" href="#order">Хочу подписку <span>↗</span></a><p className="fine-print">Можно обсудить вкусы при звонке. Без сложных условий.</p></div></div>
    </section>

    <section id="story" className="section wrap story-section"><div className="story-number">К / 2019</div><div className="story-main"><p className="eyebrow">НЕ ФАБРИКА. МАСТЕРСКАЯ.</p><h2>Мы Аня и Дима.<br/><em>Кофе — наша привычка.</em></h2><p className="story-text">Раньше мы работали бариста и слишком часто видели, как хороший кофе теряет вкус, пока ждёт своего часа. В 2019-м купили небольшой ростер и начали обжаривать для друзей. Теперь каждую неделю делаем то же самое — только чуть больше.</p><div className="story-facts"><div><strong>5 кг</strong><span>одна партия</span></div><div><strong>Чт → Пт</strong><span>обжарка и доставка</span></div><div><strong>Короля, 9</strong><span>можно забрать самим</span></div></div></div><div className="story-photo" role="img" aria-label="Рабочее место небольшой кофейной мастерской"></div></section>

    <section className="delivery-section"><div className="wrap delivery-grid"><div><p className="eyebrow">ПРОСТО ПОЛУЧИТЬ</p><h2>Кофе едет.<br/><em>Вы ждёте чашку.</em></h2></div><div className="delivery-item"><span className="delivery-icon">↗</span><h3>Доставка по Минску</h3><p>Каждую пятницу. При заказе от 50 BYN — за наш счёт.</p></div><div className="delivery-item"><span className="delivery-icon">⌂</span><h3>Самовывоз</h3><p>Минск, ул. Короля, 9.<br/>Пн–пт 8:00–20:00<br/>Сб–вс 10:00–18:00</p></div></div></section>

    <section id="order" className="section wrap order-section"><div className="order-intro"><p className="eyebrow">ДАВАЙТЕ ЗНАКОМИТЬСЯ</p><h2>Что-нибудь<br/><em>вкусное начнём?</em></h2><p>Оставьте номер — Аня или Дима перезвонят, помогут выбрать и ответят на вопросы. Никакой корзины и оплаты на сайте.</p><div className="contact-note"><span className="contact-dot"></span><span>Обычно отвечаем в течение рабочего дня.</span></div></div><LeadForm /></section>

    <footer className="footer"><div className="wrap footer-top"><a className="wordmark footer-logo" href="#"><span className="mark">к.</span> кварта<span className="wordmark-dot">/</span></a><p>Хороший кофе. Без лишнего шума.</p><a href="#order">Написать нам ↗</a></div><div className="wrap footer-bottom"><span>© Кварта, 2019–2026</span><span>ОБЖАРЕНО В МИНСКЕ</span><a href="#top">Наверх ↑</a></div></footer>
  </main>;
}
