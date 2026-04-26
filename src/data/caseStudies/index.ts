import { caseStudiesCover } from "./cover";
import { caseStudiesClosing } from "./closing";
import { studyNovaBridge } from "./studyNovaBridge";
import { studyPriyaMehta } from "./studyPriyaMehta";
import { studyArchway } from "./studyArchway";
import type { CaseStudyDoc } from "./types";

export const caseStudiesData = {
  cover: caseStudiesCover,
  studies: [studyNovaBridge, studyPriyaMehta, studyArchway],
  closing: caseStudiesClosing,
};

export function getAllCaseStudies(): CaseStudyDoc[] {
  return [...caseStudiesData.studies];
}

export function getCaseStudyBySlug(slug: string | undefined): CaseStudyDoc | undefined {
  if (!slug) return undefined;
  return caseStudiesData.studies.find((s) => s.id === slug);
}

export { caseStudiesCover, caseStudiesClosing, studyNovaBridge, studyPriyaMehta, studyArchway };
export type { CaseStudyBlock, CaseStudyDoc, CaseStudiesCover, CaseStudiesClosing } from "./types";
