import React from 'react' 
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div className='appDownload' id='appDownload'>
       <p>For better experience download  <br /> FoodifY.APP</p>
       
      
       <div className="app-download-plateforms">
        <a href="https://play.google.com" target="_blank" rel="external"><img src={assets.play_store} alt="" /></a>
       {/* <img src={assets.play_store} alt="" /> */}
       <a href="https://apps.apple.com"><img src={assets.app_store} alt="" /></a>
        {/* <img src={assets.app_store} alt="" /> */}
       </div>
    </div>
  )
}

export default AppDownload
