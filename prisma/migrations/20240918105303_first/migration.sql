-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "thumbnail_img" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);
