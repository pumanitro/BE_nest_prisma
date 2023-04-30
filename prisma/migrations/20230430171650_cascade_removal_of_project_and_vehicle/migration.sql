-- DropForeignKey
ALTER TABLE "ProjectAssigment" DROP CONSTRAINT "ProjectAssigment_projectId_fkey";

-- DropForeignKey
ALTER TABLE "VehicleAssigment" DROP CONSTRAINT "VehicleAssigment_vehicleId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectAssigment" ADD CONSTRAINT "ProjectAssigment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleAssigment" ADD CONSTRAINT "VehicleAssigment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
