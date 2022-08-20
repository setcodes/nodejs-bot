/*
  Warnings:

  - You are about to drop the column `first_name` on the `UserModel` table. All the data in the column will be lost.
  - You are about to drop the column `is_bot` on the `UserModel` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `UserModel` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `UserModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `UserModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserModel" DROP COLUMN "first_name",
DROP COLUMN "is_bot",
DROP COLUMN "last_name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "isBot" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT NOT NULL;
