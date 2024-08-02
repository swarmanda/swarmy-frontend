import React, { useRef, useState } from 'react';
import {
  Button,
  Center, Checkbox,
  CloseButton,
  Container,
  Group,
  rem,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import {
  IconCheck,
  IconCloudUpload,
  IconDownload,
  IconX,
} from '@tabler/icons-react';
import classes from './FileUploader.module.css';
import { useForm } from '@mantine/form';
import { api } from './api/Api.ts';
import { notifications } from '@mantine/notifications';
import { formatBytes } from './FileSizeFormatter.ts';

interface FormValues {
  files: File[];
}

interface FileUploaderProps {
  onUploaded?: () => void;
}

export function FileUploader({ onUploaded }: FileUploaderProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const form = useForm<FormValues>({
    initialValues: { files: [] },
  });
  const [uploadAsWebsite, setUploadAsWebsite] = useState(false);


  function isSelectedFileTar() {
    return form.values.files && form.values.files[0].name.endsWith(".tar")
  }
  const selectedFiles = form.values.files.map((file, index) => (
    <Text key={file.name}>
      <b>{file.name}</b> {formatBytes(file.size)}
      <CloseButton
        size="xs"
        onClick={() =>
          form.setFieldValue(
            'files',
            form.values.files.filter((_, i) => i !== index),
          )
        }
      />
    </Text>
  ));

  async function submit() {
    try {
      await api.uploadFile(form.values.files[0], uploadAsWebsite);
      notifications.show({
        title: 'Upload successful',
        message: `${form.values.files.length} files uploaded`,
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        color: 'green',
      });
      onUploaded && onUploaded();
    } catch (e) {
      console.log(e)
      notifications.show({
        title: 'Upload failed',
        message: e.response && e.response.data ? e.response.data.message : e.message,
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
    }
  }

  return (
    <Container className={classes.wrapper}>
      {form.values.files.length === 0 && (
        <>
          <Dropzone
            onDrop={(files) => form.setFieldValue('files', [files[0]])}
            openRef={openRef}
            className={classes.dropzone}
            radius="md"
            // accept={[MIME_TYPES.pdf]}
            maxSize={30 * 1024 ** 2}
          >
            <div style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload
                    style={{ width: rem(50), height: rem(50) }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>
              </Group>

              <Text ta="center" fw={700} fz="lg" mt="xl">
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Idle>Upload files</Dropzone.Idle>
                <Dropzone.Reject>File less than 30mb</Dropzone.Reject>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed">
                You can drag&apos;n&apos;drop files here to upload.
              </Text>
            </div>
          </Dropzone>

          <Center>
            <Button
              className={classes.control}
              size="md"
              radius="xl"
              onClick={() => openRef.current?.()}
            >
              Select files
            </Button>
          </Center>
        </>
      )}

      {form.errors.files && (
        <Text c="red" mt={5}>
          {form.errors.files}
        </Text>
      )}

      {selectedFiles.length > 0 && (
        <>
          <Title mb={'lg'} size="1.2em">
            Selected file:
          </Title>
          <Container>{selectedFiles}</Container>
          {isSelectedFileTar() && (
            <Checkbox
              mt="lg"
              ml="md"
              label={"Upload as website"}
              checked={uploadAsWebsite}
              onChange={(event) => setUploadAsWebsite(event.currentTarget.checked)}
            />
          )}

          <Center mt={'xl'}>
            <Button onClick={submit}>Upload</Button>
          </Center>
        </>
      )}
    </Container>
  );
}
