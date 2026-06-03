import {
  NATURE_GRID,
  STAT_LABELS,
  STAT_THEME,
} from './natureData';

import s from './natureTable.module.scss';

const NatureTable = () => {
  return (
    <div className={s.wrap}>
      <header className={s.header}>
        <h1 className={s.title}>성격표</h1>
        <p className={s.desc}>
          각 칸은 상승 능력치(1.1배)와 하락 능력치(0.9배) 조합에 해당하는 성격입니다.
          대각선은 같은 능력치가 오르내리므로 보정이 없는 성격입니다.
        </p>
        <div className={s.legend}>
          <span className={s.legendItem}>
            <span className={s.legendUp}>↑ 1.1배</span>
            세로(왼쪽) = 상승 능력치
          </span>
          <span className={s.legendItem}>
            <span className={s.legendDown}>↓ 0.9배</span>
            가로(위) = 하락 능력치
          </span>
        </div>
      </header>

      <div className={s.scroll}>
        <table className={s.table}>
          <thead>
            <tr>
              <th colSpan={2} className={s.cornerGroup}>
                <div className={s.cornerTitle}>성격 매트릭스</div>
                <div className={s.cornerDown}>하락 능력치 (0.9배) →</div>
              </th>
              {STAT_LABELS.map((stat) => (
                <th
                  key={stat}
                  className={s.decreaseHead}
                  style={{ background: STAT_THEME[stat].accent }}
                >
                  {stat}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {NATURE_GRID.map((row, rowIndex) => {
              const increaseStat = STAT_LABELS[rowIndex];

              return (
                <tr key={increaseStat}>
                  {rowIndex === 0 ? (
                    <th rowSpan={5} className={s.increaseCorner}>
                      ↑ 상승 (1.1배)
                    </th>
                  ) : null}
                  <th
                    className={s.increaseHead}
                    style={{ background: STAT_THEME[increaseStat].accent }}
                  >
                    {increaseStat}
                  </th>
                  {row.map((nature, colIndex) => {
                    const isNeutral = rowIndex === colIndex;

                    return (
                      <td
                        key={`${increaseStat}-${STAT_LABELS[colIndex]}`}
                        className={`${s.natureCell} ${isNeutral ? s.natureCellNeutral : ''}`}
                        style={
                          isNeutral
                            ? { background: STAT_THEME[increaseStat].soft }
                            : undefined
                        }
                      >
                        {nature}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NatureTable;
