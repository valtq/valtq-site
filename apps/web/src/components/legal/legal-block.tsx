import type { Dictionary } from '@/i18n/get-dictionary';
import type {
  BrowserStorageItem,
  LegalBlock as LegalBlockModel,
  LegalNoticeTone,
} from '@/content/legal';

function LegalNotice({ tone, text }: { tone: LegalNoticeTone; text: string }) {
  const styles = {
    info: 'border-primary/20 bg-primary/5',
    caution: 'border-tertiary/20 bg-tertiary/5',
  }[tone];
  const dot = tone === 'info' ? 'bg-primary' : 'bg-tertiary';

  return (
    <aside className={`rounded-xl border p-5 ${styles}`}>
      <div className="flex items-start gap-3">
        <span className={`mt-[0.7em] h-2 w-2 shrink-0 rounded-full ${dot}`} aria-hidden="true" />
        <p className="text-base leading-[1.8] text-on-surface rtl:leading-[2.1]">{text}</p>
      </div>
    </aside>
  );
}

function StorageInventory({
  items,
  dict,
}: {
  items: BrowserStorageItem[];
  dict: Dictionary;
}) {
  const t = dict.legal;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-container-lowest">
      <div className="hidden grid-cols-12 gap-4 border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-wide text-on-surface-variant sm:grid">
        <span className="col-span-3">{t.storageKeyLabel}</span>
        <span className="col-span-2">{t.storageTypeLabel}</span>
        <span className="col-span-7">{t.storagePurposeLabel}</span>
      </div>
      {items.map((item) => (
        <div
          key={item.key}
          className="grid gap-2 border-b border-border px-5 py-4 last:border-b-0 sm:grid-cols-12 sm:gap-4"
        >
          <span className="break-all font-mono text-sm font-medium text-on-surface sm:col-span-3">
            {item.key}
          </span>
          <div className="flex flex-wrap items-center gap-3 sm:col-span-9">
            <span className="text-sm text-on-surface-variant">{item.mechanism}</span>
            <span
              className={
                item.essential
                  ? 'inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-tertiary'
                  : 'inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground'
              }
            >
              {item.essential ? t.storageEssentialLabel : t.storagePreferenceLabel}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-on-surface-variant rtl:leading-[1.9] sm:col-span-12">
            {item.purpose}
          </p>
        </div>
      ))}
    </div>
  );
}

export function LegalBlock({ block, dict }: { block: LegalBlockModel; dict: Dictionary }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-base leading-[1.8] text-on-surface-variant rtl:leading-[2.1]">
          {block.text}
        </p>
      );
    case 'h3':
      return (
        <h3
          id={block.id}
          className="font-display scroll-mt-28 pt-4 text-xl font-semibold tracking-tight text-on-surface rtl:leading-[1.4]"
        >
          {block.heading}
        </h3>
      );
    case 'ul':
      return (
        <ul className="space-y-3">
          {block.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-base leading-[1.8] text-on-surface-variant rtl:leading-[2.1]"
            >
              <span
                className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-tertiary"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-3">
          {block.items.map((item, index) => (
            <li
              key={item}
              className="flex items-start gap-3 text-base leading-[1.8] text-on-surface-variant rtl:leading-[2.1]"
            >
              <span className="font-display mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-surface-container-lowest text-sm font-semibold text-primary">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      );
    case 'notice':
      return <LegalNotice tone={block.tone} text={block.text} />;
    case 'storageInventory':
      return <StorageInventory items={block.items} dict={dict} />;
    default:
      return null;
  }
}
