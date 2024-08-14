import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const Experience = () => {
  const formField = {
    title: "",
    companyName: "",
    city: "",
    state: "",
    startDate: "",
    endDate: "",
    workSummary: "",
  };
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [loading, setLoading] = useState();
  const [experienceList, setExperienceList] = useState([resumeInfo.experience]);
  useEffect(() => {
    if (resumeInfo?.experience?.length) {
      // Flatten the nested array
      const flattenData = resumeInfo.experience.flat(Infinity);
      setExperienceList(flattenData);
    }
  }, []);
  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };
  const params = useParams();
  const AddNewExperience = () => {
    setExperienceList([...experienceList, { formField }]);
  };
  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };
  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.updateResumeDetail(params?.resumeId, data).then(
      (res) => {
        // console.log("res" + res);
        console.log(res);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
    // console.log(experienceList.flat(Infinity));
  }, [experienceList]);
  return (
    <div>
      <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job Experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item.title}
                    // value={item?.title || ""}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">city</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item.state}
                  />
                </div>
                <div>
                  <label className="text-xs">Start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item.endDate}
                  />
                </div>
              </div>
              {/* Work Summery */}
              <div className="col-span-2">
                <RichTextEditor
                  index={index}
                  defaultValue={item.workSummery}
                  // value={item.workSummery}
                  onRichTextEditorChange={(e) =>
                    handleRichTextEditor(e, "workSummery", index)
                  }
                />
                {/* {item.workSummery} */}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewExperience}
              className="text-primary"
            >
              {" "}
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={removeExperience}
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

export default Experience;
