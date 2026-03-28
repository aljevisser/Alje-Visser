import { useState } from 'react';
import type { JournalEntry } from '../types/entry';
import { formatFullDate } from '../lib/dates';
import { ConfirmDialog } from './ConfirmDialog';

interface EntryEditorProps {
  entry: JournalEntry | null;
  onSave: (title: string, body: string) => void;
  onDelete?: () => void;
  onBack: () => void;
}

export function EntryEditor({ entry, onSave, onDelete, onBack }: EntryEditorProps) {
  const [title, setTitle] = useState(entry?.title ?? '');
  const [body, setBody] = useState(entry?.body ?? '');
  const [showDelete, setShowDelete] = useState(false);

  const hasContent = title.trim() || body.trim();

  function handleBack() {
    if (hasContent) {
      onSave(title.trim(), body.trim());
    }
    onBack();
  }

  function handleDelete() {
    setShowDelete(false);
    onDelete?.();
  }

  return (
    <div className="editor">
      <header className="editor-header">
        <button className="editor-back" onClick={handleBack} aria-label="Terug">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="editor-actions">
          {entry && onDelete && (
            <button className="editor-delete" onClick={() => setShowDelete(true)} aria-label="Verwijderen">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <div className="editor-body">
        <input
          className="editor-title"
          type="text"
          placeholder="Titel"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus={!entry}
        />
        <textarea
          className="editor-textarea"
          placeholder="Schrijf je gedachten..."
          value={body}
          onChange={e => setBody(e.target.value)}
          autoFocus={!!entry}
        />
        {entry && (
          <p className="editor-date">{formatFullDate(entry.createdAt)}</p>
        )}
      </div>

      {showDelete && (
        <ConfirmDialog
          message="Weet je zeker dat je deze notitie wilt verwijderen?"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  );
}
