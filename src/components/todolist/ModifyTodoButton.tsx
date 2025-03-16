import { RiDeleteBin6Fill, RiEdit2Fill, RiSave2Fill } from "react-icons/ri";

type ModifyTodoButtonProps = {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleEdit: () => void;
  confirmDelete: () => void;
  isDetailPage?: boolean; // 상세 페이지에서는 수정 버튼을 항상 표시
};

const ModifyTodoButton = ({
  isEditing,
  setIsEditing,
  handleEdit,
  confirmDelete,
  isDetailPage = false,
}: ModifyTodoButtonProps) => {
  return (
    <div className="flex items-center ml-3 space-x-2">
      {/* 수정 버튼 (모바일에서는 숨김) */}
      {!isDetailPage && (
        <div className="hidden sm:block">
          {isEditing ? (
            <button
              onClick={handleEdit}
              className="px-3 py-2 text-blue-500 border-blue-500 border-2 rounded-md hover:bg-blue-500 hover:text-white transition cursor-pointer"
            >
              <RiSave2Fill />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 text-green-500 border-green-500 border-2 rounded-md hover:bg-green-500 hover:text-white transition cursor-pointer"
            >
              <RiEdit2Fill />
            </button>
          )}
        </div>
      )}

      {/* 삭제 버튼 (항상 표시) */}
      <button
        onClick={confirmDelete}
        className="px-3 py-2 text-red-500 border-red-500 border-2 rounded-md hover:bg-red-500 hover:text-white transition cursor-pointer"
      >
        <RiDeleteBin6Fill />
      </button>
    </div>
  );
};

export default ModifyTodoButton;
