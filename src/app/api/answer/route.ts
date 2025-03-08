import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { UserPrefs } from "@/store/Auth";

export async function POST(request: NextResponse) {
  try {
    const { questionId, authorId, answer } = await request.json();
    const response = await databases.createDocument(
      db,
      answerCollection,
      ID.unique(),
      {
        content: answer,
        questionId: questionId,
        authorId: authorId,
      }
    );

    //Reputation increase
    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs<UserPrefs>(authorId, {
      reputation: Number(prefs.reputation) + 1,
    });
    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "An error occurred",
      },
      {
        status: error?.status || 500,
      }
    );
  }
}

export async function DELETE(request: NextResponse) {
  try {
    const { answerId, authorId } = await request.json();
    await databases.deleteDocument(db, answerCollection, answerId);

    //Reputation decrease
    const prefs = await users.getPrefs<UserPrefs>(authorId);
    await users.updatePrefs<UserPrefs>(authorId, {
      reputation: Number(prefs.reputation) - 1,
    });

    return NextResponse.json(
      {
        message: "Answer deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "An error occurred while deleting the answer",
      },
      {
        status: error?.status || 500,
      }
    );
  }
}
