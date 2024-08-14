import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIchatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";

const PROMPT =
  "position title: {positionTitle}, Depends on Position title give me 5-7 bullet points for my experience in resume, give me result in HTML tags ";

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(defaultValue || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const GenerateSummaryFromAI = async () => {
    if (!resumeInfo.experience[index]?.title) {
      toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );
    const result = await AIchatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          className="flex gap-2 border-primary text-primary"
          size="sm"
          onClick={GenerateSummaryFromAI}
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain />
              Generate From AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
