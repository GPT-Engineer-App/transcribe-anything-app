import { useState } from "react";
import { Container, VStack, Text, Button, Input, Box, Heading } from "@chakra-ui/react";
import { FaMicrophone, FaYoutube } from "react-icons/fa";

const Index = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [transcription, setTranscription] = useState("");

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

    // Placeholder for transcription logic
    // Replace this with actual call to transcribe-anything package
    setTranscription("Transcription in progress...");

    // Simulate transcription delay
    setTimeout(() => {
      setTranscription("This is the transcribed text of the uploaded audio file.");
    }, 2000);
  };

  const handleTranscribeUrl = async () => {
    if (!youtubeUrl) {
      alert("Please enter a YouTube URL first.");
      return;
    }

    // Placeholder for transcription logic
    // Replace this with actual call to transcribe-anything package
    setTranscription("Transcription in progress...");

    // Simulate transcription delay
    setTimeout(() => {
      setTranscription("This is the transcribed text of the YouTube video.");
    }, 2000);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl" mb={6}>Transcribe Anything</Heading>
        <Input type="file" accept="audio/*" onChange={handleFileChange} />
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