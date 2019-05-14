import { ISitesTemplateData, ISitesStateData } from "../classes/baseClasses";

const siteTemplates: ISitesTemplateData = {
  cave: { name: "cave", originalLocks: [] }
};

const sitesStartingState: ISitesStateData = {
  cave: { amount: 2 }
};

export default siteTemplates;
export { sitesStartingState };
