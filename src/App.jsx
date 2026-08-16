import { useState } from "react";
import vocabulary from "./data/vocabulary.json";
import "./App.css";

const categoryLabels = {
  greetings: "Greetings & Introductions",
};

function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [...new Set(vocabulary.map((item) => item.category))];

  const openVocabulary = () => {
    setScreen("vocabulary");
    setSelectedCategory(null);
    setSelectedItem(null);
  };

  const openCategory = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setScreen("category");
  };

  const openItem = (item) => {
    setSelectedItem(item);
    setScreen("detail");
  };

  const goHome = () => {
    setScreen("home");
    setSelectedCategory(null);
    setSelectedItem(null);
  };

  const goBack = () => {
    if (screen === "detail") {
      setScreen("category");
      setSelectedItem(null);
      return;
    }

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
          <Vocabulary
            categories={categories}
            vocabulary={vocabulary}
            onSelectCategory={openCategory}
          />
        )}

        {screen === "category" && (
          <Category
            category={selectedCategory}
            vocabulary={vocabulary}
            onSelectItem={openItem}
          />
        )}

        {screen === "detail" && selectedItem && (
          <WordDetail
            key={selectedItem.id}
            item={selectedItem}
            vocabulary={vocabulary}
            category={selectedCategory}
            onSelectItem={setSelectedItem}
          />
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

function Vocabulary({ categories, vocabulary, onSelectCategory }) {
  return (
    <section>
      <div className="page-heading">
        <span className="eyebrow">KELİMELER</span>
        <h2>Kelime Kartları</h2>
        <p>Öğrenmek istediğin kategoriyi seç.</p>
      </div>

      <div className="category-list">
        {categories.map((category) => {
          const itemCount = vocabulary.filter(
            (item) => item.category === category,
          ).length;

          return (
            <button
              className="category-card"
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
            >
              <span>
                <strong>{categoryLabels[category] || category}</strong>

                <small>{itemCount} kelime</small>
              </span>

              <span className="navigation-arrow">›</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function Category({ category, vocabulary, onSelectItem }) {
  const items = vocabulary.filter((item) => item.category === category);
  const categoryName = categoryLabels[category] || category;

  return (
    <section>
      <div className="page-heading">
        <span className="eyebrow">KATEGORİ</span>
        <h2>{categoryName}</h2>
        <p>{items.length} kelime ve ifade</p>
      </div>

      <div className="word-list">
        {items.map((item) => (
          <button
            className="word-item"
            key={item.id}
            type="button"
            onClick={() => onSelectItem(item)}
          >
            <span className="word-item-content">
              <span className="word-turkish">{item.turkish}</span>
              <span className="word-hungarian">{item.hungarian}</span>
            </span>

            <span className="navigation-arrow">›</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function WordDetail({ item, vocabulary, category, onSelectItem }) {
  const [revealed, setRevealed] = useState(false);

  const categoryItems = vocabulary.filter(
    (vocabularyItem) => vocabularyItem.category === category,
  );

  const currentIndex = categoryItems.findIndex(
    (vocabularyItem) => vocabularyItem.id === item.id,
  );

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < categoryItems.length - 1;

  const showPrevious = () => {
    if (hasPrevious) {
      onSelectItem(categoryItems[currentIndex - 1]);
    }
  };

  const showNext = () => {
    if (hasNext) {
      onSelectItem(categoryItems[currentIndex + 1]);
    }
  };

  return (
    <section className="word-detail">
      <div className="page-heading">
        <span className="eyebrow">KELİME</span>
        <p>
          {currentIndex + 1} / {categoryItems.length}
        </p>
      </div>

      <button
        className={`learning-card ${revealed ? "revealed" : ""}`}
        type="button"
        onClick={() => setRevealed((current) => !current)}
        aria-label={
          revealed ? "Türkçe anlamı gizle" : "Macarca karşılığını göster"
        }
      >
        <span className="card-label">{revealed ? "MACARCA" : "TÜRKÇE"}</span>

        <span className="card-main-text">
          {revealed ? item.hungarian : item.turkish}
        </span>

        {!revealed && (
          <span className="card-hint">Macarcayı görmek için dokun</span>
        )}

        {revealed && item.note && (
          <span className="card-note">{item.note}</span>
        )}
      </button>

      <div className="card-navigation">
        <button
          className="card-navigation-button"
          type="button"
          onClick={showPrevious}
          disabled={!hasPrevious}
        >
          ← Önceki
        </button>

        <button
          className="card-navigation-button primary"
          type="button"
          onClick={showNext}
          disabled={!hasNext}
        >
          Sonraki →
        </button>
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
          activeScreen === "vocabulary" ||
          activeScreen === "category" ||
          activeScreen === "detail"
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
