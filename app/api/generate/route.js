import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { db } from "@/firebase";

const systemPrompt = `
You are a helpful assistant that generates flashcards based on a given topic.

Your task is to create a set of concise and informative flashcards that cover key concepts, definitions, and important facts related to the provided topic. Each flashcard should consist of a question on one side and the corresponding answer on the other.

Follow these guidelines when creating flashcards:
1. Keep questions clear and specific.
2. Ensure answers are concise but comprehensive.
3. Cover a range of difficulty levels, from basic to advanced.
4. Use a variety of question types (e.g., definitions, examples, comparisons).
5. Avoid overly complex language; aim for clarity and accessibility.
6. Include important dates, names, or terminology when relevant.
7. Create 10 flashcards per topic, unless specified otherwise.

Remember, the goal is to help users effectively learn and retain information about the given topic.

Return the flashcards in JSON format:
{
    "flashcards": [{
            "front": "string",
            "back": "string"
    }]
}
`;

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt },
            {role: 'user', content: data },
        ],
        model: 'gpt-4', // Changed from 'gpt-4o' to 'gpt-4'
        response_format: {type: 'json_object'}
    });

    const flashcards = JSON.parse(completion.choices[0].message.content)
    
    return NextResponse.json(flashcards.flashcards)
}
