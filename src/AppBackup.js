import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchReadImage, fetchAnalyzeImage, fetchReadLocalImage } from "./api";

function App() {
  const [files, setFiles] = useState([]);
  const [urlImgPreview, setUrlPreview] = useState(null);
  const isFetchingRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const getResults = async () => {
      try {
        const operationLocationUrl = await fetchReadImage(
          "https://raw.githubusercontent.com/Jhongilp/logex-container-reader/main/container1.jpg"
          // "https://upload.wikimedia.org/wikipedia/commons/d/df/Container_01_KMJ.jpg"
        );
        const fetchImageData = new Promise((resolve, reject) => {
          console.log("azure reading image res: ", operationLocationUrl);
          timerRef.current = window.setInterval(async () => {
            try {
              const { status, analyzeResult } = await fetchAnalyzeImage(
                operationLocationUrl
              );
              console.log("imageDataContent: ", status, analyzeResult);
              if (status === "succeeded") {
                window.clearInterval(timerRef.current);
                resolve(analyzeResult.readResults);
              }
            } catch (error) {
              reject(error);
            }
          }, 5000);
        });
        fetchImageData();
      } catch (error) {
        console.log("azure reading image error: ", error);
      }
    };

    if (!isFetchingRef.current) {
      isFetchingRef.current = true;
      getResults();
    }
  }, []);

  useEffect(() => {
    if (files.length) {
      const reader = new window.FileReader();
      reader.addEventListener(
        "load",
        () => {
          setUrlPreview(reader.result);
        },
        false
      );
      reader.readAsDataURL(files[0].proxy);
    }
  }, [files]);

  const handleImagesChange = (event) => {
    const addingFiles = event.target.files;
    console.log("adding files: ", addingFiles);
    setFiles([
      ...files,
      ...Array.from(addingFiles)
        .filter((it) => it.size * 0.000001 <= 10) // 10 MB
        .map((it) => ({
          // uuid: uuidv4(),
          name: it.name,
          proxy: it,
        }))
        .slice(0, 6),
    ]);
  };

  const handleOnAnalyzeImage = () => {
    if (files.length) {
      const formData = new window.FormData();
      formData.append("file", files[0].proxy);

      console.log("form data local image: ", formData.values());
      console.log("form data local image: ", formData.get("file"));

      const reader = new window.FileReader();
      reader.addEventListener(
        "load",
        () => {
          // setUrlPreview(reader.result);
          console.log("reader result: ", reader.result);
          fetchReadLocalImage(reader.result);
        },
        false
      );
      reader.readAsBinaryString(files[0].proxy);
      // reader.readAsArrayBuffer(files[0].proxy);

      // fetchReadLocalImage(formData);
      // fetchReadLocalImage(urlImgPreview);
    }
  };

  console.log("[render] files state: ", files[0]);
  return (
    <div className="App">
      <header>
        <h1>Lector de contenedores</h1>
      </header>
      <main>
        <div className="image-loader--wrapper">
          <label>
            <input
              type="file"
              accept="image/jpeg,image/jpg"
              style={{ display: "none" }}
              onChange={handleImagesChange}
              // disabled={files.length >= MAXIMUM_FILES}
              multiple
            />
          </label>
        </div>
        <div className="image-preview">
          <img src={urlImgPreview} width="50" alt="preview" />
        </div>
        <div>
          <div>
            <button type="button" onClick={handleOnAnalyzeImage}>
              ANALIZAR
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
