/*
  Warnings:

  - Added the required column `status` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN     "status" INTEGER NOT NULL;
