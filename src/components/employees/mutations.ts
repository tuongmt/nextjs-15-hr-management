import { EmployeesPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { deleteEmployee, addEmployee } from "./actions";
import { SignUpValues } from "../../lib/validation";

export function useDeleteEmployeeMutation() {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: async (deletedEmployee) => {
      const queryFilter: QueryFilters = {
        queryKey: ["employees"],
      };

      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<EmployeesPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              employees: page.employees.filter(
                (p) => p.id !== deletedEmployee.id
              ),
            })),
          };
        }
      );

      toast({
        description: "Employee deleted",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to delete employee. Please try again.",
      });
    },
  });

  return mutation;
}

export function useAddEmployeeMutation() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addEmployee,
    onSuccess: async () => {
      const queryFilter: QueryFilters = {
        queryKey: ["employees"],
      };

      await queryClient.invalidateQueries(queryFilter);

      toast({
        description: "Employee added successfully",
      });
    },
    onError(error) {
      console.error(error);
      toast({
        variant: "destructive",
        description: "Failed to add employee. Please try again.",
      });
    },
  });

  return mutation;
}
