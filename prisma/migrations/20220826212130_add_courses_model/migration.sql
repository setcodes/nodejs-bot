-- CreateTable
CREATE TABLE "CoursesModel" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "hours" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "document" TEXT NOT NULL,
    "categoriesId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoursesModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoursesModel" ADD CONSTRAINT "CoursesModel_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "CategoriesCoursesModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
