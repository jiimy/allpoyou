/** 한글 타입명 → 색상 매핑 (공식 컬러 팔레트) */
export const TYPE_COLOR: Record<string, string> = {
  노말: '#9fa19f',
  격투: '#ff8000',
  비행: '#81b9ef',
  독: '#9141cb',
  땅: '#915121',
  바위: '#afa981',
  벌레: '#91a119',
  고스트: '#704170',
  강철: '#60a1b8',
  불꽃: '#e62829',
  물: '#2980ef',
  풀: '#3fa129',
  전기: '#fac000',
  에스퍼: '#ef4179',
  얼음: '#3fd8ff',
  드래곤: '#5060e1',
  악: '#50413f',
  페어리: '#ef70ef',
};

/** 한글 타입명 전체 목록 (가나다순) */
export const ALL_POKEMON_TYPES_KO = Object.keys(TYPE_COLOR).sort((a, b) =>
  a.localeCompare(b, 'ko'),
);
