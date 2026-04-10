export default function PrivacyPage() {
  return (
    <main className="ok-container py-24">
      <h1 className="font-display uppercase font-extrabold tracking-tight text-[clamp(28px,4vw,56px)] leading-[0.95]">
        Политика конфиденциальности
      </h1>
      <p className="mt-8 max-w-[860px] text-[14px] leading-relaxed text-ok-muted">
        Мы используем данные из формы только для ответа на ваш запрос. Никаких рассылок “по умолчанию”.
        Если вы хотите удалить отправленные данные — напишите на{" "}
        <a className="text-foreground hover:text-ok-lime" href="mailto:email@ok-agency.ru">
          email@ok-agency.ru
        </a>
        .
      </p>
    </main>
  );
}

