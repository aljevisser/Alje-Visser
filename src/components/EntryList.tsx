import type { JournalEntry } from '../types/entry';
import { formatDateGroup, getDateKey } from '../lib/dates';
import { EntryCard } from './EntryCard';

interface EntryListProps {
  entries: JournalEntry[];
  onSelect: (entry: JournalEntry) => void;
}

export function EntryList({ entries, onSelect }: EntryListProps) {
  const groups = new Map<string, { label: string; entries: JournalEntry[] }>();

  for (const entry of entries) {
    const key = getDateKey(entry.createdAt);
    if (!groups.has(key)) {
      groups.set(key, { label: formatDateGroup(entry.createdAt), entries: [] });
    }
    groups.get(key)!.entries.push(entry);
  }

  return (
    <div className="entry-list">
      {Array.from(groups.values()).map(group => (
        <div key={group.label} className="entry-group">
          <h2 className="entry-group-label">{group.label}</h2>
          {group.entries.map(entry => (
            <EntryCard key={entry.id} entry={entry} onClick={() => onSelect(entry)} />
          ))}
        </div>
      ))}
    </div>
  );
}
