/*
  Warnings:

  - You are about to drop the column `zenstack_guard` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_guard` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_transaction` on the `List` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_guard` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_transaction` on the `Space` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_guard` on the `SpaceUser` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_transaction` on the `SpaceUser` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_guard` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_transaction` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_guard` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zenstack_transaction` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "List_zenstack_transaction_idx";

-- DropIndex
DROP INDEX "Space_zenstack_transaction_idx";

-- DropIndex
DROP INDEX "SpaceUser_zenstack_transaction_idx";

-- DropIndex
DROP INDEX "Todo_zenstack_transaction_idx";

-- DropIndex
DROP INDEX "User_zenstack_transaction_idx";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "zenstack_guard";

-- AlterTable
ALTER TABLE "List" DROP COLUMN "zenstack_guard",
DROP COLUMN "zenstack_transaction";

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "zenstack_guard",
DROP COLUMN "zenstack_transaction";

-- AlterTable
ALTER TABLE "SpaceUser" DROP COLUMN "zenstack_guard",
DROP COLUMN "zenstack_transaction";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "zenstack_guard",
DROP COLUMN "zenstack_transaction";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "zenstack_guard",
DROP COLUMN "zenstack_transaction";
