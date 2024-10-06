-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "UserData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "avatarUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthProvider" (
    "userId" TEXT NOT NULL,
    "googleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthProvider_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "duration" DOUBLE PRECISION NOT NULL,
    "interviewType" TEXT NOT NULL,
    "problemSetId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterviewSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemSet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProblemSet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPerformance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPerformance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationMetrics" (
    "id" TEXT NOT NULL,
    "userPerformanceId" TEXT NOT NULL,
    "fillerWords" INTEGER NOT NULL,
    "articulationRate" DOUBLE PRECISION NOT NULL,
    "speechRate" DOUBLE PRECISION NOT NULL,
    "numberofPauses" INTEGER NOT NULL,
    "stressPoints" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunicationMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CriticalThinkingMetrics" (
    "id" TEXT NOT NULL,
    "userPerformanceId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CriticalThinkingMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodeQualityMetrics" (
    "id" TEXT NOT NULL,
    "userPerformanceId" TEXT NOT NULL,
    "codeStructure" INTEGER NOT NULL,
    "logicAccuracy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CodeQualityMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuntimeAnalysisMetrics" (
    "id" TEXT NOT NULL,
    "userPerformanceId" TEXT NOT NULL,
    "timeComplexity" TEXT NOT NULL,
    "spaceComplexity" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuntimeAnalysisMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_email_key" ON "UserData"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProblemSet_slug_key" ON "ProblemSet"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserPerformance_interviewId_key" ON "UserPerformance"("interviewId");

-- CreateIndex
CREATE UNIQUE INDEX "CommunicationMetrics_userPerformanceId_key" ON "CommunicationMetrics"("userPerformanceId");

-- CreateIndex
CREATE UNIQUE INDEX "CriticalThinkingMetrics_userPerformanceId_key" ON "CriticalThinkingMetrics"("userPerformanceId");

-- CreateIndex
CREATE UNIQUE INDEX "CodeQualityMetrics_userPerformanceId_key" ON "CodeQualityMetrics"("userPerformanceId");

-- CreateIndex
CREATE UNIQUE INDEX "RuntimeAnalysisMetrics_userPerformanceId_key" ON "RuntimeAnalysisMetrics"("userPerformanceId");

-- AddForeignKey
ALTER TABLE "AuthProvider" ADD CONSTRAINT "AuthProvider_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSession" ADD CONSTRAINT "InterviewSession_problemSetId_fkey" FOREIGN KEY ("problemSetId") REFERENCES "ProblemSet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPerformance" ADD CONSTRAINT "UserPerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPerformance" ADD CONSTRAINT "UserPerformance_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "InterviewSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationMetrics" ADD CONSTRAINT "CommunicationMetrics_userPerformanceId_fkey" FOREIGN KEY ("userPerformanceId") REFERENCES "UserPerformance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CriticalThinkingMetrics" ADD CONSTRAINT "CriticalThinkingMetrics_userPerformanceId_fkey" FOREIGN KEY ("userPerformanceId") REFERENCES "UserPerformance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodeQualityMetrics" ADD CONSTRAINT "CodeQualityMetrics_userPerformanceId_fkey" FOREIGN KEY ("userPerformanceId") REFERENCES "UserPerformance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RuntimeAnalysisMetrics" ADD CONSTRAINT "RuntimeAnalysisMetrics_userPerformanceId_fkey" FOREIGN KEY ("userPerformanceId") REFERENCES "UserPerformance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
