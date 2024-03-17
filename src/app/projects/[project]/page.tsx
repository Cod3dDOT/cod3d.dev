import { Cursor } from "@/app/components/cursor/cursor";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <div>
            <Cursor
                clickables={[".cursor-width", ".cursor-height", ".cursor"]}
                showSystemCursor={false}
            />
            Tada
        </div>
    );
}
