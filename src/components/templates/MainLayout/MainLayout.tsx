import React from 'react';
import styles from './MainLayout.module.css';

interface MainLayoutProps {
  header: React.ReactNode;
  searchForm: React.ReactNode;
  resultsList: React.ReactNode;
  favoritesSidebar: React.ReactNode;
}

export const MainLayout = ({
  header,
  searchForm,
  resultsList,
  favoritesSidebar,
}: MainLayoutProps) => {
  return (
    <div className={styles.layoutContainer}>
      {/* Sección Izquierda: Buscador y Resultados */}
      <main className={styles.mainContent}>
        <header className={styles.headerWrapper}>
          {header}
        </header>
        
        <section className={styles.searchSection}>
          {searchForm}
        </section>
        
        <section className={styles.resultsSection}>
          {resultsList}
        </section>
      </main>

      {/* Sección Derecha: Sidebar Fijo/Responsivo */}
      <aside className={styles.sidebar}>
        {favoritesSidebar}
      </aside>
    </div>
  );
};