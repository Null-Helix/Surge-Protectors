import Papa from 'papaparse';

const useFetch = () => {
  const fetchCSVData = async (filePath, callback, prevData) => {
    const response = await fetch(filePath);
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csvString = decoder.decode(result.value);
    Papa.parse(csvString, {
      header: true,
      dynamicTyping: true,
      worker: true,
      step: function (chunk) {
        callback([...prevData, ...chunk.data]);
      },
      complete: function () {
        //    const combinedData = [...prevData, ...chuncks];
        // callback(results.data);

        console.log('Reading completed');
      },
    });
  };
  return {
    fetchCSVData,
  };
};

export default useFetch;
