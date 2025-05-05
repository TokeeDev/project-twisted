// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// Note: variable name is camelCase
export const ourFileRouter = {
  eventImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { fileUrl: file.url };
    }),
  // other endpoints...
} satisfies FileRouter;

// Export type with PascalCase name
export type OurFileRouter = typeof ourFileRouter;
