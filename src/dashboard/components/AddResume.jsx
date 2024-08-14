import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "./../../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
// import { error } from "console";
const AddResume = () => {
  const [openDialog, setOpenDiaglog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const onCreate = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.CreatenewResume(data).then(
      (res) => {
        if (res) {
          setLoading(false);
          navigate("/dashboard/resume/" + res.data.data.id + "/edit");
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div
        className="p-14 py-24 border item-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 hover:shadow cursor-pointer border-dashed"
        onClick={() => setOpenDiaglog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title to your Resume</p>
              <Input
                className="my-2"
                placeholder="Ex.Full Stack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end">
              <Button onClick={() => setOpenDiaglog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
