import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

const Education = () => {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const params = useParams();
  const [educationList, setEducationList] = useState([
    {
      universityDate: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);
  useEffect(() => {
    resumeInfo && setEducationList(resumeInfo?.education);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = educationList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };
  const AddNewEducation = () => {
    setEducationList([
      ...educationList,
      {
        universityDate: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };
  const RemoveEducation = () => {
    setEducationList((educationList) => educationList.slice(0, -1));
  };
  // useEffect(() => {
  //   setEducationList(resumeInfo.education);
  // }, [resumeInfo]);
  useEffect(() => {
    console.log(resumeInfo.education);
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);
  const onSave = (e) => {
    e.preventDefault();
    const data = {
      data: {
        education: educationList,
      },
    };
    GlobalApi.updateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  return (
    <div>
      <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add Your Education Detail</p>
        <div>
          {educationList.map((item, index) => (
            <div>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div className="col-span-2">
                  <label className="text-xs">University Name</label>
                  <Input
                    name="universityName"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item.universityName}
                  />
                </div>
                <div>
                  <label className="text-xs">Degree</label>
                  <Input
                    name="degree"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item.degree}
                  />
                </div>
                <div>
                  <label className="text-xs">Major</label>
                  <Input
                    name="major"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item.major}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item.endDate}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs">Description</label>
                  <Textarea
                    name="description"
                    onChange={(e) => handleChange(e, index)}
                    defaultValue={item?.description}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewEducation}
              className="text-primary"
            >
              {" "}
              + Add More Education
            </Button>
            <Button
              variant="outline"
              onClick={RemoveEducation}
              className="text-primary"
            >
              {" "}
              - Remove
            </Button>
          </div>
          <Button disabled={loading} onClick={(e) => onSave(e)}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Education;
