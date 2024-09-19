import React, { useEffect } from 'react'
import Banner from './component/Banner/Banner'
import MusicAlbum from './component/MusicAlbum/MusicAlbum';
import MusicNewReleases from './component/MusicNewReleases/MusicNewReleases';
import MusicPlaylist from './component/MusicPlaylist/MusicPlaylist';
import './HomePage.style.css'
import ArtistSlide from '../../common/ArtistSlide/ArtistSlide';
import { useLocation } from 'react-router-dom';


const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    
    if (code) {
      console.log('Authorization Code:', code);
      // 이 code를 서버로 보내서 Access Token을 받아오는 요청을 진행
    }
  }, [location]);
  
  return (
    <div>
      <div className='hompage_container'>
    
      <Banner/>
      <ArtistSlide />
      <MusicPlaylist/>
      <MusicNewReleases/>
      {/* <MusicAlbum/> */}
      </div>
    </div>
  )
}

export default HomePage
