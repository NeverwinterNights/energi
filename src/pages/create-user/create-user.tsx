import { CreateUserModal } from "@/components/create-user-modal";

export const CreateUser = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CreateUserModal />
    </div>
  );
};
