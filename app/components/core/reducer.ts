export const setVisibility = (value: boolean) => () => ({
  isStuffVisible: value
});

export const toggleHelp = ({ helpVisible }: { helpVisible: boolean }) => ({
  helpVisible: !helpVisible
});
