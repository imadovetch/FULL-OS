import { APP_DATA_TYPE } from "@/data/const"
import { Window } from './window'
import { I, Title } from '@/components'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { STORE_DATA_TYPE } from "@/data/store"
import { APP_CONTAINER } from "@/data/store/AppContainer"
import { APP_NOTIF } from "@/data/store/NotifColers"
import { APP_ICONS } from "@/data/store/icons"


    

export function Settings({ data }: { data: APP_DATA_TYPE }) {
    const [coler1, setColer1] = useState('#000'); // Initial color
  const [coler2, setColer2] = useState('#000'); // Initial color
  const [coler3, setColer3] = useState('#00f'); // Initial color
  const [colers, setColers] = useState([
    "linear-gradient(to right, #EA8D8D, #A890FE)", // Light yellow to pale yellow
    "linear-gradient(to right, #A9F1DF, #FFBBBB)", // Light blue to light sky blue
    "linear-gradient(to right, #C33764, #1D2671)", // Light grey to grey
]);
const [darkTheme, setDarkTheme] = useState('light')
      const [somephotos,setphotos] =  useState([
        "/43afd01dc42127c352f1fde070cc2be0.jpg",
        "/1289176.jpg",
          "/1097573.jpg",
        

      ])
      const [imageUrl, setImageUrl] = useState('');

      const containerapp = useSelector((store:STORE_DATA_TYPE) => store.AppContainer)
    const dispatch = useDispatch()
    function  handleFileChange1(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
        Getphotoclicked(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleColorChange1 = (event) => {
    setColer1(event.target.value);
  };

  const handleColorChange2 = (event) => {
    setColer2(event.target.value);
  };

  const handleColorChange3 = (event) => {
    setColer3(event.target.value);
  };
  function GetColerclicked(picked:string){
    
    dispatch(APP_NOTIF.UPDATEnotif({COLER: picked}))
  }
  function Getphotoclicked(picked:string){
    
    dispatch(APP_CONTAINER.UPDATEBG({BGchoosed: picked}))
    
  }
  function changeicon(){
    dispatch(APP_ICONS.UPDATEicon({COLER: `linear-gradient(to bottom right, ${coler1}, ${coler2}, ${coler3})`}))
    
  }

  function Togglethem(){
    if(darkTheme === 'light') {
			document.documentElement.setAttribute('theme', 'dark')
			setDarkTheme("dark")
		}else {
			document.documentElement.setAttribute('theme', 'light')
			setDarkTheme('light')
		}
  
  

  }
    return (
        <Window data={data}>
            <div  className="p-2 flex w-full h-full  overflow-hidden  bg-app-light ">
            
    <div className={`  ${((data.width > 800) || data.fullscreen) ?'flex' :'hidden'}   w-1/6`}
    
    >
        <div className="flex flex-col flex-grow pt-5  custom-scrollbar bg-app-light">
            

            <div className="px-4 mt-3">
                <label  className="sr-only"> Search </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>

                    <input type="search" name="" id="" className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm" placeholder="Search here" />
                </div>
            </div>

            <div className="px-4 mt-6">
                <hr className="border-gray-200" />
            </div>

            <div className="flex flex-col flex-1 px-3 mt-6">
                <div className="space-y-4">
                    <nav className="flex-1 space-y-2">
                        <a href="#" title="" className="flex gap-5 items-center px-4 py-2.5 text-sm font-medium text-app-light transition-all duration-200 bg-indigo-600 rounded-lg group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4 text-app-light" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Affichage
                        </a>

                    </nav>

                    <hr className="border-gray-200" />

                    <nav className="flex-1 space-y-2">
                        

                        <a  className="flex gap-5 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-app-light rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                            Security
                           
                        </a>
                    </nav>

                    <hr className="border-gray-200" />

                    <nav className="flex-1 space-y-2">
                        <a  className="flex gap-5 items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 text-gray-900 hover:text-app-light rounded-lg hover:bg-indigo-600 group">
                            <svg className="flex-shrink-0 w-5 h-5 mr-4" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Account
                        </a>
                    </nav>
                </div>

               
            </div>
        </div>
    </div>
            <div className={`flex flex-col settings-background  h-full ${data.width < 800 ?'w-full' :'w-4/5'} border   custom-scrollbar bg-app-light `}>
      
        <main>
  <div className="py-6 gap-5 flex flex-col h-full">
  <div className="px-4 py-5 mx-auto w-full flex flex-col justify-center sm:px-6 md:px-8 settingsdivsbackground">
      <h1 className="text-xl mb-5 font-serif text-gray-900 dark:text-app-light">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-app-dark from-gray-400">Change Screen Background</span>
      </h1>
      
      <div className="flex w-4/5 m-auto justify-between">
      {somephotos.map((photo, index) => (
            <div
            key={index}
            onClick={() => { Getphotoclicked(photo) }}
            style={{ backgroundImage: `url(${photo})`, backgroundSize: 'cover' }}
            className="cardshadow hover:cursor-pointer w-24 h-24  rounded-lg shadow-lg"
            ></div>
        ))}

</div>
<div className="input-div mx-auto  mt-6">
<input className="input" name="file" type="file" onChange={handleFileChange1} />
<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" class="icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
</div>

      <button className="cursor-pointer mx-auto mt-4  transition-all bg-blue-500 text-app-light px-4 py-1 rounded-lg
            border-blue-600
            border-b-[4px] hover:brightness-110 
            ">
            Save Background
        </button>
    </div>
    <div className="px-4 py-5 mx-auto w-full flex flex-col justify-center sm:px-6 md:px-8 settingsdivsbackground">
      <h1 className="text-xl mb-5 font-serif text-gray-900 dark:text-app-light">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-app-dark from-gray-400">Change Notification Bar</span>
      </h1>
      
      <div className="flex w-4/5 m-auto justify-between">
  {colers.map((colors, index) => (
    <div
      key={index}
      onClick={()=>{GetColerclicked(colors)}}
      style={{ background: `${colors}` }}
      className="cardshadow hover:cursor-pointer w-24 h-24 rounded-lg shadow-lg"
    ></div>
  ))}
</div>

      <button className="cursor-pointer mx-auto mt-4  transition-all bg-blue-500 text-app-light px-4 py-1 rounded-lg
            border-blue-600
            border-b-[4px] hover:brightness-110 
            ">
            Apply
        </button>
    </div>

    <div className="px-4 mx-auto w-full max-w-7xl sm:px-6 md:px-8   p-14 gap-5 settingsdivsbackground" >
      <h2>
        <span className="text-transparent text-xl bg-clip-text bg-gradient-to-r to-app-dark from-gray-400">
          Icon Styles
        </span>
      </h2>
      <div className="px-4 gap-5 mx-auto max-w-7xl sm:px-6 md:px-8 flex flex-col justify-center items-center ">
      <button
                    className="mx-auto iconholder flex justify-center items-center appsbackground rounded-lg p-4 z-40 hover:cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, ${coler1}, ${coler2}, ${coler3})`,
                    }}
                  >
                    <Title text="Chat" side="top" />
                    <I type="Settings" size={30} className="icon text-app-light" />
                  </button>
        <div>
        <div className="flex flex-col space-y-2 px-3 mt-6">
                <div className="flex items-center">
                  <label htmlFor="color1" className="mr-2 text-sm">
                    Enter Color 1:
                  </label>
                  <input
                    type="color"
                    id="color1"
                    value={coler1}
                    onChange={handleColorChange1}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="color2" className="mr-2 text-sm">
                    Enter Color 2:
                  </label>
                  <input
                    type="color"
                    id="color2"
                    value={coler2}
                    onChange={handleColorChange2}
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="color3" className="mr-2 text-sm">
                    Enter Color 3:
                  </label>
                  <input
                    type="color"
                    id="color3"
                    value={coler3}
                    onChange={handleColorChange3}
                  />
                </div>
              </div>
        </div>
        <button
        onClick={()=>{changeicon()}}
        className="cursor-pointer transition-all bg-blue-500 text-app-light px-6 py-2 rounded-lg
            border-blue-600
            border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
            active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
            Change Icon
            </button>
        
      </div>
      
    </div>

    <div className="px-4 mx-auto w-full max-w-7xl flex flex-col justify-center sm:px-6 md:px-8 settingsdivsbackground mb-16">
      <h1 className="text-xl mb-5 font-serif text-gray-900 dark:text-app-light">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-app-dark from-gray-400">Theme</span>
      </h1>
      <div className="flex w-4/5 m-auto justify-center">
      <label id="theme-toggle-button"
      
      >
  <input type="checkbox" id="toggle"
  onClick={Togglethem}
  />
  <svg viewBox="0 0 69.667 44" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(3.5 3.5)" data-name="Component 15 â 1" id="Component_15_1">
      
      
      <g filter="url(#container)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
        <rect fill="#83cbd8" transform="translate(3.5 3.5)" rx="17.5" height="35" width="60.667" data-name="container" id="container"></rect>
      </g>
      
      <g transform="translate(2.333 2.333)" id="button">
        
        <g data-name="sun" id="sun">
          <g filter="url(#sun-outer)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
            <circle fill="#f8e664" transform="translate(5.83 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="sun-outer" id="sun-outer-2"></circle>
          </g>
          <g filter="url(#sun)" transform="matrix(1, 0, 0, 1, -5.83, -5.83)">
            <path fill="rgba(246,254,247,0.29)" transform="translate(9.33 9.33)" d="M11.667,0A11.667,11.667,0,1,1,0,11.667,11.667,11.667,0,0,1,11.667,0Z" data-name="sun" id="sun-3"></path>
          </g>
          <circle fill="#fcf4b9" transform="translate(8.167 8.167)" r="7" cy="7" cx="7" id="sun-inner"></circle>
        </g>
        
          
        <g data-name="moon" id="moon">
          <g filter="url(#moon)" transform="matrix(1, 0, 0, 1, -31.5, -5.83)">
            <circle fill="#cce6ee" transform="translate(31.5 5.83)" r="15.167" cy="15.167" cx="15.167" data-name="moon" id="moon-3"></circle>
          </g>
          <g fill="#a6cad0" transform="translate(-24.415 -1.009)" id="patches">
            <circle transform="translate(43.009 4.496)" r="2" cy="2" cx="2"></circle>
            <circle transform="translate(39.366 17.952)" r="2" cy="2" cx="2" data-name="patch"></circle>
            <circle transform="translate(33.016 8.044)" r="1" cy="1" cx="1" data-name="patch"></circle>
            <circle transform="translate(51.081 18.888)" r="1" cy="1" cx="1" data-name="patch"></circle>
            <circle transform="translate(33.016 22.503)" r="1" cy="1" cx="1" data-name="patch"></circle>
            <circle transform="translate(50.081 10.53)" r="1.5" cy="1.5" cx="1.5" data-name="patch"></circle>
          </g>
        </g>
      </g>
      
      
      <g filter="url(#cloud)" transform="matrix(1, 0, 0, 1, -3.5, -3.5)">
        <path fill="#fff" transform="translate(-3466.47 -160.94)" d="M3512.81,173.815a4.463,4.463,0,0,1,2.243.62.95.95,0,0,1,.72-1.281,4.852,4.852,0,0,1,2.623.519c.034.02-.5-1.968.281-2.716a2.117,2.117,0,0,1,2.829-.274,1.821,1.821,0,0,1,.854,1.858c.063.037,2.594-.049,3.285,1.273s-.865,2.544-.807,2.626a12.192,12.192,0,0,1,2.278.892c.553.448,1.106,1.992-1.62,2.927a7.742,7.742,0,0,1-3.762-.3c-1.28-.49-1.181-2.65-1.137-2.624s-1.417,2.2-2.623,2.2a4.172,4.172,0,0,1-2.394-1.206,3.825,3.825,0,0,1-2.771.774c-3.429-.46-2.333-3.267-2.2-3.55A3.721,3.721,0,0,1,3512.81,173.815Z" data-name="cloud" id="cloud"></path>
      </g>

      
      <g fill="#def8ff" transform="translate(3.585 1.325)" id="stars">
        <path transform="matrix(-1, 0.017, -0.017, -1, 24.231, 3.055)" d="M.774,0,.566.559,0,.539.458.933.25,1.492l.485-.361.458.394L1.024.953,1.509.592.943.572Z"></path>
        <path transform="matrix(-0.777, 0.629, -0.629, -0.777, 23.185, 12.358)" d="M1.341.529.836.472.736,0,.505.46,0,.4.4.729l-.231.46L.605.932l.4.326L.9.786Z" data-name="star"></path>
        <path transform="matrix(0.438, 0.899, -0.899, 0.438, 23.177, 29.735)" d="M.015,1.065.475.9l.285.365L.766.772l.46-.164L.745.494.751,0,.481.407,0,.293.285.658Z" data-name="star"></path>
        <path transform="translate(12.677 0.388) rotate(104)" d="M1.161,1.6,1.059,1,1.574.722.962.607.86,0,.613.572,0,.457.446.881.2,1.454l.516-.274Z" data-name="star"></path>
        <path transform="matrix(-0.07, 0.998, -0.998, -0.07, 11.066, 15.457)" d="M.873,1.648l.114-.62L1.579.945,1.03.62,1.144,0,.706.464.157.139.438.7,0,1.167l.592-.083Z" data-name="star"></path>
        <path transform="translate(8.326 28.061) rotate(11)" d="M.593,0,.638.724,0,.982l.7.211.045.724.36-.64.7.211L1.342.935,1.7.294,1.063.552Z" data-name="star"></path>
        <path transform="translate(5.012 5.962) rotate(172)" d="M.816,0,.5.455,0,.311.323.767l-.312.455.516-.215.323.456L.827.911,1.343.7.839.552Z" data-name="star"></path>
        <path transform="translate(2.218 14.616) rotate(169)" d="M1.261,0,.774.571.114.3.487.967,0,1.538.728,1.32l.372.662.047-.749.728-.218L1.215.749Z" data-name="star"></path>
      </g>
    </g>
  </svg>
</label>
             </div>
      
    </div>
  </div>
</main>
    </div>

    


            </div>
            </Window>
    )

}