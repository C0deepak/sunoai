import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {
        const formData = await req.formData();

        const response = await fetch('https://api.sarvam.ai/speech-to-text', {
            method: 'POST',
            headers: {
                'api-subscription-key': '46a5a203-f8a3-456a-a928-0a1a88c346bc',
            },
            body: formData,
        });

        const result = await response.json();
        return NextResponse.json({ transcript: result.transcript });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to convert speech to text' }, { status: 500 });
    }
};
