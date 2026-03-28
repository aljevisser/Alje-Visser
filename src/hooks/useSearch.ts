import { useState, useMemo } from 'react';
import type { JournalEntry } from '../types/entry';

export function useSearch(entries: JournalEntry[]) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return entries;
    const q = query.toLowerCase();
    return entries.filter(
      e => e.title.toLowerCase().includes(q) || e.body.toLowerCase().includes(q)
    );
  }, [entries, query]);

  return { query, setQuery, filtered };
}
