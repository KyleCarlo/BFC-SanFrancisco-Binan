import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Uppy } from "@uppy/core";
import { Uploader } from "@components/uploader";

export default function UploadDialog({
  triggerMessage,
  title,
  description,
  className,
  uppy,
}: {
  triggerMessage: string;
  title: string;
  description: string;
  className?: string;
  uppy: Uppy<Record<string, unknown>, Record<string, unknown>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          {triggerMessage}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] max-w-[340px] rounded-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Uploader uppy={uppy} width={280} height={140} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
