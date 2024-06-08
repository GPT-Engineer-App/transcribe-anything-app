import { useState } from "react";
import { Container, VStack, Text, Button, Input, Box, Heading, Checkbox, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { FaMicrophone, FaYoutube } from "react-icons/fa";

const Index = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [transcription, setTranscription] = useState("");
  const [useGPU, setUseGPU] = useState(false);
  const [outputFormat, setOutputFormat] = useState("text");
  const [translate, setTranslate] = useState(false);

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleUrlChange = (event) => {
    setYoutubeUrl(event.target.value);
  };

  const handleTranscribe = async () => {
    if (!audioFile) {
      alert("Please upload an audio file first.");
      return;
    }

    setTranscription("Transcription in progress...");

    try {
      const result = await transcribeAnything({
        file: audioFile,
        device: useGPU ? "insane" : "cpu",
        task: translate ? "translate" : "transcribe",
        format: outputFormat,
      });

      setTranscription(result);
    } catch (error) {
      console.error("Transcription error:", error);
      setTranscription("An error occurred during transcription.");
    }
  };

  const handleTranscribeUrl = async () => {
    if (!youtubeUrl) {
      alert("Please enter a YouTube URL first.");
      return;
    }

    setTranscription("Transcription in progress...");

    try {
      const result = await transcribeAnything({
        url: youtubeUrl,
        device: useGPU ? "insane" : "cpu",
        task: translate ? "translate" : "transcribe",
        format: outputFormat,
      });

      setTranscription(result);
    } catch (error) {
      console.error("Transcription error:", error);
      setTranscription("An error occurred during transcription.");
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>Transcribe Anything</Heading>
        <Input type="file" accept="audio/*" onChange={handleFileChange} />
        <Checkbox isChecked={useGPU} onChange={(e) => setUseGPU(e.target.checked)}>
          Enable GPU Acceleration
        </Checkbox>
        <RadioGroup onChange={setOutputFormat} value={outputFormat}>
          <Stack direction="row">
            <Radio value="text">Raw Text</Radio>
            <Radio value="subtitle">Subtitle File</Radio>
          </Stack>
        </RadioGroup>
        <Checkbox isChecked={translate} onChange={(e) => setTranslate(e.target.checked)}>
          Enable Translation
        </Checkbox>
        <Button leftIcon={<FaMicrophone />} colorScheme="teal" onClick={handleTranscribe}>
          Transcribe
        </Button>
        <Text>or</Text>
        <Input 
          placeholder="Enter YouTube URL" 
          value={youtubeUrl} 
          onChange={handleUrlChange} 
        />
        <Button leftIcon={<FaYoutube />} colorScheme="red" onClick={handleTranscribeUrl}>
          Transcribe YouTube URL
        </Button>
        {transcription && (
          <Box p={4} mt={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text>{transcription}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;