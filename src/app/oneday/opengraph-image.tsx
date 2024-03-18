// import { ImageResponse } from "next/og";

// // Route segment config
// export const runtime = "edge";

// // Image metadata
// export const alt = "cod3d.dev";
// export const size = { width: 1200, height: 630 };

// export const contentType = "image/png";

// const getFont = async () => {
//     const response = await fetch(
//         new URL("./PixelifySans-Regular.ttf", import.meta.url)
//     );
//     const font = await response.arrayBuffer();

//     return font;
// };

// // Image generation
// export default async function Image() {
//     return new ImageResponse(
//         (
//             // ImageResponse JSX element
//             <div
//                 style={{
//                     backgroundColor: "#111111",
//                     display: "flex",
//                     color: "white",
//                     width: "100%",
//                     height: "100%",
//                 }}
//             >
//                 <span
//                     style={{
//                         fontSize: 128,
//                     }}
//                 >
//                     cod3d.dev
//                 </span>
//                 <span>Probably trying to hack you. Or sleeping.</span>
//                 <span>Or both.</span>
//             </div>
//         ),
//         // ImageResponse options
//         {
//             // For convenience, we can re-use the exported opengraph-image
//             // size config to also set the ImageResponse's width and height.
//             ...size,
//             fonts: [
//                 {
//                     name: "Inter",
//                     data: await getFont(),
//                     style: "normal",
//                     weight: 400,
//                 },
//             ],
//         }
//     );
// }
