import { cn } from "@/lib/utils/cn";

const NotFoundPage: React.FC = () => {
    return (
        <div
            className={cn(
                "mx-auto flex h-screen flex-col items-center justify-center overflow-hidden text-center"
            )}
        >
            <h1 className="h-[1lh] text-[8rem] text-transparent md:text-[18rem] lg:text-[32rem]">
                404
            </h1>
        </div>
    );
};

export default NotFoundPage;
