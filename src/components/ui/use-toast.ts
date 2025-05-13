
// Import toast and useToast directly from the Radix UI package instead
import { useToast as useRadixToast } from "@/components/ui/toast";
import { toast as radixToast } from "@/components/ui/toast";

export const useToast = useRadixToast;
export const toast = radixToast;
