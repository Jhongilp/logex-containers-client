async function streamToArrayBuffer(stream) {
  let result = new Uint8Array(0);
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    const newResult = new Uint8Array(result.length + value.length);
    newResult.set(result);
    newResult.set(value, result.length);
    result = newResult;
  }
  return result;
}

export async function fetchAnalyzeImage(operationLocationUrl) {
  try {
    const response = await fetch(`${operationLocationUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "2560dfed2f6a4ead8efd04415801bfb4",
      },
    });
    const buffer = await streamToArrayBuffer(response.body);
    const text = new TextDecoder().decode(buffer);
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    console.log("fetch analyze error: ", error);
    throw error;
  }
}

export async function fetchReadImage(imageUrl) {
  try {
    const response = await fetch(
      "https://logex-containers.cognitiveservices.azure.com/vision/v3.1/read/analyze?language=en",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": "2560dfed2f6a4ead8efd04415801bfb4",
        },
        body: JSON.stringify({
          url: imageUrl,
        }),
      }
    );
    return response.headers.get("operation-location");
  } catch (error) {
    console.log("fetch read error: ", error);
    throw error;
  }
}

export async function fetchReadLocalImage(image) {
  try {
    const response = await fetch(
      "https://logex-containers.cognitiveservices.azure.com/vision/v3.1/read/analyze?overload=stream&language=en",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/octet-stream",
          "Ocp-Apim-Subscription-Key": "2560dfed2f6a4ead8efd04415801bfb4",
        },
        body: JSON.stringify({image})
      }
    );
    console.log("res reading local image: ", ...response.headers);
    return response.headers.get("operation-location");
  } catch (error) {
    console.log("fetch read local image error: ", error);
    throw error;
  }
}
