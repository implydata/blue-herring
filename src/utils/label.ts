export function makeLabel(label: string): string {
  let newLabel = label.split(/(?=[A-Z])/).map(s => s.toLowerCase()).join(" ");
  newLabel = newLabel[0].toUpperCase() + newLabel.slice(1);
  return newLabel;
};
