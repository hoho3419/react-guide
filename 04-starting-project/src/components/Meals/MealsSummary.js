import React from "react";
import styles from "./MealsSummary.module.css"

const MealsSummary = () => {
    return (
        <section className={styles.summary}>
            <h2>맛있는 음식을 배달해 드리겠습니다!</h2>
            <p>이용 가능한 다양한 식사 중에서 가장 좋아하는 식사를 선택하십시오.</p>
            <p>우리의 모든 식사는 고품질의 재료로 요리 되었습니다.물론 숙련된 요리사들에 의해!</p>
        </section>
    )
}
export default MealsSummary;