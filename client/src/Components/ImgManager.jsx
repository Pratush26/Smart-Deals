import { useState } from "react";

export default function ImgManager({imgUrl, altTxt, styles}) {
    const [imgError, setImgError] = useState(false);
    const url = "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
    return (
        <img
                src={imgError ? url : imgUrl}
                alt={altTxt}
                onError={() => setImgError(true)}
                className={styles}
            />
    )
}