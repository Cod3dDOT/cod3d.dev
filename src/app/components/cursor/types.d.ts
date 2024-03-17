export interface InteractableOpts {
    children?: React.ReactNode;
    color?: string;
    alpha?: number;
    size?: "height" | "width" | "both" | number;
    snap?: "vertical" | "horizontal" | "center";
}

export type Interactable = string | ({ target: string } & InteractableOpts);

interface CursorProps extends Omit<InteractableOpts, "size"> {
    interactables: Interactable[];
    showSystemCursor: boolean;
    size?: number;
}
