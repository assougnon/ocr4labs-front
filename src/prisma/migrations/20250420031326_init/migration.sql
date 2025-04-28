-- CreateTable
CREATE TABLE "doctrine_migration_versions" (
    "version" VARCHAR(191) NOT NULL,
    "executed_at" TIMESTAMP(0),
    "execution_time" INTEGER,

    CONSTRAINT "doctrine_migration_versions_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "medication" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "form" VARCHAR(255) NOT NULL,
    "is_brand" BOOLEAN,
    "is_over_the_counter" BOOLEAN,
    "route" VARCHAR(255),

    CONSTRAINT "medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "gender" VARCHAR(1) NOT NULL,
    "address" TEXT,
    "phone_number" VARCHAR(255) NOT NULL,
    "social_security_number" VARCHAR(255),
    "insurance_provider" VARCHAR(255),
    "insurance_number" VARCHAR(255),

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "practitioner" (
    "id" TEXT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "specialty" VARCHAR(255) NOT NULL,
    "license_number" VARCHAR(255),
    "practice_location" VARCHAR(255),
    "contact_info" JSON,
    "address" VARCHAR(255),
    "languages_spoken" VARCHAR(255),

    CONSTRAINT "practitioner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pres_request" (
    "id" TEXT NOT NULL,
    "language" VARCHAR(5) NOT NULL,
    "raw_text" TEXT NOT NULL,

    CONSTRAINT "pres_request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescription" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT,
    "practitioner_id" TEXT,
    "status" VARCHAR(255),
    "intent" VARCHAR(255),
    "reason_code" VARCHAR(255),
    "note" TEXT,
    "authored_on" TIMESTAMP(0),

    CONSTRAINT "prescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescription_medication" (
    "id" TEXT NOT NULL,
    "dosage_instruction" TEXT,
    "quantity" INTEGER,

    CONSTRAINT "prescription_medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescription_medication_medication" (
    "prescription_medication_id" TEXT NOT NULL,
    "medication_id" TEXT NOT NULL,

    CONSTRAINT "prescription_medication_medication_pkey" PRIMARY KEY ("prescription_medication_id","medication_id")
);

-- CreateTable
CREATE TABLE "prescription_medication_prescription" (
    "prescription_medication_id" TEXT NOT NULL,
    "prescription_id" TEXT NOT NULL,

    CONSTRAINT "prescription_medication_prescription_pkey" PRIMARY KEY ("prescription_medication_id","prescription_id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" VARCHAR(180),
    "emailVerified" TIMESTAMP(3),
    "password" TEXT,
    "roles" JSON,
    "image" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE INDEX "idx_1fbfb8d91121ea2c" ON "prescription"("practitioner_id");

-- CreateIndex
CREATE INDEX "idx_1fbfb8d96b899279" ON "prescription"("patient_id");

-- CreateIndex
CREATE INDEX "idx_12b49b112c4de6da" ON "prescription_medication_medication"("medication_id");

-- CreateIndex
CREATE INDEX "idx_12b49b114f579006" ON "prescription_medication_medication"("prescription_medication_id");

-- CreateIndex
CREATE INDEX "idx_f83d68d54f579006" ON "prescription_medication_prescription"("prescription_medication_id");

-- CreateIndex
CREATE INDEX "idx_f83d68d593db413d" ON "prescription_medication_prescription"("prescription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "uniq_identifier_email" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "prescription" ADD CONSTRAINT "fk_1fbfb8d91121ea2c" FOREIGN KEY ("practitioner_id") REFERENCES "practitioner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prescription" ADD CONSTRAINT "fk_1fbfb8d96b899279" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prescription_medication_medication" ADD CONSTRAINT "fk_12b49b112c4de6da" FOREIGN KEY ("medication_id") REFERENCES "medication"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prescription_medication_medication" ADD CONSTRAINT "fk_12b49b114f579006" FOREIGN KEY ("prescription_medication_id") REFERENCES "prescription_medication"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prescription_medication_prescription" ADD CONSTRAINT "fk_f83d68d54f579006" FOREIGN KEY ("prescription_medication_id") REFERENCES "prescription_medication"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prescription_medication_prescription" ADD CONSTRAINT "fk_f83d68d593db413d" FOREIGN KEY ("prescription_id") REFERENCES "prescription"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
