export const getAffiliateIds = (user: any) => {
  const { affiliates = [] } = user as any;
  const ids = affiliates.flatMap((f: any) => [f.id, ...f.affiliates.flatMap((c: any) => getAffiliateIds(c))]);
  return [user.id, ...ids];
};
