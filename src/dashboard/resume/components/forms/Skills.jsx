import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
const Skills = () => {
  const [skillsList, setSkillsList] = useState([{ name: "", rating: 0 }]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: {
        skills: skillsList,
      },
    };

    GlobalApi.updateResumeDetail(params.resumeId, data).then(
      (resp) => {
        console.log(resp);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Try again!");
      }
    );
  };
  useEffect(() => {
    console.log(resumeInfo);
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);
  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();

    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };
  return (
    <div>
      <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add Your top Professional keys skills</p>
        <div>
          {skillsList.map((item, index) => (
            <div
              className="flex justify-between mb-2 border rounded-lg p-3 "
              key={index}
            >
              <div>
                <label className="text-xs">Name</label>
                <Input
                  className="w-full"
                  defaultValue={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>

              <Rating
                style={{ maxWidth: 120 }}
                defaultValue={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={AddNewSkills}
              className="text-primary"
            >
              {" "}
              + Add More Skill
            </Button>
            <Button
              variant="outline"
              onClick={RemoveSkills}
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

export default Skills;
