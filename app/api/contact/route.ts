import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      company?: string;
      budget?: string;
      message?: string;
    };

    if (!body?.name || !body?.message || !body?.budget) {
      return NextResponse.json(
        { ok: false, error: "Заполните имя, бюджет и задачу." },
        { status: 400 }
      );
    }

    // Production note: connect SMTP/Resend here if needed.
    // For now we accept and acknowledge (works end-to-end, with proper UX states).
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректные данные." }, { status: 400 });
  }
}

