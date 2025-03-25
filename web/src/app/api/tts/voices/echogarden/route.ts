import * as Echogarden from "echogarden"
import { NextResponse } from "next/server"
import { logger } from "@/logging"

export async function GET() {
  try {
    const { voiceList } = await Echogarden.requestVoiceList({
      engine: "kokoro",
    })

    return NextResponse.json(voiceList)
  } catch (error) {
    logger.error("Failed to get Echogarden voices:", error)
    return NextResponse.json(
      [
        { name: "Heart", gender: "female" },
        { name: "Sky", gender: "male" },
        { name: "Air", gender: "female" },
        { name: "Water", gender: "male" },
        { name: "Forest", gender: "male" },
      ],
      { status: 200 },
    )
  }
}
