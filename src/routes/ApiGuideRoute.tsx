import { Space } from '@mantine/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { config } from '../config.tsx';

export default function ApiGuideRoute() {
  const fileApi = `${config.apiUrl}/api/files`;

  function getBashFileUpload() {
    return `curl -X POST -F file=@file.jpg -H "Authorization: Bearer YOUR_API_KEY" "${fileApi}"`;
  }

  function getBashListFiles() {
    return `curl -H "Authorization: YOUR_API_KEY" "${fileApi}"`;
  }

  return (
    <>
      <h1>Api guide</h1>

      <h2>curl</h2>
      <div>Upload a file from command line</div>
      <SyntaxHighlighter language="bash" style={theme}>
        {getBashFileUpload()}
      </SyntaxHighlighter>

      <Space h={'lg'} />

      <div>Fetch uploaded files</div>
      <SyntaxHighlighter language="bash" style={theme}>
        {getBashListFiles()}
      </SyntaxHighlighter>

      <Space h={'lg'} />

      <h2>Javascript</h2>
      <div>Upload a file from your Javascript app</div>

      <SyntaxHighlighter language="javascript" style={theme}>
        {`import * as fs from 'node:fs';
import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const buffer = fs.readFileSync('path/to/file');
const blob = new Blob([buffer]);
const file = new File([blob], 'yourFileName.png')
const formData = new FormData();
formData.append('file', file);

await axios.post('${fileApi}', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': \`Bearer \${API_KEY}\`
    }
})`}
      </SyntaxHighlighter>
    </>
  );
}
