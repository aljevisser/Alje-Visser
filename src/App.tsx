import { useState, useEffect } from 'react';
import type { JournalEntry } from './types/entry';
import { useEntries } from './hooks/useEntries';
import { useSearch } from './hooks/useSearch';
import { exportEntries, importEntries } from './lib/storage';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { EntryList } from './components/EntryList';
import { EntryEditor } from './components/EntryEditor';
import { EmptyState } from './components/EmptyState';

type View = { type: 'list' } | { type: 'editor'; entry: JournalEntry | null };

function App() {
  const { entries, createEntry, updateEntry, removeEntry, refresh } = useEntries();
  const { query, setQuery, filtered } = useSearch(entries);
  const [view, setView] = useState<View>({ type: 'list' });

  useEffect(() => {
    navigator.storage?.persist();
  }, []);

  function handleNewEntry() {
    setView({ type: 'editor', entry: null });
  }

  function handleSelectEntry(entry: JournalEntry) {
    setView({ type: 'editor', entry });
  }

  function handleSave(title: string, body: string) {
    if (!title && !body) return;
    if (view.type === 'editor' && view.entry) {
      updateEntry(view.entry.id, title, body);
    } else {
      createEntry(title, body);
    }
  }

  function handleDelete() {
    if (view.type === 'editor' && view.entry) {
      removeEntry(view.entry.id);
    }
    setView({ type: 'list' });
  }

  function handleBack() {
    setView({ type: 'list' });
  }

  async function handleExport() {
    await exportEntries();
  }

  async function handleImport(file: File) {
    try {
      const count = await importEntries(file);
      await refresh();
      alert(`${count} notities geïmporteerd.`);
    } catch {
      alert('Importeren mislukt. Controleer of het een geldig backup-bestand is.');
    }
  }

  if (view.type === 'editor') {
    return (
      <EntryEditor
        entry={view.entry}
        onSave={handleSave}
        onDelete={view.entry ? handleDelete : undefined}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="app">
      <Header onNewEntry={handleNewEntry} onExport={handleExport} onImport={handleImport} />
      {entries.length > 0 && (
        <SearchBar query={query} onChange={setQuery} />
      )}
      {filtered.length > 0 ? (
        <EntryList entries={filtered} onSelect={handleSelectEntry} />
      ) : (
        <EmptyState hasSearch={query.length > 0} />
      )}
    </div>
  );
}

export default App;
