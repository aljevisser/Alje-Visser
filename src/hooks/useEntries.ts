import { useState, useCallback, useEffect } from 'react';
import type { JournalEntry } from '../types/entry';
import * as storage from '../lib/storage';

export function useEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const refresh = useCallback(async () => {
    setEntries(await storage.getAllEntries());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createEntry = useCallback(async (title: string, body: string): Promise<JournalEntry> => {
    const now = new Date().toISOString();
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      title,
      body,
      createdAt: now,
      updatedAt: now,
    };
    await storage.saveEntry(entry);
    await refresh();
    return entry;
  }, [refresh]);

  const updateEntry = useCallback(async (id: string, title: string, body: string) => {
    const existing = await storage.getEntry(id);
    if (!existing) return;
    const updated: JournalEntry = {
      ...existing,
      title,
      body,
      updatedAt: new Date().toISOString(),
    };
    await storage.saveEntry(updated);
    await refresh();
  }, [refresh]);

  const removeEntry = useCallback(async (id: string) => {
    await storage.deleteEntry(id);
    await refresh();
  }, [refresh]);

  return { entries, createEntry, updateEntry, removeEntry };
}
