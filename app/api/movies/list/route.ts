import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json([
    [
      {
        id: 0,
        title: "존 윅 4",
        posterUrl: "johnwick.jpeg",
      },
      {
        id: 1,
        title: "슈퍼 마리오 브라더스",
        posterUrl: "mario.jpeg",
      },
      {
        id: 2,
        title: "거울 속 외딴 성",
        posterUrl: "mirror.jpeg",
      },
      {
        id: 3,
        title: "리바운드",
        posterUrl: "rebound.jpeg",
      },
      {
        id: 4,
        title: "슬램덩크",
        posterUrl: "slamdunk.jpeg",
      },
      {
        id: 5,
        title: "스즈메의 문단속",
        posterUrl: "suzume.jpeg",
      },
    ],
    [
      {
        id: 0,
        title: "존 윅 4",
        posterUrl: "johnwick.jpeg",
      },
      {
        id: 1,
        title: "슈퍼 마리오 브라더스",
        posterUrl: "mario.jpeg",
      },
      {
        id: 2,
        title: "거울 속 외딴 성",
        posterUrl: "mirror.jpeg",
      },
      {
        id: 3,
        title: "리바운드",
        posterUrl: "rebound.jpeg",
      },
      {
        id: 4,
        title: "슬램덩크",
        posterUrl: "slamdunk.jpeg",
      },
      {
        id: 5,
        title: "스즈메의 문단속",
        posterUrl: "suzume.jpeg",
      },
    ],
  ]);
}
