import React from "react";

export default function TestIframe() {
  const testUrl = "https://www.allrecipes.com/recipe/222661/egyptian-lentil-soup/";

  return (
    <div style={{ padding: "20px" }}>
      <h1>Iframe Embedding Test</h1>
      <p>
        Testing whether the following URL can be embedded in an iframe:
        <br />
        <a href={testUrl} target="_blank" rel="noopener noreferrer">
          {testUrl}
        </a>
      </p>
      <iframe
        src={testUrl}
        title="Test Iframe"
        width="800"
        height="600"
        style={{ border: "1px solid #000" }}
      ></iframe>
    </div>
  );
}
