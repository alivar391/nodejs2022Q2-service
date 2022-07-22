-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "version" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "grammy" BOOLEAN NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");
