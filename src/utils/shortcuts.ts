/** 앱 전역 단축키 (페이지 이동 + 모달 토글) */

export type ShortcutId =
  | 'nav-main'
  | 'nav-pokedex'
  | 'nav-abilities'
  | 'nav-items'
  | 'nav-moves'
  | 'nav-make-team'
  | 'modal-type-calc'
  | 'modal-type-table'
  | 'modal-team'
  | 'modal-nature';

export type ShortcutBinding = {
  shift: boolean;
  ctrl: boolean;
  alt: boolean;
  /** 소문자 키 (예: 'q', '1') */
  key: string;
};

export type ShortcutDef = {
  id: ShortcutId;
  label: string;
  group: 'nav' | 'modal';
  href?: string;
};

export const SHORTCUT_DEFS: ShortcutDef[] = [
  { id: 'nav-main', label: '메인', group: 'nav', href: '/' },
  { id: 'nav-pokedex', label: '도감', group: 'nav', href: '/pokedex' },
  { id: 'nav-abilities', label: '특성', group: 'nav', href: '/abilities' },
  { id: 'nav-items', label: '도구', group: 'nav', href: '/items' },
  { id: 'nav-moves', label: '기술', group: 'nav', href: '/moves' },
  { id: 'nav-make-team', label: '팀만들기', group: 'nav', href: '/make-team' },
  { id: 'modal-type-calc', label: '타입 계산기', group: 'modal' },
  { id: 'modal-type-table', label: '타입 상성표', group: 'modal' },
  { id: 'modal-team', label: '팀', group: 'modal' },
  { id: 'modal-nature', label: '성격', group: 'modal' },
];

export const DEFAULT_SHORTCUTS: Record<ShortcutId, ShortcutBinding> = {
  'nav-main': { shift: false, ctrl: false, alt: false, key: '' },
  'nav-pokedex': { shift: true, ctrl: false, alt: false, key: 'q' },
  'nav-abilities': { shift: true, ctrl: false, alt: false, key: 'w' },
  'nav-items': { shift: true, ctrl: false, alt: false, key: 'e' },
  'nav-moves': { shift: true, ctrl: false, alt: false, key: 'r' },
  'nav-make-team': { shift: true, ctrl: false, alt: false, key: 't' },
  'modal-type-calc': { shift: true, ctrl: false, alt: false, key: 'v' },
  'modal-type-table': { shift: true, ctrl: false, alt: false, key: 'f' },
  'modal-team': { shift: true, ctrl: false, alt: false, key: 'd' },
  'modal-nature': { shift: true, ctrl: false, alt: false, key: 'c' },
};

/** 실제 동작하는 단축키인지 (키 + 특수키 필요) */
export function isShortcutBound(binding: ShortcutBinding): boolean {
  return (
    binding.key.length > 0 && (binding.shift || binding.ctrl || binding.alt)
  );
}

export function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return target.isContentEditable;
}

/** 단독 특수키·기능키 등은 단축키 키로 쓰지 않음 */
function isModifierOnlyCode(code: string): boolean {
  return (
    code.startsWith('Shift') ||
    code.startsWith('Control') ||
    code.startsWith('Alt') ||
    code.startsWith('Meta') ||
    code === 'CapsLock' ||
    code === 'Tab' ||
    code === 'Escape' ||
    code === 'Enter' ||
    code === 'Backspace' ||
    code === 'Delete' ||
    code === 'Space' ||
    code.startsWith('Arrow')
  );
}

/**
 * KeyboardEvent → 바인딩.
 * 특수키(Shift/Ctrl/Alt) 중 하나 이상 + 일반 키가 아니면 null.
 */
export function eventToShortcutBinding(
  event: KeyboardEvent,
): ShortcutBinding | null {
  if (isModifierOnlyCode(event.code)) return null;

  const shift = event.shiftKey;
  const ctrl = event.ctrlKey;
  const alt = event.altKey;
  if (!shift && !ctrl && !alt) return null;

  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key.toLowerCase();
  if (!key || key === 'shift' || key === 'control' || key === 'alt' || key === 'meta') {
    return null;
  }

  // Dead keys / Unidentified 제외
  if (key === 'dead' || key === 'unidentified') return null;

  return { shift, ctrl, alt, key };
}

export function formatShortcut(binding: ShortcutBinding): string {
  if (!isShortcutBound(binding)) return '';
  const parts: string[] = [];
  if (binding.ctrl) parts.push('Ctrl');
  if (binding.alt) parts.push('Alt');
  if (binding.shift) parts.push('Shift');
  parts.push(binding.key.toUpperCase());
  return parts.join('+');
}

/** Command 배지용 짧은 표기 (예: +Q, Ctrl+Q) */
export function formatShortcutBadge(binding: ShortcutBinding): string {
  if (!isShortcutBound(binding)) return '';
  const mods: string[] = [];
  if (binding.ctrl) mods.push('Ctrl');
  if (binding.alt) mods.push('Alt');
  if (binding.shift && (binding.ctrl || binding.alt)) mods.push('Shift');
  if (binding.shift && !binding.ctrl && !binding.alt) {
    return `+${binding.key.toUpperCase()}`;
  }
  return [...mods, binding.key.toUpperCase()].join('+');
}

export function bindingsEqual(a: ShortcutBinding, b: ShortcutBinding): boolean {
  return (
    a.shift === b.shift &&
    a.ctrl === b.ctrl &&
    a.alt === b.alt &&
    a.key === b.key
  );
}

export function matchesShortcut(
  event: KeyboardEvent,
  binding: ShortcutBinding,
): boolean {
  if (!isShortcutBound(binding)) return false;
  if (event.shiftKey !== binding.shift) return false;
  if (event.ctrlKey !== binding.ctrl) return false;
  if (event.altKey !== binding.alt) return false;
  if (event.metaKey) return false;
  return event.key.toLowerCase() === binding.key;
}

/** 현재 눌린 수정키가 바인딩과 일치하는지 (배지 표시용) */
export function modifiersMatchBinding(
  held: { shift: boolean; ctrl: boolean; alt: boolean },
  binding: ShortcutBinding,
): boolean {
  if (!isShortcutBound(binding)) return false;
  return (
    held.shift === binding.shift &&
    held.ctrl === binding.ctrl &&
    held.alt === binding.alt &&
    (held.shift || held.ctrl || held.alt)
  );
}

export function findShortcutConflict(
  map: Record<ShortcutId, ShortcutBinding>,
  id: ShortcutId,
  binding: ShortcutBinding,
): ShortcutId | null {
  if (!isShortcutBound(binding)) return null;
  for (const def of SHORTCUT_DEFS) {
    if (def.id === id) continue;
    const other = map[def.id];
    if (!isShortcutBound(other)) continue;
    if (bindingsEqual(other, binding)) return def.id;
  }
  return null;
}

export function mergeShortcuts(
  partial?: Partial<Record<ShortcutId, ShortcutBinding>> | null,
): Record<ShortcutId, ShortcutBinding> {
  const next = { ...DEFAULT_SHORTCUTS };
  if (!partial) return next;
  for (const def of SHORTCUT_DEFS) {
    const value = partial[def.id];
    if (!value || typeof value.key !== 'string') continue;

    if (value.key.length === 0) {
      next[def.id] = { shift: false, ctrl: false, alt: false, key: '' };
      continue;
    }

    if (value.shift || value.ctrl || value.alt) {
      next[def.id] = {
        shift: Boolean(value.shift),
        ctrl: Boolean(value.ctrl),
        alt: Boolean(value.alt),
        key: value.key.toLowerCase(),
      };
    }
  }
  return next;
}
