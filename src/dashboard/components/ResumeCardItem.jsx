import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flag, Loader2Icon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";
// import { AlertDialogHeader } from "@/components/ui/alert-dialog";

const ResumeCardItem = ({ resume, refreshData }) => {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);

  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    GlobalApi.deleteResumeById(resume.id).then(
      (res) => {
        setLoading(true);
        console.log(res);
        toast("Resume Deleted");
        refreshData;
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => setLoading(false)
    );
  };
  return (
    <div>
      <Link to={"/dashboard/resume/" + resume.id + "/edit"}>
        <div
          className="p-14  bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200
        h-[280px] 
          rounded-t-lg border-t-4"
          style={{
            borderColor: resume.attributes.themeColor,
          }}
        >
          <div
            className="flex 
        items-center justify-center h-[180px] "
          >
            <Notebook />
            {/* <img src="/cv.png" width={80} height={80} /> */}
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between  text-white rounded-b-lg shadow-lg"
        style={{
          background: resume.attributes.themeColor,
        }}
      >
        <h2 className="text-sm">{resume.attributes.title}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation("/dashboard/resume/" + resume.id + "/edit")
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation("/my-resume/" + resume.id + "/view")}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation("/my-resume/" + resume.id + "/view")}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction onClick={onDelete} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeCardItem;
