import style from "../styles/achievement.module.css";
import datas from "../achievement.json";
import icon from '../public/images/search.png'

function ViewAchievement() {
  return (
    <div className={style.container}>
      <div className={style.ContentScrole}>
        {datas.map((data, key) => (
          <div key={key} className={style.carte}>
            <div className={style.content}>
              <div className={style.child}>
                <img src={icon.src}width={50} height={50} />
              </div>
              <div className={style.child1}>
                <p className={style.nameAchievement}>{data.title}</p>
              </div>
            </div>
            <div className={style.textAchiev}>
              <p className={style.Pdescription}>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ViewAchievement;
