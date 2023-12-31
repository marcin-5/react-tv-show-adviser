import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import logoImg from "./assets/images/logo.png";
import { Logo } from "./components/Logo/Logo";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { TVShowList } from "./components/TVShowList/TVShowList";
import { BACKDROP_BASE_URL } from "./config";
import s from "./style.module.css";

export function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationsList, setRecomendationsList] = useState([]);

  async function fetchPopulars() {
    try {
      const popularTVShowList = await TVShowAPI.fetchPopulars();
      if (popularTVShowList.length > 0) setCurrentTVShow(popularTVShowList[0]);
    } catch {
      alert("Something went wrong when fetching the popular tv shows");
    }
  }

  async function fetchRecommendations(tvShowId) {
    try {
      const recommendationsListResp = await TVShowAPI.fetchRecommendations(tvShowId);
      if (recommendationsListResp.length > 0)
        setRecomendationsList(recommendationsListResp.slice(0, 10));
    } catch {
      alert("Something went wrong when fetching recommendations list");
    }
  }

  async function fetchByTitle(title) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(title);
      if (searchResponse.length > 0) setCurrentTVShow(searchResponse[0]);
    } catch {
      alert("Something went wrong when fetching by title");
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []);

  useEffect(() => {
    if (currentTVShow) fetchRecommendations(currentTVShow.id);
  }, [currentTVShow]);

  function updateCurrentTVShow(tvShow) {
    setCurrentTVShow(tvShow);
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
             url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo img={logoImg} title="Whatowatch" subtitle="Find a show you may like" />
          </div>
          <div className="col-md-12 col-lg-4">
            <SearchBar onSubmit={fetchByTitle} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_details}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommended_shows}>
        {currentTVShow && (
          <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recommendationsList} />
        )}
      </div>
    </div>
  );
}
