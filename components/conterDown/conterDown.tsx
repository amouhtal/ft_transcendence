import style from "../../styles/CountDown/CountDown.module.css"

const CountDown = () =>{
    return (
        <div>
            <div className={style.Ptext}>Are You Ready...</div>
            <div className={style.cont}>
                <div className={style.spinner}></div>
                <span className={style.number}></span>
            </div>
        </div>
    )
}

export default CountDown;