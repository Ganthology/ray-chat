import { BottomSheetModal } from "@gorhom/bottom-sheet";

interface BottomSheetProps {
  children: React.ReactNode;
}

const BottomSheet = ({ children }: BottomSheetProps) => {
  return <BottomSheetModal>{children}</BottomSheetModal>;
};

export default BottomSheet;
