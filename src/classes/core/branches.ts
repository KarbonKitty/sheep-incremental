const industryBranchesObject = {
    housing: true,
    construction: true,
    tools: true,
    food: true,
    hunting: true,
    culture: true,
    discovery: true,
    expedition: true,
    prestige: true,
};

export const branchesArray = Object.keys(industryBranchesObject) as IndustryBranch[];
export type IndustryBranch = keyof typeof industryBranchesObject;
