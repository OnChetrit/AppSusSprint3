import { MailPreview } from './MailPreview.jsx';
import { MailSearch } from './MailSearch.jsx';
import { MailSort } from './MailSort.jsx';

export function MailList({
  mails,
  user,
  onIsStared,
  onRemoveMail,
  onSetSearch,
  onSetArchive,
  onRestoreMail,
  onOpenMail,
  onSetRead,
  onSetSortedBy,
  onSelectMail,
  onRemoveSelected,
  onSelectedArchive,
  onSetSelectedRead,
  onRestoreSelected
}) {
  if (!mails) return <div>There's No Mails</div>;
  return (
    <div className="mail-list">
      <MailSearch onSetSearch={onSetSearch} />
      <MailSort 
      onSetSortedBy={onSetSortedBy} 
      onRemoveSelected={onRemoveSelected} 
      onSelectedArchive={onSelectedArchive}
      onSetSelectedRead={onSetSelectedRead}
      onRestoreSelected={onRestoreSelected}
      />
      {mails.map((mail) => (
        <MailPreview
          key={mail.id}
          mail={mail}
          mails={mails}
          user={user}
          onIsStared={onIsStared}
          onRemoveMail={onRemoveMail}
          onSetArchive={onSetArchive}
          onRestoreMail={onRestoreMail}
          onOpenMail={onOpenMail}
          onSetRead={onSetRead}
          onSelectMail={onSelectMail}
        />
      ))}
    </div>
  );
}
