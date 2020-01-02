import { ISitesTemplateData, ISitesStateData } from "../classes/core";

const siteTemplates: ISitesTemplateData = {
  cave: { name: "cave", originalLocks: [] }
};

const sitesStartingState: ISitesStateData = {
  cave: { amount: 2 }
};

export default siteTemplates;
export { sitesStartingState };
