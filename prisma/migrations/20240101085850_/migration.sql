/*
  Warnings:

  - You are about to drop the column `descriprion` on the `Form` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,userID]` on the table `Form` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "descriprion",
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Form_name_userID_key" ON "Form"("name", "userID");
