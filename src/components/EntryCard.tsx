import type { JournalEntry } from '../types/entry';
import { formatTime } from '../lib/dates';

interface EntryCardProps {
  entry: JournalEntry;
  onClick: () => void;
}

export function EntryCard({ entry, onClick }: EntryCardProps) {
  const title = entry.title || entry.body.split('\n')[0].slice(0, 60) || 'Zonder titel';
  const preview = entry.body.slice(0, 120).replace(/\n/g, ' ');

  return (
    <button className="entry-card" onClick={onClick}>
      <div className="entry-card-header">
        <span className="entry-card-title">{title}</span>
        <span className="entry-card-time">{formatTime(entry.createdAt)}</span>
      </div>
      {preview && <p className="entry-card-preview">{preview}</p>}
    </button>
  );
}
