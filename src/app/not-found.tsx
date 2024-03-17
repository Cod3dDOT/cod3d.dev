import { Cursor } from "./components/cursor/cursor";
import { GlitchText } from "./components/glitchText";
import { clsx } from "clsx";

const NotFoundPage: React.FC = () => {
    return (
        <>
            <Cursor showSystemCursor={false} />
            <div
                className={clsx(
                    "flex flex-col sm:w-full w-1 mx-auto h-screen overflow-hidden justify-center items-center p-8 text-center"
                )}
            >
                <GlitchText
                    as="h1"
                    text="4 0 4"
                    className="xl:text-[50vh] sm:text-[30vw] text-9xl font-semibold break-all mb-16"
                />
                <p>Be careful when looking for something that never existed</p>
            </div>
        </>
    );
};

export default NotFoundPage;
