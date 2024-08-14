import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { LoaderCircle, Brain } from "lucide-react";
import { AIchatSession } from "./../../../../../service/AIModal";

const Summary = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState();
  const [aiGeneratedSummeryList, setAIGeneratedSummeryList] = useState();
  const params = useParams();
  const prompt =
    "Job Title: {jobTitle}, Depends on job title give me list of summery for 3 experience level, Midlevel, Experienced,Fresher level in 3-4 lines in array format,With summery and experience_level Field in JSON Format";
  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);
  const GenerateSummaryAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
    console.log(PROMPT);
    const result = await AIchatSession.sendMessage(PROMPT);
    console.log(JSON.parse([result.response.text()]));
    setAIGeneratedSummeryList(JSON.parse(result.response.text()));
    setLoading(false);
  };
  const onSave = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      data: {
        summery: summery,
      },
    };
    GlobalApi.updateResumeDetail(params?.resumeId, data).then((res) => {
      console.log(res);
      enableNext(true);
      setLoading(false);
      toast("Details Updated");
    }),
      (error) => {
        loading(false);
      };
  };
  return (
    <div>
      <div className="p-5 shadow-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summery </h2>
        <p>Add Summery for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              type="button"
              onClick={() => GenerateSummaryAI()}
              className="border-primary text-primary flex gap-2"
              size="sm"
            >
              <Brain className="h-4 w-4" />
              Generate from AI
            </Button>
          </div>
          <Textarea
            required
            className="mt-5"
            onChange={(e) => setSummery(e.target.value)}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
      {aiGeneratedSummeryList && (
        <div>
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.length > 0 &&
            aiGeneratedSummeryList.map((item, index) => (
              <div key={index}>
                <h2 className="font-bold my-1">
                  Level: {item?.experience_level}
                </h2>
                <p>{item?.summery}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Summary;
