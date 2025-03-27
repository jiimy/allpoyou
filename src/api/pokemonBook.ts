import apiInstance from "./useInterceptor";

type pokemonSearchType = {
  searchInputValue: string;
  pageParam?: number;
  offset?: number;
}

// 포켓몬 리스트
export async function getPoketmonListAll({
  searchInputValue,
  pageParam = 0,
  offset = 21,
}: pokemonSearchType) {
  if (searchInputValue) {
    const res = await apiInstance
      .get(`/pokemon/${searchInputValue}`, {})
      .then((response) => {
        // store.dispatch(ERROR(""));
        return response.data;
      })
      .then((pokemonAll) => pokemonAll)
      .catch((err) => {
        console.log("err:", err);
        if (err.response.status === 404) {
          // store.dispatch(ERROR("없는 번호/이름 입니다"));
        }
      });
    return res;
  } else {
    const res = await apiInstance
      .get(`/pokemon`, {
        params: { limit: offset, offset: pageParam },
      })
      .then((response) => response.data)
      .then((pokemonAll) => pokemonAll)
      .catch((err) => console.log("err", err));
    return res;
  }
}
