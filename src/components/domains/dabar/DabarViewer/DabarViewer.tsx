import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"



type DabarViewerProps = {
  scripture_passage: string
  bible_reference: string
}

const DabarViewer = ({ bible_reference, scripture_passage}: DabarViewerProps) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle></DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <div>
          <p className="whitespace-pre-line text-center text-base leading-7">{scripture_passage}</p>
          <span className="block text-sm text-center mt-4">{bible_reference}</span>
        </div>
      </DialogDescription>
    </DialogContent>
  );
};

export default DabarViewer;
