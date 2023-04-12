import React from "react";
import NavBar from "../NavBar/NavBar";
import style from "./Home.module.css"

export default function Home() {

    return (
        <div className={style.container} >
            <NavBar />
            <h1 className={style.title} >SALVANDO HUELLAS!</h1>

            <div className={style.img_Container} >
                <img className={style.img} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMHzZqXN5Oyq8D68x_x7jMVftbrCqI_aTIIA&usqp=CAU" alt="refugio" />
            </div>

            <center className={style.iconsContainer} >
                <div>
                    <h5 className={style.follow} >siguenos en redes sociales:</h5>
                    <div className={style.icons} >
                    <a href="https://www.facebook.com/profile.php?id=100079609239145" target="_blank"><img loading="lazy" alt="Síganos en Facebook" height="35" width="35" src=" https://1.bp.blogspot.com/-Pop-U7OywXs/YPhkfrImyiI/AAAAAAAAA1Y/UBnVfTK9j2U-bIUqwZYMNSQPvz_l06mbwCPcBGAYYCw/s0/facebook-icono.png" title="Síganos en Facebook" /></a>
                    <a href="https://www.instagram.com/salvandohuellas9/" target="_blank"><img loading="lazy" alt="Síganos en Instagram" height="35" width="35" src="https://1.bp.blogspot.com/-VFfOISywV0c/YPhkeRXuRQI/AAAAAAAAA1M/L75S9Usg5AovunH2Y-VzqJbaaY1LuK3eACPcBGAYYCw/s0/Instagram-icono.png" title="Síganos en Instagram" /></a>
                    </div>
                </div>
            </center>


        </div>
    );

};