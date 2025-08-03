import { Parallax, Background } from 'react-parallax';
const Cover = ({ img, title, subTitle }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div
                className="hero min-h-[500px] bg-center"
                // style={{
                //     backgroundImage:
                //         `url("${img}")`,
                // }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content py-12 bg-black/60 w-xl text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl ">{title}</h1>
                        <p className="mb-5">
                            {subTitle}
                        </p>
                    </div>
                </div>
            </div>
        </Parallax>
    );
};

export default Cover;