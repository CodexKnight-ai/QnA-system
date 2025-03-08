import {
  voteCollection,
  db,
  answerCollection,
  questionCollection,
} from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextRequest, NextResponse } from "next/server";
import { Query, ID } from "node-appwrite";

export async function POST(request: NextRequest) {
  try {
    //grab the data
    const { votedById, voteStatus, typeId, type } = await request.json();
    const response = await databases.listDocuments(db, voteCollection, [
      Query.equal("type", type),
      Query.equal("typeId", typeId),
      Query.equal("votedById", votedById),
    ]);
    if (response.documents.length > 0) {
      await databases.deleteDocument(
        db,
        voteCollection,
        response.documents[0].$id
      );
      const QuestionAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId
      );
      const authorPrefs = await users.getPrefs<UserPrefs>(
        QuestionAnswer.authorId
      );
      await users.updatePrefs<UserPrefs>(QuestionAnswer.authorId, {
        reputation:
          response.documents[0].voteStatus === "upvoted"
            ? Number(authorPrefs.reputation) - 1
            : Number(authorPrefs.reputation) + 1,
      });
    }
    if (response.documents[0]?.voteStatus !== voteStatus) {
      const document = await databases.createDocument(
        db,
        voteCollection,
        ID.unique(),
        {
          type,
          typeId,
          voteStatus,
          votedById,
        }
      );
      const QuestionAnswer = await databases.getDocument(
        db,
        type === "question" ? questionCollection : answerCollection,
        typeId
      );
      const authorPrefs = await users.getPrefs<UserPrefs>(
        QuestionAnswer.authorId
      );
      if (response.documents[0]) {
        //vote is present
        await users.updatePrefs<UserPrefs>(QuestionAnswer.authorId, {
          reputation:
            response.documents[0].voteStatus === "upvoted"
              ? Number(authorPrefs.reputation) - 1
              : Number(authorPrefs.reputation) + 1,
        });
      } else {
        await users.updatePrefs<UserPrefs>(QuestionAnswer.authorId, {
          reputation:
            voteStatus === "upvoted"
              ? Number(authorPrefs.reputation) + 1
              : Number(authorPrefs.reputation) - 1,
        });
      }
    }
    const [upvotes, downvotes] = await Promise.all([
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "upvoted"),
        Query.equal("votedById", votedById),
        Query.limit(1),
      ]),
      databases.listDocuments(db, voteCollection, [
        Query.equal("type", type),
        Query.equal("typeId", typeId),
        Query.equal("voteStatus", "downvoted"),
        Query.equal("votedById", votedById),
        Query.limit(1),
      ]),
    ]);
    return NextResponse.json({
      data: {
        document: null,
        voteResult: (upvotes.total = downvotes.total),
      },
      message: "vote fetched",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Error occured while voting",
      },
      {
        status: error?.status || 500,
      }
    );
  }
}
