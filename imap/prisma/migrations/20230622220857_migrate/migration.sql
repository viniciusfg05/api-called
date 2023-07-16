-- CreateTable
CREATE TABLE "Calleds" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "called_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "call_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "description_summary" TEXT NOT NULL,
    "date_open" TIMESTAMP(3) NOT NULL,
    "emergency" BOOLEAN NOT NULL,
    "scope" TEXT NOT NULL,
    "priority" TEXT NOT NULL,

    CONSTRAINT "Calleds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessagesCalled" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "message" TEXT NOT NULL,
    "calleds_id" TEXT,

    CONSTRAINT "MessagesCalled_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Calleds_uid_key" ON "Calleds"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "Calleds_called_id_key" ON "Calleds"("called_id");

-- CreateIndex
CREATE UNIQUE INDEX "Calleds_branch_id_key" ON "Calleds"("branch_id");

-- AddForeignKey
ALTER TABLE "MessagesCalled" ADD CONSTRAINT "MessagesCalled_calleds_id_fkey" FOREIGN KEY ("calleds_id") REFERENCES "Calleds"("id") ON DELETE SET NULL ON UPDATE CASCADE;
