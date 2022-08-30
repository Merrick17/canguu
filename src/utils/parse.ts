export const formatNumberInput = (val: string) => val ? `$` + val : "";
export const parseNumberInput = (val: string) => val.replace(/^\$/, '');