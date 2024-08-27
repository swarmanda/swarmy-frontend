import { Alert, Flex, Select, Space, Stack, Text } from '@mantine/core';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark as theme } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { config } from '../config.tsx';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/Api.ts';
import { useState } from 'react';

export default function ApiGuideRoute() {
  const downloadEndpoint = `${config.apiUrl}/files`;
  const uploadEndpoint = `${config.apiUrl}/api/files`;
  const [apiKey, setApiKey] = useState<string | null>('YOUR_API_KEY');

  const { isSuccess, data } = useQuery({
    queryKey: ['api-keys'],
    queryFn: api.getApiKeys,
  });

  function getBashFileUpload() {
    return `curl -X POST -F file=@file.jpg -H "Authorization: Bearer ${apiKey}" "${uploadEndpoint}"`;
  }

  function getBashWebsiteUpload() {
    return `curl -X POST -F file=@site.tar -H "Authorization: Bearer ${apiKey}" "${uploadEndpoint}?website=true"`;
  }

  function getBashFileDownload() {
    return `curl "${downloadEndpoint}/hash_of_file?k=${apiKey}" --output filename`;
  }

  function getBashListFiles() {
    return `curl -H "Authorization: Bearer ${apiKey}" "${uploadEndpoint}"`;
  }

  return (
    <>
      <h1>Api guide</h1>
      <Flex justify={'flex-end'} mr={'lg'}>
        <Stack gap={'xs'}>
          <Text>Key to use:</Text>
          <Select w={250} data={isSuccess ? data.map((d) => d.key) : []} value={apiKey} onChange={setApiKey} />
        </Stack>
      </Flex>

      <h2>Upload a file</h2>
      <SyntaxHighlighter language="bash" style={theme}>
        {getBashFileUpload()}
      </SyntaxHighlighter>

      <div>Or with JavaScript</div>

      <SyntaxHighlighter language="javascript" style={theme}>
        {`import * as fs from 'node:fs';
import axios from 'axios';

const API_KEY = '${apiKey}';
const buffer = fs.readFileSync('path/to/file');
const blob = new Blob([buffer]);
const file = new File([blob], 'yourFileName.png')
const formData = new FormData();
formData.append('file', file);

await axios.post('${uploadEndpoint}', formData, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': \`Bearer \${API_KEY}\`
    }
})`}
      </SyntaxHighlighter>

      <Space h={'lg'} />

      <h2>Fetch uploaded files</h2>
      <SyntaxHighlighter language="bash" style={theme}>
        {getBashListFiles()}
      </SyntaxHighlighter>

      <Space h={'lg'} />

      <h2>Download file</h2>
      <SyntaxHighlighter language="bash" style={theme}>
        {getBashFileDownload()}
      </SyntaxHighlighter>

      <Space h={'lg'} />

      <h2>Host a website</h2>
      <div>
        First, we need to prepare a directory containing our website. Make sure that the <i>index.html</i> file is at
        the root of the directory tree.
      </div>
      <SyntaxHighlighter language="bash" style={theme}>
        {`tree my_website
>
my_website
├── assets
│   └── style.css
├── index.html
└── error.html`}
      </SyntaxHighlighter>
      <div>Use the following command to ensure that the tar package maintains the correct directory structure:</div>

      <SyntaxHighlighter language="bash" style={theme}>
        {`cd my_website
tar -cf ../my_website.tar .
cd ..`}
      </SyntaxHighlighter>

      <Alert variant={'filled'} color="orange.6">
        <b>GZIP compression is not supported, so make sure not to use the -z flag when using the tar command!</b>
      </Alert>

      <Space h={'lg'} />
      <div>Next, simply POST the tar file to the upload endpoint.</div>

      <SyntaxHighlighter language="bash" style={theme}>
        {getBashWebsiteUpload()}
      </SyntaxHighlighter>

      <Space h={'lg'} />
    </>
  );
}
