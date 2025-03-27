import axios from "axios";

// 캐시를 위한 변수
const nameCache: Record<string, string> = {};

/**
 * 포켓몬 영어 이름을 한글 이름으로 변환
 * @param englishName 포켓몬 영어 이름 (예: "pikachu")
 * @returns Promise<string> 한국어 이름 (예: "피카츄")
 */
export async function getKoreanName(englishName: string): Promise<string> {
  // 캐시 체크
  if (nameCache[englishName]) {
    return nameCache[englishName];
  }

  try {
    // 1. 포켓몬 종(species) 정보 가져오기
    const speciesResponse = await axios.get(
      `https://pokeapi.co/api/v2/pokemon-species/${englishName.toLowerCase()}`
    );

    // 2. 한국어 이름 찾기
    const koreanEntry = speciesResponse.data.names.find(
      (entry: { language: { name: string }; name: string }) =>
        entry.language.name === "ko"
    );

    if (!koreanEntry) {
      console.warn(`한국어 이름을 찾을 수 없음: ${englishName}`);
      return englishName; // 한국어 이름 없으면 영어 이름 반환
    }

    // 3. 캐시에 저장
    nameCache[englishName] = koreanEntry.name;
    console.log('번역: ', koreanEntry.name)

    return koreanEntry.name;
  } catch (error) {
    console.error(`이름 변환 실패: ${englishName}`, error);
    return englishName; // 에러 발생 시 영어 이름 반환
  }
}
