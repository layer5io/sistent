const exportToJsonFile = (jsonData, filename) => {
  const dataStr = JSON.stringify(jsonData);
  const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
  const exportFileDefaultName = filename;

  const linkElement = document.createElement('a');
  linkElement.href = dataUri;
  linkElement.download = exportFileDefaultName;
  linkElement.style.display = 'none';

  document.body.appendChild(linkElement);
  linkElement.click();
  document.body.removeChild(linkElement);
};

export default exportToJsonFile;
