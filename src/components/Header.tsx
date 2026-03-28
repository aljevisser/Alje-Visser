interface HeaderProps {
  onNewEntry: () => void;
}

export function Header({ onNewEntry }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="header-title">Mijn Dagboek</h1>
      <button className="btn-new" onClick={onNewEntry} aria-label="Nieuwe notitie">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </header>
  );
}
