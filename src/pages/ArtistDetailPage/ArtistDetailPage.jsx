import React, { useEffect, useState } from "react";
import "./ArtistDetailPage.style.css";
import { Col, Container, Row } from "react-bootstrap";
import { Alert } from "bootstrap/dist/js/bootstrap.bundle.min";
import { useArtistDetailQuery } from './../../hooks/useArtistDetail';
import AudioPlayerButton from "../../common/component/AudioPlayerButton/AudioPlayerButton";
import { useArtistAlbumQuery } from './../../hooks/useArtistAlbum';
import { useArtistTopTracksQuery } from './../../hooks/useArtistTopTracks';
import { useParams } from "react-router-dom";
import PopularTrackTable from "./component/PopularTrackTable/PopularTrackTable";

const ArtistDetailPage = () => {
  const { id } = useParams();

  const [artistName, setArtistName] = useState(null);
  const [i, setI] = useState(0);

  const {
    data: artist,
    isLoading,
    isError,
    error,
  } = useArtistDetailQuery({ id });

  const {
    data: artistAlbum,
    isLoading: aAIsLoading,
    isError: aAIsError,
    error: aAError,
  } = useArtistAlbumQuery(id);

  const {
    data: artistTopTracks,
    isLoading: aTTIsLoading,
    isError: aTTIsError,
    error: aTTError,
  } = useArtistTopTracksQuery({id});

  useEffect(() => {
    if (artist?.name) {
      setArtistName(artist?.name);
    }
    setI(0)
  }, [artist]);

  useEffect(() => {
    if (artistTopTracks?.tracks[i]?.preview_url) {
      // preview_url이 있는 경우에만 로직 처리
      console.log('Found preview_url at index:', i);
    } else if (i < artistTopTracks?.tracks.length) {
      // preview_url이 없는 경우 i 증가
      const timer = setTimeout(() => setI(i + 1), 100); // 100ms 후에 i 증가
      return () => clearTimeout(timer); // useEffect 정리 시 타이머 해제
    }
  }, [artistTopTracks, i]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Row>
        <div
          style={{
            backgroundImage: `url(${artist?.images[0]?.url})`,
          }}
          className="artistdetailpage_img"
        >
          <div className="artistdetailpage_info">
            <span><img width="28" height="28" src="https://img.icons8.com/color/48/instagram-verification-badge.png" alt="instagram-verification-badge"/></span>
          <span className=""> 확인된 아티스트</span>
          <div>
            <span className="artistdetailpage_name">{artistName}</span>
          </div>
          </div>

        </div>
      </Row>

      <Row>
        <Col className="mt-3">
          <AudioPlayerButton preview={artistTopTracks?.tracks[i]?.preview_url}/>
        </Col>
      </Row>

      <Row className="mt-4">
        <div className="artistdetailpage_popular_txt">인기</div>
      </Row>

      <PopularTrackTable tracks={artistTopTracks?.tracks}/>
    </Container>
  );
};

export default ArtistDetailPage;
