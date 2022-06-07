import style from '../../styles/login/fier.module.scss'

const Fire = () => {

    return (
        <>
        <div className={style.fire}>
            <div className={style.fireleft}>
                <div className={style.mainfire}></div>
                <div className={style.particlefire}></div>
            </div>

            <div className={style.firecenter}>
                <div className={style.mainfire}></div>
                <div className={style.particlefire}></div>
            </div>
            <div className={style.fireright}>
                <div className={style.mainfire}></div>
                <div className={style.particlefire}></div>
            </div>
            <div className={style.firebottom}>
                <div className={style.mainfire}></div>
            </div>
           
        </div>
        </>
    );
}

export default Fire