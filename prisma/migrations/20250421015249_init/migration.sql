-- CreateTable
CREATE TABLE "Purchase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "udid" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);
