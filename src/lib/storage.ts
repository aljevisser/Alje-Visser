import type { JournalEntry } from '../types/entry';

const STORAGE_KEY = 'journal-entries';

export function getAllEntries(): JournalEntry[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const entries: JournalEntry[] = JSON.parse(raw);
  return entries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getEntry(id: string): JournalEntry | null {
  const entries = getAllEntries();
  return entries.find(e => e.id === id) ?? null;
}

export function saveEntry(entry: JournalEntry): void {
  const entries = getAllEntries();
  const index = entries.findIndex(e => e.id === entry.id);
  if (index >= 0) {
    entries[index] = entry;
  } else {
    entries.push(entry);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function deleteEntry(id: string): void {
  const entries = getAllEntries().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}
