export const separateFormTypeElementAndText: (
  inputText: string,
) => [string, string] = inputText => {
  const prefixes = ['checkbox', 'select', 'input'];

  const prefix = prefixes.find(prefix => inputText.startsWith(prefix));

  if (prefix) {
    const input = inputText.slice(0, prefix.length).toLowerCase();
    const text = inputText.slice(prefix.length).toLowerCase();

    return [input, text];
  }

  return [inputText, ''];
};
