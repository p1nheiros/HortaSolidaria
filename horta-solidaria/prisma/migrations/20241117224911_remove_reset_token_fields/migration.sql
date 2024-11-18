/*
  Warnings:

  - You are about to drop the column `resetToken` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpires` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpires";
