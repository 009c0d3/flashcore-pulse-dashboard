
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserProfile } from "@/types/auth";

const updateFormSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  full_name: z.string().min(3, { message: "Full name must be at least 3 characters long" }),
});

interface UserEditDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user: UserProfile;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof updateFormSchema>) => void;
}

const UserEditDialog: React.FC<UserEditDialogProps> = ({
  isOpen,
  onOpenChange,
  user,
  isLoading,
  onSubmit
}) => {
  const updateForm = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      username: user.username || "",
      full_name: user.full_name || "",
    },
  });

  // Reset form when user changes
  React.useEffect(() => {
    if (user) {
      updateForm.reset({
        username: user.username || "",
        full_name: user.full_name || "",
      });
    }
  }, [user, updateForm]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <Form {...updateForm}>
          <form onSubmit={updateForm.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={updateForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateForm.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
