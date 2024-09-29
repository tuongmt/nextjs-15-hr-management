import { useSession } from "@/app/(main)/SessionProvider";
import { EmployeeData } from "@/lib/types";
import DeleteEmployeeDialog from "./DeleteEmployeeDialog";
import { useState } from "react";

interface EmployeeProps {
  employee: EmployeeData;
  userRole: string | undefined;
}

export default function Employee({ employee, userRole }: EmployeeProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <tbody>
      <tr className="border-t">
        <td className="px-4 py-2">{employee.user?.displayName}</td>
        <td className="px-4 py-2">{employee.user?.email}</td>
        <td className="px-4 py-2">{employee.user?.username}</td>
        <td className="px-4 py-2">{employee.position ?? "N/A"}</td>
        <td className="px-4 py-2">{employee.department ?? "N/A"}</td>
        <td className="px-4 py-2">
          {employee.hireDate
            ? new Date(employee.hireDate).toLocaleDateString()
            : "N/A"}
        </td>
        {userRole !== "ADMIN" && (
          <td className="px-4 py-2">
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </td>
        )}
      </tr>
      <DeleteEmployeeDialog
        employee={employee}
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </tbody>
  );
}
