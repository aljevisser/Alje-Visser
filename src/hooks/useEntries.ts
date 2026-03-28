import { useState, useCallback } from 'react';
import type { JournalEntry } from '../types/entry';
import * as storage from '../lib/storage';

export function useEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => storage.getAllEntries());

  const createEntry = useCallback((title: string, body: string): JournalEntry => {
    const now = new Date().toISOString();
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: now,
      updatedAt: now,
    };
    storage.saveEntry(entry);
    setEntries(storage.getAllEntries());
    return entry;
  }, []);

  const updateEntry = useCallback((id: string, title: string, body: string) => {
    const existing = storage.getEntry(id);
    if (!existing) return;
    const updated: JournalEntry = {
      ...existing,
      title,
      body,
      updatedAt: new Date().toISOString(),
    };
    storage.saveEntry(updated);
    setEntries(storage.getAllEntries());
  }, []);

  const removeEntry = useCallback((id: string) => {
    storage.deleteEntry(id);
    setEntries(storage.getAllEntries());
  }, []);

  return { entries, createEntry, updateEntry, removeEntry };
}
