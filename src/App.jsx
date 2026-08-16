import { useState } from "react";
import vocabulary from "./data/vocabulary.json";
import "./App.css";

function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [...new Set(vocabulary.map((item) => item.category))];

  const openVocabulary = () => {
    setScreen("vocabulary");
  };

  const openCategory = (category) => {
    setSelectedCategory(category);
    setScreen("category");
  };

  const goHome = () => {
    setScreen("home");
    setSelectedCategory(null);
  };

  const goBack = () => {
    if (screen === "category") {
      setScreen("vocabulary");
      setSelectedCategory(null);
      return;
    }

    if (screen === "vocabulary") {
      goHome();
    }
  };

  return (
    <div className="app">
      <header className="top-bar">
        {screen !== "home" && (
          <button
            className="back-button"
            type="button"
            onClick={goBack}
            aria-label="Geri"
          >
            ←
          </button>
        )}

        <h1>Macarca</h1>
      </header>

      <main className="main-content">
        {screen === "home" && <Home onOpenVocabulary={openVocabulary} />}

        {screen === "vocabulary" && (
          <Vocabulary categories={categories} onSelectCategory={openCategory} />
        )}

        {screen === "category" && (
          <Category category={selectedCategory} vocabulary={vocabulary} />
        )}
      </main>

      <BottomNavigation
        activeScreen={screen}
        onHome={goHome}
        onVocabulary={openVocabulary}
      />
    </div>
  );
}

function Home({ onOpenVocabulary }) {
  return (
    <>
      <section className="welcome-section">
        <h2>Jó reggelt!</h2>
        <p>Neler öğrenmek istersin?</p>
      </section>

      <nav className="home-navigation">
        <NavigationCard
          icon="📖"
          title="Kelime Kartları"
          description="Yeni kelimeler öğren ve kelime dağarcığını geliştir."
          onClick={onOpenVocabulary}
        />

        <NavigationCard
          icon="💬"
          title="Günlük Cümleler"
          description="Sık kullanılan pratik ifadeleri keşfet."
          disabled
        />

        <NavigationCard
          icon="?"
          title="Pratik / Tekrar"
          description="Öğrendiklerini pekiştir ve kendini test et."
          disabled
        />
      </nav>
    </>
  );
}

function NavigationCard({
  icon,
  title,
  description,
  onClick,
  disabled = false,
}) {
  return (
    <button
      className={`navigation-card ${disabled ? "is-disabled" : ""}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="navigation-icon">{icon}</span>

      <span className="navigation-content">
        <strong>{title}</strong>
        <span>{description}</span>
      </span>

      <span className="navigation-arrow">›</span>
    </button>
  );
}

function Vocabulary({ categories, onSelectCategory }) {
  return (
    <section>
      <div className="page-heading">
        <span className="eyebrow">KELİMELER</span>
        <h2>Kelime Kartları</h2>
        <p>Öğrenmek istediğin kategoriyi seç.</p>
      </div>

      <div className="category-list">
        {categories.map((category) => (
          <button
            className="category-card"
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
          >
            <span>
              <strong>Greetings & Introductions</strong>
              <small>15 kelime</small>
            </span>

            <span className="navigation-arrow">›</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Category({ category, vocabulary }) {
  const items = vocabulary.filter((item) => item.category === category);

  return (
    <section>
      <div className="page-heading">
        <span className="eyebrow">KATEGORİ</span>
        <h2>Greetings & Introductions</h2>
        <p>{items.length} kelime ve ifade</p>
      </div>

      <div className="word-list">
        {items.map((item) => (
          <article className="word-item" key={item.id}>
            <div>
              <span className="word-turkish">{item.turkish}</span>
              <span className="word-hungarian">{item.hungarian}</span>

              {item.note && <span className="word-note">{item.note}</span>}
            </div>

            <span className="navigation-arrow">›</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function BottomNavigation({ activeScreen, onHome, onVocabulary }) {
  return (
    <nav className="bottom-navigation">
      <button
        className={activeScreen === "home" ? "active" : ""}
        type="button"
        onClick={onHome}
      >
        <span>⌂</span>
        <small>Ana Sayfa</small>
      </button>

      <button
        className={
          activeScreen === "vocabulary" || activeScreen === "category"
            ? "active"
            : ""
        }
        type="button"
        onClick={onVocabulary}
      >
        <span>📖</span>
        <small>Kelimeler</small>
      </button>

      <button type="button" disabled>
        <span>?</span>
        <small>Tekrar</small>
      </button>

      <button type="button" disabled>
        <span>○</span>
        <small>Profil</small>
      </button>
    </nav>
  );
}

export default App;
