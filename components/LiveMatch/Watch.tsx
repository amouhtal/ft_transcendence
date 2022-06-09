import style from '../../styles/watchMatch/livematch.module.css'
import LiveListMatch from './ListeLiveMatch'
import data from '../../achievement.json'
function Watch () {
    return (
        <>
            <div className={style.container}>
                <div className={style.content}>
                    <div className={style.child1}>
                        <button className={style.Btn}> Quick Match</button>
                        <button className={style.Btn}> Setting</button>
                    </div>
                    <div className={style.childSclor}>
                        {data.map((dat, index) =>(
                            <LiveListMatch key ={index}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Watch