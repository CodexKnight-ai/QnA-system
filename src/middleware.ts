import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getCreateDb from "./models/server/dbSetup";
import createQuestionAttachmentBucket from "./models/server/storage.collection";
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await Promise.all([
    getCreateDb(),
    createQuestionAttachmentBucket()
]);
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
/* Upper function will not work at matcher paths
_api
_next/static
_next/image
_favicon.com
*/
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
