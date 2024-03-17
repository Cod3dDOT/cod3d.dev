import { Cursor } from "@/app/components/cursor/cursor";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div>
            <Cursor showSystemCursor={false} />
            Tada
        </div>
    );
}
