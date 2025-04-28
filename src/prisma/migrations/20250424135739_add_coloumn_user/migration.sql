-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" JSONB,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emergencyContact" JSONB,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "gender" VARCHAR(2),
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phone" VARCHAR(25),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "updatedAt" TIMESTAMP(3);
