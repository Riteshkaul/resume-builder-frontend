import React, { useState } from "react";
import PersonalDetal from "./forms/PersonalDetal";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGridIcon } from "lucide-react";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import { Link, Navigate, useParams } from "react-router-dom";
import ViewResume from "@/my-resume/[resumeId]/view/Index";
import ThemeColor from "./ThemeColor";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  const { resumeId } = useParams();
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Link to={"/dashboard"}>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Personal Detail */}
      {activeFormIndex == 1 ? (
        <PersonalDetal enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Summery */}
      {activeFormIndex == 2 ? (
        <Summary enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Experience */}
      {activeFormIndex == 3 ? (
        <Experience enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Educational Detail */}
      {activeFormIndex == 4 ? (
        <Education enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {/* Skills */}
      {activeFormIndex == 5 ? (
        <Skills enableNext={(v) => setEnableNext(v)} />
      ) : null}

      {activeFormIndex == 6 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      ) : null}
    </div>
  );
};

export default FormSection;