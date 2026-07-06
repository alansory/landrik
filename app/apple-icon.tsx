import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          borderRadius: "50%",
        }}
      >
        <svg width="76" height="65" viewBox="0 0 76 65">
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="#ffffff" />
        </svg>
      </div>
    ),
    {
      ...size,
    },
  );
}
