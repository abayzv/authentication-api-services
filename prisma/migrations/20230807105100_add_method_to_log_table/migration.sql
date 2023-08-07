/*
  Warnings:

  - You are about to drop the column `description` on the `ActivityLog` table. All the data in the column will be lost.
  - Added the required column `method` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLog" DROP COLUMN "description",
ADD COLUMN     "method" TEXT NOT NULL;
