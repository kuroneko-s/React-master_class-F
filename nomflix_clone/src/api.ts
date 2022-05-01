const API_KEY = "97b173027b5e732e24d54fb83cdb47a1";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  backdrop_path: string; // 전체 이미지
  poster_path: string; // 포스터 이미지
  title: string; // 제목
  overview: string; // 설명
  id: number;
}

export interface IGetMoviesResult {
  dates: {
    minimum: string;
    maximum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
}
