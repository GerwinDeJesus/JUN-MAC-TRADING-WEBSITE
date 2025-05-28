import { UTApi } from "uploadthing/server";
import { createNextRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(request: Request) {
  try {
    // 🔥 Parse the raw body from DELETE request
    const bodyText = await request.text();
    const { fileKey } = JSON.parse(bodyText);

    if (!fileKey) {
      return new Response(JSON.stringify({ message: "Missing fileKey" }), {
        status: 400,
      });
    }

    const utApi = new UTApi();
    const result = await utApi.deleteFiles(fileKey);

    return new Response(JSON.stringify({ message: "Image deleted", result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error in DELETE /api/uploadthing:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete image", error }),
      { status: 400 }
    );
  }
}
