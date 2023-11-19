import React, { useEffect, useRef, useState } from 'react';

const ImagePost = ({ images }) => {
    console.log(images);
    const [changePhoto, setChangePhoto] = useState(images[0].url);
    const containerPosterRef = useRef();
    return (
        <div className="grid gap-4 w-full">
            <div className='w-full'>
                {
                    changePhoto?.endsWith(".mp4")
                        ?
                        <video className="h-[400px] max-w-full mx-auto" src={changePhoto} alt="post" controls={true} />
                        :
                        <img className="h-[400px] max-w-full mx-auto" src={changePhoto} alt="post" />
                }
            </div>
            <div ref={containerPosterRef} className="containerPoster grid grid-cols-5 gap-2 place-items-center px-2">
                {
                    images?.length > 1
                        ?
                        images.map((image, index) => (
                            <div key={index} className={`rounded-lg dark:border-slate-400 cursor-pointer`} onClick={(e) => setChangePhoto(image.url)}>
                                {
                                    image?.url?.endsWith(".mp4")
                                        ?
                                        <video className={`h-[60px] max-w-full rounded-lg`} src={image.url} alt="post" autoPlay={true} muted={true} />
                                        :
                                        <img className={`h-[60px] max-w-full rounded-lg`} src={image.url} alt="post" />
                                }
                            </div>
                        ))
                        :
                        ""
                }
            </div>
        </div>
    );
};

export default ImagePost;
