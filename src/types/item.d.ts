export type ItemKr = {
  /** 도구 ID */
  id: number;
  /** 영문 이름 (예: "master-ball") */
  name: string;
  /** 한글 이름 (예: "마스터볼") */
  nameKo: string;
  /** 도감 설명 */
  description: string;
  /** 구매 가격 */
  cost: number;
  /** 영문 카테고리 (예: "standard-balls") */
  categoryEn: string;
  /** 한글 카테고리 */
  categoryKo: string;
  /** 검색/선택 목록에서 제외 여부 */
  except?: boolean;
};
