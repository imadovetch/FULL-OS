import { default as TimeWidget } from './time';
import { default as WeatherWidgetPage } from './weatherwidget';
import { default as Clockdigitale } from './timedigital';

import { useDispatch, useSelector } from 'react-redux'
import { APPS_ACTIONS  } from '@/data/store/apps'
import { APP_NOTIF  } from '@/data/store/NotifColers'
import { STORE_DATA_TYPE } from '@/data/store'


 
export function Widgets() {
    const dispatch = useDispatch()
    const NOTIF = useSelector((state: STORE_DATA_TYPE) => state.NotifColers)
    var choosenclock =false;
    // const [colers, setColers] = useState([
    //     "linear-gradient(to right, #FFF8E1, #FFECB3)", // Light yellow to pale yellow
    //     "linear-gradient(to right, #ECEFF1, #B3E5FC)", // Light blue to light sky blue
    //     "linear-gradient(to right, #F5F5F5, #E0E0E0)", // Light grey to grey
    // ]);
    // "linear-gradient(to right, #F5F5F5, #E0E0E0)"
    return (
        <div
       
            className=" m-auto  h-72 gap-4  rounded-2xl  w-4/5 flex p-2 justify-between items-center"
            style={{
                 background: `${NOTIF.COLER}` ,
                boxShadow: "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
              }}
              
            
        >
            <div className="w-2/4    select-none   overflow-hidden  backdrop:brightness-0 rounded-l-2xl h-full flex justify-center items-center">
              {
                choosenclock ?
                <TimeWidget />
                :
                <Clockdigitale />
              }
            
            </div>
            <div className='w-[1px] h-3/5 rounded-3xl bg-gray-400 '></div>
            <div className='w-2/4  rounded-r-2xl  overflow-hidden h-full flex justify-center p-3 items-center'>

            <WeatherWidgetPage />
            </div>
        </div>
    );
}
