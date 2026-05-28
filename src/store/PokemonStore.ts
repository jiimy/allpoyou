export type Pokemon = {
  id: number;
  number: number;
  name: string;
  types: string[];
  H: number;
  A: number;
  B: number;
  C: number;
  D: number;
  S: number;
  total: number;
  form?: string;
  image?: string;
  ability: string[];
  s_ability: string[];
};

export const POKEMON_LIST: Pokemon[] = [
  {
    "id": 1,
    "number": 1,
    "name": "이상해씨",
    "types": [
      "풀",
      "독"
    ],
    "H": 45,
    "A": 49,
    "B": 49,
    "C": 65,
    "D": 65,
    "S": 45,
    "total": 318,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "엽록소"
    ]
  },
  {
    "id": 2,
    "number": 2,
    "name": "이상해풀",
    "types": [
      "풀",
      "독"
    ],
    "H": 60,
    "A": 62,
    "B": 63,
    "C": 80,
    "D": 80,
    "S": 60,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "엽록소"
    ]
  },
  {
    "id": 3,
    "number": 3,
    "name": "이상해꽃",
    "types": [
      "풀",
      "독"
    ],
    "H": 80,
    "A": 82,
    "B": 83,
    "C": 100,
    "D": 100,
    "S": 80,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "엽록소"
    ]
  },
  {
    "id": 4,
    "number": 4,
    "name": "파이리",
    "types": [
      "불꽃"
    ],
    "H": 39,
    "A": 52,
    "B": 43,
    "C": 60,
    "D": 50,
    "S": 65,
    "total": 309,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "선파워"
    ]
  },
  {
    "id": 5,
    "number": 5,
    "name": "리자드",
    "types": [
      "불꽃"
    ],
    "H": 58,
    "A": 64,
    "B": 58,
    "C": 80,
    "D": 65,
    "S": 80,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "선파워"
    ]
  },
  {
    "id": 6,
    "number": 6,
    "name": "리자몽",
    "types": [
      "불꽃",
      "비행"
    ],
    "H": 78,
    "A": 84,
    "B": 78,
    "C": 109,
    "D": 85,
    "S": 100,
    "total": 534,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "선파워"
    ]
  },
  {
    "id": 7,
    "number": 7,
    "name": "꼬부기",
    "types": [
      "물"
    ],
    "H": 44,
    "A": 48,
    "B": 65,
    "C": 50,
    "D": 64,
    "S": 43,
    "total": 314,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 8,
    "number": 8,
    "name": "어니부기",
    "types": [
      "물"
    ],
    "H": 59,
    "A": 63,
    "B": 80,
    "C": 65,
    "D": 80,
    "S": 58,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 9,
    "number": 9,
    "name": "거북왕",
    "types": [
      "물"
    ],
    "H": 79,
    "A": 83,
    "B": 100,
    "C": 85,
    "D": 105,
    "S": 78,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 10,
    "number": 10,
    "name": "캐터피",
    "types": [
      "벌레"
    ],
    "H": 45,
    "A": 30,
    "B": 35,
    "C": 20,
    "D": 20,
    "S": 45,
    "total": 195,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
    "ability": [
      "인분"
    ],
    "s_ability": [
      "도주"
    ]
  },
  {
    "id": 11,
    "number": 11,
    "name": "단데기",
    "types": [
      "벌레"
    ],
    "H": 50,
    "A": 20,
    "B": 55,
    "C": 25,
    "D": 25,
    "S": 30,
    "total": 205,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
    "ability": [
      "탈피"
    ],
    "s_ability": []
  },
  {
    "id": 12,
    "number": 12,
    "name": "버터플",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 60,
    "A": 45,
    "B": 50,
    "C": 90,
    "D": 80,
    "S": 70,
    "total": 395,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
    "ability": [
      "복안"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 13,
    "number": 13,
    "name": "뿔충이",
    "types": [
      "벌레",
      "독"
    ],
    "H": 40,
    "A": 35,
    "B": 30,
    "C": 20,
    "D": 20,
    "S": 50,
    "total": 195,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png",
    "ability": [
      "인분"
    ],
    "s_ability": [
      "도주"
    ]
  },
  {
    "id": 14,
    "number": 14,
    "name": "딱충이",
    "types": [
      "벌레",
      "독"
    ],
    "H": 45,
    "A": 25,
    "B": 50,
    "C": 25,
    "D": 25,
    "S": 35,
    "total": 205,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
    "ability": [
      "탈피"
    ],
    "s_ability": []
  },
  {
    "id": 15,
    "number": 15,
    "name": "독침붕",
    "types": [
      "벌레",
      "독"
    ],
    "H": 65,
    "A": 90,
    "B": 40,
    "C": 45,
    "D": 80,
    "S": 75,
    "total": 395,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
    "ability": [
      "벌레의알림"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 16,
    "number": 16,
    "name": "구구",
    "types": [
      "노말",
      "비행"
    ],
    "H": 40,
    "A": 45,
    "B": 40,
    "C": 35,
    "D": 35,
    "S": 56,
    "total": 251,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
    "ability": [
      "날카로운눈",
      "갈지자걸음"
    ],
    "s_ability": [
      "부풀린가슴"
    ]
  },
  {
    "id": 17,
    "number": 17,
    "name": "피죤",
    "types": [
      "노말",
      "비행"
    ],
    "H": 63,
    "A": 60,
    "B": 55,
    "C": 50,
    "D": 50,
    "S": 71,
    "total": 349,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
    "ability": [
      "날카로운눈",
      "갈지자걸음"
    ],
    "s_ability": [
      "부풀린가슴"
    ]
  },
  {
    "id": 18,
    "number": 18,
    "name": "피죤투",
    "types": [
      "노말",
      "비행"
    ],
    "H": 83,
    "A": 80,
    "B": 75,
    "C": 70,
    "D": 70,
    "S": 101,
    "total": 479,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
    "ability": [
      "날카로운눈",
      "갈지자걸음"
    ],
    "s_ability": [
      "부풀린가슴"
    ]
  },
  {
    "id": 19,
    "number": 19,
    "name": "꼬렛",
    "types": [
      "노말"
    ],
    "H": 30,
    "A": 56,
    "B": 35,
    "C": 25,
    "D": 35,
    "S": 72,
    "total": 253,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
    "ability": [
      "도주",
      "근성"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 20,
    "number": 20,
    "name": "레트라",
    "types": [
      "노말"
    ],
    "H": 55,
    "A": 81,
    "B": 60,
    "C": 50,
    "D": 70,
    "S": 97,
    "total": 413,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png",
    "ability": [
      "도주",
      "근성"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 21,
    "number": 21,
    "name": "깨비참",
    "types": [
      "노말",
      "비행"
    ],
    "H": 40,
    "A": 60,
    "B": 30,
    "C": 31,
    "D": 31,
    "S": 70,
    "total": 262,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/21.png",
    "ability": [
      "날카로운눈"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 22,
    "number": 22,
    "name": "깨비드릴조",
    "types": [
      "노말",
      "비행"
    ],
    "H": 65,
    "A": 90,
    "B": 65,
    "C": 61,
    "D": 61,
    "S": 100,
    "total": 442,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/22.png",
    "ability": [
      "날카로운눈"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 23,
    "number": 23,
    "name": "아보",
    "types": [
      "독"
    ],
    "H": 35,
    "A": 60,
    "B": 44,
    "C": 40,
    "D": 54,
    "S": 55,
    "total": 288,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/23.png",
    "ability": [
      "위협",
      "탈피"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 24,
    "number": 24,
    "name": "아보크",
    "types": [
      "독"
    ],
    "H": 60,
    "A": 95,
    "B": 69,
    "C": 65,
    "D": 79,
    "S": 80,
    "total": 448,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
    "ability": [
      "위협",
      "탈피"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 25,
    "number": 25,
    "name": "피카츄",
    "types": [
      "전기"
    ],
    "H": 35,
    "A": 55,
    "B": 40,
    "C": 50,
    "D": 50,
    "S": 90,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "피뢰침"
    ]
  },
  {
    "id": 26,
    "number": 26,
    "name": "라이츄",
    "types": [
      "전기"
    ],
    "H": 60,
    "A": 90,
    "B": 55,
    "C": 90,
    "D": 80,
    "S": 110,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "피뢰침"
    ]
  },
  {
    "id": 27,
    "number": 27,
    "name": "모래두지",
    "types": [
      "땅"
    ],
    "H": 50,
    "A": 75,
    "B": 85,
    "C": 20,
    "D": 30,
    "S": 40,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/27.png",
    "ability": [
      "모래숨기"
    ],
    "s_ability": [
      "모래헤치기"
    ]
  },
  {
    "id": 28,
    "number": 28,
    "name": "고지",
    "types": [
      "땅"
    ],
    "H": 75,
    "A": 100,
    "B": 110,
    "C": 45,
    "D": 55,
    "S": 65,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/28.png",
    "ability": [
      "모래숨기"
    ],
    "s_ability": [
      "모래헤치기"
    ]
  },
  {
    "id": 29,
    "number": 29,
    "name": "니드런♀",
    "types": [
      "독"
    ],
    "H": 55,
    "A": 47,
    "B": 52,
    "C": 40,
    "D": 40,
    "S": 41,
    "total": 275,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png",
    "ability": [
      "독가시",
      "투쟁심"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 30,
    "number": 30,
    "name": "니드리나",
    "types": [
      "독"
    ],
    "H": 70,
    "A": 62,
    "B": 67,
    "C": 55,
    "D": 55,
    "S": 56,
    "total": 365,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png",
    "ability": [
      "독가시",
      "투쟁심"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 31,
    "number": 31,
    "name": "니드퀸",
    "types": [
      "독",
      "땅"
    ],
    "H": 90,
    "A": 92,
    "B": 87,
    "C": 75,
    "D": 85,
    "S": 76,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/31.png",
    "ability": [
      "독가시",
      "투쟁심"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 32,
    "number": 32,
    "name": "니드런♂",
    "types": [
      "독"
    ],
    "H": 46,
    "A": 57,
    "B": 40,
    "C": 40,
    "D": 40,
    "S": 50,
    "total": 273,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png",
    "ability": [
      "독가시",
      "투쟁심"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 33,
    "number": 33,
    "name": "니드리노",
    "types": [
      "독"
    ],
    "H": 61,
    "A": 72,
    "B": 57,
    "C": 55,
    "D": 55,
    "S": 65,
    "total": 365,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png",
    "ability": [
      "독가시",
      "투쟁심"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 34,
    "number": 34,
    "name": "니드킹",
    "types": [
      "독",
      "땅"
    ],
    "H": 81,
    "A": 102,
    "B": 77,
    "C": 85,
    "D": 75,
    "S": 85,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/34.png",
    "ability": [
      "독가시",
      "투쟁심"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 35,
    "number": 35,
    "name": "삐삐",
    "types": [
      "페어리"
    ],
    "H": 70,
    "A": 45,
    "B": 48,
    "C": 60,
    "D": 65,
    "S": 35,
    "total": 323,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/35.png",
    "ability": [
      "헤롱헤롱바디",
      "매직가드"
    ],
    "s_ability": [
      "프렌드가드"
    ]
  },
  {
    "id": 36,
    "number": 36,
    "name": "픽시",
    "types": [
      "페어리"
    ],
    "H": 95,
    "A": 70,
    "B": 73,
    "C": 95,
    "D": 90,
    "S": 60,
    "total": 483,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/36.png",
    "ability": [
      "헤롱헤롱바디",
      "매직가드"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 37,
    "number": 37,
    "name": "식스테일",
    "types": [
      "불꽃"
    ],
    "H": 38,
    "A": 41,
    "B": 40,
    "C": 50,
    "D": 65,
    "S": 65,
    "total": 299,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png",
    "ability": [
      "타오르는불꽃"
    ],
    "s_ability": [
      "가뭄"
    ]
  },
  {
    "id": 38,
    "number": 38,
    "name": "나인테일",
    "types": [
      "불꽃"
    ],
    "H": 73,
    "A": 76,
    "B": 75,
    "C": 81,
    "D": 100,
    "S": 100,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/38.png",
    "ability": [
      "타오르는불꽃"
    ],
    "s_ability": [
      "가뭄"
    ]
  },
  {
    "id": 39,
    "number": 39,
    "name": "푸린",
    "types": [
      "노말",
      "페어리"
    ],
    "H": 115,
    "A": 45,
    "B": 20,
    "C": 45,
    "D": 25,
    "S": 20,
    "total": 270,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/39.png",
    "ability": [
      "헤롱헤롱바디",
      "승기"
    ],
    "s_ability": [
      "프렌드가드"
    ]
  },
  {
    "id": 40,
    "number": 40,
    "name": "푸크린",
    "types": [
      "노말",
      "페어리"
    ],
    "H": 140,
    "A": 70,
    "B": 45,
    "C": 85,
    "D": 50,
    "S": 45,
    "total": 435,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/40.png",
    "ability": [
      "헤롱헤롱바디",
      "승기"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 41,
    "number": 41,
    "name": "주뱃",
    "types": [
      "독",
      "비행"
    ],
    "H": 40,
    "A": 45,
    "B": 35,
    "C": 30,
    "D": 40,
    "S": 55,
    "total": 245,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/41.png",
    "ability": [
      "정신력"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 42,
    "number": 42,
    "name": "골뱃",
    "types": [
      "독",
      "비행"
    ],
    "H": 75,
    "A": 80,
    "B": 70,
    "C": 65,
    "D": 75,
    "S": 90,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/42.png",
    "ability": [
      "정신력"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 43,
    "number": 43,
    "name": "뚜벅쵸",
    "types": [
      "풀",
      "독"
    ],
    "H": 45,
    "A": 50,
    "B": 55,
    "C": 75,
    "D": 65,
    "S": 30,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "도주"
    ]
  },
  {
    "id": 44,
    "number": 44,
    "name": "냄새꼬",
    "types": [
      "풀",
      "독"
    ],
    "H": 60,
    "A": 65,
    "B": 70,
    "C": 85,
    "D": 75,
    "S": 40,
    "total": 395,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/44.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "악취"
    ]
  },
  {
    "id": 45,
    "number": 45,
    "name": "라플레시아",
    "types": [
      "풀",
      "독"
    ],
    "H": 75,
    "A": 80,
    "B": 85,
    "C": 110,
    "D": 90,
    "S": 50,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/45.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "포자"
    ]
  },
  {
    "id": 46,
    "number": 46,
    "name": "파라스",
    "types": [
      "벌레",
      "풀"
    ],
    "H": 35,
    "A": 70,
    "B": 55,
    "C": 45,
    "D": 55,
    "S": 25,
    "total": 285,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/46.png",
    "ability": [
      "포자",
      "건조피부"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 47,
    "number": 47,
    "name": "파라섹트",
    "types": [
      "벌레",
      "풀"
    ],
    "H": 60,
    "A": 95,
    "B": 80,
    "C": 60,
    "D": 80,
    "S": 30,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/47.png",
    "ability": [
      "포자",
      "건조피부"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 48,
    "number": 48,
    "name": "콘팡",
    "types": [
      "벌레",
      "독"
    ],
    "H": 60,
    "A": 55,
    "B": 50,
    "C": 40,
    "D": 55,
    "S": 45,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/48.png",
    "ability": [
      "복안",
      "색안경"
    ],
    "s_ability": [
      "도주"
    ]
  },
  {
    "id": 49,
    "number": 49,
    "name": "도나리",
    "types": [
      "벌레",
      "독"
    ],
    "H": 70,
    "A": 65,
    "B": 60,
    "C": 90,
    "D": 75,
    "S": 90,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/49.png",
    "ability": [
      "인분",
      "색안경"
    ],
    "s_ability": [
      "미라클스킨"
    ]
  },
  {
    "id": 50,
    "number": 50,
    "name": "디그다",
    "types": [
      "땅"
    ],
    "H": 10,
    "A": 55,
    "B": 25,
    "C": 35,
    "D": 45,
    "S": 95,
    "total": 265,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/50.png",
    "ability": [
      "모래숨기",
      "개미지옥"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 51,
    "number": 51,
    "name": "닥트리오",
    "types": [
      "땅"
    ],
    "H": 35,
    "A": 100,
    "B": 50,
    "C": 50,
    "D": 70,
    "S": 120,
    "total": 425,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/51.png",
    "ability": [
      "모래숨기",
      "개미지옥"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 52,
    "number": 52,
    "name": "나옹",
    "types": [
      "노말"
    ],
    "H": 40,
    "A": 45,
    "B": 35,
    "C": 40,
    "D": 40,
    "S": 90,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/52.png",
    "ability": [
      "픽업",
      "테크니션"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 53,
    "number": 53,
    "name": "페르시온",
    "types": [
      "노말"
    ],
    "H": 65,
    "A": 70,
    "B": 60,
    "C": 65,
    "D": 65,
    "S": 115,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/53.png",
    "ability": [
      "유연",
      "테크니션"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 54,
    "number": 54,
    "name": "고라파덕",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 52,
    "B": 48,
    "C": 65,
    "D": 50,
    "S": 55,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png",
    "ability": [
      "습기",
      "날씨부정"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 55,
    "number": 55,
    "name": "골덕",
    "types": [
      "물"
    ],
    "H": 80,
    "A": 82,
    "B": 78,
    "C": 95,
    "D": 80,
    "S": 85,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/55.png",
    "ability": [
      "습기",
      "날씨부정"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 56,
    "number": 56,
    "name": "망키",
    "types": [
      "격투"
    ],
    "H": 40,
    "A": 80,
    "B": 35,
    "C": 35,
    "D": 45,
    "S": 70,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png",
    "ability": [
      "의기양양",
      "분노의경혈"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 57,
    "number": 57,
    "name": "성원숭",
    "types": [
      "격투"
    ],
    "H": 65,
    "A": 105,
    "B": 60,
    "C": 60,
    "D": 70,
    "S": 95,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/57.png",
    "ability": [
      "의기양양",
      "분노의경혈"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 58,
    "number": 58,
    "name": "가디",
    "types": [
      "불꽃"
    ],
    "H": 55,
    "A": 70,
    "B": 45,
    "C": 70,
    "D": 50,
    "S": 60,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/58.png",
    "ability": [
      "위협",
      "타오르는불꽃"
    ],
    "s_ability": [
      "정의의마음"
    ]
  },
  {
    "id": 59,
    "number": 59,
    "name": "윈디",
    "types": [
      "불꽃"
    ],
    "H": 90,
    "A": 110,
    "B": 80,
    "C": 100,
    "D": 80,
    "S": 95,
    "total": 555,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/59.png",
    "ability": [
      "위협",
      "타오르는불꽃"
    ],
    "s_ability": [
      "정의의마음"
    ]
  },
  {
    "id": 60,
    "number": 60,
    "name": "발챙이",
    "types": [
      "물"
    ],
    "H": 40,
    "A": 50,
    "B": 40,
    "C": 40,
    "D": 40,
    "S": 90,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/60.png",
    "ability": [
      "저수",
      "습기"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 61,
    "number": 61,
    "name": "슈륙챙이",
    "types": [
      "물"
    ],
    "H": 65,
    "A": 65,
    "B": 65,
    "C": 50,
    "D": 50,
    "S": 90,
    "total": 385,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/61.png",
    "ability": [
      "저수",
      "습기"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 62,
    "number": 62,
    "name": "강챙이",
    "types": [
      "물",
      "격투"
    ],
    "H": 90,
    "A": 95,
    "B": 95,
    "C": 70,
    "D": 90,
    "S": 70,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/62.png",
    "ability": [
      "저수",
      "습기"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 63,
    "number": 63,
    "name": "캐이시",
    "types": [
      "에스퍼"
    ],
    "H": 25,
    "A": 20,
    "B": 15,
    "C": 105,
    "D": 55,
    "S": 90,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png",
    "ability": [
      "싱크로",
      "정신력"
    ],
    "s_ability": [
      "매직가드"
    ]
  },
  {
    "id": 64,
    "number": 64,
    "name": "윤겔라",
    "types": [
      "에스퍼"
    ],
    "H": 40,
    "A": 35,
    "B": 30,
    "C": 120,
    "D": 70,
    "S": 105,
    "total": 400,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/64.png",
    "ability": [
      "싱크로",
      "정신력"
    ],
    "s_ability": [
      "매직가드"
    ]
  },
  {
    "id": 65,
    "number": 65,
    "name": "후딘",
    "types": [
      "에스퍼"
    ],
    "H": 55,
    "A": 50,
    "B": 45,
    "C": 135,
    "D": 95,
    "S": 120,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/65.png",
    "ability": [
      "싱크로",
      "정신력"
    ],
    "s_ability": [
      "매직가드"
    ]
  },
  {
    "id": 66,
    "number": 66,
    "name": "알통몬",
    "types": [
      "격투"
    ],
    "H": 70,
    "A": 80,
    "B": 50,
    "C": 35,
    "D": 35,
    "S": 35,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/66.png",
    "ability": [
      "근성",
      "노가드"
    ],
    "s_ability": [
      "불굴의마음"
    ]
  },
  {
    "id": 67,
    "number": 67,
    "name": "근육몬",
    "types": [
      "격투"
    ],
    "H": 80,
    "A": 100,
    "B": 70,
    "C": 50,
    "D": 60,
    "S": 45,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/67.png",
    "ability": [
      "근성",
      "노가드"
    ],
    "s_ability": [
      "불굴의마음"
    ]
  },
  {
    "id": 68,
    "number": 68,
    "name": "괴력몬",
    "types": [
      "격투"
    ],
    "H": 90,
    "A": 130,
    "B": 80,
    "C": 65,
    "D": 85,
    "S": 55,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/68.png",
    "ability": [
      "근성",
      "노가드"
    ],
    "s_ability": [
      "불굴의마음"
    ]
  },
  {
    "id": 69,
    "number": 69,
    "name": "모다피",
    "types": [
      "풀",
      "독"
    ],
    "H": 50,
    "A": 75,
    "B": 35,
    "C": 70,
    "D": 30,
    "S": 40,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/69.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 70,
    "number": 70,
    "name": "우츠동",
    "types": [
      "풀",
      "독"
    ],
    "H": 65,
    "A": 90,
    "B": 50,
    "C": 85,
    "D": 45,
    "S": 55,
    "total": 390,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/70.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 71,
    "number": 71,
    "name": "우츠보트",
    "types": [
      "풀",
      "독"
    ],
    "H": 80,
    "A": 105,
    "B": 65,
    "C": 100,
    "D": 70,
    "S": 70,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/71.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 72,
    "number": 72,
    "name": "왕눈해",
    "types": [
      "물",
      "독"
    ],
    "H": 40,
    "A": 40,
    "B": 35,
    "C": 50,
    "D": 100,
    "S": 70,
    "total": 335,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/72.png",
    "ability": [
      "클리어바디",
      "해감액"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 73,
    "number": 73,
    "name": "독파리",
    "types": [
      "물",
      "독"
    ],
    "H": 80,
    "A": 70,
    "B": 65,
    "C": 80,
    "D": 120,
    "S": 100,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/73.png",
    "ability": [
      "클리어바디",
      "해감액"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 74,
    "number": 74,
    "name": "꼬마돌",
    "types": [
      "바위",
      "땅"
    ],
    "H": 40,
    "A": 80,
    "B": 100,
    "C": 30,
    "D": 30,
    "S": 20,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/74.png",
    "ability": [
      "돌머리",
      "옹골참"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 75,
    "number": 75,
    "name": "데구리",
    "types": [
      "바위",
      "땅"
    ],
    "H": 55,
    "A": 95,
    "B": 115,
    "C": 45,
    "D": 45,
    "S": 35,
    "total": 390,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/75.png",
    "ability": [
      "돌머리",
      "옹골참"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 76,
    "number": 76,
    "name": "딱구리",
    "types": [
      "바위",
      "땅"
    ],
    "H": 80,
    "A": 120,
    "B": 130,
    "C": 55,
    "D": 65,
    "S": 45,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/76.png",
    "ability": [
      "돌머리",
      "옹골참"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 77,
    "number": 77,
    "name": "포니타",
    "types": [
      "불꽃"
    ],
    "H": 50,
    "A": 85,
    "B": 55,
    "C": 65,
    "D": 65,
    "S": 90,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/77.png",
    "ability": [
      "도주",
      "타오르는불꽃"
    ],
    "s_ability": [
      "불꽃몸"
    ]
  },
  {
    "id": 78,
    "number": 78,
    "name": "날쌩마",
    "types": [
      "불꽃"
    ],
    "H": 65,
    "A": 100,
    "B": 70,
    "C": 80,
    "D": 80,
    "S": 105,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/78.png",
    "ability": [
      "도주",
      "타오르는불꽃"
    ],
    "s_ability": [
      "불꽃몸"
    ]
  },
  {
    "id": 79,
    "number": 79,
    "name": "야돈",
    "types": [
      "물",
      "에스퍼"
    ],
    "H": 90,
    "A": 65,
    "B": 65,
    "C": 40,
    "D": 40,
    "S": 15,
    "total": 315,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/79.png",
    "ability": [
      "둔감",
      "마이페이스"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 80,
    "number": 80,
    "name": "야도란",
    "types": [
      "물",
      "에스퍼"
    ],
    "H": 95,
    "A": 75,
    "B": 110,
    "C": 100,
    "D": 80,
    "S": 30,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png",
    "ability": [
      "둔감",
      "마이페이스"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 81,
    "number": 81,
    "name": "코일",
    "types": [
      "전기",
      "강철"
    ],
    "H": 25,
    "A": 35,
    "B": 70,
    "C": 95,
    "D": 55,
    "S": 45,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/81.png",
    "ability": [
      "자력",
      "옹골참"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 82,
    "number": 82,
    "name": "레어코일",
    "types": [
      "전기",
      "강철"
    ],
    "H": 50,
    "A": 60,
    "B": 95,
    "C": 120,
    "D": 70,
    "S": 70,
    "total": 465,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/82.png",
    "ability": [
      "자력",
      "옹골참"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 83,
    "number": 83,
    "name": "파오리",
    "types": [
      "노말",
      "비행"
    ],
    "H": 52,
    "A": 90,
    "B": 55,
    "C": 58,
    "D": 62,
    "S": 60,
    "total": 377,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/83.png",
    "ability": [
      "날카로운눈",
      "정신력"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 84,
    "number": 84,
    "name": "두두",
    "types": [
      "노말",
      "비행"
    ],
    "H": 35,
    "A": 85,
    "B": 45,
    "C": 35,
    "D": 35,
    "S": 75,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/84.png",
    "ability": [
      "도주",
      "일찍기상"
    ],
    "s_ability": [
      "갈지자걸음"
    ]
  },
  {
    "id": 85,
    "number": 85,
    "name": "두트리오",
    "types": [
      "노말",
      "비행"
    ],
    "H": 60,
    "A": 110,
    "B": 70,
    "C": 60,
    "D": 60,
    "S": 110,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/85.png",
    "ability": [
      "도주",
      "일찍기상"
    ],
    "s_ability": [
      "갈지자걸음"
    ]
  },
  {
    "id": 86,
    "number": 86,
    "name": "쥬쥬",
    "types": [
      "물"
    ],
    "H": 65,
    "A": 45,
    "B": 55,
    "C": 45,
    "D": 70,
    "S": 45,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png",
    "ability": [
      "두꺼운지방",
      "촉촉바디"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 87,
    "number": 87,
    "name": "쥬레곤",
    "types": [
      "물",
      "얼음"
    ],
    "H": 90,
    "A": 70,
    "B": 80,
    "C": 70,
    "D": 95,
    "S": 70,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/87.png",
    "ability": [
      "두꺼운지방",
      "촉촉바디"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 88,
    "number": 88,
    "name": "질퍽이",
    "types": [
      "독"
    ],
    "H": 80,
    "A": 80,
    "B": 50,
    "C": 40,
    "D": 50,
    "S": 25,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/88.png",
    "ability": [
      "악취",
      "점착"
    ],
    "s_ability": [
      "독수"
    ]
  },
  {
    "id": 89,
    "number": 89,
    "name": "질뻐기",
    "types": [
      "독"
    ],
    "H": 105,
    "A": 105,
    "B": 75,
    "C": 65,
    "D": 100,
    "S": 50,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png",
    "ability": [
      "악취",
      "점착"
    ],
    "s_ability": [
      "독수"
    ]
  },
  {
    "id": 90,
    "number": 90,
    "name": "셀러",
    "types": [
      "물"
    ],
    "H": 30,
    "A": 65,
    "B": 100,
    "C": 45,
    "D": 25,
    "S": 40,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/90.png",
    "ability": [
      "조가비갑옷",
      "스킬링크"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 91,
    "number": 91,
    "name": "파르셀",
    "types": [
      "물",
      "얼음"
    ],
    "H": 50,
    "A": 95,
    "B": 180,
    "C": 85,
    "D": 45,
    "S": 70,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/91.png",
    "ability": [
      "조가비갑옷",
      "스킬링크"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 92,
    "number": 92,
    "name": "고오스",
    "types": [
      "고스트",
      "독"
    ],
    "H": 30,
    "A": 35,
    "B": 30,
    "C": 100,
    "D": 35,
    "S": 80,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 93,
    "number": 93,
    "name": "고우스트",
    "types": [
      "고스트",
      "독"
    ],
    "H": 45,
    "A": 50,
    "B": 45,
    "C": 115,
    "D": 55,
    "S": 95,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 94,
    "number": 94,
    "name": "팬텀",
    "types": [
      "고스트",
      "독"
    ],
    "H": 60,
    "A": 65,
    "B": 60,
    "C": 130,
    "D": 75,
    "S": 110,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    "ability": [
      "저주받은바디"
    ],
    "s_ability": []
  },
  {
    "id": 95,
    "number": 95,
    "name": "롱스톤",
    "types": [
      "바위",
      "땅"
    ],
    "H": 35,
    "A": 45,
    "B": 160,
    "C": 30,
    "D": 45,
    "S": 70,
    "total": 385,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/95.png",
    "ability": [
      "돌머리",
      "옹골참"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 96,
    "number": 96,
    "name": "슬리프",
    "types": [
      "에스퍼"
    ],
    "H": 60,
    "A": 48,
    "B": 45,
    "C": 43,
    "D": 90,
    "S": 42,
    "total": 328,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/96.png",
    "ability": [
      "불면",
      "예지몽"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 97,
    "number": 97,
    "name": "슬리퍼",
    "types": [
      "에스퍼"
    ],
    "H": 85,
    "A": 73,
    "B": 70,
    "C": 73,
    "D": 115,
    "S": 67,
    "total": 483,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/97.png",
    "ability": [
      "불면",
      "예지몽"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 98,
    "number": 98,
    "name": "크랩",
    "types": [
      "물"
    ],
    "H": 30,
    "A": 105,
    "B": 90,
    "C": 25,
    "D": 25,
    "S": 50,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/98.png",
    "ability": [
      "괴력집게",
      "조가비갑옷"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 99,
    "number": 99,
    "name": "킹크랩",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 130,
    "B": 115,
    "C": 50,
    "D": 50,
    "S": 75,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/99.png",
    "ability": [
      "괴력집게",
      "조가비갑옷"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 100,
    "number": 100,
    "name": "찌리리공",
    "types": [
      "전기"
    ],
    "H": 40,
    "A": 30,
    "B": 50,
    "C": 55,
    "D": 55,
    "S": 100,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/100.png",
    "ability": [
      "방음",
      "정전기"
    ],
    "s_ability": [
      "유폭"
    ]
  },
  {
    "id": 101,
    "number": 101,
    "name": "붐볼",
    "types": [
      "전기"
    ],
    "H": 60,
    "A": 50,
    "B": 70,
    "C": 80,
    "D": 80,
    "S": 150,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/101.png",
    "ability": [
      "방음",
      "정전기"
    ],
    "s_ability": [
      "유폭"
    ]
  },
  {
    "id": 102,
    "number": 102,
    "name": "아라리",
    "types": [
      "풀",
      "에스퍼"
    ],
    "H": 60,
    "A": 40,
    "B": 80,
    "C": 60,
    "D": 45,
    "S": 40,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/102.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 103,
    "number": 103,
    "name": "나시",
    "types": [
      "풀",
      "에스퍼"
    ],
    "H": 95,
    "A": 95,
    "B": 85,
    "C": 125,
    "D": 75,
    "S": 55,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/103.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 104,
    "number": 104,
    "name": "탕구리",
    "types": [
      "땅"
    ],
    "H": 50,
    "A": 50,
    "B": 95,
    "C": 40,
    "D": 50,
    "S": 35,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/104.png",
    "ability": [
      "돌머리",
      "피뢰침"
    ],
    "s_ability": [
      "전투무장"
    ]
  },
  {
    "id": 105,
    "number": 105,
    "name": "텅구리",
    "types": [
      "땅"
    ],
    "H": 60,
    "A": 80,
    "B": 110,
    "C": 50,
    "D": 80,
    "S": 45,
    "total": 425,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/105.png",
    "ability": [
      "돌머리",
      "피뢰침"
    ],
    "s_ability": [
      "전투무장"
    ]
  },
  {
    "id": 106,
    "number": 106,
    "name": "시라소몬",
    "types": [
      "격투"
    ],
    "H": 50,
    "A": 120,
    "B": 53,
    "C": 35,
    "D": 110,
    "S": 87,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/106.png",
    "ability": [
      "유연",
      "이판사판"
    ],
    "s_ability": [
      "곡예"
    ]
  },
  {
    "id": 107,
    "number": 107,
    "name": "홍수몬",
    "types": [
      "격투"
    ],
    "H": 50,
    "A": 105,
    "B": 79,
    "C": 35,
    "D": 110,
    "S": 76,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/107.png",
    "ability": [
      "날카로운눈",
      "철주먹"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 108,
    "number": 108,
    "name": "내루미",
    "types": [
      "노말"
    ],
    "H": 90,
    "A": 55,
    "B": 75,
    "C": 60,
    "D": 75,
    "S": 30,
    "total": 385,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/108.png",
    "ability": [
      "마이페이스",
      "둔감"
    ],
    "s_ability": [
      "날씨부정"
    ]
  },
  {
    "id": 109,
    "number": 109,
    "name": "또가스",
    "types": [
      "독"
    ],
    "H": 40,
    "A": 65,
    "B": 95,
    "C": 60,
    "D": 45,
    "S": 35,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/109.png",
    "ability": [
      "부유",
      "화학변화가스"
    ],
    "s_ability": [
      "악취"
    ]
  },
  {
    "id": 110,
    "number": 110,
    "name": "또도가스",
    "types": [
      "독"
    ],
    "H": 65,
    "A": 90,
    "B": 120,
    "C": 85,
    "D": 70,
    "S": 60,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/110.png",
    "ability": [
      "부유",
      "화학변화가스"
    ],
    "s_ability": [
      "악취"
    ]
  },
  {
    "id": 111,
    "number": 111,
    "name": "뿔카노",
    "types": [
      "땅",
      "바위"
    ],
    "H": 80,
    "A": 85,
    "B": 95,
    "C": 30,
    "D": 30,
    "S": 25,
    "total": 345,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/111.png",
    "ability": [
      "피뢰침",
      "돌머리"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 112,
    "number": 112,
    "name": "코뿌리",
    "types": [
      "땅",
      "바위"
    ],
    "H": 105,
    "A": 130,
    "B": 120,
    "C": 45,
    "D": 45,
    "S": 40,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/112.png",
    "ability": [
      "피뢰침",
      "돌머리"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 113,
    "number": 113,
    "name": "럭키",
    "types": [
      "노말"
    ],
    "H": 250,
    "A": 5,
    "B": 5,
    "C": 35,
    "D": 105,
    "S": 50,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/113.png",
    "ability": [
      "자연회복",
      "하늘의은총"
    ],
    "s_ability": [
      "치유의마음"
    ]
  },
  {
    "id": 114,
    "number": 114,
    "name": "덩쿠리",
    "types": [
      "풀"
    ],
    "H": 65,
    "A": 55,
    "B": 115,
    "C": 100,
    "D": 40,
    "S": 60,
    "total": 435,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/114.png",
    "ability": [
      "엽록소",
      "리프가드"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 115,
    "number": 115,
    "name": "캥카",
    "types": [
      "노말"
    ],
    "H": 105,
    "A": 95,
    "B": 80,
    "C": 40,
    "D": 80,
    "S": 90,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/115.png",
    "ability": [
      "일찍기상",
      "배짱"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 116,
    "number": 116,
    "name": "쏘드라",
    "types": [
      "물"
    ],
    "H": 30,
    "A": 40,
    "B": 70,
    "C": 70,
    "D": 25,
    "S": 60,
    "total": 295,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/116.png",
    "ability": [
      "쓱쓱",
      "스나이퍼"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 117,
    "number": 117,
    "name": "시드라",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 65,
    "B": 95,
    "C": 95,
    "D": 45,
    "S": 85,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/117.png",
    "ability": [
      "독가시",
      "스나이퍼"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 118,
    "number": 118,
    "name": "콘치",
    "types": [
      "물"
    ],
    "H": 45,
    "A": 67,
    "B": 60,
    "C": 35,
    "D": 50,
    "S": 63,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/118.png",
    "ability": [
      "쓱쓱",
      "수의베일"
    ],
    "s_ability": [
      "피뢰침"
    ]
  },
  {
    "id": 119,
    "number": 119,
    "name": "왕콘치",
    "types": [
      "물"
    ],
    "H": 80,
    "A": 92,
    "B": 65,
    "C": 65,
    "D": 80,
    "S": 68,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/119.png",
    "ability": [
      "쓱쓱",
      "수의베일"
    ],
    "s_ability": [
      "피뢰침"
    ]
  },
  {
    "id": 120,
    "number": 120,
    "name": "별가사리",
    "types": [
      "물"
    ],
    "H": 30,
    "A": 45,
    "B": 55,
    "C": 70,
    "D": 55,
    "S": 85,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/120.png",
    "ability": [
      "발광",
      "자연회복"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 121,
    "number": 121,
    "name": "아쿠스타",
    "types": [
      "물",
      "에스퍼"
    ],
    "H": 60,
    "A": 75,
    "B": 85,
    "C": 100,
    "D": 85,
    "S": 115,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/121.png",
    "ability": [
      "발광",
      "자연회복"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 122,
    "number": 122,
    "name": "마임맨",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 40,
    "A": 45,
    "B": 65,
    "C": 100,
    "D": 120,
    "S": 90,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/122.png",
    "ability": [
      "방음",
      "필터"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 123,
    "number": 123,
    "name": "스라크",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 70,
    "A": 110,
    "B": 80,
    "C": 55,
    "D": 80,
    "S": 105,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/123.png",
    "ability": [
      "벌레의알림",
      "테크니션"
    ],
    "s_ability": [
      "불굴의마음"
    ]
  },
  {
    "id": 124,
    "number": 124,
    "name": "루주라",
    "types": [
      "얼음",
      "에스퍼"
    ],
    "H": 65,
    "A": 50,
    "B": 35,
    "C": 115,
    "D": 95,
    "S": 95,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/124.png",
    "ability": [
      "둔감",
      "예지몽"
    ],
    "s_ability": [
      "건조피부"
    ]
  },
  {
    "id": 125,
    "number": 125,
    "name": "에레브",
    "types": [
      "전기"
    ],
    "H": 65,
    "A": 83,
    "B": 57,
    "C": 95,
    "D": 85,
    "S": 105,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "의기양양"
    ]
  },
  {
    "id": 126,
    "number": 126,
    "name": "마그마",
    "types": [
      "불꽃"
    ],
    "H": 65,
    "A": 95,
    "B": 57,
    "C": 100,
    "D": 85,
    "S": 93,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png",
    "ability": [
      "불꽃몸"
    ],
    "s_ability": [
      "의기양양"
    ]
  },
  {
    "id": 127,
    "number": 127,
    "name": "쁘사이저",
    "types": [
      "벌레"
    ],
    "H": 65,
    "A": 125,
    "B": 100,
    "C": 55,
    "D": 70,
    "S": 85,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/127.png",
    "ability": [
      "괴력집게",
      "틀깨기"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 128,
    "number": 128,
    "name": "켄타로스",
    "types": [
      "노말"
    ],
    "H": 75,
    "A": 100,
    "B": 95,
    "C": 40,
    "D": 70,
    "S": 110,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png",
    "ability": [
      "위협",
      "분노의경혈"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 129,
    "number": 129,
    "name": "잉어킹",
    "types": [
      "물"
    ],
    "H": 20,
    "A": 10,
    "B": 55,
    "C": 15,
    "D": 20,
    "S": 80,
    "total": 200,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/129.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 130,
    "number": 130,
    "name": "갸라도스",
    "types": [
      "물",
      "비행"
    ],
    "H": 95,
    "A": 125,
    "B": 79,
    "C": 60,
    "D": 100,
    "S": 81,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png",
    "ability": [
      "위협"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 131,
    "number": 131,
    "name": "라프라스",
    "types": [
      "물",
      "얼음"
    ],
    "H": 130,
    "A": 85,
    "B": 80,
    "C": 85,
    "D": 95,
    "S": 60,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/131.png",
    "ability": [
      "저수",
      "조가비갑옷"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 132,
    "number": 132,
    "name": "메타몽",
    "types": [
      "노말"
    ],
    "H": 48,
    "A": 48,
    "B": 48,
    "C": 48,
    "D": 48,
    "S": 48,
    "total": 288,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png",
    "ability": [
      "유연"
    ],
    "s_ability": [
      "괴짜"
    ]
  },
  {
    "id": 133,
    "number": 133,
    "name": "이브이",
    "types": [
      "노말"
    ],
    "H": 55,
    "A": 55,
    "B": 50,
    "C": 45,
    "D": 65,
    "S": 55,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png",
    "ability": [
      "도주",
      "적응력"
    ],
    "s_ability": [
      "위험예지"
    ]
  },
  {
    "id": 134,
    "number": 134,
    "name": "샤미드",
    "types": [
      "물"
    ],
    "H": 130,
    "A": 65,
    "B": 60,
    "C": 110,
    "D": 95,
    "S": 65,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/134.png",
    "ability": [
      "저수"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 135,
    "number": 135,
    "name": "쥬피썬더",
    "types": [
      "전기"
    ],
    "H": 65,
    "A": 65,
    "B": 60,
    "C": 110,
    "D": 95,
    "S": 130,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png",
    "ability": [
      "축전"
    ],
    "s_ability": [
      "속보"
    ]
  },
  {
    "id": 136,
    "number": 136,
    "name": "부스터",
    "types": [
      "불꽃"
    ],
    "H": 65,
    "A": 130,
    "B": 60,
    "C": 95,
    "D": 110,
    "S": 65,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/136.png",
    "ability": [
      "타오르는불꽃"
    ],
    "s_ability": [
      "근성"
    ]
  },
  {
    "id": 137,
    "number": 137,
    "name": "폴리곤",
    "types": [
      "노말"
    ],
    "H": 65,
    "A": 60,
    "B": 70,
    "C": 85,
    "D": 75,
    "S": 40,
    "total": 395,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png",
    "ability": [
      "트레이스",
      "다운로드"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 138,
    "number": 138,
    "name": "암나이트",
    "types": [
      "바위",
      "물"
    ],
    "H": 35,
    "A": 40,
    "B": 100,
    "C": 90,
    "D": 55,
    "S": 35,
    "total": 355,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/138.png",
    "ability": [
      "쓱쓱",
      "조가비갑옷"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 139,
    "number": 139,
    "name": "암스타",
    "types": [
      "바위",
      "물"
    ],
    "H": 70,
    "A": 60,
    "B": 125,
    "C": 115,
    "D": 70,
    "S": 55,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/139.png",
    "ability": [
      "쓱쓱",
      "조가비갑옷"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 140,
    "number": 140,
    "name": "투구",
    "types": [
      "바위",
      "물"
    ],
    "H": 30,
    "A": 80,
    "B": 90,
    "C": 55,
    "D": 45,
    "S": 55,
    "total": 355,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/140.png",
    "ability": [
      "쓱쓱",
      "전투무장"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 141,
    "number": 141,
    "name": "투구푸스",
    "types": [
      "바위",
      "물"
    ],
    "H": 60,
    "A": 115,
    "B": 105,
    "C": 65,
    "D": 70,
    "S": 80,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/141.png",
    "ability": [
      "쓱쓱",
      "전투무장"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 142,
    "number": 142,
    "name": "프테라",
    "types": [
      "바위",
      "비행"
    ],
    "H": 80,
    "A": 105,
    "B": 65,
    "C": 60,
    "D": 75,
    "S": 130,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/142.png",
    "ability": [
      "돌머리",
      "프레셔"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 143,
    "number": 143,
    "name": "잠만보",
    "types": [
      "노말"
    ],
    "H": 160,
    "A": 110,
    "B": 65,
    "C": 65,
    "D": 110,
    "S": 30,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    "ability": [
      "면역",
      "두꺼운지방"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 144,
    "number": 144,
    "name": "프리져",
    "types": [
      "얼음",
      "비행"
    ],
    "H": 90,
    "A": 85,
    "B": 100,
    "C": 95,
    "D": 125,
    "S": 85,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "눈숨기"
    ]
  },
  {
    "id": 145,
    "number": 145,
    "name": "썬더",
    "types": [
      "전기",
      "비행"
    ],
    "H": 90,
    "A": 90,
    "B": 85,
    "C": 125,
    "D": 90,
    "S": 100,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "정전기"
    ]
  },
  {
    "id": 146,
    "number": 146,
    "name": "파이어",
    "types": [
      "불꽃",
      "비행"
    ],
    "H": 90,
    "A": 100,
    "B": 90,
    "C": 125,
    "D": 85,
    "S": 90,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "불꽃몸"
    ]
  },
  {
    "id": 147,
    "number": 147,
    "name": "미뇽",
    "types": [
      "드래곤"
    ],
    "H": 41,
    "A": 64,
    "B": 45,
    "C": 50,
    "D": 50,
    "S": 50,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/147.png",
    "ability": [
      "탈피"
    ],
    "s_ability": [
      "이상한비늘"
    ]
  },
  {
    "id": 148,
    "number": 148,
    "name": "신뇽",
    "types": [
      "드래곤"
    ],
    "H": 61,
    "A": 84,
    "B": 65,
    "C": 70,
    "D": 70,
    "S": 70,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/148.png",
    "ability": [
      "탈피"
    ],
    "s_ability": [
      "이상한비늘"
    ]
  },
  {
    "id": 149,
    "number": 149,
    "name": "망나뇽",
    "types": [
      "드래곤",
      "비행"
    ],
    "H": 91,
    "A": 134,
    "B": 95,
    "C": 100,
    "D": 100,
    "S": 80,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png",
    "ability": [
      "정신력"
    ],
    "s_ability": [
      "멀티스케일"
    ]
  },
  {
    "id": 150,
    "number": 150,
    "name": "뮤츠",
    "types": [
      "에스퍼"
    ],
    "H": 106,
    "A": 110,
    "B": 90,
    "C": 154,
    "D": 90,
    "S": 130,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 151,
    "number": 151,
    "name": "뮤",
    "types": [
      "에스퍼"
    ],
    "H": 100,
    "A": 100,
    "B": 100,
    "C": 100,
    "D": 100,
    "S": 100,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png",
    "ability": [
      "싱크로"
    ],
    "s_ability": []
  },
  {
    "id": 152,
    "number": 152,
    "name": "치코리타",
    "types": [
      "풀"
    ],
    "H": 45,
    "A": 49,
    "B": 65,
    "C": 49,
    "D": 65,
    "S": 45,
    "total": 318,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "리프가드"
    ]
  },
  {
    "id": 153,
    "number": 153,
    "name": "베이리프",
    "types": [
      "풀"
    ],
    "H": 60,
    "A": 62,
    "B": 80,
    "C": 63,
    "D": 80,
    "S": 60,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/153.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "리프가드"
    ]
  },
  {
    "id": 154,
    "number": 154,
    "name": "메가니움",
    "types": [
      "풀"
    ],
    "H": 80,
    "A": 82,
    "B": 100,
    "C": 83,
    "D": 100,
    "S": 80,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/154.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "리프가드"
    ]
  },
  {
    "id": 155,
    "number": 155,
    "name": "브케인",
    "types": [
      "불꽃"
    ],
    "H": 39,
    "A": 52,
    "B": 43,
    "C": 60,
    "D": 50,
    "S": 65,
    "total": 309,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "타오르는불꽃"
    ]
  },
  {
    "id": 156,
    "number": 156,
    "name": "마그케인",
    "types": [
      "불꽃"
    ],
    "H": 58,
    "A": 64,
    "B": 58,
    "C": 80,
    "D": 65,
    "S": 80,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/156.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "타오르는불꽃"
    ]
  },
  {
    "id": 157,
    "number": 157,
    "name": "블레이범",
    "types": [
      "불꽃"
    ],
    "H": 78,
    "A": 84,
    "B": 78,
    "C": 109,
    "D": 85,
    "S": 100,
    "total": 534,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/157.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "타오르는불꽃"
    ]
  },
  {
    "id": 158,
    "number": 158,
    "name": "리아코",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 65,
    "B": 64,
    "C": 44,
    "D": 48,
    "S": 43,
    "total": 314,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 159,
    "number": 159,
    "name": "엘리게이",
    "types": [
      "물"
    ],
    "H": 65,
    "A": 80,
    "B": 80,
    "C": 59,
    "D": 63,
    "S": 58,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/159.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 160,
    "number": 160,
    "name": "장크로다일",
    "types": [
      "물"
    ],
    "H": 85,
    "A": 105,
    "B": 100,
    "C": 79,
    "D": 83,
    "S": 78,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/160.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 161,
    "number": 161,
    "name": "꼬리선",
    "types": [
      "노말"
    ],
    "H": 35,
    "A": 46,
    "B": 34,
    "C": 35,
    "D": 45,
    "S": 20,
    "total": 215,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/161.png",
    "ability": [
      "도주",
      "날카로운눈"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 162,
    "number": 162,
    "name": "다꼬리",
    "types": [
      "노말"
    ],
    "H": 85,
    "A": 76,
    "B": 64,
    "C": 45,
    "D": 55,
    "S": 90,
    "total": 415,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/162.png",
    "ability": [
      "도주",
      "날카로운눈"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 163,
    "number": 163,
    "name": "부우부",
    "types": [
      "노말",
      "비행"
    ],
    "H": 60,
    "A": 30,
    "B": 30,
    "C": 36,
    "D": 56,
    "S": 50,
    "total": 262,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/163.png",
    "ability": [
      "불면",
      "날카로운눈"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 164,
    "number": 164,
    "name": "야부엉",
    "types": [
      "노말",
      "비행"
    ],
    "H": 100,
    "A": 50,
    "B": 50,
    "C": 86,
    "D": 96,
    "S": 70,
    "total": 452,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/164.png",
    "ability": [
      "불면",
      "날카로운눈"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 165,
    "number": 165,
    "name": "레디바",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 40,
    "A": 20,
    "B": 30,
    "C": 40,
    "D": 80,
    "S": 55,
    "total": 265,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/165.png",
    "ability": [
      "벌레의알림",
      "일찍기상"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 166,
    "number": 166,
    "name": "레디안",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 55,
    "A": 35,
    "B": 50,
    "C": 55,
    "D": 110,
    "S": 85,
    "total": 390,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/166.png",
    "ability": [
      "벌레의알림",
      "일찍기상"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 167,
    "number": 167,
    "name": "페이검",
    "types": [
      "벌레",
      "독"
    ],
    "H": 40,
    "A": 60,
    "B": 40,
    "C": 40,
    "D": 40,
    "S": 30,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/167.png",
    "ability": [
      "벌레의알림",
      "불면"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 168,
    "number": 168,
    "name": "아리아도스",
    "types": [
      "벌레",
      "독"
    ],
    "H": 70,
    "A": 90,
    "B": 70,
    "C": 60,
    "D": 70,
    "S": 40,
    "total": 400,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/168.png",
    "ability": [
      "벌레의알림",
      "불면"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 169,
    "number": 169,
    "name": "크로뱃",
    "types": [
      "독",
      "비행"
    ],
    "H": 85,
    "A": 90,
    "B": 80,
    "C": 70,
    "D": 80,
    "S": 130,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/169.png",
    "ability": [
      "정신력"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 170,
    "number": 170,
    "name": "초라기",
    "types": [
      "물",
      "전기"
    ],
    "H": 75,
    "A": 38,
    "B": 38,
    "C": 56,
    "D": 56,
    "S": 67,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/170.png",
    "ability": [
      "축전",
      "발광"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 171,
    "number": 171,
    "name": "랜턴",
    "types": [
      "물",
      "전기"
    ],
    "H": 125,
    "A": 58,
    "B": 58,
    "C": 76,
    "D": 76,
    "S": 67,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/171.png",
    "ability": [
      "축전",
      "발광"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 172,
    "number": 172,
    "name": "피츄",
    "types": [
      "전기"
    ],
    "H": 20,
    "A": 40,
    "B": 15,
    "C": 35,
    "D": 35,
    "S": 60,
    "total": 205,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "피뢰침"
    ]
  },
  {
    "id": 173,
    "number": 173,
    "name": "삐",
    "types": [
      "페어리"
    ],
    "H": 50,
    "A": 25,
    "B": 28,
    "C": 45,
    "D": 55,
    "S": 15,
    "total": 218,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/173.png",
    "ability": [
      "헤롱헤롱바디",
      "매직가드"
    ],
    "s_ability": [
      "프렌드가드"
    ]
  },
  {
    "id": 174,
    "number": 174,
    "name": "푸푸린",
    "types": [
      "노말",
      "페어리"
    ],
    "H": 90,
    "A": 30,
    "B": 15,
    "C": 40,
    "D": 20,
    "S": 15,
    "total": 210,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/174.png",
    "ability": [
      "헤롱헤롱바디",
      "승기"
    ],
    "s_ability": [
      "프렌드가드"
    ]
  },
  {
    "id": 175,
    "number": 175,
    "name": "토게피",
    "types": [
      "페어리"
    ],
    "H": 35,
    "A": 20,
    "B": 65,
    "C": 40,
    "D": 65,
    "S": 20,
    "total": 245,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png",
    "ability": [
      "의욕",
      "하늘의은총"
    ],
    "s_ability": [
      "대운"
    ]
  },
  {
    "id": 176,
    "number": 176,
    "name": "토게틱",
    "types": [
      "페어리",
      "비행"
    ],
    "H": 55,
    "A": 40,
    "B": 85,
    "C": 80,
    "D": 105,
    "S": 40,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/176.png",
    "ability": [
      "의욕",
      "하늘의은총"
    ],
    "s_ability": [
      "대운"
    ]
  },
  {
    "id": 177,
    "number": 177,
    "name": "네이티",
    "types": [
      "에스퍼",
      "비행"
    ],
    "H": 40,
    "A": 50,
    "B": 45,
    "C": 70,
    "D": 45,
    "S": 70,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/177.png",
    "ability": [
      "싱크로",
      "일찍기상"
    ],
    "s_ability": [
      "매직미러"
    ]
  },
  {
    "id": 178,
    "number": 178,
    "name": "네이티오",
    "types": [
      "에스퍼",
      "비행"
    ],
    "H": 65,
    "A": 75,
    "B": 70,
    "C": 95,
    "D": 70,
    "S": 95,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/178.png",
    "ability": [
      "싱크로",
      "일찍기상"
    ],
    "s_ability": [
      "매직미러"
    ]
  },
  {
    "id": 179,
    "number": 179,
    "name": "메리프",
    "types": [
      "전기"
    ],
    "H": 55,
    "A": 40,
    "B": 40,
    "C": 65,
    "D": 45,
    "S": 35,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/179.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "플러스"
    ]
  },
  {
    "id": 180,
    "number": 180,
    "name": "보송송",
    "types": [
      "전기"
    ],
    "H": 70,
    "A": 55,
    "B": 55,
    "C": 80,
    "D": 60,
    "S": 45,
    "total": 365,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/180.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "플러스"
    ]
  },
  {
    "id": 181,
    "number": 181,
    "name": "전룡",
    "types": [
      "전기"
    ],
    "H": 90,
    "A": 75,
    "B": 85,
    "C": 115,
    "D": 90,
    "S": 55,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/181.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "플러스"
    ]
  },
  {
    "id": 182,
    "number": 182,
    "name": "아르코",
    "types": [
      "풀"
    ],
    "H": 75,
    "A": 80,
    "B": 95,
    "C": 90,
    "D": 100,
    "S": 50,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/182.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": [
      "치유의마음"
    ]
  },
  {
    "id": 183,
    "number": 183,
    "name": "마릴",
    "types": [
      "물",
      "페어리"
    ],
    "H": 70,
    "A": 20,
    "B": 50,
    "C": 20,
    "D": 50,
    "S": 40,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/183.png",
    "ability": [
      "두꺼운지방",
      "천하장사"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 184,
    "number": 184,
    "name": "마릴리",
    "types": [
      "물",
      "페어리"
    ],
    "H": 100,
    "A": 50,
    "B": 80,
    "C": 60,
    "D": 80,
    "S": 50,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/184.png",
    "ability": [
      "두꺼운지방",
      "천하장사"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 185,
    "number": 185,
    "name": "꼬지모",
    "types": [
      "바위"
    ],
    "H": 70,
    "A": 100,
    "B": 115,
    "C": 30,
    "D": 65,
    "S": 30,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/185.png",
    "ability": [
      "옹골참",
      "돌머리"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 186,
    "number": 186,
    "name": "왕구리",
    "types": [
      "물"
    ],
    "H": 90,
    "A": 75,
    "B": 75,
    "C": 90,
    "D": 100,
    "S": 70,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/186.png",
    "ability": [
      "저수",
      "습기"
    ],
    "s_ability": [
      "잔비"
    ]
  },
  {
    "id": 187,
    "number": 187,
    "name": "통통코",
    "types": [
      "풀",
      "비행"
    ],
    "H": 35,
    "A": 35,
    "B": 40,
    "C": 35,
    "D": 55,
    "S": 50,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/187.png",
    "ability": [
      "엽록소",
      "리프가드"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 188,
    "number": 188,
    "name": "두코",
    "types": [
      "풀",
      "비행"
    ],
    "H": 55,
    "A": 45,
    "B": 50,
    "C": 45,
    "D": 65,
    "S": 80,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/188.png",
    "ability": [
      "엽록소",
      "리프가드"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 189,
    "number": 189,
    "name": "솜솜코",
    "types": [
      "풀",
      "비행"
    ],
    "H": 75,
    "A": 55,
    "B": 70,
    "C": 55,
    "D": 95,
    "S": 110,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/189.png",
    "ability": [
      "엽록소",
      "리프가드"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 190,
    "number": 190,
    "name": "에이팜",
    "types": [
      "노말"
    ],
    "H": 55,
    "A": 70,
    "B": 55,
    "C": 40,
    "D": 55,
    "S": 85,
    "total": 360,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/190.png",
    "ability": [
      "도주",
      "픽업"
    ],
    "s_ability": [
      "스킬링크"
    ]
  },
  {
    "id": 191,
    "number": 191,
    "name": "해너츠",
    "types": [
      "풀"
    ],
    "H": 30,
    "A": 30,
    "B": 30,
    "C": 30,
    "D": 30,
    "S": 30,
    "total": 180,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/191.png",
    "ability": [
      "엽록소",
      "선파워"
    ],
    "s_ability": [
      "일찍기상"
    ]
  },
  {
    "id": 192,
    "number": 192,
    "name": "해루미",
    "types": [
      "풀"
    ],
    "H": 75,
    "A": 75,
    "B": 55,
    "C": 105,
    "D": 85,
    "S": 30,
    "total": 425,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/192.png",
    "ability": [
      "엽록소",
      "선파워"
    ],
    "s_ability": [
      "일찍기상"
    ]
  },
  {
    "id": 193,
    "number": 193,
    "name": "왕자리",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 65,
    "A": 65,
    "B": 45,
    "C": 75,
    "D": 45,
    "S": 95,
    "total": 390,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/193.png",
    "ability": [
      "가속",
      "복안"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 194,
    "number": 194,
    "name": "우파",
    "types": [
      "물",
      "땅"
    ],
    "H": 55,
    "A": 45,
    "B": 45,
    "C": 25,
    "D": 25,
    "S": 15,
    "total": 210,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/194.png",
    "ability": [
      "습기",
      "저수"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 195,
    "number": 195,
    "name": "누오",
    "types": [
      "물",
      "땅"
    ],
    "H": 95,
    "A": 85,
    "B": 85,
    "C": 65,
    "D": 65,
    "S": 35,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/195.png",
    "ability": [
      "습기",
      "저수"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 196,
    "number": 196,
    "name": "에브이",
    "types": [
      "에스퍼"
    ],
    "H": 65,
    "A": 65,
    "B": 60,
    "C": 130,
    "D": 95,
    "S": 110,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/196.png",
    "ability": [
      "싱크로"
    ],
    "s_ability": [
      "매직미러"
    ]
  },
  {
    "id": 197,
    "number": 197,
    "name": "블래키",
    "types": [
      "악"
    ],
    "H": 95,
    "A": 65,
    "B": 110,
    "C": 60,
    "D": 130,
    "S": 65,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/197.png",
    "ability": [
      "싱크로"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 198,
    "number": 198,
    "name": "니로우",
    "types": [
      "악",
      "비행"
    ],
    "H": 60,
    "A": 85,
    "B": 42,
    "C": 85,
    "D": 42,
    "S": 91,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/198.png",
    "ability": [
      "불면",
      "대운"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 199,
    "number": 199,
    "name": "야도킹",
    "types": [
      "물",
      "에스퍼"
    ],
    "H": 95,
    "A": 75,
    "B": 80,
    "C": 100,
    "D": 110,
    "S": 30,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/199.png",
    "ability": [
      "둔감",
      "마이페이스"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 200,
    "number": 200,
    "name": "무우마",
    "types": [
      "고스트"
    ],
    "H": 60,
    "A": 60,
    "B": 60,
    "C": 85,
    "D": 85,
    "S": 85,
    "total": 435,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/200.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 201,
    "number": 201,
    "name": "안농",
    "types": [
      "에스퍼"
    ],
    "H": 48,
    "A": 72,
    "B": 48,
    "C": 72,
    "D": 48,
    "S": 48,
    "total": 336,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 202,
    "number": 202,
    "name": "마자용",
    "types": [
      "에스퍼"
    ],
    "H": 190,
    "A": 33,
    "B": 58,
    "C": 33,
    "D": 58,
    "S": 33,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/202.png",
    "ability": [
      "그림자밟기"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 203,
    "number": 203,
    "name": "키링키",
    "types": [
      "노말",
      "에스퍼"
    ],
    "H": 70,
    "A": 80,
    "B": 65,
    "C": 90,
    "D": 65,
    "S": 85,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/203.png",
    "ability": [
      "정신력",
      "일찍기상"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 204,
    "number": 204,
    "name": "피콘",
    "types": [
      "벌레"
    ],
    "H": 50,
    "A": 65,
    "B": 90,
    "C": 35,
    "D": 35,
    "S": 15,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/204.png",
    "ability": [
      "옹골참"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 205,
    "number": 205,
    "name": "쏘콘",
    "types": [
      "벌레",
      "강철"
    ],
    "H": 75,
    "A": 90,
    "B": 140,
    "C": 60,
    "D": 60,
    "S": 40,
    "total": 465,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/205.png",
    "ability": [
      "옹골참"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 206,
    "number": 206,
    "name": "노고치",
    "types": [
      "노말"
    ],
    "H": 100,
    "A": 70,
    "B": 70,
    "C": 65,
    "D": 65,
    "S": 45,
    "total": 415,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/206.png",
    "ability": [
      "하늘의은총",
      "도주"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 207,
    "number": 207,
    "name": "글라이거",
    "types": [
      "땅",
      "비행"
    ],
    "H": 65,
    "A": 75,
    "B": 105,
    "C": 35,
    "D": 65,
    "S": 85,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/207.png",
    "ability": [
      "괴력집게",
      "모래숨기"
    ],
    "s_ability": [
      "면역"
    ]
  },
  {
    "id": 208,
    "number": 208,
    "name": "강철톤",
    "types": [
      "강철",
      "땅"
    ],
    "H": 75,
    "A": 85,
    "B": 200,
    "C": 55,
    "D": 65,
    "S": 30,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/208.png",
    "ability": [
      "돌머리",
      "옹골참"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 209,
    "number": 209,
    "name": "블루",
    "types": [
      "페어리"
    ],
    "H": 60,
    "A": 80,
    "B": 50,
    "C": 40,
    "D": 40,
    "S": 30,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/209.png",
    "ability": [
      "위협",
      "도주"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 210,
    "number": 210,
    "name": "그랑블루",
    "types": [
      "페어리"
    ],
    "H": 90,
    "A": 120,
    "B": 75,
    "C": 60,
    "D": 60,
    "S": 45,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/210.png",
    "ability": [
      "위협",
      "속보"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 211,
    "number": 211,
    "name": "침바루",
    "types": [
      "물",
      "독"
    ],
    "H": 65,
    "A": 95,
    "B": 85,
    "C": 55,
    "D": 55,
    "S": 85,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/211.png",
    "ability": [
      "독가시",
      "쓱쓱"
    ],
    "s_ability": [
      "위협"
    ]
  },
  {
    "id": 212,
    "number": 212,
    "name": "핫삼",
    "types": [
      "벌레",
      "강철"
    ],
    "H": 70,
    "A": 130,
    "B": 100,
    "C": 55,
    "D": 80,
    "S": 65,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/212.png",
    "ability": [
      "벌레의알림",
      "테크니션"
    ],
    "s_ability": [
      "라이트메탈"
    ]
  },
  {
    "id": 213,
    "number": 213,
    "name": "단단지",
    "types": [
      "벌레",
      "바위"
    ],
    "H": 20,
    "A": 10,
    "B": 230,
    "C": 10,
    "D": 230,
    "S": 5,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/213.png",
    "ability": [
      "옹골참",
      "먹보"
    ],
    "s_ability": [
      "심술꾸러기"
    ]
  },
  {
    "id": 214,
    "number": 214,
    "name": "헤라크로스",
    "types": [
      "벌레",
      "격투"
    ],
    "H": 80,
    "A": 125,
    "B": 75,
    "C": 40,
    "D": 95,
    "S": 85,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/214.png",
    "ability": [
      "벌레의알림",
      "근성"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 215,
    "number": 215,
    "name": "포푸니",
    "types": [
      "악",
      "얼음"
    ],
    "H": 55,
    "A": 95,
    "B": 55,
    "C": 35,
    "D": 75,
    "S": 115,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/215.png",
    "ability": [
      "정신력",
      "날카로운눈"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 216,
    "number": 216,
    "name": "깜지곰",
    "types": [
      "노말"
    ],
    "H": 60,
    "A": 80,
    "B": 50,
    "C": 50,
    "D": 50,
    "S": 40,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/216.png",
    "ability": [
      "픽업",
      "속보"
    ],
    "s_ability": [
      "꿀모으기"
    ]
  },
  {
    "id": 217,
    "number": 217,
    "name": "링곰",
    "types": [
      "노말"
    ],
    "H": 90,
    "A": 130,
    "B": 75,
    "C": 75,
    "D": 75,
    "S": 55,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/217.png",
    "ability": [
      "근성",
      "속보"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 218,
    "number": 218,
    "name": "마그마그",
    "types": [
      "불꽃"
    ],
    "H": 40,
    "A": 40,
    "B": 40,
    "C": 70,
    "D": 40,
    "S": 20,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/218.png",
    "ability": [
      "마그마의무장",
      "불꽃몸"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 219,
    "number": 219,
    "name": "마그카르고",
    "types": [
      "불꽃",
      "바위"
    ],
    "H": 60,
    "A": 50,
    "B": 120,
    "C": 90,
    "D": 80,
    "S": 30,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/219.png",
    "ability": [
      "마그마의무장",
      "불꽃몸"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 220,
    "number": 220,
    "name": "꾸꾸리",
    "types": [
      "얼음",
      "땅"
    ],
    "H": 50,
    "A": 50,
    "B": 40,
    "C": 30,
    "D": 30,
    "S": 50,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/220.png",
    "ability": [
      "둔감",
      "눈숨기"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 221,
    "number": 221,
    "name": "메꾸리",
    "types": [
      "얼음",
      "땅"
    ],
    "H": 100,
    "A": 100,
    "B": 80,
    "C": 60,
    "D": 60,
    "S": 50,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/221.png",
    "ability": [
      "둔감",
      "눈숨기"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 222,
    "number": 222,
    "name": "코산호",
    "types": [
      "물",
      "바위"
    ],
    "H": 65,
    "A": 55,
    "B": 95,
    "C": 65,
    "D": 95,
    "S": 35,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/222.png",
    "ability": [
      "의욕",
      "자연회복"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 223,
    "number": 223,
    "name": "총어",
    "types": [
      "물"
    ],
    "H": 35,
    "A": 65,
    "B": 35,
    "C": 65,
    "D": 35,
    "S": 65,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/223.png",
    "ability": [
      "의욕",
      "스나이퍼"
    ],
    "s_ability": [
      "변덕쟁이"
    ]
  },
  {
    "id": 224,
    "number": 224,
    "name": "대포무노",
    "types": [
      "물"
    ],
    "H": 75,
    "A": 105,
    "B": 75,
    "C": 105,
    "D": 75,
    "S": 45,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/224.png",
    "ability": [
      "흡반",
      "스나이퍼"
    ],
    "s_ability": [
      "변덕쟁이"
    ]
  },
  {
    "id": 225,
    "number": 225,
    "name": "딜리버드",
    "types": [
      "얼음",
      "비행"
    ],
    "H": 45,
    "A": 55,
    "B": 45,
    "C": 65,
    "D": 45,
    "S": 75,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/225.png",
    "ability": [
      "의기양양",
      "의욕"
    ],
    "s_ability": [
      "불면"
    ]
  },
  {
    "id": 226,
    "number": 226,
    "name": "만타인",
    "types": [
      "물",
      "비행"
    ],
    "H": 85,
    "A": 40,
    "B": 70,
    "C": 80,
    "D": 140,
    "S": 70,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/226.png",
    "ability": [
      "쓱쓱",
      "저수"
    ],
    "s_ability": [
      "수의베일"
    ]
  },
  {
    "id": 227,
    "number": 227,
    "name": "무장조",
    "types": [
      "강철",
      "비행"
    ],
    "H": 65,
    "A": 80,
    "B": 140,
    "C": 40,
    "D": 70,
    "S": 70,
    "total": 465,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/227.png",
    "ability": [
      "날카로운눈",
      "옹골참"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 228,
    "number": 228,
    "name": "델빌",
    "types": [
      "악",
      "불꽃"
    ],
    "H": 45,
    "A": 60,
    "B": 30,
    "C": 80,
    "D": 50,
    "S": 65,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/228.png",
    "ability": [
      "일찍기상",
      "타오르는불꽃"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 229,
    "number": 229,
    "name": "헬가",
    "types": [
      "악",
      "불꽃"
    ],
    "H": 75,
    "A": 90,
    "B": 50,
    "C": 110,
    "D": 80,
    "S": 95,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/229.png",
    "ability": [
      "일찍기상",
      "타오르는불꽃"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 230,
    "number": 230,
    "name": "킹드라",
    "types": [
      "물",
      "드래곤"
    ],
    "H": 75,
    "A": 95,
    "B": 95,
    "C": 95,
    "D": 95,
    "S": 85,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/230.png",
    "ability": [
      "쓱쓱",
      "스나이퍼"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 231,
    "number": 231,
    "name": "코코리",
    "types": [
      "땅"
    ],
    "H": 90,
    "A": 60,
    "B": 60,
    "C": 40,
    "D": 40,
    "S": 40,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/231.png",
    "ability": [
      "픽업"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 232,
    "number": 232,
    "name": "코리갑",
    "types": [
      "땅"
    ],
    "H": 90,
    "A": 120,
    "B": 120,
    "C": 60,
    "D": 60,
    "S": 50,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/232.png",
    "ability": [
      "옹골참"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 233,
    "number": 233,
    "name": "폴리곤2",
    "types": [
      "노말"
    ],
    "H": 85,
    "A": 80,
    "B": 90,
    "C": 105,
    "D": 95,
    "S": 60,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/233.png",
    "ability": [
      "트레이스",
      "다운로드"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 234,
    "number": 234,
    "name": "노라키",
    "types": [
      "노말"
    ],
    "H": 73,
    "A": 95,
    "B": 62,
    "C": 85,
    "D": 65,
    "S": 85,
    "total": 465,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/234.png",
    "ability": [
      "위협",
      "통찰"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 235,
    "number": 235,
    "name": "루브도",
    "types": [
      "노말"
    ],
    "H": 55,
    "A": 20,
    "B": 35,
    "C": 20,
    "D": 45,
    "S": 75,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/235.png",
    "ability": [
      "마이페이스",
      "테크니션"
    ],
    "s_ability": [
      "변덕쟁이"
    ]
  },
  {
    "id": 236,
    "number": 236,
    "name": "배루키",
    "types": [
      "격투"
    ],
    "H": 35,
    "A": 35,
    "B": 35,
    "C": 35,
    "D": 35,
    "S": 35,
    "total": 210,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/236.png",
    "ability": [
      "근성",
      "불굴의마음"
    ],
    "s_ability": [
      "의기양양"
    ]
  },
  {
    "id": 237,
    "number": 237,
    "name": "카포에라",
    "types": [
      "격투"
    ],
    "H": 50,
    "A": 95,
    "B": 95,
    "C": 35,
    "D": 110,
    "S": 70,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/237.png",
    "ability": [
      "위협",
      "테크니션"
    ],
    "s_ability": [
      "불굴의마음"
    ]
  },
  {
    "id": 238,
    "number": 238,
    "name": "뽀뽀라",
    "types": [
      "얼음",
      "에스퍼"
    ],
    "H": 45,
    "A": 30,
    "B": 15,
    "C": 85,
    "D": 65,
    "S": 65,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/238.png",
    "ability": [
      "둔감",
      "예지몽"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 239,
    "number": 239,
    "name": "에레키드",
    "types": [
      "전기"
    ],
    "H": 45,
    "A": 63,
    "B": 37,
    "C": 65,
    "D": 55,
    "S": 95,
    "total": 360,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/239.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "의기양양"
    ]
  },
  {
    "id": 240,
    "number": 240,
    "name": "마그비",
    "types": [
      "불꽃"
    ],
    "H": 45,
    "A": 75,
    "B": 37,
    "C": 70,
    "D": 55,
    "S": 83,
    "total": 365,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/240.png",
    "ability": [
      "불꽃몸"
    ],
    "s_ability": [
      "의기양양"
    ]
  },
  {
    "id": 241,
    "number": 241,
    "name": "밀탱크",
    "types": [
      "노말"
    ],
    "H": 95,
    "A": 80,
    "B": 105,
    "C": 40,
    "D": 70,
    "S": 100,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/241.png",
    "ability": [
      "두꺼운지방",
      "배짱"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 242,
    "number": 242,
    "name": "해피너스",
    "types": [
      "노말"
    ],
    "H": 255,
    "A": 10,
    "B": 10,
    "C": 75,
    "D": 135,
    "S": 55,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/242.png",
    "ability": [
      "자연회복",
      "하늘의은총"
    ],
    "s_ability": [
      "치유의마음"
    ]
  },
  {
    "id": 243,
    "number": 243,
    "name": "라이코",
    "types": [
      "전기"
    ],
    "H": 90,
    "A": 85,
    "B": 75,
    "C": 115,
    "D": 100,
    "S": 115,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/243.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 244,
    "number": 244,
    "name": "앤테이",
    "types": [
      "불꽃"
    ],
    "H": 115,
    "A": 115,
    "B": 85,
    "C": 90,
    "D": 75,
    "S": 100,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/244.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 245,
    "number": 245,
    "name": "스이쿤",
    "types": [
      "물"
    ],
    "H": 100,
    "A": 75,
    "B": 115,
    "C": 90,
    "D": 115,
    "S": 85,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/245.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 246,
    "number": 246,
    "name": "애버라스",
    "types": [
      "바위",
      "땅"
    ],
    "H": 50,
    "A": 64,
    "B": 50,
    "C": 45,
    "D": 50,
    "S": 41,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/246.png",
    "ability": [
      "근성"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 247,
    "number": 247,
    "name": "데기라스",
    "types": [
      "바위",
      "땅"
    ],
    "H": 70,
    "A": 84,
    "B": 70,
    "C": 65,
    "D": 70,
    "S": 51,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/247.png",
    "ability": [
      "탈피"
    ],
    "s_ability": []
  },
  {
    "id": 248,
    "number": 248,
    "name": "마기라스",
    "types": [
      "바위",
      "악"
    ],
    "H": 100,
    "A": 134,
    "B": 110,
    "C": 95,
    "D": 100,
    "S": 61,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/248.png",
    "ability": [
      "모래날림"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 249,
    "number": 249,
    "name": "루기아",
    "types": [
      "에스퍼",
      "비행"
    ],
    "H": 106,
    "A": 90,
    "B": 130,
    "C": 90,
    "D": 154,
    "S": 110,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/249.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "멀티스케일"
    ]
  },
  {
    "id": 250,
    "number": 250,
    "name": "칠색조",
    "types": [
      "불꽃",
      "비행"
    ],
    "H": 106,
    "A": 130,
    "B": 90,
    "C": 110,
    "D": 154,
    "S": 90,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/250.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 251,
    "number": 251,
    "name": "세레비",
    "types": [
      "에스퍼",
      "풀"
    ],
    "H": 100,
    "A": 100,
    "B": 100,
    "C": 100,
    "D": 100,
    "S": 100,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/251.png",
    "ability": [
      "자연회복"
    ],
    "s_ability": []
  },
  {
    "id": 252,
    "number": 252,
    "name": "나무지기",
    "types": [
      "풀"
    ],
    "H": 40,
    "A": 45,
    "B": 35,
    "C": 65,
    "D": 55,
    "S": 70,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "곡예"
    ]
  },
  {
    "id": 253,
    "number": 253,
    "name": "나무돌이",
    "types": [
      "풀"
    ],
    "H": 50,
    "A": 65,
    "B": 45,
    "C": 85,
    "D": 65,
    "S": 95,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/253.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "곡예"
    ]
  },
  {
    "id": 254,
    "number": 254,
    "name": "나무킹",
    "types": [
      "풀"
    ],
    "H": 70,
    "A": 85,
    "B": 65,
    "C": 105,
    "D": 85,
    "S": 120,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/254.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "곡예"
    ]
  },
  {
    "id": 255,
    "number": 255,
    "name": "아차모",
    "types": [
      "불꽃"
    ],
    "H": 45,
    "A": 60,
    "B": 40,
    "C": 70,
    "D": 50,
    "S": 45,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 256,
    "number": 256,
    "name": "영치코",
    "types": [
      "불꽃",
      "격투"
    ],
    "H": 60,
    "A": 85,
    "B": 60,
    "C": 85,
    "D": 60,
    "S": 55,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/256.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 257,
    "number": 257,
    "name": "번치코",
    "types": [
      "불꽃",
      "격투"
    ],
    "H": 80,
    "A": 120,
    "B": 70,
    "C": 110,
    "D": 70,
    "S": 80,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/257.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 258,
    "number": 258,
    "name": "물짱이",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 70,
    "B": 50,
    "C": 50,
    "D": 50,
    "S": 40,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 259,
    "number": 259,
    "name": "늪짱이",
    "types": [
      "물",
      "땅"
    ],
    "H": 70,
    "A": 85,
    "B": 70,
    "C": 60,
    "D": 70,
    "S": 50,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/259.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 260,
    "number": 260,
    "name": "대짱이",
    "types": [
      "물",
      "땅"
    ],
    "H": 100,
    "A": 110,
    "B": 90,
    "C": 85,
    "D": 90,
    "S": 60,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/260.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 261,
    "number": 261,
    "name": "포챠나",
    "types": [
      "악"
    ],
    "H": 35,
    "A": 55,
    "B": 35,
    "C": 30,
    "D": 30,
    "S": 35,
    "total": 220,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/261.png",
    "ability": [
      "도주",
      "속보"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 262,
    "number": 262,
    "name": "그라에나",
    "types": [
      "악"
    ],
    "H": 70,
    "A": 90,
    "B": 70,
    "C": 60,
    "D": 60,
    "S": 70,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/262.png",
    "ability": [
      "위협",
      "속보"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 263,
    "number": 263,
    "name": "지그제구리",
    "types": [
      "노말"
    ],
    "H": 38,
    "A": 30,
    "B": 41,
    "C": 30,
    "D": 41,
    "S": 60,
    "total": 240,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/263.png",
    "ability": [
      "픽업",
      "먹보"
    ],
    "s_ability": [
      "속보"
    ]
  },
  {
    "id": 264,
    "number": 264,
    "name": "직구리",
    "types": [
      "노말"
    ],
    "H": 78,
    "A": 70,
    "B": 61,
    "C": 50,
    "D": 61,
    "S": 100,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/264.png",
    "ability": [
      "픽업",
      "먹보"
    ],
    "s_ability": [
      "속보"
    ]
  },
  {
    "id": 265,
    "number": 265,
    "name": "개무소",
    "types": [
      "벌레"
    ],
    "H": 45,
    "A": 45,
    "B": 35,
    "C": 20,
    "D": 30,
    "S": 20,
    "total": 195,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/265.png",
    "ability": [
      "인분"
    ],
    "s_ability": [
      "도주"
    ]
  },
  {
    "id": 266,
    "number": 266,
    "name": "실쿤",
    "types": [
      "벌레"
    ],
    "H": 50,
    "A": 35,
    "B": 55,
    "C": 25,
    "D": 25,
    "S": 15,
    "total": 205,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/266.png",
    "ability": [
      "탈피"
    ],
    "s_ability": []
  },
  {
    "id": 267,
    "number": 267,
    "name": "뷰티플라이",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 60,
    "A": 70,
    "B": 50,
    "C": 100,
    "D": 50,
    "S": 65,
    "total": 395,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/267.png",
    "ability": [
      "벌레의알림"
    ],
    "s_ability": [
      "투쟁심"
    ]
  },
  {
    "id": 268,
    "number": 268,
    "name": "카스쿤",
    "types": [
      "벌레"
    ],
    "H": 50,
    "A": 35,
    "B": 55,
    "C": 25,
    "D": 25,
    "S": 15,
    "total": 205,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/268.png",
    "ability": [
      "탈피"
    ],
    "s_ability": []
  },
  {
    "id": 269,
    "number": 269,
    "name": "독케일",
    "types": [
      "벌레",
      "독"
    ],
    "H": 60,
    "A": 50,
    "B": 70,
    "C": 50,
    "D": 90,
    "S": 65,
    "total": 385,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/269.png",
    "ability": [
      "인분"
    ],
    "s_ability": [
      "복안"
    ]
  },
  {
    "id": 270,
    "number": 270,
    "name": "연꽃몬",
    "types": [
      "물",
      "풀"
    ],
    "H": 40,
    "A": 30,
    "B": 30,
    "C": 40,
    "D": 50,
    "S": 30,
    "total": 220,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/270.png",
    "ability": [
      "쓱쓱",
      "젖은접시"
    ],
    "s_ability": [
      "마이페이스"
    ]
  },
  {
    "id": 271,
    "number": 271,
    "name": "로토스",
    "types": [
      "물",
      "풀"
    ],
    "H": 60,
    "A": 50,
    "B": 50,
    "C": 60,
    "D": 70,
    "S": 50,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/271.png",
    "ability": [
      "쓱쓱",
      "젖은접시"
    ],
    "s_ability": [
      "마이페이스"
    ]
  },
  {
    "id": 272,
    "number": 272,
    "name": "로파파",
    "types": [
      "물",
      "풀"
    ],
    "H": 80,
    "A": 70,
    "B": 70,
    "C": 90,
    "D": 100,
    "S": 70,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/272.png",
    "ability": [
      "쓱쓱",
      "젖은접시"
    ],
    "s_ability": [
      "마이페이스"
    ]
  },
  {
    "id": 273,
    "number": 273,
    "name": "도토링",
    "types": [
      "풀"
    ],
    "H": 40,
    "A": 40,
    "B": 50,
    "C": 30,
    "D": 30,
    "S": 30,
    "total": 220,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/273.png",
    "ability": [
      "엽록소",
      "일찍기상"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 274,
    "number": 274,
    "name": "잎새코",
    "types": [
      "풀",
      "악"
    ],
    "H": 70,
    "A": 70,
    "B": 40,
    "C": 60,
    "D": 40,
    "S": 60,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/274.png",
    "ability": [
      "엽록소",
      "일찍기상"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 275,
    "number": 275,
    "name": "다탱구",
    "types": [
      "풀",
      "악"
    ],
    "H": 90,
    "A": 100,
    "B": 60,
    "C": 90,
    "D": 60,
    "S": 80,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/275.png",
    "ability": [
      "엽록소",
      "wind-rider"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 276,
    "number": 276,
    "name": "테일로",
    "types": [
      "노말",
      "비행"
    ],
    "H": 40,
    "A": 55,
    "B": 30,
    "C": 30,
    "D": 30,
    "S": 85,
    "total": 270,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/276.png",
    "ability": [
      "근성"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 277,
    "number": 277,
    "name": "스왈로",
    "types": [
      "노말",
      "비행"
    ],
    "H": 60,
    "A": 85,
    "B": 60,
    "C": 75,
    "D": 50,
    "S": 125,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/277.png",
    "ability": [
      "근성"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 278,
    "number": 278,
    "name": "갈모매",
    "types": [
      "물",
      "비행"
    ],
    "H": 40,
    "A": 30,
    "B": 30,
    "C": 55,
    "D": 30,
    "S": 85,
    "total": 270,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/278.png",
    "ability": [
      "날카로운눈",
      "촉촉바디"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 279,
    "number": 279,
    "name": "패리퍼",
    "types": [
      "물",
      "비행"
    ],
    "H": 60,
    "A": 50,
    "B": 100,
    "C": 95,
    "D": 70,
    "S": 65,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/279.png",
    "ability": [
      "날카로운눈",
      "잔비"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 280,
    "number": 280,
    "name": "랄토스",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 28,
    "A": 25,
    "B": 25,
    "C": 45,
    "D": 35,
    "S": 40,
    "total": 198,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/280.png",
    "ability": [
      "싱크로",
      "트레이스"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 281,
    "number": 281,
    "name": "킬리아",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 38,
    "A": 35,
    "B": 35,
    "C": 65,
    "D": 55,
    "S": 50,
    "total": 278,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/281.png",
    "ability": [
      "싱크로",
      "트레이스"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 282,
    "number": 282,
    "name": "가디안",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 68,
    "A": 65,
    "B": 65,
    "C": 125,
    "D": 115,
    "S": 80,
    "total": 518,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/282.png",
    "ability": [
      "싱크로",
      "트레이스"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 283,
    "number": 283,
    "name": "비구술",
    "types": [
      "벌레",
      "물"
    ],
    "H": 40,
    "A": 30,
    "B": 32,
    "C": 50,
    "D": 52,
    "S": 65,
    "total": 269,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/283.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 284,
    "number": 284,
    "name": "비나방",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 70,
    "A": 60,
    "B": 62,
    "C": 100,
    "D": 82,
    "S": 80,
    "total": 454,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/284.png",
    "ability": [
      "위협"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 285,
    "number": 285,
    "name": "버섯꼬",
    "types": [
      "풀"
    ],
    "H": 60,
    "A": 40,
    "B": 60,
    "C": 40,
    "D": 60,
    "S": 35,
    "total": 295,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/285.png",
    "ability": [
      "포자",
      "포이즌힐"
    ],
    "s_ability": [
      "속보"
    ]
  },
  {
    "id": 286,
    "number": 286,
    "name": "버섯모",
    "types": [
      "풀",
      "격투"
    ],
    "H": 60,
    "A": 130,
    "B": 80,
    "C": 60,
    "D": 60,
    "S": 70,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/286.png",
    "ability": [
      "포자",
      "포이즌힐"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 287,
    "number": 287,
    "name": "게을로",
    "types": [
      "노말"
    ],
    "H": 60,
    "A": 60,
    "B": 60,
    "C": 35,
    "D": 35,
    "S": 30,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/287.png",
    "ability": [
      "게으름"
    ],
    "s_ability": []
  },
  {
    "id": 288,
    "number": 288,
    "name": "발바로",
    "types": [
      "노말"
    ],
    "H": 80,
    "A": 80,
    "B": 80,
    "C": 55,
    "D": 55,
    "S": 90,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/288.png",
    "ability": [
      "의기양양"
    ],
    "s_ability": []
  },
  {
    "id": 289,
    "number": 289,
    "name": "게을킹",
    "types": [
      "노말"
    ],
    "H": 150,
    "A": 160,
    "B": 100,
    "C": 95,
    "D": 65,
    "S": 100,
    "total": 670,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/289.png",
    "ability": [
      "게으름"
    ],
    "s_ability": []
  },
  {
    "id": 290,
    "number": 290,
    "name": "토중몬",
    "types": [
      "벌레",
      "땅"
    ],
    "H": 31,
    "A": 45,
    "B": 90,
    "C": 30,
    "D": 30,
    "S": 40,
    "total": 266,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/290.png",
    "ability": [
      "복안"
    ],
    "s_ability": [
      "도주"
    ]
  },
  {
    "id": 291,
    "number": 291,
    "name": "아이스크",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 61,
    "A": 90,
    "B": 45,
    "C": 50,
    "D": 50,
    "S": 160,
    "total": 456,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/291.png",
    "ability": [
      "가속"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 292,
    "number": 292,
    "name": "껍질몬",
    "types": [
      "벌레",
      "고스트"
    ],
    "H": 1,
    "A": 90,
    "B": 45,
    "C": 30,
    "D": 30,
    "S": 40,
    "total": 236,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/292.png",
    "ability": [
      "불가사의부적"
    ],
    "s_ability": []
  },
  {
    "id": 293,
    "number": 293,
    "name": "소곤룡",
    "types": [
      "노말"
    ],
    "H": 64,
    "A": 51,
    "B": 23,
    "C": 51,
    "D": 23,
    "S": 28,
    "total": 240,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/293.png",
    "ability": [
      "방음"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 294,
    "number": 294,
    "name": "노공룡",
    "types": [
      "노말"
    ],
    "H": 84,
    "A": 71,
    "B": 43,
    "C": 71,
    "D": 43,
    "S": 48,
    "total": 360,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/294.png",
    "ability": [
      "방음"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 295,
    "number": 295,
    "name": "폭음룡",
    "types": [
      "노말"
    ],
    "H": 104,
    "A": 91,
    "B": 63,
    "C": 91,
    "D": 73,
    "S": 68,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/295.png",
    "ability": [
      "방음"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 296,
    "number": 296,
    "name": "마크탕",
    "types": [
      "격투"
    ],
    "H": 72,
    "A": 60,
    "B": 30,
    "C": 20,
    "D": 30,
    "S": 25,
    "total": 237,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/296.png",
    "ability": [
      "두꺼운지방",
      "근성"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 297,
    "number": 297,
    "name": "하리뭉",
    "types": [
      "격투"
    ],
    "H": 144,
    "A": 120,
    "B": 60,
    "C": 40,
    "D": 60,
    "S": 50,
    "total": 474,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/297.png",
    "ability": [
      "두꺼운지방",
      "근성"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 298,
    "number": 298,
    "name": "루리리",
    "types": [
      "노말",
      "페어리"
    ],
    "H": 50,
    "A": 20,
    "B": 40,
    "C": 20,
    "D": 40,
    "S": 20,
    "total": 190,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/298.png",
    "ability": [
      "두꺼운지방",
      "천하장사"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 299,
    "number": 299,
    "name": "코코파스",
    "types": [
      "바위"
    ],
    "H": 30,
    "A": 45,
    "B": 135,
    "C": 45,
    "D": 90,
    "S": 30,
    "total": 375,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/299.png",
    "ability": [
      "옹골참",
      "자력"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 300,
    "number": 300,
    "name": "에나비",
    "types": [
      "노말"
    ],
    "H": 50,
    "A": 45,
    "B": 45,
    "C": 35,
    "D": 35,
    "S": 50,
    "total": 260,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/300.png",
    "ability": [
      "헤롱헤롱바디",
      "노말스킨"
    ],
    "s_ability": [
      "미라클스킨"
    ]
  },
  {
    "id": 301,
    "number": 301,
    "name": "델케티",
    "types": [
      "노말"
    ],
    "H": 70,
    "A": 65,
    "B": 65,
    "C": 55,
    "D": 55,
    "S": 90,
    "total": 400,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/301.png",
    "ability": [
      "헤롱헤롱바디",
      "노말스킨"
    ],
    "s_ability": [
      "미라클스킨"
    ]
  },
  {
    "id": 302,
    "number": 302,
    "name": "깜까미",
    "types": [
      "악",
      "고스트"
    ],
    "H": 50,
    "A": 75,
    "B": 75,
    "C": 65,
    "D": 65,
    "S": 50,
    "total": 380,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/302.png",
    "ability": [
      "날카로운눈",
      "시간벌기"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 303,
    "number": 303,
    "name": "입치트",
    "types": [
      "강철",
      "페어리"
    ],
    "H": 50,
    "A": 85,
    "B": 85,
    "C": 55,
    "D": 55,
    "S": 50,
    "total": 380,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/303.png",
    "ability": [
      "괴력집게",
      "위협"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 304,
    "number": 304,
    "name": "가보리",
    "types": [
      "강철",
      "바위"
    ],
    "H": 50,
    "A": 70,
    "B": 100,
    "C": 40,
    "D": 40,
    "S": 30,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/304.png",
    "ability": [
      "옹골참",
      "돌머리"
    ],
    "s_ability": [
      "헤비메탈"
    ]
  },
  {
    "id": 305,
    "number": 305,
    "name": "갱도라",
    "types": [
      "강철",
      "바위"
    ],
    "H": 60,
    "A": 90,
    "B": 140,
    "C": 50,
    "D": 50,
    "S": 40,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/305.png",
    "ability": [
      "옹골참",
      "돌머리"
    ],
    "s_ability": [
      "헤비메탈"
    ]
  },
  {
    "id": 306,
    "number": 306,
    "name": "보스로라",
    "types": [
      "강철",
      "바위"
    ],
    "H": 70,
    "A": 110,
    "B": 180,
    "C": 60,
    "D": 60,
    "S": 50,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/306.png",
    "ability": [
      "옹골참",
      "돌머리"
    ],
    "s_ability": [
      "헤비메탈"
    ]
  },
  {
    "id": 307,
    "number": 307,
    "name": "요가랑",
    "types": [
      "격투",
      "에스퍼"
    ],
    "H": 30,
    "A": 40,
    "B": 55,
    "C": 40,
    "D": 55,
    "S": 60,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/307.png",
    "ability": [
      "순수한힘"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 308,
    "number": 308,
    "name": "요가램",
    "types": [
      "격투",
      "에스퍼"
    ],
    "H": 60,
    "A": 60,
    "B": 75,
    "C": 60,
    "D": 75,
    "S": 80,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/308.png",
    "ability": [
      "순수한힘"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 309,
    "number": 309,
    "name": "썬더라이",
    "types": [
      "전기"
    ],
    "H": 40,
    "A": 45,
    "B": 40,
    "C": 65,
    "D": 40,
    "S": 65,
    "total": 295,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/309.png",
    "ability": [
      "정전기",
      "피뢰침"
    ],
    "s_ability": [
      "마이너스"
    ]
  },
  {
    "id": 310,
    "number": 310,
    "name": "썬더볼트",
    "types": [
      "전기"
    ],
    "H": 70,
    "A": 75,
    "B": 60,
    "C": 105,
    "D": 60,
    "S": 105,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/310.png",
    "ability": [
      "정전기",
      "피뢰침"
    ],
    "s_ability": [
      "마이너스"
    ]
  },
  {
    "id": 311,
    "number": 311,
    "name": "플러시",
    "types": [
      "전기"
    ],
    "H": 60,
    "A": 50,
    "B": 40,
    "C": 85,
    "D": 75,
    "S": 95,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/311.png",
    "ability": [
      "플러스"
    ],
    "s_ability": [
      "피뢰침"
    ]
  },
  {
    "id": 312,
    "number": 312,
    "name": "마이농",
    "types": [
      "전기"
    ],
    "H": 60,
    "A": 40,
    "B": 50,
    "C": 75,
    "D": 85,
    "S": 95,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/312.png",
    "ability": [
      "마이너스"
    ],
    "s_ability": [
      "축전"
    ]
  },
  {
    "id": 313,
    "number": 313,
    "name": "볼비트",
    "types": [
      "벌레"
    ],
    "H": 65,
    "A": 73,
    "B": 75,
    "C": 47,
    "D": 85,
    "S": 85,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/313.png",
    "ability": [
      "발광",
      "벌레의알림"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 314,
    "number": 314,
    "name": "네오비트",
    "types": [
      "벌레"
    ],
    "H": 65,
    "A": 47,
    "B": 75,
    "C": 73,
    "D": 85,
    "S": 85,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/314.png",
    "ability": [
      "둔감",
      "색안경"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 315,
    "number": 315,
    "name": "로젤리아",
    "types": [
      "풀",
      "독"
    ],
    "H": 50,
    "A": 60,
    "B": 45,
    "C": 100,
    "D": 80,
    "S": 65,
    "total": 400,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/315.png",
    "ability": [
      "자연회복",
      "독가시"
    ],
    "s_ability": [
      "리프가드"
    ]
  },
  {
    "id": 316,
    "number": 316,
    "name": "꼴깍몬",
    "types": [
      "독"
    ],
    "H": 70,
    "A": 43,
    "B": 53,
    "C": 43,
    "D": 53,
    "S": 40,
    "total": 302,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/316.png",
    "ability": [
      "해감액",
      "점착"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 317,
    "number": 317,
    "name": "꿀꺽몬",
    "types": [
      "독"
    ],
    "H": 100,
    "A": 73,
    "B": 83,
    "C": 73,
    "D": 83,
    "S": 55,
    "total": 467,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/317.png",
    "ability": [
      "해감액",
      "점착"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 318,
    "number": 318,
    "name": "샤프니아",
    "types": [
      "물",
      "악"
    ],
    "H": 45,
    "A": 90,
    "B": 20,
    "C": 65,
    "D": 20,
    "S": 65,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/318.png",
    "ability": [
      "까칠한피부"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 319,
    "number": 319,
    "name": "샤크니아",
    "types": [
      "물",
      "악"
    ],
    "H": 70,
    "A": 120,
    "B": 40,
    "C": 95,
    "D": 40,
    "S": 95,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/319.png",
    "ability": [
      "까칠한피부"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 320,
    "number": 320,
    "name": "고래왕자",
    "types": [
      "물"
    ],
    "H": 130,
    "A": 70,
    "B": 35,
    "C": 70,
    "D": 35,
    "S": 60,
    "total": 400,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/320.png",
    "ability": [
      "수의베일",
      "둔감"
    ],
    "s_ability": [
      "프레셔"
    ]
  },
  {
    "id": 321,
    "number": 321,
    "name": "고래왕",
    "types": [
      "물"
    ],
    "H": 170,
    "A": 90,
    "B": 45,
    "C": 90,
    "D": 45,
    "S": 60,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/321.png",
    "ability": [
      "수의베일",
      "둔감"
    ],
    "s_ability": [
      "프레셔"
    ]
  },
  {
    "id": 322,
    "number": 322,
    "name": "둔타",
    "types": [
      "불꽃",
      "땅"
    ],
    "H": 60,
    "A": 60,
    "B": 40,
    "C": 65,
    "D": 45,
    "S": 35,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/322.png",
    "ability": [
      "둔감",
      "단순"
    ],
    "s_ability": [
      "마이페이스"
    ]
  },
  {
    "id": 323,
    "number": 323,
    "name": "폭타",
    "types": [
      "불꽃",
      "땅"
    ],
    "H": 70,
    "A": 100,
    "B": 70,
    "C": 105,
    "D": 75,
    "S": 40,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/323.png",
    "ability": [
      "마그마의무장",
      "하드록"
    ],
    "s_ability": [
      "분노의경혈"
    ]
  },
  {
    "id": 324,
    "number": 324,
    "name": "코터스",
    "types": [
      "불꽃"
    ],
    "H": 70,
    "A": 85,
    "B": 140,
    "C": 85,
    "D": 70,
    "S": 20,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/324.png",
    "ability": [
      "하얀연기",
      "가뭄"
    ],
    "s_ability": [
      "조가비갑옷"
    ]
  },
  {
    "id": 325,
    "number": 325,
    "name": "피그점프",
    "types": [
      "에스퍼"
    ],
    "H": 60,
    "A": 25,
    "B": 35,
    "C": 70,
    "D": 80,
    "S": 60,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/325.png",
    "ability": [
      "두꺼운지방",
      "마이페이스"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 326,
    "number": 326,
    "name": "피그킹",
    "types": [
      "에스퍼"
    ],
    "H": 80,
    "A": 45,
    "B": 65,
    "C": 90,
    "D": 110,
    "S": 80,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/326.png",
    "ability": [
      "두꺼운지방",
      "마이페이스"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 327,
    "number": 327,
    "name": "얼루기",
    "types": [
      "노말"
    ],
    "H": 60,
    "A": 60,
    "B": 60,
    "C": 60,
    "D": 60,
    "S": 60,
    "total": 360,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/327.png",
    "ability": [
      "마이페이스",
      "갈지자걸음"
    ],
    "s_ability": [
      "심술꾸러기"
    ]
  },
  {
    "id": 328,
    "number": 328,
    "name": "톱치",
    "types": [
      "땅"
    ],
    "H": 45,
    "A": 100,
    "B": 45,
    "C": 45,
    "D": 45,
    "S": 10,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/328.png",
    "ability": [
      "괴력집게",
      "개미지옥"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 329,
    "number": 329,
    "name": "비브라바",
    "types": [
      "땅",
      "드래곤"
    ],
    "H": 50,
    "A": 70,
    "B": 50,
    "C": 50,
    "D": 50,
    "S": 70,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/329.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 330,
    "number": 330,
    "name": "플라이곤",
    "types": [
      "땅",
      "드래곤"
    ],
    "H": 80,
    "A": 100,
    "B": 80,
    "C": 80,
    "D": 80,
    "S": 100,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/330.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 331,
    "number": 331,
    "name": "선인왕",
    "types": [
      "풀"
    ],
    "H": 50,
    "A": 85,
    "B": 40,
    "C": 85,
    "D": 40,
    "S": 35,
    "total": 335,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/331.png",
    "ability": [
      "모래숨기"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 332,
    "number": 332,
    "name": "밤선인",
    "types": [
      "풀",
      "악"
    ],
    "H": 70,
    "A": 115,
    "B": 60,
    "C": 115,
    "D": 60,
    "S": 55,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/332.png",
    "ability": [
      "모래숨기"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 333,
    "number": 333,
    "name": "파비코",
    "types": [
      "노말",
      "비행"
    ],
    "H": 45,
    "A": 40,
    "B": 60,
    "C": 40,
    "D": 75,
    "S": 50,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/333.png",
    "ability": [
      "자연회복"
    ],
    "s_ability": [
      "날씨부정"
    ]
  },
  {
    "id": 334,
    "number": 334,
    "name": "파비코리",
    "types": [
      "드래곤",
      "비행"
    ],
    "H": 75,
    "A": 70,
    "B": 90,
    "C": 70,
    "D": 105,
    "S": 80,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/334.png",
    "ability": [
      "자연회복"
    ],
    "s_ability": [
      "날씨부정"
    ]
  },
  {
    "id": 335,
    "number": 335,
    "name": "쟝고",
    "types": [
      "노말"
    ],
    "H": 73,
    "A": 115,
    "B": 60,
    "C": 60,
    "D": 60,
    "S": 90,
    "total": 458,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/335.png",
    "ability": [
      "면역"
    ],
    "s_ability": [
      "독폭주"
    ]
  },
  {
    "id": 336,
    "number": 336,
    "name": "세비퍼",
    "types": [
      "독"
    ],
    "H": 73,
    "A": 100,
    "B": 60,
    "C": 100,
    "D": 60,
    "S": 65,
    "total": 458,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/336.png",
    "ability": [
      "탈피"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 337,
    "number": 337,
    "name": "루나톤",
    "types": [
      "바위",
      "에스퍼"
    ],
    "H": 90,
    "A": 55,
    "B": 65,
    "C": 95,
    "D": 85,
    "S": 70,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/337.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 338,
    "number": 338,
    "name": "솔록",
    "types": [
      "바위",
      "에스퍼"
    ],
    "H": 90,
    "A": 95,
    "B": 85,
    "C": 55,
    "D": 65,
    "S": 70,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/338.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 339,
    "number": 339,
    "name": "미꾸리",
    "types": [
      "물",
      "땅"
    ],
    "H": 50,
    "A": 48,
    "B": 43,
    "C": 46,
    "D": 41,
    "S": 60,
    "total": 288,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/339.png",
    "ability": [
      "둔감",
      "위험예지"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 340,
    "number": 340,
    "name": "메깅",
    "types": [
      "물",
      "땅"
    ],
    "H": 110,
    "A": 78,
    "B": 73,
    "C": 76,
    "D": 71,
    "S": 60,
    "total": 468,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/340.png",
    "ability": [
      "둔감",
      "위험예지"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 341,
    "number": 341,
    "name": "가재군",
    "types": [
      "물"
    ],
    "H": 43,
    "A": 80,
    "B": 65,
    "C": 50,
    "D": 35,
    "S": 35,
    "total": 308,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/341.png",
    "ability": [
      "괴력집게",
      "조가비갑옷"
    ],
    "s_ability": [
      "적응력"
    ]
  },
  {
    "id": 342,
    "number": 342,
    "name": "가재장군",
    "types": [
      "물",
      "악"
    ],
    "H": 63,
    "A": 120,
    "B": 85,
    "C": 90,
    "D": 55,
    "S": 55,
    "total": 468,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/342.png",
    "ability": [
      "괴력집게",
      "조가비갑옷"
    ],
    "s_ability": [
      "적응력"
    ]
  },
  {
    "id": 343,
    "number": 343,
    "name": "오뚝군",
    "types": [
      "땅",
      "에스퍼"
    ],
    "H": 40,
    "A": 40,
    "B": 55,
    "C": 40,
    "D": 70,
    "S": 55,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/343.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 344,
    "number": 344,
    "name": "점토도리",
    "types": [
      "땅",
      "에스퍼"
    ],
    "H": 60,
    "A": 70,
    "B": 105,
    "C": 70,
    "D": 120,
    "S": 75,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/344.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 345,
    "number": 345,
    "name": "릴링",
    "types": [
      "바위",
      "풀"
    ],
    "H": 66,
    "A": 41,
    "B": 77,
    "C": 61,
    "D": 87,
    "S": 23,
    "total": 355,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/345.png",
    "ability": [
      "흡반"
    ],
    "s_ability": [
      "마중물"
    ]
  },
  {
    "id": 346,
    "number": 346,
    "name": "릴리요",
    "types": [
      "바위",
      "풀"
    ],
    "H": 86,
    "A": 81,
    "B": 97,
    "C": 81,
    "D": 107,
    "S": 43,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/346.png",
    "ability": [
      "흡반"
    ],
    "s_ability": [
      "마중물"
    ]
  },
  {
    "id": 347,
    "number": 347,
    "name": "아노딥스",
    "types": [
      "바위",
      "벌레"
    ],
    "H": 45,
    "A": 95,
    "B": 50,
    "C": 40,
    "D": 50,
    "S": 75,
    "total": 355,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/347.png",
    "ability": [
      "전투무장"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 348,
    "number": 348,
    "name": "아말도",
    "types": [
      "바위",
      "벌레"
    ],
    "H": 75,
    "A": 125,
    "B": 100,
    "C": 70,
    "D": 80,
    "S": 45,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/348.png",
    "ability": [
      "전투무장"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 349,
    "number": 349,
    "name": "빈티나",
    "types": [
      "물"
    ],
    "H": 20,
    "A": 15,
    "B": 20,
    "C": 10,
    "D": 55,
    "S": 80,
    "total": 200,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/349.png",
    "ability": [
      "쓱쓱",
      "둔감"
    ],
    "s_ability": [
      "적응력"
    ]
  },
  {
    "id": 350,
    "number": 350,
    "name": "밀로틱",
    "types": [
      "물"
    ],
    "H": 95,
    "A": 60,
    "B": 79,
    "C": 100,
    "D": 125,
    "S": 81,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/350.png",
    "ability": [
      "이상한비늘",
      "승기"
    ],
    "s_ability": [
      "헤롱헤롱바디"
    ]
  },
  {
    "id": 351,
    "number": 351,
    "name": "캐스퐁",
    "types": [
      "노말"
    ],
    "H": 70,
    "A": 70,
    "B": 70,
    "C": 70,
    "D": 70,
    "S": 70,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/351.png",
    "ability": [
      "기분파"
    ],
    "s_ability": []
  },
  {
    "id": 352,
    "number": 352,
    "name": "켈리몬",
    "types": [
      "노말"
    ],
    "H": 60,
    "A": 90,
    "B": 70,
    "C": 60,
    "D": 120,
    "S": 40,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/352.png",
    "ability": [
      "변색"
    ],
    "s_ability": [
      "변환자재"
    ]
  },
  {
    "id": 353,
    "number": 353,
    "name": "어둠대신",
    "types": [
      "고스트"
    ],
    "H": 44,
    "A": 75,
    "B": 35,
    "C": 63,
    "D": 33,
    "S": 45,
    "total": 295,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/353.png",
    "ability": [
      "불면",
      "통찰"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 354,
    "number": 354,
    "name": "다크펫",
    "types": [
      "고스트"
    ],
    "H": 64,
    "A": 115,
    "B": 65,
    "C": 83,
    "D": 63,
    "S": 65,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/354.png",
    "ability": [
      "불면",
      "통찰"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 355,
    "number": 355,
    "name": "해골몽",
    "types": [
      "고스트"
    ],
    "H": 20,
    "A": 40,
    "B": 90,
    "C": 30,
    "D": 90,
    "S": 25,
    "total": 295,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/355.png",
    "ability": [
      "부유"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 356,
    "number": 356,
    "name": "미라몽",
    "types": [
      "고스트"
    ],
    "H": 40,
    "A": 70,
    "B": 130,
    "C": 60,
    "D": 130,
    "S": 25,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/356.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 357,
    "number": 357,
    "name": "트로피우스",
    "types": [
      "풀",
      "비행"
    ],
    "H": 99,
    "A": 68,
    "B": 83,
    "C": 72,
    "D": 87,
    "S": 51,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/357.png",
    "ability": [
      "엽록소",
      "선파워"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 358,
    "number": 358,
    "name": "치렁",
    "types": [
      "에스퍼"
    ],
    "H": 75,
    "A": 50,
    "B": 80,
    "C": 95,
    "D": 90,
    "S": 65,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/358.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 359,
    "number": 359,
    "name": "앱솔",
    "types": [
      "악"
    ],
    "H": 65,
    "A": 130,
    "B": 60,
    "C": 75,
    "D": 60,
    "S": 75,
    "total": 465,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/359.png",
    "ability": [
      "프레셔",
      "대운"
    ],
    "s_ability": [
      "정의의마음"
    ]
  },
  {
    "id": 360,
    "number": 360,
    "name": "마자",
    "types": [
      "에스퍼"
    ],
    "H": 95,
    "A": 23,
    "B": 48,
    "C": 23,
    "D": 48,
    "S": 23,
    "total": 260,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/360.png",
    "ability": [
      "그림자밟기"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 361,
    "number": 361,
    "name": "눈꼬마",
    "types": [
      "얼음"
    ],
    "H": 50,
    "A": 50,
    "B": 50,
    "C": 50,
    "D": 50,
    "S": 50,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/361.png",
    "ability": [
      "정신력",
      "아이스바디"
    ],
    "s_ability": [
      "변덕쟁이"
    ]
  },
  {
    "id": 362,
    "number": 362,
    "name": "얼음귀신",
    "types": [
      "얼음"
    ],
    "H": 80,
    "A": 80,
    "B": 80,
    "C": 80,
    "D": 80,
    "S": 80,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/362.png",
    "ability": [
      "정신력",
      "아이스바디"
    ],
    "s_ability": [
      "변덕쟁이"
    ]
  },
  {
    "id": 363,
    "number": 363,
    "name": "대굴레오",
    "types": [
      "얼음",
      "물"
    ],
    "H": 70,
    "A": 40,
    "B": 50,
    "C": 55,
    "D": 50,
    "S": 25,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/363.png",
    "ability": [
      "두꺼운지방",
      "아이스바디"
    ],
    "s_ability": [
      "둔감"
    ]
  },
  {
    "id": 364,
    "number": 364,
    "name": "씨레오",
    "types": [
      "얼음",
      "물"
    ],
    "H": 90,
    "A": 60,
    "B": 70,
    "C": 75,
    "D": 70,
    "S": 45,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/364.png",
    "ability": [
      "두꺼운지방",
      "아이스바디"
    ],
    "s_ability": [
      "둔감"
    ]
  },
  {
    "id": 365,
    "number": 365,
    "name": "씨카이저",
    "types": [
      "얼음",
      "물"
    ],
    "H": 110,
    "A": 80,
    "B": 90,
    "C": 95,
    "D": 90,
    "S": 65,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/365.png",
    "ability": [
      "두꺼운지방",
      "아이스바디"
    ],
    "s_ability": [
      "둔감"
    ]
  },
  {
    "id": 366,
    "number": 366,
    "name": "진주몽",
    "types": [
      "물"
    ],
    "H": 35,
    "A": 64,
    "B": 85,
    "C": 74,
    "D": 55,
    "S": 32,
    "total": 345,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/366.png",
    "ability": [
      "조가비갑옷"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 367,
    "number": 367,
    "name": "헌테일",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 104,
    "B": 105,
    "C": 94,
    "D": 75,
    "S": 52,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/367.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "수의베일"
    ]
  },
  {
    "id": 368,
    "number": 368,
    "name": "분홍장이",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 84,
    "B": 105,
    "C": 114,
    "D": 75,
    "S": 52,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/368.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 369,
    "number": 369,
    "name": "시라칸",
    "types": [
      "물",
      "바위"
    ],
    "H": 100,
    "A": 90,
    "B": 130,
    "C": 45,
    "D": 65,
    "S": 55,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/369.png",
    "ability": [
      "쓱쓱",
      "돌머리"
    ],
    "s_ability": [
      "옹골참"
    ]
  },
  {
    "id": 370,
    "number": 370,
    "name": "사랑동이",
    "types": [
      "물"
    ],
    "H": 43,
    "A": 30,
    "B": 55,
    "C": 40,
    "D": 65,
    "S": 97,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/370.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 371,
    "number": 371,
    "name": "아공이",
    "types": [
      "드래곤"
    ],
    "H": 45,
    "A": 75,
    "B": 60,
    "C": 40,
    "D": 30,
    "S": 50,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/371.png",
    "ability": [
      "돌머리"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 372,
    "number": 372,
    "name": "쉘곤",
    "types": [
      "드래곤"
    ],
    "H": 65,
    "A": 95,
    "B": 100,
    "C": 60,
    "D": 50,
    "S": 50,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/372.png",
    "ability": [
      "돌머리"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 373,
    "number": 373,
    "name": "보만다",
    "types": [
      "드래곤",
      "비행"
    ],
    "H": 95,
    "A": 135,
    "B": 80,
    "C": 110,
    "D": 80,
    "S": 100,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/373.png",
    "ability": [
      "위협"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 374,
    "number": 374,
    "name": "메탕",
    "types": [
      "강철",
      "에스퍼"
    ],
    "H": 40,
    "A": 55,
    "B": 80,
    "C": 35,
    "D": 60,
    "S": 30,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/374.png",
    "ability": [
      "클리어바디"
    ],
    "s_ability": [
      "라이트메탈"
    ]
  },
  {
    "id": 375,
    "number": 375,
    "name": "메탕구",
    "types": [
      "강철",
      "에스퍼"
    ],
    "H": 60,
    "A": 75,
    "B": 100,
    "C": 55,
    "D": 80,
    "S": 50,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/375.png",
    "ability": [
      "클리어바디"
    ],
    "s_ability": [
      "라이트메탈"
    ]
  },
  {
    "id": 376,
    "number": 376,
    "name": "메타그로스",
    "types": [
      "강철",
      "에스퍼"
    ],
    "H": 80,
    "A": 135,
    "B": 130,
    "C": 95,
    "D": 90,
    "S": 70,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/376.png",
    "ability": [
      "클리어바디"
    ],
    "s_ability": [
      "라이트메탈"
    ]
  },
  {
    "id": 377,
    "number": 377,
    "name": "레지락",
    "types": [
      "바위"
    ],
    "H": 80,
    "A": 100,
    "B": 200,
    "C": 50,
    "D": 100,
    "S": 50,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/377.png",
    "ability": [
      "클리어바디"
    ],
    "s_ability": [
      "옹골참"
    ]
  },
  {
    "id": 378,
    "number": 378,
    "name": "레지아이스",
    "types": [
      "얼음"
    ],
    "H": 80,
    "A": 50,
    "B": 100,
    "C": 100,
    "D": 200,
    "S": 50,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/378.png",
    "ability": [
      "클리어바디"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 379,
    "number": 379,
    "name": "레지스틸",
    "types": [
      "강철"
    ],
    "H": 80,
    "A": 75,
    "B": 150,
    "C": 75,
    "D": 150,
    "S": 50,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/379.png",
    "ability": [
      "클리어바디"
    ],
    "s_ability": [
      "라이트메탈"
    ]
  },
  {
    "id": 380,
    "number": 380,
    "name": "라티아스",
    "types": [
      "드래곤",
      "에스퍼"
    ],
    "H": 80,
    "A": 80,
    "B": 90,
    "C": 110,
    "D": 130,
    "S": 110,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/380.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 381,
    "number": 381,
    "name": "라티오스",
    "types": [
      "드래곤",
      "에스퍼"
    ],
    "H": 80,
    "A": 90,
    "B": 80,
    "C": 130,
    "D": 110,
    "S": 110,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/381.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 382,
    "number": 382,
    "name": "가이오가",
    "types": [
      "물"
    ],
    "H": 100,
    "A": 100,
    "B": 90,
    "C": 150,
    "D": 140,
    "S": 90,
    "total": 670,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/382.png",
    "ability": [
      "잔비"
    ],
    "s_ability": []
  },
  {
    "id": 383,
    "number": 383,
    "name": "그란돈",
    "types": [
      "땅"
    ],
    "H": 100,
    "A": 150,
    "B": 140,
    "C": 100,
    "D": 90,
    "S": 90,
    "total": 670,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/383.png",
    "ability": [
      "가뭄"
    ],
    "s_ability": []
  },
  {
    "id": 384,
    "number": 384,
    "name": "레쿠쟈",
    "types": [
      "드래곤",
      "비행"
    ],
    "H": 105,
    "A": 150,
    "B": 90,
    "C": 150,
    "D": 90,
    "S": 95,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/384.png",
    "ability": [
      "에어록"
    ],
    "s_ability": []
  },
  {
    "id": 385,
    "number": 385,
    "name": "지라치",
    "types": [
      "강철",
      "에스퍼"
    ],
    "H": 100,
    "A": 100,
    "B": 100,
    "C": 100,
    "D": 100,
    "S": 100,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/385.png",
    "ability": [
      "하늘의은총"
    ],
    "s_ability": []
  },
  {
    "id": 386,
    "number": 386,
    "name": "테오키스 노말폼",
    "types": [
      "에스퍼"
    ],
    "H": 50,
    "A": 150,
    "B": 50,
    "C": 150,
    "D": 50,
    "S": 150,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/386.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": []
  },
  {
    "id": 387,
    "number": 387,
    "name": "모부기",
    "types": [
      "풀"
    ],
    "H": 55,
    "A": 68,
    "B": 64,
    "C": 45,
    "D": 55,
    "S": 31,
    "total": 318,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/387.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "조가비갑옷"
    ]
  },
  {
    "id": 388,
    "number": 388,
    "name": "수풀부기",
    "types": [
      "풀"
    ],
    "H": 75,
    "A": 89,
    "B": 85,
    "C": 55,
    "D": 65,
    "S": 36,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/388.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "조가비갑옷"
    ]
  },
  {
    "id": 389,
    "number": 389,
    "name": "토대부기",
    "types": [
      "풀",
      "땅"
    ],
    "H": 95,
    "A": 109,
    "B": 105,
    "C": 75,
    "D": 85,
    "S": 56,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/389.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "조가비갑옷"
    ]
  },
  {
    "id": 390,
    "number": 390,
    "name": "불꽃숭이",
    "types": [
      "불꽃"
    ],
    "H": 44,
    "A": 58,
    "B": 44,
    "C": 58,
    "D": 44,
    "S": 61,
    "total": 309,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/390.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 391,
    "number": 391,
    "name": "파이숭이",
    "types": [
      "불꽃",
      "격투"
    ],
    "H": 64,
    "A": 78,
    "B": 52,
    "C": 78,
    "D": 52,
    "S": 81,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/391.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 392,
    "number": 392,
    "name": "초염몽",
    "types": [
      "불꽃",
      "격투"
    ],
    "H": 76,
    "A": 104,
    "B": 71,
    "C": 104,
    "D": 71,
    "S": 108,
    "total": 534,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/392.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 393,
    "number": 393,
    "name": "팽도리",
    "types": [
      "물"
    ],
    "H": 53,
    "A": 51,
    "B": 53,
    "C": 61,
    "D": 56,
    "S": 40,
    "total": 314,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "승기"
    ]
  },
  {
    "id": 394,
    "number": 394,
    "name": "팽태자",
    "types": [
      "물"
    ],
    "H": 64,
    "A": 66,
    "B": 68,
    "C": 81,
    "D": 76,
    "S": 50,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/394.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "승기"
    ]
  },
  {
    "id": 395,
    "number": 395,
    "name": "엠페르트",
    "types": [
      "물",
      "강철"
    ],
    "H": 84,
    "A": 86,
    "B": 88,
    "C": 111,
    "D": 101,
    "S": 60,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/395.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "승기"
    ]
  },
  {
    "id": 396,
    "number": 396,
    "name": "찌르꼬",
    "types": [
      "노말",
      "비행"
    ],
    "H": 40,
    "A": 55,
    "B": 30,
    "C": 30,
    "D": 30,
    "S": 60,
    "total": 245,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/396.png",
    "ability": [
      "날카로운눈"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 397,
    "number": 397,
    "name": "찌르버드",
    "types": [
      "노말",
      "비행"
    ],
    "H": 55,
    "A": 75,
    "B": 50,
    "C": 40,
    "D": 40,
    "S": 80,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/397.png",
    "ability": [
      "위협"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 398,
    "number": 398,
    "name": "찌르호크",
    "types": [
      "노말",
      "비행"
    ],
    "H": 85,
    "A": 120,
    "B": 70,
    "C": 50,
    "D": 60,
    "S": 100,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/398.png",
    "ability": [
      "위협"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 399,
    "number": 399,
    "name": "비버니",
    "types": [
      "노말"
    ],
    "H": 59,
    "A": 45,
    "B": 40,
    "C": 35,
    "D": 40,
    "S": 31,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/399.png",
    "ability": [
      "단순",
      "천진"
    ],
    "s_ability": [
      "변덕쟁이"
    ]
  },
  {
    "id": 400,
    "number": 400,
    "name": "비버통",
    "types": [
      "노말",
      "물"
    ],
    "H": 79,
    "A": 85,
    "B": 60,
    "C": 55,
    "D": 60,
    "S": 71,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/400.png",
    "ability": [
      "단순",
      "천진"
    ],
    "s_ability": [
      "변덕쟁이"
    ]
  },
  {
    "id": 401,
    "number": 401,
    "name": "귀뚤뚜기",
    "types": [
      "벌레"
    ],
    "H": 37,
    "A": 25,
    "B": 41,
    "C": 25,
    "D": 41,
    "S": 25,
    "total": 194,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/401.png",
    "ability": [
      "탈피"
    ],
    "s_ability": [
      "도주"
    ]
  },
  {
    "id": 402,
    "number": 402,
    "name": "귀뚤톡크",
    "types": [
      "벌레"
    ],
    "H": 77,
    "A": 85,
    "B": 51,
    "C": 55,
    "D": 51,
    "S": 65,
    "total": 384,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/402.png",
    "ability": [
      "벌레의알림"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 403,
    "number": 403,
    "name": "꼬링크",
    "types": [
      "전기"
    ],
    "H": 45,
    "A": 65,
    "B": 34,
    "C": 40,
    "D": 34,
    "S": 45,
    "total": 263,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/403.png",
    "ability": [
      "투쟁심",
      "위협"
    ],
    "s_ability": [
      "근성"
    ]
  },
  {
    "id": 404,
    "number": 404,
    "name": "럭시오",
    "types": [
      "전기"
    ],
    "H": 60,
    "A": 85,
    "B": 49,
    "C": 60,
    "D": 49,
    "S": 60,
    "total": 363,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/404.png",
    "ability": [
      "투쟁심",
      "위협"
    ],
    "s_ability": [
      "근성"
    ]
  },
  {
    "id": 405,
    "number": 405,
    "name": "렌트라",
    "types": [
      "전기"
    ],
    "H": 80,
    "A": 120,
    "B": 79,
    "C": 95,
    "D": 79,
    "S": 70,
    "total": 523,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/405.png",
    "ability": [
      "투쟁심",
      "위협"
    ],
    "s_ability": [
      "근성"
    ]
  },
  {
    "id": 406,
    "number": 406,
    "name": "꼬몽울",
    "types": [
      "풀",
      "독"
    ],
    "H": 40,
    "A": 30,
    "B": 35,
    "C": 50,
    "D": 70,
    "S": 55,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/406.png",
    "ability": [
      "자연회복",
      "독가시"
    ],
    "s_ability": [
      "리프가드"
    ]
  },
  {
    "id": 407,
    "number": 407,
    "name": "로즈레이드",
    "types": [
      "풀",
      "독"
    ],
    "H": 60,
    "A": 70,
    "B": 65,
    "C": 125,
    "D": 105,
    "S": 90,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/407.png",
    "ability": [
      "자연회복",
      "독가시"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 408,
    "number": 408,
    "name": "두개도스",
    "types": [
      "바위"
    ],
    "H": 67,
    "A": 125,
    "B": 40,
    "C": 30,
    "D": 30,
    "S": 58,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/408.png",
    "ability": [
      "틀깨기"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 409,
    "number": 409,
    "name": "램펄드",
    "types": [
      "바위"
    ],
    "H": 97,
    "A": 165,
    "B": 60,
    "C": 65,
    "D": 50,
    "S": 58,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/409.png",
    "ability": [
      "틀깨기"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 410,
    "number": 410,
    "name": "방패톱스",
    "types": [
      "바위",
      "강철"
    ],
    "H": 30,
    "A": 42,
    "B": 118,
    "C": 42,
    "D": 88,
    "S": 30,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/410.png",
    "ability": [
      "옹골참"
    ],
    "s_ability": [
      "방음"
    ]
  },
  {
    "id": 411,
    "number": 411,
    "name": "바리톱스",
    "types": [
      "바위",
      "강철"
    ],
    "H": 60,
    "A": 52,
    "B": 168,
    "C": 47,
    "D": 138,
    "S": 30,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/411.png",
    "ability": [
      "옹골참"
    ],
    "s_ability": [
      "방음"
    ]
  },
  {
    "id": 412,
    "number": 412,
    "name": "도롱충이",
    "types": [
      "벌레"
    ],
    "H": 40,
    "A": 29,
    "B": 45,
    "C": 29,
    "D": 45,
    "S": 36,
    "total": 224,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/412.png",
    "ability": [
      "탈피"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 413,
    "number": 413,
    "name": "도롱마담",
    "types": [
      "벌레",
      "풀"
    ],
    "H": 60,
    "A": 59,
    "B": 85,
    "C": 79,
    "D": 105,
    "S": 36,
    "total": 424,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/413.png",
    "ability": [
      "위험예지"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 414,
    "number": 414,
    "name": "나메일",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 70,
    "A": 94,
    "B": 50,
    "C": 94,
    "D": 50,
    "S": 66,
    "total": 424,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/414.png",
    "ability": [
      "벌레의알림"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 415,
    "number": 415,
    "name": "세꿀버리",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 30,
    "A": 30,
    "B": 42,
    "C": 30,
    "D": 42,
    "S": 70,
    "total": 244,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/415.png",
    "ability": [
      "꿀모으기"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 416,
    "number": 416,
    "name": "비퀸",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 70,
    "A": 80,
    "B": 102,
    "C": 80,
    "D": 102,
    "S": 40,
    "total": 474,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/416.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 417,
    "number": 417,
    "name": "파치리스",
    "types": [
      "전기"
    ],
    "H": 60,
    "A": 45,
    "B": 70,
    "C": 45,
    "D": 90,
    "S": 95,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/417.png",
    "ability": [
      "도주",
      "픽업"
    ],
    "s_ability": [
      "축전"
    ]
  },
  {
    "id": 418,
    "number": 418,
    "name": "브이젤",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 65,
    "B": 35,
    "C": 60,
    "D": 30,
    "S": 85,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/418.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "수의베일"
    ]
  },
  {
    "id": 419,
    "number": 419,
    "name": "플로젤",
    "types": [
      "물"
    ],
    "H": 85,
    "A": 105,
    "B": 55,
    "C": 85,
    "D": 50,
    "S": 115,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/419.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "수의베일"
    ]
  },
  {
    "id": 420,
    "number": 420,
    "name": "체리버",
    "types": [
      "풀"
    ],
    "H": 45,
    "A": 35,
    "B": 45,
    "C": 62,
    "D": 53,
    "S": 35,
    "total": 275,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/420.png",
    "ability": [
      "엽록소"
    ],
    "s_ability": []
  },
  {
    "id": 421,
    "number": 421,
    "name": "체리꼬",
    "types": [
      "풀"
    ],
    "H": 70,
    "A": 60,
    "B": 70,
    "C": 87,
    "D": 78,
    "S": 85,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/421.png",
    "ability": [
      "플라워기프트"
    ],
    "s_ability": []
  },
  {
    "id": 422,
    "number": 422,
    "name": "깝질무",
    "types": [
      "물"
    ],
    "H": 76,
    "A": 48,
    "B": 48,
    "C": 57,
    "D": 62,
    "S": 34,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/422.png",
    "ability": [
      "점착",
      "마중물"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 423,
    "number": 423,
    "name": "트리토돈",
    "types": [
      "물",
      "땅"
    ],
    "H": 111,
    "A": 83,
    "B": 68,
    "C": 92,
    "D": 82,
    "S": 39,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/423.png",
    "ability": [
      "점착",
      "마중물"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 424,
    "number": 424,
    "name": "겟핸보숭",
    "types": [
      "노말"
    ],
    "H": 75,
    "A": 100,
    "B": 66,
    "C": 60,
    "D": 66,
    "S": 115,
    "total": 482,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/424.png",
    "ability": [
      "테크니션",
      "픽업"
    ],
    "s_ability": [
      "스킬링크"
    ]
  },
  {
    "id": 425,
    "number": 425,
    "name": "흔들풍손",
    "types": [
      "고스트",
      "비행"
    ],
    "H": 90,
    "A": 50,
    "B": 34,
    "C": 60,
    "D": 44,
    "S": 70,
    "total": 348,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/425.png",
    "ability": [
      "유폭",
      "곡예"
    ],
    "s_ability": [
      "열폭주"
    ]
  },
  {
    "id": 426,
    "number": 426,
    "name": "둥실라이드",
    "types": [
      "고스트",
      "비행"
    ],
    "H": 150,
    "A": 80,
    "B": 44,
    "C": 90,
    "D": 54,
    "S": 80,
    "total": 498,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/426.png",
    "ability": [
      "유폭",
      "곡예"
    ],
    "s_ability": [
      "열폭주"
    ]
  },
  {
    "id": 427,
    "number": 427,
    "name": "이어롤",
    "types": [
      "노말"
    ],
    "H": 55,
    "A": 66,
    "B": 44,
    "C": 44,
    "D": 56,
    "S": 85,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/427.png",
    "ability": [
      "도주",
      "서투름"
    ],
    "s_ability": [
      "유연"
    ]
  },
  {
    "id": 428,
    "number": 428,
    "name": "이어롭",
    "types": [
      "노말"
    ],
    "H": 65,
    "A": 76,
    "B": 84,
    "C": 54,
    "D": 96,
    "S": 105,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/428.png",
    "ability": [
      "헤롱헤롱바디",
      "서투름"
    ],
    "s_ability": [
      "유연"
    ]
  },
  {
    "id": 429,
    "number": 429,
    "name": "무우마직",
    "types": [
      "고스트"
    ],
    "H": 60,
    "A": 60,
    "B": 60,
    "C": 105,
    "D": 105,
    "S": 105,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/429.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 430,
    "number": 430,
    "name": "돈크로우",
    "types": [
      "악",
      "비행"
    ],
    "H": 100,
    "A": 125,
    "B": 52,
    "C": 105,
    "D": 52,
    "S": 71,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/430.png",
    "ability": [
      "불면",
      "대운"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 431,
    "number": 431,
    "name": "나옹마",
    "types": [
      "노말"
    ],
    "H": 49,
    "A": 55,
    "B": 42,
    "C": 42,
    "D": 37,
    "S": 85,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/431.png",
    "ability": [
      "유연",
      "마이페이스"
    ],
    "s_ability": [
      "날카로운눈"
    ]
  },
  {
    "id": 432,
    "number": 432,
    "name": "몬냥이",
    "types": [
      "노말"
    ],
    "H": 71,
    "A": 82,
    "B": 64,
    "C": 64,
    "D": 59,
    "S": 112,
    "total": 452,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/432.png",
    "ability": [
      "두꺼운지방",
      "마이페이스"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 433,
    "number": 433,
    "name": "랑딸랑",
    "types": [
      "에스퍼"
    ],
    "H": 45,
    "A": 30,
    "B": 50,
    "C": 65,
    "D": 50,
    "S": 45,
    "total": 285,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/433.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 434,
    "number": 434,
    "name": "스컹뿡",
    "types": [
      "독",
      "악"
    ],
    "H": 63,
    "A": 63,
    "B": 47,
    "C": 41,
    "D": 41,
    "S": 74,
    "total": 329,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/434.png",
    "ability": [
      "악취",
      "유폭"
    ],
    "s_ability": [
      "날카로운눈"
    ]
  },
  {
    "id": 435,
    "number": 435,
    "name": "스컹탱크",
    "types": [
      "독",
      "악"
    ],
    "H": 103,
    "A": 93,
    "B": 67,
    "C": 71,
    "D": 61,
    "S": 84,
    "total": 479,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/435.png",
    "ability": [
      "악취",
      "유폭"
    ],
    "s_ability": [
      "날카로운눈"
    ]
  },
  {
    "id": 436,
    "number": 436,
    "name": "동미러",
    "types": [
      "강철",
      "에스퍼"
    ],
    "H": 57,
    "A": 24,
    "B": 86,
    "C": 24,
    "D": 86,
    "S": 23,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/436.png",
    "ability": [
      "부유",
      "내열"
    ],
    "s_ability": [
      "헤비메탈"
    ]
  },
  {
    "id": 437,
    "number": 437,
    "name": "동탁군",
    "types": [
      "강철",
      "에스퍼"
    ],
    "H": 67,
    "A": 89,
    "B": 116,
    "C": 79,
    "D": 116,
    "S": 33,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/437.png",
    "ability": [
      "부유",
      "내열"
    ],
    "s_ability": [
      "헤비메탈"
    ]
  },
  {
    "id": 438,
    "number": 438,
    "name": "꼬지지",
    "types": [
      "바위"
    ],
    "H": 50,
    "A": 80,
    "B": 95,
    "C": 10,
    "D": 45,
    "S": 10,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/438.png",
    "ability": [
      "옹골참",
      "돌머리"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 439,
    "number": 439,
    "name": "흉내내",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 20,
    "A": 25,
    "B": 45,
    "C": 70,
    "D": 90,
    "S": 60,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/439.png",
    "ability": [
      "방음",
      "필터"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 440,
    "number": 440,
    "name": "핑복",
    "types": [
      "노말"
    ],
    "H": 100,
    "A": 5,
    "B": 5,
    "C": 15,
    "D": 65,
    "S": 30,
    "total": 220,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/440.png",
    "ability": [
      "자연회복",
      "하늘의은총"
    ],
    "s_ability": [
      "프렌드가드"
    ]
  },
  {
    "id": 441,
    "number": 441,
    "name": "페라페",
    "types": [
      "노말",
      "비행"
    ],
    "H": 76,
    "A": 65,
    "B": 45,
    "C": 92,
    "D": 42,
    "S": 91,
    "total": 411,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/441.png",
    "ability": [
      "날카로운눈",
      "갈지자걸음"
    ],
    "s_ability": [
      "부풀린가슴"
    ]
  },
  {
    "id": 442,
    "number": 442,
    "name": "화강돌",
    "types": [
      "고스트",
      "악"
    ],
    "H": 50,
    "A": 92,
    "B": 108,
    "C": 92,
    "D": 108,
    "S": 35,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/442.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 443,
    "number": 443,
    "name": "딥상어동",
    "types": [
      "드래곤",
      "땅"
    ],
    "H": 58,
    "A": 70,
    "B": 45,
    "C": 40,
    "D": 45,
    "S": 42,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/443.png",
    "ability": [
      "모래숨기"
    ],
    "s_ability": [
      "까칠한피부"
    ]
  },
  {
    "id": 444,
    "number": 444,
    "name": "한바이트",
    "types": [
      "드래곤",
      "땅"
    ],
    "H": 68,
    "A": 90,
    "B": 65,
    "C": 50,
    "D": 55,
    "S": 82,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/444.png",
    "ability": [
      "모래숨기"
    ],
    "s_ability": [
      "까칠한피부"
    ]
  },
  {
    "id": 445,
    "number": 445,
    "name": "한카리아스",
    "types": [
      "드래곤",
      "땅"
    ],
    "H": 108,
    "A": 130,
    "B": 95,
    "C": 80,
    "D": 85,
    "S": 102,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/445.png",
    "ability": [
      "모래숨기"
    ],
    "s_ability": [
      "까칠한피부"
    ]
  },
  {
    "id": 446,
    "number": 446,
    "name": "먹고자",
    "types": [
      "노말"
    ],
    "H": 135,
    "A": 85,
    "B": 40,
    "C": 40,
    "D": 85,
    "S": 5,
    "total": 390,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/446.png",
    "ability": [
      "픽업",
      "두꺼운지방"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 447,
    "number": 447,
    "name": "리오르",
    "types": [
      "격투"
    ],
    "H": 40,
    "A": 70,
    "B": 40,
    "C": 35,
    "D": 40,
    "S": 60,
    "total": 285,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/447.png",
    "ability": [
      "불굴의마음",
      "정신력"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 448,
    "number": 448,
    "name": "루카리오",
    "types": [
      "격투",
      "강철"
    ],
    "H": 70,
    "A": 110,
    "B": 70,
    "C": 115,
    "D": 70,
    "S": 90,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png",
    "ability": [
      "불굴의마음",
      "정신력"
    ],
    "s_ability": [
      "정의의마음"
    ]
  },
  {
    "id": 449,
    "number": 449,
    "name": "히포포타스",
    "types": [
      "땅"
    ],
    "H": 68,
    "A": 72,
    "B": 78,
    "C": 38,
    "D": 42,
    "S": 32,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/449.png",
    "ability": [
      "모래날림"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 450,
    "number": 450,
    "name": "하마돈",
    "types": [
      "땅"
    ],
    "H": 108,
    "A": 112,
    "B": 118,
    "C": 68,
    "D": 72,
    "S": 47,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/450.png",
    "ability": [
      "모래날림"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 451,
    "number": 451,
    "name": "스콜피",
    "types": [
      "독",
      "벌레"
    ],
    "H": 40,
    "A": 50,
    "B": 90,
    "C": 30,
    "D": 55,
    "S": 65,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/451.png",
    "ability": [
      "전투무장",
      "스나이퍼"
    ],
    "s_ability": [
      "날카로운눈"
    ]
  },
  {
    "id": 452,
    "number": 452,
    "name": "드래피온",
    "types": [
      "독",
      "악"
    ],
    "H": 70,
    "A": 90,
    "B": 110,
    "C": 60,
    "D": 75,
    "S": 95,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/452.png",
    "ability": [
      "전투무장",
      "스나이퍼"
    ],
    "s_ability": [
      "날카로운눈"
    ]
  },
  {
    "id": 453,
    "number": 453,
    "name": "삐딱구리",
    "types": [
      "독",
      "격투"
    ],
    "H": 48,
    "A": 61,
    "B": 40,
    "C": 61,
    "D": 40,
    "S": 50,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/453.png",
    "ability": [
      "위험예지",
      "건조피부"
    ],
    "s_ability": [
      "독수"
    ]
  },
  {
    "id": 454,
    "number": 454,
    "name": "독개굴",
    "types": [
      "독",
      "격투"
    ],
    "H": 83,
    "A": 106,
    "B": 65,
    "C": 86,
    "D": 65,
    "S": 85,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/454.png",
    "ability": [
      "위험예지",
      "건조피부"
    ],
    "s_ability": [
      "독수"
    ]
  },
  {
    "id": 455,
    "number": 455,
    "name": "무스틈니",
    "types": [
      "풀"
    ],
    "H": 74,
    "A": 100,
    "B": 72,
    "C": 90,
    "D": 72,
    "S": 46,
    "total": 454,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/455.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 456,
    "number": 456,
    "name": "형광어",
    "types": [
      "물"
    ],
    "H": 49,
    "A": 49,
    "B": 56,
    "C": 49,
    "D": 61,
    "S": 66,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/456.png",
    "ability": [
      "쓱쓱",
      "마중물"
    ],
    "s_ability": [
      "수의베일"
    ]
  },
  {
    "id": 457,
    "number": 457,
    "name": "네오라이트",
    "types": [
      "물"
    ],
    "H": 69,
    "A": 69,
    "B": 76,
    "C": 69,
    "D": 86,
    "S": 91,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/457.png",
    "ability": [
      "쓱쓱",
      "마중물"
    ],
    "s_ability": [
      "수의베일"
    ]
  },
  {
    "id": 458,
    "number": 458,
    "name": "타만타",
    "types": [
      "물",
      "비행"
    ],
    "H": 45,
    "A": 20,
    "B": 50,
    "C": 60,
    "D": 120,
    "S": 50,
    "total": 345,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/458.png",
    "ability": [
      "쓱쓱",
      "저수"
    ],
    "s_ability": [
      "수의베일"
    ]
  },
  {
    "id": 459,
    "number": 459,
    "name": "눈쓰개",
    "types": [
      "풀",
      "얼음"
    ],
    "H": 60,
    "A": 62,
    "B": 50,
    "C": 62,
    "D": 60,
    "S": 40,
    "total": 334,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/459.png",
    "ability": [
      "눈퍼뜨리기"
    ],
    "s_ability": [
      "방음"
    ]
  },
  {
    "id": 460,
    "number": 460,
    "name": "눈설왕",
    "types": [
      "풀",
      "얼음"
    ],
    "H": 90,
    "A": 92,
    "B": 75,
    "C": 92,
    "D": 85,
    "S": 60,
    "total": 494,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/460.png",
    "ability": [
      "눈퍼뜨리기"
    ],
    "s_ability": [
      "방음"
    ]
  },
  {
    "id": 461,
    "number": 461,
    "name": "포푸니라",
    "types": [
      "악",
      "얼음"
    ],
    "H": 70,
    "A": 120,
    "B": 65,
    "C": 45,
    "D": 85,
    "S": 125,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/461.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 462,
    "number": 462,
    "name": "자포코일",
    "types": [
      "전기",
      "강철"
    ],
    "H": 70,
    "A": 70,
    "B": 115,
    "C": 130,
    "D": 90,
    "S": 60,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/462.png",
    "ability": [
      "자력",
      "옹골참"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 463,
    "number": 463,
    "name": "내룸벨트",
    "types": [
      "노말"
    ],
    "H": 110,
    "A": 85,
    "B": 95,
    "C": 80,
    "D": 95,
    "S": 50,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/463.png",
    "ability": [
      "마이페이스",
      "둔감"
    ],
    "s_ability": [
      "날씨부정"
    ]
  },
  {
    "id": 464,
    "number": 464,
    "name": "거대코뿌리",
    "types": [
      "땅",
      "바위"
    ],
    "H": 115,
    "A": 140,
    "B": 130,
    "C": 55,
    "D": 55,
    "S": 40,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/464.png",
    "ability": [
      "피뢰침",
      "하드록"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 465,
    "number": 465,
    "name": "덩쿠림보",
    "types": [
      "풀"
    ],
    "H": 100,
    "A": 100,
    "B": 125,
    "C": 110,
    "D": 50,
    "S": 50,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/465.png",
    "ability": [
      "엽록소",
      "리프가드"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 466,
    "number": 466,
    "name": "에레키블",
    "types": [
      "전기"
    ],
    "H": 75,
    "A": 123,
    "B": 67,
    "C": 95,
    "D": 85,
    "S": 95,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/466.png",
    "ability": [
      "전기엔진"
    ],
    "s_ability": [
      "의기양양"
    ]
  },
  {
    "id": 467,
    "number": 467,
    "name": "마그마번",
    "types": [
      "불꽃"
    ],
    "H": 75,
    "A": 95,
    "B": 67,
    "C": 125,
    "D": 95,
    "S": 83,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/467.png",
    "ability": [
      "불꽃몸"
    ],
    "s_ability": [
      "의기양양"
    ]
  },
  {
    "id": 468,
    "number": 468,
    "name": "토게키스",
    "types": [
      "페어리",
      "비행"
    ],
    "H": 85,
    "A": 50,
    "B": 95,
    "C": 120,
    "D": 115,
    "S": 80,
    "total": 545,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/468.png",
    "ability": [
      "의욕",
      "하늘의은총"
    ],
    "s_ability": [
      "대운"
    ]
  },
  {
    "id": 469,
    "number": 469,
    "name": "메가자리",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 86,
    "A": 76,
    "B": 86,
    "C": 116,
    "D": 56,
    "S": 95,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/469.png",
    "ability": [
      "가속",
      "색안경"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 470,
    "number": 470,
    "name": "리피아",
    "types": [
      "풀"
    ],
    "H": 65,
    "A": 110,
    "B": 130,
    "C": 60,
    "D": 65,
    "S": 95,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/470.png",
    "ability": [
      "리프가드"
    ],
    "s_ability": [
      "엽록소"
    ]
  },
  {
    "id": 471,
    "number": 471,
    "name": "글레이시아",
    "types": [
      "얼음"
    ],
    "H": 65,
    "A": 60,
    "B": 110,
    "C": 130,
    "D": 95,
    "S": 65,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/471.png",
    "ability": [
      "눈숨기"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 472,
    "number": 472,
    "name": "글라이온",
    "types": [
      "땅",
      "비행"
    ],
    "H": 75,
    "A": 95,
    "B": 125,
    "C": 45,
    "D": 75,
    "S": 95,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/472.png",
    "ability": [
      "괴력집게",
      "모래숨기"
    ],
    "s_ability": [
      "포이즌힐"
    ]
  },
  {
    "id": 473,
    "number": 473,
    "name": "맘모꾸리",
    "types": [
      "얼음",
      "땅"
    ],
    "H": 110,
    "A": 130,
    "B": 80,
    "C": 70,
    "D": 60,
    "S": 80,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/473.png",
    "ability": [
      "둔감",
      "눈숨기"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 474,
    "number": 474,
    "name": "폴리곤Z",
    "types": [
      "노말"
    ],
    "H": 85,
    "A": 80,
    "B": 70,
    "C": 135,
    "D": 75,
    "S": 90,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/474.png",
    "ability": [
      "적응력",
      "다운로드"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 475,
    "number": 475,
    "name": "엘레이드",
    "types": [
      "에스퍼",
      "격투"
    ],
    "H": 68,
    "A": 125,
    "B": 65,
    "C": 65,
    "D": 115,
    "S": 80,
    "total": 518,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/475.png",
    "ability": [
      "불굴의마음",
      "sharpness"
    ],
    "s_ability": [
      "정의의마음"
    ]
  },
  {
    "id": 476,
    "number": 476,
    "name": "대코파스",
    "types": [
      "바위",
      "강철"
    ],
    "H": 60,
    "A": 55,
    "B": 145,
    "C": 75,
    "D": 150,
    "S": 40,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/476.png",
    "ability": [
      "옹골참",
      "자력"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 477,
    "number": 477,
    "name": "야느와르몽",
    "types": [
      "고스트"
    ],
    "H": 45,
    "A": 100,
    "B": 135,
    "C": 65,
    "D": 135,
    "S": 45,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/477.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 478,
    "number": 478,
    "name": "눈여아",
    "types": [
      "얼음",
      "고스트"
    ],
    "H": 70,
    "A": 80,
    "B": 70,
    "C": 80,
    "D": 70,
    "S": 110,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/478.png",
    "ability": [
      "눈숨기"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 479,
    "number": 479,
    "name": "로토무",
    "types": [
      "전기",
      "고스트"
    ],
    "H": 50,
    "A": 50,
    "B": 77,
    "C": 95,
    "D": 77,
    "S": 91,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/479.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 480,
    "number": 480,
    "name": "유크시",
    "types": [
      "에스퍼"
    ],
    "H": 75,
    "A": 75,
    "B": 130,
    "C": 75,
    "D": 130,
    "S": 95,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/480.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 481,
    "number": 481,
    "name": "엠라이트",
    "types": [
      "에스퍼"
    ],
    "H": 80,
    "A": 105,
    "B": 105,
    "C": 105,
    "D": 105,
    "S": 80,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/481.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 482,
    "number": 482,
    "name": "아그놈",
    "types": [
      "에스퍼"
    ],
    "H": 75,
    "A": 125,
    "B": 70,
    "C": 125,
    "D": 70,
    "S": 115,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/482.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 483,
    "number": 483,
    "name": "디아루가",
    "types": [
      "강철",
      "드래곤"
    ],
    "H": 100,
    "A": 120,
    "B": 120,
    "C": 150,
    "D": 100,
    "S": 90,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/483.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 484,
    "number": 484,
    "name": "펄기아",
    "types": [
      "물",
      "드래곤"
    ],
    "H": 90,
    "A": 120,
    "B": 100,
    "C": 150,
    "D": 120,
    "S": 100,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/484.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 485,
    "number": 485,
    "name": "히드런",
    "types": [
      "불꽃",
      "강철"
    ],
    "H": 91,
    "A": 90,
    "B": 106,
    "C": 130,
    "D": 106,
    "S": 77,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/485.png",
    "ability": [
      "타오르는불꽃"
    ],
    "s_ability": [
      "불꽃몸"
    ]
  },
  {
    "id": 486,
    "number": 486,
    "name": "레지기가스",
    "types": [
      "노말"
    ],
    "H": 110,
    "A": 160,
    "B": 110,
    "C": 80,
    "D": 110,
    "S": 100,
    "total": 670,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/486.png",
    "ability": [
      "슬로스타트"
    ],
    "s_ability": []
  },
  {
    "id": 487,
    "number": 487,
    "name": "기라티나",
    "types": [
      "고스트",
      "드래곤"
    ],
    "H": 150,
    "A": 100,
    "B": 120,
    "C": 100,
    "D": 120,
    "S": 90,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/487.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 488,
    "number": 488,
    "name": "크레세리아",
    "types": [
      "에스퍼"
    ],
    "H": 120,
    "A": 70,
    "B": 110,
    "C": 75,
    "D": 120,
    "S": 85,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/488.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 489,
    "number": 489,
    "name": "피오네",
    "types": [
      "물"
    ],
    "H": 80,
    "A": 80,
    "B": 80,
    "C": 80,
    "D": 80,
    "S": 80,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/489.png",
    "ability": [
      "촉촉바디"
    ],
    "s_ability": []
  },
  {
    "id": 490,
    "number": 490,
    "name": "마나피",
    "types": [
      "물"
    ],
    "H": 100,
    "A": 100,
    "B": 100,
    "C": 100,
    "D": 100,
    "S": 100,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/490.png",
    "ability": [
      "촉촉바디"
    ],
    "s_ability": []
  },
  {
    "id": 491,
    "number": 491,
    "name": "다크라이",
    "types": [
      "악"
    ],
    "H": 70,
    "A": 90,
    "B": 90,
    "C": 135,
    "D": 90,
    "S": 125,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/491.png",
    "ability": [
      "나이트메어"
    ],
    "s_ability": []
  },
  {
    "id": 492,
    "number": 492,
    "name": "쉐이미",
    "types": [
      "풀"
    ],
    "H": 100,
    "A": 100,
    "B": 100,
    "C": 100,
    "D": 100,
    "S": 100,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/492.png",
    "ability": [
      "자연회복"
    ],
    "s_ability": []
  },
  {
    "id": 493,
    "number": 493,
    "name": "아르세우스",
    "types": [
      "노말"
    ],
    "H": 120,
    "A": 120,
    "B": 120,
    "C": 120,
    "D": 120,
    "S": 120,
    "total": 720,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/493.png",
    "ability": [
      "멀티타입"
    ],
    "s_ability": []
  },
  {
    "id": 494,
    "number": 494,
    "name": "비크티니",
    "types": [
      "에스퍼",
      "불꽃"
    ],
    "H": 100,
    "A": 100,
    "B": 100,
    "C": 100,
    "D": 100,
    "S": 100,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/494.png",
    "ability": [
      "승리의별"
    ],
    "s_ability": []
  },
  {
    "id": 495,
    "number": 495,
    "name": "주리비얀",
    "types": [
      "풀"
    ],
    "H": 45,
    "A": 45,
    "B": 55,
    "C": 45,
    "D": 55,
    "S": 63,
    "total": 308,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "심술꾸러기"
    ]
  },
  {
    "id": 496,
    "number": 496,
    "name": "샤비",
    "types": [
      "풀"
    ],
    "H": 60,
    "A": 60,
    "B": 75,
    "C": 60,
    "D": 75,
    "S": 83,
    "total": 413,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/496.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "심술꾸러기"
    ]
  },
  {
    "id": 497,
    "number": 497,
    "name": "샤로다",
    "types": [
      "풀"
    ],
    "H": 75,
    "A": 75,
    "B": 95,
    "C": 75,
    "D": 95,
    "S": 113,
    "total": 528,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/497.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "심술꾸러기"
    ]
  },
  {
    "id": 498,
    "number": 498,
    "name": "뚜꾸리",
    "types": [
      "불꽃"
    ],
    "H": 65,
    "A": 63,
    "B": 45,
    "C": 45,
    "D": 45,
    "S": 45,
    "total": 308,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 499,
    "number": 499,
    "name": "차오꿀",
    "types": [
      "불꽃",
      "격투"
    ],
    "H": 90,
    "A": 93,
    "B": 55,
    "C": 70,
    "D": 55,
    "S": 55,
    "total": 418,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/499.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 500,
    "number": 500,
    "name": "염무왕",
    "types": [
      "불꽃",
      "격투"
    ],
    "H": 110,
    "A": 123,
    "B": 65,
    "C": 100,
    "D": 65,
    "S": 65,
    "total": 528,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/500.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 501,
    "number": 501,
    "name": "수댕이",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 55,
    "B": 45,
    "C": 63,
    "D": 45,
    "S": 45,
    "total": 308,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/501.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "조가비갑옷"
    ]
  },
  {
    "id": 502,
    "number": 502,
    "name": "쌍검자비",
    "types": [
      "물"
    ],
    "H": 75,
    "A": 75,
    "B": 60,
    "C": 83,
    "D": 60,
    "S": 60,
    "total": 413,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/502.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "조가비갑옷"
    ]
  },
  {
    "id": 503,
    "number": 503,
    "name": "대검귀",
    "types": [
      "물"
    ],
    "H": 95,
    "A": 100,
    "B": 85,
    "C": 108,
    "D": 70,
    "S": 70,
    "total": 528,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/503.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "조가비갑옷"
    ]
  },
  {
    "id": 504,
    "number": 504,
    "name": "보르쥐",
    "types": [
      "노말"
    ],
    "H": 45,
    "A": 55,
    "B": 39,
    "C": 35,
    "D": 39,
    "S": 42,
    "total": 255,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/504.png",
    "ability": [
      "도주",
      "날카로운눈"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 505,
    "number": 505,
    "name": "보르그",
    "types": [
      "노말"
    ],
    "H": 60,
    "A": 85,
    "B": 69,
    "C": 60,
    "D": 69,
    "S": 77,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/505.png",
    "ability": [
      "발광",
      "날카로운눈"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 506,
    "number": 506,
    "name": "요테리",
    "types": [
      "노말"
    ],
    "H": 45,
    "A": 60,
    "B": 45,
    "C": 25,
    "D": 45,
    "S": 55,
    "total": 275,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/506.png",
    "ability": [
      "의기양양",
      "픽업"
    ],
    "s_ability": [
      "도주"
    ]
  },
  {
    "id": 507,
    "number": 507,
    "name": "하데리어",
    "types": [
      "노말"
    ],
    "H": 65,
    "A": 80,
    "B": 65,
    "C": 35,
    "D": 65,
    "S": 60,
    "total": 370,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/507.png",
    "ability": [
      "위협",
      "모래헤치기"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 508,
    "number": 508,
    "name": "바랜드",
    "types": [
      "노말"
    ],
    "H": 85,
    "A": 110,
    "B": 90,
    "C": 45,
    "D": 90,
    "S": 80,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/508.png",
    "ability": [
      "위협",
      "모래헤치기"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 509,
    "number": 509,
    "name": "쌔비냥",
    "types": [
      "악"
    ],
    "H": 41,
    "A": 50,
    "B": 37,
    "C": 50,
    "D": 37,
    "S": 66,
    "total": 281,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/509.png",
    "ability": [
      "유연",
      "곡예"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 510,
    "number": 510,
    "name": "레파르다스",
    "types": [
      "악"
    ],
    "H": 64,
    "A": 88,
    "B": 50,
    "C": 88,
    "D": 50,
    "S": 106,
    "total": 446,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/510.png",
    "ability": [
      "유연",
      "곡예"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 511,
    "number": 511,
    "name": "야나프",
    "types": [
      "풀"
    ],
    "H": 50,
    "A": 53,
    "B": 48,
    "C": 53,
    "D": 48,
    "S": 64,
    "total": 316,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/511.png",
    "ability": [
      "먹보"
    ],
    "s_ability": [
      "심록"
    ]
  },
  {
    "id": 512,
    "number": 512,
    "name": "야나키",
    "types": [
      "풀"
    ],
    "H": 75,
    "A": 98,
    "B": 63,
    "C": 98,
    "D": 63,
    "S": 101,
    "total": 498,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/512.png",
    "ability": [
      "먹보"
    ],
    "s_ability": [
      "심록"
    ]
  },
  {
    "id": 513,
    "number": 513,
    "name": "바오프",
    "types": [
      "불꽃"
    ],
    "H": 50,
    "A": 53,
    "B": 48,
    "C": 53,
    "D": 48,
    "S": 64,
    "total": 316,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/513.png",
    "ability": [
      "먹보"
    ],
    "s_ability": [
      "맹화"
    ]
  },
  {
    "id": 514,
    "number": 514,
    "name": "바오키",
    "types": [
      "불꽃"
    ],
    "H": 75,
    "A": 98,
    "B": 63,
    "C": 98,
    "D": 63,
    "S": 101,
    "total": 498,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/514.png",
    "ability": [
      "먹보"
    ],
    "s_ability": [
      "맹화"
    ]
  },
  {
    "id": 515,
    "number": 515,
    "name": "앗차프",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 53,
    "B": 48,
    "C": 53,
    "D": 48,
    "S": 64,
    "total": 316,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/515.png",
    "ability": [
      "먹보"
    ],
    "s_ability": [
      "급류"
    ]
  },
  {
    "id": 516,
    "number": 516,
    "name": "앗차키",
    "types": [
      "물"
    ],
    "H": 75,
    "A": 98,
    "B": 63,
    "C": 98,
    "D": 63,
    "S": 101,
    "total": 498,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/516.png",
    "ability": [
      "먹보"
    ],
    "s_ability": [
      "급류"
    ]
  },
  {
    "id": 517,
    "number": 517,
    "name": "몽나",
    "types": [
      "에스퍼"
    ],
    "H": 76,
    "A": 25,
    "B": 45,
    "C": 67,
    "D": 55,
    "S": 24,
    "total": 292,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/517.png",
    "ability": [
      "예지몽",
      "싱크로"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 518,
    "number": 518,
    "name": "몽얌나",
    "types": [
      "에스퍼"
    ],
    "H": 116,
    "A": 55,
    "B": 85,
    "C": 107,
    "D": 95,
    "S": 29,
    "total": 487,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/518.png",
    "ability": [
      "예지몽",
      "싱크로"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 519,
    "number": 519,
    "name": "콩둘기",
    "types": [
      "노말",
      "비행"
    ],
    "H": 50,
    "A": 55,
    "B": 50,
    "C": 36,
    "D": 30,
    "S": 43,
    "total": 264,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/519.png",
    "ability": [
      "부풀린가슴",
      "대운"
    ],
    "s_ability": [
      "투쟁심"
    ]
  },
  {
    "id": 520,
    "number": 520,
    "name": "유토브",
    "types": [
      "노말",
      "비행"
    ],
    "H": 62,
    "A": 77,
    "B": 62,
    "C": 50,
    "D": 42,
    "S": 65,
    "total": 358,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/520.png",
    "ability": [
      "부풀린가슴",
      "대운"
    ],
    "s_ability": [
      "투쟁심"
    ]
  },
  {
    "id": 521,
    "number": 521,
    "name": "켄호로우",
    "types": [
      "노말",
      "비행"
    ],
    "H": 80,
    "A": 115,
    "B": 80,
    "C": 65,
    "D": 55,
    "S": 93,
    "total": 488,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/521.png",
    "ability": [
      "부풀린가슴",
      "대운"
    ],
    "s_ability": [
      "투쟁심"
    ]
  },
  {
    "id": 522,
    "number": 522,
    "name": "줄뮤마",
    "types": [
      "전기"
    ],
    "H": 45,
    "A": 60,
    "B": 32,
    "C": 50,
    "D": 32,
    "S": 76,
    "total": 295,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/522.png",
    "ability": [
      "피뢰침",
      "전기엔진"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 523,
    "number": 523,
    "name": "제브라이카",
    "types": [
      "전기"
    ],
    "H": 75,
    "A": 100,
    "B": 63,
    "C": 80,
    "D": 63,
    "S": 116,
    "total": 497,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/523.png",
    "ability": [
      "피뢰침",
      "전기엔진"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 524,
    "number": 524,
    "name": "단굴",
    "types": [
      "바위"
    ],
    "H": 55,
    "A": 75,
    "B": 85,
    "C": 25,
    "D": 25,
    "S": 15,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/524.png",
    "ability": [
      "옹골참",
      "깨어진갑옷"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 525,
    "number": 525,
    "name": "암트르",
    "types": [
      "바위"
    ],
    "H": 70,
    "A": 105,
    "B": 105,
    "C": 50,
    "D": 40,
    "S": 20,
    "total": 390,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/525.png",
    "ability": [
      "옹골참",
      "깨어진갑옷"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 526,
    "number": 526,
    "name": "기가이어스",
    "types": [
      "바위"
    ],
    "H": 85,
    "A": 135,
    "B": 130,
    "C": 60,
    "D": 80,
    "S": 25,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/526.png",
    "ability": [
      "옹골참",
      "모래날림"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 527,
    "number": 527,
    "name": "또르박쥐",
    "types": [
      "에스퍼",
      "비행"
    ],
    "H": 65,
    "A": 45,
    "B": 43,
    "C": 55,
    "D": 43,
    "S": 72,
    "total": 323,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/527.png",
    "ability": [
      "천진",
      "서투름"
    ],
    "s_ability": [
      "단순"
    ]
  },
  {
    "id": 528,
    "number": 528,
    "name": "맘박쥐",
    "types": [
      "에스퍼",
      "비행"
    ],
    "H": 67,
    "A": 57,
    "B": 55,
    "C": 77,
    "D": 55,
    "S": 114,
    "total": 425,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/528.png",
    "ability": [
      "천진",
      "서투름"
    ],
    "s_ability": [
      "단순"
    ]
  },
  {
    "id": 529,
    "number": 529,
    "name": "두더류",
    "types": [
      "땅"
    ],
    "H": 60,
    "A": 85,
    "B": 40,
    "C": 30,
    "D": 45,
    "S": 68,
    "total": 328,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/529.png",
    "ability": [
      "모래헤치기",
      "모래의힘"
    ],
    "s_ability": [
      "틀깨기"
    ]
  },
  {
    "id": 530,
    "number": 530,
    "name": "몰드류",
    "types": [
      "땅",
      "강철"
    ],
    "H": 110,
    "A": 135,
    "B": 60,
    "C": 50,
    "D": 65,
    "S": 88,
    "total": 508,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/530.png",
    "ability": [
      "모래헤치기",
      "모래의힘"
    ],
    "s_ability": [
      "틀깨기"
    ]
  },
  {
    "id": 531,
    "number": 531,
    "name": "다부니",
    "types": [
      "노말"
    ],
    "H": 103,
    "A": 60,
    "B": 86,
    "C": 60,
    "D": 86,
    "S": 50,
    "total": 445,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/531.png",
    "ability": [
      "치유의마음",
      "재생력"
    ],
    "s_ability": [
      "서투름"
    ]
  },
  {
    "id": 532,
    "number": 532,
    "name": "으랏차",
    "types": [
      "격투"
    ],
    "H": 75,
    "A": 80,
    "B": 55,
    "C": 25,
    "D": 35,
    "S": 35,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/532.png",
    "ability": [
      "근성",
      "우격다짐"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 533,
    "number": 533,
    "name": "토쇠골",
    "types": [
      "격투"
    ],
    "H": 85,
    "A": 105,
    "B": 85,
    "C": 40,
    "D": 50,
    "S": 40,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/533.png",
    "ability": [
      "근성",
      "우격다짐"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 534,
    "number": 534,
    "name": "노보청",
    "types": [
      "격투"
    ],
    "H": 105,
    "A": 140,
    "B": 95,
    "C": 55,
    "D": 65,
    "S": 45,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/534.png",
    "ability": [
      "근성",
      "우격다짐"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 535,
    "number": 535,
    "name": "동챙이",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 50,
    "B": 40,
    "C": 50,
    "D": 40,
    "S": 64,
    "total": 294,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/535.png",
    "ability": [
      "쓱쓱",
      "촉촉바디"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 536,
    "number": 536,
    "name": "두까비",
    "types": [
      "물",
      "땅"
    ],
    "H": 75,
    "A": 65,
    "B": 55,
    "C": 65,
    "D": 55,
    "S": 69,
    "total": 384,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/536.png",
    "ability": [
      "쓱쓱",
      "촉촉바디"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 537,
    "number": 537,
    "name": "두빅굴",
    "types": [
      "물",
      "땅"
    ],
    "H": 105,
    "A": 95,
    "B": 75,
    "C": 85,
    "D": 75,
    "S": 74,
    "total": 509,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/537.png",
    "ability": [
      "쓱쓱",
      "독수"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 538,
    "number": 538,
    "name": "던지미",
    "types": [
      "격투"
    ],
    "H": 120,
    "A": 100,
    "B": 85,
    "C": 30,
    "D": 85,
    "S": 45,
    "total": 465,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/538.png",
    "ability": [
      "근성",
      "정신력"
    ],
    "s_ability": [
      "틀깨기"
    ]
  },
  {
    "id": 539,
    "number": 539,
    "name": "타격귀",
    "types": [
      "격투"
    ],
    "H": 75,
    "A": 125,
    "B": 75,
    "C": 30,
    "D": 75,
    "S": 85,
    "total": 465,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/539.png",
    "ability": [
      "옹골참",
      "정신력"
    ],
    "s_ability": [
      "틀깨기"
    ]
  },
  {
    "id": 540,
    "number": 540,
    "name": "두르보",
    "types": [
      "벌레",
      "풀"
    ],
    "H": 45,
    "A": 53,
    "B": 70,
    "C": 40,
    "D": 60,
    "S": 42,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/540.png",
    "ability": [
      "벌레의알림",
      "엽록소"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 541,
    "number": 541,
    "name": "두르쿤",
    "types": [
      "벌레",
      "풀"
    ],
    "H": 55,
    "A": 63,
    "B": 90,
    "C": 50,
    "D": 80,
    "S": 42,
    "total": 380,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/541.png",
    "ability": [
      "리프가드",
      "엽록소"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 542,
    "number": 542,
    "name": "모아머",
    "types": [
      "벌레",
      "풀"
    ],
    "H": 75,
    "A": 103,
    "B": 80,
    "C": 70,
    "D": 80,
    "S": 92,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/542.png",
    "ability": [
      "벌레의알림",
      "엽록소"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 543,
    "number": 543,
    "name": "마디네",
    "types": [
      "벌레",
      "독"
    ],
    "H": 30,
    "A": 45,
    "B": 59,
    "C": 30,
    "D": 39,
    "S": 57,
    "total": 260,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/543.png",
    "ability": [
      "독가시",
      "벌레의알림"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 544,
    "number": 544,
    "name": "휠구",
    "types": [
      "벌레",
      "독"
    ],
    "H": 40,
    "A": 55,
    "B": 99,
    "C": 40,
    "D": 79,
    "S": 47,
    "total": 360,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/544.png",
    "ability": [
      "독가시",
      "벌레의알림"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 545,
    "number": 545,
    "name": "펜드라",
    "types": [
      "벌레",
      "독"
    ],
    "H": 60,
    "A": 100,
    "B": 89,
    "C": 55,
    "D": 69,
    "S": 112,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/545.png",
    "ability": [
      "독가시",
      "벌레의알림"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 546,
    "number": 546,
    "name": "소미안",
    "types": [
      "풀",
      "페어리"
    ],
    "H": 40,
    "A": 27,
    "B": 60,
    "C": 37,
    "D": 50,
    "S": 66,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/546.png",
    "ability": [
      "짓궂은마음",
      "틈새포착"
    ],
    "s_ability": [
      "엽록소"
    ]
  },
  {
    "id": 547,
    "number": 547,
    "name": "엘풍",
    "types": [
      "풀",
      "페어리"
    ],
    "H": 60,
    "A": 67,
    "B": 85,
    "C": 77,
    "D": 75,
    "S": 116,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/547.png",
    "ability": [
      "짓궂은마음",
      "틈새포착"
    ],
    "s_ability": [
      "엽록소"
    ]
  },
  {
    "id": 548,
    "number": 548,
    "name": "치릴리",
    "types": [
      "풀"
    ],
    "H": 45,
    "A": 35,
    "B": 50,
    "C": 70,
    "D": 50,
    "S": 30,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/548.png",
    "ability": [
      "엽록소",
      "마이페이스"
    ],
    "s_ability": [
      "리프가드"
    ]
  },
  {
    "id": 549,
    "number": 549,
    "name": "드레디어",
    "types": [
      "풀"
    ],
    "H": 70,
    "A": 60,
    "B": 75,
    "C": 110,
    "D": 75,
    "S": 90,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/549.png",
    "ability": [
      "엽록소",
      "마이페이스"
    ],
    "s_ability": [
      "리프가드"
    ]
  },
  {
    "id": 550,
    "number": 550,
    "name": "배쓰나이",
    "types": [
      "물"
    ],
    "H": 70,
    "A": 92,
    "B": 65,
    "C": 80,
    "D": 55,
    "S": 98,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/550.png",
    "ability": [
      "이판사판",
      "적응력"
    ],
    "s_ability": [
      "틀깨기"
    ]
  },
  {
    "id": 551,
    "number": 551,
    "name": "깜눈크",
    "types": [
      "땅",
      "악"
    ],
    "H": 50,
    "A": 72,
    "B": 35,
    "C": 35,
    "D": 35,
    "S": 65,
    "total": 292,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/551.png",
    "ability": [
      "위협",
      "자기과신"
    ],
    "s_ability": [
      "분노의경혈"
    ]
  },
  {
    "id": 552,
    "number": 552,
    "name": "악비르",
    "types": [
      "땅",
      "악"
    ],
    "H": 60,
    "A": 82,
    "B": 45,
    "C": 45,
    "D": 45,
    "S": 74,
    "total": 351,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/552.png",
    "ability": [
      "위협",
      "자기과신"
    ],
    "s_ability": [
      "분노의경혈"
    ]
  },
  {
    "id": 553,
    "number": 553,
    "name": "악비아르",
    "types": [
      "땅",
      "악"
    ],
    "H": 95,
    "A": 117,
    "B": 80,
    "C": 65,
    "D": 70,
    "S": 92,
    "total": 519,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/553.png",
    "ability": [
      "위협",
      "자기과신"
    ],
    "s_ability": [
      "분노의경혈"
    ]
  },
  {
    "id": 554,
    "number": 554,
    "name": "달막화",
    "types": [
      "불꽃"
    ],
    "H": 70,
    "A": 90,
    "B": 45,
    "C": 15,
    "D": 45,
    "S": 50,
    "total": 315,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/554.png",
    "ability": [
      "의욕"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 555,
    "number": 555,
    "name": "불비달마",
    "types": [
      "불꽃"
    ],
    "H": 105,
    "A": 140,
    "B": 55,
    "C": 30,
    "D": 55,
    "S": 95,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/555.png",
    "ability": [
      "우격다짐"
    ],
    "s_ability": [
      "달마모드"
    ]
  },
  {
    "id": 556,
    "number": 556,
    "name": "마라카치",
    "types": [
      "풀"
    ],
    "H": 75,
    "A": 86,
    "B": 67,
    "C": 106,
    "D": 67,
    "S": 60,
    "total": 461,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/556.png",
    "ability": [
      "저수",
      "엽록소"
    ],
    "s_ability": [
      "마중물"
    ]
  },
  {
    "id": 557,
    "number": 557,
    "name": "돌살이",
    "types": [
      "벌레",
      "바위"
    ],
    "H": 50,
    "A": 65,
    "B": 85,
    "C": 35,
    "D": 35,
    "S": 55,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/557.png",
    "ability": [
      "옹골참",
      "조가비갑옷"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 558,
    "number": 558,
    "name": "암팰리스",
    "types": [
      "벌레",
      "바위"
    ],
    "H": 70,
    "A": 105,
    "B": 125,
    "C": 65,
    "D": 75,
    "S": 45,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/558.png",
    "ability": [
      "옹골참",
      "조가비갑옷"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 559,
    "number": 559,
    "name": "곤율랭",
    "types": [
      "악",
      "격투"
    ],
    "H": 50,
    "A": 75,
    "B": 70,
    "C": 35,
    "D": 70,
    "S": 48,
    "total": 348,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/559.png",
    "ability": [
      "탈피",
      "자기과신"
    ],
    "s_ability": [
      "위협"
    ]
  },
  {
    "id": 560,
    "number": 560,
    "name": "곤율거니",
    "types": [
      "악",
      "격투"
    ],
    "H": 65,
    "A": 90,
    "B": 115,
    "C": 45,
    "D": 115,
    "S": 58,
    "total": 488,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/560.png",
    "ability": [
      "탈피",
      "자기과신"
    ],
    "s_ability": [
      "위협"
    ]
  },
  {
    "id": 561,
    "number": 561,
    "name": "심보러",
    "types": [
      "에스퍼",
      "비행"
    ],
    "H": 72,
    "A": 58,
    "B": 80,
    "C": 103,
    "D": 80,
    "S": 97,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/561.png",
    "ability": [
      "미라클스킨",
      "매직가드"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 562,
    "number": 562,
    "name": "데스마스",
    "types": [
      "고스트"
    ],
    "H": 38,
    "A": 30,
    "B": 85,
    "C": 55,
    "D": 65,
    "S": 30,
    "total": 303,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/562.png",
    "ability": [
      "미라"
    ],
    "s_ability": []
  },
  {
    "id": 563,
    "number": 563,
    "name": "데스니칸",
    "types": [
      "고스트"
    ],
    "H": 58,
    "A": 50,
    "B": 145,
    "C": 95,
    "D": 105,
    "S": 30,
    "total": 483,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/563.png",
    "ability": [
      "미라"
    ],
    "s_ability": []
  },
  {
    "id": 564,
    "number": 564,
    "name": "프로토가",
    "types": [
      "물",
      "바위"
    ],
    "H": 54,
    "A": 78,
    "B": 103,
    "C": 53,
    "D": 45,
    "S": 22,
    "total": 355,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/564.png",
    "ability": [
      "하드록",
      "옹골참"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 565,
    "number": 565,
    "name": "늑골라",
    "types": [
      "물",
      "바위"
    ],
    "H": 74,
    "A": 108,
    "B": 133,
    "C": 83,
    "D": 65,
    "S": 32,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/565.png",
    "ability": [
      "하드록",
      "옹골참"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 566,
    "number": 566,
    "name": "아켄",
    "types": [
      "바위",
      "비행"
    ],
    "H": 55,
    "A": 112,
    "B": 45,
    "C": 74,
    "D": 45,
    "S": 70,
    "total": 401,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/566.png",
    "ability": [
      "무기력"
    ],
    "s_ability": []
  },
  {
    "id": 567,
    "number": 567,
    "name": "아케오스",
    "types": [
      "바위",
      "비행"
    ],
    "H": 75,
    "A": 140,
    "B": 65,
    "C": 112,
    "D": 65,
    "S": 110,
    "total": 567,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/567.png",
    "ability": [
      "무기력"
    ],
    "s_ability": []
  },
  {
    "id": 568,
    "number": 568,
    "name": "깨봉이",
    "types": [
      "독"
    ],
    "H": 50,
    "A": 50,
    "B": 62,
    "C": 40,
    "D": 62,
    "S": 65,
    "total": 329,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/568.png",
    "ability": [
      "악취",
      "점착"
    ],
    "s_ability": [
      "유폭"
    ]
  },
  {
    "id": 569,
    "number": 569,
    "name": "더스트나",
    "types": [
      "독"
    ],
    "H": 80,
    "A": 95,
    "B": 82,
    "C": 60,
    "D": 82,
    "S": 75,
    "total": 474,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/569.png",
    "ability": [
      "악취",
      "깨어진갑옷"
    ],
    "s_ability": [
      "유폭"
    ]
  },
  {
    "id": 570,
    "number": 570,
    "name": "조로아",
    "types": [
      "악"
    ],
    "H": 40,
    "A": 65,
    "B": 40,
    "C": 80,
    "D": 40,
    "S": 65,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/570.png",
    "ability": [
      "일루전"
    ],
    "s_ability": []
  },
  {
    "id": 571,
    "number": 571,
    "name": "조로아크",
    "types": [
      "악"
    ],
    "H": 60,
    "A": 105,
    "B": 60,
    "C": 120,
    "D": 60,
    "S": 105,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/571.png",
    "ability": [
      "일루전"
    ],
    "s_ability": []
  },
  {
    "id": 572,
    "number": 572,
    "name": "치라미",
    "types": [
      "노말"
    ],
    "H": 55,
    "A": 50,
    "B": 40,
    "C": 40,
    "D": 40,
    "S": 75,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/572.png",
    "ability": [
      "헤롱헤롱바디",
      "테크니션"
    ],
    "s_ability": [
      "스킬링크"
    ]
  },
  {
    "id": 573,
    "number": 573,
    "name": "치라치노",
    "types": [
      "노말"
    ],
    "H": 75,
    "A": 95,
    "B": 60,
    "C": 65,
    "D": 60,
    "S": 115,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/573.png",
    "ability": [
      "헤롱헤롱바디",
      "테크니션"
    ],
    "s_ability": [
      "스킬링크"
    ]
  },
  {
    "id": 574,
    "number": 574,
    "name": "고디탱",
    "types": [
      "에스퍼"
    ],
    "H": 45,
    "A": 30,
    "B": 50,
    "C": 55,
    "D": 65,
    "S": 45,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/574.png",
    "ability": [
      "통찰",
      "승기"
    ],
    "s_ability": [
      "그림자밟기"
    ]
  },
  {
    "id": 575,
    "number": 575,
    "name": "고디보미",
    "types": [
      "에스퍼"
    ],
    "H": 60,
    "A": 45,
    "B": 70,
    "C": 75,
    "D": 85,
    "S": 55,
    "total": 390,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/575.png",
    "ability": [
      "통찰",
      "승기"
    ],
    "s_ability": [
      "그림자밟기"
    ]
  },
  {
    "id": 576,
    "number": 576,
    "name": "고디모아젤",
    "types": [
      "에스퍼"
    ],
    "H": 70,
    "A": 55,
    "B": 95,
    "C": 95,
    "D": 110,
    "S": 65,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/576.png",
    "ability": [
      "통찰",
      "승기"
    ],
    "s_ability": [
      "그림자밟기"
    ]
  },
  {
    "id": 577,
    "number": 577,
    "name": "유니란",
    "types": [
      "에스퍼"
    ],
    "H": 45,
    "A": 30,
    "B": 40,
    "C": 105,
    "D": 50,
    "S": 20,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/577.png",
    "ability": [
      "방진",
      "매직가드"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 578,
    "number": 578,
    "name": "듀란",
    "types": [
      "에스퍼"
    ],
    "H": 65,
    "A": 40,
    "B": 50,
    "C": 125,
    "D": 60,
    "S": 30,
    "total": 370,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/578.png",
    "ability": [
      "방진",
      "매직가드"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 579,
    "number": 579,
    "name": "란쿨루스",
    "types": [
      "에스퍼"
    ],
    "H": 110,
    "A": 65,
    "B": 75,
    "C": 125,
    "D": 85,
    "S": 30,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/579.png",
    "ability": [
      "방진",
      "매직가드"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 580,
    "number": 580,
    "name": "꼬지보리",
    "types": [
      "물",
      "비행"
    ],
    "H": 62,
    "A": 44,
    "B": 50,
    "C": 44,
    "D": 50,
    "S": 55,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/580.png",
    "ability": [
      "날카로운눈",
      "부풀린가슴"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 581,
    "number": 581,
    "name": "스완나",
    "types": [
      "물",
      "비행"
    ],
    "H": 75,
    "A": 87,
    "B": 63,
    "C": 87,
    "D": 63,
    "S": 98,
    "total": 473,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/581.png",
    "ability": [
      "날카로운눈",
      "부풀린가슴"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 582,
    "number": 582,
    "name": "바닐프티",
    "types": [
      "얼음"
    ],
    "H": 36,
    "A": 50,
    "B": 50,
    "C": 65,
    "D": 60,
    "S": 44,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/582.png",
    "ability": [
      "아이스바디",
      "눈숨기"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 583,
    "number": 583,
    "name": "바닐리치",
    "types": [
      "얼음"
    ],
    "H": 51,
    "A": 65,
    "B": 65,
    "C": 80,
    "D": 75,
    "S": 59,
    "total": 395,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/583.png",
    "ability": [
      "아이스바디",
      "눈숨기"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 584,
    "number": 584,
    "name": "배바닐라",
    "types": [
      "얼음"
    ],
    "H": 71,
    "A": 95,
    "B": 85,
    "C": 110,
    "D": 95,
    "S": 79,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/584.png",
    "ability": [
      "아이스바디",
      "눈퍼뜨리기"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 585,
    "number": 585,
    "name": "사철록",
    "types": [
      "노말",
      "풀"
    ],
    "H": 60,
    "A": 60,
    "B": 50,
    "C": 40,
    "D": 50,
    "S": 75,
    "total": 335,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/585.png",
    "ability": [
      "엽록소",
      "초식"
    ],
    "s_ability": [
      "하늘의은총"
    ]
  },
  {
    "id": 586,
    "number": 586,
    "name": "바라철록",
    "types": [
      "노말",
      "풀"
    ],
    "H": 80,
    "A": 100,
    "B": 70,
    "C": 60,
    "D": 70,
    "S": 95,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/586.png",
    "ability": [
      "엽록소",
      "초식"
    ],
    "s_ability": [
      "하늘의은총"
    ]
  },
  {
    "id": 587,
    "number": 587,
    "name": "에몽가",
    "types": [
      "전기",
      "비행"
    ],
    "H": 55,
    "A": 75,
    "B": 60,
    "C": 75,
    "D": 60,
    "S": 103,
    "total": 428,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/587.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "전기엔진"
    ]
  },
  {
    "id": 588,
    "number": 588,
    "name": "딱정곤",
    "types": [
      "벌레"
    ],
    "H": 50,
    "A": 75,
    "B": 45,
    "C": 40,
    "D": 45,
    "S": 60,
    "total": 315,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/588.png",
    "ability": [
      "벌레의알림",
      "탈피"
    ],
    "s_ability": [
      "노가드"
    ]
  },
  {
    "id": 589,
    "number": 589,
    "name": "슈바르고",
    "types": [
      "벌레",
      "강철"
    ],
    "H": 70,
    "A": 135,
    "B": 105,
    "C": 60,
    "D": 105,
    "S": 20,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/589.png",
    "ability": [
      "벌레의알림",
      "조가비갑옷"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 590,
    "number": 590,
    "name": "깜놀버슬",
    "types": [
      "풀",
      "독"
    ],
    "H": 69,
    "A": 55,
    "B": 45,
    "C": 55,
    "D": 55,
    "S": 15,
    "total": 294,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/590.png",
    "ability": [
      "포자"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 591,
    "number": 591,
    "name": "뽀록나",
    "types": [
      "풀",
      "독"
    ],
    "H": 114,
    "A": 85,
    "B": 70,
    "C": 85,
    "D": 80,
    "S": 30,
    "total": 464,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/591.png",
    "ability": [
      "포자"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 592,
    "number": 592,
    "name": "탱그릴",
    "types": [
      "물",
      "고스트"
    ],
    "H": 55,
    "A": 40,
    "B": 50,
    "C": 65,
    "D": 85,
    "S": 40,
    "total": 335,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/592.png",
    "ability": [
      "저수",
      "저주받은바디"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 593,
    "number": 593,
    "name": "탱탱겔",
    "types": [
      "물",
      "고스트"
    ],
    "H": 100,
    "A": 60,
    "B": 70,
    "C": 85,
    "D": 105,
    "S": 60,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/593.png",
    "ability": [
      "저수",
      "저주받은바디"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 594,
    "number": 594,
    "name": "맘복치",
    "types": [
      "물"
    ],
    "H": 165,
    "A": 75,
    "B": 80,
    "C": 40,
    "D": 45,
    "S": 65,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/594.png",
    "ability": [
      "치유의마음",
      "촉촉바디"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 595,
    "number": 595,
    "name": "파쪼옥",
    "types": [
      "벌레",
      "전기"
    ],
    "H": 50,
    "A": 47,
    "B": 50,
    "C": 57,
    "D": 50,
    "S": 65,
    "total": 319,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/595.png",
    "ability": [
      "복안",
      "긴장감"
    ],
    "s_ability": [
      "벌레의알림"
    ]
  },
  {
    "id": 596,
    "number": 596,
    "name": "전툴라",
    "types": [
      "벌레",
      "전기"
    ],
    "H": 70,
    "A": 77,
    "B": 60,
    "C": 97,
    "D": 60,
    "S": 108,
    "total": 472,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/596.png",
    "ability": [
      "복안",
      "긴장감"
    ],
    "s_ability": [
      "벌레의알림"
    ]
  },
  {
    "id": 597,
    "number": 597,
    "name": "철시드",
    "types": [
      "풀",
      "강철"
    ],
    "H": 44,
    "A": 50,
    "B": 91,
    "C": 24,
    "D": 86,
    "S": 10,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/597.png",
    "ability": [
      "철가시"
    ],
    "s_ability": []
  },
  {
    "id": 598,
    "number": 598,
    "name": "너트령",
    "types": [
      "풀",
      "강철"
    ],
    "H": 74,
    "A": 94,
    "B": 131,
    "C": 54,
    "D": 116,
    "S": 20,
    "total": 489,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/598.png",
    "ability": [
      "철가시"
    ],
    "s_ability": [
      "위험예지"
    ]
  },
  {
    "id": 599,
    "number": 599,
    "name": "기어르",
    "types": [
      "강철"
    ],
    "H": 40,
    "A": 55,
    "B": 70,
    "C": 45,
    "D": 60,
    "S": 30,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/599.png",
    "ability": [
      "플러스",
      "마이너스"
    ],
    "s_ability": [
      "클리어바디"
    ]
  },
  {
    "id": 600,
    "number": 600,
    "name": "기기어르",
    "types": [
      "강철"
    ],
    "H": 60,
    "A": 80,
    "B": 95,
    "C": 70,
    "D": 85,
    "S": 50,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/600.png",
    "ability": [
      "플러스",
      "마이너스"
    ],
    "s_ability": [
      "클리어바디"
    ]
  },
  {
    "id": 601,
    "number": 601,
    "name": "기기기어르",
    "types": [
      "강철"
    ],
    "H": 60,
    "A": 100,
    "B": 115,
    "C": 70,
    "D": 85,
    "S": 90,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/601.png",
    "ability": [
      "플러스",
      "마이너스"
    ],
    "s_ability": [
      "클리어바디"
    ]
  },
  {
    "id": 602,
    "number": 602,
    "name": "저리어",
    "types": [
      "전기"
    ],
    "H": 35,
    "A": 55,
    "B": 40,
    "C": 45,
    "D": 40,
    "S": 60,
    "total": 275,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/602.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 603,
    "number": 603,
    "name": "저리릴",
    "types": [
      "전기"
    ],
    "H": 65,
    "A": 85,
    "B": 70,
    "C": 75,
    "D": 70,
    "S": 40,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/603.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 604,
    "number": 604,
    "name": "저리더프",
    "types": [
      "전기"
    ],
    "H": 85,
    "A": 115,
    "B": 80,
    "C": 105,
    "D": 80,
    "S": 50,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/604.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 605,
    "number": 605,
    "name": "리그레",
    "types": [
      "에스퍼"
    ],
    "H": 55,
    "A": 55,
    "B": 55,
    "C": 85,
    "D": 55,
    "S": 30,
    "total": 335,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/605.png",
    "ability": [
      "텔레파시",
      "싱크로"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 606,
    "number": 606,
    "name": "벰크",
    "types": [
      "에스퍼"
    ],
    "H": 75,
    "A": 75,
    "B": 75,
    "C": 125,
    "D": 95,
    "S": 40,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/606.png",
    "ability": [
      "텔레파시",
      "싱크로"
    ],
    "s_ability": [
      "애널라이즈"
    ]
  },
  {
    "id": 607,
    "number": 607,
    "name": "불켜미",
    "types": [
      "고스트",
      "불꽃"
    ],
    "H": 50,
    "A": 30,
    "B": 55,
    "C": 65,
    "D": 55,
    "S": 20,
    "total": 275,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/607.png",
    "ability": [
      "타오르는불꽃",
      "불꽃몸"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 608,
    "number": 608,
    "name": "램프라",
    "types": [
      "고스트",
      "불꽃"
    ],
    "H": 60,
    "A": 40,
    "B": 60,
    "C": 95,
    "D": 60,
    "S": 55,
    "total": 370,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/608.png",
    "ability": [
      "타오르는불꽃",
      "불꽃몸"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 609,
    "number": 609,
    "name": "샹델라",
    "types": [
      "고스트",
      "불꽃"
    ],
    "H": 60,
    "A": 55,
    "B": 90,
    "C": 145,
    "D": 90,
    "S": 80,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/609.png",
    "ability": [
      "타오르는불꽃",
      "불꽃몸"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 610,
    "number": 610,
    "name": "터검니",
    "types": [
      "드래곤"
    ],
    "H": 46,
    "A": 87,
    "B": 60,
    "C": 30,
    "D": 40,
    "S": 57,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/610.png",
    "ability": [
      "투쟁심",
      "틀깨기"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 611,
    "number": 611,
    "name": "액슨도",
    "types": [
      "드래곤"
    ],
    "H": 66,
    "A": 117,
    "B": 70,
    "C": 40,
    "D": 50,
    "S": 67,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/611.png",
    "ability": [
      "투쟁심",
      "틀깨기"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 612,
    "number": 612,
    "name": "액스라이즈",
    "types": [
      "드래곤"
    ],
    "H": 76,
    "A": 147,
    "B": 90,
    "C": 60,
    "D": 70,
    "S": 97,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/612.png",
    "ability": [
      "투쟁심",
      "틀깨기"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 613,
    "number": 613,
    "name": "코고미",
    "types": [
      "얼음"
    ],
    "H": 55,
    "A": 70,
    "B": 40,
    "C": 60,
    "D": 40,
    "S": 40,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/613.png",
    "ability": [
      "눈숨기",
      "눈치우기"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 614,
    "number": 614,
    "name": "툰베어",
    "types": [
      "얼음"
    ],
    "H": 95,
    "A": 130,
    "B": 80,
    "C": 70,
    "D": 80,
    "S": 50,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/614.png",
    "ability": [
      "눈숨기",
      "눈치우기"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 615,
    "number": 615,
    "name": "프리지오",
    "types": [
      "얼음"
    ],
    "H": 80,
    "A": 50,
    "B": 50,
    "C": 95,
    "D": 135,
    "S": 105,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/615.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 616,
    "number": 616,
    "name": "쪼마리",
    "types": [
      "벌레"
    ],
    "H": 50,
    "A": 40,
    "B": 85,
    "C": 40,
    "D": 65,
    "S": 25,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/616.png",
    "ability": [
      "촉촉바디",
      "조가비갑옷"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 617,
    "number": 617,
    "name": "어지리더",
    "types": [
      "벌레"
    ],
    "H": 80,
    "A": 70,
    "B": 40,
    "C": 100,
    "D": 60,
    "S": 145,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/617.png",
    "ability": [
      "촉촉바디",
      "점착"
    ],
    "s_ability": [
      "곡예"
    ]
  },
  {
    "id": 618,
    "number": 618,
    "name": "메더",
    "types": [
      "땅",
      "전기"
    ],
    "H": 109,
    "A": 66,
    "B": 84,
    "C": 81,
    "D": 99,
    "S": 32,
    "total": 471,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/618.png",
    "ability": [
      "정전기",
      "유연"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 619,
    "number": 619,
    "name": "비조푸",
    "types": [
      "격투"
    ],
    "H": 45,
    "A": 85,
    "B": 50,
    "C": 55,
    "D": 50,
    "S": 65,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/619.png",
    "ability": [
      "정신력",
      "재생력"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 620,
    "number": 620,
    "name": "비조도",
    "types": [
      "격투"
    ],
    "H": 65,
    "A": 125,
    "B": 60,
    "C": 95,
    "D": 60,
    "S": 105,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/620.png",
    "ability": [
      "정신력",
      "재생력"
    ],
    "s_ability": [
      "이판사판"
    ]
  },
  {
    "id": 621,
    "number": 621,
    "name": "크리만",
    "types": [
      "드래곤"
    ],
    "H": 77,
    "A": 120,
    "B": 90,
    "C": 60,
    "D": 90,
    "S": 48,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/621.png",
    "ability": [
      "까칠한피부",
      "우격다짐"
    ],
    "s_ability": [
      "틀깨기"
    ]
  },
  {
    "id": 622,
    "number": 622,
    "name": "골비람",
    "types": [
      "땅",
      "고스트"
    ],
    "H": 59,
    "A": 74,
    "B": 50,
    "C": 35,
    "D": 50,
    "S": 35,
    "total": 303,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/622.png",
    "ability": [
      "철주먹",
      "서투름"
    ],
    "s_ability": [
      "노가드"
    ]
  },
  {
    "id": 623,
    "number": 623,
    "name": "골루그",
    "types": [
      "땅",
      "고스트"
    ],
    "H": 89,
    "A": 124,
    "B": 80,
    "C": 55,
    "D": 80,
    "S": 55,
    "total": 483,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/623.png",
    "ability": [
      "철주먹",
      "서투름"
    ],
    "s_ability": [
      "노가드"
    ]
  },
  {
    "id": 624,
    "number": 624,
    "name": "자망칼",
    "types": [
      "악",
      "강철"
    ],
    "H": 45,
    "A": 85,
    "B": 70,
    "C": 40,
    "D": 40,
    "S": 60,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/624.png",
    "ability": [
      "오기",
      "정신력"
    ],
    "s_ability": [
      "프레셔"
    ]
  },
  {
    "id": 625,
    "number": 625,
    "name": "절각참",
    "types": [
      "악",
      "강철"
    ],
    "H": 65,
    "A": 125,
    "B": 100,
    "C": 60,
    "D": 70,
    "S": 70,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/625.png",
    "ability": [
      "오기",
      "정신력"
    ],
    "s_ability": [
      "프레셔"
    ]
  },
  {
    "id": 626,
    "number": 626,
    "name": "버프론",
    "types": [
      "노말"
    ],
    "H": 95,
    "A": 110,
    "B": 95,
    "C": 40,
    "D": 95,
    "S": 55,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/626.png",
    "ability": [
      "이판사판",
      "초식"
    ],
    "s_ability": [
      "방음"
    ]
  },
  {
    "id": 627,
    "number": 627,
    "name": "수리둥보",
    "types": [
      "노말",
      "비행"
    ],
    "H": 70,
    "A": 83,
    "B": 50,
    "C": 37,
    "D": 50,
    "S": 60,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/627.png",
    "ability": [
      "날카로운눈",
      "우격다짐"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 628,
    "number": 628,
    "name": "워글",
    "types": [
      "노말",
      "비행"
    ],
    "H": 100,
    "A": 123,
    "B": 75,
    "C": 57,
    "D": 75,
    "S": 80,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/628.png",
    "ability": [
      "날카로운눈",
      "우격다짐"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 629,
    "number": 629,
    "name": "벌차이",
    "types": [
      "악",
      "비행"
    ],
    "H": 70,
    "A": 55,
    "B": 75,
    "C": 45,
    "D": 65,
    "S": 60,
    "total": 370,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/629.png",
    "ability": [
      "부풀린가슴",
      "방진"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 630,
    "number": 630,
    "name": "버랜지나",
    "types": [
      "악",
      "비행"
    ],
    "H": 110,
    "A": 65,
    "B": 105,
    "C": 55,
    "D": 95,
    "S": 80,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/630.png",
    "ability": [
      "부풀린가슴",
      "방진"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 631,
    "number": 631,
    "name": "앤티골",
    "types": [
      "불꽃"
    ],
    "H": 85,
    "A": 97,
    "B": 66,
    "C": 105,
    "D": 66,
    "S": 65,
    "total": 484,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/631.png",
    "ability": [
      "먹보",
      "타오르는불꽃"
    ],
    "s_ability": [
      "하얀연기"
    ]
  },
  {
    "id": 632,
    "number": 632,
    "name": "아이앤트",
    "types": [
      "벌레",
      "강철"
    ],
    "H": 58,
    "A": 109,
    "B": 112,
    "C": 48,
    "D": 48,
    "S": 109,
    "total": 484,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/632.png",
    "ability": [
      "벌레의알림",
      "의욕"
    ],
    "s_ability": [
      "게으름"
    ]
  },
  {
    "id": 633,
    "number": 633,
    "name": "모노두",
    "types": [
      "악",
      "드래곤"
    ],
    "H": 52,
    "A": 65,
    "B": 50,
    "C": 45,
    "D": 50,
    "S": 38,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/633.png",
    "ability": [
      "의욕"
    ],
    "s_ability": []
  },
  {
    "id": 634,
    "number": 634,
    "name": "디헤드",
    "types": [
      "악",
      "드래곤"
    ],
    "H": 72,
    "A": 85,
    "B": 70,
    "C": 65,
    "D": 70,
    "S": 58,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/634.png",
    "ability": [
      "의욕"
    ],
    "s_ability": []
  },
  {
    "id": 635,
    "number": 635,
    "name": "삼삼드래",
    "types": [
      "악",
      "드래곤"
    ],
    "H": 92,
    "A": 105,
    "B": 90,
    "C": 125,
    "D": 90,
    "S": 98,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/635.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 636,
    "number": 636,
    "name": "활화르바",
    "types": [
      "벌레",
      "불꽃"
    ],
    "H": 55,
    "A": 85,
    "B": 55,
    "C": 50,
    "D": 55,
    "S": 60,
    "total": 360,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/636.png",
    "ability": [
      "불꽃몸"
    ],
    "s_ability": [
      "벌레의알림"
    ]
  },
  {
    "id": 637,
    "number": 637,
    "name": "불카모스",
    "types": [
      "벌레",
      "불꽃"
    ],
    "H": 85,
    "A": 60,
    "B": 65,
    "C": 135,
    "D": 105,
    "S": 100,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/637.png",
    "ability": [
      "불꽃몸"
    ],
    "s_ability": [
      "벌레의알림"
    ]
  },
  {
    "id": 638,
    "number": 638,
    "name": "코바르온",
    "types": [
      "강철",
      "격투"
    ],
    "H": 91,
    "A": 90,
    "B": 129,
    "C": 90,
    "D": 72,
    "S": 108,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/638.png",
    "ability": [
      "정의의마음"
    ],
    "s_ability": []
  },
  {
    "id": 639,
    "number": 639,
    "name": "테라키온",
    "types": [
      "바위",
      "격투"
    ],
    "H": 91,
    "A": 129,
    "B": 90,
    "C": 72,
    "D": 90,
    "S": 108,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/639.png",
    "ability": [
      "정의의마음"
    ],
    "s_ability": []
  },
  {
    "id": 640,
    "number": 640,
    "name": "비리디온",
    "types": [
      "풀",
      "격투"
    ],
    "H": 91,
    "A": 90,
    "B": 72,
    "C": 90,
    "D": 129,
    "S": 108,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/640.png",
    "ability": [
      "정의의마음"
    ],
    "s_ability": []
  },
  {
    "id": 641,
    "number": 641,
    "name": "토네로스",
    "types": [
      "비행"
    ],
    "H": 79,
    "A": 115,
    "B": 70,
    "C": 125,
    "D": 80,
    "S": 111,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/641.png",
    "ability": [
      "짓궂은마음"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 642,
    "number": 642,
    "name": "볼트로스",
    "types": [
      "전기",
      "비행"
    ],
    "H": 79,
    "A": 115,
    "B": 70,
    "C": 125,
    "D": 80,
    "S": 111,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/642.png",
    "ability": [
      "짓궂은마음"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 643,
    "number": 643,
    "name": "레시라무",
    "types": [
      "드래곤",
      "불꽃"
    ],
    "H": 100,
    "A": 120,
    "B": 100,
    "C": 150,
    "D": 120,
    "S": 90,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/643.png",
    "ability": [
      "터보블레이즈"
    ],
    "s_ability": []
  },
  {
    "id": 644,
    "number": 644,
    "name": "제크로무",
    "types": [
      "드래곤",
      "전기"
    ],
    "H": 100,
    "A": 150,
    "B": 120,
    "C": 120,
    "D": 100,
    "S": 90,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/644.png",
    "ability": [
      "테라볼티지"
    ],
    "s_ability": []
  },
  {
    "id": 645,
    "number": 645,
    "name": "랜드로스",
    "types": [
      "땅",
      "비행"
    ],
    "H": 89,
    "A": 125,
    "B": 90,
    "C": 115,
    "D": 80,
    "S": 101,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/645.png",
    "ability": [
      "모래의힘"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 646,
    "number": 646,
    "name": "큐레무",
    "types": [
      "드래곤",
      "얼음"
    ],
    "H": 125,
    "A": 130,
    "B": 90,
    "C": 130,
    "D": 90,
    "S": 95,
    "total": 660,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/646.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": []
  },
  {
    "id": 647,
    "number": 647,
    "name": "케르디오",
    "types": [
      "물",
      "격투"
    ],
    "H": 91,
    "A": 72,
    "B": 90,
    "C": 129,
    "D": 90,
    "S": 108,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/647.png",
    "ability": [
      "정의의마음"
    ],
    "s_ability": []
  },
  {
    "id": 648,
    "number": 648,
    "name": "메로엣타 보이스폼",
    "types": [
      "노말",
      "에스퍼"
    ],
    "H": 100,
    "A": 77,
    "B": 77,
    "C": 128,
    "D": 128,
    "S": 90,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/648.png",
    "ability": [
      "하늘의은총"
    ],
    "s_ability": []
  },
  {
    "id": 649,
    "number": 649,
    "name": "게노세크트",
    "types": [
      "벌레",
      "강철"
    ],
    "H": 71,
    "A": 120,
    "B": 95,
    "C": 120,
    "D": 95,
    "S": 99,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/649.png",
    "ability": [
      "다운로드"
    ],
    "s_ability": []
  },
  {
    "id": 650,
    "number": 650,
    "name": "도치마론",
    "types": [
      "풀"
    ],
    "H": 56,
    "A": 61,
    "B": 65,
    "C": 48,
    "D": 45,
    "S": 38,
    "total": 313,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/650.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "방탄"
    ]
  },
  {
    "id": 651,
    "number": 651,
    "name": "도치보구",
    "types": [
      "풀"
    ],
    "H": 61,
    "A": 78,
    "B": 95,
    "C": 56,
    "D": 58,
    "S": 57,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/651.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "방탄"
    ]
  },
  {
    "id": 652,
    "number": 652,
    "name": "브리가론",
    "types": [
      "풀",
      "격투"
    ],
    "H": 88,
    "A": 107,
    "B": 122,
    "C": 74,
    "D": 75,
    "S": 64,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/652.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "방탄"
    ]
  },
  {
    "id": 653,
    "number": 653,
    "name": "푸호꼬",
    "types": [
      "불꽃"
    ],
    "H": 40,
    "A": 45,
    "B": 40,
    "C": 62,
    "D": 60,
    "S": 60,
    "total": 307,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/653.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "매지션"
    ]
  },
  {
    "id": 654,
    "number": 654,
    "name": "테르나",
    "types": [
      "불꽃"
    ],
    "H": 59,
    "A": 59,
    "B": 58,
    "C": 90,
    "D": 70,
    "S": 73,
    "total": 409,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/654.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "매지션"
    ]
  },
  {
    "id": 655,
    "number": 655,
    "name": "마폭시",
    "types": [
      "불꽃",
      "에스퍼"
    ],
    "H": 75,
    "A": 69,
    "B": 72,
    "C": 114,
    "D": 100,
    "S": 104,
    "total": 534,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/655.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "매지션"
    ]
  },
  {
    "id": 656,
    "number": 656,
    "name": "개구마르",
    "types": [
      "물"
    ],
    "H": 41,
    "A": 56,
    "B": 40,
    "C": 62,
    "D": 44,
    "S": 71,
    "total": 314,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/656.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "변환자재"
    ]
  },
  {
    "id": 657,
    "number": 657,
    "name": "개굴반장",
    "types": [
      "물"
    ],
    "H": 54,
    "A": 63,
    "B": 52,
    "C": 83,
    "D": 56,
    "S": 97,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/657.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "변환자재"
    ]
  },
  {
    "id": 658,
    "number": 658,
    "name": "개굴닌자",
    "types": [
      "물",
      "악"
    ],
    "H": 72,
    "A": 95,
    "B": 67,
    "C": 103,
    "D": 71,
    "S": 122,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/658.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "변환자재"
    ]
  },
  {
    "id": 659,
    "number": 659,
    "name": "파르빗",
    "types": [
      "노말"
    ],
    "H": 38,
    "A": 36,
    "B": 38,
    "C": 32,
    "D": 36,
    "S": 57,
    "total": 237,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/659.png",
    "ability": [
      "픽업",
      "볼주머니"
    ],
    "s_ability": [
      "천하장사"
    ]
  },
  {
    "id": 660,
    "number": 660,
    "name": "파르토",
    "types": [
      "노말",
      "땅"
    ],
    "H": 85,
    "A": 56,
    "B": 77,
    "C": 50,
    "D": 77,
    "S": 78,
    "total": 423,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/660.png",
    "ability": [
      "픽업",
      "볼주머니"
    ],
    "s_ability": [
      "천하장사"
    ]
  },
  {
    "id": 661,
    "number": 661,
    "name": "화살꼬빈",
    "types": [
      "노말",
      "비행"
    ],
    "H": 45,
    "A": 50,
    "B": 43,
    "C": 40,
    "D": 38,
    "S": 62,
    "total": 278,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/661.png",
    "ability": [
      "부풀린가슴"
    ],
    "s_ability": [
      "질풍날개"
    ]
  },
  {
    "id": 662,
    "number": 662,
    "name": "불화살빈",
    "types": [
      "불꽃",
      "비행"
    ],
    "H": 62,
    "A": 73,
    "B": 55,
    "C": 56,
    "D": 52,
    "S": 84,
    "total": 382,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/662.png",
    "ability": [
      "불꽃몸"
    ],
    "s_ability": [
      "질풍날개"
    ]
  },
  {
    "id": 663,
    "number": 663,
    "name": "파이어로",
    "types": [
      "불꽃",
      "비행"
    ],
    "H": 78,
    "A": 81,
    "B": 71,
    "C": 74,
    "D": 69,
    "S": 126,
    "total": 499,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/663.png",
    "ability": [
      "불꽃몸"
    ],
    "s_ability": [
      "질풍날개"
    ]
  },
  {
    "id": 664,
    "number": 664,
    "name": "분이벌레",
    "types": [
      "벌레"
    ],
    "H": 38,
    "A": 35,
    "B": 40,
    "C": 27,
    "D": 25,
    "S": 35,
    "total": 200,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/664.png",
    "ability": [
      "인분",
      "복안"
    ],
    "s_ability": [
      "프렌드가드"
    ]
  },
  {
    "id": 665,
    "number": 665,
    "name": "분떠도리",
    "types": [
      "벌레"
    ],
    "H": 45,
    "A": 22,
    "B": 60,
    "C": 27,
    "D": 30,
    "S": 29,
    "total": 213,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/665.png",
    "ability": [
      "탈피"
    ],
    "s_ability": [
      "프렌드가드"
    ]
  },
  {
    "id": 666,
    "number": 666,
    "name": "비비용",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 80,
    "A": 52,
    "B": 50,
    "C": 90,
    "D": 50,
    "S": 89,
    "total": 411,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/666.png",
    "ability": [
      "인분",
      "복안"
    ],
    "s_ability": [
      "프렌드가드"
    ]
  },
  {
    "id": 667,
    "number": 667,
    "name": "레오꼬",
    "types": [
      "불꽃",
      "노말"
    ],
    "H": 62,
    "A": 50,
    "B": 58,
    "C": 73,
    "D": 54,
    "S": 72,
    "total": 369,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/667.png",
    "ability": [
      "투쟁심",
      "긴장감"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 668,
    "number": 668,
    "name": "화염레오",
    "types": [
      "불꽃",
      "노말"
    ],
    "H": 86,
    "A": 68,
    "B": 72,
    "C": 109,
    "D": 66,
    "S": 106,
    "total": 507,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/668.png",
    "ability": [
      "투쟁심",
      "긴장감"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 669,
    "number": 669,
    "name": "플라베베",
    "types": [
      "페어리"
    ],
    "H": 44,
    "A": 38,
    "B": 39,
    "C": 61,
    "D": 79,
    "S": 42,
    "total": 303,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/669.png",
    "ability": [
      "플라워베일"
    ],
    "s_ability": [
      "공생"
    ]
  },
  {
    "id": 670,
    "number": 670,
    "name": "플라엣테",
    "types": [
      "페어리"
    ],
    "H": 54,
    "A": 45,
    "B": 47,
    "C": 75,
    "D": 98,
    "S": 52,
    "total": 371,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/670.png",
    "ability": [
      "플라워베일"
    ],
    "s_ability": [
      "공생"
    ]
  },
  {
    "id": 671,
    "number": 671,
    "name": "플라제스",
    "types": [
      "페어리"
    ],
    "H": 78,
    "A": 65,
    "B": 68,
    "C": 112,
    "D": 154,
    "S": 75,
    "total": 552,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/671.png",
    "ability": [
      "플라워베일"
    ],
    "s_ability": [
      "공생"
    ]
  },
  {
    "id": 672,
    "number": 672,
    "name": "메이클",
    "types": [
      "풀"
    ],
    "H": 66,
    "A": 65,
    "B": 48,
    "C": 62,
    "D": 57,
    "S": 52,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/672.png",
    "ability": [
      "초식"
    ],
    "s_ability": [
      "풀모피"
    ]
  },
  {
    "id": 673,
    "number": 673,
    "name": "고고트",
    "types": [
      "풀"
    ],
    "H": 123,
    "A": 100,
    "B": 62,
    "C": 97,
    "D": 81,
    "S": 68,
    "total": 531,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/673.png",
    "ability": [
      "초식"
    ],
    "s_ability": [
      "풀모피"
    ]
  },
  {
    "id": 674,
    "number": 674,
    "name": "판짱",
    "types": [
      "격투"
    ],
    "H": 67,
    "A": 82,
    "B": 62,
    "C": 46,
    "D": 48,
    "S": 43,
    "total": 348,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/674.png",
    "ability": [
      "철주먹",
      "틀깨기"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 675,
    "number": 675,
    "name": "부란다",
    "types": [
      "격투",
      "악"
    ],
    "H": 95,
    "A": 124,
    "B": 78,
    "C": 69,
    "D": 71,
    "S": 58,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/675.png",
    "ability": [
      "철주먹",
      "틀깨기"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 676,
    "number": 676,
    "name": "트리미앙",
    "types": [
      "노말"
    ],
    "H": 75,
    "A": 80,
    "B": 60,
    "C": 65,
    "D": 90,
    "S": 102,
    "total": 472,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/676.png",
    "ability": [
      "퍼코트"
    ],
    "s_ability": []
  },
  {
    "id": 677,
    "number": 677,
    "name": "냐스퍼",
    "types": [
      "에스퍼"
    ],
    "H": 62,
    "A": 48,
    "B": 54,
    "C": 63,
    "D": 60,
    "S": 68,
    "total": 355,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/677.png",
    "ability": [
      "날카로운눈",
      "틈새포착"
    ],
    "s_ability": [
      "마이페이스"
    ]
  },
  {
    "id": 678,
    "number": 678,
    "name": "냐오닉스",
    "types": [
      "에스퍼"
    ],
    "H": 74,
    "A": 48,
    "B": 76,
    "C": 83,
    "D": 81,
    "S": 104,
    "total": 466,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/678.png",
    "ability": [
      "날카로운눈",
      "틈새포착"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 679,
    "number": 679,
    "name": "단칼빙",
    "types": [
      "강철",
      "고스트"
    ],
    "H": 45,
    "A": 80,
    "B": 100,
    "C": 35,
    "D": 37,
    "S": 28,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/679.png",
    "ability": [
      "노가드"
    ],
    "s_ability": []
  },
  {
    "id": 680,
    "number": 680,
    "name": "쌍검킬",
    "types": [
      "강철",
      "고스트"
    ],
    "H": 59,
    "A": 110,
    "B": 150,
    "C": 45,
    "D": 49,
    "S": 35,
    "total": 448,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/680.png",
    "ability": [
      "노가드"
    ],
    "s_ability": []
  },
  {
    "id": 681,
    "number": 681,
    "name": "킬가르도",
    "types": [
      "강철",
      "고스트"
    ],
    "H": 60,
    "A": 50,
    "B": 140,
    "C": 50,
    "D": 140,
    "S": 60,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/681.png",
    "ability": [
      "배틀스위치"
    ],
    "s_ability": []
  },
  {
    "id": 682,
    "number": 682,
    "name": "슈쁘",
    "types": [
      "페어리"
    ],
    "H": 78,
    "A": 52,
    "B": 60,
    "C": 63,
    "D": 65,
    "S": 23,
    "total": 341,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/682.png",
    "ability": [
      "치유의마음"
    ],
    "s_ability": [
      "아로마베일"
    ]
  },
  {
    "id": 683,
    "number": 683,
    "name": "프레프티르",
    "types": [
      "페어리"
    ],
    "H": 101,
    "A": 72,
    "B": 72,
    "C": 99,
    "D": 89,
    "S": 29,
    "total": 462,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/683.png",
    "ability": [
      "치유의마음"
    ],
    "s_ability": [
      "아로마베일"
    ]
  },
  {
    "id": 684,
    "number": 684,
    "name": "나룸퍼프",
    "types": [
      "페어리"
    ],
    "H": 62,
    "A": 48,
    "B": 66,
    "C": 59,
    "D": 57,
    "S": 49,
    "total": 341,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/684.png",
    "ability": [
      "스위트베일"
    ],
    "s_ability": [
      "곡예"
    ]
  },
  {
    "id": 685,
    "number": 685,
    "name": "나루림",
    "types": [
      "페어리"
    ],
    "H": 82,
    "A": 80,
    "B": 86,
    "C": 85,
    "D": 75,
    "S": 72,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/685.png",
    "ability": [
      "스위트베일"
    ],
    "s_ability": [
      "곡예"
    ]
  },
  {
    "id": 686,
    "number": 686,
    "name": "오케이징",
    "types": [
      "악",
      "에스퍼"
    ],
    "H": 53,
    "A": 54,
    "B": 53,
    "C": 37,
    "D": 46,
    "S": 45,
    "total": 288,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/686.png",
    "ability": [
      "심술꾸러기",
      "흡반"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 687,
    "number": 687,
    "name": "칼라마네로",
    "types": [
      "악",
      "에스퍼"
    ],
    "H": 86,
    "A": 92,
    "B": 88,
    "C": 68,
    "D": 75,
    "S": 73,
    "total": 482,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/687.png",
    "ability": [
      "심술꾸러기",
      "흡반"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 688,
    "number": 688,
    "name": "거북손손",
    "types": [
      "바위",
      "물"
    ],
    "H": 42,
    "A": 52,
    "B": 67,
    "C": 39,
    "D": 56,
    "S": 50,
    "total": 306,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/688.png",
    "ability": [
      "단단한발톱",
      "스나이퍼"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 689,
    "number": 689,
    "name": "거북손데스",
    "types": [
      "바위",
      "물"
    ],
    "H": 72,
    "A": 105,
    "B": 115,
    "C": 54,
    "D": 86,
    "S": 68,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/689.png",
    "ability": [
      "단단한발톱",
      "스나이퍼"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 690,
    "number": 690,
    "name": "수레기",
    "types": [
      "독",
      "물"
    ],
    "H": 50,
    "A": 60,
    "B": 60,
    "C": 60,
    "D": 60,
    "S": 30,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/690.png",
    "ability": [
      "독가시",
      "독수"
    ],
    "s_ability": [
      "적응력"
    ]
  },
  {
    "id": 691,
    "number": 691,
    "name": "드래캄",
    "types": [
      "독",
      "드래곤"
    ],
    "H": 65,
    "A": 75,
    "B": 90,
    "C": 97,
    "D": 123,
    "S": 44,
    "total": 494,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/691.png",
    "ability": [
      "독가시",
      "독수"
    ],
    "s_ability": [
      "적응력"
    ]
  },
  {
    "id": 692,
    "number": 692,
    "name": "완철포",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 53,
    "B": 62,
    "C": 58,
    "D": 63,
    "S": 44,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/692.png",
    "ability": [
      "메가런처"
    ],
    "s_ability": []
  },
  {
    "id": 693,
    "number": 693,
    "name": "블로스터",
    "types": [
      "물"
    ],
    "H": 71,
    "A": 73,
    "B": 88,
    "C": 120,
    "D": 89,
    "S": 59,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/693.png",
    "ability": [
      "메가런처"
    ],
    "s_ability": []
  },
  {
    "id": 694,
    "number": 694,
    "name": "목도리키텔",
    "types": [
      "전기",
      "노말"
    ],
    "H": 44,
    "A": 38,
    "B": 33,
    "C": 61,
    "D": 43,
    "S": 70,
    "total": 289,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/694.png",
    "ability": [
      "건조피부",
      "모래숨기"
    ],
    "s_ability": [
      "선파워"
    ]
  },
  {
    "id": 695,
    "number": 695,
    "name": "일레도리자드",
    "types": [
      "전기",
      "노말"
    ],
    "H": 62,
    "A": 55,
    "B": 52,
    "C": 109,
    "D": 94,
    "S": 109,
    "total": 481,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/695.png",
    "ability": [
      "건조피부",
      "모래숨기"
    ],
    "s_ability": [
      "선파워"
    ]
  },
  {
    "id": 696,
    "number": 696,
    "name": "티고라스",
    "types": [
      "바위",
      "드래곤"
    ],
    "H": 58,
    "A": 89,
    "B": 77,
    "C": 45,
    "D": 45,
    "S": 48,
    "total": 362,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/696.png",
    "ability": [
      "옹골찬턱"
    ],
    "s_ability": [
      "옹골참"
    ]
  },
  {
    "id": 697,
    "number": 697,
    "name": "견고라스",
    "types": [
      "바위",
      "드래곤"
    ],
    "H": 82,
    "A": 121,
    "B": 119,
    "C": 69,
    "D": 59,
    "S": 71,
    "total": 521,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/697.png",
    "ability": [
      "옹골찬턱"
    ],
    "s_ability": [
      "돌머리"
    ]
  },
  {
    "id": 698,
    "number": 698,
    "name": "아마루스",
    "types": [
      "바위",
      "얼음"
    ],
    "H": 77,
    "A": 59,
    "B": 50,
    "C": 67,
    "D": 63,
    "S": 46,
    "total": 362,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/698.png",
    "ability": [
      "프리즈스킨"
    ],
    "s_ability": [
      "눈퍼뜨리기"
    ]
  },
  {
    "id": 699,
    "number": 699,
    "name": "아마루르가",
    "types": [
      "바위",
      "얼음"
    ],
    "H": 123,
    "A": 77,
    "B": 72,
    "C": 99,
    "D": 92,
    "S": 58,
    "total": 521,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/699.png",
    "ability": [
      "프리즈스킨"
    ],
    "s_ability": [
      "눈퍼뜨리기"
    ]
  },
  {
    "id": 700,
    "number": 700,
    "name": "님피아",
    "types": [
      "페어리"
    ],
    "H": 95,
    "A": 65,
    "B": 65,
    "C": 110,
    "D": 130,
    "S": 60,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/700.png",
    "ability": [
      "헤롱헤롱바디"
    ],
    "s_ability": [
      "페어리스킨"
    ]
  },
  {
    "id": 701,
    "number": 701,
    "name": "루차불",
    "types": [
      "격투",
      "비행"
    ],
    "H": 78,
    "A": 92,
    "B": 75,
    "C": 74,
    "D": 63,
    "S": 118,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/701.png",
    "ability": [
      "유연",
      "곡예"
    ],
    "s_ability": [
      "틀깨기"
    ]
  },
  {
    "id": 702,
    "number": 702,
    "name": "데덴네",
    "types": [
      "전기",
      "페어리"
    ],
    "H": 67,
    "A": 58,
    "B": 57,
    "C": 81,
    "D": 67,
    "S": 101,
    "total": 431,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/702.png",
    "ability": [
      "볼주머니",
      "픽업"
    ],
    "s_ability": [
      "플러스"
    ]
  },
  {
    "id": 703,
    "number": 703,
    "name": "멜리시",
    "types": [
      "바위",
      "페어리"
    ],
    "H": 50,
    "A": 50,
    "B": 150,
    "C": 50,
    "D": 150,
    "S": 50,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/703.png",
    "ability": [
      "클리어바디"
    ],
    "s_ability": [
      "옹골참"
    ]
  },
  {
    "id": 704,
    "number": 704,
    "name": "미끄메라",
    "types": [
      "드래곤"
    ],
    "H": 45,
    "A": 50,
    "B": 35,
    "C": 55,
    "D": 75,
    "S": 40,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/704.png",
    "ability": [
      "초식",
      "촉촉바디"
    ],
    "s_ability": [
      "미끈미끈"
    ]
  },
  {
    "id": 705,
    "number": 705,
    "name": "미끄네일",
    "types": [
      "드래곤"
    ],
    "H": 68,
    "A": 75,
    "B": 53,
    "C": 83,
    "D": 113,
    "S": 60,
    "total": 452,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/705.png",
    "ability": [
      "초식",
      "촉촉바디"
    ],
    "s_ability": [
      "미끈미끈"
    ]
  },
  {
    "id": 706,
    "number": 706,
    "name": "미끄래곤",
    "types": [
      "드래곤"
    ],
    "H": 90,
    "A": 100,
    "B": 70,
    "C": 110,
    "D": 150,
    "S": 80,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/706.png",
    "ability": [
      "초식",
      "촉촉바디"
    ],
    "s_ability": [
      "미끈미끈"
    ]
  },
  {
    "id": 707,
    "number": 707,
    "name": "클레피",
    "types": [
      "강철",
      "페어리"
    ],
    "H": 57,
    "A": 80,
    "B": 91,
    "C": 80,
    "D": 87,
    "S": 75,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/707.png",
    "ability": [
      "짓궂은마음"
    ],
    "s_ability": [
      "매지션"
    ]
  },
  {
    "id": 708,
    "number": 708,
    "name": "나목령",
    "types": [
      "고스트",
      "풀"
    ],
    "H": 43,
    "A": 70,
    "B": 48,
    "C": 50,
    "D": 60,
    "S": 38,
    "total": 309,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/708.png",
    "ability": [
      "자연회복",
      "통찰"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 709,
    "number": 709,
    "name": "대로트",
    "types": [
      "고스트",
      "풀"
    ],
    "H": 85,
    "A": 110,
    "B": 76,
    "C": 65,
    "D": 82,
    "S": 56,
    "total": 474,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/709.png",
    "ability": [
      "자연회복",
      "통찰"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 710,
    "number": 710,
    "name": "호바귀",
    "types": [
      "고스트",
      "풀"
    ],
    "H": 49,
    "A": 66,
    "B": 70,
    "C": 44,
    "D": 55,
    "S": 51,
    "total": 335,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/710.png",
    "ability": [
      "픽업",
      "통찰"
    ],
    "s_ability": [
      "불면"
    ]
  },
  {
    "id": 711,
    "number": 711,
    "name": "펌킨인",
    "types": [
      "고스트",
      "풀"
    ],
    "H": 65,
    "A": 90,
    "B": 122,
    "C": 58,
    "D": 75,
    "S": 84,
    "total": 494,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/711.png",
    "ability": [
      "픽업",
      "통찰"
    ],
    "s_ability": [
      "불면"
    ]
  },
  {
    "id": 712,
    "number": 712,
    "name": "꽁어름",
    "types": [
      "얼음"
    ],
    "H": 55,
    "A": 69,
    "B": 85,
    "C": 32,
    "D": 35,
    "S": 28,
    "total": 304,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/712.png",
    "ability": [
      "마이페이스",
      "아이스바디"
    ],
    "s_ability": [
      "옹골참"
    ]
  },
  {
    "id": 713,
    "number": 713,
    "name": "크레베이스",
    "types": [
      "얼음"
    ],
    "H": 95,
    "A": 117,
    "B": 184,
    "C": 44,
    "D": 46,
    "S": 28,
    "total": 514,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/713.png",
    "ability": [
      "마이페이스",
      "아이스바디"
    ],
    "s_ability": [
      "옹골참"
    ]
  },
  {
    "id": 714,
    "number": 714,
    "name": "음뱃",
    "types": [
      "비행",
      "드래곤"
    ],
    "H": 40,
    "A": 30,
    "B": 35,
    "C": 45,
    "D": 40,
    "S": 55,
    "total": 245,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/714.png",
    "ability": [
      "통찰",
      "틈새포착"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 715,
    "number": 715,
    "name": "음번",
    "types": [
      "비행",
      "드래곤"
    ],
    "H": 85,
    "A": 70,
    "B": 80,
    "C": 97,
    "D": 80,
    "S": 123,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/715.png",
    "ability": [
      "통찰",
      "틈새포착"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 716,
    "number": 716,
    "name": "제르네아스",
    "types": [
      "페어리"
    ],
    "H": 126,
    "A": 131,
    "B": 95,
    "C": 131,
    "D": 98,
    "S": 99,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/716.png",
    "ability": [
      "페어리오라"
    ],
    "s_ability": []
  },
  {
    "id": 717,
    "number": 717,
    "name": "이벨타르",
    "types": [
      "악",
      "비행"
    ],
    "H": 126,
    "A": 131,
    "B": 95,
    "C": 131,
    "D": 98,
    "S": 99,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/717.png",
    "ability": [
      "다크오라"
    ],
    "s_ability": []
  },
  {
    "id": 718,
    "number": 718,
    "name": "지가르데",
    "types": [
      "드래곤",
      "땅"
    ],
    "H": 108,
    "A": 100,
    "B": 121,
    "C": 81,
    "D": 95,
    "S": 95,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/718.png",
    "ability": [
      "오라브레이크"
    ],
    "s_ability": []
  },
  {
    "id": 719,
    "number": 719,
    "name": "디안시",
    "types": [
      "바위",
      "페어리"
    ],
    "H": 50,
    "A": 100,
    "B": 150,
    "C": 100,
    "D": 150,
    "S": 50,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/719.png",
    "ability": [
      "클리어바디"
    ],
    "s_ability": []
  },
  {
    "id": 720,
    "number": 720,
    "name": "후파",
    "types": [
      "에스퍼",
      "고스트"
    ],
    "H": 80,
    "A": 110,
    "B": 60,
    "C": 150,
    "D": 130,
    "S": 70,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/720.png",
    "ability": [
      "매지션"
    ],
    "s_ability": []
  },
  {
    "id": 721,
    "number": 721,
    "name": "볼케니온",
    "types": [
      "불꽃",
      "물"
    ],
    "H": 80,
    "A": 110,
    "B": 120,
    "C": 130,
    "D": 90,
    "S": 70,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/721.png",
    "ability": [
      "저수"
    ],
    "s_ability": []
  },
  {
    "id": 722,
    "number": 722,
    "name": "나몰빼미",
    "types": [
      "풀",
      "비행"
    ],
    "H": 68,
    "A": 55,
    "B": 55,
    "C": 50,
    "D": 50,
    "S": 42,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/722.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "원격"
    ]
  },
  {
    "id": 723,
    "number": 723,
    "name": "빼미스로우",
    "types": [
      "풀",
      "비행"
    ],
    "H": 78,
    "A": 75,
    "B": 75,
    "C": 70,
    "D": 70,
    "S": 52,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/723.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "원격"
    ]
  },
  {
    "id": 724,
    "number": 724,
    "name": "모크나이퍼",
    "types": [
      "풀",
      "고스트"
    ],
    "H": 78,
    "A": 107,
    "B": 75,
    "C": 100,
    "D": 100,
    "S": 70,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/724.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "원격"
    ]
  },
  {
    "id": 725,
    "number": 725,
    "name": "냐오불",
    "types": [
      "불꽃"
    ],
    "H": 45,
    "A": 65,
    "B": 40,
    "C": 60,
    "D": 40,
    "S": 70,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/725.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "위협"
    ]
  },
  {
    "id": 726,
    "number": 726,
    "name": "냐오히트",
    "types": [
      "불꽃"
    ],
    "H": 65,
    "A": 85,
    "B": 50,
    "C": 80,
    "D": 50,
    "S": 90,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/726.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "위협"
    ]
  },
  {
    "id": 727,
    "number": 727,
    "name": "어흥염",
    "types": [
      "불꽃",
      "악"
    ],
    "H": 95,
    "A": 115,
    "B": 90,
    "C": 80,
    "D": 90,
    "S": 60,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/727.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "위협"
    ]
  },
  {
    "id": 728,
    "number": 728,
    "name": "누리공",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 54,
    "B": 54,
    "C": 66,
    "D": 56,
    "S": 40,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/728.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "촉촉보이스"
    ]
  },
  {
    "id": 729,
    "number": 729,
    "name": "키요공",
    "types": [
      "물"
    ],
    "H": 60,
    "A": 69,
    "B": 69,
    "C": 91,
    "D": 81,
    "S": 50,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/729.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "촉촉보이스"
    ]
  },
  {
    "id": 730,
    "number": 730,
    "name": "누리레느",
    "types": [
      "물",
      "페어리"
    ],
    "H": 80,
    "A": 74,
    "B": 74,
    "C": 126,
    "D": 116,
    "S": 60,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/730.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "촉촉보이스"
    ]
  },
  {
    "id": 731,
    "number": 731,
    "name": "콕코구리",
    "types": [
      "노말",
      "비행"
    ],
    "H": 35,
    "A": 75,
    "B": 30,
    "C": 30,
    "D": 30,
    "S": 65,
    "total": 265,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/731.png",
    "ability": [
      "날카로운눈",
      "스킬링크"
    ],
    "s_ability": [
      "픽업"
    ]
  },
  {
    "id": 732,
    "number": 732,
    "name": "크라파",
    "types": [
      "노말",
      "비행"
    ],
    "H": 55,
    "A": 85,
    "B": 50,
    "C": 40,
    "D": 50,
    "S": 75,
    "total": 355,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/732.png",
    "ability": [
      "날카로운눈",
      "스킬링크"
    ],
    "s_ability": [
      "픽업"
    ]
  },
  {
    "id": 733,
    "number": 733,
    "name": "왕큰부리",
    "types": [
      "노말",
      "비행"
    ],
    "H": 80,
    "A": 120,
    "B": 75,
    "C": 75,
    "D": 75,
    "S": 60,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/733.png",
    "ability": [
      "날카로운눈",
      "스킬링크"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 734,
    "number": 734,
    "name": "영구스",
    "types": [
      "노말"
    ],
    "H": 48,
    "A": 70,
    "B": 30,
    "C": 30,
    "D": 30,
    "S": 45,
    "total": 253,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/734.png",
    "ability": [
      "잠복",
      "옹골찬턱"
    ],
    "s_ability": [
      "적응력"
    ]
  },
  {
    "id": 735,
    "number": 735,
    "name": "형사구스",
    "types": [
      "노말"
    ],
    "H": 88,
    "A": 110,
    "B": 60,
    "C": 55,
    "D": 60,
    "S": 45,
    "total": 418,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/735.png",
    "ability": [
      "잠복",
      "옹골찬턱"
    ],
    "s_ability": [
      "적응력"
    ]
  },
  {
    "id": 736,
    "number": 736,
    "name": "턱지충이",
    "types": [
      "벌레"
    ],
    "H": 47,
    "A": 62,
    "B": 45,
    "C": 55,
    "D": 45,
    "S": 46,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/736.png",
    "ability": [
      "벌레의알림"
    ],
    "s_ability": []
  },
  {
    "id": 737,
    "number": 737,
    "name": "전지충이",
    "types": [
      "벌레",
      "전기"
    ],
    "H": 57,
    "A": 82,
    "B": 95,
    "C": 55,
    "D": 75,
    "S": 36,
    "total": 400,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/737.png",
    "ability": [
      "배터리"
    ],
    "s_ability": []
  },
  {
    "id": 738,
    "number": 738,
    "name": "투구뿌논",
    "types": [
      "벌레",
      "전기"
    ],
    "H": 77,
    "A": 70,
    "B": 90,
    "C": 145,
    "D": 75,
    "S": 43,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/738.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 739,
    "number": 739,
    "name": "오기지게",
    "types": [
      "격투"
    ],
    "H": 47,
    "A": 82,
    "B": 57,
    "C": 42,
    "D": 47,
    "S": 63,
    "total": 338,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/739.png",
    "ability": [
      "괴력집게",
      "철주먹"
    ],
    "s_ability": [
      "분노의경혈"
    ]
  },
  {
    "id": 740,
    "number": 740,
    "name": "모단단게",
    "types": [
      "격투",
      "얼음"
    ],
    "H": 97,
    "A": 132,
    "B": 77,
    "C": 62,
    "D": 67,
    "S": 43,
    "total": 478,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/740.png",
    "ability": [
      "괴력집게",
      "철주먹"
    ],
    "s_ability": [
      "분노의경혈"
    ]
  },
  {
    "id": 741,
    "number": 741,
    "name": "춤추새",
    "types": [
      "불꽃",
      "비행"
    ],
    "H": 75,
    "A": 70,
    "B": 70,
    "C": 98,
    "D": 70,
    "S": 93,
    "total": 476,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/741.png",
    "ability": [
      "무희"
    ],
    "s_ability": []
  },
  {
    "id": 742,
    "number": 742,
    "name": "에블리",
    "types": [
      "벌레",
      "페어리"
    ],
    "H": 40,
    "A": 45,
    "B": 40,
    "C": 55,
    "D": 40,
    "S": 84,
    "total": 304,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/742.png",
    "ability": [
      "꿀모으기",
      "인분"
    ],
    "s_ability": [
      "스위트베일"
    ]
  },
  {
    "id": 743,
    "number": 743,
    "name": "에리본",
    "types": [
      "벌레",
      "페어리"
    ],
    "H": 60,
    "A": 55,
    "B": 60,
    "C": 95,
    "D": 70,
    "S": 124,
    "total": 464,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/743.png",
    "ability": [
      "꿀모으기",
      "인분"
    ],
    "s_ability": [
      "스위트베일"
    ]
  },
  {
    "id": 744,
    "number": 744,
    "name": "암멍이",
    "types": [
      "바위"
    ],
    "H": 45,
    "A": 65,
    "B": 40,
    "C": 30,
    "D": 40,
    "S": 60,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/744.png",
    "ability": [
      "날카로운눈",
      "의기양양"
    ],
    "s_ability": [
      "불굴의마음"
    ]
  },
  {
    "id": 745,
    "number": 745,
    "name": "루가루암",
    "types": [
      "바위"
    ],
    "H": 75,
    "A": 115,
    "B": 65,
    "C": 55,
    "D": 65,
    "S": 112,
    "total": 487,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/745.png",
    "ability": [
      "날카로운눈",
      "모래헤치기"
    ],
    "s_ability": [
      "불굴의마음"
    ]
  },
  {
    "id": 746,
    "number": 746,
    "name": "약어리",
    "types": [
      "물"
    ],
    "H": 45,
    "A": 20,
    "B": 20,
    "C": 25,
    "D": 25,
    "S": 40,
    "total": 175,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/746.png",
    "ability": [
      "어군"
    ],
    "s_ability": []
  },
  {
    "id": 747,
    "number": 747,
    "name": "시마사리",
    "types": [
      "독",
      "물"
    ],
    "H": 50,
    "A": 53,
    "B": 62,
    "C": 43,
    "D": 52,
    "S": 45,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/747.png",
    "ability": [
      "무도한행동",
      "유연"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 748,
    "number": 748,
    "name": "더시마사리",
    "types": [
      "독",
      "물"
    ],
    "H": 50,
    "A": 63,
    "B": 152,
    "C": 53,
    "D": 142,
    "S": 35,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/748.png",
    "ability": [
      "무도한행동",
      "유연"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 749,
    "number": 749,
    "name": "머드나기",
    "types": [
      "땅"
    ],
    "H": 70,
    "A": 100,
    "B": 70,
    "C": 45,
    "D": 55,
    "S": 45,
    "total": 385,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/749.png",
    "ability": [
      "마이페이스",
      "지구력"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 750,
    "number": 750,
    "name": "만마드",
    "types": [
      "땅"
    ],
    "H": 100,
    "A": 125,
    "B": 100,
    "C": 55,
    "D": 85,
    "S": 35,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/750.png",
    "ability": [
      "마이페이스",
      "지구력"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 751,
    "number": 751,
    "name": "물거미",
    "types": [
      "물",
      "벌레"
    ],
    "H": 38,
    "A": 40,
    "B": 52,
    "C": 40,
    "D": 72,
    "S": 27,
    "total": 269,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/751.png",
    "ability": [
      "수포"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 752,
    "number": 752,
    "name": "깨비물거미",
    "types": [
      "물",
      "벌레"
    ],
    "H": 68,
    "A": 70,
    "B": 92,
    "C": 50,
    "D": 132,
    "S": 42,
    "total": 454,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/752.png",
    "ability": [
      "수포"
    ],
    "s_ability": [
      "저수"
    ]
  },
  {
    "id": 753,
    "number": 753,
    "name": "짜랑랑",
    "types": [
      "풀"
    ],
    "H": 40,
    "A": 55,
    "B": 35,
    "C": 50,
    "D": 35,
    "S": 35,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/753.png",
    "ability": [
      "리프가드"
    ],
    "s_ability": [
      "심술꾸러기"
    ]
  },
  {
    "id": 754,
    "number": 754,
    "name": "라란티스",
    "types": [
      "풀"
    ],
    "H": 70,
    "A": 105,
    "B": 90,
    "C": 80,
    "D": 90,
    "S": 45,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/754.png",
    "ability": [
      "리프가드"
    ],
    "s_ability": [
      "심술꾸러기"
    ]
  },
  {
    "id": 755,
    "number": 755,
    "name": "자마슈",
    "types": [
      "풀",
      "페어리"
    ],
    "H": 40,
    "A": 35,
    "B": 55,
    "C": 65,
    "D": 75,
    "S": 15,
    "total": 285,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/755.png",
    "ability": [
      "발광",
      "포자"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 756,
    "number": 756,
    "name": "마셰이드",
    "types": [
      "풀",
      "페어리"
    ],
    "H": 60,
    "A": 45,
    "B": 80,
    "C": 90,
    "D": 100,
    "S": 30,
    "total": 405,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/756.png",
    "ability": [
      "발광",
      "포자"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 757,
    "number": 757,
    "name": "야도뇽",
    "types": [
      "독",
      "불꽃"
    ],
    "H": 48,
    "A": 44,
    "B": 40,
    "C": 71,
    "D": 40,
    "S": 77,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/757.png",
    "ability": [
      "부식"
    ],
    "s_ability": [
      "둔감"
    ]
  },
  {
    "id": 758,
    "number": 758,
    "name": "염뉴트",
    "types": [
      "독",
      "불꽃"
    ],
    "H": 68,
    "A": 64,
    "B": 60,
    "C": 111,
    "D": 60,
    "S": 117,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/758.png",
    "ability": [
      "부식"
    ],
    "s_ability": [
      "둔감"
    ]
  },
  {
    "id": 759,
    "number": 759,
    "name": "포곰곰",
    "types": [
      "노말",
      "격투"
    ],
    "H": 70,
    "A": 75,
    "B": 50,
    "C": 45,
    "D": 50,
    "S": 50,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/759.png",
    "ability": [
      "복슬복슬",
      "서투름"
    ],
    "s_ability": [
      "헤롱헤롱바디"
    ]
  },
  {
    "id": 760,
    "number": 760,
    "name": "이븐곰",
    "types": [
      "노말",
      "격투"
    ],
    "H": 120,
    "A": 125,
    "B": 80,
    "C": 55,
    "D": 60,
    "S": 60,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/760.png",
    "ability": [
      "복슬복슬",
      "서투름"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 761,
    "number": 761,
    "name": "달콤아",
    "types": [
      "풀"
    ],
    "H": 42,
    "A": 30,
    "B": 38,
    "C": 30,
    "D": 38,
    "S": 32,
    "total": 210,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/761.png",
    "ability": [
      "리프가드",
      "둔감"
    ],
    "s_ability": [
      "스위트베일"
    ]
  },
  {
    "id": 762,
    "number": 762,
    "name": "달무리나",
    "types": [
      "풀"
    ],
    "H": 52,
    "A": 40,
    "B": 48,
    "C": 40,
    "D": 48,
    "S": 62,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/762.png",
    "ability": [
      "리프가드",
      "둔감"
    ],
    "s_ability": [
      "스위트베일"
    ]
  },
  {
    "id": 763,
    "number": 763,
    "name": "달코퀸",
    "types": [
      "풀"
    ],
    "H": 72,
    "A": 120,
    "B": 98,
    "C": 50,
    "D": 98,
    "S": 72,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/763.png",
    "ability": [
      "리프가드",
      "여왕의위엄"
    ],
    "s_ability": [
      "스위트베일"
    ]
  },
  {
    "id": 764,
    "number": 764,
    "name": "큐아링",
    "types": [
      "페어리"
    ],
    "H": 51,
    "A": 52,
    "B": 90,
    "C": 82,
    "D": 110,
    "S": 100,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/764.png",
    "ability": [
      "플라워베일",
      "힐링시프트"
    ],
    "s_ability": [
      "자연회복"
    ]
  },
  {
    "id": 765,
    "number": 765,
    "name": "하랑우탄",
    "types": [
      "노말",
      "에스퍼"
    ],
    "H": 90,
    "A": 60,
    "B": 80,
    "C": 90,
    "D": 110,
    "S": 60,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/765.png",
    "ability": [
      "정신력",
      "텔레파시"
    ],
    "s_ability": [
      "공생"
    ]
  },
  {
    "id": 766,
    "number": 766,
    "name": "내던숭이",
    "types": [
      "격투"
    ],
    "H": 100,
    "A": 120,
    "B": 90,
    "C": 40,
    "D": 60,
    "S": 80,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/766.png",
    "ability": [
      "리시버"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 767,
    "number": 767,
    "name": "꼬시레",
    "types": [
      "벌레",
      "물"
    ],
    "H": 25,
    "A": 35,
    "B": 40,
    "C": 20,
    "D": 30,
    "S": 80,
    "total": 230,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/767.png",
    "ability": [
      "도망태세"
    ],
    "s_ability": []
  },
  {
    "id": 768,
    "number": 768,
    "name": "갑주무사",
    "types": [
      "벌레",
      "물"
    ],
    "H": 75,
    "A": 125,
    "B": 140,
    "C": 60,
    "D": 90,
    "S": 40,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/768.png",
    "ability": [
      "위기회피"
    ],
    "s_ability": []
  },
  {
    "id": 769,
    "number": 769,
    "name": "모래꿍",
    "types": [
      "고스트",
      "땅"
    ],
    "H": 55,
    "A": 55,
    "B": 80,
    "C": 70,
    "D": 45,
    "S": 15,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/769.png",
    "ability": [
      "꾸덕꾸덕굳기"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 770,
    "number": 770,
    "name": "모래성이당",
    "types": [
      "고스트",
      "땅"
    ],
    "H": 85,
    "A": 75,
    "B": 110,
    "C": 100,
    "D": 75,
    "S": 35,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/770.png",
    "ability": [
      "꾸덕꾸덕굳기"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 771,
    "number": 771,
    "name": "해무기",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 60,
    "B": 130,
    "C": 30,
    "D": 130,
    "S": 5,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/771.png",
    "ability": [
      "내용물분출"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 772,
    "number": 772,
    "name": "타입:널",
    "types": [
      "노말"
    ],
    "H": 95,
    "A": 95,
    "B": 95,
    "C": 95,
    "D": 95,
    "S": 59,
    "total": 534,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/772.png",
    "ability": [
      "전투무장"
    ],
    "s_ability": []
  },
  {
    "id": 773,
    "number": 773,
    "name": "실버디",
    "types": [
      "노말"
    ],
    "H": 95,
    "A": 95,
    "B": 95,
    "C": 95,
    "D": 95,
    "S": 95,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/773.png",
    "ability": [
      "AR시스템"
    ],
    "s_ability": []
  },
  {
    "id": 774,
    "number": 774,
    "name": "메테노",
    "types": [
      "바위",
      "비행"
    ],
    "H": 60,
    "A": 60,
    "B": 100,
    "C": 60,
    "D": 100,
    "S": 60,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/774.png",
    "ability": [
      "리밋실드"
    ],
    "s_ability": []
  },
  {
    "id": 775,
    "number": 775,
    "name": "자말라",
    "types": [
      "노말"
    ],
    "H": 65,
    "A": 115,
    "B": 65,
    "C": 75,
    "D": 95,
    "S": 65,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/775.png",
    "ability": [
      "절대안깸"
    ],
    "s_ability": []
  },
  {
    "id": 776,
    "number": 776,
    "name": "폭거북스",
    "types": [
      "불꽃",
      "드래곤"
    ],
    "H": 60,
    "A": 78,
    "B": 135,
    "C": 91,
    "D": 85,
    "S": 36,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/776.png",
    "ability": [
      "조가비갑옷"
    ],
    "s_ability": []
  },
  {
    "id": 777,
    "number": 777,
    "name": "토게데마루",
    "types": [
      "전기",
      "강철"
    ],
    "H": 65,
    "A": 98,
    "B": 63,
    "C": 40,
    "D": 73,
    "S": 96,
    "total": 435,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/777.png",
    "ability": [
      "철가시",
      "피뢰침"
    ],
    "s_ability": [
      "옹골참"
    ]
  },
  {
    "id": 778,
    "number": 778,
    "name": "따라큐",
    "types": [
      "고스트",
      "페어리"
    ],
    "H": 55,
    "A": 90,
    "B": 80,
    "C": 50,
    "D": 105,
    "S": 96,
    "total": 476,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/778.png",
    "ability": [
      "탈"
    ],
    "s_ability": []
  },
  {
    "id": 779,
    "number": 779,
    "name": "치갈기",
    "types": [
      "물",
      "에스퍼"
    ],
    "H": 68,
    "A": 105,
    "B": 70,
    "C": 70,
    "D": 70,
    "S": 92,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/779.png",
    "ability": [
      "비비드바디",
      "옹골찬턱"
    ],
    "s_ability": [
      "미라클스킨"
    ]
  },
  {
    "id": 780,
    "number": 780,
    "name": "할비롱",
    "types": [
      "노말",
      "드래곤"
    ],
    "H": 78,
    "A": 60,
    "B": 85,
    "C": 135,
    "D": 91,
    "S": 36,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/780.png",
    "ability": [
      "발끈",
      "초식"
    ],
    "s_ability": [
      "날씨부정"
    ]
  },
  {
    "id": 781,
    "number": 781,
    "name": "타타륜",
    "types": [
      "고스트",
      "풀"
    ],
    "H": 70,
    "A": 131,
    "B": 100,
    "C": 86,
    "D": 90,
    "S": 40,
    "total": 517,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/781.png",
    "ability": [
      "강철술사"
    ],
    "s_ability": []
  },
  {
    "id": 782,
    "number": 782,
    "name": "짜랑꼬",
    "types": [
      "드래곤"
    ],
    "H": 45,
    "A": 55,
    "B": 65,
    "C": 45,
    "D": 45,
    "S": 45,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/782.png",
    "ability": [
      "방탄",
      "방음"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 783,
    "number": 783,
    "name": "짜랑고우",
    "types": [
      "드래곤",
      "격투"
    ],
    "H": 55,
    "A": 75,
    "B": 90,
    "C": 65,
    "D": 70,
    "S": 65,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/783.png",
    "ability": [
      "방탄",
      "방음"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 784,
    "number": 784,
    "name": "짜랑고우거",
    "types": [
      "드래곤",
      "격투"
    ],
    "H": 75,
    "A": 110,
    "B": 125,
    "C": 100,
    "D": 105,
    "S": 85,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/784.png",
    "ability": [
      "방탄",
      "방음"
    ],
    "s_ability": [
      "방진"
    ]
  },
  {
    "id": 785,
    "number": 785,
    "name": "카푸꼬꼬꼭",
    "types": [
      "전기",
      "페어리"
    ],
    "H": 70,
    "A": 115,
    "B": 85,
    "C": 95,
    "D": 75,
    "S": 130,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/785.png",
    "ability": [
      "일렉트릭메이커"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 786,
    "number": 786,
    "name": "카푸나비나",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 70,
    "A": 85,
    "B": 75,
    "C": 130,
    "D": 115,
    "S": 95,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/786.png",
    "ability": [
      "사이코메이커"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 787,
    "number": 787,
    "name": "카푸브루루",
    "types": [
      "풀",
      "페어리"
    ],
    "H": 70,
    "A": 130,
    "B": 115,
    "C": 85,
    "D": 95,
    "S": 75,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/787.png",
    "ability": [
      "그래스메이커"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 788,
    "number": 788,
    "name": "카푸느지느",
    "types": [
      "물",
      "페어리"
    ],
    "H": 70,
    "A": 75,
    "B": 115,
    "C": 95,
    "D": 130,
    "S": 85,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/788.png",
    "ability": [
      "미스트메이커"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 789,
    "number": 789,
    "name": "코스모그",
    "types": [
      "에스퍼"
    ],
    "H": 43,
    "A": 29,
    "B": 31,
    "C": 29,
    "D": 31,
    "S": 37,
    "total": 200,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/789.png",
    "ability": [
      "천진"
    ],
    "s_ability": []
  },
  {
    "id": 790,
    "number": 790,
    "name": "코스모움",
    "types": [
      "에스퍼"
    ],
    "H": 43,
    "A": 29,
    "B": 131,
    "C": 29,
    "D": 131,
    "S": 37,
    "total": 400,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/790.png",
    "ability": [
      "옹골참"
    ],
    "s_ability": []
  },
  {
    "id": 791,
    "number": 791,
    "name": "솔가레오",
    "types": [
      "에스퍼",
      "강철"
    ],
    "H": 137,
    "A": 137,
    "B": 107,
    "C": 113,
    "D": 89,
    "S": 97,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/791.png",
    "ability": [
      "메탈프로텍트"
    ],
    "s_ability": []
  },
  {
    "id": 792,
    "number": 792,
    "name": "루나아라",
    "types": [
      "에스퍼",
      "고스트"
    ],
    "H": 137,
    "A": 113,
    "B": 89,
    "C": 137,
    "D": 107,
    "S": 97,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/792.png",
    "ability": [
      "스펙터가드"
    ],
    "s_ability": []
  },
  {
    "id": 793,
    "number": 793,
    "name": "텅비드",
    "types": [
      "바위",
      "독"
    ],
    "H": 109,
    "A": 53,
    "B": 47,
    "C": 127,
    "D": 131,
    "S": 103,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/793.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 794,
    "number": 794,
    "name": "매시붕",
    "types": [
      "벌레",
      "격투"
    ],
    "H": 107,
    "A": 139,
    "B": 139,
    "C": 53,
    "D": 53,
    "S": 79,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/794.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 795,
    "number": 795,
    "name": "페로코체",
    "types": [
      "벌레",
      "격투"
    ],
    "H": 71,
    "A": 137,
    "B": 37,
    "C": 137,
    "D": 37,
    "S": 151,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/795.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 796,
    "number": 796,
    "name": "전수목",
    "types": [
      "전기"
    ],
    "H": 83,
    "A": 89,
    "B": 71,
    "C": 173,
    "D": 71,
    "S": 83,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/796.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 797,
    "number": 797,
    "name": "철화구야",
    "types": [
      "강철",
      "비행"
    ],
    "H": 97,
    "A": 101,
    "B": 103,
    "C": 107,
    "D": 101,
    "S": 61,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/797.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 798,
    "number": 798,
    "name": "종이신도",
    "types": [
      "풀",
      "강철"
    ],
    "H": 59,
    "A": 181,
    "B": 131,
    "C": 59,
    "D": 31,
    "S": 109,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/798.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 799,
    "number": 799,
    "name": "악식킹",
    "types": [
      "악",
      "드래곤"
    ],
    "H": 223,
    "A": 101,
    "B": 53,
    "C": 97,
    "D": 53,
    "S": 43,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/799.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 800,
    "number": 800,
    "name": "네크로즈마",
    "types": [
      "에스퍼"
    ],
    "H": 97,
    "A": 107,
    "B": 101,
    "C": 127,
    "D": 89,
    "S": 79,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/800.png",
    "ability": [
      "프리즘아머"
    ],
    "s_ability": []
  },
  {
    "id": 801,
    "number": 801,
    "name": "마기아나",
    "types": [
      "강철",
      "페어리"
    ],
    "H": 80,
    "A": 95,
    "B": 115,
    "C": 130,
    "D": 115,
    "S": 65,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/801.png",
    "ability": [
      "소울하트"
    ],
    "s_ability": []
  },
  {
    "id": 802,
    "number": 802,
    "name": "마샤도",
    "types": [
      "격투",
      "고스트"
    ],
    "H": 90,
    "A": 125,
    "B": 80,
    "C": 90,
    "D": 90,
    "S": 125,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/802.png",
    "ability": [
      "테크니션"
    ],
    "s_ability": []
  },
  {
    "id": 803,
    "number": 803,
    "name": "베베놈",
    "types": [
      "독"
    ],
    "H": 67,
    "A": 73,
    "B": 67,
    "C": 73,
    "D": 67,
    "S": 73,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/803.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 804,
    "number": 804,
    "name": "아고용",
    "types": [
      "독",
      "드래곤"
    ],
    "H": 73,
    "A": 73,
    "B": 73,
    "C": 127,
    "D": 73,
    "S": 121,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/804.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 805,
    "number": 805,
    "name": "차곡차곡",
    "types": [
      "바위",
      "강철"
    ],
    "H": 61,
    "A": 131,
    "B": 211,
    "C": 53,
    "D": 101,
    "S": 13,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/805.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 806,
    "number": 806,
    "name": "두파팡",
    "types": [
      "불꽃",
      "고스트"
    ],
    "H": 53,
    "A": 127,
    "B": 53,
    "C": 151,
    "D": 79,
    "S": 107,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/806.png",
    "ability": [
      "비스트부스트"
    ],
    "s_ability": []
  },
  {
    "id": 807,
    "number": 807,
    "name": "제라오라",
    "types": [
      "전기"
    ],
    "H": 88,
    "A": 112,
    "B": 75,
    "C": 102,
    "D": 80,
    "S": 143,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/807.png",
    "ability": [
      "축전"
    ],
    "s_ability": []
  },
  {
    "id": 808,
    "number": 808,
    "name": "멜탄",
    "types": [
      "강철"
    ],
    "H": 46,
    "A": 65,
    "B": 65,
    "C": 55,
    "D": 35,
    "S": 34,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/808.png",
    "ability": [
      "자력"
    ],
    "s_ability": []
  },
  {
    "id": 809,
    "number": 809,
    "name": "멜메탈",
    "types": [
      "강철"
    ],
    "H": 135,
    "A": 143,
    "B": 143,
    "C": 80,
    "D": 65,
    "S": 34,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/809.png",
    "ability": [
      "철주먹"
    ],
    "s_ability": []
  },
  {
    "id": 810,
    "number": 810,
    "name": "흥나숭",
    "types": [
      "풀"
    ],
    "H": 50,
    "A": 65,
    "B": 50,
    "C": 40,
    "D": 40,
    "S": 65,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "그래스메이커"
    ]
  },
  {
    "id": 811,
    "number": 811,
    "name": "채키몽",
    "types": [
      "풀"
    ],
    "H": 70,
    "A": 85,
    "B": 70,
    "C": 55,
    "D": 60,
    "S": 80,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/811.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "그래스메이커"
    ]
  },
  {
    "id": 812,
    "number": 812,
    "name": "고릴타",
    "types": [
      "풀"
    ],
    "H": 100,
    "A": 125,
    "B": 90,
    "C": 60,
    "D": 70,
    "S": 85,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/812.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "그래스메이커"
    ]
  },
  {
    "id": 813,
    "number": 813,
    "name": "염버니",
    "types": [
      "불꽃"
    ],
    "H": 50,
    "A": 71,
    "B": 40,
    "C": 40,
    "D": 40,
    "S": 69,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "리베로"
    ]
  },
  {
    "id": 814,
    "number": 814,
    "name": "래비풋",
    "types": [
      "불꽃"
    ],
    "H": 65,
    "A": 86,
    "B": 60,
    "C": 55,
    "D": 60,
    "S": 94,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/814.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "리베로"
    ]
  },
  {
    "id": 815,
    "number": 815,
    "name": "에이스번",
    "types": [
      "불꽃"
    ],
    "H": 80,
    "A": 116,
    "B": 75,
    "C": 65,
    "D": 75,
    "S": 119,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/815.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "리베로"
    ]
  },
  {
    "id": 816,
    "number": 816,
    "name": "울머기",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 40,
    "B": 40,
    "C": 70,
    "D": 40,
    "S": 70,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/816.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 817,
    "number": 817,
    "name": "누겔레온",
    "types": [
      "물"
    ],
    "H": 65,
    "A": 60,
    "B": 55,
    "C": 95,
    "D": 55,
    "S": 90,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/817.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 818,
    "number": 818,
    "name": "인텔리레온",
    "types": [
      "물"
    ],
    "H": 70,
    "A": 85,
    "B": 65,
    "C": 125,
    "D": 65,
    "S": 120,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/818.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 819,
    "number": 819,
    "name": "탐리스",
    "types": [
      "노말"
    ],
    "H": 70,
    "A": 55,
    "B": 55,
    "C": 35,
    "D": 35,
    "S": 25,
    "total": 275,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/819.png",
    "ability": [
      "볼주머니"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 820,
    "number": 820,
    "name": "요씽리스",
    "types": [
      "노말"
    ],
    "H": 120,
    "A": 95,
    "B": 95,
    "C": 55,
    "D": 75,
    "S": 20,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/820.png",
    "ability": [
      "볼주머니"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 821,
    "number": 821,
    "name": "파라꼬",
    "types": [
      "비행"
    ],
    "H": 38,
    "A": 47,
    "B": 35,
    "C": 33,
    "D": 35,
    "S": 57,
    "total": 245,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/821.png",
    "ability": [
      "날카로운눈",
      "긴장감"
    ],
    "s_ability": [
      "부풀린가슴"
    ]
  },
  {
    "id": 822,
    "number": 822,
    "name": "파크로우",
    "types": [
      "비행"
    ],
    "H": 68,
    "A": 67,
    "B": 55,
    "C": 43,
    "D": 55,
    "S": 77,
    "total": 365,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/822.png",
    "ability": [
      "날카로운눈",
      "긴장감"
    ],
    "s_ability": [
      "부풀린가슴"
    ]
  },
  {
    "id": 823,
    "number": 823,
    "name": "아머까오",
    "types": [
      "비행",
      "강철"
    ],
    "H": 98,
    "A": 87,
    "B": 105,
    "C": 53,
    "D": 85,
    "S": 67,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/823.png",
    "ability": [
      "프레셔",
      "긴장감"
    ],
    "s_ability": [
      "미러아머"
    ]
  },
  {
    "id": 824,
    "number": 824,
    "name": "두루지벌레",
    "types": [
      "벌레"
    ],
    "H": 25,
    "A": 20,
    "B": 20,
    "C": 25,
    "D": 45,
    "S": 45,
    "total": 180,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/824.png",
    "ability": [
      "벌레의알림",
      "복안"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 825,
    "number": 825,
    "name": "레돔벌레",
    "types": [
      "벌레",
      "에스퍼"
    ],
    "H": 50,
    "A": 35,
    "B": 80,
    "C": 50,
    "D": 90,
    "S": 30,
    "total": 335,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/825.png",
    "ability": [
      "벌레의알림",
      "복안"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 826,
    "number": 826,
    "name": "이올브",
    "types": [
      "벌레",
      "에스퍼"
    ],
    "H": 60,
    "A": 45,
    "B": 110,
    "C": 80,
    "D": 120,
    "S": 90,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/826.png",
    "ability": [
      "벌레의알림",
      "통찰"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 827,
    "number": 827,
    "name": "훔처우",
    "types": [
      "악"
    ],
    "H": 40,
    "A": 28,
    "B": 28,
    "C": 47,
    "D": 52,
    "S": 50,
    "total": 245,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/827.png",
    "ability": [
      "도주",
      "곡예"
    ],
    "s_ability": [
      "잠복"
    ]
  },
  {
    "id": 828,
    "number": 828,
    "name": "폭슬라이",
    "types": [
      "악"
    ],
    "H": 70,
    "A": 58,
    "B": 58,
    "C": 87,
    "D": 92,
    "S": 90,
    "total": 455,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/828.png",
    "ability": [
      "도주",
      "곡예"
    ],
    "s_ability": [
      "잠복"
    ]
  },
  {
    "id": 829,
    "number": 829,
    "name": "꼬모카",
    "types": [
      "풀"
    ],
    "H": 40,
    "A": 40,
    "B": 60,
    "C": 40,
    "D": 60,
    "S": 10,
    "total": 250,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/829.png",
    "ability": [
      "솜털",
      "재생력"
    ],
    "s_ability": [
      "포자"
    ]
  },
  {
    "id": 830,
    "number": 830,
    "name": "백솜모카",
    "types": [
      "풀"
    ],
    "H": 60,
    "A": 50,
    "B": 90,
    "C": 80,
    "D": 120,
    "S": 60,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/830.png",
    "ability": [
      "솜털",
      "재생력"
    ],
    "s_ability": [
      "포자"
    ]
  },
  {
    "id": 831,
    "number": 831,
    "name": "우르",
    "types": [
      "노말"
    ],
    "H": 42,
    "A": 40,
    "B": 55,
    "C": 40,
    "D": 45,
    "S": 48,
    "total": 270,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/831.png",
    "ability": [
      "복슬복슬",
      "도주"
    ],
    "s_ability": [
      "방탄"
    ]
  },
  {
    "id": 832,
    "number": 832,
    "name": "배우르",
    "types": [
      "노말"
    ],
    "H": 72,
    "A": 80,
    "B": 100,
    "C": 60,
    "D": 90,
    "S": 88,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/832.png",
    "ability": [
      "복슬복슬",
      "불굴의마음"
    ],
    "s_ability": [
      "방탄"
    ]
  },
  {
    "id": 833,
    "number": 833,
    "name": "깨물부기",
    "types": [
      "물"
    ],
    "H": 50,
    "A": 64,
    "B": 50,
    "C": 38,
    "D": 38,
    "S": 44,
    "total": 284,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/833.png",
    "ability": [
      "옹골찬턱",
      "조가비갑옷"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 834,
    "number": 834,
    "name": "갈가부기",
    "types": [
      "물",
      "바위"
    ],
    "H": 90,
    "A": 115,
    "B": 90,
    "C": 48,
    "D": 68,
    "S": 74,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/834.png",
    "ability": [
      "옹골찬턱",
      "조가비갑옷"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 835,
    "number": 835,
    "name": "멍파치",
    "types": [
      "전기"
    ],
    "H": 59,
    "A": 45,
    "B": 50,
    "C": 40,
    "D": 50,
    "S": 26,
    "total": 270,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/835.png",
    "ability": [
      "볼줍기"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 836,
    "number": 836,
    "name": "펄스멍",
    "types": [
      "전기"
    ],
    "H": 69,
    "A": 90,
    "B": 60,
    "C": 90,
    "D": 60,
    "S": 121,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/836.png",
    "ability": [
      "옹골찬턱"
    ],
    "s_ability": [
      "승기"
    ]
  },
  {
    "id": 837,
    "number": 837,
    "name": "탄동",
    "types": [
      "바위"
    ],
    "H": 30,
    "A": 40,
    "B": 50,
    "C": 40,
    "D": 50,
    "S": 30,
    "total": 240,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/837.png",
    "ability": [
      "증기기관",
      "내열"
    ],
    "s_ability": [
      "타오르는불꽃"
    ]
  },
  {
    "id": 838,
    "number": 838,
    "name": "탄차곤",
    "types": [
      "바위",
      "불꽃"
    ],
    "H": 80,
    "A": 60,
    "B": 90,
    "C": 60,
    "D": 70,
    "S": 50,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/838.png",
    "ability": [
      "증기기관",
      "불꽃몸"
    ],
    "s_ability": [
      "타오르는불꽃"
    ]
  },
  {
    "id": 839,
    "number": 839,
    "name": "석탄산",
    "types": [
      "바위",
      "불꽃"
    ],
    "H": 110,
    "A": 80,
    "B": 120,
    "C": 80,
    "D": 90,
    "S": 30,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/839.png",
    "ability": [
      "증기기관",
      "불꽃몸"
    ],
    "s_ability": [
      "타오르는불꽃"
    ]
  },
  {
    "id": 840,
    "number": 840,
    "name": "과사삭벌레",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 40,
    "A": 40,
    "B": 80,
    "C": 40,
    "D": 40,
    "S": 20,
    "total": 260,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/840.png",
    "ability": [
      "숙성",
      "먹보"
    ],
    "s_ability": [
      "방탄"
    ]
  },
  {
    "id": 841,
    "number": 841,
    "name": "애프룡",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 70,
    "A": 110,
    "B": 80,
    "C": 95,
    "D": 60,
    "S": 70,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/841.png",
    "ability": [
      "숙성",
      "먹보"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 842,
    "number": 842,
    "name": "단지래플",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 110,
    "A": 85,
    "B": 80,
    "C": 100,
    "D": 80,
    "S": 30,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/842.png",
    "ability": [
      "숙성",
      "먹보"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 843,
    "number": 843,
    "name": "모래뱀",
    "types": [
      "땅"
    ],
    "H": 52,
    "A": 57,
    "B": 75,
    "C": 35,
    "D": 50,
    "S": 46,
    "total": 315,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/843.png",
    "ability": [
      "모래뿜기",
      "탈피"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 844,
    "number": 844,
    "name": "사다이사",
    "types": [
      "땅"
    ],
    "H": 72,
    "A": 107,
    "B": 125,
    "C": 65,
    "D": 70,
    "S": 71,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/844.png",
    "ability": [
      "모래뿜기",
      "탈피"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 845,
    "number": 845,
    "name": "윽우지",
    "types": [
      "비행",
      "물"
    ],
    "H": 70,
    "A": 85,
    "B": 55,
    "C": 85,
    "D": 95,
    "S": 85,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/845.png",
    "ability": [
      "그대로꿀꺽미사일"
    ],
    "s_ability": []
  },
  {
    "id": 846,
    "number": 846,
    "name": "찌로꼬치",
    "types": [
      "물"
    ],
    "H": 41,
    "A": 63,
    "B": 40,
    "C": 40,
    "D": 30,
    "S": 66,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/846.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "스크루지느러미"
    ]
  },
  {
    "id": 847,
    "number": 847,
    "name": "꼬치조",
    "types": [
      "물"
    ],
    "H": 61,
    "A": 123,
    "B": 60,
    "C": 60,
    "D": 50,
    "S": 136,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/847.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": [
      "스크루지느러미"
    ]
  },
  {
    "id": 848,
    "number": 848,
    "name": "일레즌",
    "types": [
      "전기",
      "독"
    ],
    "H": 40,
    "A": 38,
    "B": 35,
    "C": 54,
    "D": 35,
    "S": 40,
    "total": 242,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/848.png",
    "ability": [
      "주눅",
      "정전기"
    ],
    "s_ability": [
      "서투름"
    ]
  },
  {
    "id": 849,
    "number": 849,
    "name": "스트린더",
    "types": [
      "전기",
      "독"
    ],
    "H": 75,
    "A": 98,
    "B": 70,
    "C": 114,
    "D": 70,
    "S": 75,
    "total": 502,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/849.png",
    "ability": [
      "펑크록",
      "플러스"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 850,
    "number": 850,
    "name": "태우지네",
    "types": [
      "불꽃",
      "벌레"
    ],
    "H": 50,
    "A": 65,
    "B": 45,
    "C": 50,
    "D": 50,
    "S": 45,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/850.png",
    "ability": [
      "타오르는불꽃",
      "하얀연기"
    ],
    "s_ability": [
      "불꽃몸"
    ]
  },
  {
    "id": 851,
    "number": 851,
    "name": "다태우지네",
    "types": [
      "불꽃",
      "벌레"
    ],
    "H": 100,
    "A": 115,
    "B": 65,
    "C": 90,
    "D": 90,
    "S": 65,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/851.png",
    "ability": [
      "타오르는불꽃",
      "하얀연기"
    ],
    "s_ability": [
      "불꽃몸"
    ]
  },
  {
    "id": 852,
    "number": 852,
    "name": "때때무노",
    "types": [
      "격투"
    ],
    "H": 50,
    "A": 68,
    "B": 60,
    "C": 50,
    "D": 50,
    "S": 32,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/852.png",
    "ability": [
      "유연"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 853,
    "number": 853,
    "name": "케오퍼스",
    "types": [
      "격투"
    ],
    "H": 80,
    "A": 118,
    "B": 90,
    "C": 70,
    "D": 80,
    "S": 42,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/853.png",
    "ability": [
      "유연"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 854,
    "number": 854,
    "name": "데인차",
    "types": [
      "고스트"
    ],
    "H": 40,
    "A": 45,
    "B": 45,
    "C": 74,
    "D": 54,
    "S": 50,
    "total": 308,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/854.png",
    "ability": [
      "깨어진갑옷"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 855,
    "number": 855,
    "name": "포트데스",
    "types": [
      "고스트"
    ],
    "H": 60,
    "A": 65,
    "B": 65,
    "C": 134,
    "D": 114,
    "S": 70,
    "total": 508,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/855.png",
    "ability": [
      "깨어진갑옷"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 856,
    "number": 856,
    "name": "몸지브림",
    "types": [
      "에스퍼"
    ],
    "H": 42,
    "A": 30,
    "B": 45,
    "C": 56,
    "D": 53,
    "S": 39,
    "total": 265,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/856.png",
    "ability": [
      "치유의마음",
      "위험예지"
    ],
    "s_ability": [
      "매직미러"
    ]
  },
  {
    "id": 857,
    "number": 857,
    "name": "손지브림",
    "types": [
      "에스퍼"
    ],
    "H": 57,
    "A": 40,
    "B": 65,
    "C": 86,
    "D": 73,
    "S": 49,
    "total": 370,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/857.png",
    "ability": [
      "치유의마음",
      "위험예지"
    ],
    "s_ability": [
      "매직미러"
    ]
  },
  {
    "id": 858,
    "number": 858,
    "name": "브리무음",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 57,
    "A": 90,
    "B": 95,
    "C": 136,
    "D": 103,
    "S": 29,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/858.png",
    "ability": [
      "치유의마음",
      "위험예지"
    ],
    "s_ability": [
      "매직미러"
    ]
  },
  {
    "id": 859,
    "number": 859,
    "name": "메롱꿍",
    "types": [
      "악",
      "페어리"
    ],
    "H": 45,
    "A": 45,
    "B": 30,
    "C": 55,
    "D": 40,
    "S": 50,
    "total": 265,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/859.png",
    "ability": [
      "짓궂은마음",
      "통찰"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 860,
    "number": 860,
    "name": "쏘겨모",
    "types": [
      "악",
      "페어리"
    ],
    "H": 65,
    "A": 60,
    "B": 45,
    "C": 75,
    "D": 55,
    "S": 70,
    "total": 370,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/860.png",
    "ability": [
      "짓궂은마음",
      "통찰"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 861,
    "number": 861,
    "name": "오롱털",
    "types": [
      "악",
      "페어리"
    ],
    "H": 95,
    "A": 120,
    "B": 65,
    "C": 95,
    "D": 75,
    "S": 60,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/861.png",
    "ability": [
      "짓궂은마음",
      "통찰"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 862,
    "number": 862,
    "name": "가로막구리",
    "types": [
      "악",
      "노말"
    ],
    "H": 93,
    "A": 90,
    "B": 101,
    "C": 60,
    "D": 81,
    "S": 95,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/862.png",
    "ability": [
      "이판사판",
      "근성"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 863,
    "number": 863,
    "name": "나이킹",
    "types": [
      "강철"
    ],
    "H": 70,
    "A": 110,
    "B": 100,
    "C": 50,
    "D": 60,
    "S": 50,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/863.png",
    "ability": [
      "전투무장",
      "단단한발톱"
    ],
    "s_ability": [
      "강철정신"
    ]
  },
  {
    "id": 864,
    "number": 864,
    "name": "산호르곤",
    "types": [
      "고스트"
    ],
    "H": 60,
    "A": 95,
    "B": 50,
    "C": 145,
    "D": 130,
    "S": 30,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/864.png",
    "ability": [
      "깨어진갑옷"
    ],
    "s_ability": [
      "멸망의바디"
    ]
  },
  {
    "id": 865,
    "number": 865,
    "name": "창파나이트",
    "types": [
      "격투"
    ],
    "H": 62,
    "A": 135,
    "B": 95,
    "C": 68,
    "D": 82,
    "S": 65,
    "total": 507,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/865.png",
    "ability": [
      "불굴의마음"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 866,
    "number": 866,
    "name": "마임꽁꽁",
    "types": [
      "얼음",
      "에스퍼"
    ],
    "H": 80,
    "A": 85,
    "B": 75,
    "C": 110,
    "D": 100,
    "S": 70,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/866.png",
    "ability": [
      "갈지자걸음",
      "배리어프리"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 867,
    "number": 867,
    "name": "데스판",
    "types": [
      "땅",
      "고스트"
    ],
    "H": 58,
    "A": 95,
    "B": 145,
    "C": 50,
    "D": 105,
    "S": 30,
    "total": 483,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/867.png",
    "ability": [
      "떠도는영혼"
    ],
    "s_ability": []
  },
  {
    "id": 868,
    "number": 868,
    "name": "마빌크",
    "types": [
      "페어리"
    ],
    "H": 45,
    "A": 40,
    "B": 40,
    "C": 50,
    "D": 61,
    "S": 34,
    "total": 270,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/868.png",
    "ability": [
      "스위트베일"
    ],
    "s_ability": [
      "아로마베일"
    ]
  },
  {
    "id": 869,
    "number": 869,
    "name": "마휘핑",
    "types": [
      "페어리"
    ],
    "H": 65,
    "A": 60,
    "B": 75,
    "C": 110,
    "D": 121,
    "S": 64,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/869.png",
    "ability": [
      "스위트베일"
    ],
    "s_ability": [
      "아로마베일"
    ]
  },
  {
    "id": 870,
    "number": 870,
    "name": "대여르",
    "types": [
      "격투"
    ],
    "H": 65,
    "A": 100,
    "B": 100,
    "C": 70,
    "D": 60,
    "S": 75,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/870.png",
    "ability": [
      "전투무장"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 871,
    "number": 871,
    "name": "찌르성게",
    "types": [
      "전기"
    ],
    "H": 48,
    "A": 101,
    "B": 95,
    "C": 91,
    "D": 85,
    "S": 15,
    "total": 435,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/871.png",
    "ability": [
      "피뢰침"
    ],
    "s_ability": [
      "일렉트릭메이커"
    ]
  },
  {
    "id": 872,
    "number": 872,
    "name": "누니머기",
    "types": [
      "얼음",
      "벌레"
    ],
    "H": 30,
    "A": 25,
    "B": 35,
    "C": 45,
    "D": 30,
    "S": 20,
    "total": 185,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/872.png",
    "ability": [
      "인분"
    ],
    "s_ability": [
      "얼음인분"
    ]
  },
  {
    "id": 873,
    "number": 873,
    "name": "모스노우",
    "types": [
      "얼음",
      "벌레"
    ],
    "H": 70,
    "A": 65,
    "B": 60,
    "C": 125,
    "D": 90,
    "S": 65,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/873.png",
    "ability": [
      "인분"
    ],
    "s_ability": [
      "얼음인분"
    ]
  },
  {
    "id": 874,
    "number": 874,
    "name": "돌헨진",
    "types": [
      "바위"
    ],
    "H": 100,
    "A": 125,
    "B": 135,
    "C": 20,
    "D": 20,
    "S": 70,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/874.png",
    "ability": [
      "파워스폿"
    ],
    "s_ability": []
  },
  {
    "id": 875,
    "number": 875,
    "name": "빙큐보",
    "types": [
      "얼음"
    ],
    "H": 75,
    "A": 80,
    "B": 110,
    "C": 65,
    "D": 90,
    "S": 50,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/875.png",
    "ability": [
      "아이스페이스"
    ],
    "s_ability": []
  },
  {
    "id": 876,
    "number": 876,
    "name": "에써르",
    "types": [
      "에스퍼",
      "노말"
    ],
    "H": 60,
    "A": 65,
    "B": 55,
    "C": 105,
    "D": 95,
    "S": 95,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/876.png",
    "ability": [
      "정신력",
      "싱크로"
    ],
    "s_ability": [
      "사이코메이커"
    ]
  },
  {
    "id": 877,
    "number": 877,
    "name": "모르페코",
    "types": [
      "전기",
      "악"
    ],
    "H": 58,
    "A": 95,
    "B": 58,
    "C": 70,
    "D": 58,
    "S": 97,
    "total": 436,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/877.png",
    "ability": [
      "꼬르륵스위치"
    ],
    "s_ability": []
  },
  {
    "id": 878,
    "number": 878,
    "name": "끼리동",
    "types": [
      "강철"
    ],
    "H": 72,
    "A": 80,
    "B": 49,
    "C": 40,
    "D": 49,
    "S": 40,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/878.png",
    "ability": [
      "우격다짐"
    ],
    "s_ability": [
      "헤비메탈"
    ]
  },
  {
    "id": 879,
    "number": 879,
    "name": "대왕끼리동",
    "types": [
      "강철"
    ],
    "H": 122,
    "A": 130,
    "B": 69,
    "C": 80,
    "D": 69,
    "S": 30,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/879.png",
    "ability": [
      "우격다짐"
    ],
    "s_ability": [
      "헤비메탈"
    ]
  },
  {
    "id": 880,
    "number": 880,
    "name": "파치래곤",
    "types": [
      "전기",
      "드래곤"
    ],
    "H": 90,
    "A": 100,
    "B": 90,
    "C": 80,
    "D": 70,
    "S": 75,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/880.png",
    "ability": [
      "축전",
      "의욕"
    ],
    "s_ability": [
      "모래헤치기"
    ]
  },
  {
    "id": 881,
    "number": 881,
    "name": "파치르돈",
    "types": [
      "전기",
      "얼음"
    ],
    "H": 90,
    "A": 100,
    "B": 90,
    "C": 90,
    "D": 80,
    "S": 55,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/881.png",
    "ability": [
      "축전",
      "정전기"
    ],
    "s_ability": [
      "눈치우기"
    ]
  },
  {
    "id": 882,
    "number": 882,
    "name": "어래곤",
    "types": [
      "물",
      "드래곤"
    ],
    "H": 90,
    "A": 90,
    "B": 100,
    "C": 70,
    "D": 80,
    "S": 75,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/882.png",
    "ability": [
      "저수",
      "옹골찬턱"
    ],
    "s_ability": [
      "모래헤치기"
    ]
  },
  {
    "id": 883,
    "number": 883,
    "name": "어치르돈",
    "types": [
      "물",
      "얼음"
    ],
    "H": 90,
    "A": 90,
    "B": 100,
    "C": 80,
    "D": 90,
    "S": 55,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/883.png",
    "ability": [
      "저수",
      "아이스바디"
    ],
    "s_ability": [
      "눈치우기"
    ]
  },
  {
    "id": 884,
    "number": 884,
    "name": "두랄루돈",
    "types": [
      "강철",
      "드래곤"
    ],
    "H": 70,
    "A": 95,
    "B": 115,
    "C": 120,
    "D": 50,
    "S": 85,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/884.png",
    "ability": [
      "라이트메탈",
      "헤비메탈"
    ],
    "s_ability": [
      "굳건한신념"
    ]
  },
  {
    "id": 885,
    "number": 885,
    "name": "드라꼰",
    "types": [
      "드래곤",
      "고스트"
    ],
    "H": 28,
    "A": 60,
    "B": 30,
    "C": 40,
    "D": 30,
    "S": 82,
    "total": 270,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/885.png",
    "ability": [
      "클리어바디",
      "틈새포착"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 886,
    "number": 886,
    "name": "드래런치",
    "types": [
      "드래곤",
      "고스트"
    ],
    "H": 68,
    "A": 80,
    "B": 50,
    "C": 60,
    "D": 50,
    "S": 102,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/886.png",
    "ability": [
      "클리어바디",
      "틈새포착"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 887,
    "number": 887,
    "name": "드래펄트",
    "types": [
      "드래곤",
      "고스트"
    ],
    "H": 88,
    "A": 120,
    "B": 75,
    "C": 100,
    "D": 75,
    "S": 142,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/887.png",
    "ability": [
      "클리어바디",
      "틈새포착"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 888,
    "number": 888,
    "name": "자시안",
    "types": [
      "페어리"
    ],
    "H": 92,
    "A": 120,
    "B": 115,
    "C": 80,
    "D": 115,
    "S": 138,
    "total": 660,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/888.png",
    "ability": [
      "불요의검"
    ],
    "s_ability": []
  },
  {
    "id": 889,
    "number": 889,
    "name": "자마젠타",
    "types": [
      "격투"
    ],
    "H": 92,
    "A": 120,
    "B": 115,
    "C": 80,
    "D": 115,
    "S": 138,
    "total": 660,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/889.png",
    "ability": [
      "불굴의방패"
    ],
    "s_ability": []
  },
  {
    "id": 890,
    "number": 890,
    "name": "무한다이노",
    "types": [
      "독",
      "드래곤"
    ],
    "H": 140,
    "A": 85,
    "B": 95,
    "C": 145,
    "D": 95,
    "S": 130,
    "total": 690,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/890.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": []
  },
  {
    "id": 891,
    "number": 891,
    "name": "치고마",
    "types": [
      "격투"
    ],
    "H": 60,
    "A": 90,
    "B": 60,
    "C": 53,
    "D": 50,
    "S": 72,
    "total": 385,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/891.png",
    "ability": [
      "정신력"
    ],
    "s_ability": []
  },
  {
    "id": 892,
    "number": 892,
    "name": "우라오스 일격의 태세",
    "types": [
      "격투",
      "악"
    ],
    "H": 100,
    "A": 130,
    "B": 100,
    "C": 63,
    "D": 60,
    "S": 97,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/892.png",
    "ability": [
      "보이지않는주먹"
    ],
    "s_ability": []
  },
  {
    "id": 893,
    "number": 893,
    "name": "자루도",
    "types": [
      "악",
      "풀"
    ],
    "H": 105,
    "A": 120,
    "B": 105,
    "C": 70,
    "D": 95,
    "S": 105,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/893.png",
    "ability": [
      "리프가드"
    ],
    "s_ability": []
  },
  {
    "id": 894,
    "number": 894,
    "name": "레지에레키",
    "types": [
      "전기"
    ],
    "H": 80,
    "A": 100,
    "B": 50,
    "C": 100,
    "D": 50,
    "S": 200,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/894.png",
    "ability": [
      "트랜지스터"
    ],
    "s_ability": []
  },
  {
    "id": 895,
    "number": 895,
    "name": "레지드래고",
    "types": [
      "드래곤"
    ],
    "H": 200,
    "A": 100,
    "B": 50,
    "C": 100,
    "D": 50,
    "S": 80,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/895.png",
    "ability": [
      "용의턱"
    ],
    "s_ability": []
  },
  {
    "id": 896,
    "number": 896,
    "name": "블리자포스",
    "types": [
      "얼음"
    ],
    "H": 100,
    "A": 145,
    "B": 130,
    "C": 65,
    "D": 110,
    "S": 30,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/896.png",
    "ability": [
      "백의울음"
    ],
    "s_ability": []
  },
  {
    "id": 897,
    "number": 897,
    "name": "레이스포스",
    "types": [
      "고스트"
    ],
    "H": 100,
    "A": 65,
    "B": 60,
    "C": 145,
    "D": 80,
    "S": 130,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/897.png",
    "ability": [
      "흑의울음"
    ],
    "s_ability": []
  },
  {
    "id": 898,
    "number": 898,
    "name": "버드렉스",
    "types": [
      "에스퍼",
      "풀"
    ],
    "H": 100,
    "A": 80,
    "B": 80,
    "C": 80,
    "D": 80,
    "S": 80,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/898.png",
    "ability": [
      "긴장감"
    ],
    "s_ability": []
  },
  {
    "id": 899,
    "number": 899,
    "name": "신비록",
    "types": [
      "노말",
      "에스퍼"
    ],
    "H": 103,
    "A": 105,
    "B": 72,
    "C": 105,
    "D": 75,
    "S": 65,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/899.png",
    "ability": [
      "위협",
      "통찰"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 900,
    "number": 900,
    "name": "사마자르",
    "types": [
      "벌레",
      "바위"
    ],
    "H": 70,
    "A": 135,
    "B": 95,
    "C": 45,
    "D": 70,
    "S": 85,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/900.png",
    "ability": [
      "벌레의알림",
      "우격다짐"
    ],
    "s_ability": [
      "sharpness"
    ]
  },
  {
    "id": 901,
    "number": 901,
    "name": "다투곰",
    "types": [
      "땅",
      "노말"
    ],
    "H": 130,
    "A": 140,
    "B": 105,
    "C": 45,
    "D": 80,
    "S": 50,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/901.png",
    "ability": [
      "근성",
      "방탄"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 902,
    "number": 902,
    "name": "대쓰여너",
    "types": [
      "물",
      "고스트"
    ],
    "H": 120,
    "A": 112,
    "B": 65,
    "C": 80,
    "D": 75,
    "S": 78,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/902.png",
    "ability": [
      "쓱쓱",
      "적응력"
    ],
    "s_ability": [
      "틀깨기"
    ]
  },
  {
    "id": 903,
    "number": 903,
    "name": "포푸니크",
    "types": [
      "격투",
      "독"
    ],
    "H": 80,
    "A": 130,
    "B": 60,
    "C": 40,
    "D": 80,
    "S": 120,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/903.png",
    "ability": [
      "프레셔",
      "곡예"
    ],
    "s_ability": [
      "독수"
    ]
  },
  {
    "id": 904,
    "number": 904,
    "name": "장침바루",
    "types": [
      "악",
      "독"
    ],
    "H": 85,
    "A": 115,
    "B": 95,
    "C": 65,
    "D": 65,
    "S": 85,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/904.png",
    "ability": [
      "독가시",
      "쓱쓱"
    ],
    "s_ability": [
      "위협"
    ]
  },
  {
    "id": 905,
    "number": 905,
    "name": "러브로스",
    "types": [
      "페어리",
      "비행"
    ],
    "H": 74,
    "A": 115,
    "B": 70,
    "C": 135,
    "D": 80,
    "S": 106,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/905.png",
    "ability": [
      "헤롱헤롱바디"
    ],
    "s_ability": [
      "심술꾸러기"
    ]
  },
  {
    "id": 906,
    "number": 906,
    "name": "나오하",
    "types": [
      "풀"
    ],
    "H": 40,
    "A": 61,
    "B": 54,
    "C": 45,
    "D": 45,
    "S": 65,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "변환자재"
    ]
  },
  {
    "id": 907,
    "number": 907,
    "name": "나로테",
    "types": [
      "풀"
    ],
    "H": 61,
    "A": 80,
    "B": 63,
    "C": 60,
    "D": 63,
    "S": 83,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/907.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "변환자재"
    ]
  },
  {
    "id": 908,
    "number": 908,
    "name": "마스카나",
    "types": [
      "풀",
      "악"
    ],
    "H": 76,
    "A": 110,
    "B": 70,
    "C": 81,
    "D": 70,
    "S": 123,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/908.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "변환자재"
    ]
  },
  {
    "id": 909,
    "number": 909,
    "name": "뜨아거",
    "types": [
      "불꽃"
    ],
    "H": 67,
    "A": 45,
    "B": 59,
    "C": 63,
    "D": 40,
    "S": 36,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/909.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 910,
    "number": 910,
    "name": "악뜨거",
    "types": [
      "불꽃"
    ],
    "H": 81,
    "A": 55,
    "B": 78,
    "C": 90,
    "D": 58,
    "S": 49,
    "total": 411,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/910.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 911,
    "number": 911,
    "name": "라우드본",
    "types": [
      "불꽃",
      "고스트"
    ],
    "H": 104,
    "A": 75,
    "B": 100,
    "C": 110,
    "D": 75,
    "S": 66,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/911.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 912,
    "number": 912,
    "name": "꾸왁스",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 65,
    "B": 45,
    "C": 50,
    "D": 45,
    "S": 50,
    "total": 310,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/912.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 913,
    "number": 913,
    "name": "아꾸왁",
    "types": [
      "물"
    ],
    "H": 70,
    "A": 85,
    "B": 65,
    "C": 65,
    "D": 60,
    "S": 65,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/913.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 914,
    "number": 914,
    "name": "웨이니발",
    "types": [
      "물",
      "격투"
    ],
    "H": 85,
    "A": 120,
    "B": 80,
    "C": 85,
    "D": 75,
    "S": 85,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/914.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "자기과신"
    ]
  },
  {
    "id": 915,
    "number": 915,
    "name": "맛보돈",
    "types": [
      "노말"
    ],
    "H": 54,
    "A": 45,
    "B": 40,
    "C": 35,
    "D": 45,
    "S": 35,
    "total": 254,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/915.png",
    "ability": [
      "아로마베일",
      "먹보"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 916,
    "number": 916,
    "name": "퍼퓨돈",
    "types": [
      "노말"
    ],
    "H": 110,
    "A": 100,
    "B": 75,
    "C": 59,
    "D": 80,
    "S": 65,
    "total": 489,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/916.png",
    "ability": [
      "lingering-aroma",
      "먹보"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 917,
    "number": 917,
    "name": "타랜툴라",
    "types": [
      "벌레"
    ],
    "H": 35,
    "A": 41,
    "B": 45,
    "C": 29,
    "D": 40,
    "S": 20,
    "total": 210,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/917.png",
    "ability": [
      "불면"
    ],
    "s_ability": [
      "잠복"
    ]
  },
  {
    "id": 918,
    "number": 918,
    "name": "트래피더",
    "types": [
      "벌레"
    ],
    "H": 60,
    "A": 79,
    "B": 92,
    "C": 52,
    "D": 86,
    "S": 35,
    "total": 404,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/918.png",
    "ability": [
      "불면"
    ],
    "s_ability": [
      "잠복"
    ]
  },
  {
    "id": 919,
    "number": 919,
    "name": "콩알뚜기",
    "types": [
      "벌레"
    ],
    "H": 33,
    "A": 46,
    "B": 40,
    "C": 21,
    "D": 25,
    "S": 45,
    "total": 210,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/919.png",
    "ability": [
      "벌레의알림"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 920,
    "number": 920,
    "name": "엑스레그",
    "types": [
      "벌레",
      "악"
    ],
    "H": 71,
    "A": 102,
    "B": 78,
    "C": 52,
    "D": 55,
    "S": 92,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/920.png",
    "ability": [
      "벌레의알림"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 921,
    "number": 921,
    "name": "빠모",
    "types": [
      "전기"
    ],
    "H": 45,
    "A": 50,
    "B": 20,
    "C": 40,
    "D": 25,
    "S": 60,
    "total": 240,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/921.png",
    "ability": [
      "정전기",
      "자연회복"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 922,
    "number": 922,
    "name": "빠모트",
    "types": [
      "전기",
      "격투"
    ],
    "H": 60,
    "A": 75,
    "B": 40,
    "C": 50,
    "D": 40,
    "S": 85,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/922.png",
    "ability": [
      "축전",
      "자연회복"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 923,
    "number": 923,
    "name": "빠르모트",
    "types": [
      "전기",
      "격투"
    ],
    "H": 70,
    "A": 115,
    "B": 70,
    "C": 70,
    "D": 60,
    "S": 105,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/923.png",
    "ability": [
      "축전",
      "자연회복"
    ],
    "s_ability": [
      "철주먹"
    ]
  },
  {
    "id": 924,
    "number": 924,
    "name": "두리쥐",
    "types": [
      "노말"
    ],
    "H": 50,
    "A": 50,
    "B": 45,
    "C": 40,
    "D": 45,
    "S": 75,
    "total": 305,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/924.png",
    "ability": [
      "도주",
      "픽업"
    ],
    "s_ability": [
      "마이페이스"
    ]
  },
  {
    "id": 925,
    "number": 925,
    "name": "파밀리쥐",
    "types": [
      "노말"
    ],
    "H": 74,
    "A": 75,
    "B": 70,
    "C": 65,
    "D": 75,
    "S": 111,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/925.png",
    "ability": [
      "프렌드가드",
      "볼주머니"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 926,
    "number": 926,
    "name": "쫀도기",
    "types": [
      "페어리"
    ],
    "H": 37,
    "A": 55,
    "B": 70,
    "C": 30,
    "D": 55,
    "S": 65,
    "total": 312,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/926.png",
    "ability": [
      "마이페이스"
    ],
    "s_ability": [
      "서투름"
    ]
  },
  {
    "id": 927,
    "number": 927,
    "name": "바우첼",
    "types": [
      "페어리"
    ],
    "H": 57,
    "A": 80,
    "B": 115,
    "C": 50,
    "D": 80,
    "S": 95,
    "total": 477,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/927.png",
    "ability": [
      "well-baked-body"
    ],
    "s_ability": [
      "아로마베일"
    ]
  },
  {
    "id": 928,
    "number": 928,
    "name": "미니브",
    "types": [
      "풀",
      "노말"
    ],
    "H": 41,
    "A": 35,
    "B": 45,
    "C": 58,
    "D": 51,
    "S": 30,
    "total": 260,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/928.png",
    "ability": [
      "일찍기상"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 929,
    "number": 929,
    "name": "올리뇨",
    "types": [
      "풀",
      "노말"
    ],
    "H": 52,
    "A": 53,
    "B": 60,
    "C": 78,
    "D": 78,
    "S": 33,
    "total": 354,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/929.png",
    "ability": [
      "일찍기상"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 930,
    "number": 930,
    "name": "올리르바",
    "types": [
      "풀",
      "노말"
    ],
    "H": 78,
    "A": 69,
    "B": 90,
    "C": 125,
    "D": 109,
    "S": 39,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/930.png",
    "ability": [
      "seed-sower"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 931,
    "number": 931,
    "name": "시비꼬",
    "types": [
      "노말",
      "비행"
    ],
    "H": 82,
    "A": 96,
    "B": 51,
    "C": 45,
    "D": 51,
    "S": 92,
    "total": 417,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/931.png",
    "ability": [
      "위협",
      "의욕"
    ],
    "s_ability": [
      "근성"
    ]
  },
  {
    "id": 932,
    "number": 932,
    "name": "베베솔트",
    "types": [
      "바위"
    ],
    "H": 55,
    "A": 55,
    "B": 75,
    "C": 35,
    "D": 35,
    "S": 25,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/932.png",
    "ability": [
      "purifying-salt",
      "옹골참"
    ],
    "s_ability": [
      "클리어바디"
    ]
  },
  {
    "id": 933,
    "number": 933,
    "name": "스태솔트",
    "types": [
      "바위"
    ],
    "H": 60,
    "A": 60,
    "B": 100,
    "C": 35,
    "D": 65,
    "S": 35,
    "total": 355,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/933.png",
    "ability": [
      "purifying-salt",
      "옹골참"
    ],
    "s_ability": [
      "클리어바디"
    ]
  },
  {
    "id": 934,
    "number": 934,
    "name": "콜로솔트",
    "types": [
      "바위"
    ],
    "H": 100,
    "A": 100,
    "B": 130,
    "C": 45,
    "D": 90,
    "S": 35,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/934.png",
    "ability": [
      "purifying-salt",
      "옹골참"
    ],
    "s_ability": [
      "클리어바디"
    ]
  },
  {
    "id": 935,
    "number": 935,
    "name": "카르본",
    "types": [
      "불꽃"
    ],
    "H": 40,
    "A": 50,
    "B": 40,
    "C": 50,
    "D": 40,
    "S": 35,
    "total": 255,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/935.png",
    "ability": [
      "타오르는불꽃"
    ],
    "s_ability": [
      "불꽃몸"
    ]
  },
  {
    "id": 936,
    "number": 936,
    "name": "카디나르마",
    "types": [
      "불꽃",
      "에스퍼"
    ],
    "H": 85,
    "A": 60,
    "B": 100,
    "C": 125,
    "D": 80,
    "S": 75,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/936.png",
    "ability": [
      "타오르는불꽃"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 937,
    "number": 937,
    "name": "파라블레이즈",
    "types": [
      "불꽃",
      "고스트"
    ],
    "H": 75,
    "A": 125,
    "B": 80,
    "C": 60,
    "D": 100,
    "S": 85,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/937.png",
    "ability": [
      "타오르는불꽃"
    ],
    "s_ability": [
      "깨어진갑옷"
    ]
  },
  {
    "id": 938,
    "number": 938,
    "name": "빈나두",
    "types": [
      "전기"
    ],
    "H": 61,
    "A": 31,
    "B": 41,
    "C": 59,
    "D": 35,
    "S": 45,
    "total": 272,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/938.png",
    "ability": [
      "마이페이스",
      "정전기"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 939,
    "number": 939,
    "name": "찌리배리",
    "types": [
      "전기"
    ],
    "H": 109,
    "A": 64,
    "B": 91,
    "C": 103,
    "D": 83,
    "S": 45,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/939.png",
    "ability": [
      "electromorphosis",
      "정전기"
    ],
    "s_ability": [
      "습기"
    ]
  },
  {
    "id": 940,
    "number": 940,
    "name": "찌리비",
    "types": [
      "전기",
      "비행"
    ],
    "H": 40,
    "A": 40,
    "B": 35,
    "C": 55,
    "D": 40,
    "S": 70,
    "total": 280,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/940.png",
    "ability": [
      "wind-power",
      "축전"
    ],
    "s_ability": [
      "승기"
    ]
  },
  {
    "id": 941,
    "number": 941,
    "name": "찌리비크",
    "types": [
      "전기",
      "비행"
    ],
    "H": 70,
    "A": 70,
    "B": 60,
    "C": 105,
    "D": 60,
    "S": 125,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/941.png",
    "ability": [
      "wind-power",
      "축전"
    ],
    "s_ability": [
      "승기"
    ]
  },
  {
    "id": 942,
    "number": 942,
    "name": "오라티프",
    "types": [
      "악"
    ],
    "H": 60,
    "A": 78,
    "B": 60,
    "C": 40,
    "D": 51,
    "S": 51,
    "total": 340,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/942.png",
    "ability": [
      "위협",
      "도주"
    ],
    "s_ability": [
      "잠복"
    ]
  },
  {
    "id": 943,
    "number": 943,
    "name": "마피티프",
    "types": [
      "악"
    ],
    "H": 80,
    "A": 120,
    "B": 90,
    "C": 60,
    "D": 70,
    "S": 85,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/943.png",
    "ability": [
      "위협",
      "guard-dog"
    ],
    "s_ability": [
      "잠복"
    ]
  },
  {
    "id": 944,
    "number": 944,
    "name": "땃쭈르",
    "types": [
      "독",
      "노말"
    ],
    "H": 40,
    "A": 65,
    "B": 35,
    "C": 40,
    "D": 35,
    "S": 75,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/944.png",
    "ability": [
      "곡예",
      "나쁜손버릇"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 945,
    "number": 945,
    "name": "태깅구르",
    "types": [
      "독",
      "노말"
    ],
    "H": 63,
    "A": 95,
    "B": 65,
    "C": 80,
    "D": 72,
    "S": 110,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/945.png",
    "ability": [
      "곡예",
      "독수"
    ],
    "s_ability": [
      "짓궂은마음"
    ]
  },
  {
    "id": 946,
    "number": 946,
    "name": "그푸리",
    "types": [
      "풀",
      "고스트"
    ],
    "H": 40,
    "A": 65,
    "B": 30,
    "C": 45,
    "D": 35,
    "S": 60,
    "total": 275,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/946.png",
    "ability": [
      "wind-rider"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 947,
    "number": 947,
    "name": "공푸리",
    "types": [
      "풀",
      "고스트"
    ],
    "H": 55,
    "A": 115,
    "B": 70,
    "C": 80,
    "D": 70,
    "S": 90,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/947.png",
    "ability": [
      "wind-rider"
    ],
    "s_ability": [
      "틈새포착"
    ]
  },
  {
    "id": 948,
    "number": 948,
    "name": "들눈해",
    "types": [
      "땅",
      "풀"
    ],
    "H": 40,
    "A": 40,
    "B": 35,
    "C": 50,
    "D": 100,
    "S": 70,
    "total": 335,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/948.png",
    "ability": [
      "mycelium-might"
    ],
    "s_ability": []
  },
  {
    "id": 949,
    "number": 949,
    "name": "육파리",
    "types": [
      "땅",
      "풀"
    ],
    "H": 80,
    "A": 70,
    "B": 65,
    "C": 80,
    "D": 120,
    "S": 100,
    "total": 515,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/949.png",
    "ability": [
      "mycelium-might"
    ],
    "s_ability": []
  },
  {
    "id": 950,
    "number": 950,
    "name": "절벼게",
    "types": [
      "바위"
    ],
    "H": 70,
    "A": 100,
    "B": 115,
    "C": 35,
    "D": 55,
    "S": 75,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/950.png",
    "ability": [
      "anger-shell",
      "조가비갑옷"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 951,
    "number": 951,
    "name": "캡싸이",
    "types": [
      "풀"
    ],
    "H": 50,
    "A": 62,
    "B": 40,
    "C": 62,
    "D": 40,
    "S": 50,
    "total": 304,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/951.png",
    "ability": [
      "엽록소",
      "불면"
    ],
    "s_ability": [
      "서투름"
    ]
  },
  {
    "id": 952,
    "number": 952,
    "name": "스코빌런",
    "types": [
      "풀",
      "불꽃"
    ],
    "H": 65,
    "A": 108,
    "B": 65,
    "C": 108,
    "D": 65,
    "S": 75,
    "total": 486,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/952.png",
    "ability": [
      "엽록소",
      "불면"
    ],
    "s_ability": [
      "변덕쟁이"
    ]
  },
  {
    "id": 953,
    "number": 953,
    "name": "구르데",
    "types": [
      "벌레"
    ],
    "H": 41,
    "A": 50,
    "B": 60,
    "C": 31,
    "D": 58,
    "S": 30,
    "total": 270,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/953.png",
    "ability": [
      "복안"
    ],
    "s_ability": [
      "탈피"
    ]
  },
  {
    "id": 954,
    "number": 954,
    "name": "베라카스",
    "types": [
      "벌레",
      "에스퍼"
    ],
    "H": 75,
    "A": 50,
    "B": 85,
    "C": 115,
    "D": 100,
    "S": 45,
    "total": 470,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/954.png",
    "ability": [
      "싱크로"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 955,
    "number": 955,
    "name": "하느라기",
    "types": [
      "에스퍼"
    ],
    "H": 30,
    "A": 35,
    "B": 30,
    "C": 55,
    "D": 30,
    "S": 75,
    "total": 255,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/955.png",
    "ability": [
      "위험예지",
      "통찰"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 956,
    "number": 956,
    "name": "클레스퍼트라",
    "types": [
      "에스퍼"
    ],
    "H": 95,
    "A": 60,
    "B": 60,
    "C": 101,
    "D": 60,
    "S": 105,
    "total": 481,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/956.png",
    "ability": [
      "opportunist",
      "통찰"
    ],
    "s_ability": [
      "가속"
    ]
  },
  {
    "id": 957,
    "number": 957,
    "name": "어리짱",
    "types": [
      "페어리",
      "강철"
    ],
    "H": 50,
    "A": 45,
    "B": 45,
    "C": 35,
    "D": 64,
    "S": 58,
    "total": 297,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/957.png",
    "ability": [
      "틀깨기",
      "마이페이스"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 958,
    "number": 958,
    "name": "벼리짱",
    "types": [
      "페어리",
      "강철"
    ],
    "H": 65,
    "A": 55,
    "B": 55,
    "C": 45,
    "D": 82,
    "S": 78,
    "total": 380,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/958.png",
    "ability": [
      "틀깨기",
      "마이페이스"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 959,
    "number": 959,
    "name": "두드리짱",
    "types": [
      "페어리",
      "강철"
    ],
    "H": 85,
    "A": 75,
    "B": 77,
    "C": 70,
    "D": 105,
    "S": 94,
    "total": 506,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/959.png",
    "ability": [
      "틀깨기",
      "마이페이스"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 960,
    "number": 960,
    "name": "바다그다",
    "types": [
      "물"
    ],
    "H": 10,
    "A": 55,
    "B": 25,
    "C": 35,
    "D": 25,
    "S": 95,
    "total": 245,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/960.png",
    "ability": [
      "미끈미끈",
      "주눅"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 961,
    "number": 961,
    "name": "바닥트리오",
    "types": [
      "물"
    ],
    "H": 35,
    "A": 100,
    "B": 50,
    "C": 50,
    "D": 70,
    "S": 120,
    "total": 425,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/961.png",
    "ability": [
      "미끈미끈",
      "주눅"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 962,
    "number": 962,
    "name": "떨구새",
    "types": [
      "비행",
      "악"
    ],
    "H": 70,
    "A": 103,
    "B": 85,
    "C": 60,
    "D": 85,
    "S": 82,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/962.png",
    "ability": [
      "부풀린가슴",
      "날카로운눈"
    ],
    "s_ability": [
      "rocky-payload"
    ]
  },
  {
    "id": 963,
    "number": 963,
    "name": "맨돌핀",
    "types": [
      "물"
    ],
    "H": 70,
    "A": 45,
    "B": 40,
    "C": 45,
    "D": 40,
    "S": 75,
    "total": 315,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/963.png",
    "ability": [
      "수의베일"
    ],
    "s_ability": []
  },
  {
    "id": 964,
    "number": 964,
    "name": "돌핀맨",
    "types": [
      "물"
    ],
    "H": 100,
    "A": 70,
    "B": 72,
    "C": 53,
    "D": 62,
    "S": 100,
    "total": 457,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/964.png",
    "ability": [
      "zero-to-hero"
    ],
    "s_ability": []
  },
  {
    "id": 965,
    "number": 965,
    "name": "부르롱",
    "types": [
      "강철",
      "독"
    ],
    "H": 45,
    "A": 70,
    "B": 63,
    "C": 30,
    "D": 45,
    "S": 47,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/965.png",
    "ability": [
      "방진"
    ],
    "s_ability": [
      "슬로스타트"
    ]
  },
  {
    "id": 966,
    "number": 966,
    "name": "부르르룸",
    "types": [
      "강철",
      "독"
    ],
    "H": 80,
    "A": 119,
    "B": 90,
    "C": 54,
    "D": 67,
    "S": 90,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/966.png",
    "ability": [
      "방진"
    ],
    "s_ability": [
      "필터"
    ]
  },
  {
    "id": 967,
    "number": 967,
    "name": "모토마",
    "types": [
      "드래곤",
      "노말"
    ],
    "H": 70,
    "A": 95,
    "B": 65,
    "C": 85,
    "D": 65,
    "S": 121,
    "total": 501,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/967.png",
    "ability": [
      "탈피"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 968,
    "number": 968,
    "name": "꿈트렁",
    "types": [
      "강철"
    ],
    "H": 70,
    "A": 85,
    "B": 145,
    "C": 60,
    "D": 55,
    "S": 65,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/968.png",
    "ability": [
      "earth-eater"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 969,
    "number": 969,
    "name": "초롱순",
    "types": [
      "바위",
      "독"
    ],
    "H": 48,
    "A": 35,
    "B": 42,
    "C": 105,
    "D": 60,
    "S": 60,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/969.png",
    "ability": [
      "toxic-debris"
    ],
    "s_ability": [
      "부식"
    ]
  },
  {
    "id": 970,
    "number": 970,
    "name": "킬라플로르",
    "types": [
      "바위",
      "독"
    ],
    "H": 83,
    "A": 55,
    "B": 90,
    "C": 130,
    "D": 81,
    "S": 86,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/970.png",
    "ability": [
      "toxic-debris"
    ],
    "s_ability": [
      "부식"
    ]
  },
  {
    "id": 971,
    "number": 971,
    "name": "망망이",
    "types": [
      "고스트"
    ],
    "H": 50,
    "A": 61,
    "B": 60,
    "C": 30,
    "D": 55,
    "S": 34,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/971.png",
    "ability": [
      "픽업"
    ],
    "s_ability": [
      "복슬복슬"
    ]
  },
  {
    "id": 972,
    "number": 972,
    "name": "묘두기",
    "types": [
      "고스트"
    ],
    "H": 72,
    "A": 101,
    "B": 100,
    "C": 50,
    "D": 97,
    "S": 68,
    "total": 488,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/972.png",
    "ability": [
      "모래헤치기"
    ],
    "s_ability": [
      "복슬복슬"
    ]
  },
  {
    "id": 973,
    "number": 973,
    "name": "꼬이밍고",
    "types": [
      "비행",
      "격투"
    ],
    "H": 82,
    "A": 115,
    "B": 74,
    "C": 75,
    "D": 64,
    "S": 90,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/973.png",
    "ability": [
      "배짱",
      "갈지자걸음"
    ],
    "s_ability": [
      "costar"
    ]
  },
  {
    "id": 974,
    "number": 974,
    "name": "터벅고래",
    "types": [
      "얼음"
    ],
    "H": 108,
    "A": 68,
    "B": 45,
    "C": 30,
    "D": 40,
    "S": 43,
    "total": 334,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/974.png",
    "ability": [
      "두꺼운지방",
      "눈숨기"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 975,
    "number": 975,
    "name": "우락고래",
    "types": [
      "얼음"
    ],
    "H": 170,
    "A": 113,
    "B": 65,
    "C": 45,
    "D": 55,
    "S": 73,
    "total": 521,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/975.png",
    "ability": [
      "두꺼운지방",
      "눈치우기"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 976,
    "number": 976,
    "name": "가비루사",
    "types": [
      "물",
      "에스퍼"
    ],
    "H": 90,
    "A": 102,
    "B": 73,
    "C": 78,
    "D": 65,
    "S": 70,
    "total": 478,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/976.png",
    "ability": [
      "틀깨기"
    ],
    "s_ability": [
      "sharpness"
    ]
  },
  {
    "id": 977,
    "number": 977,
    "name": "어써러셔",
    "types": [
      "물"
    ],
    "H": 150,
    "A": 100,
    "B": 115,
    "C": 65,
    "D": 65,
    "S": 35,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/977.png",
    "ability": [
      "천진",
      "둔감"
    ],
    "s_ability": [
      "수의베일"
    ]
  },
  {
    "id": 978,
    "number": 978,
    "name": "싸리용",
    "types": [
      "드래곤",
      "물"
    ],
    "H": 68,
    "A": 50,
    "B": 60,
    "C": 120,
    "D": 95,
    "S": 82,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/978.png",
    "ability": [
      "commander"
    ],
    "s_ability": [
      "마중물"
    ]
  },
  {
    "id": 979,
    "number": 979,
    "name": "저승갓숭",
    "types": [
      "격투",
      "고스트"
    ],
    "H": 110,
    "A": 115,
    "B": 80,
    "C": 50,
    "D": 90,
    "S": 90,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/979.png",
    "ability": [
      "의기양양",
      "정신력"
    ],
    "s_ability": [
      "오기"
    ]
  },
  {
    "id": 980,
    "number": 980,
    "name": "토오",
    "types": [
      "독",
      "땅"
    ],
    "H": 130,
    "A": 75,
    "B": 60,
    "C": 45,
    "D": 100,
    "S": 20,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/980.png",
    "ability": [
      "독가시",
      "저수"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 981,
    "number": 981,
    "name": "키키링",
    "types": [
      "노말",
      "에스퍼"
    ],
    "H": 120,
    "A": 90,
    "B": 70,
    "C": 110,
    "D": 70,
    "S": 60,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/981.png",
    "ability": [
      "cud-chew",
      "armor-tail"
    ],
    "s_ability": [
      "초식"
    ]
  },
  {
    "id": 982,
    "number": 982,
    "name": "노고고치",
    "types": [
      "노말"
    ],
    "H": 125,
    "A": 100,
    "B": 80,
    "C": 85,
    "D": 75,
    "S": 55,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/982.png",
    "ability": [
      "하늘의은총",
      "도주"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 983,
    "number": 983,
    "name": "대도각참",
    "types": [
      "악",
      "강철"
    ],
    "H": 100,
    "A": 135,
    "B": 120,
    "C": 60,
    "D": 85,
    "S": 50,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/983.png",
    "ability": [
      "오기",
      "supreme-overlord"
    ],
    "s_ability": [
      "프레셔"
    ]
  },
  {
    "id": 984,
    "number": 984,
    "name": "위대한엄니",
    "types": [
      "땅",
      "격투"
    ],
    "H": 115,
    "A": 131,
    "B": 131,
    "C": 53,
    "D": 53,
    "S": 87,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/984.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 985,
    "number": 985,
    "name": "우렁찬꼬리",
    "types": [
      "페어리",
      "에스퍼"
    ],
    "H": 115,
    "A": 65,
    "B": 99,
    "C": 65,
    "D": 115,
    "S": 111,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/985.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 986,
    "number": 986,
    "name": "사나운버섯",
    "types": [
      "풀",
      "악"
    ],
    "H": 111,
    "A": 127,
    "B": 99,
    "C": 79,
    "D": 99,
    "S": 55,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/986.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 987,
    "number": 987,
    "name": "날개치는머리",
    "types": [
      "고스트",
      "페어리"
    ],
    "H": 55,
    "A": 55,
    "B": 55,
    "C": 135,
    "D": 135,
    "S": 135,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/987.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 988,
    "number": 988,
    "name": "땅을기는날개",
    "types": [
      "벌레",
      "격투"
    ],
    "H": 85,
    "A": 135,
    "B": 79,
    "C": 85,
    "D": 105,
    "S": 81,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/988.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 989,
    "number": 989,
    "name": "모래털가죽",
    "types": [
      "전기",
      "땅"
    ],
    "H": 85,
    "A": 81,
    "B": 97,
    "C": 121,
    "D": 85,
    "S": 101,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/989.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 990,
    "number": 990,
    "name": "무쇠바퀴",
    "types": [
      "땅",
      "강철"
    ],
    "H": 90,
    "A": 112,
    "B": 120,
    "C": 72,
    "D": 70,
    "S": 106,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/990.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 991,
    "number": 991,
    "name": "무쇠보따리",
    "types": [
      "얼음",
      "물"
    ],
    "H": 56,
    "A": 80,
    "B": 114,
    "C": 124,
    "D": 60,
    "S": 136,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/991.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 992,
    "number": 992,
    "name": "무쇠손",
    "types": [
      "격투",
      "전기"
    ],
    "H": 154,
    "A": 140,
    "B": 108,
    "C": 50,
    "D": 68,
    "S": 50,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/992.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 993,
    "number": 993,
    "name": "무쇠머리",
    "types": [
      "악",
      "비행"
    ],
    "H": 94,
    "A": 80,
    "B": 86,
    "C": 122,
    "D": 80,
    "S": 108,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/993.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 994,
    "number": 994,
    "name": "무쇠독나방",
    "types": [
      "불꽃",
      "독"
    ],
    "H": 80,
    "A": 70,
    "B": 60,
    "C": 140,
    "D": 110,
    "S": 110,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/994.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 995,
    "number": 995,
    "name": "무쇠가시",
    "types": [
      "바위",
      "전기"
    ],
    "H": 100,
    "A": 134,
    "B": 110,
    "C": 70,
    "D": 84,
    "S": 72,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/995.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 996,
    "number": 996,
    "name": "드니차",
    "types": [
      "드래곤",
      "얼음"
    ],
    "H": 65,
    "A": 75,
    "B": 45,
    "C": 35,
    "D": 45,
    "S": 55,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/996.png",
    "ability": [
      "thermal-exchange"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 997,
    "number": 997,
    "name": "드니꽁",
    "types": [
      "드래곤",
      "얼음"
    ],
    "H": 90,
    "A": 95,
    "B": 66,
    "C": 45,
    "D": 65,
    "S": 62,
    "total": 423,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/997.png",
    "ability": [
      "thermal-exchange"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 998,
    "number": 998,
    "name": "드닐레이브",
    "types": [
      "드래곤",
      "얼음"
    ],
    "H": 115,
    "A": 145,
    "B": 92,
    "C": 75,
    "D": 86,
    "S": 87,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/998.png",
    "ability": [
      "thermal-exchange"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 999,
    "number": 999,
    "name": "모으령",
    "types": [
      "고스트"
    ],
    "H": 45,
    "A": 30,
    "B": 70,
    "C": 75,
    "D": 70,
    "S": 10,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/999.png",
    "ability": [
      "주눅"
    ],
    "s_ability": []
  },
  {
    "id": 1000,
    "number": 1000,
    "name": "타부자고",
    "types": [
      "강철",
      "고스트"
    ],
    "H": 87,
    "A": 60,
    "B": 95,
    "C": 133,
    "D": 91,
    "S": 84,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1000.png",
    "ability": [
      "good-as-gold"
    ],
    "s_ability": []
  },
  {
    "id": 1001,
    "number": 1001,
    "name": "총지엔",
    "types": [
      "악",
      "풀"
    ],
    "H": 85,
    "A": 85,
    "B": 100,
    "C": 95,
    "D": 135,
    "S": 70,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1001.png",
    "ability": [
      "tablets-of-ruin"
    ],
    "s_ability": []
  },
  {
    "id": 1002,
    "number": 1002,
    "name": "파오젠",
    "types": [
      "악",
      "얼음"
    ],
    "H": 80,
    "A": 120,
    "B": 80,
    "C": 90,
    "D": 65,
    "S": 135,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1002.png",
    "ability": [
      "sword-of-ruin"
    ],
    "s_ability": []
  },
  {
    "id": 1003,
    "number": 1003,
    "name": "딩루",
    "types": [
      "악",
      "땅"
    ],
    "H": 155,
    "A": 110,
    "B": 125,
    "C": 55,
    "D": 80,
    "S": 45,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1003.png",
    "ability": [
      "vessel-of-ruin"
    ],
    "s_ability": []
  },
  {
    "id": 1004,
    "number": 1004,
    "name": "위유이",
    "types": [
      "악",
      "불꽃"
    ],
    "H": 55,
    "A": 80,
    "B": 80,
    "C": 135,
    "D": 120,
    "S": 100,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1004.png",
    "ability": [
      "beads-of-ruin"
    ],
    "s_ability": []
  },
  {
    "id": 1005,
    "number": 1005,
    "name": "고동치는달",
    "types": [
      "드래곤",
      "악"
    ],
    "H": 105,
    "A": 139,
    "B": 71,
    "C": 55,
    "D": 101,
    "S": 119,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1005.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 1006,
    "number": 1006,
    "name": "무쇠무인",
    "types": [
      "페어리",
      "격투"
    ],
    "H": 74,
    "A": 130,
    "B": 90,
    "C": 120,
    "D": 60,
    "S": 116,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1006.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 1007,
    "number": 1007,
    "name": "코라이돈",
    "types": [
      "격투",
      "드래곤"
    ],
    "H": 100,
    "A": 135,
    "B": 115,
    "C": 85,
    "D": 100,
    "S": 135,
    "total": 670,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1007.png",
    "ability": [
      "orichalcum-pulse"
    ],
    "s_ability": []
  },
  {
    "id": 1008,
    "number": 1008,
    "name": "미라이돈",
    "types": [
      "전기",
      "드래곤"
    ],
    "H": 100,
    "A": 85,
    "B": 100,
    "C": 135,
    "D": 115,
    "S": 135,
    "total": 670,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1008.png",
    "ability": [
      "hadron-engine"
    ],
    "s_ability": []
  },
  {
    "id": 1009,
    "number": 1009,
    "name": "굽이치는물결",
    "types": [
      "물",
      "드래곤"
    ],
    "H": 99,
    "A": 83,
    "B": 91,
    "C": 125,
    "D": 83,
    "S": 109,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1009.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 1010,
    "number": 1010,
    "name": "무쇠잎새",
    "types": [
      "풀",
      "에스퍼"
    ],
    "H": 90,
    "A": 130,
    "B": 88,
    "C": 70,
    "D": 108,
    "S": 104,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1010.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 1011,
    "number": 1011,
    "name": "과미르",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 80,
    "A": 80,
    "B": 110,
    "C": 95,
    "D": 80,
    "S": 40,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1011.png",
    "ability": [
      "감미로운꿀",
      "먹보"
    ],
    "s_ability": [
      "점착"
    ]
  },
  {
    "id": 1012,
    "number": 1012,
    "name": "차데스",
    "types": [
      "풀",
      "고스트"
    ],
    "H": 40,
    "A": 45,
    "B": 45,
    "C": 74,
    "D": 54,
    "S": 50,
    "total": 308,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1012.png",
    "ability": [
      "대접"
    ],
    "s_ability": [
      "내열"
    ]
  },
  {
    "id": 1013,
    "number": 1013,
    "name": "그우린차",
    "types": [
      "풀",
      "고스트"
    ],
    "H": 71,
    "A": 60,
    "B": 106,
    "C": 121,
    "D": 80,
    "S": 70,
    "total": 508,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1013.png",
    "ability": [
      "대접"
    ],
    "s_ability": [
      "내열"
    ]
  },
  {
    "id": 1014,
    "number": 1014,
    "name": "조타구",
    "types": [
      "독",
      "격투"
    ],
    "H": 88,
    "A": 128,
    "B": 115,
    "C": 58,
    "D": 86,
    "S": 80,
    "total": 555,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1014.png",
    "ability": [
      "독사슬"
    ],
    "s_ability": [
      "guard-dog"
    ]
  },
  {
    "id": 1015,
    "number": 1015,
    "name": "이야후",
    "types": [
      "독",
      "에스퍼"
    ],
    "H": 88,
    "A": 75,
    "B": 66,
    "C": 130,
    "D": 90,
    "S": 106,
    "total": 555,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1015.png",
    "ability": [
      "독사슬"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 1016,
    "number": 1016,
    "name": "기로치",
    "types": [
      "독",
      "페어리"
    ],
    "H": 88,
    "A": 91,
    "B": 82,
    "C": 70,
    "D": 125,
    "S": 99,
    "total": 555,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1016.png",
    "ability": [
      "독사슬"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 1017,
    "number": 1017,
    "name": "오거폰",
    "types": [
      "풀"
    ],
    "H": 80,
    "A": 120,
    "B": 84,
    "C": 60,
    "D": 96,
    "S": 110,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1017.png",
    "ability": [
      "오기"
    ],
    "s_ability": []
  },
  {
    "id": 1018,
    "number": 1018,
    "name": "브리두라스",
    "types": [
      "강철",
      "드래곤"
    ],
    "H": 90,
    "A": 105,
    "B": 130,
    "C": 125,
    "D": 65,
    "S": 85,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1018.png",
    "ability": [
      "지구력",
      "옹골참"
    ],
    "s_ability": [
      "굳건한신념"
    ]
  },
  {
    "id": 1019,
    "number": 1019,
    "name": "과미드라",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 106,
    "A": 80,
    "B": 110,
    "C": 120,
    "D": 80,
    "S": 44,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1019.png",
    "ability": [
      "감미로운꿀",
      "재생력"
    ],
    "s_ability": [
      "점착"
    ]
  },
  {
    "id": 1020,
    "number": 1020,
    "name": "꿰뚫는화염",
    "types": [
      "불꽃",
      "드래곤"
    ],
    "H": 105,
    "A": 115,
    "B": 121,
    "C": 65,
    "D": 93,
    "S": 91,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1020.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 1021,
    "number": 1021,
    "name": "날뛰는우레",
    "types": [
      "전기",
      "드래곤"
    ],
    "H": 125,
    "A": 73,
    "B": 91,
    "C": 137,
    "D": 89,
    "S": 75,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1021.png",
    "ability": [
      "protosynthesis"
    ],
    "s_ability": []
  },
  {
    "id": 1022,
    "number": 1022,
    "name": "무쇠암석",
    "types": [
      "바위",
      "에스퍼"
    ],
    "H": 90,
    "A": 120,
    "B": 80,
    "C": 68,
    "D": 108,
    "S": 124,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1022.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 1023,
    "number": 1023,
    "name": "무쇠감투",
    "types": [
      "강철",
      "에스퍼"
    ],
    "H": 90,
    "A": 72,
    "B": 100,
    "C": 122,
    "D": 108,
    "S": 98,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1023.png",
    "ability": [
      "quark-drive"
    ],
    "s_ability": []
  },
  {
    "id": 1024,
    "number": 1024,
    "name": "테라파고스",
    "types": [
      "노말"
    ],
    "H": 90,
    "A": 65,
    "B": 85,
    "C": 65,
    "D": 85,
    "S": 60,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1024.png",
    "ability": [
      "테라체인지"
    ],
    "s_ability": []
  },
  {
    "id": 1025,
    "number": 1025,
    "name": "복숭악동",
    "types": [
      "독",
      "고스트"
    ],
    "H": 88,
    "A": 88,
    "B": 160,
    "C": 88,
    "D": 88,
    "S": 88,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1025.png",
    "ability": [
      "독조종"
    ],
    "s_ability": []
  },
  {
    "id": 1026,
    "number": 386,
    "name": "테오키스 공격폼",
    "types": [
      "에스퍼"
    ],
    "H": 50,
    "A": 180,
    "B": 20,
    "C": 180,
    "D": 20,
    "S": 150,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10001.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": []
  },
  {
    "id": 1027,
    "number": 386,
    "name": "테오키스 방어폼",
    "types": [
      "에스퍼"
    ],
    "H": 50,
    "A": 70,
    "B": 160,
    "C": 70,
    "D": 160,
    "S": 90,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10002.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": []
  },
  {
    "id": 1028,
    "number": 386,
    "name": "테오키스 스피드폼",
    "types": [
      "에스퍼"
    ],
    "H": 50,
    "A": 95,
    "B": 90,
    "C": 95,
    "D": 90,
    "S": 180,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10003.png",
    "ability": [
      "프레셔"
    ],
    "s_ability": []
  },
  {
    "id": 1029,
    "number": 479,
    "name": "히트 로토무",
    "types": [
      "전기",
      "불꽃"
    ],
    "H": 50,
    "A": 65,
    "B": 107,
    "C": 105,
    "D": 107,
    "S": 86,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10008.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1030,
    "number": 479,
    "name": "워시 로토무",
    "types": [
      "전기",
      "물"
    ],
    "H": 50,
    "A": 65,
    "B": 107,
    "C": 105,
    "D": 107,
    "S": 86,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10009.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1031,
    "number": 479,
    "name": "프로스트 로토무",
    "types": [
      "전기",
      "얼음"
    ],
    "H": 50,
    "A": 65,
    "B": 107,
    "C": 105,
    "D": 107,
    "S": 86,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10010.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1032,
    "number": 479,
    "name": "스핀 로토무",
    "types": [
      "전기",
      "비행"
    ],
    "H": 50,
    "A": 65,
    "B": 107,
    "C": 105,
    "D": 107,
    "S": 86,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10011.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1033,
    "number": 479,
    "name": "커트 로토무",
    "types": [
      "전기",
      "풀"
    ],
    "H": 50,
    "A": 65,
    "B": 107,
    "C": 105,
    "D": 107,
    "S": 86,
    "total": 520,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10012.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1034,
    "number": 648,
    "name": "메로엣타 스텝폼",
    "types": [
      "노말",
      "격투"
    ],
    "H": 100,
    "A": 128,
    "B": 90,
    "C": 77,
    "D": 77,
    "S": 128,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10018.png",
    "ability": [
      "하늘의은총"
    ],
    "s_ability": []
  },
  {
    "id": 1035,
    "number": 3,
    "name": "메가 이상해꽃",
    "types": [
      "풀",
      "독"
    ],
    "H": 80,
    "A": 100,
    "B": 123,
    "C": 122,
    "D": 120,
    "S": 80,
    "total": 625,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10033.png",
    "ability": [
      "두꺼운지방"
    ],
    "s_ability": []
  },
  {
    "id": 1036,
    "number": 6,
    "name": "메가 리자몽 X",
    "types": [
      "불꽃",
      "드래곤"
    ],
    "H": 78,
    "A": 130,
    "B": 111,
    "C": 130,
    "D": 85,
    "S": 100,
    "total": 634,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10034.png",
    "ability": [
      "단단한발톱"
    ],
    "s_ability": []
  },
  {
    "id": 1037,
    "number": 6,
    "name": "메가 리자몽 Y",
    "types": [
      "불꽃",
      "비행"
    ],
    "H": 78,
    "A": 104,
    "B": 78,
    "C": 159,
    "D": 115,
    "S": 100,
    "total": 634,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10035.png",
    "ability": [
      "가뭄"
    ],
    "s_ability": []
  },
  {
    "id": 1038,
    "number": 9,
    "name": "메가 거북왕",
    "types": [
      "물"
    ],
    "H": 79,
    "A": 103,
    "B": 120,
    "C": 135,
    "D": 115,
    "S": 78,
    "total": 630,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10036.png",
    "ability": [
      "메가런처"
    ],
    "s_ability": []
  },
  {
    "id": 1039,
    "number": 65,
    "name": "메가 후딘",
    "types": [
      "에스퍼"
    ],
    "H": 55,
    "A": 50,
    "B": 65,
    "C": 175,
    "D": 105,
    "S": 150,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10037.png",
    "ability": [
      "트레이스"
    ],
    "s_ability": []
  },
  {
    "id": 1040,
    "number": 94,
    "name": "메가 팬텀",
    "types": [
      "고스트",
      "독"
    ],
    "H": 60,
    "A": 65,
    "B": 80,
    "C": 170,
    "D": 95,
    "S": 130,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10038.png",
    "ability": [
      "그림자밟기"
    ],
    "s_ability": []
  },
  {
    "id": 1041,
    "number": 115,
    "name": "메가 캥카",
    "types": [
      "노말"
    ],
    "H": 105,
    "A": 125,
    "B": 100,
    "C": 60,
    "D": 100,
    "S": 100,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10039.png",
    "ability": [
      "부자유친"
    ],
    "s_ability": []
  },
  {
    "id": 1042,
    "number": 127,
    "name": "메가 쁘사이저",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 65,
    "A": 155,
    "B": 120,
    "C": 65,
    "D": 90,
    "S": 105,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10040.png",
    "ability": [
      "스카이스킨"
    ],
    "s_ability": []
  },
  {
    "id": 1043,
    "number": 130,
    "name": "메가 갸라도스",
    "types": [
      "물",
      "악"
    ],
    "H": 95,
    "A": 155,
    "B": 109,
    "C": 70,
    "D": 130,
    "S": 81,
    "total": 640,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10041.png",
    "ability": [
      "틀깨기"
    ],
    "s_ability": []
  },
  {
    "id": 1044,
    "number": 142,
    "name": "메가 프테라",
    "types": [
      "바위",
      "비행"
    ],
    "H": 80,
    "A": 135,
    "B": 85,
    "C": 70,
    "D": 95,
    "S": 150,
    "total": 615,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10042.png",
    "ability": [
      "단단한발톱"
    ],
    "s_ability": []
  },
  {
    "id": 1045,
    "number": 150,
    "name": "메가 뮤츠 X",
    "types": [
      "에스퍼",
      "격투"
    ],
    "H": 106,
    "A": 190,
    "B": 100,
    "C": 154,
    "D": 100,
    "S": 130,
    "total": 780,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10043.png",
    "ability": [
      "불굴의마음"
    ],
    "s_ability": []
  },
  {
    "id": 1046,
    "number": 150,
    "name": "메가 뮤츠 Y",
    "types": [
      "에스퍼"
    ],
    "H": 106,
    "A": 150,
    "B": 70,
    "C": 194,
    "D": 120,
    "S": 140,
    "total": 780,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10044.png",
    "ability": [
      "불면"
    ],
    "s_ability": []
  },
  {
    "id": 1047,
    "number": 181,
    "name": "메가 전룡",
    "types": [
      "전기",
      "드래곤"
    ],
    "H": 90,
    "A": 95,
    "B": 105,
    "C": 165,
    "D": 110,
    "S": 45,
    "total": 610,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10045.png",
    "ability": [
      "틀깨기"
    ],
    "s_ability": []
  },
  {
    "id": 1048,
    "number": 212,
    "name": "메가 핫삼",
    "types": [
      "벌레",
      "강철"
    ],
    "H": 70,
    "A": 150,
    "B": 140,
    "C": 65,
    "D": 100,
    "S": 75,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10046.png",
    "ability": [
      "테크니션"
    ],
    "s_ability": []
  },
  {
    "id": 1049,
    "number": 214,
    "name": "메가 헤라크로스",
    "types": [
      "벌레",
      "격투"
    ],
    "H": 80,
    "A": 185,
    "B": 115,
    "C": 40,
    "D": 105,
    "S": 75,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10047.png",
    "ability": [
      "스킬링크"
    ],
    "s_ability": []
  },
  {
    "id": 1050,
    "number": 229,
    "name": "메가 헬가",
    "types": [
      "악",
      "불꽃"
    ],
    "H": 75,
    "A": 90,
    "B": 90,
    "C": 140,
    "D": 90,
    "S": 115,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10048.png",
    "ability": [
      "선파워"
    ],
    "s_ability": []
  },
  {
    "id": 1051,
    "number": 248,
    "name": "메가 마기라스",
    "types": [
      "바위",
      "악"
    ],
    "H": 100,
    "A": 164,
    "B": 150,
    "C": 95,
    "D": 120,
    "S": 71,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10049.png",
    "ability": [
      "모래날림"
    ],
    "s_ability": []
  },
  {
    "id": 1052,
    "number": 257,
    "name": "메가 번치코",
    "types": [
      "불꽃",
      "격투"
    ],
    "H": 80,
    "A": 160,
    "B": 80,
    "C": 130,
    "D": 80,
    "S": 100,
    "total": 630,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10050.png",
    "ability": [
      "가속"
    ],
    "s_ability": []
  },
  {
    "id": 1053,
    "number": 282,
    "name": "메가 가디안",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 68,
    "A": 85,
    "B": 65,
    "C": 165,
    "D": 135,
    "S": 100,
    "total": 618,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10051.png",
    "ability": [
      "페어리스킨"
    ],
    "s_ability": []
  },
  {
    "id": 1054,
    "number": 303,
    "name": "메가 입치트",
    "types": [
      "강철",
      "페어리"
    ],
    "H": 50,
    "A": 105,
    "B": 125,
    "C": 55,
    "D": 95,
    "S": 50,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10052.png",
    "ability": [
      "천하장사"
    ],
    "s_ability": []
  },
  {
    "id": 1055,
    "number": 306,
    "name": "메가 보스로라",
    "types": [
      "강철"
    ],
    "H": 70,
    "A": 140,
    "B": 230,
    "C": 60,
    "D": 80,
    "S": 50,
    "total": 630,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10053.png",
    "ability": [
      "필터"
    ],
    "s_ability": []
  },
  {
    "id": 1056,
    "number": 308,
    "name": "메가 요가램",
    "types": [
      "격투",
      "에스퍼"
    ],
    "H": 60,
    "A": 100,
    "B": 85,
    "C": 80,
    "D": 85,
    "S": 100,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10054.png",
    "ability": [
      "순수한힘"
    ],
    "s_ability": []
  },
  {
    "id": 1057,
    "number": 310,
    "name": "메가 썬더볼트",
    "types": [
      "전기"
    ],
    "H": 70,
    "A": 75,
    "B": 80,
    "C": 135,
    "D": 80,
    "S": 135,
    "total": 575,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10055.png",
    "ability": [
      "위협"
    ],
    "s_ability": []
  },
  {
    "id": 1058,
    "number": 354,
    "name": "메가 다크펫",
    "types": [
      "고스트"
    ],
    "H": 64,
    "A": 165,
    "B": 75,
    "C": 93,
    "D": 83,
    "S": 75,
    "total": 555,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10056.png",
    "ability": [
      "짓궂은마음"
    ],
    "s_ability": []
  },
  {
    "id": 1059,
    "number": 359,
    "name": "메가 앱솔",
    "types": [
      "악"
    ],
    "H": 65,
    "A": 150,
    "B": 60,
    "C": 115,
    "D": 60,
    "S": 115,
    "total": 565,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10057.png",
    "ability": [
      "매직미러"
    ],
    "s_ability": []
  },
  {
    "id": 1060,
    "number": 445,
    "name": "메가 한카리아스",
    "types": [
      "드래곤",
      "땅"
    ],
    "H": 108,
    "A": 170,
    "B": 115,
    "C": 120,
    "D": 95,
    "S": 92,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10058.png",
    "ability": [
      "모래의힘"
    ],
    "s_ability": []
  },
  {
    "id": 1061,
    "number": 448,
    "name": "메가 루카리오",
    "types": [
      "격투",
      "강철"
    ],
    "H": 70,
    "A": 145,
    "B": 88,
    "C": 140,
    "D": 70,
    "S": 112,
    "total": 625,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10059.png",
    "ability": [
      "적응력"
    ],
    "s_ability": []
  },
  {
    "id": 1062,
    "number": 460,
    "name": "메가 눈설왕",
    "types": [
      "풀",
      "얼음"
    ],
    "H": 90,
    "A": 132,
    "B": 105,
    "C": 132,
    "D": 105,
    "S": 30,
    "total": 594,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10060.png",
    "ability": [
      "눈퍼뜨리기"
    ],
    "s_ability": []
  },
  {
    "id": 1063,
    "number": 380,
    "name": "메가 라티아스",
    "types": [
      "드래곤",
      "에스퍼"
    ],
    "H": 80,
    "A": 100,
    "B": 120,
    "C": 140,
    "D": 150,
    "S": 110,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10062.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1064,
    "number": 381,
    "name": "메가 라티오스",
    "types": [
      "드래곤",
      "에스퍼"
    ],
    "H": 80,
    "A": 130,
    "B": 100,
    "C": 160,
    "D": 120,
    "S": 110,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10063.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1065,
    "number": 260,
    "name": "메가 대짱이",
    "types": [
      "물",
      "땅"
    ],
    "H": 100,
    "A": 150,
    "B": 110,
    "C": 95,
    "D": 110,
    "S": 70,
    "total": 635,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10064.png",
    "ability": [
      "쓱쓱"
    ],
    "s_ability": []
  },
  {
    "id": 1066,
    "number": 254,
    "name": "메가 나무킹",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 70,
    "A": 110,
    "B": 75,
    "C": 145,
    "D": 85,
    "S": 145,
    "total": 630,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10065.png",
    "ability": [
      "피뢰침"
    ],
    "s_ability": []
  },
  {
    "id": 1067,
    "number": 302,
    "name": "메가 깜까미",
    "types": [
      "악",
      "고스트"
    ],
    "H": 50,
    "A": 85,
    "B": 125,
    "C": 85,
    "D": 115,
    "S": 20,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10066.png",
    "ability": [
      "매직미러"
    ],
    "s_ability": []
  },
  {
    "id": 1068,
    "number": 334,
    "name": "메가 파비코리",
    "types": [
      "드래곤",
      "페어리"
    ],
    "H": 75,
    "A": 110,
    "B": 110,
    "C": 110,
    "D": 105,
    "S": 80,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10067.png",
    "ability": [
      "페어리스킨"
    ],
    "s_ability": []
  },
  {
    "id": 1069,
    "number": 475,
    "name": "메가 엘레이드",
    "types": [
      "에스퍼",
      "격투"
    ],
    "H": 68,
    "A": 165,
    "B": 95,
    "C": 65,
    "D": 115,
    "S": 110,
    "total": 618,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10068.png",
    "ability": [
      "정신력"
    ],
    "s_ability": []
  },
  {
    "id": 1070,
    "number": 531,
    "name": "메가 다부니",
    "types": [
      "노말",
      "페어리"
    ],
    "H": 103,
    "A": 60,
    "B": 126,
    "C": 80,
    "D": 126,
    "S": 50,
    "total": 545,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10069.png",
    "ability": [
      "치유의마음"
    ],
    "s_ability": []
  },
  {
    "id": 1071,
    "number": 319,
    "name": "메가 샤크니아",
    "types": [
      "물",
      "악"
    ],
    "H": 70,
    "A": 140,
    "B": 70,
    "C": 110,
    "D": 65,
    "S": 105,
    "total": 560,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10070.png",
    "ability": [
      "옹골찬턱"
    ],
    "s_ability": []
  },
  {
    "id": 1072,
    "number": 80,
    "name": "메가 야도란",
    "types": [
      "물",
      "에스퍼"
    ],
    "H": 95,
    "A": 75,
    "B": 180,
    "C": 130,
    "D": 80,
    "S": 30,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10071.png",
    "ability": [
      "조가비갑옷"
    ],
    "s_ability": []
  },
  {
    "id": 1073,
    "number": 208,
    "name": "메가 강철톤",
    "types": [
      "강철",
      "땅"
    ],
    "H": 75,
    "A": 125,
    "B": 230,
    "C": 55,
    "D": 95,
    "S": 30,
    "total": 610,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10072.png",
    "ability": [
      "모래의힘"
    ],
    "s_ability": []
  },
  {
    "id": 1074,
    "number": 18,
    "name": "메가 피죤투",
    "types": [
      "노말",
      "비행"
    ],
    "H": 83,
    "A": 80,
    "B": 80,
    "C": 135,
    "D": 80,
    "S": 121,
    "total": 579,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10073.png",
    "ability": [
      "노가드"
    ],
    "s_ability": []
  },
  {
    "id": 1075,
    "number": 362,
    "name": "메가 얼음귀신",
    "types": [
      "얼음"
    ],
    "H": 80,
    "A": 120,
    "B": 80,
    "C": 120,
    "D": 80,
    "S": 100,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10074.png",
    "ability": [
      "프리즈스킨"
    ],
    "s_ability": []
  },
  {
    "id": 1076,
    "number": 719,
    "name": "메가 디안시",
    "types": [
      "바위",
      "페어리"
    ],
    "H": 50,
    "A": 160,
    "B": 110,
    "C": 160,
    "D": 110,
    "S": 110,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10075.png",
    "ability": [
      "매직미러"
    ],
    "s_ability": []
  },
  {
    "id": 1077,
    "number": 376,
    "name": "메가 메타그로스",
    "types": [
      "강철",
      "에스퍼"
    ],
    "H": 80,
    "A": 145,
    "B": 150,
    "C": 105,
    "D": 110,
    "S": 110,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10076.png",
    "ability": [
      "단단한발톱"
    ],
    "s_ability": []
  },
  {
    "id": 1078,
    "number": 382,
    "name": "원시 가이오가",
    "types": [
      "물"
    ],
    "H": 100,
    "A": 150,
    "B": 90,
    "C": 180,
    "D": 160,
    "S": 90,
    "total": 770,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10077.png",
    "ability": [
      "시작의바다"
    ],
    "s_ability": []
  },
  {
    "id": 1079,
    "number": 383,
    "name": "원시 그란돈",
    "types": [
      "땅",
      "불꽃"
    ],
    "H": 100,
    "A": 180,
    "B": 160,
    "C": 150,
    "D": 90,
    "S": 90,
    "total": 770,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10078.png",
    "ability": [
      "끝의대지"
    ],
    "s_ability": []
  },
  {
    "id": 1080,
    "number": 384,
    "name": "메가 레쿠쟈",
    "types": [
      "드래곤",
      "비행"
    ],
    "H": 105,
    "A": 180,
    "B": 100,
    "C": 180,
    "D": 100,
    "S": 115,
    "total": 780,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10079.png",
    "ability": [
      "델타스트림"
    ],
    "s_ability": []
  },
  {
    "id": 1081,
    "number": 323,
    "name": "메가 폭타",
    "types": [
      "불꽃",
      "땅"
    ],
    "H": 70,
    "A": 120,
    "B": 100,
    "C": 145,
    "D": 105,
    "S": 20,
    "total": 560,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10087.png",
    "ability": [
      "우격다짐"
    ],
    "s_ability": []
  },
  {
    "id": 1082,
    "number": 428,
    "name": "메가 이어롭",
    "types": [
      "노말",
      "격투"
    ],
    "H": 65,
    "A": 136,
    "B": 94,
    "C": 54,
    "D": 96,
    "S": 135,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10088.png",
    "ability": [
      "배짱"
    ],
    "s_ability": []
  },
  {
    "id": 1083,
    "number": 373,
    "name": "메가 보만다",
    "types": [
      "드래곤",
      "비행"
    ],
    "H": 95,
    "A": 145,
    "B": 130,
    "C": 120,
    "D": 90,
    "S": 120,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10089.png",
    "ability": [
      "스카이스킨"
    ],
    "s_ability": []
  },
  {
    "id": 1084,
    "number": 15,
    "name": "메가 독침붕",
    "types": [
      "벌레",
      "독"
    ],
    "H": 65,
    "A": 150,
    "B": 40,
    "C": 15,
    "D": 80,
    "S": 145,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10090.png",
    "ability": [
      "적응력"
    ],
    "s_ability": []
  },
  {
    "id": 1085,
    "number": 19,
    "name": "알로라 꼬렛",
    "types": [
      "악",
      "노말"
    ],
    "H": 30,
    "A": 56,
    "B": 35,
    "C": 25,
    "D": 35,
    "S": 72,
    "total": 253,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10091.png",
    "ability": [
      "먹보",
      "의욕"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 1086,
    "number": 20,
    "name": "알로라 레트라",
    "types": [
      "악",
      "노말"
    ],
    "H": 75,
    "A": 71,
    "B": 70,
    "C": 40,
    "D": 80,
    "S": 77,
    "total": 413,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10092.png",
    "ability": [
      "먹보",
      "의욕"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 1087,
    "number": 26,
    "name": "알로라 라이츄",
    "types": [
      "전기",
      "에스퍼"
    ],
    "H": 60,
    "A": 85,
    "B": 50,
    "C": 95,
    "D": 85,
    "S": 110,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10100.png",
    "ability": [
      "서핑테일"
    ],
    "s_ability": []
  },
  {
    "id": 1088,
    "number": 27,
    "name": "알로라 모래두지",
    "types": [
      "얼음",
      "강철"
    ],
    "H": 50,
    "A": 75,
    "B": 90,
    "C": 10,
    "D": 35,
    "S": 40,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10101.png",
    "ability": [
      "눈숨기"
    ],
    "s_ability": [
      "눈치우기"
    ]
  },
  {
    "id": 1089,
    "number": 28,
    "name": "알로라 고지",
    "types": [
      "얼음",
      "강철"
    ],
    "H": 75,
    "A": 100,
    "B": 120,
    "C": 25,
    "D": 65,
    "S": 65,
    "total": 450,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10102.png",
    "ability": [
      "눈숨기"
    ],
    "s_ability": [
      "눈치우기"
    ]
  },
  {
    "id": 1090,
    "number": 37,
    "name": "알로라 식스테일",
    "types": [
      "얼음"
    ],
    "H": 38,
    "A": 41,
    "B": 40,
    "C": 50,
    "D": 65,
    "S": 65,
    "total": 299,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10103.png",
    "ability": [
      "눈숨기"
    ],
    "s_ability": [
      "눈퍼뜨리기"
    ]
  },
  {
    "id": 1091,
    "number": 38,
    "name": "알로라 나인테일",
    "types": [
      "얼음",
      "페어리"
    ],
    "H": 73,
    "A": 67,
    "B": 75,
    "C": 81,
    "D": 100,
    "S": 109,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10104.png",
    "ability": [
      "눈숨기"
    ],
    "s_ability": [
      "눈퍼뜨리기"
    ]
  },
  {
    "id": 1092,
    "number": 50,
    "name": "알로라 디그다",
    "types": [
      "땅",
      "강철"
    ],
    "H": 10,
    "A": 55,
    "B": 30,
    "C": 35,
    "D": 45,
    "S": 90,
    "total": 265,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10105.png",
    "ability": [
      "모래숨기",
      "컬리헤어"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 1093,
    "number": 51,
    "name": "알로라 닥트리오",
    "types": [
      "땅",
      "강철"
    ],
    "H": 35,
    "A": 100,
    "B": 60,
    "C": 50,
    "D": 70,
    "S": 110,
    "total": 425,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10106.png",
    "ability": [
      "모래숨기",
      "컬리헤어"
    ],
    "s_ability": [
      "모래의힘"
    ]
  },
  {
    "id": 1094,
    "number": 52,
    "name": "알로라 나옹",
    "types": [
      "악"
    ],
    "H": 40,
    "A": 35,
    "B": 35,
    "C": 50,
    "D": 40,
    "S": 90,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10107.png",
    "ability": [
      "픽업",
      "테크니션"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 1095,
    "number": 53,
    "name": "알로라 페르시온",
    "types": [
      "악"
    ],
    "H": 65,
    "A": 60,
    "B": 60,
    "C": 75,
    "D": 65,
    "S": 115,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10108.png",
    "ability": [
      "퍼코트",
      "테크니션"
    ],
    "s_ability": [
      "주눅"
    ]
  },
  {
    "id": 1096,
    "number": 74,
    "name": "알로라 꼬마돌",
    "types": [
      "바위",
      "전기"
    ],
    "H": 40,
    "A": 80,
    "B": 100,
    "C": 30,
    "D": 30,
    "S": 20,
    "total": 300,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10109.png",
    "ability": [
      "자력",
      "옹골참"
    ],
    "s_ability": [
      "일렉트릭스킨"
    ]
  },
  {
    "id": 1097,
    "number": 75,
    "name": "알로라 데구리",
    "types": [
      "바위",
      "전기"
    ],
    "H": 55,
    "A": 95,
    "B": 115,
    "C": 45,
    "D": 45,
    "S": 35,
    "total": 390,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10110.png",
    "ability": [
      "자력",
      "옹골참"
    ],
    "s_ability": [
      "일렉트릭스킨"
    ]
  },
  {
    "id": 1098,
    "number": 76,
    "name": "알로라 딱구리",
    "types": [
      "바위",
      "전기"
    ],
    "H": 80,
    "A": 120,
    "B": 130,
    "C": 55,
    "D": 65,
    "S": 45,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10111.png",
    "ability": [
      "자력",
      "옹골참"
    ],
    "s_ability": [
      "일렉트릭스킨"
    ]
  },
  {
    "id": 1099,
    "number": 88,
    "name": "알로라 질퍽이",
    "types": [
      "독",
      "악"
    ],
    "H": 80,
    "A": 80,
    "B": 50,
    "C": 40,
    "D": 50,
    "S": 25,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10112.png",
    "ability": [
      "독수",
      "먹보"
    ],
    "s_ability": [
      "과학의힘"
    ]
  },
  {
    "id": 1100,
    "number": 89,
    "name": "알로라 질뻐기",
    "types": [
      "독",
      "악"
    ],
    "H": 105,
    "A": 105,
    "B": 75,
    "C": 65,
    "D": 100,
    "S": 50,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10113.png",
    "ability": [
      "독수",
      "먹보"
    ],
    "s_ability": [
      "과학의힘"
    ]
  },
  {
    "id": 1101,
    "number": 103,
    "name": "알로라 나시",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 95,
    "A": 105,
    "B": 85,
    "C": 125,
    "D": 75,
    "S": 45,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10114.png",
    "ability": [
      "통찰"
    ],
    "s_ability": [
      "수확"
    ]
  },
  {
    "id": 1102,
    "number": 105,
    "name": "알로라 텅구리",
    "types": [
      "불꽃",
      "고스트"
    ],
    "H": 60,
    "A": 80,
    "B": 110,
    "C": 50,
    "D": 80,
    "S": 45,
    "total": 425,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10115.png",
    "ability": [
      "저주받은바디",
      "피뢰침"
    ],
    "s_ability": [
      "돌머리"
    ]
  },
  {
    "id": 1103,
    "number": 52,
    "name": "가라르 나옹",
    "types": [
      "강철"
    ],
    "H": 50,
    "A": 65,
    "B": 55,
    "C": 40,
    "D": 40,
    "S": 40,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10161.png",
    "ability": [
      "픽업",
      "단단한발톱"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 1104,
    "number": 77,
    "name": "가라르 포니타",
    "types": [
      "에스퍼"
    ],
    "H": 50,
    "A": 85,
    "B": 55,
    "C": 65,
    "D": 65,
    "S": 90,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10162.png",
    "ability": [
      "도주",
      "파스텔베일"
    ],
    "s_ability": [
      "위험예지"
    ]
  },
  {
    "id": 1105,
    "number": 78,
    "name": "가라르 날쌩마",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 65,
    "A": 100,
    "B": 70,
    "C": 80,
    "D": 80,
    "S": 105,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10163.png",
    "ability": [
      "도주",
      "파스텔베일"
    ],
    "s_ability": [
      "위험예지"
    ]
  },
  {
    "id": 1106,
    "number": 79,
    "name": "가라르 야돈",
    "types": [
      "에스퍼"
    ],
    "H": 90,
    "A": 65,
    "B": 65,
    "C": 40,
    "D": 40,
    "S": 15,
    "total": 315,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10164.png",
    "ability": [
      "먹보",
      "마이페이스"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 1107,
    "number": 80,
    "name": "가라르 야도란",
    "types": [
      "독",
      "에스퍼"
    ],
    "H": 95,
    "A": 100,
    "B": 95,
    "C": 100,
    "D": 70,
    "S": 30,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10165.png",
    "ability": [
      "퀵드로",
      "마이페이스"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 1108,
    "number": 83,
    "name": "가라르 파오리",
    "types": [
      "격투"
    ],
    "H": 52,
    "A": 95,
    "B": 55,
    "C": 58,
    "D": 62,
    "S": 55,
    "total": 377,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10166.png",
    "ability": [
      "불굴의마음"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 1109,
    "number": 110,
    "name": "가라르 또도가스",
    "types": [
      "독",
      "페어리"
    ],
    "H": 65,
    "A": 90,
    "B": 120,
    "C": 85,
    "D": 70,
    "S": 60,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10167.png",
    "ability": [
      "부유",
      "화학변화가스"
    ],
    "s_ability": [
      "미스트메이커"
    ]
  },
  {
    "id": 1110,
    "number": 122,
    "name": "가라르 마임맨",
    "types": [
      "얼음",
      "에스퍼"
    ],
    "H": 50,
    "A": 65,
    "B": 65,
    "C": 90,
    "D": 90,
    "S": 100,
    "total": 460,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10168.png",
    "ability": [
      "의기양양",
      "배리어프리"
    ],
    "s_ability": [
      "아이스바디"
    ]
  },
  {
    "id": 1111,
    "number": 144,
    "name": "가라르 프리져",
    "types": [
      "에스퍼",
      "비행"
    ],
    "H": 90,
    "A": 85,
    "B": 85,
    "C": 125,
    "D": 100,
    "S": 95,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10169.png",
    "ability": [
      "승기"
    ],
    "s_ability": []
  },
  {
    "id": 1112,
    "number": 145,
    "name": "가라르 썬더",
    "types": [
      "격투",
      "비행"
    ],
    "H": 90,
    "A": 125,
    "B": 90,
    "C": 85,
    "D": 90,
    "S": 100,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10170.png",
    "ability": [
      "오기"
    ],
    "s_ability": []
  },
  {
    "id": 1113,
    "number": 146,
    "name": "가라르 파이어",
    "types": [
      "악",
      "비행"
    ],
    "H": 90,
    "A": 85,
    "B": 90,
    "C": 100,
    "D": 125,
    "S": 90,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10171.png",
    "ability": [
      "발끈"
    ],
    "s_ability": []
  },
  {
    "id": 1114,
    "number": 199,
    "name": "가라르 야도킹",
    "types": [
      "독",
      "에스퍼"
    ],
    "H": 95,
    "A": 65,
    "B": 80,
    "C": 110,
    "D": 110,
    "S": 30,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10172.png",
    "ability": [
      "기묘한약",
      "마이페이스"
    ],
    "s_ability": [
      "재생력"
    ]
  },
  {
    "id": 1115,
    "number": 222,
    "name": "가라르 코산호",
    "types": [
      "고스트"
    ],
    "H": 60,
    "A": 55,
    "B": 100,
    "C": 65,
    "D": 100,
    "S": 30,
    "total": 410,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10173.png",
    "ability": [
      "깨어진갑옷"
    ],
    "s_ability": [
      "저주받은바디"
    ]
  },
  {
    "id": 1116,
    "number": 263,
    "name": "가라르 지그제구리",
    "types": [
      "악",
      "노말"
    ],
    "H": 38,
    "A": 30,
    "B": 41,
    "C": 30,
    "D": 41,
    "S": 60,
    "total": 240,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10174.png",
    "ability": [
      "픽업",
      "먹보"
    ],
    "s_ability": [
      "속보"
    ]
  },
  {
    "id": 1117,
    "number": 264,
    "name": "가라르 직구리",
    "types": [
      "악",
      "노말"
    ],
    "H": 78,
    "A": 70,
    "B": 61,
    "C": 50,
    "D": 61,
    "S": 100,
    "total": 420,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10175.png",
    "ability": [
      "픽업",
      "먹보"
    ],
    "s_ability": [
      "속보"
    ]
  },
  {
    "id": 1118,
    "number": 554,
    "name": "가라르 달막화",
    "types": [
      "얼음"
    ],
    "H": 70,
    "A": 90,
    "B": 45,
    "C": 15,
    "D": 45,
    "S": 50,
    "total": 315,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10176.png",
    "ability": [
      "의욕"
    ],
    "s_ability": [
      "정신력"
    ]
  },
  {
    "id": 1119,
    "number": 555,
    "name": "가라르 불비달마",
    "types": [
      "얼음"
    ],
    "H": 105,
    "A": 140,
    "B": 55,
    "C": 30,
    "D": 55,
    "S": 95,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10177.png",
    "ability": [
      "무아지경"
    ],
    "s_ability": [
      "달마모드"
    ]
  },
  {
    "id": 1120,
    "number": 562,
    "name": "가라르 데스마스",
    "types": [
      "땅",
      "고스트"
    ],
    "H": 38,
    "A": 55,
    "B": 85,
    "C": 30,
    "D": 65,
    "S": 30,
    "total": 303,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10179.png",
    "ability": [
      "떠도는영혼"
    ],
    "s_ability": []
  },
  {
    "id": 1121,
    "number": 618,
    "name": "가라르 메더",
    "types": [
      "땅",
      "강철"
    ],
    "H": 109,
    "A": 81,
    "B": 99,
    "C": 66,
    "D": 84,
    "S": 32,
    "total": 471,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10180.png",
    "ability": [
      "의태"
    ],
    "s_ability": []
  },
  {
    "id": 1122,
    "number": 892,
    "name": "우라오스 연격의 태세",
    "types": [
      "격투",
      "물"
    ],
    "H": 100,
    "A": 130,
    "B": 100,
    "C": 63,
    "D": 60,
    "S": 97,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10191.png",
    "ability": [
      "보이지않는주먹"
    ],
    "s_ability": []
  },
  {
    "id": 1123,
    "number": 898,
    "name": "백마 버드렉스",
    "types": [
      "에스퍼",
      "얼음"
    ],
    "H": 100,
    "A": 165,
    "B": 150,
    "C": 85,
    "D": 130,
    "S": 50,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10193.png",
    "ability": [
      "혼연일체"
    ],
    "s_ability": []
  },
  {
    "id": 1124,
    "number": 898,
    "name": "흑마 버드렉스",
    "types": [
      "에스퍼",
      "고스트"
    ],
    "H": 100,
    "A": 85,
    "B": 80,
    "C": 165,
    "D": 100,
    "S": 150,
    "total": 680,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10194.png",
    "ability": [
      "혼연일체"
    ],
    "s_ability": []
  },
  {
    "id": 1125,
    "number": 3,
    "name": "거다이 이상해꽃",
    "types": [
      "풀",
      "독"
    ],
    "H": 80,
    "A": 82,
    "B": 83,
    "C": 100,
    "D": 100,
    "S": 80,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10195.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "엽록소"
    ]
  },
  {
    "id": 1126,
    "number": 6,
    "name": "거다이 리자몽",
    "types": [
      "불꽃",
      "비행"
    ],
    "H": 78,
    "A": 84,
    "B": 78,
    "C": 109,
    "D": 85,
    "S": 100,
    "total": 534,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10196.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "선파워"
    ]
  },
  {
    "id": 1127,
    "number": 9,
    "name": "거다이 거북왕",
    "types": [
      "물"
    ],
    "H": 79,
    "A": 83,
    "B": 100,
    "C": 85,
    "D": 105,
    "S": 78,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10197.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "젖은접시"
    ]
  },
  {
    "id": 1128,
    "number": 12,
    "name": "거다이 버터플",
    "types": [
      "벌레",
      "비행"
    ],
    "H": 60,
    "A": 45,
    "B": 50,
    "C": 90,
    "D": 80,
    "S": 70,
    "total": 395,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10198.png",
    "ability": [
      "복안"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 1129,
    "number": 25,
    "name": "거다이 피카츄",
    "types": [
      "전기"
    ],
    "H": 35,
    "A": 55,
    "B": 40,
    "C": 50,
    "D": 50,
    "S": 90,
    "total": 320,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10199.png",
    "ability": [
      "정전기"
    ],
    "s_ability": [
      "피뢰침"
    ]
  },
  {
    "id": 1130,
    "number": 52,
    "name": "거다이 나옹",
    "types": [
      "노말"
    ],
    "H": 40,
    "A": 45,
    "B": 35,
    "C": 40,
    "D": 40,
    "S": 90,
    "total": 290,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10200.png",
    "ability": [
      "픽업",
      "테크니션"
    ],
    "s_ability": [
      "긴장감"
    ]
  },
  {
    "id": 1131,
    "number": 68,
    "name": "거다이 괴력몬",
    "types": [
      "격투"
    ],
    "H": 90,
    "A": 130,
    "B": 80,
    "C": 65,
    "D": 85,
    "S": 55,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10201.png",
    "ability": [
      "근성",
      "노가드"
    ],
    "s_ability": [
      "불굴의마음"
    ]
  },
  {
    "id": 1132,
    "number": 94,
    "name": "거다이 팬텀",
    "types": [
      "고스트",
      "독"
    ],
    "H": 60,
    "A": 65,
    "B": 60,
    "C": 130,
    "D": 75,
    "S": 110,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10202.png",
    "ability": [
      "저주받은바디"
    ],
    "s_ability": []
  },
  {
    "id": 1133,
    "number": 99,
    "name": "거다이 킹크랩",
    "types": [
      "물"
    ],
    "H": 55,
    "A": 130,
    "B": 115,
    "C": 50,
    "D": 50,
    "S": 75,
    "total": 475,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10203.png",
    "ability": [
      "괴력집게",
      "조가비갑옷"
    ],
    "s_ability": [
      "우격다짐"
    ]
  },
  {
    "id": 1134,
    "number": 131,
    "name": "거다이 라프라스",
    "types": [
      "물",
      "얼음"
    ],
    "H": 130,
    "A": 85,
    "B": 80,
    "C": 85,
    "D": 95,
    "S": 60,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10204.png",
    "ability": [
      "저수",
      "조가비갑옷"
    ],
    "s_ability": [
      "촉촉바디"
    ]
  },
  {
    "id": 1135,
    "number": 133,
    "name": "거다이 이브이",
    "types": [
      "노말"
    ],
    "H": 55,
    "A": 55,
    "B": 50,
    "C": 45,
    "D": 65,
    "S": 55,
    "total": 325,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10205.png",
    "ability": [
      "도주",
      "적응력"
    ],
    "s_ability": [
      "위험예지"
    ]
  },
  {
    "id": 1136,
    "number": 143,
    "name": "거다이 잠만보",
    "types": [
      "노말"
    ],
    "H": 160,
    "A": 110,
    "B": 65,
    "C": 65,
    "D": 110,
    "S": 30,
    "total": 540,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10206.png",
    "ability": [
      "면역",
      "두꺼운지방"
    ],
    "s_ability": [
      "먹보"
    ]
  },
  {
    "id": 1137,
    "number": 569,
    "name": "거다이 더스트나",
    "types": [
      "독"
    ],
    "H": 80,
    "A": 95,
    "B": 82,
    "C": 60,
    "D": 82,
    "S": 75,
    "total": 474,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10207.png",
    "ability": [
      "악취",
      "깨어진갑옷"
    ],
    "s_ability": [
      "유폭"
    ]
  },
  {
    "id": 1138,
    "number": 809,
    "name": "거다이 멜메탈",
    "types": [
      "강철"
    ],
    "H": 135,
    "A": 143,
    "B": 143,
    "C": 80,
    "D": 65,
    "S": 34,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10208.png",
    "ability": [
      "철주먹"
    ],
    "s_ability": []
  },
  {
    "id": 1139,
    "number": 812,
    "name": "거다이 고릴타",
    "types": [
      "풀"
    ],
    "H": 100,
    "A": 125,
    "B": 90,
    "C": 60,
    "D": 70,
    "S": 85,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10209.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "그래스메이커"
    ]
  },
  {
    "id": 1140,
    "number": 815,
    "name": "거다이 에이스번",
    "types": [
      "불꽃"
    ],
    "H": 80,
    "A": 116,
    "B": 75,
    "C": 65,
    "D": 75,
    "S": 119,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10210.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "리베로"
    ]
  },
  {
    "id": 1141,
    "number": 818,
    "name": "거다이 인텔리레온",
    "types": [
      "물"
    ],
    "H": 70,
    "A": 85,
    "B": 65,
    "C": 125,
    "D": 65,
    "S": 120,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10211.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "스나이퍼"
    ]
  },
  {
    "id": 1142,
    "number": 823,
    "name": "거다이 아머까오",
    "types": [
      "비행",
      "강철"
    ],
    "H": 98,
    "A": 87,
    "B": 105,
    "C": 53,
    "D": 85,
    "S": 67,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10212.png",
    "ability": [
      "프레셔",
      "긴장감"
    ],
    "s_ability": [
      "미러아머"
    ]
  },
  {
    "id": 1143,
    "number": 826,
    "name": "거다이 이올브",
    "types": [
      "벌레",
      "에스퍼"
    ],
    "H": 60,
    "A": 45,
    "B": 110,
    "C": 80,
    "D": 120,
    "S": 90,
    "total": 505,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10213.png",
    "ability": [
      "벌레의알림",
      "통찰"
    ],
    "s_ability": [
      "텔레파시"
    ]
  },
  {
    "id": 1144,
    "number": 834,
    "name": "거다이 갈가부기",
    "types": [
      "물",
      "바위"
    ],
    "H": 90,
    "A": 115,
    "B": 90,
    "C": 48,
    "D": 68,
    "S": 74,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10214.png",
    "ability": [
      "옹골찬턱",
      "조가비갑옷"
    ],
    "s_ability": [
      "쓱쓱"
    ]
  },
  {
    "id": 1145,
    "number": 839,
    "name": "거다이 석탄산",
    "types": [
      "바위",
      "불꽃"
    ],
    "H": 110,
    "A": 80,
    "B": 120,
    "C": 80,
    "D": 90,
    "S": 30,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10215.png",
    "ability": [
      "증기기관",
      "불꽃몸"
    ],
    "s_ability": [
      "타오르는불꽃"
    ]
  },
  {
    "id": 1146,
    "number": 841,
    "name": "거다이 애프룡",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 70,
    "A": 110,
    "B": 80,
    "C": 95,
    "D": 60,
    "S": 70,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10216.png",
    "ability": [
      "숙성",
      "먹보"
    ],
    "s_ability": [
      "의욕"
    ]
  },
  {
    "id": 1147,
    "number": 842,
    "name": "거다이 단지래플",
    "types": [
      "풀",
      "드래곤"
    ],
    "H": 110,
    "A": 85,
    "B": 80,
    "C": 100,
    "D": 80,
    "S": 30,
    "total": 485,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10217.png",
    "ability": [
      "숙성",
      "먹보"
    ],
    "s_ability": [
      "두꺼운지방"
    ]
  },
  {
    "id": 1148,
    "number": 844,
    "name": "거다이 사다이사",
    "types": [
      "땅"
    ],
    "H": 72,
    "A": 107,
    "B": 125,
    "C": 65,
    "D": 70,
    "S": 71,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10218.png",
    "ability": [
      "모래뿜기",
      "탈피"
    ],
    "s_ability": [
      "모래숨기"
    ]
  },
  {
    "id": 1149,
    "number": 849,
    "name": "거다이 스트린더",
    "types": [
      "전기",
      "독"
    ],
    "H": 75,
    "A": 98,
    "B": 70,
    "C": 114,
    "D": 70,
    "S": 75,
    "total": 502,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10219.png",
    "ability": [
      "펑크록",
      "플러스"
    ],
    "s_ability": [
      "테크니션"
    ]
  },
  {
    "id": 1150,
    "number": 851,
    "name": "거다이 다태우지네",
    "types": [
      "불꽃",
      "벌레"
    ],
    "H": 100,
    "A": 115,
    "B": 65,
    "C": 90,
    "D": 90,
    "S": 65,
    "total": 525,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10220.png",
    "ability": [
      "타오르는불꽃",
      "하얀연기"
    ],
    "s_ability": [
      "불꽃몸"
    ]
  },
  {
    "id": 1151,
    "number": 858,
    "name": "거다이 브리무음",
    "types": [
      "에스퍼",
      "페어리"
    ],
    "H": 57,
    "A": 90,
    "B": 95,
    "C": 136,
    "D": 103,
    "S": 29,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10221.png",
    "ability": [
      "치유의마음",
      "위험예지"
    ],
    "s_ability": [
      "매직미러"
    ]
  },
  {
    "id": 1152,
    "number": 861,
    "name": "거다이 오롱털",
    "types": [
      "악",
      "페어리"
    ],
    "H": 95,
    "A": 120,
    "B": 65,
    "C": 95,
    "D": 75,
    "S": 60,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10222.png",
    "ability": [
      "짓궂은마음",
      "통찰"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 1153,
    "number": 869,
    "name": "거다이 마휘핑",
    "types": [
      "페어리"
    ],
    "H": 65,
    "A": 60,
    "B": 75,
    "C": 110,
    "D": 121,
    "S": 64,
    "total": 495,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10223.png",
    "ability": [
      "스위트베일"
    ],
    "s_ability": [
      "아로마베일"
    ]
  },
  {
    "id": 1154,
    "number": 879,
    "name": "거다이 대왕끼리동",
    "types": [
      "강철"
    ],
    "H": 122,
    "A": 130,
    "B": 69,
    "C": 80,
    "D": 69,
    "S": 30,
    "total": 500,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10224.png",
    "ability": [
      "우격다짐"
    ],
    "s_ability": [
      "헤비메탈"
    ]
  },
  {
    "id": 1155,
    "number": 884,
    "name": "거다이 두랄루돈",
    "types": [
      "강철",
      "드래곤"
    ],
    "H": 70,
    "A": 95,
    "B": 115,
    "C": 120,
    "D": 50,
    "S": 85,
    "total": 535,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10225.png",
    "ability": [
      "라이트메탈",
      "헤비메탈"
    ],
    "s_ability": [
      "굳건한신념"
    ]
  },
  {
    "id": 1156,
    "number": 892,
    "name": "거다이 우라오스 일격의 태세",
    "types": [
      "격투",
      "악"
    ],
    "H": 100,
    "A": 130,
    "B": 100,
    "C": 63,
    "D": 60,
    "S": 97,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10226.png",
    "ability": [
      "보이지않는주먹"
    ],
    "s_ability": []
  },
  {
    "id": 1157,
    "number": 892,
    "name": "거다이 우라오스 연격의 태세",
    "types": [
      "격투",
      "물"
    ],
    "H": 100,
    "A": 130,
    "B": 100,
    "C": 63,
    "D": 60,
    "S": 97,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10227.png",
    "ability": [
      "보이지않는주먹"
    ],
    "s_ability": []
  },
  {
    "id": 1158,
    "number": 58,
    "name": "히스이 가디",
    "types": [
      "불꽃",
      "바위"
    ],
    "H": 60,
    "A": 75,
    "B": 45,
    "C": 65,
    "D": 50,
    "S": 55,
    "total": 350,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10229.png",
    "ability": [
      "위협",
      "타오르는불꽃"
    ],
    "s_ability": [
      "돌머리"
    ]
  },
  {
    "id": 1159,
    "number": 59,
    "name": "히스이 윈디",
    "types": [
      "불꽃",
      "바위"
    ],
    "H": 95,
    "A": 115,
    "B": 80,
    "C": 95,
    "D": 80,
    "S": 90,
    "total": 555,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10230.png",
    "ability": [
      "위협",
      "타오르는불꽃"
    ],
    "s_ability": [
      "돌머리"
    ]
  },
  {
    "id": 1160,
    "number": 100,
    "name": "히스이 찌리리공",
    "types": [
      "전기",
      "풀"
    ],
    "H": 40,
    "A": 30,
    "B": 50,
    "C": 55,
    "D": 55,
    "S": 100,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10231.png",
    "ability": [
      "방음",
      "정전기"
    ],
    "s_ability": [
      "유폭"
    ]
  },
  {
    "id": 1161,
    "number": 101,
    "name": "히스이 붐볼",
    "types": [
      "전기",
      "풀"
    ],
    "H": 60,
    "A": 50,
    "B": 70,
    "C": 80,
    "D": 80,
    "S": 150,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10232.png",
    "ability": [
      "방음",
      "정전기"
    ],
    "s_ability": [
      "유폭"
    ]
  },
  {
    "id": 1162,
    "number": 157,
    "name": "히스이 블레이범",
    "types": [
      "불꽃",
      "고스트"
    ],
    "H": 73,
    "A": 84,
    "B": 78,
    "C": 119,
    "D": 85,
    "S": 95,
    "total": 534,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10233.png",
    "ability": [
      "맹화"
    ],
    "s_ability": [
      "통찰"
    ]
  },
  {
    "id": 1163,
    "number": 211,
    "name": "히스이 침바루",
    "types": [
      "악",
      "독"
    ],
    "H": 65,
    "A": 95,
    "B": 85,
    "C": 55,
    "D": 55,
    "S": 85,
    "total": 440,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10234.png",
    "ability": [
      "독가시",
      "쓱쓱"
    ],
    "s_ability": [
      "위협"
    ]
  },
  {
    "id": 1164,
    "number": 215,
    "name": "히스이 포푸니",
    "types": [
      "격투",
      "독"
    ],
    "H": 55,
    "A": 95,
    "B": 55,
    "C": 35,
    "D": 75,
    "S": 115,
    "total": 430,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10235.png",
    "ability": [
      "정신력",
      "날카로운눈"
    ],
    "s_ability": [
      "나쁜손버릇"
    ]
  },
  {
    "id": 1165,
    "number": 503,
    "name": "히스이 대검귀",
    "types": [
      "물",
      "악"
    ],
    "H": 90,
    "A": 108,
    "B": 80,
    "C": 100,
    "D": 65,
    "S": 85,
    "total": 528,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10236.png",
    "ability": [
      "급류"
    ],
    "s_ability": [
      "sharpness"
    ]
  },
  {
    "id": 1166,
    "number": 549,
    "name": "히스이 드레디어",
    "types": [
      "풀",
      "격투"
    ],
    "H": 70,
    "A": 105,
    "B": 75,
    "C": 50,
    "D": 75,
    "S": 105,
    "total": 480,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10237.png",
    "ability": [
      "엽록소",
      "의욕"
    ],
    "s_ability": [
      "리프가드"
    ]
  },
  {
    "id": 1167,
    "number": 570,
    "name": "히스이 조로아",
    "types": [
      "노말",
      "고스트"
    ],
    "H": 35,
    "A": 60,
    "B": 40,
    "C": 85,
    "D": 40,
    "S": 70,
    "total": 330,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10238.png",
    "ability": [
      "일루전"
    ],
    "s_ability": []
  },
  {
    "id": 1168,
    "number": 571,
    "name": "히스이 조로아크",
    "types": [
      "노말",
      "고스트"
    ],
    "H": 55,
    "A": 100,
    "B": 60,
    "C": 125,
    "D": 60,
    "S": 110,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10239.png",
    "ability": [
      "일루전"
    ],
    "s_ability": []
  },
  {
    "id": 1169,
    "number": 628,
    "name": "히스이 워글",
    "types": [
      "에스퍼",
      "비행"
    ],
    "H": 110,
    "A": 83,
    "B": 70,
    "C": 112,
    "D": 70,
    "S": 65,
    "total": 510,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10240.png",
    "ability": [
      "날카로운눈",
      "우격다짐"
    ],
    "s_ability": [
      "색안경"
    ]
  },
  {
    "id": 1170,
    "number": 705,
    "name": "히스이 미끄네일",
    "types": [
      "강철",
      "드래곤"
    ],
    "H": 58,
    "A": 75,
    "B": 83,
    "C": 83,
    "D": 113,
    "S": 40,
    "total": 452,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10241.png",
    "ability": [
      "초식",
      "조가비갑옷"
    ],
    "s_ability": [
      "미끈미끈"
    ]
  },
  {
    "id": 1171,
    "number": 706,
    "name": "히스이 미끄래곤",
    "types": [
      "강철",
      "드래곤"
    ],
    "H": 80,
    "A": 100,
    "B": 100,
    "C": 110,
    "D": 150,
    "S": 60,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10242.png",
    "ability": [
      "초식",
      "조가비갑옷"
    ],
    "s_ability": [
      "미끈미끈"
    ]
  },
  {
    "id": 1172,
    "number": 713,
    "name": "히스이 크레베이스",
    "types": [
      "얼음",
      "바위"
    ],
    "H": 95,
    "A": 127,
    "B": 184,
    "C": 34,
    "D": 36,
    "S": 38,
    "total": 514,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10243.png",
    "ability": [
      "옹골찬턱",
      "아이스바디"
    ],
    "s_ability": [
      "옹골참"
    ]
  },
  {
    "id": 1173,
    "number": 724,
    "name": "히스이 모크나이퍼",
    "types": [
      "풀",
      "격투"
    ],
    "H": 88,
    "A": 112,
    "B": 80,
    "C": 95,
    "D": 95,
    "S": 60,
    "total": 530,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10244.png",
    "ability": [
      "심록"
    ],
    "s_ability": [
      "배짱"
    ]
  },
  {
    "id": 1174,
    "number": 128,
    "name": "팔데아 켄타로스 격투종",
    "types": [
      "격투"
    ],
    "H": 75,
    "A": 110,
    "B": 105,
    "C": 30,
    "D": 70,
    "S": 100,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10250.png",
    "ability": [
      "위협",
      "분노의경혈"
    ],
    "s_ability": [
      "cud-chew"
    ]
  },
  {
    "id": 1175,
    "number": 128,
    "name": "팔데아 켄타로스 불꽃종",
    "types": [
      "격투",
      "불꽃"
    ],
    "H": 75,
    "A": 110,
    "B": 105,
    "C": 30,
    "D": 70,
    "S": 100,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10251.png",
    "ability": [
      "위협",
      "분노의경혈"
    ],
    "s_ability": [
      "cud-chew"
    ]
  },
  {
    "id": 1176,
    "number": 128,
    "name": "팔데아 켄타로스 물종",
    "types": [
      "격투",
      "물"
    ],
    "H": 75,
    "A": 110,
    "B": 105,
    "C": 30,
    "D": 70,
    "S": 100,
    "total": 490,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10252.png",
    "ability": [
      "위협",
      "분노의경혈"
    ],
    "s_ability": [
      "cud-chew"
    ]
  },
  {
    "id": 1177,
    "number": 194,
    "name": "팔데아 우파",
    "types": [
      "독",
      "땅"
    ],
    "H": 55,
    "A": 45,
    "B": 45,
    "C": 25,
    "D": 25,
    "S": 15,
    "total": 210,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10253.png",
    "ability": [
      "독가시",
      "저수"
    ],
    "s_ability": [
      "천진"
    ]
  },
  {
    "id": 1178,
    "number": 1017,
    "name": "오거폰 우물의 가면",
    "types": [
      "풀",
      "물"
    ],
    "H": 80,
    "A": 120,
    "B": 84,
    "C": 60,
    "D": 96,
    "S": 110,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10273.png",
    "ability": [
      "저수"
    ],
    "s_ability": []
  },
  {
    "id": 1179,
    "number": 1017,
    "name": "오거폰 화덕의 가면",
    "types": [
      "풀",
      "불꽃"
    ],
    "H": 80,
    "A": 120,
    "B": 84,
    "C": 60,
    "D": 96,
    "S": 110,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10274.png",
    "ability": [
      "틀깨기"
    ],
    "s_ability": []
  },
  {
    "id": 1180,
    "number": 1017,
    "name": "오거폰 주춧돌의 가면",
    "types": [
      "풀",
      "바위"
    ],
    "H": 80,
    "A": 120,
    "B": 84,
    "C": 60,
    "D": 96,
    "S": 110,
    "total": 550,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10275.png",
    "ability": [
      "옹골참"
    ],
    "s_ability": []
  },
  {
    "id": 1181,
    "number": 36,
    "name": "메가 픽시",
    "types": [
      "페어리",
      "비행"
    ],
    "H": 95,
    "A": 80,
    "B": 93,
    "C": 135,
    "D": 110,
    "S": 70,
    "total": 583,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10278.png",
    "ability": [
      "매직미러"
    ],
    "s_ability": []
  },
  {
    "id": 1182,
    "number": 71,
    "name": "메가 우츠보트",
    "types": [
      "풀",
      "독"
    ],
    "H": 80,
    "A": 125,
    "B": 85,
    "C": 135,
    "D": 95,
    "S": 70,
    "total": 590,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10279.png",
    "ability": [
      "내용물분출"
    ],
    "s_ability": []
  },
  {
    "id": 1183,
    "number": 121,
    "name": "메가 아쿠스타",
    "types": [
      "물",
      "에스퍼"
    ],
    "H": 60,
    "A": 100,
    "B": 105,
    "C": 130,
    "D": 105,
    "S": 120,
    "total": 620,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10280.png",
    "ability": [
      "천하장사"
    ],
    "s_ability": []
  },
  {
    "id": 1184,
    "number": 149,
    "name": "메가 망나뇽",
    "types": [
      "드래곤",
      "비행"
    ],
    "H": 91,
    "A": 124,
    "B": 115,
    "C": 145,
    "D": 125,
    "S": 100,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10281.png",
    "ability": [
      "멀티스케일"
    ],
    "s_ability": []
  },
  {
    "id": 1185,
    "number": 154,
    "name": "메가 메가니움",
    "types": [
      "풀",
      "페어리"
    ],
    "H": 80,
    "A": 92,
    "B": 115,
    "C": 143,
    "D": 115,
    "S": 80,
    "total": 625,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10282.png",
    "ability": [
      "mega-sol"
    ],
    "s_ability": []
  },
  {
    "id": 1186,
    "number": 160,
    "name": "메가 장크로다일",
    "types": [
      "물",
      "드래곤"
    ],
    "H": 85,
    "A": 160,
    "B": 125,
    "C": 89,
    "D": 93,
    "S": 78,
    "total": 630,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10283.png",
    "ability": [
      "dragonize"
    ],
    "s_ability": []
  },
  {
    "id": 1187,
    "number": 227,
    "name": "메가 무장조",
    "types": [
      "강철",
      "비행"
    ],
    "H": 65,
    "A": 140,
    "B": 110,
    "C": 40,
    "D": 100,
    "S": 110,
    "total": 565,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10284.png",
    "ability": [
      "굳건한신념"
    ],
    "s_ability": []
  },
  {
    "id": 1188,
    "number": 478,
    "name": "메가 눈여아",
    "types": [
      "얼음",
      "고스트"
    ],
    "H": 70,
    "A": 80,
    "B": 70,
    "C": 140,
    "D": 100,
    "S": 120,
    "total": 580,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10285.png",
    "ability": [
      "눈퍼뜨리기"
    ],
    "s_ability": []
  },
  {
    "id": 1189,
    "number": 500,
    "name": "메가 염무왕",
    "types": [
      "불꽃",
      "격투"
    ],
    "H": 110,
    "A": 148,
    "B": 75,
    "C": 110,
    "D": 110,
    "S": 75,
    "total": 628,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10286.png",
    "ability": [
      "틀깨기"
    ],
    "s_ability": []
  },
  {
    "id": 1190,
    "number": 530,
    "name": "메가 몰드류",
    "types": [
      "땅",
      "강철"
    ],
    "H": 110,
    "A": 165,
    "B": 100,
    "C": 65,
    "D": 65,
    "S": 103,
    "total": 608,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10287.png",
    "ability": [
      "piercing-drill"
    ],
    "s_ability": []
  },
  {
    "id": 1191,
    "number": 545,
    "name": "메가 펜드라",
    "types": [
      "벌레",
      "독"
    ],
    "H": 60,
    "A": 140,
    "B": 149,
    "C": 75,
    "D": 99,
    "S": 62,
    "total": 585,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10288.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1192,
    "number": 560,
    "name": "메가 곤율거니",
    "types": [
      "악",
      "격투"
    ],
    "H": 65,
    "A": 130,
    "B": 135,
    "C": 55,
    "D": 135,
    "S": 68,
    "total": 588,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10289.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1193,
    "number": 604,
    "name": "메가 저리더프",
    "types": [
      "전기"
    ],
    "H": 85,
    "A": 145,
    "B": 80,
    "C": 135,
    "D": 90,
    "S": 80,
    "total": 615,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10290.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1194,
    "number": 609,
    "name": "메가 샹델라",
    "types": [
      "고스트",
      "불꽃"
    ],
    "H": 60,
    "A": 75,
    "B": 110,
    "C": 175,
    "D": 110,
    "S": 90,
    "total": 620,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10291.png",
    "ability": [
      "틈새포착"
    ],
    "s_ability": []
  },
  {
    "id": 1195,
    "number": 652,
    "name": "메가 브리가론",
    "types": [
      "풀",
      "격투"
    ],
    "H": 88,
    "A": 137,
    "B": 172,
    "C": 74,
    "D": 115,
    "S": 44,
    "total": 630,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10292.png",
    "ability": [
      "방탄"
    ],
    "s_ability": []
  },
  {
    "id": 1196,
    "number": 655,
    "name": "메가 마폭시",
    "types": [
      "불꽃",
      "에스퍼"
    ],
    "H": 75,
    "A": 69,
    "B": 72,
    "C": 159,
    "D": 125,
    "S": 134,
    "total": 634,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10293.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1197,
    "number": 658,
    "name": "메가 개굴닌자",
    "types": [
      "물",
      "악"
    ],
    "H": 72,
    "A": 125,
    "B": 77,
    "C": 133,
    "D": 81,
    "S": 142,
    "total": 630,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10294.png",
    "ability": [
      "변환자재"
    ],
    "s_ability": []
  },
  {
    "id": 1198,
    "number": 668,
    "name": "메가 화염레오",
    "types": [
      "불꽃",
      "노말"
    ],
    "H": 86,
    "A": 88,
    "B": 92,
    "C": 129,
    "D": 86,
    "S": 126,
    "total": 607,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10295.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1199,
    "number": 670,
    "name": "메가 플라엣테",
    "types": [
      "페어리"
    ],
    "H": 74,
    "A": 85,
    "B": 87,
    "C": 155,
    "D": 148,
    "S": 102,
    "total": 651,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10296.png",
    "ability": [
      "페어리오라"
    ],
    "s_ability": []
  },
  {
    "id": 1200,
    "number": 687,
    "name": "메가 칼라마네로",
    "types": [
      "악",
      "에스퍼"
    ],
    "H": 86,
    "A": 102,
    "B": 88,
    "C": 98,
    "D": 120,
    "S": 88,
    "total": 582,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10297.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1201,
    "number": 689,
    "name": "메가 거북손데스",
    "types": [
      "바위",
      "격투"
    ],
    "H": 72,
    "A": 140,
    "B": 130,
    "C": 64,
    "D": 106,
    "S": 88,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10298.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1202,
    "number": 691,
    "name": "메가 드래캄",
    "types": [
      "독",
      "드래곤"
    ],
    "H": 65,
    "A": 85,
    "B": 105,
    "C": 132,
    "D": 163,
    "S": 44,
    "total": 594,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10299.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1203,
    "number": 701,
    "name": "메가 루차불",
    "types": [
      "격투",
      "비행"
    ],
    "H": 78,
    "A": 137,
    "B": 100,
    "C": 74,
    "D": 93,
    "S": 118,
    "total": 600,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10300.png",
    "ability": [
      "노가드"
    ],
    "s_ability": []
  },
  {
    "id": 1204,
    "number": 718,
    "name": "메가 지가르데",
    "types": [
      "드래곤",
      "땅"
    ],
    "H": 216,
    "A": 70,
    "B": 91,
    "C": 216,
    "D": 85,
    "S": 100,
    "total": 778,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10301.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1205,
    "number": 780,
    "name": "메가 할비롱",
    "types": [
      "노말",
      "드래곤"
    ],
    "H": 78,
    "A": 85,
    "B": 110,
    "C": 160,
    "D": 116,
    "S": 36,
    "total": 585,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10302.png",
    "ability": [
      "발끈"
    ],
    "s_ability": []
  },
  {
    "id": 1206,
    "number": 870,
    "name": "메가 대여르",
    "types": [
      "격투"
    ],
    "H": 65,
    "A": 135,
    "B": 135,
    "C": 70,
    "D": 65,
    "S": 100,
    "total": 570,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10303.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1207,
    "number": 26,
    "name": "메가 라이츄 X",
    "types": [
      "전기"
    ],
    "H": 60,
    "A": 135,
    "B": 95,
    "C": 90,
    "D": 95,
    "S": 110,
    "total": 585,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10304.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1208,
    "number": 26,
    "name": "메가 라이츄 Y",
    "types": [
      "전기"
    ],
    "H": 60,
    "A": 100,
    "B": 55,
    "C": 160,
    "D": 80,
    "S": 130,
    "total": 585,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10305.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1209,
    "number": 358,
    "name": "메가 치렁",
    "types": [
      "에스퍼",
      "강철"
    ],
    "H": 75,
    "A": 50,
    "B": 110,
    "C": 135,
    "D": 120,
    "S": 65,
    "total": 555,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10306.png",
    "ability": [
      "부유"
    ],
    "s_ability": []
  },
  {
    "id": 1210,
    "number": 359,
    "name": "메가 앱솔 Z",
    "types": [
      "악",
      "고스트"
    ],
    "H": 65,
    "A": 154,
    "B": 60,
    "C": 75,
    "D": 60,
    "S": 151,
    "total": 565,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10307.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1211,
    "number": 398,
    "name": "메가 찌르호크",
    "types": [
      "격투",
      "비행"
    ],
    "H": 85,
    "A": 140,
    "B": 100,
    "C": 60,
    "D": 90,
    "S": 110,
    "total": 585,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10308.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1212,
    "number": 445,
    "name": "메가 한카리아스 Z",
    "types": [
      "드래곤"
    ],
    "H": 108,
    "A": 130,
    "B": 85,
    "C": 141,
    "D": 85,
    "S": 151,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10309.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1213,
    "number": 448,
    "name": "메가 루카리오 Z",
    "types": [
      "격투",
      "강철"
    ],
    "H": 70,
    "A": 100,
    "B": 70,
    "C": 164,
    "D": 70,
    "S": 151,
    "total": 625,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10310.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1214,
    "number": 485,
    "name": "메가 히드런",
    "types": [
      "불꽃",
      "강철"
    ],
    "H": 91,
    "A": 120,
    "B": 106,
    "C": 175,
    "D": 141,
    "S": 67,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10311.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1215,
    "number": 491,
    "name": "메가 다크라이",
    "types": [
      "악"
    ],
    "H": 70,
    "A": 120,
    "B": 130,
    "C": 165,
    "D": 130,
    "S": 85,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10312.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1216,
    "number": 623,
    "name": "메가 골루그",
    "types": [
      "땅",
      "고스트"
    ],
    "H": 89,
    "A": 159,
    "B": 105,
    "C": 70,
    "D": 105,
    "S": 55,
    "total": 583,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10313.png",
    "ability": [
      "보이지않는주먹"
    ],
    "s_ability": []
  },
  {
    "id": 1217,
    "number": 678,
    "name": "메가 냐오닉스",
    "types": [
      "에스퍼"
    ],
    "H": 74,
    "A": 48,
    "B": 76,
    "C": 143,
    "D": 101,
    "S": 124,
    "total": 566,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10314.png",
    "ability": [
      "트레이스"
    ],
    "s_ability": []
  },
  {
    "id": 1218,
    "number": 740,
    "name": "메가 모단단게",
    "types": [
      "격투",
      "얼음"
    ],
    "H": 97,
    "A": 157,
    "B": 122,
    "C": 62,
    "D": 107,
    "S": 33,
    "total": 578,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10315.png",
    "ability": [
      "철주먹"
    ],
    "s_ability": []
  },
  {
    "id": 1219,
    "number": 768,
    "name": "메가 갑주무사",
    "types": [
      "벌레",
      "강철"
    ],
    "H": 75,
    "A": 150,
    "B": 175,
    "C": 70,
    "D": 120,
    "S": 40,
    "total": 630,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10316.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1220,
    "number": 801,
    "name": "메가 마기아나",
    "types": [
      "강철",
      "페어리"
    ],
    "H": 80,
    "A": 125,
    "B": 115,
    "C": 170,
    "D": 115,
    "S": 95,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10317.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1221,
    "number": 807,
    "name": "메가 제라오라",
    "types": [
      "전기"
    ],
    "H": 88,
    "A": 157,
    "B": 75,
    "C": 147,
    "D": 80,
    "S": 153,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10319.png",
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1222,
    "number": 952,
    "name": "메가 스코빌런",
    "types": [
      "풀",
      "불꽃"
    ],
    "H": 65,
    "A": 138,
    "B": 85,
    "C": 138,
    "D": 85,
    "S": 75,
    "total": 586,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10320.png",
    "ability": [
      "spicy-spray"
    ],
    "s_ability": []
  },
  {
    "id": 1223,
    "number": 970,
    "name": "메가 킬라플로르",
    "types": [
      "바위",
      "독"
    ],
    "H": 83,
    "A": 90,
    "B": 105,
    "C": 150,
    "D": 96,
    "S": 101,
    "total": 625,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10321.png",
    "ability": [
      "적응력"
    ],
    "s_ability": []
  },
  {
    "id": 1224,
    "number": 978,
    "name": "메가 싸리용",
    "types": [
      "드래곤",
      "물"
    ],
    "H": 68,
    "A": 65,
    "B": 90,
    "C": 135,
    "D": 125,
    "S": 92,
    "total": 575,
    "ability": [],
    "s_ability": []
  },
  {
    "id": 1225,
    "number": 998,
    "name": "메가 드닐레이브",
    "types": [
      "드래곤",
      "얼음"
    ],
    "H": 115,
    "A": 175,
    "B": 117,
    "C": 105,
    "D": 101,
    "S": 87,
    "total": 700,
    "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10325.png",
    "ability": [],
    "s_ability": []
  }
];

const byId = new Map<number, Pokemon>();
const byNumber = new Map<number, Pokemon[]>();

for (const p of POKEMON_LIST) {
  byId.set(p.id, p);
  const list = byNumber.get(p.number) ?? [];
  list.push(p);
  byNumber.set(p.number, list);
}

export function getPokemonById(id: number): Pokemon | undefined {
  return byId.get(id);
}

export function getPokemonsByNumber(number: number): Pokemon[] {
  return byNumber.get(number) ?? [];
}

export function searchPokemonByName(keyword: string, limit = 50): Pokemon[] {
  const q = keyword.trim();
  if (!q) return [];
  const lower = q.toLowerCase();
  return POKEMON_LIST.filter(
    (p) => p.name.includes(q) || p.name.toLowerCase().includes(lower),
  )
    .sort((a, b) => a.number - b.number)
    .slice(0, limit);
}
